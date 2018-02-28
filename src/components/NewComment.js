import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { commentSave } from '../actions/actions';
import { commentSaveToServer } from '../utils/api';
import '../App.css';
//import { Link } from 'react-router-dom';
import uuid from 'uuid';

class NewComment extends Component {
  saveComment = (e) => {
    if (!this.author.value) {
      return
    }

    e.preventDefault();

    const commentData = {
      id: uuid.v4(),
      timestamp: Date.now(),
      body: this.comment.value,
      author: this.author.value,
      parentId: this.props.match.params.parentId,      
    }

    this.props.commentSave(commentData);
    commentSaveToServer(JSON.stringify(commentData));
    //console.log(commentData);
  }

  render() {
    return (
      <div>
        <h3>New Comment for {this.props.match.params.parentId}</h3>
        
        <form onSubmit={this.saveComment}>
        <div>Name: </div><div><input type="text" ref={node => { this.author = node  }} /></div>
        <div>Title: </div><div><input type="text" ref={node => { this.title = node  }} /></div>
        <div>Comment: </div><div><textarea cols="40" rows="8" ref={node => { this.comment = node  }}></textarea></div>
        <button type="submit">Save Comment</button>
        </form>
      </div>
    )    
  }
}

function mapStateToProps({ categories }) {  
	return {
      categories
    }
}  /**/

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
      commentSave,
    },
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(NewComment);