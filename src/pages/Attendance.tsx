
import React from "react";
import { AttendanceTracker } from "@/components/AttendanceTracker";
import { attendanceRecords, courses } from "@/lib/data";

const Attendance = () => {
  return (
    <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
      <AttendanceTracker attendanceRecords={attendanceRecords} courses={courses} />
    </div>
  );
};

export default Attendance;
