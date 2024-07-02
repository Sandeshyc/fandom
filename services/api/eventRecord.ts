import axios from "axios";
const setEventRecord = async (eventData:any) => {
    const url = `https://glyn77gnk0.execute-api.ap-southeast-1.amazonaws.com/qa`;
    let returnResponse = {
        status: '',
        data: {} as any,
    };
    const headers = {
        "Content-Type": "application/json",
    };
    
    const body = {
        "Entries": [ 
            {
                "Source": "psr-ui-qa",
                "DetailType": "detailType",
                "Detail": JSON.stringify(eventData),
                "EventBusName": "arn:aws:events:ap-southeast-1:292561729369:event-bus/psr-ui-events-bus-qa"
            }
        ]
    };
    console.log("Event Record Body: ", body);
    try { 
        const response = await axios.post(url, body, { headers });
        console.log("Event Record Response: ", response);
        if (response?.status === 200) {
            returnResponse = {
                status: 'success',
                data: response?.data,
            };
        }else {
            returnResponse = {
                status: 'error',
                data: {},
            };
        }   
    } catch (error) {
        console.log("Event Record Error: ", error);
        returnResponse = {
            status: 'error',
            data: {},
        };
    }
    return returnResponse;
}

export default setEventRecord;