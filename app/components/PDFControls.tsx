import { useState } from "react";

export const PDFControls: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<number>(1);

  return (
    <div>
      <input
        type="number"
        value={selectedPage}
        onChange={(e) => setSelectedPage(Number(e.target.value))}
        min="1"
      />
    </div>
  );
};
