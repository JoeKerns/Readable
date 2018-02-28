import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { postSave } from '../actions/actions';
import { postSaveToServer } from '../utils/api';
import '../App.css';
//import { Link } from 'react-router-dom';
import uuid from 'uuid';

class NewPost extends Component {

  savePost = (e) => {
    if (!this.author.value) {
      return
    }

    e.preventDefault();

    const postData = {
      id: uuid.v4(),
      author: this.author.value,
      body: this.body.value,
      title: this.title.value,
      category: this.category.value,
      timestamp: Date.now(),
    }

    this.props.postSave(postData);
    postSaveToServer(JSON.stringify(postData));

  }

  render() {
    return (
      <div>
        <h3>New Post</h3>
        
        <form onSubmit={this.savePost}>
        <div>Name: </div><div><input type="text" ref={node => { this.author = node  }} /></div>
        <div>Title: </div><div><input type="text" ref={node => { this.title = node  }} /></div>
        <div>Category: </div><div><select  ref={node => { this.category = node  }}>
        {
          this.props.categories && this.props.categories.map((category, index) => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))
        }
        </select></div>
        <div>Body: </div><div><textarea cols="40" rows="8" ref={node => { this.body = node  }}></textarea></div>
        <button type="submit">Save Post</button>
        </form>
      </div>
    )    
  }
}

function mapStateToProps({ categories }) {  
	return {
      categories
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
      postSave,
    },
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(NewPost);