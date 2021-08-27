import React, {useEffect, useState} from 'react'
import { DepartmentsFilter} from "../DepartmentsFilter/DepartmentsFilter";
import {departmentList} from "./departmentList";
import style from './DepartmentTree.module.scss'
import {DepartmentCard} from "../DepartmentCard/DepartmentCard";
import {Department, testDepartment} from "../DepartmentCard/department";

export const DepartmentsTree = () => {
  const [chosenDepartments, setChosenDepartments] = useState<Department[]>([])

  const [graphvizBuf, setGraphvizBuf] = useState([])
  useEffect( () => {
    chosenDepartments.sort((a, b) => a.path.length > b.path.length ? 1 : -1)

    const newGraphvizBuf: any = []
    const nodes = {}
    chosenDepartments.forEach(chosenDepartment => {
      let last = nodes;
      for(const index of chosenDepartment.path) {
        last = (last[index] ??= {parent: last})
      }
      const node: any = last
      node.title = chosenDepartment.title
      newGraphvizBuf.push(`"${node.parent?.title || "root"}" -> "${node.title}"`)
    } )
    setGraphvizBuf(newGraphvizBuf)
  }, [chosenDepartments])


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
      {graphvizBuf.map((edge) => (
        <div>{edge}</div>
      ))}

      <DepartmentCard department={testDepartment}/>

      {/*<EmployeeCard />*/}
    </div>
  </div>
}