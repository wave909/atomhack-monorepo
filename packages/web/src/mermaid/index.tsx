import React, {useEffect, useRef, useState} from "react"
import mermaid from "mermaid"



export const Mermaid = ({ chart }: {chart: string}) => {
  mermaid.initialize({})
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(!ref.current) return
    delete ref.current.dataset.processed
    mermaid.contentLoaded()

    try {
      const api = mermaid.parse(chart).parser.yy
      if(api.graphType !== 'gantt') return
      console.log(Object.keys(api))
      console.log(api.getTasks()
        .map(({startTime, endTime, task}) =>
          `${task.trim()}: ${startTime.toISOString()} - ${endTime.toISOString()}`)
        .join('\n'))
    } catch (e) {
      // ignored. mermaid-js throws errors when it cannot parse the input.
    }
  }, [chart])

  if (!chart) return null
  return (
    <div className="mermaid" ref={ref}>
      {chart}
    </div>
  )
}

const PlanConstructor = () => {
  const [value, setValue] = useState("")
  return <div>
    <textarea value={value} onChange={(ev) => setValue(ev.target.value)}/>
    <Mermaid chart={value}/>
  </div>
}

export default PlanConstructor

