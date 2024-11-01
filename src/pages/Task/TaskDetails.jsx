import React, { useState, useRef, useContext } from 'react'
import { ArrowRight, X, ChevronDown, Flag, MessageSquare, UserPlus, Calendar, Plus, Link, Trash2, Check } from 'lucide-react'
import { Button } from '../../components/Common/Button'
import { StringDP, apis } from "../../mockAPIs.jsx"
import moment from "moment"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import useTask from "../../hooks/useTask.js"
import { TaskContext } from '../../context/TaskContext.jsx'

const TaskDetails = ({ onClose, onDelete }) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const quillRef = useRef(null)
  
  const { task,setTask } = useContext(TaskContext)
  const { updateTask, deleteTask } = useTask()
  const [description, setDescription] = useState(task?.description || "")

  const handleDescriptionClick = () => {
    setIsEditingDescription(true)
  }

  const handleDescriptionChange = (content) => {
    setDescription(content)
  }

  const handleDescriptionBlur = () => {
    setIsEditingDescription(false)
    console.log('Saved description:', description)
    updateTask(task._id,{description: description});
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = () => {
    deleteTask(task._id)
    setShowDeleteConfirmation(false)
    setTask(null);
    onClose()
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
  }

  return (
    <div className="fixed inset-y-0 right-0 w-[30rem] bg-white shadow-lg overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          {task.isCompleted ? (
            <Button
              variant="outline"
              size="sm"
              className="mr-2 text-green-600 transition-colors duration-200"
            >
              <Check className="w-4 h-4 mr-1" />
              Completed
            </Button>
          ) : (
            <div className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                className="mr-2 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                onClick={() => { updateTask(task._id, { is_completed: 1 }) }}
              >
                <Check className="w-4 h-4 mr-1" />
                Mark Complete
              </Button>
            </div>
          )}
          <Button variant="ghost" className="hover:bg-slate-300" size="sm" onClick={onClose}>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-center">
          <div className="flex items-center flex-1">
            <StringDP />
            <span className="ml-2 font-semibold">{apis.me.name}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-500">
            Recently assigned
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-700">{moment(task.dueDate).format('MMM D')}</span>
          <X className="w-4 h-4 ml-2 text-gray-400" />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Projects</h3>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Plus className="w-4 h-4 mr-2" />
            Add to projects
          </Button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          {isEditingDescription ? (
            <ReactQuill
              ref={quillRef}
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                  ['link'],
                  ['clean']
                ],
              }}
            />
          ) : (
            <div
              onClick={handleDescriptionClick}
              className="w-full border rounded-md p-2 cursor-pointer min-h-[100px] text-gray-500"
              dangerouslySetInnerHTML={{ __html: description || "Click to add a description..." }}
            />
          )}
        </div>

        <div>
          <div className="flex items-center mb-2">
            <StringDP />
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full rounded border-b ml-2 p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Collaborators</h3>
          <div className="flex items-center">
            <StringDP />
            <Button variant="ghost" size="sm">
              <UserPlus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

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
                onClick={(handleConfirmDelete)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskDetails