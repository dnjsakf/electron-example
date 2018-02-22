import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'

import ItemList from './List.js'
import ItemView from './View.js'

const defaultProps = {
    description: "Main App"
}

class App extends React.Component {
    constructor(props, context){
        super(props, context);
    }
    render(){
        return (
            <div>
                <Route path="/" exact component={ ItemList } /> {/* home */}
                <Switch>
                    <Route path="/item/:number" component={ ItemView } />
                    <Route path="/item" component={ ItemView } />
                </Switch>
            </div>
        )
    }
}

export default App