const axios = require('axios')
const latitude = 22.6859852
const longitude = 75.8595487
const GOOGLE_API_KEY = 'AIzaSyBYU1yH-q0KTwN0N_Aoi6ZtrA9M42frTsI'

const fetch = async() => {
    // Call Google Maps Geocoding API
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
const response = await axios.get(apiUrl);
console.log(response.data.status)
if (response.data.status === "OK" && response.data.results.length > 0) {
    // Extract formatted address from the first result
    const formattedAddress = response.data.results[0].formatted_address;

    console.log("Formatted Address:", formattedAddress)}
}

fetch()