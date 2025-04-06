
import React from "react";
import { useParams } from "react-router-dom";
import { StudentList } from "@/components/StudentList";
import { StudentDetail } from "@/components/StudentDetail";
import { students, courses, getStudentById } from "@/lib/data";

const Students = () => {
  const { id } = useParams<{ id: string }>();
  const student = id ? getStudentById(id) : undefined;

  return (
    <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
      {student ? (
        <StudentDetail student={student} courses={courses} />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Students</h1>
              <p className="text-muted-foreground">Manage and view student information</p>
            </div>
          </div>
          <StudentList students={students} />
        </>
      )}
    </div>
  );
};

export default Students;
