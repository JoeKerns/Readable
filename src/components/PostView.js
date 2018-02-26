import React, { Component } from 'react';
import { connect } from 'react-redux';
import { vote } from '../actions/actions';
import '../App.css';
//import { addPost } from '../actions/actions';

class PostView extends Component {
  /*componentDidMount() {
    const thisID = this.props.match.params.id;
    const urlPosts = `http://localhost:3001/posts/${thisID}/comments`;
    fetch(urlPosts, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        const comments = JSON.parse(data);
        comments.map((comment) => (
        //  this.props.dispatch(postAdd(post))
        console.log('comment -> ',comment)
        ));
      });
  }*/

  render() {
    const thisID = this.props.match.params.id;
    const { posts, comments } = this.props;
    const post = posts.filter(post => post.id === thisID);

    
    
    /*if (posts) { // need to figure out the reduce vs filter and map
      const justThisPost = posts.reduce((thePost,postToCheck) => {
        if (postToCheck.id === this.props.match.params.id) {          
          return thePost;
        }
        //console.log('justThisPost',justThisPost);
      })
    }*/

    const voteUp = () => {
      this.props.dispatch(vote(thisID,'up'));
    }

    const voteDown = () => {
      this.props.dispatch(vote(thisID,'down'));
    }
    comments.length > 1 && console.log(comments);

    return (
      <div>
        <div>This is PostView...</div>
        <div>
        {
        post && post.map((thisPost) => (
          <span key={thisPost.id}>
            <h1>{thisPost.title}</h1>  
            <h3>{thisPost.author}</h3>
            <p>{ thisPost.body }</p>
            <p><button onClick={voteUp}> + </button> Post Score: { thisPost.voteScore } <button onClick={voteDown}> - </button></p>            
          </span>
          ))
        }
        {
        comments && comments.map((comment) => (
          <span key={comment.id}>
            <h3>{comment.author}</h3>
            <p>{ comment.body }</p>
            <p><button onClick={voteUp}> + </button> Comments Score: { comment.voteScore } <button onClick={voteDown}> - </button></p>            
          </span>
          ))
        }

        
        </div>
      </div>
    )
    
  }
}

function mapStateToProps({ postReducer, commentsReducer }) {  
	return {
      posts: postReducer.posts,
      comments: commentsReducer.comments,
    }
}         /**/

export default connect(mapStateToProps)(PostView);