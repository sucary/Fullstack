import Person from './components/Person'
import { useState } from 'react'









const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState(   // controlled component
    'Add a new person...'
  )
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState ('')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = { name: newName, number: newNumber }
    const foundPerson = persons.find(person => person.name === newName);

    if (foundPerson){
      alert(`${newName} is already added to phonebook, 
      and only one number per person!`)
    }
    else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form>
        filter by name: <input 
        value = {filter}
        onChange = {handleFilterChange} />
      </form>

      <h2>add a new</h2>

      <form onSubmit = {addPerson}>
        
        <div>name: 
          <input
          value = {newName}
          onChange = {handleNameChange}/>
        </div>

        <div>number:           
          <input
          value = {newNumber}
          onChange = {handleNumberChange}/>
        </div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>

      <ul>
        {personsToShow.map(person => 
          <Person key = {person.name} person = {person}  />
        )}
      </ul>
    </div>
  )
}

export default App