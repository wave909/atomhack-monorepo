export default function lineBreak(text: string, maxLength: number = 20, separate: string = " ") {
  let newText = ""
  let separatedWords = ""

  text.split(separate)
    .forEach(separatedWord => {
      separatedWords += separatedWord + separate
      if (separatedWords.length >= maxLength) {
        newText += separatedWords + '\n'
        separatedWords = ""
      }
    })

  if (separatedWords.length) {
    newText += separatedWords
  }

  return newText
}