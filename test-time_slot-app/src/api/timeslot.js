import { serverUrl } from '../serverUrl';


export const fetchTimeslot = (setSlots, userId, token) => {
    const bearer = 'Bearer ' + token;

    return fetch(serverUrl + 'timeslot/' + userId, {
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
        setSlots(response.value);
        //setChoosenSlots(slots !== "" ? slots.split(',') : []);
    })
    .catch(error => console.log(error))
}


export const postTimeslot = (value, userId, token) => {
    const bearer = 'Bearer ' + token;

    return fetch(serverUrl + 'timeslot/' + userId , {
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
    })
    .catch(error => console.log(error))
}