import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleSubmit = async () => {
        const connection = await axios.create({
            baseURL: 'http://localhost:8080/'
        });
        const response = await connection.post('/', {
            email: this.state.email,
            password: this.state.password
        });
        console.log(response);
    };

    render() {
        return (
            <div>
                <input
                    onChange={(e) => this.handleEmailChange(e)}
                    type="email"
                    placeholder="Email"
                />
                <input
                    onChange={(e) => this.handlePasswordChange(e)}
                    type="password"
                    placeholder="Password"
                />
                <button onClick={this.handleSubmit}> Submit </button>
            </div>
        )
    }
}
