import React from 'react'
import {Task} from "./task";
import style from './TaskCard.module.scss'
import {Card} from "@material-ui/core";

export const TaskCard = ({task}: {task: Task}) => (<Card className={style['task-card']}>
  {task.id}
    <div className={style['description']}>{task.description}</div>
    <div className={style['date']}>Время выполнения: {new Date(task.dueDate).toLocaleDateString()}</div>
    <div className={style['date']}>Дата сдачи: {task.time}</div>
  </Card>)