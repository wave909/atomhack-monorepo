import React from 'react'
import {Task} from "./task";
import style from './TaskCard.module.scss'
import {Card} from "@material-ui/core";

export const TaskCard = ({task}: {task: Task}) => (<Card className={style['task-card']}>
    <div className={style['description']}>{task.description}</div>
    <div className={style['date']}>Время выполнения: {task.dueDate}</div>
    <div className={style['date']}>Дата постановки: {task.createDate}</div>
  </Card>)