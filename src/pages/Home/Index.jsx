import React from 'react';
import moment from 'moment';
import { apis } from '../../mockAPIs';

const Index = () => {
  // Get the current hour
  const currentHour = moment().hour();
  
  // Determine the greeting based on the current time
  const greeting = currentHour < 12 ? 'Good Morning' :
                   currentHour < 18 ? 'Good Afternoon' : 
                   'Good Evening';

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Title in the left corner */}
      <h1 className="text-2xl font-bold pl-6 pt-4">Home</h1>
      
      <div className="flex flex-col items-center justify-center mt-5">
        <p className="text-lg text-center mt-2">
          {moment().format('LL')}
        </p>
        <h1 className="text-4xl text-center">
          {greeting} {apis.me.name.split(' ')[0] || 'Dear'}!
        </h1>
      </div>

      {/* Wrapper for the select and tasks */}
      <div className="flex items-center mt-6 p-4 bg-slate-200 shadow-md space-x-4 mx-auto rounded-full">
        <select className="border border-slate-200 bg-slate-200 rounded focus:outline-none focus:ring focus:ring-blue-300">
          <option>My Week</option>
          <option>My Month</option>
        </select>
        <span className="text-gray-700 text-base p-3">
          {5} tasks completed
        </span>
        <span className="text-gray-700 text-base p-3">
          {10} tasks pending
        </span>
      </div>

      {/* Recent Tasks Card */}
      <div className="flex flex-col items-center mt-6 space-y-4 mx-auto max-w-2xl w-full">
        <div className="bg-white p-4 rounded-md shadow-md w-full">
          <h2 className="text-xl font-bold mb-2">Recent Tasks</h2>
          <ul>
            <li>Task 1: Update project documentation</li>
            <li>Task 2: Review PRs</li>
            <li>Task 3: Plan next sprint</li>
          </ul>
        </div>

        {/* Due Tasks Card */}
        <div className="bg-white p-4 rounded-md shadow-md w-full">
          <h2 className="text-xl font-bold mb-2">Due Tasks</h2>
          <ul>
            <li>Task A: Submit budget report</li>
            <li>Task B: Complete design mockups</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
