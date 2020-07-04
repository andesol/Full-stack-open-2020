import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const getRandomNumber = (min, max) => {
    // Both max and min included
    return Math.floor(Math.random()*(max-min));
  }
  
  const [anecdote, setAnecdote] = useState(getRandomNumber(1,anecdotes.length));
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const increasePoints = () => {
    const newPoints = [...points];
    newPoints[anecdote] += 1;
    setPoints(newPoints);
  }

  const next = () => {
    const newAnecdote = getRandomNumber(1,anecdotes.length);
    setAnecdote(newAnecdote);
  }

  const maxPoints = Math.max(...points);
  const bestAnecdote = points.findIndex((point) => point === maxPoints)

  return (
    <>
       <section>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[anecdote]}</p>
        <p>has {points[anecdote]} votes</p>
        <button onClick={increasePoints}>Vote</button>
        <button onClick={next}>Next anecdote</button>
      </section>
      <section>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[bestAnecdote]}</p>
        <p>has {maxPoints} votes</p>
      </section>
      
    </>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
