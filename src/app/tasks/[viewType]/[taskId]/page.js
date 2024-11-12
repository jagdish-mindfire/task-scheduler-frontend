"use client";
import React, { useState, useContext, useEffect } from 'react';
import { ArrowRight, X, ChevronDown, Flag, MessageSquare, UserPlus, Calendar, Plus, Link, Trash2, Check } from 'lucide-react';
import moment from "moment";
import { useParams, useRouter } from 'next/navigation';
import { Button } from '../../../components/Common/Button';
import StringDP from "../../../components/Common/StringDP";
import useTask from "../../../hooks/useTask.js";
import { TaskContext } from '../../../context/TaskContext';
import { UserContext } from '../../../context/UserContext';

const TaskDetails = ({ onClose }) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { userData } = useContext(UserContext);
  const { task, setTask } = useContext(TaskContext);
  const { updateTask, deleteTask, getSingleTask } = useTask();
  const [description, setDescription] = useState(task?.description || "");  
  const { taskId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (taskId) getSingleTask(taskId);
  }, [taskId]);

  useEffect(() => {
    if (task?.description) setDescription(task.description);
  }, [task]);

  const handleDescriptionClick = () => {
    setIsEditingDescription(true);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDescriptionBlur = () => {
    setIsEditingDescription(false);
    updateTask(task._id, { description });
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    deleteTask(task._id);
    setShowDeleteConfirmation(false);
    router.back();
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[30rem] bg-white shadow-lg overflow-y-auto z-50">
      <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
        <h2 className="text-lg md:text-2xl font-bold truncate">{task?.title || "Loading..."}</h2>
        <Button variant="ghost" className="hover:bg-slate-300" size="sm" onClick={() => router.back()}>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Completion Button */}
        <div className="flex items-center justify-between">
          {task?.isCompleted ? (
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 transition-colors duration-200"
            >
              <Check className="w-4 h-4 mr-1" />
              Completed
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
              onClick={() => updateTask(task._id, { is_completed: 1 })}
            >
              <Check className="w-4 h-4 mr-1" />
              Mark Complete
            </Button>
          )}
        </div>
        
        {/* Assigned User */}
        <div className="flex items-center">
          <StringDP />
          <span className="ml-2 font-semibold truncate">{userData?.name}</span>
          <Button variant="ghost" size="sm" className="ml-auto text-blue-500">
            Recently assigned
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Due Date */}
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-700">{moment(task.dueDate).format('MMM D')}</span>
          <X className="w-4 h-4 ml-2 text-gray-400" />
        </div>

        {/* Description Section */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          {isEditingDescription ? (
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
              className="w-full border rounded-md p-2"
              rows={5}
            />
          ) : (
            <div
              onClick={handleDescriptionClick}
              className="w-full border rounded-md p-2 cursor-pointer min-h-[100px] text-gray-500"
            >
              {description || "Click to add a description..."}
            </div>
          )}
        </div>

      </div>

      {/* Delete Button */}
      <div className="sticky bottom-0 left-0 p-4 bg-white border-t flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 ml-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
          onClick={handleDeleteClick}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete task
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelDelete}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
