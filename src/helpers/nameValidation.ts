export const validateName = (name: string=''): Boolean => {
    // To check a password between 7 to 16 characters which 
    // contains only characters, numeric digits, underscore and first character must be a letter
    const nameRegex =  /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    return nameRegex.test(name);
}