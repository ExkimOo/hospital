import React from 'react';

import '../styles/Audit.css';

function Audit() {
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
                        <th>Date Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
    );
};

export default Audit;
