  import { Table, Button } from 'reactstrap';
  import '../App.css';
  import React from 'react';
  import { fetchTimeslot, postTimeslot } from '../api/timeslot';

    let choosenSlots = [];

    const mouseOver = (e, day, hour, msDown, setSlots) => {
        if (msDown) {
            if (choosenSlots.indexOf(day+":"+hour) !== -1) {
                choosenSlots.splice(choosenSlots.indexOf(day+":"+hour), 1);
                setSlots(choosenSlots.toLocaleString());
            }
            else {
                choosenSlots.push(day+":"+hour);
                setSlots(choosenSlots.toLocaleString());
            }
            e.target.style=`width: 40px; height: 40px; border: 1px solid black; background-color: ${choosenSlots.indexOf(day+":"+hour) === -1 ? 'white' : 'red'}`;
        }
    }

    const mouseDown = (e, day, hour, setMsDown, setSlots) => {
        setMsDown(true);

        if (choosenSlots.indexOf(day+":"+hour) === -1) {
            choosenSlots.push(day+":"+hour);
            setSlots(choosenSlots.toLocaleString());
        }
        else {
            choosenSlots.splice(choosenSlots.indexOf(day+":"+hour), 1);
            setSlots(choosenSlots.toLocaleString());
        }
        e.target.style=`width: 40px; height: 40px; border: 1px solid black; background-color: ${choosenSlots.indexOf(day+":"+hour) !== -1 ? 'red' : 'white'}`;
    }


  const RenderHours = ({ day, time_slots, setSlots, msDown, setMsDown, choosenSlots }) => {
    const hours = time_slots.hours.map(hour => {
    return (
        <td style={{width: "40px", height: "40px", border: "1px solid black", backgroundColor: choosenSlots.indexOf(day+":"+hour) !== -1 ? 'red' : 'white'}} id={day+":"+hour} key={day+":"+hour}
            onMouseDown={e => mouseDown(e, day, hour, setMsDown, setSlots)}
            onMouseUp={() => setMsDown(false)}
            onMouseOver={e => mouseOver(e, day, hour, msDown, setSlots)}
        />
    );
    });
    return (
    <div className="row col-11">
        {hours}
    </div>
    )
  }


  const RenderSlots = ({ setUserId, userId, setIsAuth }) => {
    const [slots, setSlots] = React.useState("");
    const [msDown, setMsDown] = React.useState(false);

    fetchTimeslot(setSlots, userId, localStorage.getItem('token'));
    choosenSlots = slots !== "" ? slots.split(',') : [];

    const time_slots = {
        hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    };    
    
    const _slots = time_slots.days.map(day => {
        let currentDay = 0;
        switch(day) {
        case "Monday": currentDay = 1; break;
        case "Tuesday": currentDay = 2; break;
        case "Wednesday": currentDay = 3; break;
        case "Thursday": currentDay = 4; break;
        case "Friday": currentDay = 5; break;
        case "Saturday": currentDay = 6; break;
        case "Sunday": currentDay = 7; break;
        default: currentDay = 0; break;
    
        }
        return (
        <div className="row unselected" key={day}>
            <h5 className="mr-4 pl-1 col-1 mt-2">{day}</h5>
            <RenderHours
                day={currentDay}
                time_slots={time_slots}
                choosenSlots={choosenSlots}
                setSlots={setSlots}
                msDown={msDown}
                setMsDown={setMsDown}
            />
        </div>
        )
    })
  

    const ths = time_slots.hours.map(hour => <th style={{marginLeft: hour < 10 ? "0.7%" : "-0.2%",}}>{hour}</th>);
    return (
        <>
            <Table style={{borderCollapse: "collapse"}}>
                <tr className="row ml-5 pl-5 unselected">
                    {ths}
                </tr>
                <tbody>
                {_slots}
                </tbody>
            </Table>
            <div className="row">
                <Button color="warning" className="offset-5 col-1 mr-2" style={{width: "100px", height: "50px", border: "1px solid black"}} onClick={() => {
                    postTimeslot({value: slots.toLocaleString()}, userId, localStorage.getItem('token'));
                }}>
                <h5>Save</h5>
                </Button>
                <Button color="secondary" className="col-1 ml-2" onClick={() => {
                    setSlots("");
                    setUserId("");
                    setIsAuth(false);
                }}>
                <h5>Logout</h5>
            </Button>
          </div>
        </>
    )
  }

  export default RenderSlots;