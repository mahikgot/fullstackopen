import React,{useState} from 'react'
import './index.css'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Uint32Array(anecdotes.length))

    const getRandomIntInclusive = (min, max) =>
        Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

    const addVote = () => {
        const copy = [...votes]
        copy[selected] += 1

        return (
            setVotes(copy)
        )
    }

    const findHighest = () =>
        anecdotes[votes.findIndex((element) => element === Math.max(...votes))]

    return (
        <>
            <div>
                <h1>Anecdote of the day</h1>
                {anecdotes[selected]}{'\n'}
                has {votes[selected]} votes{'\n'}
                <button onClick={() => setSelected(getRandomIntInclusive(0, anecdotes.length-1))}>next anecdote</button>
                <button onClick={addVote}>vote</button>
            </div>
            <div>
                <h1>Anecdote with most votes</h1>
                {findHighest()}{'\n'}
                has {Math.max(...votes)} votes
            </div>
        </>
    )
}

export default App
