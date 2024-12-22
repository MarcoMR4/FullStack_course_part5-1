import { Header } from "./components/header";
import Content from "./components/content";
import Total from "./components/total";
import { useState } from "react";
import Display from "./components/display";
import Button from "./components/button";

const App = () => {

  const  [counter, setCounter] = useState(1);

  // setTimeout(() => {
  //   setCounter(counter + 1);
  // }, 1000);

  const handleClick = () => setCounter(counter * 2);
  const handleToZero = () => setCounter(0);
  const resetCounter = () => setCounter(1);
  

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

  return (
    <div>
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
      
    </div>
  )
}

export default App;