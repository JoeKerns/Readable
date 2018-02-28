import React, { Component } from 'react';
import '../App.css';

class Comment extends Component {
  render() {
    const { comment, commentVoteUp, commentVoteDown, parentId } = this.props;
    const thisID = comment.id;

    const commentsVoteUp = () => {
      commentVoteUp(thisID);
    }

    const commentsVoteDown = () => {
      commentVoteDown(thisID);
    }
        
    if (comment.id && (comment.parentId === parentId)) { //
      return (
        <div key={comment.id}>
          <h3>{comment.author} {comment.id}</h3>
          <p>{ comment.body }</p>
          <p><button onClick={commentsVoteUp}> + </button> Comments Score: { comment.voteScore } <button onClick={commentsVoteDown}> - </button></p>            
        </div>
        )
      } 
    
    return(
      <div>No Comments</div>
    )
  }
}

export default Comment;