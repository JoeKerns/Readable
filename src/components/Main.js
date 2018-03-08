import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Posts from './Posts'
import PostView from './PostView'
import PostNew from './PostNew'
import NewComment from './NewComment'
import PostEdit from './PostEdit'
import CommentEdit from './CommentEdit'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Posts}/>
      <Route path='/posts/:id' component={PostView}/>
      <Route path='/newpost' component={PostNew}/>
      <Route path='/newcomment/:parentId' component={NewComment}/>
      <Route path='/editpost/:id' component={PostEdit}/>
      <Route path='/editcomment/:id' component={CommentEdit}/>
      <Route path='/:category/:id' component={Posts}/>
      <Route exact path='/:category' component={Posts}/>
      {/*
      <Route exact path='/' component={Posts}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
      */}
    </Switch>
  </main>
)

export default Main
