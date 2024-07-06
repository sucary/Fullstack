import Person from './Person'

const Content = ({persons, deleteNumber}) => {
    return (
      <ul>
        {persons.map(person => 
          <Person 
          key = {person.name} 
          person = {person} 
          deletePerson = {() => deleteNumber(person.id)} 
          />
        )}
      </ul>
    )
  }

export default Content