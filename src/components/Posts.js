import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { postVote, postDelete, commentsGet } from '../actions/actions'; //, commentsGet, commentVote, commentDelete
import { updatePostVote, deletePostFromServer } from '../utils/api'; // , updateCommentVote, deleteCommentFromServer
import { Link } from 'react-router-dom';
import { Icon, Checkbox } from 'semantic-ui-react';
import { ucWord } from '../utils/helpers';
import Post from './Post';
//import { commentsGet } from '../actions/actions'; // , commentVote, commentDelete

class Posts extends Component {
  state = { sortOption: true }

  componentDidMount() {
    /*if (posts) {
      posts.map((post) => {
        console.log('post.id = ',post.id);
        post.id && this.props.commentsGet(post.id);
      });  
    }*/
  }   

  render() {
    let category = '';
    let postsFromCategory = [];
    let id = '';
    const { posts } = this.props;
    const { sortOption } = this.state;

    //this.props.match.params && console.log('this.props.match.params',this.props.match.params);

    if (this.props.match.params.category) {
      category = this.props.match.params.category;
      postsFromCategory = posts.filter(post => post.category === category);
    }

    /*if (this.props.match.params.name) {
      category = this.props.match.params.name;
      postsFromCategory = posts.filter(post => post.category === category);
    }*/

    if (this.props.match.params.id) {
      id = this.props.match.params.id;
      postsFromCategory = posts.filter(post => post.id === id);
      if (postsFromCategory.length === 0) {
        return (
          <div>
            <br/>
            <h2> This post has been deleted or never existed. Please click a category link above to view posts. </h2>
          </div>
        )
      }
    }
    else {
      id = null;
    }

    const postVoteUp = (thisID) => {
      this.props.postVote(thisID,'up');
      updatePostVote(thisID,'upVote');
    }

    const postVoteDown = (thisID) => {
      this.props.postVote(thisID,'down');
      updatePostVote(thisID,'downVote');
    }

    const deletePost = (thisID) => {
      if (window.confirm(`Are you sure you want to delete this post? Deleted post are gone forever!`)) {
        this.props.postDelete(thisID);
        deletePostFromServer(thisID);
        this.props.history.push(`/`);
      }
    };

    const postsToShow = (postsFromCategory.length > 0) ? postsFromCategory : posts;  
    
    if (this.props.match.params.category && postsFromCategory.length === 0) {
      return (
        <div>
          <br/>
          <h2> No posts for {this.props.match.params.category}...maybe you should add one!  <Link to="/newpost"><Icon name="add square" size="small" /></Link> </h2>
        </div>
        
      )}

    postsToShow.sort(function (a, b) {
      if (sortOption === false) {
        return b.voteScore - a.voteScore;
      }
      else {
        return a.timestamp - b.timestamp;
      }      
    });

    const toggleSortOption = () => this.setState({sortOption: !sortOption})
    
    return (
      
      <div>
        <div style={style.header}> { ucWord(this.props.match.params.category) || 'Posts' }  <Link to="/newpost"><Icon name="add square" size="small" /></Link> </div>
        
        <div style={style.slider}>Sort By: Timestamp <Checkbox slider onClick={toggleSortOption} /> Vote</div>

        { 
          postsToShow && postsToShow.map((post, index) => (
            post.id && 
            <Post 
              key={post.id}
              id={id}
              style={style.postCard} 
              post={post}
              postVoteUp={postVoteUp}
              postVoteDown={postVoteDown}
              postDelete={deletePost}
            >   
            </Post>
            ))
        }
        
      </div>
    )
    
  }
}

function mapStateToProps({ posts, comments }) {  
	return {
      posts,
      comments,
    }
}         /**/

const mapDispatchToProps = dispatch =>
  bindActionCreators( {      
      postVote,
      postDelete,
      commentsGet,
    },
    dispatch
  ); // commentsGet,commentVote,commentDelete,

const style = {
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 24,
  },
  slider: {
    margin: 10,
  },
  postCard: {
    margin: 'auto',
    marginBottom: 12
  }
  
}



export default connect(mapStateToProps,mapDispatchToProps)(Posts);