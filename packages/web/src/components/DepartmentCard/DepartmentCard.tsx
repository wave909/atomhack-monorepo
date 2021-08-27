import React from "react";
import {Department} from "./department";
import style from './DepartmentCard.module.scss'

export const DepartmentCard = ({department}: {department: Department}) => {

  return <div className={style['department-card']}>
    <div className={style['container']}>
      <div className={style['left-column']}>
        <div className={style['title']}>
          {department.title}
        </div>
        <div className={style['description']}>
          {department.description}
        </div>
      </div>
      <div  className={style['photo']}>
        Фото??
      </div>
    </div>

    <div className={style['employee-title']}>
      Список сотрудников:
    </div>

    <div className={style['employee-list']}>
      {
        department.employees.map(employee =>
          <div className={style['employee-item']}>
          {employee.name}
        </div>)
      }
    </div>


  </div>
}