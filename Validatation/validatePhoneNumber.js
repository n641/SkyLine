const validatePhoneNumber = (phoneNumber) => {
  var re = /^01[0125][0-9]{8}$/;
  return re.test(phoneNumber);
};




export default validatePhoneNumber