import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState } from "react";
import { parseVoiceCommand } from "../utils/parseVoice";
import { useTasks } from "../context/TaskContext";
import audiowaves from "../assets/images/audio-waves.png";
import TaskCreate from "./TaskCreate";

export default function VoiceInput() {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const { createTask } = useTasks();

  function toLocalInputValue(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const [parsed, setParsed] = useState(null);
  const [hasParsed, setHasParsed] = useState(false);

  // 🔥 FIX: FORCE MICROPHONE PERMISSION POPUP
  const handleStart = async () => {
    setHasParsed(false);

    try {
      // This triggers Chrome's permission dialog (required in Vercel)
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start listening AFTER permission granted
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    } catch (error) {
      alert("Microphone permission denied. Please allow microphone access in browser settings.");
      console.error("Mic error:", error);
    }
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();

    if (!transcript || transcript.trim().length === 0) {
      alert("No voice input detected. Please speak before stopping.");
      return;
    }

    const data = parseVoiceCommand(transcript);
    setParsed(data);
    setHasParsed(true);
  };

  const updateField = (field, value) => {
    setParsed({ ...parsed, [field]: value });
  };

  const saveTask = () => {
    if (!parsed?.title || !parsed.title.trim()) {
      alert("Please provide a title for the task before saving.");
      return;
    }

    const finalData = {
      ...parsed,
      dueDate: parsed.dueDate ? new Date(parsed.dueDate).toISOString() : null,
    };

    createTask(finalData);
    setParsed(null);
    setHasParsed(false);
    resetTranscript();
  };

  return (
    <div className="flex items-center justify-center flex-col gap-8">
      <h2 className="text-2xl">
        Here, I can help you to track tasks using your voice, Press and Hold to start create your Task.
      </h2>

      <div className="flex items-center gap-8">
        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-md shadow-slate-900 cursor-pointer"
          style={{
            backgroundImage: "linear-gradient(180deg, #130214 30%, #34227E 100%)",
          }}
        >
          {listening ? (
            <img src={audiowaves} className="w-[60px] h-[60px]" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#fff"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
              />
            </svg>
          )}
        </button>

        {/* Stop Button */}
        <button
          onClick={handleStop}
          className="rounded-xl py-3 px-6 font-semibold cursor-pointer shadow-md"
          style={{
            backgroundImage: "linear-gradient(45deg, #D71295 20%, #34227E 80%)",
          }}
        >
          Stop & Parse
        </button>
      </div>

      {/* Transcript */}
      <div>
        {listening ? (
          <div className="text-center">
            <p className="mb-3">
              Microphone is <span className="text-red-400 font-semibold">ON</span>
            </p>
            <p className="text-xl capitalize">
              <b>Task:</b> {transcript}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p>
              Microphone is <span className="text-red-400 font-semibold">OFF</span>
            </p>
            {transcript ? (
              <p className="text-xl capitalize">
                <b>Task:</b> {transcript}
              </p>
            ) : (
              ""
            )}
          </div>
        )}
      </div>

      {/* Parsed Panel */}
      {hasParsed && (
        <TaskCreate
          parsed={parsed}
          toLocalInputValue={toLocalInputValue}
          saveTask={saveTask}
          updateField={updateField}
        />
      )}
    </div>
  );
}
