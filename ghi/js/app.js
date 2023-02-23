function createCard(title, description, pictureUrl, start, end, location){
    return `
    <div class="card" id="mycard">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
            <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
        <p>${start} - ${end}</p>
        </div>
    </div>`
}

function alertError(){
    return`
    <div class="alert alert-danger" role="alert">
        Error retrieving data; try again later
    </div>`
}



window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/'
    try {
        const response = await fetch(url)

        if (!response.ok){
            const container = document.querySelector('.container')
            container.innerHTML = alertError()
            throw new Error('Response not ok')
        }else {
            const data = await response.json()
            let colIndex = 1
            for (let conference of data.conferences){
                const detailURL = `http://localhost:8000${conference.href}`
                const detailResponse = await fetch(detailURL) //get raw data
                if (detailResponse.ok){
                    const details = await detailResponse.json() //turn json data to dict
                    const title = details.conference.name
                    const description = details.conference.description
                    const pictureUrl = details.conference.location.picture_url
                    let start = details.conference.starts
                    const startDate = new Date(start)
                    const formattedStartDate = new Intl.DateTimeFormat('en-US').format(startDate)
                    start = formattedStartDate

                    let end = details.conference.ends
                    const endDate = new Date(end)
                    const formattedEndDate = new Intl.DateTimeFormat('en-US').format(endDate)
                    end = formattedEndDate

                    const location = details.conference.location.name


                    const html = createCard(title, description, pictureUrl, start, end, location)


                    const colu = document.getElementById(`col${colIndex}`)
                    colu.innerHTML += html
                    colIndex = (colIndex % 3) + 1
                }
            }
        }

    }catch (error){
        const container = document.querySelector('.container')
        container.innerHTML = alertError()
        console.error('error', error)
    }
});
