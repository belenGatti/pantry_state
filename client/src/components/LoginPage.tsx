import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from '@mui/material';

function LoginPage() {
    const { loginWithRedirect, isAuthenticated} = useAuth0();
    return (
        <>
        <h1>Welcome to Pantry state!</h1>
          {!isAuthenticated && <Button onClick={() => loginWithRedirect()}>Login</Button>}
        </>
    )
}

export default LoginPage;