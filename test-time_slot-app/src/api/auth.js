import { serverUrl } from '../serverUrl';

export const signupUser = async (creds, setUserId, setIsAuth) => {
    return fetch(serverUrl + 'signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => { throw error }
    )
    .then(response => response.json())
    .then(response => {
        localStorage.removeItem('token');
        if (response.token !== undefined) {
            localStorage.setItem('token', response.token);
            setUserId(response.user.id);
            setIsAuth(true);
        }
        else alert("Such user is already registered");
    })
    .catch(error => {
        setIsAuth(false);
        console.log(error);
    })
}


export const signinUser = async (creds, setUserId, setIsAuth) => {
    return fetch(serverUrl + 'signin', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => { throw error }
    )
    .then(response => response.json())
    .then(response => {
        localStorage.removeItem('token');
        if (response.token !== undefined) {
            localStorage.setItem('token', response.token);
            setUserId(response.user.id);
            setIsAuth(true);
        }
        else alert("Username or password you entered is wrong.\nPlease, try again");
    })
    .catch(error => {
        setIsAuth(false);
        console.log(error);
    })
}