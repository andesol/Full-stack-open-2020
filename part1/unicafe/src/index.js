import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, btnText}) => {  
  return (
    <button onClick={onClick}>{btnText}</button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  
  const total = good + neutral + bad;
  const average = ((good-bad)/total).toFixed(2);
  const positivePercentage = (good/total*100).toFixed(2);
  
  if (total === 0) {
    return <div>No feeback given</div>
  } else {
    return (
      <table>
        <Statistic text='Good' value={good}/>
        <Statistic text='Neutral' value={neutral}/>
        <Statistic text='Bad' value={bad}/>
        <Statistic text='All' value={total}/>
        <Statistic text='Average' value={average}/>
        <Statistic text='Positive' value={`${positivePercentage} %`}/>
      </table>
    )
  }
}

const App = () => {  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0)

  const handleClick = (btn) => {
    if (btn === 'good') {
      setGood(good+1);
    } else if (btn === 'neutral') {
      setNeutral(neutral+1);
    } else {
      setBad(bad+1);
    }
  }
  return (
    <>
      <h2>Give feedback</h2>
      <Button onClick={() => handleClick('good')} btnText="Good"/>
      <Button onClick={() => handleClick('neutral')} btnText="Neutral"/>
      <Button onClick={() => handleClick('bad')} btnText="Bad"/>
      <h2>Statistics</h2>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
