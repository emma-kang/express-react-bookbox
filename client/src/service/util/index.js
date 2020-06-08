export const validation_Email = (emailString) => {
  var regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(emailString)) {
    return true;
  } else {
    return false;
  }
};

export const validation_password = (pwString) => {
  let res;

  if (pwString.length < 8)
    res = false;
  else
    res = true;

  return res;
}

export const validation_name = (nameString) => {
  let regex = /^[a-zA-Z]+/;

  if (regex.test(nameString)) {
    return true;
  } else {
    return false;
  }
}