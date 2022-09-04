export default function Validate(values) {
  let formErrors = {};
  const regex = /^[^\s@]+@[^\s]+\.[^\s@]{2,}$/i;
  if (!values.email) {
    formErrors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    formErrors.email = "Invalid Email format!";
  }
  if (!values.password) {
    formErrors.password = "Password is required!";
  }
  if (!values.firstname) {
    formErrors.firstname = "First Name is required!";
  }
  if (!values.lastname) {
    formErrors.lastname = "Last Name is required!";
  }
  return formErrors;
}
