'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Page from './[viewType]/page';

export default function Layout({ children }) {
  const pathname = usePathname();
  const [taskId, setTaskId] = useState(false);

  useEffect(() => {
    const parts = pathname.split('/');
    const newTaskId = parts.length === 4 ? parts[3] : null; // Only set if taskId exists in URL
    setTaskId(newTaskId);
  }, [pathname]);

  return (
    <>
      {taskId && <Page />}
      {children}
    </>
  );
}
