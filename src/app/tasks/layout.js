"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import TaskDetails from "./[viewType]/[taskId]"; // Correctly import TaskDetails

export default function Layout({ children }) {
  const pathname = usePathname();
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const parts = pathname.split("/");
    const newTaskId = parts.length === 4 ? parts[3] : null; // Only set if taskId exists in URL
    setTaskId(newTaskId);
  }, [pathname]);

  return (
    <div className="flex relative">
      <div className="flex-1">{children}</div>
      {taskId && (
        <div className="absolute top-0 right-0 w-full md:w-1/3 h-full bg-white shadow-lg p-4">
          <TaskDetails taskId={taskId} onClose={() => setTaskId(null)} />
        </div>
      )}
    </div>
  );
}
