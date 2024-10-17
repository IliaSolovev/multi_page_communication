import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Button = forwardRef<any>((props: any, ref) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      {...props}
      ref={ref}
    >
      {props.children}
    </button>
  );
});
