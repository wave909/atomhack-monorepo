import React, {useRef, useState} from 'react';

import {useEffect} from "react";
import _ from "lodash";

interface Term {
  token: string
  intent_ambiguity: {
    title: string
    handled_by: string[]
    words: string[]
  }[]
}

const TermCard = ({term}: {term: Term}) => {
  return <div>
    <h1 style={{background: 'deepskyblue', color: 'white', padding: 4, borderRadius: 8}}>{term.token}</h1>
    <h2>Возможные интерпретации:</h2>
    {term.intent_ambiguity.map(intent =>
      <p>
        <b>{intent.title}</b> ({intent.handled_by.join(', ')})
      </p>
    )}
  </div>
}

const ChatWidget = () => {
  const [value, setValue] = useState("")
  const [response, setResponse] = useState<any>()

  const throttled = useRef(_.throttle((newValue) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({"tasks": [newValue]});
      return fetch("https://atomhack-predict.wave909.com/classify", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      })
        .then(response => response.json()).then(result => {
          setResponse(result)
        })
    }, 200, { 'trailing': true })
  )

  useEffect(() => {
    throttled.current(value)
      .catch(error => console.log('error', error));
  }, [value])

  return <div>
    <h1>Демо классификатора задач</h1>
    <div style={{display: 'flex', gap: 16}}>
      <textarea value={value} onChange={(ev) => setValue(ev.target.value)}/>
      <div>{response?.map(terms => terms.map(term => <TermCard term={term}/>))}</div>
    </div>
  </div>
}

export default ChatWidget