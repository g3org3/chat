
export default function Text(props: { text: string }) {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const mentionsRegex = /@(\w+)/g

  const splitText = props.text
    .split(linkRegex)
    .map((part) => part.split(mentionsRegex))
    .flat()

  const textFormatted = splitText.map((part, index) => {
    if (part.match(linkRegex) && part.indexOf('https://emojis.slackmojis') === 0) {
      return (
        <img className="h-4 inline-block" src={part} />
      )
    } else if (part.match(linkRegex)) {
      return (
        <a className="text-blue-500 hover:underline" key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      )
    } else if (part.match(mentionsRegex)) {
      return (
        <b key={index} className="font-bold">
          {part}
        </b>
      )
    } else {
      return <span key={index}>{part}</span>
    }
  })

  return (
    <p className="text-gray-800 text-sm">
      {textFormatted}
    </p>
  )
}
