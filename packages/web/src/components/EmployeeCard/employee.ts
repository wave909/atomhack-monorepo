import {Department, testDepartment} from "../DepartmentCard/department";

export interface Employee {
  name: string
  position: string
  department: Department
}

export const testEmployee: Employee = {
  name: 'Сотрудник Сотрудников',
  position: 'Работник',
  department: testDepartment
}