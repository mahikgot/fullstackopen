import React from 'react'

const Persons = ({display}) =>
    <>
        {display.map(
            person => <div key={person.name}>{person.name} {person.number}</div>
        )}
    </>


export default Persons
