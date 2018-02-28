import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { Link } from 'react-router-dom';

class Posts extends Component {
  render() {
    let category = '';
    let postsFromCategory = [];
    const { posts } = this.props;

    if (this.props.match.params.name) {
      category = this.props.match.params.name;
      postsFromCategory = posts.filter(post => post.category === category);
    }

    const postsToShow = (postsFromCategory.length > 0) ? postsFromCategory : posts;    

    return (
      <div>
        <h3>Posts</h3>

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

function mapStateToProps({ posts }) {  
	return {
      posts,
    }
}         /**/

export default connect(mapStateToProps)(Posts);