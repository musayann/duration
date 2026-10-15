"use strict";

function convertDuration(value) {
  const match = /^(\d+):([0-5]\d):([0-5]\d)$/.exec(value.trim());
  if (!match) return null;

  // Integer arithmetic keeps rounding accurate even for very long durations.
  const seconds = BigInt(match[1]) * 3600n + BigInt(match[2]) * 60n + BigInt(match[3]);
  const hundredths = (seconds + 18n) / 36n;
  return `${hundredths / 100n}.${String(hundredths % 100n).padStart(2, "0")}`;
}

const input = document.getElementById("duration");
const result = document.getElementById("result");
const error = document.getElementById("duration-error");
const resultHint = document.getElementById("result-hint");
const copyButton = document.getElementById("copy-result");
let resultVersion = 0;

function updateResult() {
  resultVersion += 1;
  const value = input.value.trim();
  const hours = convertDuration(value);
  const invalid = value !== "" && hours === null;

  input.setAttribute("aria-invalid", String(invalid));
  error.textContent = invalid
    ? "Use hh:mm:ss, with whole hours and minutes and seconds between 00 and 59."
    : "";
  result.textContent = hours ?? "—";
  copyButton.disabled = hours === null;
  copyButton.textContent = "Copy";
  resultHint.textContent = hours === null
    ? "Enter a duration to see your result."
    : "Rounded to two decimal places.";
}

function copyWithSelection(text) {
  // Support opening the website directly from disk or without HTTPS.
  const buffer = document.createElement("textarea");
  const previousFocus = document.activeElement;
  buffer.value = text;
  buffer.readOnly = true;
  buffer.className = "clipboard-buffer";
  document.body.appendChild(buffer);
  try {
    buffer.select();
    if (!document.execCommand("copy")) throw new Error("Copy failed");
  } finally {
    buffer.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

copyButton.addEventListener("click", async () => {
  const hours = convertDuration(input.value);
  if (hours === null) return;
  const version = resultVersion;
  copyButton.disabled = true;

  try {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(hours);
      } catch {
        copyWithSelection(hours);
      }
    } else {
      copyWithSelection(hours);
    }
    if (version !== resultVersion) return;
    copyButton.textContent = "Copied!";
    resultHint.textContent = `${hours} copied to clipboard.`;
  } catch {
    if (version !== resultVersion) return;
    resultHint.textContent = "Couldn't copy automatically. Select the result and copy it manually.";
  } finally {
    if (version === resultVersion) copyButton.disabled = false;
  }
});

input.addEventListener("input", updateResult);
document.querySelectorAll("[data-duration]").forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.duration;
    updateResult();
    input.focus();
  });
});
updateResult();
