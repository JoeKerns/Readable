import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { Link } from 'react-router-dom';
//import { addPost } from '../actions/actions';

class Posts extends Component {
  render() {
    let category = '';
    let postsFromCategory = [];
    const { posts } = this.props;

    //console.log('this.props.match.params.name',this.props.match.params.name)

    if (this.props.match.params.name) {
      category = this.props.match.params.name;
      postsFromCategory = posts.filter(post => post.category === category);
      //console.log(postsFromCategory);
    }
     
    //console.log('postsFromCategory.length',postsFromCategory.length);

    const postsToShow = (postsFromCategory.length > 0) ? postsFromCategory : posts;

    //console.log('postsToShow',postsToShow);

    return (
      <div>
      This is posts...

      { 
        postsToShow && postsToShow.map((post, index) => (
          post.id && <span key={post.id}> <Link to={`/posts/${post.id}`}> { `${post.title} - ${post.author}` } </Link> <br/>
            { `Vote Score: ${post.voteScore}`}<br/>
            <br/>
				</span>
        ))
      }
      </div>
    )
    
  }
}

function mapStateToProps({ postReducer }) {  
	return {
      posts: postReducer.posts,
    }
}         /**/

export default connect(mapStateToProps)(Posts);