import { useState } from 'react'

const Header = ({title}) =>{
  return <h1>{title}</h1>
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>

  
)

const Statistics = ({feedbacks}) => {
  const {good, neutral, bad} = feedbacks
  const total = good + neutral + bad
  const average = (good - bad) / (good + bad + neutral)
  const positive = (good)/(good + bad + neutral) * 100
  
  if(total == 0){
    return <p>No feedback given</p>
  }
  return (
    <>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>total {total}</p>
    <p>average {average}</p>
    <p>positive {positive} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    const updateGood = good + 1
    setGood(updateGood)
  }

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
  }

  const handleBadClick = () => {
    const updateBad = bad + 1
    setBad(updateBad)
  }




  return (
    <div>
      
      <Header title = "give feedback" />

      <Button handleClick = {handleGoodClick} text = "good" />
      <Button handleClick = {handleNeutralClick} text = "neutral" />
      <Button handleClick = {handleBadClick} text = "bad" />
      <Header title = "statistics" />
      <Statistics feedbacks = {{good, neutral, bad}} />
    </div>
  )
}


export default App