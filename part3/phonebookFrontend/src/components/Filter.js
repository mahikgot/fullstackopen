import React from 'react'

const Filter = ({value, onChange}) =>
        <form>
            <div>filter shown with: <input value={value} onChange={onChange} /></div>
        </form>

export default Filter
