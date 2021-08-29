import {requestClassifications, Term} from "./classifier/index.js";
import { Low, JSONFile } from 'lowdb'
import * as path from "path";

import Koa from "koa"
import cors from "koa-cors"
import Router from "koa-router"
import bodyParser from 'koa-body-parser'
import {addTask} from "./shedule-manager/index.js"

const router = new Router()
const app = new Koa();
const koaOptions = {
  origin: true,
  credentials: true
};
export type Task = {
  id: string,
  description: string,
  dueDate: number,
  groupId?: string,
  // time: number
}
const shedules = {}
const adapter = new JSONFile<{tasks: Task[]}>('./data/db.json')
const db = new Low(adapter)
db.data ||= { tasks: [] }

router.put("/shedule/:id", (ctx, next) => {
  if (ctx.request.body.tasks && Array.isArray(ctx.request.body.tasks)) {
    const tasks = ctx.request.body.tasks.sort((a, b) => a.dueDate < b.dueDate ? -1 : 1)
    let shedule = ctx.request.body.shedule
    const unsolvedTasks = []
    for (let task of tasks) {
      const newShedule = addTask(shedule, task, ctx.request.body.currentDate)
      shedule = newShedule || shedule
      if (!shedule) {
        unsolvedTasks.push(task)
      }
    }
    shedules[ctx.params.id] = shedule
    ctx.body = {newShedule: shedule, unsolvedTasks}
  } else {
    const newShedule = addTask(ctx.request.body.shedule, ctx.request.body.task, ctx.request.body.currentDate)
    console.log(newShedule)
    shedules[ctx.params.id] = newShedule
    ctx.body = {newShedule}
  }
})
router.get("/shedule/:id", (ctx, next) => {
  ctx.body = shedules[ctx.params.id]

})
router.get("/tasks/:id", (ctx, next) => {
  ctx.body = db.data.tasks.find(item => item.id === ctx.params.id)
})
router.get("/tasks", (ctx, next) => {
  ctx.body = db.data.tasks
})

router.post("/tasks", async (ctx, next) => {
  let newTasks = ctx.request.body

  const classifications = await requestClassifications({"tasks": newTasks.map(task => task.description)})

  const createdTasks = []
  newTasks.forEach((task, index, array) => {
    const classification = classifications[index]

    // TODO: Consider moving this logic back to Python
    const classMap = {}
    let currentBest = null;
    for (const term of classification) {
      for (const suggestion of term.intent_ambiguity) {
        const record = (classMap[suggestion.title] ??= suggestion)
        record.count ??= 0
        record.count++

        if (!currentBest || currentBest.count < record.count) {
          currentBest = record
        }
      }
    }

    if(!currentBest) {
      currentBest = {
        title: 'Неопределённый тип задачи',
        handled_by: null,
        words: []
      }
    }

    // TODO: Associate typical tasks with procedural documents to get due dates
    const arbitraryDueDate = new Date(Date.now() + 720000000)

    // TODO: Associate tasks for each department in the real task tracker
    const departmentTasks = currentBest.handled_by.map((department, index) => ({
      dueDate: arbitraryDueDate.getTime(), // can be replaced
      ...task,
      id: (db.data.tasks.length + 1 + index).toString(),
      groupId: department.replace(/[\d.]+ /g, '')
    }))

    createdTasks.push(...departmentTasks)
  })
  db.data.tasks.push(...createdTasks)
  await db.write()
  ctx.body = createdTasks
})
app.use(cors(koaOptions))
app.use(bodyParser());
app.use(router.routes())

app.listen(1339);