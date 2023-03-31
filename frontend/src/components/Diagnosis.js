import React, {useEffect, useState} from 'react';

import '../styles/Diagnosis.css';

const Diagnosis = ({client}) => {
    const [diagnosisTable, setDiagnosisTable] = useState([]);

    useEffect(() => {
        client.get(`/api/diagnosisuser`)
            .then(response => {
                setDiagnosisTable(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="table-container">
            {diagnosisTable.length > 0 && (
                <table>
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
