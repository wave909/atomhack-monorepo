import React, {useEffect, useMemo, useState} from "react";
import {Department} from "./department";
import style from './DepartmentCard.module.scss'
import {Card, Paper, TextField} from "@material-ui/core";
import {EmployeeCard} from "../EmployeeCard/EmployeeCard";
import {testTask} from "../TaskCard/task";
import {TaskCard} from "../TaskCard/TaskCard";
import {Employee, testEmployee1, testEmployee2, testEmployee3} from "../EmployeeCard/employee";
import axios from "axios";
import {apiInstance} from "../../api";
import {Shedule} from "../../shedule-manager";
import {Mermaid} from "../../mermaid";
import {convertSheduleToGantt} from "../../shedule-manager/SheduleManager";
const _ = require("lodash")
const mockEmployees = [testEmployee1, testEmployee2, testEmployee3]
export const DepartmentCard = (props: { department: Department | undefined }) => {

  const [department, setDepartment] = useState<Department | undefined>(props.department)
  useEffect(() => {
    if (props.department) {
      setDepartment(props.department)
    }
  }, [props.department])

  const [tasks, setTasks] = useState<any[]>([])
  const [showGantt, setShowGantt] = useState(false)
  const [shownTasksAll, setShownTasksAll] = useState<"all"|"solved"|"unsolved">("all")
  const [solvableTasks,setSolvableTasks] = useState<any>([])
  const [readyToSolve,setReadyToSolve] = useState<any>(false)
  const [shedule, setShedule] = useState<any>({
    1: {tasks: [],productivity:1},
    2: {tasks: [],productivity:1},
    3: {tasks: [],productivity:1},
  })//TODO add type
  const [defaultShedule,setDefaultShedule]= useState<any>({
    1: {tasks: [],productivity:1},
    2: {tasks: [],productivity:1},
    3: {tasks: [],productivity:1},
  })//TODO add type
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>()
  useEffect(() => {
    if (department) {
      apiInstance.get(`/tasks/${department.title}`).//TODO add id
      then(({data}) => setTasks(data)).catch((e) => {
      })
      apiInstance.get(`/shedule/${department.title}`).//TODO add id
      then(({data}) => data && setShedule(data)).catch((e) => {//TODO add mapping to default
      })
    }
  }, [department])
  const solvedTasksIds = useMemo(() => {
    const _solvedTasksIds = {}
    Object.values(shedule).forEach(person => {
      (person as any).tasks.forEach(task => {
        _solvedTasksIds[task.id] = true
      })
    })
    return _solvedTasksIds
  },[shedule])

  const solvedTasks=useMemo(()=>{
    return tasks.filter(task=>solvedTasksIds[task.id])
  },[solvedTasksIds,tasks])
  const unsolvedTasks = useMemo(()=>{
    return tasks.filter(task=>!solvedTasksIds[task.id])
  },[tasks,solvedTasksIds])
  const shownTasks = useMemo(()=>{
    switch (shownTasksAll) {
      case "all":{
        return tasks
      }
      case "solved":{
        return solvedTasks
      }
      case "unsolved":{return unsolvedTasks}
    }
  }, [shownTasksAll, tasks, unsolvedTasks,solvedTasks])

  const [todayDate, setTodayDate] = useState<string>("2021-08-29T02:00:00.000Z")
  const [workloadDate, setWorkloadDate] = useState<string>('')

  const gantt = useMemo(()=>{return convertSheduleToGantt(shedule,todayDate?new Date(todayDate):new Date())},[todayDate,shedule])
  useEffect(()=>{
    if(!readyToSolve&&solvableTasks.length){
      setReadyToSolve(true)
    }
    readyToSolve&&todayDate&&apiInstance.put(`/shedule/${department.title}`, {
      shedule:defaultShedule,
      tasks:solvableTasks, currentDate: new Date(todayDate).getTime()
    }).then(({data}) => {
      console.log(data)
      // setTasks(data.unsolvedTasks)
      setShedule(data.newShedule)
    }).catch((e) => {
    })
   },[solvableTasks])
  useEffect(()=>{
    if(!readyToSolve){
      setSolvableTasks(solvedTasks)
    }
  },[solvedTasks])
  return <div className={style['department-card']}>

    <Paper className={style['title']}>
      {department?.title}
    </Paper>

    <div className={style['department-info']}>

      <div className={style['employee-count']}>
        {mockEmployees.length} Сотрудников
      </div>

      <div className={style['workload']}>
        {'60%'} Загрузка
      </div>

    </div>

    {
      department?.description &&
      <div className={style['description']}>
        {department.description}
      </div>
    }

    <div className={style['date-pickers']}>

      <div className={style['date-picker-field']}>
        <div className={style['label']}>Загрузка до</div>
        <TextField
          className={style['date-picker']}
          type="date"
          value={workloadDate}
          onChange={(e) => setWorkloadDate(e.target.value)}
        />
      </div>


      {/*<div className={style['date-picker-field']}>*/}
      {/*  <div className={style['label']}>Сегодня</div>*/}
      {/*  <TextField*/}
      {/*    className={style['date-picker']}*/}
      {/*    type="date"*/}
      {/*    value={todayDate}*/}
      {/*    onChange={(e) => setTodayDate(e.target.value)}*/}
      {/*  />*/}
      {/*</div>*/}


    </div>

    <div className={style['columns']}>

      <div className={style['employee-list']}>
        <Paper onClick={() => setShowGantt(state => !state)} className={style['subtitle']}>Сотрудники</Paper>

        {showGantt ? <Mermaid chart={gantt}/> : mockEmployees.length !== 0 &&
          <div className={style['list']}>
            {
              mockEmployees.map(employee =>
                <EmployeeCard
                  key={employee.id}
                  selected={selectedEmployee && selectedEmployee.id === employee.id}
                  onClick={() => {
                    if (selectedEmployee && selectedEmployee.id === employee.id) {
                      setSelectedEmployee(undefined)
                    } else {
                      setSelectedEmployee(employee)
                    }

                  }}
                  employee={employee}/>
              )
            }
          </div>
        }

      </div>

      <div className={style['task-list']}>
        <Paper onClick={()=>setSelectedEmployee(undefined)} className={style['subtitle']}>Задачи</Paper>
        {selectedEmployee?selectedEmployee.name:<div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <div style={{cursor:"pointer",border:shownTasksAll==="all"?"1px solid black":"none"}} onClick={()=>setShownTasksAll("all")}>Вce</div>
        <div style={{cursor:"pointer",border:shownTasksAll==="solved"?"1px solid black":"none"}} onClick={()=>setShownTasksAll("solved")}>В работе</div>
        <div style={{cursor:"pointer",border:shownTasksAll==="unsolved"?"1px solid black":"none"}} onClick={()=>setShownTasksAll("unsolved")}>Нераспределенные</div>
        </div>}
        {shownTasksAll==="all"&&<button onClick={() => {
          todayDate&&apiInstance.put(`/shedule/${department.title}`, {
            shedule:defaultShedule,
            tasks:solvableTasks, currentDate: new Date(todayDate).getTime()
          }).then(({data}) => {
            console.log(data)
            // setTasks(data.unsolvedTasks)
            setShedule(data.newShedule)
          }).catch((e) => {
          })
        }}>Распределить
        </button>}

        {selectedEmployee ? <div className={style['list']}>
          {shedule?.[selectedEmployee.id]?.tasks.map(task => <TaskCard isChecked={!!solvableTasks.find(it=>it.id===task.id)} setIsChecked={()=>{
            solvableTasks.find(it=>it.id===task.id)?setSolvableTasks(solvableTasks.filter(it=>it.id!==task.id)):setSolvableTasks([...solvableTasks,task])}
        } task={task}/>)}</div>
          : shownTasks.length !== 0 &&
          <div className={style['list']}>
            {
              shownTasks.map(task => <TaskCard isChecked={!!solvableTasks.find(it=>it.id===task.id)} setIsChecked={()=>{
              solvableTasks.find(it=>it.id===task.id)?setSolvableTasks(solvableTasks.filter(it=>it.id!==task.id)):setSolvableTasks([...solvableTasks,task])}
              } task={task}/>)
            }
          </div>
        }

      </div>

    </div>
  </div>
}

