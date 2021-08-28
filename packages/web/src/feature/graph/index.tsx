import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {graphviz} from 'd3-graphviz';
import style from './style.module.scss'
import lineBreak from "../../utils/line-break";
import {DepartmentCard} from "../../components/DepartmentCard/DepartmentCard";
import {departmentList} from "../../components/DepartmentsTree/departmentList";
import {Department} from "../../components/DepartmentCard/department";

export default function GraphScreen({graphvizBuf}: { graphvizBuf: [{ title: string, id: string }, { title: string, id: string }][] }) {
  const graphRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<NodeListOf<SVGGElement>>()
  const [selectedNode, setSelectedNode] = useState<Department>()

  const onNodeClick = useCallback((e) => {
    e.stopPropagation()
    e.preventDefault()

    const id = e.path && e.path[1]?.id
    const title = e.path && e.path[1]?.children?.item(0)?.textContent
    console.log("ON NODE CLICK", id)
    if (title) {
      setSelectedNode(departmentList.find(department => department.title === id))
    }
  }, [])

  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const pageClickEvent = (e: Event) => {
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setSelectedNode(undefined)
      }
    }
    if (selectedNode) {
      window.addEventListener('click', pageClickEvent)
    }
    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [selectedNode])

  const cleanEvents = () => {
    nodesRef.current?.forEach(node => {
      node.removeEventListener("click", onNodeClick)
    })
  }

  const graphString = useMemo(() => {
    const uniqueEdges: { title: string, id: string }[] = []
    graphvizBuf.forEach(([edgeFrom, edgeTo]) => {
      if (!uniqueEdges.find(edge => edge.id === edgeFrom.id)) {
        uniqueEdges.push(edgeFrom)
      }
      if (!uniqueEdges.find(edge => edge.id === edgeTo.id)) {
        uniqueEdges.push(edgeTo)
      }
    })


    return `digraph G {
      splines = ortho

      node [
        shape = rect
      ]

      ${
      uniqueEdges
        .map(edge => {
          return `"${lineBreak(edge.title)}" [id="${edge.id}"]`
        })
        .join('\n')
      }

      ${
      graphvizBuf
        .map(([edgeFrom, edgeTo]) => {
          return `"${lineBreak(edgeFrom.title)}" -> "${lineBreak(edgeTo.title)}" [id="${edgeFrom}_${edgeTo}"]`
        })
        .join('\n')
      }
      }`
  }, [graphvizBuf])

  useEffect(() => {
    if (graphRef.current) {

      graphviz(graphRef.current)
        .options({
          width: graphRef.current.offsetWidth,
          height: graphRef.current.offsetHeight,
        })
        .renderDot(graphString, () => {
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
  }, [graphRef, graphString])

  return <>
    <div className={style['container']}>
      <div className={style['graph']} ref={graphRef}/>
    </div>
    {
      selectedNode && <div ref={modalRef} className={style['modal']}>
        <DepartmentCard department={selectedNode}/>
      </div>
    }
  </>
}