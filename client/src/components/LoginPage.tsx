import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from '@mui/material';

function LoginPage() {
    const { loginWithRedirect, isAuthenticated} = useAuth0();
    const handleLogin = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "food-items-list",
        },
      });
    };
    const handleSignUp = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "food-items-list",
        },
        authorizationParams: {
          screen_hint: "signup",
        },
      });
    };
    return (
        <>
        <h1>Welcome to Pantry state!</h1>
          {!isAuthenticated && <Button onClick={() => handleLogin()}>Login</Button>}
          {!isAuthenticated && <Button onClick={() => handleSignUp()}>Sign up</Button>}
        </>
    )
}

export default LoginPage;