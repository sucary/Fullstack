import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [count, setCount] = useState(() => {
    const counts = {}
    console.log(counts)
    anecdotes.forEach(anecdote => {
      counts[anecdote] = 0
    })
    return counts
  })

  const maxVotesIndex = getMaxVotesIndex(count)

  const handleVoteClick = () => {
    const selectedAnecdote = anecdotes[selected]
    setCount({
      ...count,
      [selectedAnecdote]: count[selectedAnecdote] + 1
    })
  }

  const handleNextClick = () => {
    let updateSelected
    do {
      updateSelected = Math.floor(Math.random() * anecdotes.length)
    } while (updateSelected === selected)
    setSelected(updateSelected)
  }

  const getMaxVotesIndex = (counts) => {
    const voteArray = Object.values(counts)
    const maxVotes = Math.max(...voteArray)
    return voteArray.indexOf(maxVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {count[anecdotes[selected]]} votes</p>
      <Button onClick = {handleVoteClick} text = "vote" />
      <Button onClick = {handleNextClick} text = "next anecdote" />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotesIndex]}</p>
      <p>has {count[anecdotes[maxVotesIndex]]} votes</p>
    </div>
  )
}

export default App