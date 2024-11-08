import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const DragAndDrop = () => {
  const [sections, setSections] = useState({
    recentlyAssigned: [
    ],
    doToday: [],
    doLater: [],
  })

  const onDragEnd = (result) => {
    const { source, destination } = result

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const sourceList = Array.from(sections[source.droppableId])
    const [removed] = sourceList.splice(source.index, 1)

    const destinationList = Array.from(sections[destination.droppableId])
    destinationList.splice(destination.index, 0, removed)

    setSections({
      ...sections,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between p-5">
        {Object.entries(sections).map(([sectionId, tasks]) => (
          <Droppable droppableId={sectionId} key={sectionId}>
            {(provided) => (
              <div
                className="w-1/3 p-4 bg-gray-100 rounded-lg min-h-[200px]"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-center font-semibold capitalize">
                  {sectionId.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="my-2 p-4 bg-white rounded-md shadow-md"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

export default DragAndDrop
