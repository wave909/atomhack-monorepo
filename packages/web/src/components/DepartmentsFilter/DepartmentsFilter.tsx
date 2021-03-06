import React, { useState } from 'react'
import Modal from 'react-modal';
import style from './DepartmentsFilter.module.scss'
import modalStyle from '../../styles/modal.module.scss'
import {Department} from "../DepartmentCard/department";

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import ChatWidget from "../../classifier-widget";

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
  const [isClassifyOpen, setIsClassifyOpen] = useState(false)

  return (
    <div className={`${className || ''} ${style['department-filter']}`}>
      <Paper className={style['title']}>Выберите отделы</Paper>
        <TextField
          label={'Название отдела'}
          type="text"
          size={'medium'}
          inputProps={{fontSize: '50px'}}
          className={style['input']}
          value={filterString}
          onChange={(e) => setFilterString(e.target.value)}
        />


        <Button disabled={chosenDepartments.length === 0 } variant="contained" color="primary" className={style['reset']} onClick={onReset}>
          Сбросить выбор
        </Button>

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
              className={`${style['department']} ${
                department.path.length === 3 ?
                  style['department_child'] : ''
              }`}
              onClick={() => onDepartmentChoose(department)}
            >
              <Checkbox color='primary'
                className={style['check-square']}
                        checked={chosenDepartments.some((chosenDepartment) =>
                          chosenDepartment.title === department.title)!!}
              />

              <Card
                raised={chosenDepartments.some((chosenDepartment) =>
                  chosenDepartment.title === department.title)!!}
                className={`${style['text']}
                 `}
              >
                {department.title}
              </Card>
            </div>
          ))}
      </div>
      <Button variant={'contained'} color={'primary'}  onClick={() => setIsClassifyOpen(true)}>Создать обращение</Button>

      <Modal
        isOpen={isClassifyOpen}
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
        onRequestClose={() => setIsClassifyOpen(false)}>
        <ChatWidget onClose={() => setIsClassifyOpen(false)}/>
      </Modal>
    </div>
  )
}
