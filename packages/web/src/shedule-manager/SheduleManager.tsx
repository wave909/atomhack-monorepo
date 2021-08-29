import React, {useEffect, useState} from "react";
import {addTask, Shedule} from "./index";
import {Mermaid} from "../mermaid";
import axios from "axios";

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
    const curDate = new Date(currentDate)

    curDate&&setGantt(convertSheduleToGantt(shedule,curDate))

  }, [shedule,currentDate])
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
      axios.create({baseURL:process.env.REACT_APP_BASE_PATH}).put("/shedule",{shedule,tasks:[{
          id: taskTitle,
          dueDate: taskDueDate.getTime(),
          time: _taskTime,
          isBreakable: !!taskBreakable
        }],currentDate: curDate.getTime()}).then(({data})=>data.newShedule&& setShedule?.(data.newShedule)).catch((e)=>{})
    }}>Добваить задачу</button>
    <Mermaid chart={gantt}/>
  </div>
}
export const convertSheduleToGantt = (shedule: Shedule,currentDate) => {
  return "gantt \n title A Gantt Diagram\n" +
    "todayMarker off\n" +
    "axisFormat  %Y-%m-%d-%H \n"+
    "dateFormat  DD.MM.YYYY HH:mm:ss \n" + Object.entries(shedule).map(([key, machine]) => {
      const tasks = `today:${currentDate.toLocaleDateString()},${currentDate.toISOString().split("Z")[0].split("T").join(" ")}  \n`+
        machine.tasks.map(it => `${it.id} ${new Date(it.dueDate).toISOString().split(":")[0]+(it.part?"Part"+it.part:"")} : ${new Date(it.start).toLocaleDateString() + " " +new Date(it.start).toLocaleTimeString() }, ${new Date(it.end).toLocaleDateString() +" " + new Date(it.end).toLocaleTimeString()} `).join("\n")
      return [key, tasks]
    }).map(it => {
      return `section ${it[0]} \n` + it[1]
    }).join("\n")

}