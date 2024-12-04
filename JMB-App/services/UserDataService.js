import { API_URL } from '../util/API_URL'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'



// const handleGetData = async() =>{
//     const response = await fetch(`${API_URL}/data`, {
//         method: "GET"
//     });
//     if (!response.ok) {
//         throw new Error('Failed to fetch data');
//     }
//     const data = await response.json();
//     let filteredData = await data?.filedata;
//     return filteredData;
// }

const handleGetData = async () => {
    try {
      const response = await fetch(`${API_URL}/data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const data = await response.json();
      return data?.filedata;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw to handle further up if needed
    }
  };
  

// const handleGetUserData = async() =>{
//     const ID = await AsyncStorage.getItem('UserToken');
//     const response = await fetch(`${API_URL}/login/:${ID}`, {
//         method : "GET"
//     })
//     if (!response.ok) {
//         throw new Error('Failed to fetch data');
//     }
//     const data = await response.json();
//     // console.log(data)
//     return data?.result
// }

    const handleGetUserData = async () => {
        try {
        const ID = await AsyncStorage.getItem("UserToken");
        if (!ID) throw new Error("UserToken not found in AsyncStorage");
    
        const response = await fetch(`${API_URL}/login/${ID}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });
    
        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.status}`);
        }
    
        const data = await response.json();
        return data?.result;
        } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
        }
    };
  


// const handlePostLocation = async(location) => {
//     const ID = await AsyncStorage.getItem('UserToken');
//     const response = await axios.post(`${API_URL}/login/location/${ID}`, { location });
//     return response.data
// }

    const handlePostLocation = async (location) => {
        try {
        const ID = await AsyncStorage.getItem("UserToken");
        if (!ID) throw new Error("UserToken not found in AsyncStorage");
    
        const response = await axios.post(
            `${API_URL}/login/location/${ID}`,
            { location },
            {
            headers: {
                "Content-Type": "application/json",
            },
            }
        );
        return response.data;
        } catch (error) {
        console.error("Error posting location:", error.response?.data || error.message);
        throw error;
        }
    };
  


// const handleLogout = async(location) => {
//     const ID = await AsyncStorage.getItem('UserToken');
//     const response = await axios.put(`${API_URL}/login/${ID}`);
//     return response.data
// }

    const handleLogout = async () => {
        try {
        const ID = await AsyncStorage.getItem("UserToken");
        if (!ID) throw new Error("UserToken not found in AsyncStorage");
    
        const response = await axios.put(`${API_URL}/login/${ID}`, null, {
            headers: {
            "Content-Type": "application/json",
            },
        });
    
        return response.data;
        } catch (error) {
        console.error("Error during logout:", error.response?.data || error.message);
        throw error;
        }
    };


export {handleGetData, handlePostLocation, handleLogout, handleGetUserData}