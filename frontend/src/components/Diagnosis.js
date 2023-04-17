import React, {useEffect, useState} from 'react';

import {useAuth} from "../hook/useAuth";
import '../styles/Diagnosis.css';

const Diagnosis = () => {
    const [diagnosisTable, setDiagnosisTable] = useState([]);
    const {client} = useAuth();

    useEffect(() => {
        client.get(`/api/diagnosisuser`)
            .then(response => {
                setDiagnosisTable(response.data);
            });
    }, []);

    return (
        <div className="table-container">
            {diagnosisTable.length > 0 && (
                <table className='table-diagnosis'>
                    <thead>
                    <tr>
                        {Object.keys(diagnosisTable[0]).map((item) => {
                            return (<th>{item}</th>)
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {diagnosisTable.map((item) => {
                        return (
                            <tr>
                                {Object.keys(item).map((key) => {
                                    return (
                                        <th>
                                            {item[key]}
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Diagnosis;
