import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { commentUpdate } from '../actions/actions';
import { commentUpdateToServer } from '../utils/api';
import '../App.css';

class CommentEdit extends Component {
  saveComment = (e) => {
    e.preventDefault();       
    
    if (this.props.comment.voteCount === undefined) {
      this.props.comment.voteCount = 0;
    }

    const commentData = {
      id: this.id.value,
      parentId: this.props.comment.parentId,
      author: this.props.comment.author,
      body: this.body.value,
      timestamp: Date.now(),
      deleted: this.props.comment.deleted,
      voteScore: this.props.comment.voteCount,
      parentDeleted: this.props.comment.parentDeleted,
    }

    this.props.commentUpdate(commentData);
    commentUpdateToServer(commentData.id,commentData.timestamp, commentData.body);
    this.props.history.push(`/posts/${commentData.parentId}`);
  }

  
  render() {    
    return (
      <div>
        <h3>Edit Comment</h3>
        
        <form onSubmit={this.saveComment}>
        <input type="hidden" ref={node => { this.id = node  }} defaultValue={this.props.match.params.id} />
        <div>Body: </div><div><textarea cols="40" rows="8" ref={node => { this.body = node  }} defaultValue={this.props.comment.body}></textarea></div>
        <button type="submit">Update Comment</button>
        </form>
      </div>
    )    
  }
}

function mapStateToProps({ comments }, ownProps){ 
  const key = comments.findIndex(comment => comment.id === ownProps.match.params.id);
  return {
    comment: comments[key],
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
      commentUpdate,
    },
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(CommentEdit);