import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import { Icon, Button, Menu } from 'semantic-ui-react';
import { ucWord } from '../utils/helpers';

class CategoryLinks extends Component {
  render() {
    const { categories } = this.props;

    return (
      <div>
        <Menu>
          <Menu.Item header><Link to="/"><Icon name="home" size="big" /></Link></Menu.Item>
        {
        categories && categories.map((category, index) => (
          <Menu.Item header key={category.path}><Link to={`/${category.path}`}><Button>{ucWord(category.name)}</Button></Link></Menu.Item>
          ))
        }
        </Menu> 
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