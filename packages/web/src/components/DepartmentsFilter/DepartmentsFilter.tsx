import React, { useState } from 'react'
import style from './DepartmentsFilter.module.scss'
import CheckIcon from '../../img/check-icon.svg'
import {Department} from "../DepartmentCard/department";

interface WithClassName {
  className?: string
}

export const DepartmentsFilter = ({
  className,
  departmentsList,
  chosenDepartments,
  onDepartmentChoose,
  onReset,
}: {
  departmentsList: Department[]
  chosenDepartments: Department[]
  onDepartmentChoose: (department: Department) => void
  onReset: () => void
} & WithClassName) => {
  const [filterString, setFilterString] = useState('')

  return (
    <div className={`${className || ''} ${style['department-filter']}`}>
      <div className={style['title']}>Выберете отделы:</div>

      <input
        className={style['input']}
        type="text"
        placeholder={'Название отдела'}
        value={filterString}
        onChange={(e) => setFilterString(e.target.value)}
      />

      {chosenDepartments.length !== 0 && (
        <div className={style['reset']} onClick={onReset}>
          Сбросить выбор
        </div>
      )}

      <div className={style['departments-list']}>
        {departmentsList
          .filter((department) => {
            return (
              chosenDepartments.find(
                (chosenDepartment) =>
                  chosenDepartment.title === department.title
              ) ||
              department.title
                .toLocaleUpperCase()
                .includes(filterString.toLocaleUpperCase())
            )
          })
          .map((department) => (
            <div
              key={department.title}
              className={style['department']}
              onClick={() => onDepartmentChoose(department)}
            >
              <div className={`${style['check-square']}`}>
                {chosenDepartments.find(
                  (chosenDepartment) =>
                    chosenDepartment.title === department.title
                ) && <img src={CheckIcon} alt="CheckIcon" />}
              </div>
              <div
                className={`${style['text']}
                 ${
                   department.type === 'committee'
                     ? style['text_committee']
                     : ''
                 }`}
              >
                {department.title}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
