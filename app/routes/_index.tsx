import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  useSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
} from "@dnd-kit/core";
import { OrgControls } from "~/components/OrgControls";
import { Org } from "~/types/Org";

// List of organizations
const organizations: Org[] = [
  { id: 1, name: "Amazon" },
  { id: 2, name: "Apple" },
  { id: 3, name: "Facebook" },
  { id: 4, name: "Google" },
  { id: 5, name: "Microsoft" },
  { id: 6, name: "Twitter" },
  { id: 7, name: "Tesla" },
  { id: 8, name: "Spotify" },
  {
    id: 9,
    name: "Netflix",
    files: {
      photoPresent: "media/netflix/present-pdf.pdf",
      textPresent: "media/netflix/present-ppt.ppt",
      video: "media/netflix/video.mp4",
    },
  },
  { id: 10, name: "PayPal" },
];

// Draggable component
const Draggable = ({ id, name, isInDropArea }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isInDropArea ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-move flex items-center justify-center w-24 h-24 bg-gray-200 rounded-lg shadow-md hover:scale-110 "
    >
      <p className="text-sm font-semibold text-gray-600">{name}</p>
    </div>
  );
};

// Droppable Area component
const DroppableArea = ({ children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "droppable-area",
  });

  const style = {
    backgroundColor: isOver ? "lightgreen" : "white",
  };

  return (
    <div
      ref={setNodeRef}
      className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 flex justify-center items-center"
      style={style}
    >
      {children}
    </div>
  );
};

const OrganizationGrid = () => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const [droppedItemId, setDroppedItemId] = useState(null); // Track single dropped item
  const [activeItem, setActiveItem] = useState(null); // Track the currently dragged item

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveItem(organizations.find((org) => org.id === active.id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Only allow dropping if there's no item in the drop area
    if (over && over.id === "droppable-area") {
      if (!droppedItemId) {
        setDroppedItemId(active.id); // Set the item in the drop area if it's empty
      }
    } else {
      // Remove the item from the drop area if dropped elsewhere
      if (droppedItemId === active.id) {
        setDroppedItemId(null);
      }
    }
    setActiveItem(null); // Clear active item after drag
  };

  const handleDragCancel = () => {
    setActiveItem(null); // Clear active item if drag is canceled
  };

  const droppedItem =
    organizations.find((org) => org.id === droppedItemId) || null;
  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        sensors={sensors}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 p-6">
          {organizations.map((org) =>
            String(org.id) !== String(droppedItemId) ? (
              <Draggable
                key={org.id}
                id={org.id}
                name={org.name}
                isInDropArea={false}
              />
            ) : (
              <div key={org.id} className="w-24 h-24 bg-gray-200 opacity-0">
                {org.name}
              </div>
            ),
          )}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-center mb-4">
            Выберите цифровой проект
          </h3>
          <DroppableArea>
            <div className="grid grid-cols-1 gap-6">
              {droppedItem ? (
                <Draggable
                  key={droppedItemId}
                  id={droppedItemId}
                  name={droppedItem.name}
                  isInDropArea={true}
                />
              ) : (
                <p className="text-gray-500">Перетащите проект в эту область</p>
              )}
            </div>
          </DroppableArea>
        </div>

        <DragOverlay>
          {activeItem ? (
            <div className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-lg shadow-md">
              <p className="text-sm font-semibold text-gray-600">
                {activeItem.name}
              </p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      {droppedItem && <OrgControls org={droppedItem} />}
    </>
  );
};

export default OrganizationGrid;
