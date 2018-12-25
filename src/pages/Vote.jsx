import React from 'react'

import SubmitStyles from '../styles/pages/Submit.scss'

class Vote extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      candidates: [],
      votes: {},
    }
  }

  componentDidMount() {
    fetch('http://192.168.2.150:8081/categories')
      .then(data => data.json())
      .then(body => {
        this.setState(_ => {
          return {
            categories: body['categories'],
          }
        })

        fetch('http://192.168.2.150:8081/candidates')
          .then(data => data.json())
          .then(body => {
            this.setState(_ => {
              return {
                candidates: body['candidates'],
              }
            })

            fetch('http://192.168.2.150:8081/votes/code1')
              .then(data => data.json())
              .then(body => {
                this.setState(state => {
                  let newVotes = body['votes'] || []
                  let votes = {}

                  // Default votes
                  this.state.categories.map(category => {
                    votes[category.id] = 'none'
                  })

                  // Retrived votes
                  this.state.categories.map(category => {
                    newVotes.map(vote => {
                      if (vote['category-id'] === category.id) {
                        votes[category.id] = vote['candidate-id']
                      }
                    })
                  })

                  return { votes }
                })
              })
              .catch(err => {
                console.log('Error while fetching votes:', err)
              })
          })
          .catch(err => {
            console.log('Error while fetching candidates:', err)
          })
      })
      .catch(err => {
        console.log('Error while fetching categories:', err)
      })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Vote</h2>
        <form onSubmit={this.vote}>
          {this.state.categories.map(category => {
            return (
              <React.Fragment key={category.id}>
                <h3>{category.name}</h3>
                <select
                  id={category.id}
                  onChange={this.onChange}
                  value={this.state.votes[category.id] || 'none'}
                  onChange={this.onChange}
                >
                  <option key="none" value="none">
                    Nothing
                  </option>
                  {this.state.candidates.map(candidate => {
                    return (
                      <option key={candidate.id} value={candidate.id}>
                        {`${candidate.description.substring(0, 20)}... (by ${
                          candidate.author
                        })`}
                      </option>
                    )
                  })}
                </select>
              </React.Fragment>
            )
          })}
          <input type="submit" value="Vote" disabled={this.state.disabled} />
        </form>
      </React.Fragment>
    )
  }

  onChange = event => {
    let categoryId = event.target.id
    let vote = event.target.value

    this.setState(state => {
      let votes = state.votes
      votes[categoryId] = vote

      return { votes }
    })

    this.setState(_ => {
      console.log('new state votes', this.state.votes)
    })
  }

  vote = event => {
    event.preventDefault()

    let votesToSend = []

    Object.keys(this.state.votes).map(k => {
      let vote = this.state.votes[k]
      votesToSend.push({
        'code-id': 'code1',
        'candidate-id': vote['candidate-id'],
        'category-id': vote['category-id'],
      })
    })

    fetch(`http://192.168.2.150:8081/votes/code1`, {
      method: 'PUT',
      body: JSON.stringify({
        votes: this.state.votes,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(data => {
        console.log('new votes data', data)
      })
      .catch(err => {
        console.log('new votes err', err)
      })
  }
}

export default Vote
