import React from 'react'

const Notification = ({notif}) => {
    if (notif === null)
        return null

    const notifStyle = {
        color: notif.error === true ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    }

    return (
        <div style={notifStyle}>
            {notif.message}
        </div>
    )
}

export default Notification
