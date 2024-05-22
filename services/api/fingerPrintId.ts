import FingerprintJS from '@fingerprintjs/fingerprintjs';
const getFingerPrintId = async () => {
    let returnResponse = {
        status: 'success',
        fingerPrintId: 'Unknown',
    };
    if(window.localStorage.getItem('fingerPrintId')){
        returnResponse.fingerPrintId = window.localStorage.getItem('fingerPrintId') || 'Unknown';
        return returnResponse;
    }
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    if(visitorId){
        returnResponse.fingerPrintId = visitorId;
        // set local storage for future use
        window.localStorage.setItem('fingerPrintId', visitorId);
    }    
    return returnResponse;
}

export default getFingerPrintId;