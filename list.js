import React from 'react';

export class List extends React.Component{
    render(){
    console.log(this.props)
   return(<div>
   <ul className="list-group">
       {
       this.props.items.map(i=>(
<li key={i} className="list-group-item list-group-item-primary">{i}</li>
   ))
    }
   </ul>
   </div>
)}
}