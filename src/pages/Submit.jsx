import React from 'react'
import { Redirect } from 'react-router-dom'

import throttle from 'lodash/throttle'

import AvatarEditor from 'react-avatar-editor'

import { SessionContext } from '../services/session'

import SubmitStyles from '../styles/pages/Submit.scss'

class Submit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      author: '',
      description: '',
      image: '',
      finalImage: '',
      disabled: true,
    }

    this.file = React.createRef()
    this.editor = React.createRef()
  }

  render() {
    return (
      <React.Fragment>
        <h2>Submit</h2>
        <form onSubmit={this.submit}>
          <input
            type="text"
            id="author"
            placeholder="Author"
            value={this.state.author}
            onChange={this.onChange}
          />
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onChange}
          />
          <input
            ref={this.file}
            type="file"
            id="image"
            onChange={this.onChange}
          />
          {this.state.image && (
            <React.Fragment>
              <AvatarEditor
                ref={this.editor}
                className={SubmitStyles['avatar_editor']}
                image={this.state.image}
                width={200}
                height={200}
                border={0}
                scale={1}
                onImageChange={() => {
                  this.updateFinalImage()
                }}
              />
            </React.Fragment>
          )}
          <input type="submit" value="Submit" disabled={this.state.disabled} />
        </form>
      </React.Fragment>
    )
  }

  onChange = event => {
    if (event.target.id === 'author') {
      this.setState({
        author: event.target.value,
      })
    } else if (event.target.id === 'description') {
      this.setState({
        description: event.target.value,
      })
    } else if (event.target.id === 'image') {
      let image = this.file.current.files[0]

      // Check type
      let type = image.type.split('/')[0]
      if (type === 'image') {
        this.setState({ image })
        this.updateFinalImage()
      } else {
        console.log('Not an image.')
      }
    }

    if (this.state.author !== '' && this.state.description !== '') {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }
  }

  submit = event => {
    event.preventDefault()

    this.updateFinalImage()

    fetch(`http://192.168.1.150:8081/candidates`, {
      method: 'POST',
      body: JSON.stringify({
        author: this.state.author,
        description: this.state.description,
        'code-id': 'somecode',
        image: this.state.finalImage,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(data => {
        console.log('new candidates data', data)
      })
      .catch(err => {
        console.log('new candidates err', err)
      })
  }

  updateFinalImage = () => {
    if (this.editor.current) {
      // let finalImage = this.editor.current.getImage().toDataURL()
      let finalImage = this.editor.current.getImageScaledToCanvas().toDataURL()
      this.setState({ finalImage: finalImage })
    }
  }
}

export default Submit
