import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Posts from './Posts'
import PostView from './PostView'
import NewPost from './NewPost'
import NewComment from './NewComment'
//import Roster from './Roster'
//import Schedule from './Schedule'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Posts}/>
      <Route path='/category/:name' component={Posts}/>
      <Route path='/posts/:id' component={PostView}/>
      <Route path='/newpost' component={NewPost}/>
      <Route path='/newcomment/:parentId' component={NewComment}/>
      {/*
      <Route exact path='/' component={Posts}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
      */}
    </Switch>
  </main>
)

export default Main
