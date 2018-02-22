import React from 'react';
import { Link } from 'react-router-dom'

const defaultProps = {
    description: "Item List"
}

const Item = ({key, data})=>{
    return (
        <li className={`item ${key} row`}>
            <Link to={data.link}>
                <span className="col s1">{data.no}</span>
                <span className="col s6">{data.title}</span>
                <span className="col s2">{data.writer}</span>
                <span className="col s3">{data.regDate}</span>
            </Link>
        </li>
    )
}

class List extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {}
        this.state.list = [
            {
                no: 1,
                title: 'notice',
                writer: 'admin',
                regDate: '2018-02-22',
                link: '/item/1'
            },
            {
                no: 2,
                title: 'notice',
                writer: 'admin',
                regDate: '2018-02-22',
                link: '/item/2'
            }
        ]
    }
    render(){
        return (
            <ul className="collection item-list">
            {
                this.state.list.map((item, index)=>{
                    return (<Item key={index} data={item} />)
                })
            }
            </ul>
        )
    }
}

export default List