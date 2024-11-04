import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import useUser from '../../hooks/useUser';
import { greetingText } from '../../utils/greetings';
import { UserContext } from '../../context/UserContext';

const Index = () => {
  // Get the current hour
  const { getUserDetails } = useUser();
  const { userData } = useContext(UserContext);
  const [selectedRange, setSelectedRange] = useState('week');

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col text-black">
      {/* Title in the left corner */}
      <h1 className="text-2xl font-bold pl-6 pt-4">Home</h1>

      <div className="flex flex-col items-center justify-center mt-5">
        <p className="text-lg text-center mt-2 text-gray-400">{moment().format('LL')}</p>
        <h1 className="text-4xl text-center">
          {greetingText()} {userData?.name?.split(' ')[0] || 'Dear'}!
        </h1>
      </div>

      {/* Wrapper for the select and tasks */}
      <div className="flex items-center mt-6 p-4 bg-gray-800 shadow-md space-x-4 mx-auto rounded-full">
        <select className="border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-gray-600">
          <option onClick={() => setSelectedRange('week')}>My Week</option>
          <option onClick={() => setSelectedRange('month')}>My Month</option>
        </select>
        <span className="text-gray-400 text-base p-3">
          {selectedRange === 'week'
            ? userData?.weekTaskCount?.completed
            : userData?.monthTaskCount?.completed}{' '}
          tasks completed
        </span>
        <span className="text-gray-400 text-base p-3">
          {selectedRange === 'week'
            ? userData?.weekTaskCount?.pending
            : userData?.monthTaskCount?.pending}{' '}
          tasks pending
        </span>
      </div>

      {/* Recent Tasks Card */}
      <div className="flex flex-col items-center mt-6 space-y-4 mx-auto max-w-2xl w-full rounded-sm">
        <div className="bg-gray-800 p-4 rounded-md shadow-md w-full">
          <h2 className="text-xl font-bold mb-4 text-white">Recent Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userData?.recentTasks?.map((task, index) => (
              <div
                key={index}
                className="bg-gray-700 border border-gray-600 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <h3 className="font-semibold text-lg mb-2 text-yellow-400">{task.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{task.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Due: {moment(task.dueDate).format('LL')}</span>
                  <button className="bg-yellow-500 text-gray-900 text-sm px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Index;