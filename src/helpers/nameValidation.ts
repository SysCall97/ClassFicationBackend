export const validateName = (name: string=''): Boolean => {
    const nameRegex =  /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    return nameRegex.test(name);
}