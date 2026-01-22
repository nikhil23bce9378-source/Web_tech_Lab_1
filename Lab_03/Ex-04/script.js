const activityLog = [];
const logDiv = document.getElementById("log");
const warningDiv = document.getElementById("warning");

let clickCount = 0;
let keyCount = 0;

// Thresholds
const CLICK_LIMIT = 10;
const KEY_LIMIT = 20;

/* ---------------- Utility: Log Activity ---------------- */
function logActivity(type, target) {
  const activity = {
    type,
    target,
    time: new Date().toLocaleTimeString()
  };

  activityLog.push(activity);
  displayActivity(activity);
  detectSuspiciousActivity();
}

/* ---------------- Display in DOM ---------------- */
function displayActivity(activity) {
  const p = document.createElement("p");
  p.innerText = `[${activity.time}] ${activity.type} on ${activity.target}`;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
}

// CLICK – bubbling
document.addEventListener("click", (e) => {
  clickCount++;
  logActivity("Click (Bubble)", e.target.tagName);
});

// CLICK – capturing
document.addEventListener("click", (e) => {
  logActivity("Click (Capture)", e.target.tagName);
}, true);

// KEY PRESS
document.addEventListener("keydown", (e) => {
  keyCount++;
  logActivity("Key Press", e.key);
});

// FOCUS
document.addEventListener("focusin", (e) => {
  logActivity("Focus", e.target.tagName);
});

function detectSuspiciousActivity() {
  if (clickCount > CLICK_LIMIT) {
    warningDiv.innerHTML = "⚠️ Suspicious activity: Too many clicks!";
    warningDiv.className = "warning";
  }

  if (keyCount > KEY_LIMIT) {
    warningDiv.innerHTML = "⚠️ Suspicious activity: Excessive key presses!";
    warningDiv.className = "warning";
  }
}

function resetLog() {
  activityLog.length = 0;
  logDiv.innerHTML = "";
  warningDiv.innerHTML = "";
  clickCount = 0;
  keyCount = 0;
}

function exportLog() {
  let text = "User Activity Log\n\n";

  activityLog.forEach((a, i) => {
    text += `${i + 1}. [${a.time}] ${a.type} → ${a.target}\n`;
  });

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "activity_log.txt";
  link.click();
}

