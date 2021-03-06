import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notif, setNotif] = useState(null)

    const filterChangeHandler = (event) =>
        setNewFilter(event.target.value)

    useEffect(() =>
            noteService.getAll()
            .then(data =>
                setPersons(data)
            )
        , [persons.length])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notif={notif} />
            <Filter value={newFilter} onChange={filterChangeHandler} />
            <h3>add a new</h3>
            <PersonForm
                newName={newName}
                setNewName={(props) => setNewName(props)}
                setNewNumber={(props) => setNewNumber(props)}
                newNumber={newNumber}
                persons={persons}
                setPersons={(props) => setPersons(props)}
                setNotif={(props) => setNotif(props)}
            />
            <h3>Numbers</h3>
            <Persons
                remove={noteService.remove}
                persons={persons}
                setPersons={(props) => setPersons(props)}
                newFilter={newFilter}
            />
        </div>
    )
}

export default App
