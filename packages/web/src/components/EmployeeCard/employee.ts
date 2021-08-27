import {Department, testDepartment} from "../DepartmentCard/department";

export interface Employee {
  name: string
  department: Department
}

export const testEmployee: Employee = {
  name: 'Сотрудник Сотрудников',
  department: testDepartment
}