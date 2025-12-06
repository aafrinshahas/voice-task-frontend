import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState, useRef } from "react";
import { parseVoiceCommand } from "../utils/parseVoice";
import { useTasks } from "../context/TaskContext";
import audiowaves from "../assets/images/audio-waves.png";
import TaskCreate from "./TaskCreate";

export default function VoiceInput() {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const { createTask } = useTasks();

  const micStreamRef = useRef(null);
  const [isMicOn, setIsMicOn] = useState(false);

  const [parsed, setParsed] = useState(null);
  const [hasParsed, setHasParsed] = useState(false);

  function toLocalInputValue(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleStart = async () => {
    setHasParsed(false);
    resetTranscript();

    try {
      // Request mic permission and store stream
      micStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start listening
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

      setIsMicOn(true);
    } catch (err) {
      alert("Please enable the microphone permission.");
      console.error(err);
    }
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    setIsMicOn(false);

    // FULL FORCE STOP (fix for Chrome on Vercel)
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }

    if (!transcript.trim()) {
      alert("No voice detected.");
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
    if (!parsed?.title?.trim()) {
      alert("Please provide a title.");
      return;
    }

    createTask({
      ...parsed,
      dueDate: parsed.dueDate ? new Date(parsed.dueDate).toISOString() : null,
    });

    setParsed(null);
    setHasParsed(false);
    resetTranscript();
  };

  return (
    <div className="flex items-center justify-center flex-col gap-8">
      <h2 className="text-2xl">Create tasks using your voice.</h2>

      <div className="flex items-center gap-8">
        <button
          onClick={handleStart}
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-md cursor-pointer"
          style={{ backgroundImage: "linear-gradient(180deg, #130214 30%, #34227E 100%)" }}
        >
          {isMicOn ? (
            <img src={audiowaves} className="w-[60px] h-[60px]" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/>
            </svg>
          )}
        </button>

        <button
          onClick={handleStop}
          className="rounded-xl py-3 px-6 font-semibold cursor-pointer shadow-md"
          style={{ backgroundImage: "linear-gradient(45deg, #D71295 20%, #34227E 80%)" }}
        >
          Stop & Parse
        </button>
      </div>

      <div className="text-center">
        <p>
          Microphone is{" "}
          <span className="text-red-400 font-semibold">
            {isMicOn ? "ON" : "OFF"}
          </span>
        </p>
        {transcript && <p className="text-xl capitalize"><b>Task:</b> {transcript}</p>}
      </div>

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
