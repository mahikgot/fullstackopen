import React from 'react'

const Persons = ({remove, persons, setPersons, newFilter}) => {
    const filter = (value, toFilter) => {
        const doesMatch = toFilter
            .map(
                person => person.name.toUpperCase()
            )
            .map(
            name => name.includes(value.toUpperCase())
            )
        return (
            toFilter
                .filter(
                    ({}, index) => doesMatch[index]
        ))
    }

    const onClickHandler = (person)=> {
        if (window.confirm(`are u sure u want to delete ${person.name}`))
            remove(person.id)
            setPersons([])
    }

    return (
        <>
            {filter(newFilter, persons).map(
                person =>
                <div key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() => onClickHandler(person)}>
                        delete
                    </button>
                </div>
            )}
        </>
    )
}


export default Persons
