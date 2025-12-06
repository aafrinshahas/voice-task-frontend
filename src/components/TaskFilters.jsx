import React from "react";

export default function TaskFilters({
searchText,
setSearchText,
filterStatus,
setFilterStatus,
filterPriority,
setFilterPriority,
filterDue,
setFilterDue,
}) {
return (
<div className="flex items-center justify-between gap-10 mt-10 flex-wrap">
{/* SEARCH */}
<div  className="border border-b-red-200 rounded-lg p-2 focus:outline-none w-full flex items-center gap-2.5 lg:w-[45%]">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

<input
type="text"
placeholder="Search tasks..."
value={searchText}
onChange={(e) => setSearchText(e.target.value)}
className="focus:outline-none"
/>
</div>


{/* FILTERS */}
<div className="flex gap-4 flex-wrap">
{/* STATUS */}
<div className="border border-b-red-200 rounded-lg py-2 px-4 grow">
<select
value={filterStatus}
onChange={(e) => setFilterStatus(e.target.value)}
className="px-2 focus:outline-none w-full"
>
<option value="All" className="text-black">All Status</option>
<option value="To Do" className="text-black">To Do</option>
<option value="In Progress" className="text-black">In Progress</option>
<option value="Completed" className="text-black">Completed</option>
</select>
</div>


{/* PRIORITY */}
<div className="border border-b-red-200 rounded-lg py-2 px-4 grow">
<select
value={filterPriority}
onChange={(e) => setFilterPriority(e.target.value)}
className="px-2 focus:outline-none w-full"
>
<option value="All" className="text-black">All Priority</option>
<option value="High" className="text-black">High</option>
<option value="Medium" className="text-black">Medium</option>
<option value="Low" className="text-black">Low</option>
</select>
</div>


{/* DUE DATE */}
<div className="border border-b-red-200 rounded-lg py-2 px-4 grow">
<select
value={filterDue}
onChange={(e) => setFilterDue(e.target.value)}
className="px-2 focus:outline-none w-full"
>
<option value="All" className="text-black">All Dates</option>
<option value="Today" className="text-black">Today</option>
<option value="Upcoming" className="text-black">Upcoming</option>
<option value="Overdue" className="text-black">Overdue</option>
</select>
</div>

</div>
</div>
);
}
