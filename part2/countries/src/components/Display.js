import React from 'react'
import Single from './Single'

const Display = ({display, list, setDisplay}) => {
    if (display.length < 11)
        if (display.length === 1) {
            const item = list[
                list
                    .map(countries => countries.name)
                    .findIndex(name => display[0] === name)
            ]
            return (
                <>
                    <Single countryData={item} />
                </>
            )
        }
        else
             return (
                <>
                    {display.map(props =>
                        <div key={props}>
                            {props}
                            <button onClick={() => setDisplay([props])}>
                                show
                            </button>
                        </div>
                    )}
                </>
            )
    else
        return (
            <>
                Too many matches, specify another filter
            </>
        )
}

export default Display
