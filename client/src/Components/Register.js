import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

export default class Register extends React.Component {

    constructor() {
        super();

        this.state = {
            message: '',
            messages: [],
        };
    }

    componentDidMount() {
        socket.on('CHANGE_COLOR', (color) => {
            document.body.style.backgroundColor = color;
        });
        socket.on('RECEIVE_MESSAGE', (data) => {
            alert(`New message: ${data.message}`);
            this.setState({messages: data.messages});
        });
    };

    handleMessageChange = (e) => {
        this.setState({ message: e.target.value });
    };

    sendMessage = async () => {
        await this.setState({messages: [...this.state.messages, this.state.message]});
        socket.emit('SEND_MESSAGE', {
            message: this.state.message, messages: this.state.messages
        });
        await this.setState({message: ''});
    };

    handleColorChange = () => {
        socket.emit('CHANGE_COLOR', 'red');
    };

    render() {
        return (
            <div>
                <input
                    onChange={this.handleMessageChange}
                    placeholder="Message"
                    value={this.state.message}
                />
                <button onClick={this.handleColorChange}> Change color </button>
                <button onClick={this.sendMessage}> Send message </button>
                <br/>
                {this.state.messages.map((msg, i) => {
                    return (
                        <div key={i}> {msg} </div>
                    )
                })}
            </div>
        )
    }
}
