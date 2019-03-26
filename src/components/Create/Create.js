import React, { Component } from 'react';
import './Create.css'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            status: ''
        }
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    onBodyChange = (event) => {
        this.setState({body: event.target.value})
    }

    onSubmitPost = () => {
        fetch(`${process.env.REACT_APP_APISITE}/admincreate`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body,
                apiKey: process.env.REACT_APP_APIKEY
            })
        })
            .then(response => {
                if(response.json()) {
                    this.setState({status: 'success'})
                }
            })
            .catch(err => {
                this.setState({status: 'fail'})
                console.log('there was an error posting: ', err)
            })
    }

    render(){
        return(
            <div>
                {this.state.status !== 'success' ?
                    <div>
                        <input type='text' placeholder='Title' onChange={this.onTitleChange} style={{margin: '10px', marginLeft: '0px'}}/>
                        <br/>
                        <textarea onChange={this.onBodyChange} placeholder="Blog Post" cols='100' rows='20'/>
                        <br/>
                        <button onClick={this.onSubmitPost}>Post to Blog</button>
                    </div>
                    :
                    <h1>Post was successful!</h1>
                }
            </div>
        );
    }
}

export default CreatePost;