import './App.css';
import { Button } from 'reactstrap';
import React from 'react';
import { postTimeslot } from './api/timeslot';

import Login from './components/Login';
import RenderSlots from './components/RenderSlots';

function App() {
  const [token, setToken] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [isAuth, setIsAuth] = React.useState(token !== "" ? true : false);
  const [slots, setSlots] = React.useState("");

  return (
    <div className="container">
      { isAuth ?
        <>
          <RenderSlots slots={slots} setSlots={setSlots}/>
          <div className="row">
            <Button color="warning" className="offset-5 col-1 mr-2" style={{width: "100px", height: "50px", border: "1px solid black"}} onClick={() => {
                postTimeslot({value: slots.toLocaleString()}, userId, token);
              }}>
              <h5>Save</h5>
            </Button>
            <Button color="secondary" className="col-1 ml-2" onClick={() => {
                setToken("");
                setSlots("");
                setUserId("");
                setIsAuth(false);
              }}>
              <h5>Logout</h5>
            </Button>
          </div>
        </>
        : 
        <div className="row justify-content-center" style={{marginTop: "15%"}}>
          <Login setIsAuth={setIsAuth} setSlots={setSlots} token={token} setToken={setToken} setUserId={setUserId} userId={userId}/>
        </div>  
      }
    </div>
  );
}

export default App;
