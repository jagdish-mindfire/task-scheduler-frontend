import React from 'react'
import { X, ChevronDown, Flag, MessageSquare, UserPlus } from 'lucide-react'
import { Button } from '../../components/Common/Button'

const TaskDetails = ({ task, onClose }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="text-green-500">
            Completed
          </Button>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        This task is visible to everyone in My workspace.
      </div>

      <h2 className="text-2xl font-bold mb-4">{task.title}</h2>

      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold mr-2">
            JP
          </div>
          <span>Jagdish Pal</span>
          <X className="w-4 h-4 ml-2" />
          <span className="ml-2 text-blue-500">Do today</span>
          <ChevronDown className="w-4 h-4 ml-1 text-blue-500" />
        </div>

        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Due date</span>
          <span>{task.dueDate}</span>
          <X className="w-4 h-4 ml-2" />
        </div>

        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Projects</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-sm">tag</span>
          <span className="ml-2">Untitled section</span>
          <ChevronDown className="w-4 h-4 ml-1" />
          <X className="w-4 h-4 ml-2" />
        </div>

        <Button variant="outline" size="sm">
          Add to projects
        </Button>

        <div>
          <h3 className="font-semibold mb-2">Dependencies</h3>
          <Button variant="outline" size="sm">
            Add dependencies
          </Button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Fields</h3>
          <div className="flex items-center">
            <Flag className="w-4 h-4 mr-2" />
            <span>Priority</span>
            <span className="ml-auto">Low</span>
          </div>
        </div>

        <div>
          <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold mr-2">
            JP
          </div>
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full border rounded-md p-2 mt-2"
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Collaborators</h3>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
            <Button variant="ghost" size="sm">
              <UserPlus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="outline" size="sm" className="w-full">
          <MessageSquare className="w-4 h-4 mr-2" />
          Join task
        </Button>
      </div>
    </div>
  )
}

export default TaskDetails