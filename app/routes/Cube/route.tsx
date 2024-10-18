import React, { useEffect, useRef, useState } from "react";
import { LocalStorage } from "~/localStorage";

const storage = new LocalStorage("cube-controls");

const Cube = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const pdf = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Listen for messages from the Controls page
    const handleMessage = (data: any) => {
      setFileUrl(data.fileUrl);
      setFileType(data.fileType);

      if (data.fileType === "mp4" && ref.current) {
        setTimeout(() => {
          if (video.current) {
            video.current.play();
          }
        }, 300);
      }
    };

    return storage.listen("file", handleMessage);
  }, []);

  return (
    <div>
      <div className="mt-4 h-[100vh]" ref={ref}>
        {fileType === "pdf" && (
          <iframe
            src={fileUrl}
            width="100%"
            height="100%"
            title={`View ${fileType.toUpperCase()}`}
          />
        )}

        {fileType === "mp4" && (
          <video width="100%" ref={video}>
            <source src={fileUrl} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};

export default Cube;
