import { useState, useEffect, useCallback } from 'react';

const useRecaptchaV3 = (siteKey:string) => {
    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const window = globalThis as any;

    useEffect(() => {
        console.log('useRecaptchaV3');
        if (window.grecaptcha) {
            setIsRecaptchaReady(true);
            console.log('grecaptcha is already loaded');
        } else {
            console.log('grecaptcha is not loaded');
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            script.async = true;
            document.head.appendChild(script);
            script.onload = () => setIsRecaptchaReady(true);
            console.log('grecaptcha is loading');
        }
    }, [siteKey]);

    const executeRecaptcha = useCallback(async (action:string) => {
        console.log('executeRecaptcha');
        if (isRecaptchaReady && window.grecaptcha) {
            console.log('executeRecaptcha is ready');
            return await window.grecaptcha.execute(siteKey, { action });
        }
        return null;
    }, [isRecaptchaReady, siteKey]);

    return executeRecaptcha;
};

export default useRecaptchaV3;