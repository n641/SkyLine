const validateUserName = (UserName) => {
  var re = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  return re.test(UserName);
};

export default validateUserName