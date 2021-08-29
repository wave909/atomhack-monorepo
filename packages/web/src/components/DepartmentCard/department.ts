import {Employee, testEmployee1, testEmployee2} from "../EmployeeCard/employee";

export interface Department {
  title: string
  path: string[]
  description: string,
  employees: Employee[]
}

export const testDepartment: Department = {
  title: 'Отдел общественной безопасности',
  description: 'Данный отдел занимается обеспечением общественной безопасности',
  path: ['1','7','1'],
  employees: [testEmployee1, testEmployee2]
}