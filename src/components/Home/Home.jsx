import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
const Home = () => {

    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            fname,
            lname,
            email,
            address,
            age
        };

        axios.post('http://localhost:5000/', data)
            .then(res => {
                console.log(res);
                setFName('');
                setLName('');
                setEmail('');
                setAddress('');
                setAge('');
                getData();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 400) {
                    const errorMessage = err.response.data.error;
                    if (errorMessage === "Email already exists") {
                        toast.error('Email already exists!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    } else {
                        toast.error('All fields are mandatory!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                } else {
                    toast.error('An error occurred. Please try again later.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            });
    };


    const getData = () => {
        axios.get('http://localhost:5000/')
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleDalete = (id) => {
        axios.delete(`http://localhost:5000/${id}`)
            .then(res => {
                console.log(res)
                getData();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Deleted Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <ToastContainer />
            <div className='heading'>Crud operation Created using, Node.js, React.js, Express, MongoDB and Bootstrap</div>
            <h4 className='deve-Name'>Developed By, <span className='name'>Tushar</span></h4>
            <div className="container">
                <div className="form-container">
                    <h2 className="text-center mb-4">Registration Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name: <span className='star'>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        value={fname}
                                        onChange={(e) => setFName(e.target.value)}
                                        placeholder="Enter First Name"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name: <span className='star'>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        value={lname}
                                        onChange={(e) => setLName(e.target.value)}
                                        placeholder="Enter Last Name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email">Email: <span className='star'>*</span></label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Email"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="age">Age: <span className='star'>*</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        placeholder="Enter Age"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="address">Address: <span className='star'>*</span></label>
                            <textarea
                                className="form-control"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows="3"
                                placeholder="Enter Address"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">Submit</button>
                    </form>
                </div>
            </div>
            <div className="container mt-2">
                <h2 className='text-center'> Table</h2>
                <table className="table table-striped table-hover very-attractive-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {
                        data ? data.map((items, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index}</td>
                                        <td>{items.fname}</td>
                                        <td>{items.lname}</td>
                                        <td>{items.age}</td>
                                        <td>{items.email}</td>
                                        <td>{items.address}</td>
                                        <td>
                                            <div className='d-flex gap-3'>
                                                <Link to={'viewData/' + (items._id)}> <button className='btn btn-primary'>View</button></Link>
                                                <Link to={'formUpdate/' + (items._id)}><button className='btn btn-warning'>Update</button></Link>
                                                <button onClick={() => handleDalete(items._id)} className='btn btn-danger'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }) : "Loading..."
                    }

                </table>
            </div>
        </div>
    )
}

export default Home