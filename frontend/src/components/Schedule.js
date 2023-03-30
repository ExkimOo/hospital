import React, {useEffect, useState} from "react";

import '../styles/Schedule.css';

const Schedule = ({client}) => {
    const [scheduleTable, setScheduleTable] = useState([]);

    useEffect(() => {
        client.get(`/api/scheduletable`)
            .then(response => {
                setScheduleTable(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Room Name</th>
                    <th>Doctor Name</th>
                    <th>Doctor Specialization</th>
                    <th>Work Days</th>
                    <th>Work Hours</th>
                </tr>
                </thead>
                <tbody>
                {scheduleTable.map((room) => (
                    <tr key={room.id}>
                        <td>{room.number}</td>
                        <td>{room.room_name}</td>
                        <td>{room.doctor_name}</td>
                        <td>{room.doctor_specialization}</td>
                        <td>{room.work_days}</td>
                        <td>{room.work_hours}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;