const stages = document.querySelectorAll(".stage");
const progress = document.getElementById("progress");
let currentStage = 0;

// Temporary state storage
const formData = {
  name: "",
  email: "",
  phone: "",
  password: ""
};

function showStage(index) {
  stages.forEach(stage => stage.classList.remove("active"));
  stages[index].classList.add("active");
  updateProgress();
}

function updateProgress() {
  progress.style.width = ((currentStage + 1) / stages.length) * 100 + "%";
}

function validateStage() {
  const error = stages[currentStage].querySelector(".error");
  error.innerText = "";

  if (currentStage === 0) {
    const name = document.getElementById("name").value.trim();
    if (!name) {
      error.innerText = "Name is required";
      return false;
    }
    formData.name = name;
  }

  if (currentStage === 1) {
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    if (!email.includes("@") || phone.length < 10) {
      error.innerText = "Valid email & phone required";
      return false;
    }
    formData.email = email;
    formData.phone = phone;
  }

  if (currentStage === 2) {
    const password = document.getElementById("password").value;
    if (password.length < 6) {
      error.innerText = "Password must be at least 6 characters";
      return false;
    }
    formData.password = password;
  }

  if (currentStage === 3) {
    document.getElementById("review").innerText =
      `Name: ${formData.name}
       Email: ${formData.email}
       Phone: ${formData.phone}`;
  }

  return true;
}

function nextStage() {
  if (!validateStage()) return;
  currentStage++;
  showStage(currentStage);
}

function prevStage() {
  currentStage--;
  showStage(currentStage);
}

document.getElementById("multiForm").addEventListener("submit", function (e) {
  if (!validateStage()) {
    e.preventDefault();
  } else {
    alert("Form submitted successfully ✅");
  }
});
