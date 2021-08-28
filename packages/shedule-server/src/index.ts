const Koa = require("koa")
const cors = require("koa-cors")
const Router = require("koa-router")
const router = new Router()
var bodyParser = require('koa-body-parser');
const app = new Koa();
const koaOptions = {
  origin: true,
  credentials: true
};
const {addTask} = require("./shedule-manager/index")
export type Task= {
  id:string,
  description:string,
  dueDate:number,
  groupId?:string
}
const shedules={}
const tasks:Task[]=[{
  id: '1',
  description: 'Ну вот такое значит описание задачи. Кому интересно её назначат. Ну вот такое значит описание задачи. Кому интересно её назначат. Ну вот такое значит описание задачи. Кому интересно её назначат.',
  dueDate: new Date("24.08.221").getTime(),
},
  {
    id: '2',
    description: 'Ну вот такое значит описание задачи. Кому интересно её назначат. Ну вот такое значит описание задачи. Кому интересно её назначат. Ну вот такое значит описание задачи. Кому интересно её назначат.',
    dueDate: new Date("28.08.221").getTime(),
  },{
    id: '3',
    description: 'Ну вот такое значит описание задачи. Кому интересно её назначат. Ну вот такое значит описание задачи. Кому интересно её назначат. Ну вот такое значит описание задачи. Кому интересно её назначат.',
    dueDate: new Date("22.08.221").getTime(),
  },{
    id: '4',
    description: 'Ну вот такое значит описание задачи. Кому интересно её назначат. Ну вот такое значит описание задачи. Кому интересно её назначат. Ну вот такое значит описание задачи. Кому интересно её назначат.',
    dueDate: new Date("31.08.221").getTime(),
  }]
router.put("/shedule/:id",(ctx,next)=>{
  if(ctx.request.body.tasks&&Array.isArray(ctx.request.body.tasks)){
    const tasks = ctx.request.body.tasks.sort((a,b)=>a.dueDate<b.dueDate?-1:1)
    let shedule = ctx.request.body.shedule
    const unsolvedTasks=[]
    for(let task of tasks){
      const newShedule = addTask(shedule,task,ctx.request.body.currentDate)
      shedule=newShedule||shedule
      if(!shedule){
        unsolvedTasks.push(task)
      }
    }
    shedules[ctx.params.id]=shedule
    ctx.body= {newShedule: shedule,unsolvedTasks}
  }else {
    const newShedule = addTask(ctx.request.body.shedule, ctx.request.body.task, ctx.request.body.currentDate)
    console.log(newShedule)
    shedules[ctx.params.id]=newShedule
    ctx.body = {newShedule}
  }
})
router.get("/shedule/:id",(ctx,next)=>{
    ctx.body = shedules[ctx.params.id]

})
router.get("/tasks/:id",(ctx,next)=>{
  ctx.body= tasks.filter(item=>item)
})
router.post("/tasks",(ctx,next)=>{
  let newTasks = ctx.request.body
  tasks.forEach((task,index,array)=>{
    //TODO add naznachator
    if(newTasks.find(it=>it.id===task.id)){
      array[index]=newTasks.find(it=>it.id===task.id)
      newTasks = newTasks.filter(it=>it.id!==task.id)
    }
    tasks.push(...newTasks)
  })
})
app.use(cors(koaOptions))
app.use(bodyParser());
app.use(router.routes())

app.listen(1338);