import React, {useCallback, useEffect, useRef, useState} from 'react';
import {graphviz} from 'd3-graphviz';
import style from './style.module.scss'

export default function GraphScreen({graphvizBuf}: {graphvizBuf: string}) {
  const graphRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<NodeListOf<SVGGElement>>()
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const onNodeClick = useCallback((e) => {
    e.stopPropagation()
    e.preventDefault()

    const title = e.target?.textContent
    console.log("ON CLICK", title)
    if (title) {
      setSelectedNode(title)
    }
  }, [])

  const onGraphClick = useCallback((e) => {
    setSelectedNode(null)
  }, [])

  const cleanEvents = () => {
    nodesRef.current?.forEach(node => {
      node.removeEventListener("click", onNodeClick)
    })
  }

  useEffect(() => {
    if (graphRef.current) {
      graphviz(graphRef.current)
        .options({
          fade: true,
          width: window.innerWidth,
          height: window.innerHeight,
        })
        .renderDot(graphvizBuf, () => {
          cleanEvents()

          nodesRef.current = graphRef.current?.querySelectorAll(".node");
          nodesRef.current?.forEach(node => {
            node.addEventListener("click", onNodeClick)
          })
        })
    } else {
      cleanEvents()
    }

    return function () {
      cleanEvents()
    }
  }, [graphRef, graphvizBuf])

  return <div className={style['container']} onClick={onGraphClick}>
    <div className={style['graph']} ref={graphRef}/>
    {
      selectedNode && <div className={style['modal']}>
        {selectedNode}
      </div>
    }
  </div>
}