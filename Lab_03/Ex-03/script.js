const surveyQuestions = [
  {
    id: "name",
    label: "Your Name",
    type: "text",
    required: true,
    maxLength: 20
  },
  {
    id: "gender",
    label: "Gender",
    type: "radio",
    required: true,
    options: ["Male", "Female", "Other"]
  },
  {
    id: "skills",
    label: "Skills",
    type: "checkbox",
    required: true,
    options: ["Java", "JavaScript", "Python"],
    minSelect: 1,
    maxSelect: 2
  }
];




const form = document.getElementById("surveyForm");

surveyQuestions.forEach(q => {
  const div = document.createElement("div");
  div.className = "question";

  const label = document.createElement("label");
  label.innerText = q.label;
  div.appendChild(label);

  div.appendChild(document.createElement("br"));

  if (q.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = q.id;
    input.maxLength = q.maxLength || "";
    div.appendChild(input);
  }

  if (q.type === "radio") {
    q.options.forEach(opt => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = q.id;
      input.value = opt;
      div.appendChild(input);
      div.append(opt);
    });
  }

  if (q.type === "checkbox") {
    q.options.forEach(opt => {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = q.id;
      input.value = opt;
      div.appendChild(input);
      div.append(opt);
    });
  }

  const error = document.createElement("div");
  error.id = q.id + "Error";
  error.className = "error";
  div.appendChild(error);

  form.appendChild(div);
});

const btn = document.createElement("button");
btn.innerText = "Submit";
form.appendChild(btn);


form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  surveyQuestions.forEach(q => {
    const error = document.getElementById(q.id + "Error");
    error.innerText = "";

    if (q.type === "text") {
      const input = document.getElementById(q.id);
      if (q.required && input.value.trim() === "") {
        error.innerText = "This field is required";
        isValid = false;
      }
      if (q.maxLength && input.value.length > q.maxLength) {
        error.innerText = `Max ${q.maxLength} characters allowed`;
        isValid = false;
      }
    }

    if (q.type === "radio") {
      const selected = document.querySelector(
        `input[name="${q.id}"]:checked`
      );
      if (q.required && !selected) {
        error.innerText = "Please select an option";
        isValid = false;
      }
    }

    if (q.type === "checkbox") {
      const checked = document.querySelectorAll(
        `input[name="${q.id}"]:checked`
      );

      if (q.required && checked.length < q.minSelect) {
        error.innerText = `Select at least ${q.minSelect}`;
        isValid = false;
      }

      if (q.maxSelect && checked.length > q.maxSelect) {
        error.innerText = `Select at most ${q.maxSelect}`;
        isValid = false;
      }
    }
  });

  if (isValid) {
    alert("Survey submitted successfully ✅");
  }
});
