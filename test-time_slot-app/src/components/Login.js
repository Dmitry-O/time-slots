import React from 'react';
import '../App.css';
import {Button, Input} from 'reactstrap';
import { signupUser } from '../api/auth';
import { fetchTimeslot } from '../api/timeslot';

const Login = ({ setIsAuth, setSlots, token, setToken, setUserId, userId }) => {
    const [creds, setCreds] = React.useState({username: '', password: ''});
    const [btnClicked, setBtnClicked] = React.useState(false);
  
    return (
      <div>
        <h4>To use Time-Slots app sign in / sign up first</h4>
        <div className="row mt-5 ml-4">
          <h4 className="col-5">Your username</h4>
          <div className="col-5">
            <Input type="text" onChange={e => setCreds({username: e.target.value, password: creds.password})}/>
            <h6 className="text-danger" style={{maxWidth: "150%"}}>{creds.username === '' && btnClicked ? "Enter username" : creds.username.length < 4 && btnClicked ? "Username must have at least 4 characters" : ""}</h6>
          </div>
        </div>
        <div className="row mt-3 ml-4">
          <h4 className="col-5">Your password</h4>
          <div className="col-5 mb-1">
            <Input type="text" onChange={e => setCreds({username: creds.username, password: e.target.value})}/>
            <h6 className="text-danger" style={{maxWidth: "150%"}}>{creds.password === '' && btnClicked ? "Enter password" : creds.password.length < 5 && btnClicked ? "Password must have at least 5 characters" : ""}</h6>
          </div>
        </div>
        <div className="mt-3 row">
          <Button color="info" className="col-6 offset-3" onClick={() => {
            setBtnClicked(true);
            if (creds.username.length >= 4 && creds.password.length >= 5) {
              setUserId("");
              signupUser(creds, setToken, setUserId, token)
              .then(() => {
                if (token !== "") {
                  fetchTimeslot(setSlots, userId, token)
                  .then(() => {
                    setIsAuth(true);
                  });
                }
              });
            }
          }}>
            <h3>Sign up / Sign in</h3>
          </Button>
        </div>
      </div>
    )
}

export default Login;