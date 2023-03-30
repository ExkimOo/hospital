import React, {useEffect, useState} from 'react';

import '../styles/Audit.css';

const Audit = ({client}) => {
    const [auditTable, setAuditTable] = useState([]);

    useEffect(() => {
        client.get(`/api/adminaudit`)
            .then(response => {
                setAuditTable(response.data);
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
                    <th>ID</th>
                    <th>Table</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Description</th>
                    <th>Date Created</th>
                </tr>
                </thead>
                {auditTable.map((item) => {
                    return (
                        <tr>
                            <th>{item.id}</th>
                            <th>{item.table}</th>
                            <th>{item.user}</th>
                            <th>{item.action}</th>
                            <th>{1}</th>
                            <th>{item.created}</th>
                        </tr>
                    )
                })}
                <tbody>
                </tbody>
            </table>
        </div>
    );
};

export default Audit;
