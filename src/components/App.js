import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import '../App.css';
import { categoriesGet, postsGet } from '../actions/actions';
import Main from './Main';
import CategoryLinks from './CategoryLinks';


class App extends Component {
   componentDidMount() {
    this.props.categoriesGet();
    this.props.postsGet();    
  }

  render() {
    //console.log(this.props);
    return (
      <div className="App">
        <CategoryLinks />
        <Main/>{/*  */}        
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
      categoriesGet,
      postsGet,
    },
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(App);