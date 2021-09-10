import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '040-1234567',
        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [display, setDisplay] = useState([])

    const nameChangeHandler = (event) =>
        setNewName(event.target.value)

    const numberChangeHandler = (event) =>
        setNewNumber(event.target.value)

    const filter = (value) => {
        const doesMatch = persons.map(
            person => person.name.toUpperCase()
        ).map(
            name => name.includes(value.toUpperCase())
        )

        setDisplay(persons.filter(
            ({}, index) => doesMatch[index]
        ))
    }

    const filterChangeHandler = (event) => {
        setNewFilter(event.target.value)
        filter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (
            persons.map(person => person.name === newName).includes(true)
        )
            window.alert(`${newName} is already in the phonebook`)
        else
            setPersons(persons.concat(
                {
                    name: newName,
                    number: newNumber,
                }
            ))

        setNewName('')
        setNewNumber('')
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newFilter} onChange={filterChangeHandler} />
            <h3>add a new</h3>
            <PersonForm onSubmit={addPerson} name={newName} number={newNumber} nameChangeHandler={nameChangeHandler} numberChangeHandler={numberChangeHandler} />
            <h3>Numbers</h3>
            <Persons display={display} />
            </div>
    )
}

export default App
