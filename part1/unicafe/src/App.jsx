import { useState } from 'react'

const Header = ({title}) =>{
  return <h1>{title}</h1>
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({feedbacks}) => {
  const {good, neutral, bad} = feedbacks
  const total = good + neutral + bad
  const average = (good - bad) / (good + bad + neutral)
  const positive = (good)/(good + bad + neutral) * 100
  
  if(total == 0){
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
      <StatisticLine text = "good" value = {good} />
      <StatisticLine text = "neutral" value = {neutral} />
      <StatisticLine text = "bad" value = {bad} />
      <StatisticLine text = "total" value = {total} />
      <StatisticLine text = "average" value = {average} />
      <StatisticLine text = "positive" value = {positive} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {

  if (props.text == "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }
  return(  
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
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

      <Button onClick = {handleGoodClick} text = "good" />
      <Button onClick = {handleNeutralClick} text = "neutral" />
      <Button onClick = {handleBadClick} text = "bad" />
      <Header title = "statistics" />
      <Statistics feedbacks = {{good, neutral, bad}} />
    </div>
  )
}


export default App