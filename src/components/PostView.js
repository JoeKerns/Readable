import React, { Component } from 'react';
import { connect } from 'react-redux';
import { vote } from '../actions/actions';
import '../App.css';
//import { addPost } from '../actions/actions';

class PostView extends Component {
  render() {
    const thisID = this.props.match.params.id;
    const { posts } = this.props;
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
    //console.log(this.props);
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
            <p><button onClick={voteUp}> + </button> Score: { thisPost.voteScore } <button onClick={voteDown}> - </button></p>            
          </span>
        ))
      }

        
        </div>
      </div>
    )
    
  }
}

function mapStateToProps({ postReducer }) {  
	return {
      posts: postReducer.posts,
    }
}         /**/

export default connect(mapStateToProps)(PostView);