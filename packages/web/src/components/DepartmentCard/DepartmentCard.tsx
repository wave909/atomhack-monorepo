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
  const [shownTasksAll, setShownTasksAll] = useState(false)
  const [shedule, setShedule] = useState<any>({
    1: {tasks: []},
    2: {tasks: []},
    3: {tasks: []},
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
  }, [shedule])
  const solvedTasks = useMemo(() => {
    return tasks.filter(task => solvedTasksIds[task.id])
  }, [solvedTasksIds, tasks])
  const unsolvedTasks = useMemo(() => {
    return tasks.filter(task => !solvedTasksIds[task.id])
  }, [tasks, solvedTasksIds])
  const shownTasks = useMemo(() => {
    return shownTasksAll ? solvedTasks : unsolvedTasks
  }, [shownTasksAll, tasks, unsolvedTasks])

  const [todayDate, setTodayDate] = useState<string>()
  const [workloadDate, setWorkloadDate] = useState<string>('')


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


      <div className={style['date-picker-field']}>
        <div className={style['label']}>Сегодня</div>
        <TextField
          className={style['date-picker']}
          type="date"
          value={todayDate}
          onChange={(e) => setTodayDate(e.target.value)}
        />
      </div>


    </div>

    <div className={style['columns']}>

      <div className={style['employee-list']}>
        <Paper onClick={() => setShowGantt(state => !state)} className={style['subtitle']}>Сотрудники</Paper>

        {showGantt ? <Mermaid chart={convertSheduleToGantt(shedule, new Date())}/> : mockEmployees.length !== 0 &&
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
        <Paper onClick={() => setSelectedEmployee(undefined)} className={style['subtitle']}>Задачи</Paper>
        {selectedEmployee ? selectedEmployee.name :
          <div style={{display: "flex", justifyContent: "space-between", marginBottom: 10}}>
            <div style={{cursor: "pointer", border: shownTasksAll ? "1px solid black" : "none"}}
                 onClick={() => setShownTasksAll(true)}>В работе
            </div>
            <div style={{cursor: "pointer", border: !shownTasksAll ? "1px solid black" : "none"}}
                 onClick={() => setShownTasksAll(false)}>Нераспределенные
            </div>
          </div>}
        {!shownTasksAll && <button onClick={() => {
          department && apiInstance.put(`/shedule/${department.title}`, {
            shedule,
            unsolvedTasks, currentDate: new Date().getTime()
          }).then(({data}) => {
            console.log(data)
            setTasks(data.unsolvedTasks)
            setShedule(data.newShedule)
          }).catch((e) => {
          })
        }}>Распределить
        </button>}

        {selectedEmployee ?
          shedule?.[selectedEmployee.id]?.tasks.map(task => <TaskCard task={task}/>)
          : shownTasks.length !== 0 &&
          <div className={style['list']}>
            {
              shownTasks.map(task => <TaskCard task={task}/>)
            }
          </div>
        }

      </div>

    </div>


  </div>
}