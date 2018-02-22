import React from 'react';
import { Link } from 'react-router-dom'

const defaultProps = {
    description: "View"
}

class View extends React.Component {
    constructor(props, context){
        super(props, context);
    }
    render(){
        return (
            <div>
                <Link to="/">Home</Link>
            </div>
        )
    }
}

export default View