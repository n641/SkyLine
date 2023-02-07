const apiKey = '950040a0433c4b34aa8f389917b2d457&email=noha67357@gmail.com';
const apiURL = 'https://emailvalidation.abstractapi.com/v1/' + apiKey

const sendEmailValidationRequest = async (email) => {
    try {
        const response = await fetch.get(apiURL + '&email=' + email);
        const data = response.json();
        return data.is_valid_format.value;
    } catch (error) {
        throw error;
    }
}
const handleSubmitEmail = async (email) => {
    try {
        const isValid = await sendEmailValidationRequest(email);
        if (isValid) {
            return True;
        } else {
           return false;
        }
        
    } catch (error) {
        return false
    }
}

export default handleSubmitEmail