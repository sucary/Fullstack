interface HeaderProps {
  courseName: string;
}

interface CourseParts {
  partName: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CourseParts[];
}

const Header = ({ courseName }: HeaderProps) => {
  console.log("Header: " + courseName);
  return <h1>{courseName}</h1>;
}

const Content = ({courseParts}: ContentProps) => {
  console.log("Content: " + {courseParts});
  return (
    <div>
      {
        courseParts.map((part, index) => (
          <Part 
            partName = {part.partName} 
            exerciseCount = {part.exerciseCount} 
            key = {index}
          />
        ))} 
    </div>
  );
}

const Part = ({partName, exerciseCount}: CourseParts) => {
  return <p>{partName} {exerciseCount}</p>
}

const Total = ({courseParts}: ContentProps) => {
  let total = 0;
  courseParts.forEach(part => {
    total += part.exerciseCount;
  })
  return (
    <p>Number of exercises: {total}</p>
  )
}

const App = () => {
  const course = {
    courseName: 'Half Stack application development',
    courseParts: [
      {
        partName: "Fundamentals",
        exerciseCount: 10
      },
      {
        partName: "Using props to pass data",
        exerciseCount: 7
      },
      {
        partName: "Deeper type usage",
        exerciseCount: 14
      }
    ]
  };
  
  return (
    <div>
      <Header courseName={course.courseName}/>
      <Content courseParts={course.courseParts} />
      <Total courseParts={course.courseParts} />
    </div>
  );
};

export default App;