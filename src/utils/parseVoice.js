import {
  addDays,
  addWeeks,
  parse,
  setHours,
  setMinutes,
  isValid,
} from "date-fns";

export const parseVoiceCommand = (text) => {
  const original = text.trim();
  const lower = original.toLowerCase();
  const now = new Date();

  // ------------------------------------------
  // PRIORITY DETECTION
  // ------------------------------------------
  const detectPriority = () => {
    if (lower.includes("urgent") || lower.includes("critical")) return "High";
    if (lower.includes("high priority")) return "High";
    if (lower.includes("low priority")) return "Low";
    return "Medium";
  };

  // ------------------------------------------
  // STATUS DETECTION
  // ------------------------------------------
  const detectStatus = () => {
    if (lower.includes("completed")) return "Completed";
    if (lower.includes("in progress")) return "In Progress";
    return "To Do";
  };

  // ------------------------------------------
  // DATE DETECTION
  // ------------------------------------------
  const detectDate = () => {
    let date = null;

    // --------------------------
    // Relative: tomorrow / day after tomorrow
    // --------------------------
    if (lower.includes("day after tomorrow")) {
      date = addDays(now, 2);
    } else if (lower.includes("tomorrow")) {
      date = addDays(now, 1);
    }

    // --------------------------
    // Relative: in X days
    // --------------------------
    const inDays = lower.match(/in (\d+) days?/);
    if (inDays) date = addDays(now, Number(inDays[1]));

    // --------------------------
    // Relative: in X weeks
    // --------------------------
    const inWeeks = lower.match(/in (\d+) weeks?/);
    if (inWeeks) date = addWeeks(now, Number(inWeeks[1]));

    // --------------------------
    // Weekday Detection: next Wednesday, this Friday, Wednesday, on Sunday
    // --------------------------
    const weekdays = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const weekdayMatch = lower.match(
      /(next|this|on)?\s*(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/
    );

    if (weekdayMatch) {
      const [, prefix, dayName] = weekdayMatch;
      const target = weekdays[dayName];
      const today = now.getDay();

      let diff = target - today;
      if (diff <= 0) diff += 7; // upcoming

      if (prefix === "next") diff += 7; // force next week

      date = addDays(now, diff);
    }

    // --------------------------
    // Full date pattern: 15th January
    // --------------------------
    const fullDate = lower.match(
      /\b(\d{1,2})(st|nd|rd|th)? (january|february|march|april|may|june|july|august|september|october|november|december)\b/
    );
    if (fullDate) {
      const parsed = parse(`${fullDate[1]} ${fullDate[3]}`, "d MMMM", now);
      if (isValid(parsed)) date = parsed;
    }

    // --------------------------
    // Short date: Jan 20
    // --------------------------
    const shortDate = lower.match(
      /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* (\d{1,2})\b/
    );
    if (shortDate) {
      const parsed = parse(`${shortDate[2]} ${shortDate[1]}`, "d MMM", now);
      if (isValid(parsed)) date = parsed;
    }

    // --------------------------
    // Full date with year: Jan 26 2026
    // --------------------------
    const fullDateYear = lower.match(
      /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* (\d{1,2}),? (\d{4})/
    );
    if (fullDateYear) {
      const parsed = parse(
        `${fullDateYear[2]} ${fullDateYear[1]} ${fullDateYear[3]}`,
        "d MMM yyyy",
        now
      );
      if (isValid(parsed)) date = parsed;
    }

    // ------------------------------------------
    // TIME detection
    // ------------------------------------------
    let timeAssigned = false;

    const applyTime = (h) => {
      date = setHours(setMinutes(date || now, 0), h);
      timeAssigned = true;
    };

    if (lower.includes("morning")) applyTime(10);
    if (lower.includes("afternoon")) applyTime(13);
    if (lower.includes("evening")) applyTime(18);
    if (lower.includes("end of day") || lower.includes("eod")) applyTime(18);

    // Default: if date exists but no time assigned → 6 PM
    if (date && !timeAssigned) {
      date = setHours(setMinutes(date, 0), 18);
    }

    return date;
  };

  // ------------------------------------------
  // TITLE DETECTION — SMART & CLEAN
  // ------------------------------------------
  const detectTitle = () => {
    let input = original;

    input = input
      .replace(/create( a)?( new)?( task)?/gi, "")
      .replace(/remind me to/gi, "")
      .replace(/please/gi, "")
      .trim();

    // Remove priority words
    input = input.replace(/high priority|low priority|urgent|critical/gi, "");

    const dateStopWords = [
      "by",
      "before",
      "on",
      "at",
      "in",
      "next",
      "tomorrow",
      "today",
      "evening",
      "morning",
    ];

    let cutIndex = input.length;

    dateStopWords.forEach((word) => {
      const idx = input.toLowerCase().indexOf(` ${word} `);
      if (idx !== -1 && idx < cutIndex) cutIndex = idx;
    });

    let title = input.substring(0, cutIndex).trim();

    // Remove leading filler words
    title = title.replace(/^(to|the|a|an)\s+/i, "").trim();

    if (title.length > 0)
      title = title.charAt(0).toUpperCase() + title.slice(1);

    return title;
  };

  // ------------------------------------------
  // FINAL RESULT
  // ------------------------------------------
  return {
    title: detectTitle(),
    priority: detectPriority(),
    dueDate: detectDate()?.toString() || "",
    status: detectStatus(),
    rawTranscript: original,
  };
};
