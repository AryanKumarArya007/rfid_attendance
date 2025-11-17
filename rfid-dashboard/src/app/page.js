import Image from "next/image";
import AttendanceTable from "./components/AttendanceTable";

export default function Home() {
  return (
    <main>
      <div className="max-w-4xl mx-auto mt-6">
        <AttendanceTable />
      </div>
    </main>
  );
}
