import { Button } from "~/components/Button";
import { Org } from "~/types/Org";
import { LocalStorage } from "~/localStorage";

interface Props {
  org: Org;
}

const storage = new LocalStorage("cube-controls");

export const OrgControls = ({ org }: Props) => {
  // Function to open file in route page
  const handleFileOpen = (fileUrl?: string, fileType?: string) => {
    const data = {
      fileUrl,
      fileType,
    };

    storage.set("file", data);
  };

  return (
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
  );
};
