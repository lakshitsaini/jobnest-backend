let Validator = {};

Validator.validateEmail = function (email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

  if (!regex.test(email)) {
    let err = new Error("Invalid Email");

    err.status = 406;

    throw err;
  }
};

Validator.validatePassword = function (password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!regex.test(password)) {
    let err = new Error("Invalid password");

    err.status = 406;

    throw err;
  }
};

module.exports = Validator;
