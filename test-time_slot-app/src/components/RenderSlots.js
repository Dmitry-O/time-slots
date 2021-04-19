  import { Table } from 'reactstrap';
  import '../App.css';
  import React from 'react';

  const RenderSlots = ({ slots, setSlots }) => {
    var msDown = false;

    const time_slots = {
        hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    };

    
    var choosenSlots = slots !== "" ? slots.split(',') : [];
    
    const mouseOver = (e, day, hour) => {
        if (msDown) {
            console.log("it works");
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
    
    const mouseDown = (e, day, hour) => {
        msDown = true;

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
    
    
    const RenderHours = ({day}) => {
        const hours = time_slots.hours.map(hour => {
        return (
            <td style={{width: "40px", height: "40px", border: "1px solid black", backgroundColor: choosenSlots.includes(day+":"+hour) ? 'red' : 'white'}} id={day+":"+hour} key={day+":"+hour}
                onMouseDown={e => mouseDown(e, day, hour)}
                onMouseUp={() => msDown = false}
                onMouseOver={e => mouseOver(e, day, hour)}
            />
        );
        });
        return (
        <div className="row col-11">
            {hours}
        </div>
        )
    }
    
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
            <RenderHours day={currentDay}/>
        </div>
        )
    })
  

    const ths = time_slots.hours.map(hour => <th style={{marginLeft: hour < 10 ? "0.7%" : "-0.2%",}}>{hour}</th>);
    return (
      <Table style={{borderCollapse: "collapse"}}>
          <tr className="row ml-5 pl-5 unselected">
            {ths}
          </tr>
        <tbody>
          {_slots}
        </tbody>
      </Table>
    )
  }

  export default RenderSlots;