import React, {useEffect, useState} from 'react';

import '../styles/Audit.css';
import {useAuth} from "../hook/useAuth";

const Audit = () => {
    const [auditTable, setAuditTable] = useState([]);
    const {client} = useAuth();

    useEffect(() => {
        client.get(`/api/adminaudit`)
            .then(response => {
                setAuditTable(response.data);
            });
    }, []);

    return (
        <div className="table-container">
            {auditTable.length > 0 && (
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
            )}
        </div>
    );
};

export default Audit;
