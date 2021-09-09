import React from 'react'

const Course = ({course}) =>
    <div>
        <h1>{course.name}</h1>
        <ul>
            {course.parts.map(part =>
                <li key={part.id}>
                    {part.name} {part.exercises}
                </li>
            )}
        </ul>
        <b>
            Total of {' '}
            {course.parts.reduce(
                (sum, current) => (sum + current.exercises),
                 0
            )}
            {' '} exercises

        </b>
    </div>

export default Course
