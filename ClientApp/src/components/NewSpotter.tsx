import * as React from 'react';
import { connect } from 'react-redux';
import { useState } from "react";

const NewSpotter = () => {

    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [location, setLocation] = useState("");
    const [spottedDate, setSpottedDate] = useState("");

    const [message, setMessage] = useState("");

    const [imageFile, setImageFile] = useState("");
    const [imageName, setImageName] = useState("");

    const [cssClassMessage, setCssClassMessage] = useState("");


    const handleImage = (e: any) => {
        setImageFile(e.target.files[0]);
        setImageName(e.target.files[0].name);
    }


    let handleSubmit = async (e: any) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append("Make", make);
        formData.append("Model", model);
        formData.append("Registration", registrationNumber);
        formData.append("Location", location);
        formData.append("SpottedDate", spottedDate);
        formData.append("FormFile", imageFile);
        formData.append("FilePath", imageName);

        try {
            let res = await fetch("http://localhost:5079/createNewSpotter", {
                method: "POST",
                body: formData,
                mode: 'cors',
                headers: { 'XApiKey': 'usrKEYvaladm@pLSp2023' }
            });
            if (res.status === 200) {
                setCssClassMessage('message alert alert-success');
                setMessage("Record saved successfully");
            } else {
                setCssClassMessage('message alert alert-danger');
                setMessage("Some error occured, Please validate your inputs and retry");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add New Record</h1>
            <div className={'row'}>
                <div className={'column'}>
                    <div className={'form-group'}>
                        <div className={'row'} style={{ marginTop: "10px" }} >
                            <div style={{ marginRight: "300px", marginLeft: "20px" }} className={'column'}>
                                <span >
                                    Make
                                </span>
                            </div>
                            <div className={'column'}>
                                <input type="text" value={make} onChange={(e) => setMake(e.target.value)} className={'form-control'}></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "293px", marginLeft: "20px" }} className={'column'}>
                                <span>
                                    Model
                                </span>
                            </div>
                            <div className={'column'}>
                                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className={'form-control'}></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "253px", marginLeft: "20px" }} className={'column'}>
                                <span>
                                    Registration
                                </span>
                            </div>
                            <div className={'column'}>
                                <input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} className={'form-control'}></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "271px", marginLeft: "20px" }} className={'column'}>
                                <span>
                                    Loacation
                                </span>
                            </div>
                            <div className={'column'}>
                                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={'form-control'}></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "236px", marginLeft: "20px" }} className={'column'}>
                                <span>
                                    Date and Time
                                </span>
                            </div>
                            <div className={'column'}>
                                <input type="datetime-local" value={spottedDate} onChange={(e) => setSpottedDate(e.target.value)} className={'form-control'}></input>
                            </div>
                        </div>
                        <div className={'row'} style={{ marginTop: "10px" }}>
                            <div style={{ marginRight: "295px", marginLeft: "20px" }} className={'column'}>
                                <span>
                                    Image
                                </span>
                            </div>
                            <div className={'column'}>
                                <input type="file" onChange={handleImage}></input>
                            </div>

                        </div>
                        <div style={{ marginTop: "50px" }}>
                            <div>
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Add Spotter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cssClassMessage} >{message ? <p>{message}</p> : null}</div>
        </form>
    );
}

export default connect()(NewSpotter);
