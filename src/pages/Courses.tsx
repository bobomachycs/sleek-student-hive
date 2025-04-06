
import React from "react";
import { CourseList } from "@/components/CourseList";
import { courses } from "@/lib/data";

const Courses = () => {
  return (
    <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Manage and view course information</p>
        </div>
      </div>
      <CourseList courses={courses} />
    </div>
  );
};

export default Courses;
