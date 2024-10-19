import React, { useLayoutEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface PDFViewerProps {
  pdfUrl: string;
  pageNumber: number;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, pageNumber }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  // Handle PDF load success
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useLayoutEffect(() => {
    if (rootRef.current) {
      setHeight(rootRef.current.getBoundingClientRect().height);
      setWidth(rootRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div className={"h-full"} ref={rootRef}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} height={height} width={width} />
      </Document>
    </div>
  );
};
