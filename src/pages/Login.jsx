import React from 'react'
import { Redirect } from 'react-router-dom'

import { SessionContext } from '../services/session'

import '../styles/pages/Login.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      code: '',
      disabled: true,
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2>Login</h2>
        <SessionContext.Consumer>
          {context => {
            if (context.loggedIn) {
              return <Redirect to="/candidates" />
            } else {
              return (
                <form onSubmit={this.login(context)}>
                  <input
                    type="text"
                    id="code"
                    placeholder="Code"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Log in"
                    disabled={this.state.disabled}
                  />
                </form>
              )
            }
          }}
        </SessionContext.Consumer>
      </React.Fragment>
    )
  }

  onChange = event => {
    this.setState({
      code: event.target.value,
      disabled: event.target.value === '' ? true : false,
    })
  }

  login = ctx => event => {
    event.preventDefault()
    ctx.verifyCode({ code: this.state.code })
  }
}

export default Login
