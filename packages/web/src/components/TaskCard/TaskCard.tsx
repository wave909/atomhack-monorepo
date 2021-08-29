import React, {useState} from 'react'
import {Task} from "./task";
import style from './TaskCard.module.scss'
import {Button, Card, Checkbox} from "@material-ui/core";
import Modal from "react-modal";
import modalStyle from "../../styles/modal.module.scss";
import {TaskRedirection} from "../TaskRedirection/TaskRedirection";

export const TaskCard = ({task,isChecked,setIsChecked}: {task: Task,isChecked:boolean,setIsChecked:any}) => {

  const [isTaskRedirectModalOpen, setIsTaskRedirectModal] = useState(false)

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

    <div className={style['task-reset']}>
      <Button size={'small'} onClick={() => setIsTaskRedirectModal(true)}>
        Ошибка распределения?
      </Button>
    </div>

    <Modal
      isOpen={isTaskRedirectModalOpen}
      closeTimeoutMS={200}
      className={{
        base: modalStyle['modal'],
        afterOpen: modalStyle['modal__opened'],
        beforeClose: modalStyle['modal__closed'],
      }}
      overlayClassName={{
        base: modalStyle['modal-overlay'],
        afterOpen: modalStyle['modal-overlay__opened'],
        beforeClose: modalStyle['modal-overlay__closed'],
      }}
      onRequestClose={() => setIsTaskRedirectModal(false)}>
      <TaskRedirection/>
    </Modal>

  </Card>
}