window.addEventListener('DOMContentLoaded', async () => {
    // const url = 'http://localhost:8000/api/conferences/'
    // const response = await fetch(url)
    // if (response.ok){
    //     const data = await response.json()

    //     const conferences = data.conferences
    //     const conferenceSelect = document.querySelector('#conference')

    //     for(let conference of conferences){
    //         const option = document.createElement('option')
    //         option.value = conference.href
    //         option.innerHTML = conference.name
    //         conferenceSelect.appendChild(option)
    //     }
    // }
    const formTag = document.getElementById('create-attendee-form')
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault()
        const formData = new FormData(formTag)
        const json = JSON.stringify(Object.fromEntries(formData))
        console.log(json)

        const attendeeUrl = 'http://localhost:8001/api/attendees/'
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'applications/json',
            },
        }
        const response = await fetch(attendeeUrl,fetchConfig)
        if (response.ok){
            formTag.reset()
            const newAttendee = await response.json()
            console.log(newAttendee)
        }
        formTag.classList.add('d-none')
        const successTag = document.getElementById('success-message')
        successTag.classList.remove("d-none")
    })
})
