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


route.post('/location/:id', async (req, res) => {
    const { latitude, longitude } = req.body.location;
    const stableId = req.params.id?.replace(":", "");
    let ID = jwt.decode(stableId, key)
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${process.env.apiKey}`;
    
    try {
        const response = await axios.get(url);
        const address = response.data.results[0].formatted; // Get the formatted address
        const location = {
            address : address,
            latitude: latitude,
            longitude: longitude
        }
        console.log(location)
        await memberData.updateOne({_id : ID}, { location : location })
        res.status(200).json({ success: true, address });
    } catch (error) {
        console.error('Error fetching address:', error.message);
        res.status(500).json({ success: false, message: 'Unable to fetch address' });
    }
});

module.exports = route;