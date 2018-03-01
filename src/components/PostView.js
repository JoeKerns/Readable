import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { postVote, commentsGet, commentVote } from '../actions/actions';
import '../App.css';
//import { addPost } from '../actions/actions';
import { updatePostVote, updateCommentVote } from '../utils/api';
import Comment from './Comment';

class PostView extends Component {
  componentDidMount() {
    let thisID;
    if (this.props.match.params.id) {
      thisID = this.props.match.params.id;      
    }    
    thisID && this.props.commentsGet(thisID);
  }

  render() {
    let postDetails = {
      author: undefined,
      body: undefined,
      title: undefined,
      category: undefined,
      id: undefined,
    }
    const thisID = this.props.match.params.id;
    const { posts, comments } = this.props;
    const post = posts.filter(post => post.id === thisID);

    postDetails = Object.assign({}, ...post);
    
    /*if (posts) { // need to figure out the reduce vs filter and map
      const justThisPost = posts.reduce((thePost,postToCheck) => {
        if (postToCheck.id === this.props.match.params.id) {          
          return thePost;
        }
        //console.log('justThisPost',justThisPost);
      })
    }*/
    
    const postVoteUp = () => {
      this.props.postVote(thisID,'up');
      updatePostVote(thisID,'upVote');
    }

    const postVoteDown = () => {
      this.props.postVote(thisID,'down');
      updatePostVote(thisID,'downVote');
    }

    const commentVoteUp = (commentID) => {
      this.props.commentVote(commentID,'up');
      updateCommentVote(commentID,'upVote');
    }

    const commentVoteDown = (commentID) => {
      this.props.commentVote(commentID,'down');
      updateCommentVote(commentID,'downVote');
    }

    /**/
    return (
      <div>
        <div>This is PostView...</div>
        <div>
        <Link to={`/editpost/${thisID}/${postDetails.author}/${postDetails.title}/${postDetails.category}/${postDetails.body}`}>Edit Post</Link>
        {
        post && post.map((thisPost) => (
          <span key={thisPost.id}>
            <h1>{thisPost.title}</h1>  
            <h3>{thisPost.author}</h3>
            <p>{ thisPost.body }</p>
            <p><button onClick={postVoteUp}> + </button> Post Score: { thisPost.voteScore } <button onClick={postVoteDown}> - </button></p>            
          </span>
          ))
        }
        
        {
          comments.map((comment) => (
            <Comment 
              comment={comment} 
              key={comment.id} 
              commentVoteUp={commentVoteUp} 
              commentVoteDown={commentVoteDown}
              parentId={thisID} />
          ))
        }
        <Link to={`/newcomment/${thisID}`}>Add A Comment</Link>
        </div>
      </div>
    )
    
  }
}

function mapStateToProps({ posts, comments }) {  
	return {
      posts,
      comments,
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
      commentsGet,
      postVote,
      commentVote,
    },
    dispatch
  );



export default connect(mapStateToProps,mapDispatchToProps)(PostView);