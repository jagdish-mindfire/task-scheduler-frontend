import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Section = styled.div`
  width: 30%;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 8px;
  min-height: 200px;
`;

const Title = styled.h2`
  text-align: center;
`;

const Card = styled.div`
  margin: 8px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`;

const DragAndDrop = () => {
  const [sections, setSections] = useState({
    'recentlyAssigned': [
      { id: 'task1', content: 'Task 1' },
      { id: 'task2', content: 'Task 2' },
    ],
    'doToday': [
      { id: 'task3', content: 'Task 3' },
    ],
    'doLater': [
      { id: 'task4', content: 'Task 4' },
    ],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceList = Array.from(sections[source.droppableId]);
    const [removed] = sourceList.splice(source.index, 1);

    const destinationList = Array.from(sections[destination.droppableId]);
    destinationList.splice(destination.index, 0, removed);

    setSections({
      ...sections,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {Object.entries(sections).map(([sectionId, tasks]) => (
          <Droppable droppableId={sectionId} key={sectionId}>
            {(provided) => (
              <Section {...provided.droppableProps} ref={provided.innerRef}>
                <Title>{sectionId.replace(/([A-Z])/g, ' $1').trim()}</Title>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {task.content}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Section>
            )}
          </Droppable>
        ))}
      </Container>
    </DragDropContext>
  );
};

export default DragAndDrop;
