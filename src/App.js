import React from 'react';
import {Nav} from '../Navbar';
import {Header} from '../Input';
import {List} from '../list';

class App extends React.Component{
    state={
     list:[]   
    };
    addlist=(value)=>{
        this.setState({
            list:[...this.state.list,value]
        });
    };
    render(){
return(<div>
    <Nav/>
    <Header addlist={this.addlist}/>
    <List items={this.state.list}/>
</div>);
    }
}
export default App;