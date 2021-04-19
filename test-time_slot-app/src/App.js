import './App.css';
import { Button } from 'reactstrap';
import React from 'react';
import { postTimeslot } from './api/timeslot';

import Login from './components/Login';
import RenderSlots from './components/RenderSlots';

function App() {
  const [userId, setUserId] = React.useState("");
  const [isAuth, setIsAuth] = React.useState(localStorage.getItem('token') !== null ? true : false);

  return (
    <div className="container">
      { isAuth ?
        <>
          <RenderSlots setUserId={setUserId} userId={userId} setIsAuth={setIsAuth} />
        </>
        : 
        <div className="row justify-content-center" style={{marginTop: "15%"}}>
          <Login setIsAuth={setIsAuth} setUserId={setUserId} userId={userId}/>
        </div>  
      }
    </div>
  );
}

export default App;
