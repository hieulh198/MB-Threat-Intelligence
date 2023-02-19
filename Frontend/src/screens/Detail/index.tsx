import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import isEmpty from 'lodash';

const Detail = () => {
    const [data, setData] = useState<any>({});
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const searchHash = queryParams.get('hash') || ''
    const serverUrl = process.env.REACT_APP_SERVER_URL

    useEffect(() => {
        axios.get(`${serverUrl}/bazaar/getDetail?hash=${searchHash}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
                setData({})
            })
    }, []);

    const handleExportFile = () => {
        axios.get(`${serverUrl}/bazaar/export?hash=${searchHash}`)
            .then(response => {
                if (response.data) {
                    window.location.href = `${serverUrl}/bazaar/download?filename=${searchHash}.xlsx`
                } else {
                    console.log("error")
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return <>
        <div className='d-flex mb-3 justify-content-between'>
            <div className="">
                <h3>Information</h3>
            </div>
            <div className='d-flex align-items-center'>
                <button type="button" className="btn btn-sm btn-outline-success" onClick={handleExportFile}>Export File</button>
            </div>
        </div>
        {isEmpty(data) ?
            (
                <table className='table table-striped table-hover table-bordered'>
                    <tbody>
                        {
                            Object.keys(data).map((item: any) => {
                                return (typeof data[item] != 'object' ? <tr key={item}>
                                    <td>{item}</td>
                                    <td>{data[item]}</td>
                                </tr> : <tr key={item}>
                                    <td>{item}</td>
                                    <td>{JSON.stringify(data[item])}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            ) : <>There is no data</>}
    </>;
};

export default Detail;
