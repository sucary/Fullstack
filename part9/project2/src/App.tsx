interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourseDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CourseDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CourseRequirements extends CourseDescription{
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CourseRequirements;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

const Header = ({ name }: { name: string }) => {
  console.log("Header: " + name);
  return <h1>{name}</h1>;
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
}

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.description}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.description}</p>
            <p>{part.backgroundMaterial}</p>
          </div>
        )
      case "group":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.groupProjectCount}</p>
          </div>
        );
        case "special":
          return (
            <div>
              <h3>{part.name} {part.exerciseCount}</h3>
              <p>{part.description}</p>
              <p>{part.requirements}</p>
            </div>
          )
        default:
          return assertNever(part);
    }
}

const Total = ({ parts }: { parts: CoursePart[] }) => {
  let total = 0;
  total += parts.reduce((sum, part) => sum + part.exerciseCount, 0)
  return (
    <p>Number of exercises: {total}</p>
  )
} 

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  
  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;