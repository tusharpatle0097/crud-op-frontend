import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './FormView.css'
const FormView = () => {


    const navigate = useNavigate()
    const params = useParams()
    const [viewData, setViewData] = useState()

    useEffect(() => {
        getDataById();
    }, [])

    const getDataById = () => {
        axios.get(`http://localhost:5000/${params._id}`)
            .then(res => {
                console.log(res.data)
                setViewData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <h2 className="text-center mb-4">View Form</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className='flex gap-5'>
                                    <span>First Name:</span>
                                    <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>{viewData ? viewData.fname : "Loading..."}</span>
                                </div>

                                <div className='flex gap-5 mt-3'>
                                    <span>Last Name:</span>
                                    <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>{viewData ? viewData.lname : "Loading..."}</span>
                                </div>

                                <div className='flex gap-5 mt-3'>
                                    <span>Age:</span>
                                    <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>{viewData ? viewData.age : "Loading..."}</span>
                                </div>

                                <div className='flex gap-5 mt-3'>
                                    <span>Email:</span>
                                    <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>{viewData ? viewData.email : "Loading..."}</span>
                                </div>

                                <div className='flex gap-5 mt-3'>
                                    <span>Address:</span>
                                    <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>{viewData ? viewData.address : "Loading..."}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='btn btn-success' onClick={() => navigate(-1)}>Back</button>
            </div>

        </>
    )
}

export default FormView