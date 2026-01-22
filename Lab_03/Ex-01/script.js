const form = document.getElementById("regForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const role = document.getElementById("role");
const skillsDiv = document.getElementById("skillsDiv");

role.addEventListener("change", handleRoleChange);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

function handleRoleChange() {
  if (role.value === "teacher" || role.value === "admin") {
    skillsDiv.classList.remove("hidden");
  } else {
    skillsDiv.classList.add("hidden");
  }
}

/* ---------------- Email Validation ---------------- */
function validateEmail() {
  const emailError = document.getElementById("emailError");

  if (role.value === "admin" && !email.value.endsWith("@company.com")) {
    emailError.textContent = "Admin email must be @company.com";
    markInvalid(email);
    return false;
  }

  emailError.textContent = "";
  markValid(email);
  return true;
}

/* ---------------- Password Validation ---------------- */
function validatePassword() {
  const passwordError = document.getElementById("passwordError");
  let pattern;

  if (role.value === "admin") {
    pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    passwordError.textContent =
      "Admin password must have uppercase, number & special char";
  } else {
    pattern = /.{6,}/;
    passwordError.textContent = "Password must be at least 6 characters";
  }

  if (!pattern.test(password.value)) {
    markInvalid(password);
    return false;
  }

  passwordError.textContent = "";
  markValid(password);
  return true;
}

/* ---------------- Confirm Password ---------------- */
function validateConfirmPassword() {
  const confirmError = document.getElementById("confirmError");

  if (password.value !== confirmPassword.value) {
    confirmError.textContent = "Passwords do not match";
    markInvalid(confirmPassword);
    return false;
  }

  confirmError.textContent = "";
  markValid(confirmPassword);
  return true;
}

/* ---------------- Utility Functions ---------------- */
function markInvalid(input) {
  input.classList.add("error");
  input.classList.remove("success");
}

function markValid(input) {
  input.classList.add("success");
  input.classList.remove("error");
}

/* ---------------- Form Submit ---------------- */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword()
  ) {
    alert("Registration Successful ✅");
  } else {
    alert("Fix validation errors ❌");
  }
});
