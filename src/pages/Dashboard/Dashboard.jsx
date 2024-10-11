import React, { useState, useContext, useEffect } from "react";
import ViewTask from "../../components/Task/ViewTask.jsx";
import AddTask from "../../components/Task/AddTask.jsx";
import { TaskContext } from "../../context/TaskContext.jsx";
import DashboardHeader from "../../components/Dashboard/DashboardHeader.jsx";
import TasksTable from "../../components/Dashboard/TasksTable.jsx";
import useNotification from "../../hooks/useNotification.js";
import useTask from "../../hooks/useTask.js";
import Header from "../../components/Layout/Header.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import EditTask from "../../components/Task/EditTask";

const Dashboard = () => {
  const [taskOperations, setTaskOperations] = useState({
    showViewTask: false,
    showEditTask: false,
    showAddTask: false,
    taskData: {},
  });

  const { taskList } = useContext(TaskContext);
  const { fetchAllNotifications } = useNotification();
  const { sortTasks, getAllTasks } = useTask();

  useEffect(() => {
    fetchAllNotifications();
    getAllTasks();
  }, []);

  return (
    <>
      <Header />
      <div className="text-center p-4 mb-12">
        {/* Dashboard Header */}
        <DashboardHeader setTaskOperations={setTaskOperations} taskOperations={taskOperations}/>
        {/* View Task Modal */}
        <ViewTask setTaskOperations={setTaskOperations} taskOperations={taskOperations} />
        {/* Add Task Modal */}
        <AddTask setTaskOperations={setTaskOperations} taskOperations={taskOperations} />
        {/* Edit Task Modal */}
        <EditTask setTaskOperations={setTaskOperations} taskOperations={taskOperations} />
        {/* Task Table */}
        <TasksTable taskList={taskList}  sortTasks={sortTasks} setTaskOperations={setTaskOperations} taskOperations={taskOperations} />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
