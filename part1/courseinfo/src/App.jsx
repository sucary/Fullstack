const Header = ({course}) => {
  console.log("Header " + course);
  const {name} = course;
  return <h1>{name}</h1>;
}

const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>;
}

const Content = ({course}) => {
  console.log("Content " + course);
  const {parts} = course;
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

const Total = ({course}) => {
  let total = 0
  const {parts} = course;
  parts.forEach(part =>
    {
      total += part.exercises
    })
  return (
    <p>
      Number of exercises: {total}
    </p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App