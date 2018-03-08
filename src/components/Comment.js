import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Comment, Icon } from 'semantic-ui-react';

class CommentView extends Component {
  render() {
    const { comment, commentVoteUp, commentVoteDown, parentId } = this.props;
    const thisID = comment.id;

    const commentsVoteUp = () => {
      commentVoteUp(thisID);
    }

    const commentsVoteDown = () => {
      commentVoteDown(thisID);
    }

    const commentDeleteComment = () => {
      this.props.deleteComment(comment.id);
    }
        
    if (comment.id && (comment.parentId === parentId)) { //
      return (
        <Comment key={comment.id} style={style.comment}>
          <Comment.Content>
            <Comment.Author>{comment.author} <Link to={`/editcomment/${comment.id}`}><Icon name="pencil" /></Link> <Icon name="trash" onClick={commentDeleteComment} style={{color: 'red'}}/></Comment.Author>
            <Comment.Text>{ comment.body }</Comment.Text>
            <Comment.Actions>Comments Score: { comment.voteScore } <Icon onClick={commentsVoteUp} name="thumbs outline up" style={{color: 'green'}} size="large" /> <Icon onClick={commentsVoteDown} name="thumbs outline down" style={{color: 'red'}} size="large" /> </Comment.Actions>
          </Comment.Content>
        </Comment>
        )
      } 
    
    return(
      null
    )
  }
}

const style = {
  comment: {
    margin: 'auto',
    maxWidth: '100%',
  }
}

export default CommentView;