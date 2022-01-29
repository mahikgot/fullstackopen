import React from 'react'
import login from '../services/login'
const formHandler = async (username, password, e) => {
  e.preventDefault();
  const response = await login({username, password});
  console.log(response);
  }
const loginComp = ({username, password, setUsername, setPassword}) => {
  return (
    <div>
      <form onSubmit={(e) => formHandler(username, password, e)}>
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
        <button type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default loginComp
