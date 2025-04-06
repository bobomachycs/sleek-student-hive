
import React from "react";
import { GradeRecorder } from "@/components/GradeRecorder";
import { students, courses } from "@/lib/data";

const Grades = () => {
  return (
    <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
      <GradeRecorder students={students} courses={courses} />
    </div>
  );
};

export default Grades;
