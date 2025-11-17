import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { Attendance } from "./models/Attendance.js";   // <-- FIXED: named import

const port = new SerialPort({
  path: "COM7", // your port
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

port.on("open", () => console.log("Serial port opened"));

let lastUID = "";
let lastName = "";

parser.on("data", async (line) => {
  const text = line.toString().trim();
  console.log("Raw:", text);

  // First line: RFID Tag UID: ...
  if (text.startsWith("RFID Tag UID:")) {
    lastUID = text.replace("RFID Tag UID:", "").trim();
    return;
  }

  // Second line: Name: ...
  if (text.startsWith("Name:")) {
    lastName = text.replace("Name:", "").trim();

    try {
      const entry = new Attendance({
        uid: lastUID,
        name: lastName,
      });

      await entry.save();
      console.log("Saved →", lastUID, lastName);

      // Reset values after save
      lastUID = "";
      lastName = "";
    } catch (err) {
      console.error("DB Save Error:", err);
    }
  }
});

export default {};
