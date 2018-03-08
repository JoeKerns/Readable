import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { commentSave } from '../actions/actions';
import { commentSaveToServer } from '../utils/api';
import '../App.css';
//import { Link } from 'react-router-dom';
import uuid from 'uuid';
import { Button, Form } from 'semantic-ui-react';

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
      voteScore: 0,    
    }

    this.props.commentSave(commentData);
    commentSaveToServer(JSON.stringify(commentData));
    this.props.history.push(`/posts/${this.props.match.params.parentId}`);
    //console.log(commentData);
  }

  render() {
    return (
      <div>
        <h3>New Comment</h3>
        
        <Form onSubmit={this.saveComment} style={style.formStyle}>
        <Form.Input><label>Name: </label><input type="text" ref={node => { this.author = node  }} /></Form.Input>
        <Form.Input><label>Comment: </label><textarea cols="40" rows="8" ref={node => { this.comment = node  }}></textarea></Form.Input>
        <Button type="submit">Save Comment</Button>
        </Form>
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

  const style={
    formStyle: {
      width: '40%',
      margin: 'auto',
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(NewComment);