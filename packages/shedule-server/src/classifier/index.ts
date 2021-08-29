import fetch from 'isomorphic-fetch'


export interface Term {
  token: string
  intent_ambiguity: {
    title: string
    handled_by: string[]
    words: string[]
  }[]
}

const publicBaseUrl = 'https://atomhack-predict.wave909.com'
const internalBaseUrl = 'http://atomhack-predict:1338'

// TODO: Extract to common
export const requestClassifications = (body): Promise<Term[][]> =>
  fetch(`${publicBaseUrl}/classify`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  }).then((res) => res.json())