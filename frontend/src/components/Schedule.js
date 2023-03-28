import React from "react";

import '../styles/Schedule.css';

function RoomTable() {
    const rooms = [
        {
            id: 1,
            number: 101,
            name: 'Room 101',
            doctor: 'Dr. Smith',
            specialization: 'Cardiology',
            workDays: 'Mon - Fri',
            workHours: '9am - 5pm'
        },
        {
            id: 2,
            number: 102,
            name: 'Room 102',
            doctor: 'Dr. Johnson',
            specialization: 'Pediatrics',
            workDays: 'Mon - Sat',
            workHours: '8am - 6pm'
        },
        {
            id: 3,
            number: 103,
            name: 'Room 103',
            doctor: 'Dr. Garcia',
            specialization: 'Dermatology',
            workDays: 'Tue - Thu',
            workHours: '10am - 4pm'
        },
    ];

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
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.number}</td>
                            <td>{room.name}</td>
                            <td>{room.doctor}</td>
                            <td>{room.specialization}</td>
                            <td>{room.workDays}</td>
                            <td>{room.workHours}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
    );
}

export default RoomTable;
