import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { Link } from 'react-router-dom';
import { Icon, Checkbox, Card } from 'semantic-ui-react';
import { ucWord } from '../utils/helpers';

class Posts extends Component {
  state = { sortOption: true }
  render() {
    let category = '';
    let postsFromCategory = [];
    const { posts } = this.props;
    const { sortOption } = this.state;

    if (this.props.match.params.name) {
      category = this.props.match.params.name;
      postsFromCategory = posts.filter(post => post.category === category);
    }

    const postsToShow = (postsFromCategory.length > 0) ? postsFromCategory : posts;  
    
    if (this.props.match.params.name && postsFromCategory.length === 0) {
      return (
        <div> No posts for this category...maybe you should add one! </div>
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
        <div style={style.header}> { ucWord(this.props.match.params.name) || 'Posts' }  <Link to="/newpost"><Icon name="add square" size="small" /></Link> </div>
        
        <div style={style.slider}>Sort By: Timestamp <Checkbox slider onClick={toggleSortOption} /> Vote</div>

        { 
          postsToShow && postsToShow.map((post, index) => (
            post.id && 
            <Card key={post.id} style={style.postCard}> 
              <Card.Content>
                <Card.Header>
                  <Link to={`/posts/${post.id}`}> { `${post.title} - ${post.author}` } </Link>
                </Card.Header>
                <Card.Description>
                  { `Vote Score: ${post.voteScore}`}<br/>
                  { `Comments: ${post.commentCount}`}
                </Card.Description>
              </Card.Content>  
            </Card>
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



export default connect(mapStateToProps)(Posts);