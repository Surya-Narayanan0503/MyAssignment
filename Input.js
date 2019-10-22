import React from 'react';
export class Header extends React.Component {
    state = {
        input: ""
    }
    handleInputChange = event => {
        this.setState({
            input: event.target.value
        })

    }
    handleSubmit = value => {
        this.props.addlist(this.state.input)
        this.setState({ input: "" })
    }
    render() {
        return (
        <div>
            <input type="text" className="form-control" onChange={this.handleInputChange} value={this.state.input} />
            <button className="btn btn-block btn-primary" onClick={this.handleSubmit}>ADD BUTTON</button>
        </div>);
    }
}
