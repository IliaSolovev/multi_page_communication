import React, { forwardRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { Draggable } from "~/components/Draggable";
import { Droppable } from "~/components/Droppable";
import cn from "classnames";

const organizations = [
  { id: 1, name: "Amazon" },
  { id: 2, name: "Apple" },
  { id: 3, name: "Facebook" },
  { id: 4, name: "Google" },
  { id: 5, name: "Microsoft" },
  { id: 6, name: "Twitter" },
  { id: 7, name: "Tesla" },
  { id: 8, name: "Spotify" },
  { id: 9, name: "Netflix" },
  { id: 10, name: "PayPal" },
];

const Item = forwardRef<any>(({ org }, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center w-16 h-16 bg-gray-200 rounded-lg shadow-md hover:scale-110 transition-transform duration-300"
    >
      <p className="mt-2 text-sm font-semibold text-gray-600">{org.name}</p>
    </div>
  );
});

export default function App() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const [droppedItemId, setDroppedItemId] = useState<null | string>(null);
  const droppedItem = organizations.find(
    (org) => String(org.id) === droppedItemId,
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === "droppable") {
      // If dropped inside the drop area, add to dropped items
      setDroppedItemId(String(event.active.id));
    } else {
      // If dropped outside, remove from dropped items
      setDroppedItemId(null);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="p-4 h-full">
        <div className="grid grid-cols-1 gap-6">
          {organizations.map((org) => (
            <>
              {String(org.id) !== droppedItemId && (
                <Draggable
                  id={String(org.id)}
                  key={org.id}
                  className={"w-16 h-16 relative z-10"}
                >
                  <Item org={org} />
                </Draggable>
              )}
            </>
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Droppable>
            <div
              className={cn([
                "w-[160px] h-[160px]",
                "flex justify-center items-center",
                "border-4 border-amber-200 rounded-2xl",
              ])}
            >
              {droppedItem ? (
                <Draggable
                  id={String(droppedItem.id)}
                  key={droppedItem.id}
                  className={"w-16 h-16 relative z-10"}
                >
                  <Item org={droppedItem} />
                </Draggable>
              ) : (
                "Перетащи сюда"
              )}
            </div>
          </Droppable>
        </div>
      </div>
      <DragOverlay>{droppedItem && <Item org={droppedItem} />}</DragOverlay>
    </DndContext>
  );
}
