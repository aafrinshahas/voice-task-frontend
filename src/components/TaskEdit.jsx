import React from 'react'

const TaskEdit = ({
saveEdit, 
setEditingTask,
formData,
setFormData,
toLocalInputValue
}) => {
return (
<>
<div className='overlay'>
<div className='edit-task-wrapper'>
<h3 className="font-semibold text-2xl mb-5 text-center text-red-400">Edit Task</h3>
<div className="mb-4">
<label className="text-[#34227E] font-semibold text-lg">Title</label>
<input
type="text"
value={formData.title}
onChange={(e) =>
setFormData((prev) => ({ ...prev, title: e.target.value }))
}
className="border border-red-400 w-full rounded-lg p-2 mt-3 focus:outline-none"
/>
</div>

<div className="mb-4">
<label className="text-[#34227E] font-semibold text-lg">Priority</label>
<select
value={formData.priority}
onChange={(e) =>
setFormData((prev) => ({ ...prev, priority: e.target.value }))
}
className="border border-red-400 w-full rounded-lg p-2 mt-3 focus:outline-none"
>
<option>High</option>
<option>Medium</option>
<option>Low</option>
</select>
</div>


<div className="mb-4">
<label className="text-[#34227E] font-semibold text-lg">Status</label>
<select
value={formData.status}
onChange={(e) =>
setFormData((prev) => ({ ...prev, status: e.target.value }))
}
className="border border-red-400 w-full rounded-lg p-2 mt-3 focus:outline-none"
>
<option>To Do</option>
<option>In Progress</option>
<option>Completed</option>
</select>
</div>

<div className="mb-4">
<label className="text-[#34227E] font-semibold text-lg">Due Date</label>
<input
type="datetime-local"
value={formData.dueDate ? toLocalInputValue(formData.dueDate) : ""}


onChange={(e) =>
setFormData((prev) => ({
...prev,
dueDate: e.target.value,
}))
}
className="border border-red-400 w-full rounded-lg p-2 mt-3 focus:outline-none"
/>
</div>

<div className="flex gap-5 mt-6 flex-wrap">
<button
onClick={saveEdit}
className="grow py-2 px-10 bg-green-800 text-white font-semibold rounded-lg border-green-800 border-2 cursor-pointer"
>
Save
</button>

<button onClick={() => setEditingTask(null)}
className=" border-red-400 rounded-lg py-2 px-10 font-semibold border-2 cursor-pointer grow"
>Cancel</button>
</div>


</div>
</div>
</>
)
}

export default TaskEdit