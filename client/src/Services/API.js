import { commonrequest } from "./APIcall";
import { BACKEND_URL } from "./Helper";

// login function
export const loginFunction = async (registrationNo, password) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/login`, {
    registrationNo,
    password,
  });
};

// Register function
export const registerFunction = async (name, registrationNo, password) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/register-user`, {
    name,
    registrationNo,
    password,
  });
};

// Update Password function
export const updatePasswordFunction = async (
  registrationNo,
  newPassword,
  currentPassword
) => {
  return await commonrequest("PUT", `${BACKEND_URL}/api/update-password`, {
    registrationNo,
    newPassword,
    currentPassword,
  });
};

// Delete Account function
export const deleteAccFunction = async (registrationNo) => {
  return await commonrequest("DELETE", `${BACKEND_URL}/api/delete-account`, {
    registrationNo,
  });
};
