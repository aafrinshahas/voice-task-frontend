import { TaskProvider } from "./context/TaskContext";
import VoiceInput from "./components/VoiceInput";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import './App.css'

export default function App() {
  return (
    <TaskProvider>
      <div className="wrapper">
      <Header/>
        <VoiceInput />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
