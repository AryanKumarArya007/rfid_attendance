"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AttendanceTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = () => {
      axios
        .get("http://localhost:5000/attendance")
        .then((res) => setData(res.data))
        .catch((err) => console.error("API Error:", err));
    };

    loadData();
    const interval = setInterval(loadData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Attendance Records
      </h2>

      <div className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
            <tr>
              <th className="p-4 text-gray-700 dark:text-gray-300">Name</th>
              <th className="p-4 text-gray-700 dark:text-gray-300">UID</th>
              <th className="p-4 text-gray-700 dark:text-gray-300">Timestamp</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-900">
            {data.map((item) => (
              <tr
                key={item._id}
                className="border-b last:border-none border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <td className="p-4 text-gray-900 dark:text-gray-200">
                  {item.name}
                </td>
                <td className="p-4 text-gray-900 dark:text-gray-200">
                  {item.uid}
                </td>
                <td className="p-4 text-gray-900 dark:text-gray-200">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  className="p-4 text-gray-500 dark:text-gray-400 text-center"
                  colSpan={3}
                >
                  No attendance yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
