import React, { Component } from 'react';
import './Create.css'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    onBodyChange = (event) => {
        this.setState({body: event.target.value})
    }

    onSubmitPost = () => {
        fetch('localhost:3001/admincreate', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body
            })
        })
            .then(response => response.json())
            .catch(err => console.log('there was an error posting: ', err))
    }

    render(){
        return(
            <div>
                <input type='text' placeholder='Title' onChange={this.onTitleChange} style={{margin: '10px', marginLeft: '0px'}}/>
                <br/>
                <textarea onChange={this.onBodyChange} placeholder="Blog Post" cols='120' rows='25'/>
                <br/>
                <button onClick={this.onSubmitPost}>Post to Blog</button>
            </div>
        );
    }
}

export default CreatePost;