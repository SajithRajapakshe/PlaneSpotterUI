﻿import * as React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from "react";

const EditSpotter = (props: any) => {
    debugger;
    var id = props.match.params.recordId;


    const fetchData = () => {
        fetch("http://localhost:5079/getAircraftSpotterById?id=" + id).
            then(response => {
                return response.json()
            }).then(data => {
                debugger;
                setFormData(data);
            })
    }

    const setFormData = (data: any) => {
        setMake(data.make);
        setModel(data.model);
        setRegistrationNumber(data.registration);
        setLocation(data.location);
        setSpottedDate(data.spottedDate);
    }

    useEffect(() => {
        fetchData()
    }, [])

    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [location, setLocation] = useState("");
    const [spottedDate, setSpottedDate] = useState("");

    const [message, setMessage] = useState("");

    const [imageFile, setImageFile] = useState("");
    const [imageName, setImageName] = useState("");

    const handleImage = (e: any) => {
        setImageFile(e.target.files[0]);
        setImageName(e.target.files[0].name);
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let formData = createFormData();

        try {
            let res = await fetch("http://localhost:5079/updateAircraftSpotter", {
                method: "POST",
                body: formData
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setMake("");
                setModel("");
                setMessage("Record saved successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const createFormData = () => {

        let formData = new FormData();
        formData.append("RecordId", id);
        formData.append("Make", make);
        formData.append("Model", model);
        formData.append("Registration", registrationNumber);
        formData.append("Location", location);
        formData.append("SpottedDate", spottedDate);
        formData.append("FormFile", imageFile);
        formData.append("FilePath", imageName);

        return formData;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Record</h1>
            <div className={'row'}>
                <div className={'column'}>
                    <div className={'form-group'}>
                        <div className={'row'} style={{ marginTop: "10px" }} >
                            <div style={{ marginRight: "300px", marginLeft: "20px" }}>
                                <span >
                                    Make
                                </span>
                            </div>
                            <div>
                                <input type="text" value={make} onChange={(e) => setMake(e.target.value)} className={'form-control'}></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "294px", marginLeft: "20px" }}>
                                <span>
                                    Model
                                </span>
                            </div>
                            <div>
                                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className={'form-control'}></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "254px", marginLeft: "20px" }}>
                                <span>
                                    Registration
                                </span>
                            </div>
                            <div>
                                <input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} className={'form-control'}></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "272px", marginLeft: "20px" }}>
                                <span>
                                    Loacation
                                </span>
                            </div>
                            <div>
                                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={'form-control'}></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "236px", marginLeft: "20px" }}>
                                <span>
                                    Date and Time
                                </span>
                            </div>
                            <div>
                                <input type="datetime-local" value={spottedDate} onChange={(e) => setSpottedDate(e.target.value)} className={'form-control'}></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "296px", marginLeft: "20px" }}>
                                <span>
                                    Image
                                </span>
                            </div>
                            <div>
                                <input type="file" onChange={handleImage}></input>
                            </div>

                        </div>
                        <div style={{ marginTop: "50px" }}>
                            <div>
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Edit Spotter
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={'column'} style={{ marginLeft: "80px" }}>
                    <img style={{ width: '300px', height: '300px' }} src={imageName}></img>
                </div>
            </div>

            <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
    );
}

export default connect()(EditSpotter);