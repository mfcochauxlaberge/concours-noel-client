import React, { Component } from 'react'

const SessionContext = React.createContext()

class SessionProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      isAdmin: {},
    }
  }

  render() {
    return (
      <SessionContext.Provider
        value={{
          loggedIn: this.state.loggedIn,
          isAdmin: this.state.isAdmin,

          verifyCode: ({ code }) => {
            fetch(`http://192.168.2.150:8081/codes/${code}`)
              .then(data => data.json())
              .then(body => {
                if (body['error']) {
                  throw body['error']
                }

                this.setState({
                  loggedIn: true,
                  code: body.code.code,
                  isAdmin: body.code.admin,
                })
              })
              .catch(err => {
                this.setState({
                  loggedIn: false,
                  code: '',
                  isAdmin: false,
                })
              })
          },

          forgetCode: () => {
            this.setState(() => {
              return {
                loggedIn: false,
                isAdmin: false,
              }
            })
          },
        }}
      >
        {this.props.children}
      </SessionContext.Provider>
    )
  }
}

export { SessionContext, SessionProvider }
