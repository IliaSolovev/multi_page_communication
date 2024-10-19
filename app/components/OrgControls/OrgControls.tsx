import { Button } from "~/components/Button";
import { Org } from "~/types/Org";
import { LocalStorage } from "~/localStorage";
import React, { useState } from "react";
import {
  PDF_ACTION_KEY,
  PDF_ACTIONS,
  SET_FILE_KEY,
} from "~/components/OrgControls/actions";

interface Props {
  org: Org;
}

const storage = new LocalStorage("cube-controls");

export const OrgControls = ({ org }: Props) => {
  const [controlsType, setControlsType] = useState<string | null>(null);

  const handleFileOpen = (fileUrl?: string, fileType?: string) => {
    const data = {
      fileUrl,
      fileType,
    };
    setControlsType(fileType);
    storage.set(SET_FILE_KEY, data);
  };

  const nextPageCubeTab = () => {
    storage.set(PDF_ACTION_KEY, PDF_ACTIONS.NEXT_PAGE);
  };

  const prevPageCubeTab = () => {
    storage.set(PDF_ACTION_KEY, PDF_ACTIONS.PREV_PAGE);
  };

  return (
    <>
      <div className="p-4 flex justify-between">
        <Button onClick={() => handleFileOpen(org.files?.photoPresent, "pdf")}>
          Запустить презентацию с фото
        </Button>
        <Button onClick={() => handleFileOpen(org.files?.textPresent, "pdf")}>
          Запустить презентацию с текстом
        </Button>
        <Button onClick={() => handleFileOpen(org.files?.video, "mp4")}>
          Запустить видеоролик
        </Button>
      </div>
      {controlsType === "pdf" && (
        <div className={"p-4 flex justify-center gap-4"}>
          <Button onClick={prevPageCubeTab}>Пред слайд</Button>
          <Button onClick={nextPageCubeTab}>След слайд</Button>
        </div>
      )}
    </>
  );
};
