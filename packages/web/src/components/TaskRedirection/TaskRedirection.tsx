import React, {useState} from 'react'
import style from './TaskRedirection.module.scss'
import {Button, Card} from "@material-ui/core";
import {departmentList} from "../DepartmentsTree/departmentList";



export const TaskRedirection = () => {

  const options = ['- Установка урн (Отдел благоустройства и дорожного)',
    '- Согласование бюджета (Главная бухгалтерия)']

  const [isDepartmentsListOpen, setIsDepartmentsListOpen] = useState(false)

  const [selectedDeartment, setSelectedDepartment] = useState('')


  return <div className={style['task-redirection']}>
    {
      isDepartmentsListOpen ? <>

        <div className={style['title']}>Выберите отдел</div>

        <div className={style['department-list']}>
          {
            departmentList.map(department =>
              <Card
                key={department.title}
                className={style['department']}
                onClick={() => {
                  setSelectedDepartment(department.title)
                  setIsDepartmentsListOpen(false)
                }}>
                {department.title}
              </Card>)
          }
        </div>

        <Button onClick={() => setIsDepartmentsListOpen(false)} variant={'contained'} color={'primary'}>Назад</Button>
      </> : <>
        <div className={style['text']}>
          Задача была определена как <span className={style['text_bold']}>Ремонт </span> и потому попала в <span className={style['text_bold']}>Отдел благоустройства и дорожного хозяйства</span>
        </div>

        <div className={style['text']}>
          Другими вариантами были:
        </div>

        <div className={style['option-list']}>
          {
            options.map(option =>
              <Card className={style['option-card']}>
                <div className={style['option']}>{option}</div>
                <div className={style['button-field']}>
                  <Button  size={'small'} color={'primary'} onClick={() => {}} >Выбрать</Button>
                </div>

              </Card>
            )
          }
        </div>

        <div className={style['text']}>
          Если правильного варианта нет, вы можете передать в
          инстанцию выше по иерархии на распределение или
          выбрать нужный отдел самостоятельно
        </div>

        <div className={style['buttons']}>
          <Button onClick={() => {}} variant={'contained'} color={'primary'} className={style['button']}>Передать выше</Button>
          <Button onClick={() => {setIsDepartmentsListOpen(true)}} variant={'contained'} color={'primary'}>Выбрать отдел</Button>
        </div>
      </>
    }




  </div>
}