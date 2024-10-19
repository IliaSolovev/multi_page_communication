import React, { useEffect, useRef, useState } from "react";
import { LocalStorage } from "~/localStorage";
import { PDFViewer } from "~/components/PDFViewer";
import {
  PDF_ACTION_KEY,
  PDF_ACTIONS,
  SET_FILE_KEY,
} from "~/components/OrgControls/actions";

const storage = new LocalStorage("cube-controls");

const Cube = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const video = useRef<HTMLVideoElement>(null);
  const [PDFPageNumber, setPDFPageNumber] = useState<number>(1);

  // SET file
  useEffect(() => {
    const handleMessage = (data: any) => {
      setFileUrl(data.fileUrl);
      setFileType(data.fileType);
      storage.clearKey(SET_FILE_KEY);

      if (data.fileType === "mp4") {
        setTimeout(() => {
          if (video.current) {
            video.current.play();
          }
        }, 300);
      }
    };

    return storage.listen(SET_FILE_KEY, handleMessage);
  }, []);

  //PDF controls
  useEffect(() => {
    const handleMessage = (data: PDF_ACTIONS) => {
      setPDFPageNumber((v) => (data === PDF_ACTIONS.PREV_PAGE ? v - 1 : v + 1));
      storage.clearKey(PDF_ACTION_KEY);
    };

    return storage.listen(PDF_ACTION_KEY, handleMessage);
  }, []);

  if (fileType === "pdf") {
    return (
      <div className="w-full h-[100vh]">
        <PDFViewer pdfUrl={fileUrl} pageNumber={PDFPageNumber} />
      </div>
    );
  }

  if (fileType === "mp4") {
    return (
      <div>
        <div className="mt-4 h-[100vh]">
          <video width="100%" ref={video}>
            <source src={fileUrl} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }

  return null;
};

export default Cube;
