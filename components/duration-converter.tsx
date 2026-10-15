"use client";

import { useRef, useState } from "react";
import { convertDuration } from "@/lib/duration";

const EXAMPLES = ["00:45:00", "01:30:00", "08:15:30"];

type CopyStatus = "idle" | "copying" | "copied" | "failed";

function copyWithSelection(text: string) {
  // Support browsers or non-HTTPS contexts without the async Clipboard API.
  const buffer = document.createElement("textarea");
  const previousFocus = document.activeElement as HTMLElement | null;
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

export function DurationConverter() {
  const [value, setValue] = useState("");
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  // Bumped on every edit so a slow copy can't report on a result that has since changed.
  const resultVersion = useRef(0);

  const trimmed = value.trim();
  const hours = convertDuration(trimmed);
  const invalid = trimmed !== "" && hours === null;

  let resultHint = "Rounded to two decimal places.";
  if (hours === null) resultHint = "Enter a duration to see your result.";
  else if (copyStatus === "copied") resultHint = `${hours} copied to clipboard.`;
  else if (copyStatus === "failed") resultHint = "Couldn't copy automatically. Select the result and copy it manually.";

  function updateValue(next: string) {
    resultVersion.current += 1;
    setValue(next);
    setCopyStatus("idle");
  }

  async function copyResult() {
    if (hours === null) return;
    const version = resultVersion.current;
    setCopyStatus("copying");

    let copied = true;
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
    } catch {
      copied = false;
    }
    if (version === resultVersion.current) setCopyStatus(copied ? "copied" : "failed");
  }

  return (
    <section className="converter" aria-label="Duration converter">
      <div className="input-panel">
        <div className="panel-heading"><label htmlFor="duration">Enter your duration</label><span className="format-tag">HH:MM:SS</span></div>
        <input
          ref={inputRef}
          id="duration"
          name="duration"
          type="text"
          placeholder="01:30:00"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-describedby="duration-hint duration-error"
          aria-invalid={invalid}
          value={value}
          onChange={(event) => updateValue(event.target.value)}
        />
        <p id="duration-hint" className="hint">Hours : minutes : seconds</p>
        <p id="duration-error" className="error" aria-live="polite">
          {invalid ? "Use hh:mm:ss, with whole hours and minutes and seconds between 00 and 59." : ""}
        </p>
        <div className="examples">
          <span>Try an example</span>
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                updateValue(example);
                inputRef.current?.focus();
              }}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="result-panel">
        <div className="panel-heading"><span id="result-label">Decimal hours</span><span className="result-mark" aria-hidden="true">↗</span></div>
        <div className="result-line">
          <output id="result" htmlFor="duration" aria-labelledby="result-label" aria-live="polite" aria-atomic="true">{hours ?? "—"}</output>
          <span className="unit" aria-hidden="true">hours</span>
          <button
            id="copy-result"
            className="copy-button"
            type="button"
            aria-label="Copy decimal hours"
            disabled={hours === null || copyStatus === "copying"}
            onClick={copyResult}
          >
            {copyStatus === "copied" ? "Copied!" : "Copy"}
          </button>
        </div>
        <p id="result-hint" className="result-hint" role="status">{resultHint}</p>
        <div className="result-footer"><span className="live-dot" aria-hidden="true"></span> Instant conversion <span className="precision">2 decimal places</span></div>
      </div>
    </section>
  );
}
