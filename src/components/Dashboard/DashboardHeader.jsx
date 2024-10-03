export default function DashboardHeader () {
    return ( <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">Tasks List</h2>
        <button
            data-testid={"addtask_btn"}
            onClick={() => setShowAddTask(true)}
            className="p-3 m-3 bg-green-400 font-semibold rounded-full text-gray-900 hover:bg-green-500"
        >
            Add Task
        </button>
    </div>);
}