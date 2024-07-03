import Person from './Person'

const Content = ({persons}) => {
    return (
      <ul>
        {persons.map(person => 
          <Person key = {person.name} person = {person}  />
        )}
      </ul>
    )
  }

export default Content