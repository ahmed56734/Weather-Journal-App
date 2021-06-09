/* Global Variables */
const API_KEY = "A81kaskkajd18913asdkkasdd1j31iuja132"






const postRequest = async (url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            "Authorization": API_KEY
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const getRequest = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            "Authorization": API_KEY
        },
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

async function getAllData() {
    const response = await getRequest("api/weather")
    updateUI(response.data)
}

async function addWeatherEntry(body) {
    const response = await postRequest("api/weather", body)
    updateUI(response.data)
}

function updateUI(data) {
    console.log(data)
    if (data.length === 0) {
        return
    }

    const lastEntry = data[data.length - 1]

    console.log(lastEntry)

    const entryHolderElement = document.getElementById("entryHolder")
    const dateElement = document.getElementById("date")
    const tempElement = document.getElementById("temp")
    const contentElement = document.getElementById("content")

    dateElement.textContent = lastEntry.date
    tempElement.textContent = lastEntry.temp
    contentElement.textContent = lastEntry.content
}


function main() {
    getAllData()

    document.getElementById("generate").onclick = ev => {
        const zip = document.getElementById("zip").value
        const feeling = document.getElementById("feelings").value
        document.getElementById("zip").value = ""
        document.getElementById("feelings").value = ""

        const requestBody = {zipCode: zip, content: feeling}
        addWeatherEntry(requestBody)
    }
}