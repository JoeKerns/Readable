import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { postVote, postDelete, commentsGet, commentVote, commentDelete } from '../actions/actions';
import '../App.css';
import { updatePostVote, updateCommentVote, deletePostFromServer, deleteCommentFromServer } from '../utils/api';
import CommentView from './Comment';
import { Icon, Divider, Card, Comment } from 'semantic-ui-react';

class PostView extends Component {
  componentDidMount() {
    let thisID;
    if (this.props.match.params.id) {
      thisID = this.props.match.params.id;      
    }    
    thisID && this.props.commentsGet(thisID);
  }

  render() {
    const thisID = this.props.match.params.id;
    const { posts, comments } = this.props;
    const post = posts.filter(post => post.id === thisID);

    const deletePost = () => {
      if (window.confirm(`Are you sure you want to delete this post? Deleted post are gone forever!`)) {
        this.props.postDelete(thisID);
        deletePostFromServer(thisID);
        this.props.history.push(`/`);
      }
    };

    const deleteComment = (commentId) => {
      if (window.confirm(`Are you sure you want to delete this comment? Deleted comments are gone forever! ${commentId}`)) {
        this.props.commentDelete(commentId);
        deleteCommentFromServer(commentId);
      }
    };
    
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
    
    return (
      <div>
        <div>
        
        {
        post && post.map((thisPost) => (
          <Card key={thisPost.id} style={style.card}>
            <Card.Content>
              <Card.Header>
                {thisPost.title} <Link to={`/editpost/${thisID}`}><Icon name="pencil" /></Link> <Icon name="trash" style={{color: 'red'}}  onClick={deletePost} />
              </Card.Header>
              <Card.Description>
                <p>Author: {thisPost.author}</p>
                <p>{ thisPost.body }</p>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <p>Post Score: { thisPost.voteScore } <Icon onClick={postVoteUp} name="thumbs outline up" style={{color: 'green'}} size="large" /> <Icon name="thumbs outline down" style={{color: 'red'}} size="large" onClick={postVoteDown}/></p>   
            </Card.Content>
          </Card>
          ))
        }

        <Divider horizontal style={style.divider}> Comments <Icon name="comments" style={{color: 'dodgerblue'}} /></Divider>
        
        <Comment.Group style={style.commentGroup}>
        {
          comments.map((comment) => (
            <CommentView              
              comment={comment} 
              key={comment.id} 
              commentVoteUp={commentVoteUp} 
              commentVoteDown={commentVoteDown}
              parentId={thisID}
              deleteComment={deleteComment} />
          ))
        }

        </Comment.Group>
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
      postDelete,
      commentDelete,
    },
    dispatch
  );

const style = {
  card: {
    width: '40%',
    margin: 'auto',
    marginTop: 12,
    marginBottom: 12, 
  },
  divider: {
    margin: 'auto',
    width: '40%',
  },
  commentGroup: {
    margin: '12 auto',
    maxWidth: '100%',
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(PostView);