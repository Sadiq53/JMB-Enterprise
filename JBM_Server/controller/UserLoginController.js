const route = require('express').Router();
const memberData = require('../model/addMemberSchema');
const axios = require('axios')
const jwt = require('jsonwebtoken')
require('dotenv').config(); 


const key = 'User Authentication'

route.post('/', async(req, res) => {
    const { username, password } = req.body;
    // console.log(req.body)
    const findAccount = await memberData.findOne({member_email : username});
    // console.log(findAccount)
    if(findAccount) {
        if(findAccount?.password === password) {
            const token = { id : findAccount?._id }
            const ID = jwt.sign(token?.id.toString(), key)
            // console.log(ID)
            res.status(200).set('Content-Type', 'text/plain').send({status : 200, token : ID});
        }
    } else {
        res.status(400).set('Content-Type', 'text/plain').send({status : 400});
    }
})

route.get('/:id', async(req, res) => {
    const stableId = req.params.id?.replace(":", "");
    // console.log(stableId)
        let ID = jwt.decode(stableId, key)
        // console.log(ID)
        let userData = await memberData.find({_id : ID})
        if(userData?.length != 0){
            res.status(200).set('Content-Type', 'text/plain').send({status : 200, result : userData[0]})
        }else{
            res.status(400).set('Content-Type', 'text/plain').send({status : 403})
        }
    
})


route.post('/location', async (req, res) => {
    try {
        const { location } = req.body;
        console.log("Received location:", location);

        // Destructure latitude and longitude from location
        const { latitude, longitude } = location;

        // Ensure valid latitude and longitude are provided
        if (!latitude || !longitude) {
            return res.status(400).json({ success: false, message: "Latitude and longitude are required." });
        }

        // Call Google Maps Geocoding API
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_API_KEY}`;
        const response = await axios.get(apiUrl);

        if (response.data.status === "OK" && response.data.results.length > 0) {
            // Extract formatted address from the first result
            const formattedAddress = response.data.results[0].formatted_address;

            console.log("Formatted Address:", formattedAddress);

            // Return the formatted address to the client
            return res.status(200).json({
                success: true,
                address: formattedAddress,
            });
        } else {
            console.error("Error from Google API:", response.data.error_message || response.data.status);
            return res.status(500).json({
                success: false,
                message: response.data.error_message || "Unable to fetch address. Please try again later.",
            });
        }
    } catch (error) {
        console.error("Error while reverse geocoding:", error);
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred while processing your request.",
        });
    }
});

module.exports = route;