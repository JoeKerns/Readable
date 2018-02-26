import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { addCategory, addPost } from './actions/actions';
import Main from './components/Main';
import CategoryLinks from './components/CategoryLinks';

class App extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data',
      categories: null,
      
    }
  } // posts: null,*/

  componentDidMount() {
    //const urlPosts = `${process.env.REACT_APP_BACKEND}/posts`;
    const urlPosts = `http://localhost:3001/posts`;
    fetch(urlPosts, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then((data) => {
      	const posts = JSON.parse(data);
      	posts.map((post) => (
          this.props.dispatch(addPost(post))
        ));
      });
      
    //const url = `${process.env.REACT_APP_BACKEND}/categories`;
    const url = `http://localhost:3001/categories`;
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        const categories = JSON.parse(data);
        //console.log(categories.categories);
        categories.categories.map((category) => (
          this.props.dispatch(addCategory(category.name,category.path))
        ));
      });
    
    
  }

  render() {
    const { category, posts } = this.props;
    //console.log(category,posts);
    return (
      <div className="App">
        <CategoryLinks categories={category} />
        <Main/>{/*  */}        
      </div>
    );
  }
}

/* function mapStateToProps({ addCategory, addPost }) {  
	return {
      category: addCategory.category,
      posts: addPost.posts,
    }
} mapStateToProps*/

export default App;