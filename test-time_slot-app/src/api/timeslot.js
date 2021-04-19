import { serverUrl } from '../serverUrl';

const bearer = 'Bearer ' + localStorage.getItem('token');


export const fetchTimeslot = () => {
    return fetch(serverUrl + 'timeslot/' + localStorage.getItem('user_id'), {
        method: 'GET',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        }
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
        localStorage.removeItem('slots');
        console.log(response.value, " and user_id:");
        localStorage.setItem('slots', response.value);
    })
    .catch(error => console.log(error))
}


export const postTimeslot = (value) => {
    return fetch(serverUrl + 'timeslot/' + localStorage.getItem('user_id') , {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(value)
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
        console.log(response);
        //localStorage.setItem('slots', response.value);
    })
    .catch(error => console.log(error))
}