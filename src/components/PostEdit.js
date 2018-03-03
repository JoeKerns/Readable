import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { postUpdate } from '../actions/actions';
import { postUpdateToServer } from '../utils/api';
import '../App.css';
//import { Link } from 'react-router-dom';

class PostEdit extends Component {
  savePost = (e) => {
    if (!this.author.value) {
      return
    }

    e.preventDefault();       
    
    if (this.props.post.voteCount === undefined) {
      this.props.post.voteCount = 0;
    }

    const postData = {
      id: this.id.value,
      author: this.author.value,
      body: this.body.value,
      title: this.title.value,
      category: this.category.value,
      timestamp: Date.now(),
      commentCount: this.props.post.commentCount,
      deleted: this.props.post.deleted,
      voteScore: this.props.post.voteCount,
    }

    //console.log(postData);

    this.props.postUpdate(postData);
    postUpdateToServer(postData.id,postData.title, postData.body);

    this.props.history.push(`/posts/${postData.id}`);
  }

  
  render() {
    
    console.log('this.props.post',this.props.post);
    return (
      <div>
        <h3>New Post</h3>
        
        <form onSubmit={this.savePost}>
        <input type="hidden" ref={node => { this.id = node  }} defaultValue={this.props.match.params.id} />
        <div>Name: </div><div><input type="text" ref={node => { this.author = node  }} defaultValue={this.props.post.author} /></div>
        <div>Title: </div><div><input type="text" ref={node => { this.title = node  }} defaultValue={this.props.post.title} /></div>
        <div>Category: </div><div><select  ref={node => { this.category = node  }}>
        {
          this.props.categories !== null && this.props.categories.map((category, index) => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))
        }
        </select></div>
        <div>Body: </div><div><textarea cols="40" rows="8" ref={node => { this.body = node  }} defaultValue={this.props.post.body}></textarea></div>
        <button type="submit">Save Post</button>
        </form>
      </div>
    )    
  }
}

function mapStateToProps({categories, posts}, ownProps){ 
  const key = posts.findIndex(post => post.id === ownProps.match.params.id);
  return {
    post: posts[key],
    categories
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
      postUpdate,
    },
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(PostEdit);