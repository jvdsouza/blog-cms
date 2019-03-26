import React, { Component } from 'react';
import CreatePost from '../components/Create/Create';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'home',
      signedIn: false,
      username: '',
      password: ''
    }
  }

  createPost = () => {
    this.setState({route: 'create'})
  }

  updatePost = () => {
    this.setState({route: 'update'})
  }

  viewPost = () => {
    this.setState({route: 'view'})
  }

  deletePost = () => {
    this.setState({route: 'delete'})
  }

  homeReturn = () => {
    this.setState({route: 'home'})
  }

  onUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSignin = () => {
    return fetch(`${process.env.REACT_APP_APISITE}/authenticate`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => {
        return response.json();
      })
      .then(authenticated => {
        if(authenticated === 'success'){
          this.setState({signedIn: true})
        }
      })
  }

  render() {
    return !this.state.signedIn ?
    (
      <div>
        <h1>please log in to continue</h1>
        <input 
          type='text' 
          placeholder='Username' 
          onChange={this.onUsernameChange} 
          style={{margin: '10px', marginLeft: '0px'}}
        />
        <input 
          type='password' 
          placeholder='Password' 
          onChange={this.onPasswordChange} 
          style={{margin: '10px', marginLeft: '0px'}}
        />
        <button onClick={this.onSignin}>Sign in</button>
      </div>
    )
    :
    (
      <div>
        <h1>hi</h1>
        {this.state.route === 'home' ? 
          <div>
            <button onClick={this.createPost}>Create Post</button>
            <button onClick={this.viewPost}>View Post</button>
            <button onClick={this.updatePost}>Update Post</button>
            <button onClick={this.deletePost}>Delete Post</button>
          </div>
        :
        this.state.route === 'create' ? 
          <div>
            <CreatePost/>
            <button onClick={this.homeReturn}>go back</button>
          </div>
        :
        <div>
          <h1>hi</h1>
          <button onClick={this.homeReturn}>go back</button>
        </div>
        }
        <footer>CRUD app made by Jason with create react app and MongoDB atlas</footer>
      </div>
    );
  }
}

export default App;
