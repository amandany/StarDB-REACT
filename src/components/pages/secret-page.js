import React from 'react';
import {Redirect} from "react-router-dom";

const SecretPage = ({isLogIn}) => {

    if (isLogIn) {
        return (
            <h3> THIS IS PAGE FOR ONLY LOGIN USERS </h3>
        )
    }

    return (
        <Redirect to="/login" />
    )
}

export default SecretPage;