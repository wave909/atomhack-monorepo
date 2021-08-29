import React, {useCallback, useRef, useState} from 'react';

import {useEffect} from "react";
import _ from "lodash";
import {Button} from "@material-ui/core";

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

const ChatWidget = ({onClose}: {onClose?: () => void}) => {
  const [value, setValue] = useState("")
  const [response, setResponse] = useState<Term[][]>()

  const [successText, setSuccessText] = useState<string | null>(null)

  const throttled = useRef(_.throttle((newValue) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({"tasks": [newValue]});
      // TODO: Extract to common
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

  const send = useCallback((value: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify([{description: value}]);
    // TODO: Extract to common
    return fetch("https://atomhack-api.wave909.com/tasks", {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.json()).then(result => {
        setSuccessText(`Обращение отправлено в ${result[0].groupId}`)
      })
  }, [onClose])

  if(successText) {
    return <div style={{padding: 16}}>
      {successText}
      <pre>
        {value}
      </pre>
      {onClose && <Button onClick={onClose}>ОК</Button>}
    </div>
  }

  return <div style={{padding: 16}}>
    <h1>Создать обращение</h1>
    <div style={{display: 'flex', gap: 16}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <textarea value={value} onChange={(ev) => setValue(ev.target.value)}/>
        <Button onClick={() => send(value)}>Отправить</Button>
      </div>
      <div>{response?.map(terms => terms.map(term => <TermCard term={term}/>))}</div>
    </div>
  </div>
}

export default ChatWidget