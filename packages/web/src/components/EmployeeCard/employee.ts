import {Department, testDepartment} from "../DepartmentCard/department";

export interface Employee {
  id: number
  name: string
  position: string
  department: Department
}

export const testEmployee1: Employee = {
  id: 1,
  name: 'Иван Иванов',
  position: 'Работник',
  department: testDepartment
}

export const testEmployee2: Employee = {
  id: 2,
  name: 'Петр Петров',
  position: 'Работник',
  department: testDepartment
}
export const testEmployee3: Employee = {
  id: 3,
  name: 'Петр Петров',
  position: 'Работник',
  department: testDepartment
}