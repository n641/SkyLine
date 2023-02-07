const validatepass = (pass) => {
    var re = /^(?=.[a-z])(?=.[0-9])(?=.*[!@#$%]).{8,24}$/;
      return re.test(pass);
  };
  
export default  validatepass