import userModel from "../models/userModel";

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

export const validatelength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  } else {
    return true;
  }
};

export const validateUsername = async (username) => {
  let a = false;
  do {
    let check = await userModel.findOne({ username });
    if (check) {
      ///change the username
    } else {
      
    }
  } while (a);
};
