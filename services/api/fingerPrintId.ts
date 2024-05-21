import FingerprintJS from '@fingerprintjs/fingerprintjs';
const getFingerPrintId = async () => {
    let returnResponse = {
        status: 'success',
        fingerPrintId: 'Unknown'
    };
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    if(visitorId){
        returnResponse.fingerPrintId = visitorId;
    }
    
    return returnResponse;
}

export default getFingerPrintId;