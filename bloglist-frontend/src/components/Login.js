import React from 'react'

const formHandler = () => {
    return 1
  }
const loginComp = ({username, password, setUsername, setPassword}) => {
  return (
    <div>
      <form onSubmit={formHandler}>
        <div>
          <label> username
            <input
              type="text"
              name="Username"
              value={username}
              onChange={({target}) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label> password
            <input
              type="password"
              name="Password"
              value={password}
              onChange={({target}) => setPassword(target.value)}
            />
          </label>
        </div>
      </form>
    </div>
  )
}

export default loginComp
