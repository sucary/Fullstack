import { useState, useEffect } from 'react'
import Content from './components/Content';
import Filter from './components/Filter';
import Input from './components/Input';
import personService from './services/persons'
import axios from 'axios'

const App = () => {
  
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState ('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = { name: newName, number: newNumber }
    const foundPerson = persons.find(person => person.name === newName);

    if (foundPerson){

      if (newNumber === foundPerson.number){
        alert(`${newName} with number ${newNumber} already exists`)
      }
      else {
        if (window.confirm(`Name ${newName} is already added to phonebook, 
        replace the old number with a new one?`)) {
          personService
          .update(foundPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === foundPerson.id ? updatedPerson : p))
            setNewName('')
            setNewNumber('')
          })
        }
      }
    }

    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        console.log(personObject.name, "added to the phonebook")
      })
    }
  }

  const deleteNumber = id => {
    const person = persons.find(p => p.id === id)
    console.log(`${person.name} with number ${person.number} needs to be deleted`)

    if (window.confirm(`Confirm deleting ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          console.log(`${person.name} deleted successfully`)
          setPersons(persons.filter(p => p.id !== id))
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
      <Content persons = {personsToShow} deleteNumber = {deleteNumber} />
    </div>
  )
}

export default App