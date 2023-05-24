import React, {useEffect, useState} from "react";
import {useAuth} from "../hook/useAuth";
import '../styles/Form.css';

const AddForm = ({cb}) => {
    const {client} = useAuth();
    const [workDays, setWorkDays] = useState('');
    const [workHours, setWorkHours] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [roomId, setRoomId] = useState('');
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        client.get("/api/doctor/")
            .then(response => {
                setDoctors(response.data);
            });
    }, []);

    useEffect(() => {
        client.get("/api/room/")
            .then(response => {
                setRooms(response.data);
            });
    }, []);

    const submitAdd = (e) => {
        e.preventDefault();
        client.post("/api/schedule/",
            {
                "worktime": workHours,
                "days": workDays,
                "doctor": doctorId,
                "room": roomId
            });
        setTimeout(cb, 100);
    };

    const handleWorkDaysChange = (event) => {
        setWorkDays(event.target.value);
    };

    const handleWorkHoursChange = (event) => {
        setWorkHours(event.target.value);
    };

    const handleDoctorIdChange = (event) => {
        setDoctorId(event.target.value);
    };

    const handleRoomIdChange = (event) => {
        setRoomId(event.target.value);
    };

    return (
        <form onSubmit={submitAdd} className="form-form">
            <select value={roomId} onChange={handleRoomIdChange} className="form-select">
                <option value=""></option>
                {rooms &&
                    rooms.map(r => {
                        return (
                            <option value={r.id}>{r.id}</option>
                        )
                    })}
            </select>
            {roomId &&
                <>
                    <input
                        type="text"
                        value={rooms.filter(r => r.id == roomId)[0].number}
                        readOnly={true}
                        className="form-input"
                    />
                    <input
                        type="text"
                        value={rooms.filter(r => r.id == roomId)[0].name}
                        readOnly={true}
                        className="form-input"
                    />
                </>
            }
            <select value={doctorId} onChange={handleDoctorIdChange} className="form-select">
                <option value=""></option>
                {doctors &&
                    doctors.map(d => {
                        return (
                            <option value={d.id}>{d.id}</option>
                        )
                    })}
            </select>
            {doctorId &&
                <>
                    <input
                        type="text"
                        value={doctors.filter(d => d.id == doctorId)[0].name}
                        readOnly={true}
                        className="form-input"
                    />
                    <input
                        type="text"
                        value={doctors.filter(d => d.id == doctorId)[0].specialization}
                        readOnly={true}
                        className="form-input"
                    />
                </>
            }
            <input
                type="text"
                placeholder="Work Days"
                value={workDays}
                onChange={handleWorkDaysChange}
                className="form-input"
            />
            <input
                type="text"
                placeholder="Work Hours	"
                value={workHours}
                onChange={handleWorkHoursChange}
                className="form-input"
            />
            <button type="submit" className="form-button">
                Add
            </button>
        </form>
    )
}

export default AddForm;