import React, {useEffect, useState} from "react";
import {addTask, Shedule} from "./index";
import {Mermaid} from "../mermaid";

const today = new Date()
today.setHours(0,0,0,0)

export const SheduleManager = () => {
  const [currentDate, setCurrentDate] = useState(today.toISOString())
  const [taskDate, setTaskDate] = useState(today.toISOString())
  const [taskTitle, setTaskTitle] = useState("New")
  const [taskBreakable, setTaskBreakable] = useState("Yes")
  const [taskTime, setTaskTime] = useState(0)
  const [shedule, setShedule] = useState({one: {tasks: []}, two: {tasks: []}, three: {tasks: []}})
  const [gantt, setGantt] = useState("")
  useEffect(() => {
    setGantt(convertSheduleToGantt(shedule))

  }, [shedule])
  console.log(gantt)
  return <div>
    <input value={currentDate} onChange={(e) => setCurrentDate(e.target.value)}/>
    <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
    <input value={taskDate} onChange={(e) => setTaskDate(e.target.value)}/>
    <input value={taskBreakable} onChange={(e) => setTaskBreakable(e.target.value)}/>
    <input type={"number"} value={taskTime} onChange={(e) => setTaskTime(Number.parseInt(e.target.value))}/>
    <button title={"Добавить задачу"} onClick={() => {
      const curDate = new Date(currentDate)
      const taskDueDate = new Date(taskDate)
      const _taskTime = taskTime * 60 * 60 * 1000
      console.log(taskDate, taskDueDate)
      const newShedule = addTask(shedule, {
        id: taskTitle,
        dueDate: taskDueDate.getTime(),
        time: _taskTime,
        isBreakable:!!taskBreakable
      }, curDate.getTime())
      console.log(newShedule)
      newShedule && setShedule(newShedule)
    }}>Добваить задачу</button>
    <Mermaid chart={gantt}/>
  </div>
}
const convertSheduleToGantt = (shedule: Shedule) => {
  return "gantt \n title A Gantt Diagram\n" +
    "dateFormat  YYYY-MM-DD HH:mm:ss.ms \n" + Object.entries(shedule).map(([key, machine]) => {
      const tasks = machine.tasks.map(it => `${new Date(it.dueDate).toISOString().split(":")[0]+(it.part?"PArt"+it.part:"")} : ${new Date(it.start).toISOString().split("Z")[0].split("T").join(" ")}, ${new Date(it.end).toISOString().split("Z")[0].split("T").join(" ")} `).join("\n")
      return [key, tasks]
    }).map(it => {
      return `section ${it[0]} \n` + it[1]
    }).join("\n")
}