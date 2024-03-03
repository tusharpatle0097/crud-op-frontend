import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';


const FormUpdate = () => {

  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');

  const params = useParams();
  const _id = useParams();
  const navigate = useNavigate()
  console.log(params._id, 'jh')

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

    if (fname === "" || fname === null || lname === "" || lname === null || email === "" || email === null || address === "" || address === null || age === "" || age === null) {
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
      return;
    }

    axios.patch(`http://localhost:5000/${_id._id}`, data)
      .then(res => {
        console.log(res);
        getData();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Upadated Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(-1)
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
        }
      });
  };


  const getData = () => {
    axios.get(`http://localhost:5000/${params._id}`)
      .then((res) => {
        console.log(res.data);
        setFName(res.data.fname)
        setLName(res.data.lname)
        setEmail(res.data.email)
        setAge(res.data.age)
        setAddress(res.data.address)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <div className="form-container">
          <h2 className="text-center mb-4">Update Form</h2>
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
            <div className='d-flex gap-5'>
              <button type="submit" className="btn btn-primary btn-block mt-3">Update</button>
            </div>
          </form>
          <button className='btn btn-success mt-3' onClick={() => navigate(-1)}>Back</button>

        </div>
      </div>
    </div>
  )
}

export default FormUpdate