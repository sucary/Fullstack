import { useState, useEffect } from 'react'
import Content from './components/Content';
import Filter from './components/Filter';
import Input from './components/Input';
import axios from 'axios'

const App = () => {
  
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState ('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = { name: newName, number: newNumber }
    const foundPerson = persons.find(person => person.name === newName);

    if (foundPerson){
      alert(`${newName} is already added to phonebook, 
      and only one number per person!`)
    }
    else{
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        console.log(response.data.name, "added to the phonebook")
      })
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