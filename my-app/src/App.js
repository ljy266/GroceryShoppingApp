import React from 'react'
import axios from 'axios'

class App extends React.Component {


  state = {
    name: '',
    description: '',
    posts: []
  }

  componentDidMount = () => {
    this.getGroItem()
  }

  getGroItem = () => {
    axios.get('/api/item')
    .then((response) => {
      const data = response.data
      this.setState({posts: data})
      console.log('Data retrieve successful!!!!')
    })
    .catch(() => {
      alert('Error retrieving data!!!')
    })
  }


  handleChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }


  submit = (event) => {
    event.preventDefault();

    const payload = {
      name: this.state.name,
      description: this.state.description
    }

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('DATA has been sent to server')
        this.getGroItem()
      })
      .catch(() => {
        console.log('internal server error not sending data')
      })
  }


  displayPost = (posts) => {
    if (!posts.length) return null;

    return posts.map ((post, index) => (
      <div key={index}>
        <h4>{post.name}</h4>
        <p>{post.description}</p>
      </div>
    ))
  }


  render() {

    console.log('State:  ', this.state)

    //jsx
    return (
      <div>
        <h2>Welcome, use this to send new data to server</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="enter item name"></input>
          </div>

          <div className="form-input">
            <textarea name="description" cols="30" rows="10" value={this.state.description} onChange={this.handleChange}> </textarea>
          </div>

          <button>Send it</button>
        </form>

        <h3>
          Here is what's in the database:


        </h3>

        <div className="blog-">
          {this.displayPost(this.state.posts)}
        </div>

      </div>
    )
  }

}

export default App;