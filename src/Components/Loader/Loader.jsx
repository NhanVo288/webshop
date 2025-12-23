import { LoaderIcon } from "lucide-react";

function Loader() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 160px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoaderIcon size={40} className="animate-spin" />
    </div>
  );
}

export default Loader;
