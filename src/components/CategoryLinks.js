import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';

class CategoryLinks extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div>
      <Link to="/">Home</Link> 
      Categories: 
      {
      categories && categories.map((category, index) => (
        <span key={category.name}> <Link to={`/category/${category.path}`}>{category.name}</Link> </span> 
        ))
      }
      <div><Link to="/newpost">New Post</Link></div>
      </div>
    )    
  }
}

function mapStateToProps({ categories }) {  
	return {
      categories
    }
}

export default connect(mapStateToProps)(CategoryLinks);