import React, { Component } from 'react';
import CreatePost from '../components/Create/Create';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'home'
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

  render() {
    return (
      <div>
        <h1>hi</h1>
        {this.state.route === 'home' ? 
          <div>
            <button onClick={this.createPost}>Create Post</button>
            <button onClick={this.updatePost}>Update Post</button>
            <button onClick={this.viewPost}>View Post</button>
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