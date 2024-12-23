import { Header } from "./components/header";
import Content from "./components/content";
import Total from "./components/total";
import { useState } from "react";
import Display from "./components/display";
import Button from "./components/button";
import History from "./components/history";
import Statistics from "./components/statistics";
import Result from "./components/result";

const App = () => {

  const  [counter, setCounter] = useState(1);
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  });

  // setTimeout(() => {
  //   setCounter(counter + 1);
  // }, 1000);

  const handleClick = () => setCounter(counter * 2);
  const handleToZero = () => setCounter(0);
  const resetCounter = () => setCounter(1);

  const [right, setRight] = useState(0);
  const [left, setLeft] = useState(0);
  const [allclicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const handleLeftClick = () => {
    setClicks({...clicks, left: clicks.left + 1});
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setAll(allclicks.concat('L'));
    setTotal(left + right);
  }

  const handleRightClick = () => {
    setClicks({...clicks, right: clicks.right + 1});
    setRight(right + 1);
    setAll(allclicks.concat('R'));
    setTotal(left + right);
  }

  const handleGood = () => setGood(good + 1);
  const handleBad = () => setBad(bad + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  
  console.log("Rendering: "+ counter);

  const courses = [
    {
      course: 'Half Stack application development',
      parts: [
        {
          part: 1,
          content: 'Fundamentals of React',
          exercise: 1,
          value: 10 
        },
        {
          part: 2,
          content: 'Using props to pass data',
          exercise: 2,
          value: 7
        },
        {
          part: 3,
          content: 'State of a component',
          exercise: 3,
          value: 16
        }
      ]
    }
  ];

  const[points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const handleNextAnecdote = () => {
    if(selected === anecdotes.length - 1) {
      setSelected(0);
      return;
    }
    setSelected(selected + 1);
  }

  const handleVoteAnecdote = () => { 
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  }


  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-7">
          {
            courses.map((course) => {
              return (
                <div key={course.course}>
                  <Header course={course.course} />
                  <Content parts={course.parts} />
                  <Total total = {course.parts.length} />
                </div>
              )
            })
          }
          <br />
          <Display counter={counter} /> 
          <br />
          <Button   
            onClick={handleClick} 
            text="Duplicate value" 
          />
          <Button 
            onClick={handleToZero} 
            text="Set to Zero"
          />
          <br />
          <Button 
            onClick={resetCounter} 
            text="Reset Counter"
          />
          <br />
          <br />
          <br />
          {clicks.left}
          <Button onClick = {handleLeftClick} text = "left" />
          <Button onClick = {handleRightClick} text = "right" />
          {clicks.right}
          <br />
          <History allClicks={allclicks} total = {total} />

        </div>

        <div className="col-md-5">
          <Header course="Exercise Unicafe"/>
          <br /><br />
          <Button onClick={handleGood} text="Good" />
          <Button onClick={handleNeutral} text="Neutral" />
          <Button onClick={handleBad} text="Bad" />
          <br /><br /><br />
          <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
      </div>
    <div className="row">
      <div className="col-md-7 mb-3 p-4"></div>
      <div className="col-md-5">
        <Header course="Anecdote of the day." />
        {anecdotes[selected]}
        <br />
        <Button onClick={handleNextAnecdote} text="Next anecdote" />
        <Button onClick={handleVoteAnecdote} text="Vote" />
        <br />
        <br />
        <Header course="Anecdote with most votes" />
        <br />
        <Result anecdotes={anecdotes} points={points} />

      </div>
    </div>
    </div>
  )
}

export default App;

