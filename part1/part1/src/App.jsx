import { Header } from "./components/header";
import Content from "./components/content";
import Total from "./components/total";

const App = () => {
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
    </div>
  )
}

export default App;