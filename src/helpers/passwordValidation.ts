export const validatePassword = (password: string=''): Boolean => {
    // To check a password between 7 to 16 characters which 
    // contains only characters, numeric digits, underscore and first character must be a letter
    const passwordRegex =  /^[A-Za-z]\w{7,14}$/;
    return passwordRegex.test(password);
}