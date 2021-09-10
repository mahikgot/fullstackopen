import React from 'react'

const PersonForm = ({onSubmit, name, number, nameChangeHandler, numberChangeHandler}) =>
    <form onSubmit={onSubmit}>
        <div>name: <input value={name} onChange={nameChangeHandler} /></div>
        <div>number: <input value={number} onChange={numberChangeHandler} /></div>
        <div>
            <button type='submit'>add</button>
        </div>
    </form>

export default PersonForm
