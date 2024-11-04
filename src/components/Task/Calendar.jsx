import React,{useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


export default function Calendar() {
    const [tasks, setTasks] = useState({
        list: [
          { id: 1, title: 'this is the new task', completed: true, dueDate: '2023-10-01', project: 'Cross-func...', visibility: 'My workspace' },
          { id: 2, title: 'Draft project brief', completed: true, dueDate: '2023-10-24', project: 'Cross-func...', visibility: 'My workspace' },
          { id: 3, title: 'this is another task', completed: false, dueDate: '', project: '', visibility: 'Only me' },
          { id: 4, title: 'this is new task', completed: false, dueDate: '', project: '', visibility: 'Only me' },
        ],
        recentlyAssigned: [
          { id: 'task-1', title: 'Review project proposal', completed: false, dueDate: '2023-10-15' },
          { id: 'task-2', title: 'Update team meeting agenda', completed: true, dueDate: '2023-10-16' },
        ],
        doToday: [
          { id: 'task-3', title: 'Prepare presentation slides', completed: false, dueDate: '2023-10-17' },
          { id: 'task-4', title: 'Send follow-up emails', completed: false, dueDate: '2023-10-17' },
        ],
        doLater: [
          { id: 'task-5', title: 'Research new marketing strategies', completed: false, dueDate: '2023-10-25' },
          { id: 'task-6', title: 'Plan team building activity', completed: false, dueDate: '2023-10-30' },
        ],
      })

    return (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="400px"
          contentHeight="350px"
          events={[
            ...Object.values(tasks).flat().filter(task => task.dueDate).map(task => ({
              title: task.title,
              date: task.dueDate,
            })),
            { title: 'Team Meeting', date: '2024-10-01' },
            { title: 'Product Launch', date: '2023-10-20' },
            { title: 'Client Presentation', date: '2023-10-22' }
          ]}
        />
      )
}
