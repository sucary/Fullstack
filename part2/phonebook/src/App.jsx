import { useState } from 'react'
import Content from './components/Content';
import Filter from './components/Filter';
import Input from './components/Input';

const App = () => {

  const initialPersons = 
    [
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]
  
  const [persons, setPersons] = useState(initialPersons)

  const [newName, setNewName] = useState('')
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
      <Filter props = {{filter, handleFilterChange}} />
      <h2>add a new</h2>
      <Input props = {{addPerson, newName, newNumber, handleNameChange, handleNumberChange}} />
      <h2>Numbers</h2>
      <Content persons = {personsToShow} />
    </div>
  )
}

export default App