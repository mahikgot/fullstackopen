import React from "react"

const Header = (props) => {
    return (
        <>
            <h1>{props.course.name}</h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.text} {props.number}</p>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            <Part text={props.data.parts[0].part} number={props.data.parts[0].exercises} />
            <Part text={props.data.parts[1].part} number={props.data.parts[1].exercises} />
            <Part text={props.data.parts[2].part} number={props.data.parts[2].exercises} />
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.data.parts[0].exercises + props.data.parts[1].exercises + props.data.parts[2].exercises}</p>
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                part:'Fundamentals of React',
                exercises: 10,
            },
            {
                part: 'Using props to pass data',
                exercises: 7,
            },
            {
                part: 'State of a component',
                exercises:14
            },
        ]
    }

    return (
        <div>
            <Header course={course} />
            <Content data={course} />
            <Total data={course} />
        </div>
    )
}

export default App
