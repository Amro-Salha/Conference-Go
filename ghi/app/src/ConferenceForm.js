import React, { useEffect, useState } from 'react';

function ConferenceForm( ) {
    const [locations, setLocations] = useState([])
    const initialState = {
        name: "",
        starts: "",
        ends: "",
        description: "",
        max_presentations: "",
        max_attendees: "",
        location: "",
    }
    const [formData, setFormData] = useState( initialState )

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
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

        const conferenceUrl = 'http://localhost:8000/api/conferences/'
        const fetchConfig =
        {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(conferenceUrl, fetchConfig)
        if (response.ok){
            const newConference = await response.json()
            setFormData( initialState )
        }

    }

  useEffect(() => {
    fetchData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.name} placeholder="Name" name="name" required type="text" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.starts} placeholder="Start Date" name="starts" required type="date" id="starts" className="form-control"/>
                <label htmlFor="starts">Start Date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.ends} placeholder="End Date" name="ends" required type="date" id="ends" className="form-control"/>
                <label htmlFor="ends">End Date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.max_presentations} placeholder="max_presentations" name="max_presentations" required type="number" id="max_presentations" className="form-control"/>
                <label htmlFor="max_presentations">Maximum Presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.max_attendees} placeholder="Maximum Attendees" name="max_attendees" required type="number" id="max_attendees" className="form-control"/>
                <label htmlFor="max_attendees">Maximum Attendees</label>
              </div>
              <div className="form-floating mb-3">
                <textarea onChange={handleFormChange} value={formData.description} placeholder="Description" name="description" required id="description" className="form-control"></textarea>
                <label htmlFor="description">description</label>
              </div>
              <div className="mb-3">
                <select onChange={handleFormChange} value={formData.location} required id="location" name="location" className="form-select">
                  <option value="">Choose a location</option>
                  {locations.map(location => {
                            return(
                                <option key={location.href} value={location.id}>
                                    {location.name}
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
export default ConferenceForm
