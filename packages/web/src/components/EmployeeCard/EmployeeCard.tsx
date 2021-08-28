import React from "react";
import {Card} from "@material-ui/core";
import style from "./EmployeeCard.module.scss";
import {Employee} from "./employee";

export const EmployeeCard = ({employee, selected, onClick}:
                               { employee: Employee , selected?: boolean, onClick: () => void}) => {

  return <Card onClick={onClick} className={`${style['employee']}`} raised={selected}>
    <div className={style['employee__photo']}/>
    <div className={style['employee__info']}>
      <div className={style['employee__name']}> {employee.name} </div>
      <div className={style['employee__position']}> {employee.position} </div>
    </div>
  </Card>
}