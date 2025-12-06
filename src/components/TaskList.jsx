import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskFilters from "./TaskFilters";
import TaskEdit from "./TaskEdit";

export default function TaskList() {
  const { tasks, deleteTask, updateTask } = useTasks();

//   function toLocalInputValue(date) {
//   const d = new Date(date);
//   d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
//   return d.toISOString().slice(0, 16);
// }

function toLocalInputValue(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}



  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    status: "",
    dueDate: "",
  });

  // Filters
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterDue, setFilterDue] = useState("All");

  
  const filteredTasks = tasks.filter((task) => {
  const matchesSearch =
    (task.title || "")
      .toLowerCase()
      .includes(searchText.toLowerCase());

  const matchesStatus =
    filterStatus === "All" || task.status === filterStatus;

  const matchesPriority =
    filterPriority === "All" || task.priority === filterPriority;

  let matchesDue = true;
  if (filterDue !== "All") {
    const now = new Date();
    const due = new Date(task.dueDate);

    if (filterDue === "Today") {
      matchesDue = due.toDateString() === now.toDateString();
    } else if (filterDue === "Upcoming") {
      matchesDue = due > now;
    } else if (filterDue === "Overdue") {
      matchesDue = due < now;
    }
  }

  return matchesSearch && matchesStatus && matchesPriority && matchesDue;
});


  // Open edit modal
  const handleEdit = (task) => {
    setEditingTask(task.id);
    setFormData({
      title: task.title,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
    });
  };

const saveEdit = () => {
  const finalData = {
    ...formData,
    dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
  };

  updateTask(editingTask, finalData);
  setEditingTask(null);
};


  return (
    <div className="m-6 mt-10">
      <h2 className="font-semibold text-3xl mb-5 text-center text-red-400">Task Lists</h2>

      <TaskFilters
        searchText={searchText}
        setSearchText={setSearchText}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        filterDue={filterDue}
        setFilterDue={setFilterDue}
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredTasks.length === 0 ? (
        <p className=" mx-auto text-3xl text-red-400 pt-10">No tasks found...</p>
      ) : (
        
        filteredTasks.map((task) => (
          <div
            key={task.id}

         className="flex flex-col p-6 rounded-xl shadow-md shadow-slate-500 bg-transparent border border-gray-600 border-l-0 border-r-0 border-b-0"
          >
            <h3 className="text-red-400 font-semibold text-xl mb-3 capitalize">{task.title}</h3>
            <p className="mb-2"><b>Priority:</b> {task.priority}</p>
            <p className="mb-2"><b>Status:</b> {task.status}</p>

            <p className="mb-2">
              <b>Due:</b>{" "}
      {task.dueDate
    ? new Date(task.dueDate).toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Not set"}
            </p>
<div className="flex gap-5 mt-6 items-end-safe h-full flex-wrap">

              <button
              onClick={() => handleEdit(task)}
          className="border border-b-red-200 rounded-lg py-2 px-10 font-semibold cursor-pointer grow"
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              className="py-2 px-10 bg-red-400 text-black font-semibold rounded-lg cursor-pointer grow"
            >
              Delete
            </button>
</div>

          </div>
        ))
      )
      
      }
      </div>



      {/* Edit Modal */}
      {editingTask && (
    <TaskEdit
    saveEdit={saveEdit}
setEditingTask={setEditingTask}
formData={formData}
setFormData={setFormData}
toLocalInputValue={toLocalInputValue}
    />
      )}
    </div>
  );
}
