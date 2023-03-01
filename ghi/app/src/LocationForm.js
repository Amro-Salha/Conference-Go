import React, { useEffect, useState } from 'react';

function LocationForm( ) {
    const [states, setStates] = useState([])
    const initialState = {
        name: "",
        city: "",
        room_count: "",
        state: "",
    }
    const [formData, setFormData] = useState( initialState )

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/states/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setStates(data.states)
        }
    }

    const handleFormChange = (event) =>{
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()

        const locationUrl = 'http://localhost:8000/api/locations/'
        const fetchConfig =
        {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(locationUrl, fetchConfig)
        if (response.ok){
            const newLocation = await response.json()
            console.log(newLocation)

            setFormData( initialState )


        }

    }

  useEffect(() => {
    fetchData();
    }, []);

    console.log(formData)

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new location</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.name} placeholder="Name" name="name" required type="text" id="name" className="form-control"/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.room_count} placeholder="Room count" name="room_count" required type="number" id="room_count" className="form-control"/>
                        <label htmlFor="room_count">Room count</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.city} placeholder="City" name="city" required type="text" id="city" className="form-control"/>
                        <label htmlFor="city">City</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleFormChange} value={formData.state} required id="state" name="state" className="form-select">
                        <option value="">Choose a state</option>
                        {states.map(state => {
                            return(
                                <option key={state.abbreviation} value={state.abbreviation}>
                                    {state.name}
                                </option>
                            )
                        })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LocationForm
