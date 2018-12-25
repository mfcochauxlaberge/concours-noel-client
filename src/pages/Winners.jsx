import React from 'react'

// import AppStyles from './styles/components/App.scss'

import CandidateCard from '../components/CandidateCard.jsx'

class Winners extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winners: [],
      info: {},
    }
  }

  componentDidMount() {
    Promise.all([
      fetch('http://192.168.2.150:8081/categories'),
      fetch('http://192.168.2.150:8081/candidates'),
      fetch('http://192.168.2.150:8081/winners'),
    ])
      .then(data => {
        return Promise.all([data[0].json(), data[1].json(), data[2].json()])
      })
      .then(data => {
        let categories = {}
        let candidates = {}
        let winners = []

        Object.keys(data[0].categories).map(i => {
          let category = data[0].categories[i]
          categories[category.id] = category
        })
        Object.keys(data[1].candidates).map(i => {
          let candidate = data[1].candidates[i]
          candidates[candidate.id] = candidate
        })
        Object.keys(data[2]).map(category => {
          let candidateID = data[2][category].candidate
          if (candidateID !== 'none') {
            winners.push({
              category: categories[category],
              candidate: candidates[candidateID],
            })
          }
        })

        this.setState(_ => {
          return { winners }
        })
      })
      .catch(err => {
        console.log('Error while fetching winners:', err)
      })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Gagnants</h2>
        {this.state.winners.length === 0 && <p>Pas de gagnants encore.</p>}
        {this.state.winners.length > 0 && (
          <React.Fragment>
            {this.state.winners.map(winner => {
              return (
                <React.Fragment key={Math.random()}>
                  <h3>{winner.category.name}</h3>
                  <CandidateCard
                    key={winner.candidate.id}
                    candidate={winner.candidate}
                  />
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default Winners
