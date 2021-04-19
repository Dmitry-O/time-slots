import { serverUrl } from '../serverUrl';

export const signupUser = async (creds, setUserId) => {
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
        localStorage.setItem('token', response.token);
        setUserId(response.user.id);
    })
    .catch(error => {
        if (error == "Error: Error 401: Unauthorized") {
            alert("The password you entered is wrong.\nPlease, try again.");
        }
        console.log(error);
    })
}