import { useDraggable } from "@dnd-kit/core";

interface Props {
  id: string;
  children?: React.ReactNode;
  className?: string;
}

export const Draggable = ({ id, children, className }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        cursor: isDragging ? "grabbing" : "grab",
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={className}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};
