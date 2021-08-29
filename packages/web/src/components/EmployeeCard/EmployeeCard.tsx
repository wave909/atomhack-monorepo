import React, {useState} from "react";
import {Card} from "@material-ui/core";
import style from "./EmployeeCard.module.scss";
import {Employee} from "./employee";

export const EmployeeCard = ({employee, selected, onClick,performance, setPerformance}:
                               { employee: Employee , selected?: boolean, onClick: () => void,performance:any, setPerformance:any}) => {


  return <Card onClick={onClick} className={`${style['employee']}`} raised={selected}>
    <div className={style['employee__photo']}/>
    <div className={style['employee__info']}>
      <div className={style['title']}> {employee.name} </div>
      <div className={style['subtitle']}> {employee.position} </div>
    </div>
    <div className={style['column']}>
      <div className={style['title']}> Загруженность {'75%'}</div>
      <div className={style['subtitle']}>Задач в плaне: {'4'}</div>
    </div>
    <div className={style['column']}>
      <div className={style['title']}>Производительность:</div>
      <input className={`${style['input']} ${style['subtitle']}`}
             type="number"
             value={performance}
             onChange={(e) => {
               console.log(setPerformance)
               setPerformance?.(parseFloat(e.target.value))
             }}/>
    </div>

  </Card>
}