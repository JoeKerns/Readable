import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { postSave } from '../actions/actions';
import { postSaveToServer } from '../utils/api';
import '../App.css';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import { Button, Form } from 'semantic-ui-react';
import { ucWord } from '../utils/helpers';

class PostNew extends Component {
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
      voteScore: 0,
      commentCount: 0,
    }

    this.props.postSave(postData);
    postSaveToServer(JSON.stringify(postData));
    this.props.history.push(`/category/${this.category.value}`);
  }
  
  render() {
    return (
      <div>
        <h3>New Post</h3>
        
        <Form onSubmit={this.savePost} style={style.formStyle}>
        <input type="hidden" ref={node => { this.id = node  }} defaultValue={this.props.match.params.id} />
        <Form.Field><label>Name:</label> <input type="text" placeholder="Name" ref={node => { this.author = node  }}  /></Form.Field>
        <Form.Field><label>Title: </label><input type="text" ref={node => { this.title = node  }}  /></Form.Field>
        <Form.Field><label>'Category:'</label><select  ref={node => { this.category = node  }}>
        {
          this.props.categories !== null && this.props.categories.map((category, index) => (
            <option key={category.name} value={category.name}>{ucWord(category.name)}</option>
          ))
        }
        </select>
        </Form.Field>
       

        <Form.Field><label>Body: </label><textarea cols="40" rows="8" ref={node => { this.body = node  }}></textarea></Form.Field>
        <Button>Submit Post</Button> <Link to="/"><Button>Cancel</Button></Link>
        </Form>
      </div>
    )    
  }
}


function mapStateToProps({ categories, posts }) {  
	return {
      categories,
      posts
    }
}/**/

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
      postSave,
    },
    dispatch
  );

const style={
  formStyle: {
    width: '40%',
    margin: 'auto',
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostNew);