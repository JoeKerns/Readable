import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { categoryAdd, postAdd, commentsAdd } from '../actions/actions';
import Main from './Main';
import CategoryLinks from './CategoryLinks';

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
      	posts.map((post) => {
          this.props.dispatch(postAdd(post));

          const urlComments = `http://localhost:3001/posts/${post.id}/comments`;
          fetch(urlComments, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } )
            .then((res) => { return(res.text() )})
            .then((data) => {
              const comments = JSON.parse(data);
              comments.length && this.props.dispatch(commentsAdd(comments));
            })
        return true;
        });
      });
      
    //const url = `${process.env.REACT_APP_BACKEND}/categories`;
    const url = `http://localhost:3001/categories`;
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        const categories = JSON.parse(data);
        //console.log(categories.categories);
        categories.categories.map((category) => (
          this.props.dispatch(categoryAdd(category.name,category.path))
        ));
      });
    
    
  }

  render() {
    const { category } = this.props;
    //console.log(category);
    return (
      <div className="App">
        <CategoryLinks categories={category} />
        <Main/>{/*  */}        
      </div>
    );
  }
}

 function mapStateToProps({ categoryReducer, postReducer }) {  
	return {
      category: categoryReducer.category,
      posts: postReducer.posts,
    }
} /**/

export default connect(mapStateToProps)(App);