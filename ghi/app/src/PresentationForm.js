import React, { useEffect, useState } from 'react';

function PresentationForm( ) {
    const [conferences, setConferences] = useState([])
    const initialState = {
        presenter_name: "",
        company_name: "",
        presenter_email: "",
        title: "",
        synopsis: "",
        conference: "",
    }
    const [formData, setFormData] = useState( initialState )

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences)
        }
    }

    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    if (conferences.length > 0) {
        spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
        dropdownClasses = 'form-select';
    }

    const handleFormChange = (event) =>{
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        const selectTag = document.getElementById('conference');
        const conferenceId = selectTag.options[selectTag.selectedIndex].value;
        const presentationUrl = `http://localhost:8000${conferenceId}presentations/`
        console.log(presentationUrl)
        const fetchConfig =
        {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(presentationUrl, fetchConfig)
        if (response.ok){
            const newPresentation = await response.json()
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
                    <h1>Create a new presentation</h1>
                    <form onSubmit={handleSubmit} id="create-presentation-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.presenter_name} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control"/>
                        <label htmlFor="presenter_name">Presenter name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.presenter_email} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control"/>
                        <label htmlFor="presenter_email">Presenter email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.company_name} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control"/>
                        <label htmlFor="company_name">Company name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.title} placeholder="Title" required type="text" name="title" id="title" className="form-control"/>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="synopsis">Synopsis</label>
                        <textarea onChange={handleFormChange} value={formData.synopsis} id="synopsis" rows="3" name="synopsis" className="form-control"></textarea>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleFormChange} value={formData.conference} required name="conference" id="conference" className="form-select">
                        <option value="">Choose a conference</option>
                        {conferences.map(conference => {
                            return(
                                <option key={conference.href} value={conference.href}>
                                    {conference.name}
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
export default PresentationForm
