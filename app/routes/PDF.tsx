import { PDFViewer } from "~/components/PDFViewer";

const PDF = () => {
  const pdfUrl = "http://localhost:5173/media/netflix/present-pdf.pdf"; // Replace with your PDF URL

  return (
    <div className="w-full h-[100vh]">
      <PDFViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default PDF;
