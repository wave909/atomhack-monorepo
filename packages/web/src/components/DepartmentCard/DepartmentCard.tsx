import React, {useState} from "react";
import {Department} from "./department";
import style from './DepartmentCard.module.scss'
import {Card, Paper} from "@material-ui/core";
import {EmployeeCard} from "../EmployeeCard/EmployeeCard";
import {testTask} from "../TaskCard/task";
import {TaskCard} from "../TaskCard/TaskCard";
import {Employee} from "../EmployeeCard/employee";

export const DepartmentCard = ({department}: {department: Department}) => {

  const tasks = [testTask, testTask, testTask, testTask, testTask, testTask,]

  const [selectedEmployee, setSelectedEmployee] = useState<Employee>()

  return <div className={style['department-card']}>

    <Paper className={style['title']}>
      {department.title}
    </Paper>

    <div className={style['department-info']}>

      <div className={style['employee-count']}>
        {department.employees.length} Сотрудников
      </div>

      <div className={style['workload']}>
        {'60%'} Загрузка
      </div>

    </div>

    {
      department.description &&
      <div className={style['description']}>
        {department.description}
      </div>
    }

    <div className={style['columns']}>

      <div className={style['employee-list']}>
        <Paper className={style['subtitle']}>Сотрудники</Paper>

        { department.employees.length !== 0 &&
          <div className={style['list']}>
            {
              department.employees.map(employee =>
                <EmployeeCard selected={selectedEmployee && selectedEmployee.id === employee.id}
                              onClick={() => {
                                if(selectedEmployee && selectedEmployee.id === employee.id){
                                  setSelectedEmployee(undefined)
                                } else{
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
        <Paper className={style['subtitle']}>Задачи</Paper>

        { tasks.length !== 0 &&
        <div className={style['list']}>
          {
            tasks.map(task => <TaskCard task={task}/>)
          }
        </div>
        }

      </div>

    </div>




  </div>
}