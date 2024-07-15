import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminFormViewData.css';

const AdminFormViewData = () => {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { formId } = useParams();

    useEffect(() => {
        fetchData();
    }, [formId]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/api/v1/promoter/fetchFormFilledData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formId }),
            });

            const result = await response.json();
            if (response.ok) {
                setFormData(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const renderTableHeaders = () => {
        if (formData.length === 0) return null;
        const keys = Object.keys(formData[0]);
        const filteredKeys = keys.filter(key => key !== '_id');
        return filteredKeys.map((key) => <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>);
    };

    const renderTableRows = () => {
        return formData.map((item) => (
            <tr key={item._id}>
                {Object.keys(item)
                    .filter(key => key !== '_id')
                    .map((key) => (
                        <td key={key}>
                            {key === 'acceptedData' ? (item[key] ? 'True' : 'False') : 
                                // Render image if key ends with "Image" and value is a URL
                                (key.endsWith('Image') && isURL(item[key])) ? 
                                    <img src={item[key]} alt={key} style={{ maxWidth: '100px', maxHeight: '100px' }} /> : 
                                    item[key]}
                        </td>
                    ))}
            </tr>
        ));
    };

    const isURL = (value) => {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    };

    const exportToExcel = () => {
        const fileName = 'formData.csv';
        const csv = convertToCSV(formData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, fileName);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };

    const convertToCSV = (data) => {
        const keys = Object.keys(data[0]);
        const header = keys.filter(key => key !== '_id').map(key => key.charAt(0).toUpperCase() + key.slice(1)).join(',');
        const rows = data.map(row => {
            return keys.filter(key => key !== '_id').map(key => {
                let cell = row[key] === null || row[key] === undefined ? '' : row[key];
                if (key === 'acceptedData') {
                    cell = row[key] ? 'True' : 'False';
                }
                cell = cell.toString().replace(/"/g, '""');
                if (cell.search(/("|,|\n)/g) >= 0) {
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(',');
        });
        return `${header}\n${rows.join('\n')}`;
    };

    return (
        <div className="form-view-data">
            <div className="form-view-title-container">
                <PageTitle title="View Data" />
            </div>
            <div className="form-view-data-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <React.Fragment>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        {renderTableHeaders()}
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableRows()}
                                </tbody>
                            </table>
                        </div>
                        <div className="buttons">
                            <button onClick={exportToExcel} className="refresh-button">Export to Excel</button>
                            <button onClick={fetchData} className="refresh-button">Refresh</button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default AdminFormViewData;
