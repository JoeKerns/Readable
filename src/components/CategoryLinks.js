import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
//import { addPost } from '../actions/actions';

class CategoryLinks extends Component {
  render() {
    const { categories } = this.props;
    //console.log(categories);
    return (
      <div>
      <Link to="/">Home</Link> 
      Categories: 
      {
      categories && categories.map((category, index) => (
        category.name && <span key={category.name}> <Link to={`/category/${category.path}`}>-{category.name}-</Link> </span> 
        ))
      /**/}
      </div>
    )
    
  }
}

/*function mapStateToProps({ addPost }) {  
	return {
      posts: addPost.posts,
    }
}     mapStateToProps    */

//export default connect()(CategoryLinks);
export default CategoryLinks;