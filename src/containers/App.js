import React from 'react';

const defaultProps = {
    description: "Main App"
}

class App extends React.Component {
    constructor(props, context){
        super(props, context);

    }
    render(){
        return (
            <h1>Hot</h1>
        )        
    }
}

export default App