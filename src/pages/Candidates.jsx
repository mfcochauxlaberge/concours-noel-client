import React from 'react'

import CandidateCard from '../components/CandidateCard.jsx'

class Candidates extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      candidates: [],
    }
  }

  componentDidMount() {
    fetch('http://192.168.2.150:8081/candidates')
      .then(data => data.json())
      .then(body => {
        this.setState({
          candidates: body['candidates'],
        })
      })
      .catch(err => {
        console.log('Error while fetching candidates:', err)
      })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Œuvres</h2>
        {this.state.candidates.length === 0 && <p>No candidates.</p>}
        {this.state.candidates.length > 0 && (
          <React.Fragment>
            {this.state.candidates.map(candidate => {
              return <CandidateCard key={candidate.id} candidate={candidate} />
            })}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default Candidates
