import React, {useState} from 'react'
import {department, DepartmentsFilter} from "../DepartmentsFilter/DepartmentsFilter";
import {departmentList} from "./departmentList";
import style from './DepartmentTree.module.scss'

export const DepartmentsTree = () => {
  const [chosenDepartments, setChosenDepartments] = useState<department[]>([])
  return <div className={style['page-wrapper']}>
    <DepartmentsFilter
      onReset={() => setChosenDepartments([])}
      chosenDepartments={chosenDepartments}
      onDepartmentChoose={(department) =>
        setChosenDepartments((prevState) =>
          prevState.find(
            (chosenDepartment) => chosenDepartment.title === department.title
          )
            ? prevState.filter(
              (_department) => _department.title !== department.title
            )
            : [department, ...prevState]
        )
      }
      departmentsList={departmentList}
      className={style['left-column']}
    />

    <div className={style['right-column']}>
      {chosenDepartments.map((department) => (
        <div>{department.title}</div>
      ))}
    </div>
  </div>
}