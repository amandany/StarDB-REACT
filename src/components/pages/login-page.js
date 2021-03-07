import React from 'react';
import {Redirect} from 'react-router-dom';

const LoginPage = ({isLogIn, onLogIn}) => {

    if(isLogIn){
        return <Redirect to="/" />;
    }
    return (
        <div className="jumbotron">
            <h2>Login to see secret page!</h2>
            <button
                className="btn btn-primary"
                onClick={onLogIn} >
                LOGIN
            </button>
        </div>
    )
}

export default LoginPage;