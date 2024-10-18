import React, { useEffect } from "react";
import ViewTask from "../../components/Task/ViewTask.jsx";
import AddTask from "../../components/Task/AddTask.jsx";
import DashboardHeader from "../../components/Dashboard/DashboardHeader.jsx";
import TasksTable from "../../components/Dashboard/TasksTable.jsx";
import useNotification from "../../hooks/useNotification.js";
import useTask from "../../hooks/useTask.js";
import Header from "../../components/Layout/Header.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import EditTask from "../../components/Task/EditTask";
import socket,{setupSocketListeners} from "../../services/socketService.js";
const Dashboard = () => {
  
  const { fetchAllNotifications } = useNotification();
  const { getAllTasks } = useTask();

  useEffect(() => {
    fetchAllNotifications();
    getAllTasks();
    setupSocketListeners();
  }, []);

  return (
    <>
      <Header />
      <div className="text-center p-4 mb-12">
        {/* Dashboard Header */}
        <DashboardHeader />
        {/* View Task Modal */}
        <ViewTask />
        {/* Add Task Modal */}
        <AddTask />
        {/* Edit Task Modal */}
        <EditTask  />
        {/* Task Table */}
        <TasksTable />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
