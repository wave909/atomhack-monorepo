export type SheduleItem = {
  id: string
  start: number,
  end: number,
  dueDate: number
  time: number
  isBreakable?: boolean
  part?: number,
  description?:string
}
export type task = { id: string, dueDate: number, time: number, isBreakable?: boolean,description?:string }
export type Machine = { tasks: SheduleItem[],productivity?:number }
export type Shedule = { [key: string]: Machine }
export const addTask = (machines: { [key: string]: Machine }, task: task, currentDate) => {
  const [key, space] = getMinimalMachine(Object.entries(machines), task.dueDate, currentDate) || [null, null]
  console.log(key, task.dueDate, task.time)
  if (!key) {
    return null
  }
  const preparedTask = {...task,time:getProductivity(machines[key],task)*task.time}
  if (isMachineCanApplyTask(machines[key], preparedTask, currentDate)) {
    console.log(key)
    const appliedMachine = applyTaskToMachine(machines[key], preparedTask, currentDate)
    return {...machines, [key]: appliedMachine}

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

const getMinimalMachine = (machines: [string, Machine][], date, currentDate,getProductivity=(user:Machine)=>1) => {
  return machines.map(([key, machine]) => {
    let [beforeTasks, forwardTasks] = getForwardAndBeforeTasks(machine.tasks, currentDate)

    let spaces = forwardTasks.filter(it => it.dueDate > date).map(it => {
      return it.dueDate - (it.end)
    })
    const tasksBefore = forwardTasks.filter(it => it.dueDate <= date)
    const startTask = tasksBefore.length ? tasksBefore[tasksBefore.length - 1].end : currentDate
    if (spaces.length) {
      return [key,getProductivity(machine)*(Math.min(startTask + Math.min(...spaces), date) - startTask), forwardTasks.reduce((acc, it) => {
        return acc + it.time
      },0)]
    }
    return [key, getProductivity(machine)*(date - startTask), forwardTasks.reduce((acc, it) => {
      return acc + it.time
    }, 0)]
  }).sort((a, b) => a[1] < b[1] ? 1 : a[1] === b[1] ? a[2] > b[2] ? 1 : a[2] === b[2] ? 0 : -1:-1)[0]
}
const isMachineCanApplyTask = (machine: Machine, task, currentDate) => {
  const date = task.dueDate
  let [beforeTasks, forwardTasks] = getForwardAndBeforeTasks(machine.tasks, currentDate)

  const tasksBefore = forwardTasks.filter(it => it.dueDate <= date)
  const startTask = tasksBefore.length ? tasksBefore[tasksBefore.length - 1].end : currentDate
  let spaces = forwardTasks.filter(it => it.dueDate > date).map(it => {
    return it.dueDate - (it.end)
  })
  console.log(new Date(startTask),new Date(task.dueDate))
  if (!spaces.length) {
    return startTask + task.time <= task.dueDate
  }
  return startTask + task.time <= task.dueDate && Math.min(...spaces) >= task.time
}
const applyTaskToMachine = (machine: Machine, task, currentDate) => {
  let [beforeTasks, forwardTasks] = getForwardAndBeforeTasks(machine.tasks, currentDate)

  if (forwardTasks[0] && forwardTasks[0].start < currentDate && forwardTasks[0].end > currentDate) {
    const splittedTask = [{
      ...forwardTasks[0],
      end: currentDate,
      time: currentDate - forwardTasks[0].start
    }, {...forwardTasks[0], start: currentDate, time: forwardTasks[0].end - currentDate}].map((it, index) => ({
      ...it,
      part: (it.part || 0) + index
    }))
    forwardTasks.shift()
    forwardTasks = [splittedTask[1], ...forwardTasks]
    beforeTasks = [...beforeTasks, splittedTask[0]]
  }
  forwardTasks = [...forwardTasks, task].sort((a, b) => a.dueDate < b.dueDate ? -1 : a.dueDate === b.dueDate ? 0 : 1)
  forwardTasks.reduce((acc, it, index, array) => {
    it.start = acc
    it.end = acc + it.time
    return acc + it.time
  }, currentDate)
  machine.tasks = [...beforeTasks, ...forwardTasks]
  return machine
}
const getForwardAndBeforeTasks = (tasks, currentDate) => {
  let forwardTasks = tasks.filter(it => it.end > currentDate)
  let beforeTasks = tasks.filter(it => it.end <= currentDate) || []
  if (forwardTasks[0] && forwardTasks[0].start < currentDate && forwardTasks[0].end > currentDate) {
    const splittedTask = [{
      ...forwardTasks[0],
      end: currentDate,
      time: currentDate - forwardTasks[0].start
    }, {
      ...forwardTasks[0],
      start: currentDate,
      time: forwardTasks[0].end - currentDate,
      dueDate: forwardTasks[0].isBreakable ? forwardTasks[0].dueDate : forwardTasks[0].end
    }].map((it, index) => ({
      ...it,
      part: (it.part || 0) + index
    }))
    forwardTasks.shift()
    forwardTasks = [splittedTask[1], ...forwardTasks]
    beforeTasks = [...beforeTasks, splittedTask[0]]
  }
  return [beforeTasks, forwardTasks]
}
const getProductivity=(user:Machine,task:task)=>{
  return user.productivity||1
}