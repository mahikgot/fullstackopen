import React, {useState} from 'react'
import './index.css'

const App = () => {
    const [clicks, setClicks] = useState({
        good: 0,
        bad: 0,
        neutral: 0,
    })


    const increaseByOne = (props) => () => {

        if (props === 'good')
            setClicks({...clicks, good: clicks.good+1})

        else if (props === 'bad')
            setClicks({...clicks, bad: clicks.bad+1})

        else
            setClicks({...clicks, neutral: clicks.neutral+1})
    }


    return (
        <div>
            <h1>give feedback</h1>
            <div>
                <Button onClick={increaseByOne} sent='good' />
                <Button onClick={increaseByOne} sent='neutral' />
                <Button onClick={increaseByOne} sent='bad' />
            </div>
            <h1>statistics</h1>
            <Statistics clicks={clicks} />
        </div>
    )
}
const Button = ({onClick, sent}) =>
    <button onClick={onClick(sent)}>{sent}</button>

const Statistics = ({clicks}) => {
    const all = () => clicks.good + clicks.bad + clicks.neutral

    const average = () => ((clicks.good-clicks.bad)/all()).toLocaleString(undefined, {maximumFractionDigits: 2})

    const positive = () => (clicks.good/all()).toLocaleString(undefined, {style: 'percent', maximumFractionDigits: 2})


    if (all() === 0) {
        return (
            <>
                No feedback given
            </>
        )
    }

    return (
        <table>
            <tbody>
                <StatisticLine text='good' value={clicks.good} />
                <StatisticLine text='neutral' value={clicks.neutral} />
                <StatisticLine text='bad' value={clicks.bad} />
                <StatisticLine text='all' value={all()} />
                <StatisticLine text='average' value={average()} />
                <StatisticLine text='positive' value={positive()}/>
            </tbody>
        </table>
    )
}

const StatisticLine = ({text, value}) =>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>

export default App
