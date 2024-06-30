import React from 'react'
import { Header, Content, Total } from './App'

const Course = ({courses}) => {
    return (
      <>
        {courses.map(course => (<div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </>
    );
  }

  export default Course