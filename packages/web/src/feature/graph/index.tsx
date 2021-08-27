import React, {useCallback, useEffect, useRef} from 'react';
import {graphviz} from 'd3-graphviz';
/* eslint import/no-webpack-loader-syntax: off */
import StructureDot from '!!raw-loader!../../mock/structure.dot';

export default function GraphScreen() {
  const graphRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<NodeListOf<SVGGElement>>()

  const onNodeClick = useCallback((e) => {
    const title = e.target?.textContent
    console.log("ON CLICK", title)
  }, [])

  const cleanNodeClickEvent = () => {
    if (nodesRef.current) {
      nodesRef.current.forEach(node => {
        node.removeEventListener("click", onNodeClick)
      })
    }
  }

  useEffect(() => {
    if (graphRef.current) {
      graphviz(graphRef.current)
        .options({
          width: window.innerWidth,
          height: window.innerHeight,
        })
        .renderDot(StructureDot, () => {
          cleanNodeClickEvent()

          const graph = graphRef.current?.querySelector<SVGGElement>(".graph")
          graph?.addEventListener("wheel", (e) => {
            console.log("SCALE", graph?.transform?.animVal?.getItem(1)?.matrix?.a)
          })

          nodesRef.current = graphRef.current?.querySelectorAll(".node");
          nodesRef.current?.forEach(node => {
            node.addEventListener("click", onNodeClick)
          })
        })
    } else {
      cleanNodeClickEvent()
    }

    return function () {
      cleanNodeClickEvent()
    }
  }, [graphRef])

  return <div ref={graphRef}/>
}