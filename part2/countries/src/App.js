import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Form from './components/Form'
import Display from './components/Display'

const App = () => {
    const [newFind, setNewFind] = useState('')
    const [list, setList] =useState([])
    const [display, setDisplay] =useState([])

    useEffect(() =>
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(result => setList(result.data))
    , [])

    useEffect(() =>
        setDisplay(
            list
                .map(countries => countries.name)
                .filter(name => name.includes(newFind))
        )

    , [newFind, list])

    const onChangeHandler = (event) =>
        setNewFind(event.target.value)

    return (
        <>
            <div>
                <Form value={newFind} onChange={onChangeHandler} />
            </div>
            <div>
                <Display display={display} list={list} setDisplay={setDisplay} />
            </div>
        </>
    )
}

export default App;
