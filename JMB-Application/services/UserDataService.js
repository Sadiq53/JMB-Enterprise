import { API_URL } from '../util/API_URL'



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

const handleGetUserData = async(id) =>{
    const response = await fetch(`${API_URL}/login/:${id}`, {
        method : "GET"
    })
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    // console.log(data)
    return data?.result
}

export {handleGetData, handleGetUserData}