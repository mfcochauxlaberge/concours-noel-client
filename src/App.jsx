import React from 'react'
import { Link, Route } from 'react-router-dom'

import AppStyles from './styles/pages/App.scss'

import Candidates from './pages/Candidates.jsx'
import Submit from './pages/Submit.jsx'
import Vote from './pages/Vote.jsx'
import Winners from './pages/Winners.jsx'
import Login from './pages/Login.jsx'
import { SessionContext } from './services/session'

class App extends React.Component {
  render() {
    return (
      <div id={AppStyles['app']}>
        <header id={AppStyles['header']}>
          <h1>Concours</h1>
          <nav>
            <ul>
              <li>
                <Link to="/candidates">Candidates</Link>
              </li>
              <SessionContext.Consumer>
                {context => {
                  if (context.loggedIn) {
                    return (
                      <React.Fragment>
                        <li>
                          <Link to="/submit">Submit</Link>
                        </li>
                        <li>
                          <Link to="/vote">Vote</Link>
                        </li>
                      </React.Fragment>
                    )
                  }
                }}
              </SessionContext.Consumer>
              <li>
                <Link to="/winners">Winners</Link>
              </li>
              <SessionContext.Consumer>
                {context => {
                  if (context.loggedIn) {
                    return (
                      <li>
                        <Link to="#" onClick={context.forgetCode}>
                          Log out
                        </Link>
                      </li>
                    )
                  } else {
                    return (
                      <li>
                        <Link to="/login">Log in</Link>
                      </li>
                    )
                  }
                }}
              </SessionContext.Consumer>
            </ul>
          </nav>
        </header>
        <div id={AppStyles['content']}>
          <Route path="/candidates" exact component={Candidates} />
          <Route path="/submit" exact component={Submit} />
          <Route path="/vote" exact component={Vote} />
          <Route path="/winners" exact component={Winners} />
          <Route path="/login" exact component={Login} />
        </div>
        <footer id={AppStyles['footer']}>
          <nav>
            <ul>
              <li>
                By <a href="https://mfcl.io">Marc-François Cochaux-Laberge</a>
              </li>
              <li>
                <a href="https://github.com/mfcochauxlaberge/concours-noel-client">
                  Source code
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    )
  }
}

export default App
