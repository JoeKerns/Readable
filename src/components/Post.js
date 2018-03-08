import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Icon, Card, Divider, Comment } from 'semantic-ui-react';
//import { ucWord } from '../utils/helpers';
import { commentsGet, commentVote, commentDelete } from '../actions/actions';
import { updateCommentVote, deleteCommentFromServer } from '../utils/api'; // , deletePostFromServer, deleteCommentFromServer
import CommentView from './Comment';

class Post extends Component {

  state = { id: null }   

  render() {
    if (this.props.post) {
      let thisID = '';
      let headerContent = '';
      let bodyContent = '';
      const post = this.props.post;
      const { postVoteUp, postVoteDown, postDelete, comments } = this.props;

      if (this.props.id) {
        thisID = this.props.id;
      }

      const thisPostDelete = () => {
        postDelete(post.id);
      }

      const thisPostVoteUp = () => {
        postVoteUp(post.id);
      }

      const thisPostVoteDown = () => {
        postVoteDown(post.id);
      }

      const commentVoteUp = (commentID) => {
        this.props.commentVote(commentID,'up');
        updateCommentVote(commentID,'upVote');
      }
  
      const commentVoteDown = (commentID) => {
        this.props.commentVote(commentID,'down');
        updateCommentVote(commentID,'downVote');
      }

      const deleteComment = (commentId) => {
        if (window.confirm(`Are you sure you want to delete this comment? Deleted comments are gone forever!`)) {
          this.props.commentDelete(commentId);
          deleteCommentFromServer(commentId);
        }
      };

      if (thisID === '') {
        headerContent = <div><Link to={`/${post.category}/${post.id}`}>{post.title}</Link> <Link to={`/editpost/${post.id}`}><Icon name="pencil" size="small" /></Link> <Icon name="trash" style={{color: 'red'}}  onClick={thisPostDelete} size="small" /></div>;
        bodyContent = '';
      } 
      else {
        headerContent = <div>{post.title} <Link to={`/editpost/${post.id}`}><Icon name="pencil" size="small" /></Link> <Icon name="trash" style={{color: 'red'}}  onClick={thisPostDelete} size="small" /></div>;  
        bodyContent = <Card.Description><p>Author: {post.author}</p>
        <p>{ post.body }</p></Card.Description>
      }

      return (
        <div>
          <Card key={post.id} style={style.postCard}> 
            <Card.Content>
              <Card.Header>
                {
                  headerContent
                }
                </Card.Header>
                {
                  bodyContent
                }                
              
                <Card.Content extra>
                { `Vote Score: ${post.voteScore}`} <Icon onClick={thisPostVoteUp} name="thumbs outline up" style={{color: 'green'}} size="small" /> <Icon onClick={thisPostVoteDown} name="thumbs outline down" style={{color: 'red'}} size="small" /><br/>
                { `Comments: ${post.commentCount}`}
              </Card.Content>
            </Card.Content>
          </Card>

          {
            thisID !== '' && <Divider horizontal style={style.divider}> Comments <Icon name="comments" style={{color: 'dodgerblue'}} /></Divider>
          }


          <Comment.Group style={style.commentGroup}>
          {
            
            comments && comments.map((comment) => (
              <CommentView              
                comment={comment} 
                key={comment.id}
                parentId={thisID} 
                commentVoteUp={commentVoteUp} 
                commentVoteDown={commentVoteDown}
                deleteComment={deleteComment}
              />
              
            ))
          }

        </Comment.Group>
        {
          thisID !== '' && <Link to={`/newcomment/${thisID}`}>Add A Comment</Link>
        }
        
        </div>
      )
    }
    else {
      return (
        null
      )
    }
  }
}

function mapStateToProps({ comments }) {  
  return {
      comments,
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
      commentsGet,
      commentVote,
      commentDelete,  
    },
    dispatch
  );

  /* */

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
    marginBottom: 12,
    width: '45%',
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

//export default Post
export default connect(mapStateToProps,mapDispatchToProps)(Post);