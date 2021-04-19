import './App.css';
import { Button } from 'reactstrap';
import React from 'react';
import { postTimeslot } from './api/timeslot';

import Login from './components/Login';
import RenderSlots from './components/RenderSlots';

let choosenSlots = [];

function App() {
  const [isAuth, setIsAuth] = React.useState(localStorage.getItem('token') !== null ? true : false);

  return (
    <div className="container">
      { isAuth ?
        <>
          <RenderSlots/>
          <div className="row">
            <Button color="warning" className="offset-5 col-1 mr-2" style={{width: "100px", height: "50px", border: "1px solid black"}} onClick={() => {
                localStorage.setItem('slots', choosenSlots.toLocaleString());
                postTimeslot({value: choosenSlots.toLocaleString()});
              }}>
              <h5>Save</h5>
            </Button>
            <Button color="secondary" className="col-1 ml-2" onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('slots');
                localStorage.removeItem('user_id');
                choosenSlots = [];
                setIsAuth(false);
              }}>
              <h5>Logout</h5>
            </Button>
          </div>
        </>
        : 
        <div className="row justify-content-center" style={{marginTop: "15%"}}>
          <Login setIsAuth={setIsAuth}/>
        </div>  
      }
    </div>
  );
}

export default App;
