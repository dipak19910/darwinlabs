import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FullSearchImage from './FullSearchImage'
import SearchImage from './SearchImage'

// The Roster component matches one of two different routes
// depending on the full pathname
const Search = () => (
    <Switch>
        <Route exact path='/search' component={FullSearchImage}/>
        <Route path='/search/name/:name' component={SearchImage}/>
    </Switch>
)


export default Search
