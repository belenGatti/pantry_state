import {createContext} from 'react';

export interface User {
    auth0Id: string; // sub on useAuth0's user object
    name: string;
    email: string;
    pantryId: number | string;
    accessToken: string;
    isAuthenticated: boolean;
}

interface UserContext {
    user: User;
    setUser: (user: User) => void;
}

export const UserContext = createContext<UserContext>({
    user: {
        auth0Id: '',
        name: '',
        email: '',
        pantryId: '',
        accessToken: '',
        isAuthenticated: false
    },
    setUser: () => {}
});

