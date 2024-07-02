// Desc: Mask email address
export const MaskEmail = (email:string) => {
    if(!email) return '';
    const [username, domain] = email.split('@');
    let maskedUsername = '';
    console.log(username.length);
    if(username.length <= 3) {
        const charactersToMask = Math.max(Math.floor(username.length / 3), 1);

        const maskedUsername = `${'*'.repeat(charactersToMask)}${username.substring(charactersToMask)}`;
        
        return `${maskedUsername}@${domain}`;
    }else{
        maskedUsername = `${username.substring(0, 2)}***${username.substring(username.length - 2)}`;
        return `${maskedUsername}@${domain}`;
    }
}
  