import React, {useEffect, useState} from 'react'
import { DepartmentsFilter} from "../DepartmentsFilter/DepartmentsFilter";
import {departmentList, findByPath} from "./departmentList";
import style from './DepartmentTree.module.scss'
import {Department} from "../DepartmentCard/department";
import GraphScreen from "../../feature/graph";

/* eslint import/no-webpack-loader-syntax: off */
import StructureDot from '!!raw-loader!../../mock/structure.dot';

export const DepartmentsTree = () => {
  const [chosenDepartments, setChosenDepartments] = useState<Department[]>([])
  const [graphvizBuf, setGraphvizBuf] = useState('')
  useEffect( () => {
    const extendedDepartments = chosenDepartments.slice(0, chosenDepartments.length)
      chosenDepartments.forEach(chosenDepartment => {
      for(
        let path = chosenDepartment.path.slice(0, chosenDepartment.path.length - 1);
        path.length !== 0;
        path = path.slice(0, path.length - 1)
      ){
        const foundDepartment = findByPath(path)
        if(foundDepartment && !extendedDepartments.find(_department => _department.title === foundDepartment.title)){
          extendedDepartments.push(foundDepartment)
        }
      }
    })
    extendedDepartments.sort((a, b) => a.path.length > b.path.length ? 1 : -1)

    const newGraphvizBuf: any = []
    const nodes = {}
    extendedDepartments.forEach(chosenDepartment => {
      let last = nodes;
      for(const index of chosenDepartment.path) {
        last = (last[index] ??= {parent: last})
      }
      const node: any = last
      node.title = chosenDepartment.title
      newGraphvizBuf.push(`"${node.parent?.title || "root"}" -> "${node.title}"`)
    } )

    setGraphvizBuf(newGraphvizBuf.length === 0 ? '' : `digraph G { \n\n ${newGraphvizBuf.join('\n')} \n}`)
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
      <GraphScreen graphvizBuf={graphvizBuf === '' ? StructureDot : graphvizBuf}/>
    </div>
  </div>
}