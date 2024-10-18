import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: Props) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
