import React from 'react'

const TaskCreate = ({
parsed,
toLocalInputValue,
saveTask,
updateField
}) => {
return (
<>
<div className="w-[70%] p-3">
<h3 className="font-semibold text-xl mb-5 text-center text-red-400">Review & Save</h3>

<div className="mb-4">
<label className="font-semibold text-lg ">Title:</label>
<input 
type="text"
value={parsed.title}
onChange={(e) => updateField("title", e.target.value)}
className="border border-b-red-200 w-full rounded-lg p-2 mt-3 focus:outline-none"
/>
</div>

<div className="mb-4">
<label>Priority:</label>
<select
value={parsed.priority}
onChange={(e) => updateField("priority", e.target.value)}
className="border border-b-red-200 w-full rounded-lg p-2 mt-3 focus:outline-none"
>
<option className="text-black">High</option>
<option className="text-black">Medium</option>
<option className="text-black">Low</option>
</select>
</div>


<div className="mb-4">
<label>Due Date:</label>

<input
type="datetime-local"
value={parsed.dueDate ? toLocalInputValue(parsed.dueDate) : ""}
onChange={(e) => updateField("dueDate", e.target.value)}
className="border border-b-red-200 w-full rounded-lg p-2 mt-3 focus:outline-none form-date"
/>


</div>



<div className="mb-4">
<label>Status:</label>
<select
value={parsed.status}
onChange={(e) => updateField("status", e.target.value)}
className="border border-b-red-200 w-full rounded-lg p-2 mt-3 focus:outline-none "
>
<option className="text-black">To Do</option>
<option className="text-black">In Progress</option>
<option className="text-black">Completed</option>
</select>

</div>


<button onClick={saveTask} className="rounded-xl py-3 px-6 font-semibold cursor-pointer shadow-md mt-6" style={{ backgroundImage: 'linear-gradient(45deg, #D71295 20%, #34227E 80%)'}}>Create Task</button>
</div>
</>
)
}

export default TaskCreate