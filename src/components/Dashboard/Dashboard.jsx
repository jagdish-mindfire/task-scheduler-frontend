import React, { useState, useContext, useEffect } from 'react';
import ViewTask from '../ViewTask';
import AddTask from '../AddTask';
import { TaskContext } from '../../context/TaskContext';
import DashboardHeader from './DashboardHeader';
import TasksTable from './TasksTable';
import useNotification from '../../hooks/useNotification';
import useTask from '../../hooks/useTask';

const Dashboard = () => {
    const [viewTask, setViewTask] = useState(false);
    const [taskData, setTaskData] = useState({});
    const [showAddTask, setShowAddTask] = useState(false);

    const { taskList } = useContext(TaskContext);
    const {fetchAllNotifications} = useNotification();
    const {sortTasks} = useTask();

    useEffect(()=>{
        fetchAllNotifications();
    },[]);

    return (
        <>
            <div className="text-center p-4 mb-12">
                {/* View Task Modal */}
                <ViewTask open={viewTask} setOpen={setViewTask} taskData={taskData} />
                {/* Add Task Modal */}
                <AddTask open={showAddTask} setOpen={setShowAddTask} />
                <DashboardHeader setShowAddTask={setShowAddTask}/>
                <TasksTable taskList={taskList} setTaskData={setTaskData} setViewTask={setViewTask} sortTasks={sortTasks}/>
            </div>
        </>
    );
};

export default Dashboard;
