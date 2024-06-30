import React from 'react'
import Course from './Course'

const Header = ({course}) => {
  console.log("Course name:", course);
  const {name} = course;
  return <h3>{name}</h3>;
}

const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>;
}

const Content = ({parts}) => {
  console.log("Current part:", {parts});
  return (
    <div> 
      {
        parts.map((part, index) => (
          <Part name = {part.name} exercises = {part.exercises} key = {index} />
        ))
      }
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, current) => {
    console.log('Current parts', sum, current)
    return sum += current.exercises
  }, 0)

  return (
    <b>
      Number of exercises: {total}
    </b>
  )}



const App = () => {
  const name = "Web development curriculum"
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>{name}</h1>
      <Course courses={courses} />
    

    </div>
  )
}

export { Header, Content, Total }
export default App