import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
import EditSpotter from './EditSpotter';

const Home = () => {
    const [spotters, setSpotters] = useState([])
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSearchKeyword = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSearchKeywordChange = (e: any) => {
        setSearchKeyword(e.target.value);
    }

    const callApiAndFetchData = (url: string, parameter: string, method: string) => {
        try {
            fetch(url + parameter, {
                method: method
            }).then(response => {
                return response.json()
            }).then(data => {
                setSpotters(data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleSearch = () => {
        callApiAndFetchData("http://localhost:5079/getAllAircraftSpotters?searchKeyword=", searchKeyword, "GET");
    }

    useEffect(() => {
        handleSearch()
    }, [])

    const handleDelete = (e: any, recordId: any) => {
        callApiAndFetchData("http://localhost:5079/deleteAircraftSpotter?id=", recordId, "POST");
    }

    return (
        <div>
            <h1>Available spotter list</h1>
            <div style={{ marginBottom: '10px', width: '600px' }}>
                <input type="text" className={'form-control'} placeholder="Search by Make, Model or Ragistration" onChange={e => handleSearchKeywordChange(e)} onKeyDown={e => handleSearchKeyword(e)}></input>
            </div>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Registration</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        spotters.map((spotter: any) => {
                            debugger;
                            var url = "/editSpotter/" + spotter.recordId;
                            return (<tr key={spotter.recordId}>
                                <td>{spotter.make}</td>
                                <td>{spotter.model}</td>
                                <td>{spotter.registration}</td>
                                <td>{spotter.location}</td>
                                <td>{spotter.spottedDate}</td>
                                <td><Link to={url}>Edit</Link></td>
                                <td><a href="#" onClick={event => handleDelete(event, spotter.recordId)}>Remove</a></td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div>
                <div>
                    <Link to="/newSpotter" className="btn btn-primary">Add New Spotter</Link>
                </div>
            </div>
        </div >
    );

}


export default connect()(Home);
