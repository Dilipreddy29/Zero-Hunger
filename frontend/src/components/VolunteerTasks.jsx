import React, { useState } from 'react';
import { CheckCircle, MapPin } from 'lucide-react';

const VolunteerTasks = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks ?? []);

  const handleComplete = (id) => {
    const updated = taskList.map((task) =>
      task._id === id ? { ...task, status: 'completed' } : task
    );
    setTaskList(updated);
  };

  if (!taskList || taskList.length === 0) return <p>No tasks assigned yet.</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Volunteer Tasks</h2>
      <ul className="space-y-4">
        {taskList.map((task) => {
          const isActive = task.status === 'pending' || task.status === 'accepted';
          const [lng, lat] = task.location?.coordinates ?? [];

          return (
            <li key={task._id} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{task.foodDescription} from {task.donorName}</p>
                  <p className="text-sm text-gray-600">{task.pickupAddress}</p>
                </div>

                {isActive ? (
                  <div className="flex gap-2">
                    {lat && lng && (
                      <a
                        href={`https://www.google.com/maps?q=${lat},${lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm font-medium flex items-center gap-1"
                      >
                        <MapPin className="w-4 h-4" />
                        View Map
                      </a>
                    )}
                    <button
                      className="text-green-600 text-sm font-medium flex items-center gap-1"
                      onClick={() => handleComplete(task._id)}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Completed
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm italic">Completed</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VolunteerTasks;
