import { API_URL } from '../util/API_URL'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'



const handleGetData = async() =>{
    const response = await fetch(`${API_URL}/data`, {
        method: "GET"
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    let filteredData = await data?.filedata;
    return filteredData;
}

const handleGetUserData = async() =>{
    const ID = await AsyncStorage.getItem('UserToken');
    const response = await fetch(`${API_URL}/login/:${ID}`, {
        method : "GET"
    })
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    // console.log(data)
    return data?.result
}

const handlePostLocation = async(location) => {
    const ID = await AsyncStorage.getItem('UserToken');
    const response = await axios.post(`${API_URL}/login/location/${ID}`, { location });
    return response.data
}

export {handleGetData, handlePostLocation, handleGetUserData}