import * as React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from "react";

const ViewSpotter = (props: any) => {
    var id = props.match.params.recordId;

    const fetchData = () => {
        fetch("http://localhost:5079/getAircraftSpotterById?id=" + id, {
            mode: 'cors',
            headers: { 'XApiKey': 'usrKEYvaladm@pLSp2023' }
        }).then(response => {
            return response.json()
        }).then(data => {
            setFormData(data);
        })
    }

    const setFormData = (data: any) => {
        setMake(data.make);
        setModel(data.model);
        setRegistrationNumber(data.registration);
        setLocation(data.location);
        setSpottedDate(data.spottedDate);
        setImageName(data.filePath);
    }

    useEffect(() => {
        fetchData()
    }, [])

    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [location, setLocation] = useState("");
    const [spottedDate, setSpottedDate] = useState("");

    const [imageName, setImageName] = useState("");
    

    return (
        <form >
            <h1>Spotter Record</h1>
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
                                <input
                                    type="text"
                                    value={make}
                                    className={'form-control disabled'}
                                ></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "294px", marginLeft: "20px" }}>
                                <span>
                                    Model
                                </span>
                            </div>
                            <div>
                                <input type="text"
                                    value={model}
                                    className={'form-control disabled'}>
                                </input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "254px", marginLeft: "20px" }}>
                                <span>
                                    Registration
                                </span>
                            </div>
                            <div>
                                <input type="text" value={registrationNumber}
                                    className={'form-control disabled'}>
                                </input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "272px", marginLeft: "20px" }}>
                                <span>
                                    Loacation
                                </span>
                            </div>
                            <div>
                                <input type="text" value={location}
                                    className={'form-control disabled'}>
                                </input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "236px", marginLeft: "20px" }}>
                                <span>
                                    Date and Time
                                </span>
                            </div>
                            <div>
                                <input type="datetime-local" value={spottedDate}
                                    className={'form-control disabled'}>
                                </input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'column'} style={{ marginLeft: "80px" }}>
                    <img style={{ width: '300px', height: '300px' }} src={`data:image/gif;base64,${imageName}`}></img>
                </div>
            </div>
        </form>
    );
}

export default connect()(ViewSpotter);
