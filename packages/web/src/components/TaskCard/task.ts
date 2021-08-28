export type Task = {
  id:string,
  description:string,
  dueDate:number,
  createDate:number,
  groupId?:string
}

export const testTask: Task = {
  id: '1',
  description: 'Ну вот такое значит описание задачи. Кому интересно её назначат. Ну вот такое значит описание задачи. Кому интересно её назначат. Ну вот такое значит описание задачи. Кому интересно её назначат.',
  dueDate: 15,
  createDate: 2,
}