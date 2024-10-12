import CONSTANTS_STRING from "../../constants/strings";
export default function DashboardHeader ({setTaskOperations,taskOperations}) {
    return ( <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">Tasks List</h2>
        <button
            data-testid={"addtask_btn"}
            onClick={() => setTaskOperations({...taskOperations,showAddTask:true})}
            className="p-3 m-3 bg-stone-800 font-semibold rounded-full text-stone-50 hover:bg-stone-950"
        >
           {CONSTANTS_STRING.ADD_TASK}
        </button>
    </div>);
}