import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";

import {useAuth} from "../hook/useAuth";
import '../styles/Schedule.css';
import EditForm from "./EditForm";

const Schedule = () => {
    const {client, role} = useAuth();
    const [scheduleTable, setScheduleTable] = useState([]);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        client.get(`/api/scheduletable`)
            .then(response => {
                setScheduleTable(response.data);
                console.log('schtable', scheduleTable)
            });
    }, [modalDelete, modalEdit, modalAdd]);

    return (
        <>
            <Modal visible={modalDelete} setVisible={setModalDelete}>
                <DeleteForm id={id} cb={() => {
                    setModalDelete(!modalDelete);
                }}/>
            </Modal>
            <Modal visible={modalEdit} setVisible={setModalEdit}>
                <EditForm id={id} cb={() => setModalEdit(!modalEdit)}/>
            </Modal>
            <Modal visible={modalAdd} setVisible={setModalAdd}>
                <AddForm cb={() => setModalAdd(!modalAdd)}/>
            </Modal>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Number</th>
                        <th>Room Name</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialization</th>
                        <th>Work Days</th>
                        <th>Work Hours</th>
                        {role === 'Admin' &&
                            <th>Actions</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {scheduleTable.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.number}</td>
                            <td>{room.room_name}</td>
                            <td>{room.doctor_name}</td>
                            <td>{room.doctor_specialization}</td>
                            <td>{room.work_days}</td>
                            <td>{room.work_hours}</td>
                            {role === 'Admin' &&
                                <td>
                                    <button onClick={() => {
                                        setId(room.id);
                                        setModalDelete(!modalDelete);
                                    }}>
                                        Delete
                                    </button>
                                    <button onClick={() => {
                                        setId(room.id);
                                        setModalEdit(!modalEdit);
                                    }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            }
                        </tr>
                    ))}
                    {role === 'Admin' &&
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button onClick={() => setModalAdd(!modalAdd)} className="form-button">
                                    Add
                                </button>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
        ;
}

export default Schedule;
