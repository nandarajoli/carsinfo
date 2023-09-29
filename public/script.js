function fetchCarData() {
    const carName = document.getElementById('carName').value;
    const apiEndpoint = `https://api.api-ninjas.com/v1/cars?model=${carName}`;

    fetch(apiEndpoint, {
        headers: {
            'X-Api-Key': 'N9VPvFZNQfdaEXZc5vTZaQ==N3J1aqoeNttqynL0', // Replace with your API key
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            displayCarData(data);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayCarData(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (data.length === 0) {
        resultDiv.innerHTML = 'No data found for the specified car name.';
    } else {
        data.forEach((car) => {
            const carInfo = document.createElement('div');
            carInfo.innerHTML = `
                <h2>${car.model}</h2>
                <p>Make: ${car.make}</p>
                <p>Year: ${car.year}</p>
                <p>Drive: ${car.drive}</p>
                <p>Fuel Type: ${car.fuel_type}</p>
                <p>Class: ${car.class}</p>
                <p>Cylinders: ${car.cylinders}</p>
            `;
            resultDiv.appendChild(carInfo);
        });
    }
}
