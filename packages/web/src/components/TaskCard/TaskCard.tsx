import React, {useState} from 'react'
import {Task} from "./task";
import style from './TaskCard.module.scss'
import {Card, Checkbox} from "@material-ui/core";

export const TaskCard = ({task}: {task: Task}) => {
const [isChecked, setIsChecked] = useState(false)

  return<Card className={style['task-card']}>
    <div className={style['header']}>
      <div className={style['id']}>
        {task.id}
      </div>

      <div onClick={() => setIsChecked(!isChecked)} className={style['check-field']}>
        <div className={style['label']}>
          Распределить
        </div>
        <Checkbox checked={isChecked} color={'primary'} size={'small'}/>
      </div>
    </div>

    <div className={style['description']}>{task.description}</div>
    <div className={style['date']}>Время выполнения: {new Date(task.dueDate).toLocaleDateString()}</div>
    <div className={style['date']}>Дата сдачи: {task.time}</div>
  </Card>
}