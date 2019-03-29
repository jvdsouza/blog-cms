import React, {Component} from 'react';
import './Update.css';

class UpdatePost extends Component {
    constructor() {
        super();
        this.state = {
            docId:'',
            title: '',
            body: '',
            status: 'none'
        }
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    }
    
    onBodyChange = (event) => {
        this.setState({body: event.target.value})
    }

    getPostToUpdate = () => {
        return fetch(`${process.env.REACT_APP_APISITE}/returnpost`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title,
                apiKey: process.env.REACT_APP_APIKEY
            })
        })
        .then(response => {
            return response.json()
        })
        .then(postData => {
            if(postData !== 'fail') {
                this.setState({
                    docId: postData._id,
                    body: postData.body,
                    status: 'found'})
            } else {
                this.setState({status: 'notfound'})
            }
        })
        .catch(err => console.log('there was an error processing the post:', err))
    }

    onUpdatePost = () => {
        return fetch(`${process.env.REACT_APP_APISITE}/adminupdate`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body,
                docID: this.state.docId,
                apiKey: process.env.REACT_APP_APIKEY
            })
        })
            .then(response => {
                return response.json()
            })
            .then(postResponse => {
                this.setState({status: postResponse})
            })
            .catch(err => {
                this.setState({status: 'fail'})
                console.log(err)
            });
    }

    cancelUpdate = () => {
        this.setState({status: 'none'})
    }

    render() {
        return this.state.status === 'none' ?
        (
            <div>   
                <h1>What post would you like to update?</h1>
                <input 
                    type='text' 
                    onChange={this.onTitleChange} 
                    placeholder='Title' 
                    style={{margin: '10px', marginLeft: '0px'}}
                />
                <br/>
                <button onClick={this.getPostToUpdate}>Find Post</button>
            </div>
        )
        :
        this.state.status === 'found' ?
        (
            <div>
                <h2>udpating: {this.state.title}</h2>
                <input 
                    type='text' 
                    onChange={this.onTitleChange} 
                    placeholder='Title' 
                    style={{margin: '10px', marginLeft: '0px'}}
                />
                <textarea 
                    onChange={this.onBodyChange} 
                    placeholder="Blog Post" 
                    value={this.state.body}
                    cols='100' 
                    rows='20'
                />
                <br/>
                <button onClick={this.onUpdatePost}>Update Post</button>
                <button onClick={this.cancelUpdate}>Cancel Update</button>
            </div>
        )
        :
        this.state.status === 'updated' ?
        (
            <h1>blog post: '{this.state.title}' has been updated</h1>
        )
        :
        this.state.status ==='notfound' ?
        (
            <div>
                <h1>post with title '{this.state.title}' could not be found</h1>
                <button onClick={this.cancelUpdate}>Cancel Update</button>
            </div>
        )
        :
        (
            <div>there was an error processing your post</div>
        )
    }
}

export default UpdatePost