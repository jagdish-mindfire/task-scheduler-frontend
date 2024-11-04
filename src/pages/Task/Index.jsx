import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import {
  ChevronDown,
  List,
  LayoutGrid,
  Calendar as CalendarIcon,
  Plus,
  Share,
  Sliders,
} from "lucide-react";
import Calendar from "../../components/Task/Calendar.jsx";
import Board from "../../components/Task/Board.jsx";
import StringDP from "../../components/Common/StringDP.jsx";
import { Button } from "../../components/Common/Button.jsx";
import TaskList from "../../components/Task/TaskList.jsx";
import useTask from "../../hooks/useTask.js";
import { useParams, Link, useNavigate } from "react-router-dom";
import NotFound from "../NotFound.jsx";
const cn = (...inputs) => twMerge(inputs);

const Index = () => {
  const [activeTab, setActiveTab] = useState("list");
  const { getAllTasks } = useTask();
  const { viewType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    setActiveTab(viewType !== undefined ? viewType.toLowerCase() : "list");
  }, [viewType]);

  console.log({ viewType });

  const renderTaskContent = () => {
    switch (viewType) {
      case undefined:
        return <TaskList />;
      case "list":
        return <TaskList />;
      case "board":
        return <Board />;
      case "calendar":
        return <Calendar />;

      default:
        navigate("/not-found");
        return;
    }
  };

  return (
    <div className="container mx-auto px-2 py-4 max-w-5xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <StringDP />
          <h1 className="text-xl font-semibold mr-1">My tasks</h1>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex space-x-1">
          <Button variant="outline" size="sm">
            <Share className="w-3 h-3 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Sliders className="w-3 h-3 mr-1" />
            Customize
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4 border-b">
        <Button
          variant="ghost"
          className={cn(
            "border-b-2",
            activeTab === "list"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          )}
        >
          <List className="w-3 h-3 mr-1" />
          <Link to={"/tasks/list"}>List</Link>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "border-b-2",
            activeTab === "board"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          )}
        >
          <LayoutGrid className="w-3 h-3 mr-1" />
          <Link to={"/tasks/board"}>Board</Link>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "border-b-2",
            activeTab === "calendar"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          )}
        >
          <CalendarIcon className="w-3 h-3 mr-1" />
          <Link to={"/tasks/calendar"}>Calendar</Link>
        </Button>
        <Button variant="ghost">
          <Plus className="w-3 h-3" />
        </Button>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden p-4">
        {renderTaskContent()}
      </div>
    </div>
  );
};

export default Index;
