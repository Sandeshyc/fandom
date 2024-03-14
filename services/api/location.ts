import axios from "axios";

const getLocation = async () => {
    const url = `https://geoip.kapamilya.com/api/location/get?api-version=1.0`; // Need to update
    let returnResponse = {
        status: '',
        ipAddress: '',
        countryName: '',
        countryIsoCode: '',
    };
    const headers = {
        "Content-Type": "application/json",
    };

    try { 
        const response = await axios.get(url, { headers });
        // console.log("Location Response: ", response);
        if (response?.status === 200) {
            returnResponse = {
                status: 'success',
                ipAddress: response?.data?.data?.ipAddress,
                countryName: response?.data?.data?.country?.name,
                countryIsoCode: response?.data?.data?.country?.isoCode,
            };
        }else {
            returnResponse = {
                status: 'error',
                ipAddress: '',
                countryName: '',
                countryIsoCode: '',
            };
        }   
    } catch (error) {
        returnResponse = {
            status: 'error',
            ipAddress: '',
            countryName: '',
            countryIsoCode: '',
        };
    }
    return returnResponse;
}

export default getLocation;