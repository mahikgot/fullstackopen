import React from 'react'
import noteService from '../services/notes'

const PersonForm = ({newName, setNewName, setNewNumber, newNumber, persons, setPersons, setNotif}) => {

    const nameChangeHandler = (event) =>
        setNewName(event.target.value)

    const numberChangeHandler = (event) =>
        setNewNumber(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        const index = persons.findIndex(person => person.name === newName)

        if (index !== -1) {
            if (window.confirm(`${newName} is already added to Phonebook, replace the old number with a new one?`)) {
                noteService
                    .update(
                        persons[index].id,
                        {...persons[index], number: newNumber}
                    )
                    .then(
                        response =>
                            setPersons(
                                    persons.map(
                                        person => person.id !== persons[index].id
                                            ? person
                                            : response
                                    )
                            )
                    )
                    .then(() =>
                        setNotif({error: false, message: `Successfully update ${persons[index].name}`})
                    )
                    .catch(error =>
                        setNotif({error: true, message:error.response.data.error})
                    )
            }
        }

        else {
            const toAdd = {
                name: newName,
                number: newNumber,
            }

            noteService
                .add(toAdd)
                .then(response => setPersons(persons.concat(response)))
                .then(() =>
                    setNotif({error: false, message: `Successfully added ${toAdd.name}`})
                )
                .catch(error =>
                    setNotif({error: true, message: error.response.data.error}))
        }

        setNewName('')
        setNewNumber('')
        setTimeout(() => setNotif(null), 1000)
    }

    return (
        <form onSubmit={addPerson}>
            <div>name: <input value={newName} onChange={nameChangeHandler} /></div>
            <div>number: <input value={newNumber} onChange={numberChangeHandler} /></div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

export default PersonForm
