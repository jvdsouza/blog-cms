import React, {Component} from 'react';
import './Delete.css';

class DeletePost extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            confirm: 'none'
        }
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    onDeletePost = () => {
        fetch(`${process.env.REACT_APP_APISITE}/admindelete`, {
            title: this.state.title,
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title,
                apiKey: process.env.REACT_APP_APIKEY
            })
        })
        .then(response => {
            return response.json()
        })
        .then(completion => {
            this.setState({confirm: completion})
        })
    }

    render() {
        return this.state.confirm === 'none' ?
        (
            <div>
                Delete post
                <br/>
                <input 
                    type='text' 
                    placeholder='title of post to delete'
                    onChange={this.onTitleChange} 
                    style={{margin: '10px', marginLeft: '0px'}}
                />
                <button onClick={this.onDeletePost}>Delete Post</button>
            </div>
        )
        :
        (
            <div>
                <h1>post with title '{this.state.title}' has been deleted</h1>
            </div>
        )
    }
}

export default DeletePost;