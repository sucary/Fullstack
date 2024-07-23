import { useState, useEffect } from 'react'
import Content from './components/Content'
import Filter from './components/Filter'
import Input from './components/Input'
import personService from './services/persons'
import Notification from './components/Notification'
import axios from 'axios'

const App = () => {
  
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState ('')

  const [notification, setNotification] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('Fetching array: ', initialPersons)
        setPersons(initialPersons)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = { name: newName, number: newNumber }
    const foundPerson = persons.find(person => person.name === newName)

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

            console.log(`Number of ${personObject.name} is replaced with ${newNumber}`)
            setNotification(
              {
                message: `Number of ${personObject.name} is replaced with ${newNumber}`,
                type: 'add'
              }
            )
            setTimeout(() => {
              setNotification('')
            }, 5000)
          })
          .catch(error => {
            setNotification(
              {
                message: `Error updating ${newName}`,
                type: 'error'
              }
            )
            setTimeout(() => {
              setNotification('')
            }, 5000)
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
        setNotification(
          {
            message: `${personObject.name} added to the phonebook`,
            type: 'success'
          }
        )
        setTimeout(() => {
          setNotification('')
        }, 5000)
      })

      .catch(error => {
        console.log('Error response:', error.response)
        console.log('Error data:', error.response.data)
        console.log("The error is:", error.response.data.error)
        if (error.response.data.error) {
          setNotification({
            message: error.response.data.error,
            type: 'error'
          })
        } else {
          setNotification(
            {
              message: `Error adding ${newName} to the phonebook`,
              type: 'error'
            })
        }

        setTimeout(() => {
          setNotification('')
        }, 5000)
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
          setNotification(
            {
              message: `${person.name} deleted successfully`,
              type: 'success'
            }
          )
          setTimeout(() => {
            setNotification('')
          }, 5000)
        })
        .catch(error => {
          setNotification(
            {
              message: `Error deleting ${person.name}`,
              type: 'error'
            }
          )
          setTimeout(() => {
            setNotification('')
          }, 5000)
        })
      }
    }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    

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

      <Notification message = {notification.message} type = {notification.type} />

      <Filter props = {{filter, handleFilterChange}} />
      <h2>add a new</h2>
      <Input props = {{addPerson, newName, newNumber, handleNameChange, handleNumberChange}} />
      <h2>Numbers</h2>
      
      <Content persons = {personsToShow} deleteNumber = {deleteNumber} />
    </div>
  )
}

export default App