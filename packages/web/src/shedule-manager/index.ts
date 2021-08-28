export type SheduleItem = {
  id: string
  start: number,
  end: number,
  dueDate: number
  time: number
  isBreakable?: boolean
}
export type task = { id: string, dueDate: number, time: number, isBreakable?: boolean }
export type Machine = { tasks: SheduleItem[] }
export type Shedule = { [key: string]: Machine }
export const addTask = (machines: { [key: string]: Machine }, task: task, currentDate) => {
  const [key, space] = getMinimalMachine(Object.entries(machines), task.dueDate)||[null,null]
  console.log(key,task.dueDate,task.time)
  if (!key) {
    return null
  }
  if (isMachineCanApplyTask(machines[key], task)) {
    const appliedMachine = applyTaskToMachine(machines[key], task)
    return {...machines,[key]:appliedMachine}

  } else {
    const nextMachines = {...machines}
    delete nextMachines[key]
    const newMachines = addTask(nextMachines, task, currentDate)
    if (newMachines) {
      return {...machines, ...newMachines}
    } else {
      return null
    }
  }


}

const getMinimalMachine = (machines: [string, Machine][], date) => {
  return machines.map(([key, machine]) => {
    let spaces = machine.tasks.filter(it => it.dueDate > date).map(it => {
      return it.dueDate - (it.end)
    })
    const tasksBefore = machine.tasks.filter(it => it.dueDate <= date)
    const startTask = tasksBefore.length ? tasksBefore[tasksBefore.length - 1].end : 0
    console.log(key,startTask,date,date-startTask)
    if(spaces.length){
      return [key,Math.min(startTask+Math.min(...spaces),date) - startTask]
    }
    return [key, date-startTask]
  }).sort((a, b) => a[1] < b[1] ? 1 : a[1] === b[1] ? 0 : -1)[0]
}
const isMachineCanApplyTask = (machine, task) => {
  const date = task.dueDate
  const tasksBefore = machine.tasks.filter(it => it.dueDate <= date)
  const startTask = tasksBefore.length ? tasksBefore[tasksBefore.length - 1].end : 0
  let spaces = machine.tasks.filter(it => it.dueDate > date).map(it => {
    return it.dueDate - (it.end)
  })
  if (!spaces.length) {
    return startTask + task.time <= task.dueDate
  }
  return startTask + task.time <= task.dueDate && Math.min(...spaces) >= task.time
}
const applyTaskToMachine = (machine:Machine, task) => {
  machine.tasks = [...machine.tasks, task].sort((a, b) => a.dueDate < b.dueDate ? -1 : a.dueDate === b.dueDate ? 0 : 1)
  machine.tasks.reduce((acc, it,index,array) => {
    it.start = acc
    it.end = acc + it.time
    return acc + it.time
  },0)
  return machine
}

