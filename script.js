const form = document.getElementById("resumeForm");

const themeButton = document.getElementById("themeButton");
const printButton = document.getElementById("printButton");
const clearButton = document.getElementById("clearButton");

const addExperienceButton = document.getElementById(
  "addExperienceButton"
);

const addEducationButton = document.getElementById(
  "addEducationButton"
);

const addProjectButton = document.getElementById(
  "addProjectButton"
);

const experienceList = document.getElementById("experienceList");
const educationList = document.getElementById("educationList");
const projectList = document.getElementById("projectList");

const profileImage = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");
const resumePhoto = document.getElementById("resumePhoto");

const fullName = document.getElementById("fullName");
const jobTitle = document.getElementById("jobTitle");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const locationInput = document.getElementById("location");
const website = document.getElementById("website");
const summary = document.getElementById("summary");
const skills = document.getElementById("skills");

const previewName = document.getElementById("previewName");
const previewTitle = document.getElementById("previewTitle");
const previewEmail = document.getElementById("previewEmail");
const previewPhone = document.getElementById("previewPhone");
const previewLocation = document.getElementById(
  "previewLocation"
);
const previewWebsite = document.getElementById(
  "previewWebsite"
);
const previewSummary = document.getElementById(
  "previewSummary"
);
const previewSkills = document.getElementById("previewSkills");
const previewExperience = document.getElementById(
  "previewExperience"
);
const previewEducation = document.getElementById(
  "previewEducation"
);
const previewProjects = document.getElementById(
  "previewProjects"
);

function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getValue(element, fallback) {
  const value = element.value.trim();
  return value || fallback;
}

function createInputGroup(label, placeholder, className, type = "text") {
  return `
    <div class="input-group">
      <label>${label}</label>
      <input
        type="${type}"
        class="${className}"
        placeholder="${placeholder}"
      />
    </div>
  `;
}

function createExperienceItem() {
  const item = document.createElement("div");

  item.className = "dynamic-item experience-item";

  item.innerHTML = `
    <button
      type="button"
      class="remove-item"
      aria-label="Remove experience"
    >
      ×
    </button>

    ${createInputGroup(
      "Job title",
      "Frontend Developer",
      "experience-role"
    )}

    ${createInputGroup(
      "Company",
      "Creative Studio",
      "experience-company"
    )}

    <div class="form-grid">
      ${createInputGroup(
        "Start date",
        "Jan 2023",
        "experience-start"
      )}

      ${createInputGroup(
        "End date",
        "Present",
        "experience-end"
      )}
    </div>

    <div class="input-group">
      <label>Description</label>
      <textarea
        class="experience-description"
        rows="3"
        placeholder="Describe your responsibilities and achievements."
      ></textarea>
    </div>
  `;

  experienceList.appendChild(item);
  addDynamicListeners(item);
  updatePreview();
}

function createEducationItem() {
  const item = document.createElement("div");

  item.className = "dynamic-item education-item";

  item.innerHTML = `
    <button
      type="button"
      class="remove-item"
      aria-label="Remove education"
    >
      ×
    </button>

    ${createInputGroup(
      "Degree or qualification",
      "Bachelor of Computer Science",
      "education-degree"
    )}

    ${createInputGroup(
      "School or university",
      "University of Technology",
      "education-school"
    )}

    ${createInputGroup(
      "Year",
      "2020 - 2024",
      "education-year"
    )}
  `;

  educationList.appendChild(item);
  addDynamicListeners(item);
  updatePreview();
}

function createProjectItem() {
  const item = document.createElement("div");

  item.className = "dynamic-item project-item";

  item.innerHTML = `
    <button
      type="button"
      class="remove-item"
      aria-label="Remove project"
    >
      ×
    </button>

    ${createInputGroup(
      "Project name",
      "Personal Portfolio Website",
      "project-name"
    )}

    ${createInputGroup(
      "Project link",
      "github.com/username/project",
      "project-link"
    )}

    <div class="input-group">
      <label>Description</label>
      <textarea
        class="project-description"
        rows="3"
        placeholder="Explain what you built and which technologies you used."
      ></textarea>
    </div>
  `;

  projectList.appendChild(item);
  addDynamicListeners(item);
  updatePreview();
}

function addDynamicListeners(item) {
  const removeButton = item.querySelector(".remove-item");

  removeButton.addEventListener("click", () => {
    item.remove();
    updatePreview();
  });

  item.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", updatePreview);
  });
}

function renderExperience() {
  const items = [
    ...document.querySelectorAll(".experience-item")
  ];

  if (items.length === 0) {
    previewExperience.innerHTML = `
      <div class="preview-empty">
        Your work experience will appear here.
      </div>
    `;

    return;
  }

  const content = items
    .map((item) => {
      const role = item.querySelector(".experience-role").value.trim();
      const company = item.querySelector(
        ".experience-company"
      ).value.trim();

      const start = item.querySelector(
        ".experience-start"
      ).value.trim();

      const end = item.querySelector(
        ".experience-end"
      ).value.trim();

      const description = item.querySelector(
        ".experience-description"
      ).value.trim();

      if (!role && !company && !description) {
        return "";
      }

      return `
        <div class="preview-item">
          <h4>${escapeHTML(role || "Job title")}</h4>
          <div class="item-subtitle">
            ${escapeHTML(company || "Company")}
          </div>
          <div class="item-date">
            ${escapeHTML(start || "Start date")} -
            ${escapeHTML(end || "End date")}
          </div>
          <p>
            ${escapeHTML(
              description || "Add a description of your work."
            )}
          </p>
        </div>
      `;
    })
    .join("");

  previewExperience.innerHTML = content || `
    <div class="preview-empty">
      Your work experience will appear here.
    </div>
  `;
}

function renderEducation() {
  const items = [
    ...document.querySelectorAll(".education-item")
  ];

  if (items.length === 0) {
    previewEducation.innerHTML = `
      <div class="preview-empty">
        Your education will appear here.
      </div>
    `;

    return;
  }

  const content = items
    .map((item) => {
      const degree = item.querySelector(
        ".education-degree"
      ).value.trim();

      const school = item.querySelector(
        ".education-school"
      ).value.trim();

      const year = item.querySelector(
        ".education-year"
      ).value.trim();

      if (!degree && !school && !year) {
        return "";
      }

      return `
        <div class="preview-item">
          <h4>${escapeHTML(degree || "Degree or qualification")}</h4>
          <div class="item-subtitle">
            ${escapeHTML(school || "School or university")}
          </div>
          <div class="item-date">
            ${escapeHTML(year || "Year")}
          </div>
        </div>
      `;
    })
    .join("");

  previewEducation.innerHTML = content || `
    <div class="preview-empty">
      Your education will appear here.
    </div>
  `;
}

function renderProjects() {
  const items = [
    ...document.querySelectorAll(".project-item")
  ];

  if (items.length === 0) {
    previewProjects.innerHTML = `
      <div class="preview-empty">
        Your projects will appear here.
      </div>
    `;

    return;
  }

  const content = items
    .map((item) => {
      const name = item.querySelector(
        ".project-name"
      ).value.trim();

      const link = item.querySelector(
        ".project-link"
      ).value.trim();

      const description = item.querySelector(
        ".project-description"
      ).value.trim();

      if (!name && !link && !description) {
        return "";
      }

      return `
        <div class="preview-item">
          <h4>${escapeHTML(name || "Project name")}</h4>
          <div class="item-subtitle">
            ${escapeHTML(link || "Project link")}
          </div>
          <p>
            ${escapeHTML(
              description || "Add a project description."
            )}
          </p>
        </div>
      `;
    })
    .join("");

  previewProjects.innerHTML = content || `
    <div class="preview-empty">
      Your projects will appear here.
    </div>
  `;
}

function renderSkills() {
  const skillItems = skills.value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  if (skillItems.length === 0) {
    previewSkills.innerHTML = "<span>Your skills</span>";
    return;
  }

  previewSkills.innerHTML = skillItems
    .map((skill) => `<span>${escapeHTML(skill)}</span>`)
    .join("");
}

function updatePreview() {
  previewName.textContent = getValue(fullName, "Your Name");
  previewTitle.textContent = getValue(
    jobTitle,
    "Professional Title"
  );

  previewEmail.textContent = getValue(
    email,
    "your@email.com"
  );

  previewPhone.textContent = getValue(
    phone,
    "+1 234 567 890"
  );

  previewLocation.textContent = getValue(
    locationInput,
    "Your location"
  );

  previewWebsite.textContent = getValue(
    website,
    "linkedin.com/in/username"
  );

  previewSummary.textContent = getValue(
    summary,
    "Your professional summary will appear here. Add your experience, strengths, and career goals."
  );

  renderSkills();
  renderExperience();
  renderEducation();
  renderProjects();
}

function clearForm() {
  const shouldClear = confirm(
    "Are you sure you want to clear your resume?"
  );

  if (!shouldClear) {
    return;
  }

  form.reset();
  experienceList.innerHTML = "";
  educationList.innerHTML = "";
  projectList.innerHTML = "";

  profilePreview.innerHTML = "<span>👤</span>";
  resumePhoto.innerHTML = "<span>👤</span>";

  updatePreview();
}

profileImage.addEventListener("change", () => {
  const file = profileImage.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const imageHTML = `
      <img src="${reader.result}" alt="Profile photo" />
    `;

    profilePreview.innerHTML = imageHTML;
    resumePhoto.innerHTML = imageHTML;
  });

  reader.readAsDataURL(file);
});

form.addEventListener("input", updatePreview);

addExperienceButton.addEventListener(
  "click",
  createExperienceItem
);

addEducationButton.addEventListener(
  "click",
  createEducationItem
);

addProjectButton.addEventListener(
  "click",
  createProjectItem
);

clearButton.addEventListener("click", clearForm);

printButton.addEventListener("click", () => {
  window.print();
});

themeButton.addEventListener("click", () => {
  const isDark =
    document.body.getAttribute("data-theme") === "dark";

  if (isDark) {
    document.body.removeAttribute("data-theme");
    themeButton.textContent = "🌙";
    localStorage.setItem("resumeTheme", "light");
  } else {
    document.body.setAttribute("data-theme", "dark");
    themeButton.textContent = "☀️";
    localStorage.setItem("resumeTheme", "dark");
  }
});

function loadTheme() {
  const savedTheme = localStorage.getItem("resumeTheme");

  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeButton.textContent = "☀️";
  }
}

loadTheme();
createExperienceItem();
createEducationItem();
createProjectItem();
updatePreview();