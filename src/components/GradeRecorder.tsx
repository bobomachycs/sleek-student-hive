
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/EmptyState";
import { FileEdit, GraduationCap, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, Student, getAverageGrade } from "@/lib/data";

type GradeRecorderProps = {
  students: Student[];
  courses: Course[];
  className?: string;
};

export function GradeRecorder({ students, courses, className }: GradeRecorderProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("assignments");

  // Filter students and their grades based on selected course
  const studentsInCourse = students.filter(
    student => !selectedCourse || student.courses.includes(selectedCourse)
  );

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-yellow-600";
    if (grade >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getLetterGrade = (grade: number) => {
    if (grade >= 90) return "A";
    if (grade >= 80) return "B";
    if (grade >= 70) return "C";
    if (grade >= 60) return "D";
    return "F";
  };

  const getGradeBadgeColor = (grade: string) => {
    switch (grade.charAt(0)) {
      case "A":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "B":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "C":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "D":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "F":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "";
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Grade Recorder</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Grade
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Select Course
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-full sm:w-[300px]">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name} ({course.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {studentsInCourse.length === 0 ? (
        <EmptyState
          title="No students found"
          description={
            selectedCourse
              ? "No students are enrolled in this course."
              : "Please select a course to view student grades."
          }
          icon={<GraduationCap className="h-8 w-8 text-muted-foreground" />}
        />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>
                {selectedCourse
                  ? `Grades: ${courses.find(c => c.id === selectedCourse)?.name}`
                  : "All Student Grades"}
              </CardTitle>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="tests">Tests</TabsTrigger>
                  <TabsTrigger value="final">Final Grades</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="assignments" className="mt-0">
              {selectedCourse ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      {studentsInCourse[0]?.grades[selectedCourse]?.assignments.map((assignment) => (
                        <TableHead key={assignment.id}>{assignment.name}</TableHead>
                      )) || <TableHead>No Assignments</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsInCourse.map((student) => {
                      const courseGrades = student.grades[selectedCourse];
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.firstName} {student.lastName}
                          </TableCell>
                          {courseGrades?.assignments.map((assignment) => (
                            <TableCell key={assignment.id} className="text-center">
                              <span className={getGradeColor(assignment.score)}>
                                {assignment.score}/{assignment.maxScore}
                              </span>
                            </TableCell>
                          )) || <TableCell>No grades</TableCell>}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Please select a specific course to view assignments.
                </div>
              )}
            </TabsContent>

            <TabsContent value="tests" className="mt-0">
              {selectedCourse ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      {studentsInCourse[0]?.grades[selectedCourse]?.tests.map((test) => (
                        <TableHead key={test.id}>{test.name}</TableHead>
                      )) || <TableHead>No Tests</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsInCourse.map((student) => {
                      const courseGrades = student.grades[selectedCourse];
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.firstName} {student.lastName}
                          </TableCell>
                          {courseGrades?.tests.map((test) => (
                            <TableCell key={test.id} className="text-center">
                              <span className={getGradeColor(test.score)}>
                                {test.score}/{test.maxScore}
                              </span>
                            </TableCell>
                          )) || <TableCell>No grades</TableCell>}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Please select a specific course to view tests.
                </div>
              )}
            </TabsContent>

            <TabsContent value="final" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    {selectedCourse ? (
                      <TableHead>Final Grade</TableHead>
                    ) : (
                      courses.map((course) => (
                        <TableHead key={course.id}>{course.code}</TableHead>
                      ))
                    )}
                    {!selectedCourse && <TableHead>Average</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsInCourse.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.firstName} {student.lastName}
                      </TableCell>
                      {selectedCourse ? (
                        <TableCell>
                          {student.grades[selectedCourse]?.finalGrade ? (
                            <div className="flex items-center">
                              <div className="w-20 mr-4">
                                <Progress
                                  value={student.grades[selectedCourse]?.finalGrade || 0}
                                  className="h-2"
                                />
                              </div>
                              <Badge 
                                className={getGradeBadgeColor(
                                  getLetterGrade(student.grades[selectedCourse]?.finalGrade || 0)
                                )}
                              >
                                {student.grades[selectedCourse]?.finalGrade}% ({
                                  getLetterGrade(student.grades[selectedCourse]?.finalGrade || 0)
                                })
                              </Badge>
                            </div>
                          ) : (
                            <div className="text-muted-foreground">Not graded</div>
                          )}
                        </TableCell>
                      ) : (
                        <>
                          {courses.map((course) => (
                            <TableCell key={course.id}>
                              {student.grades[course.id]?.finalGrade ? (
                                <span className={getGradeColor(student.grades[course.id]?.finalGrade || 0)}>
                                  {student.grades[course.id]?.finalGrade}%
                                </span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          ))}
                          <TableCell>
                            <Badge 
                              className={getGradeBadgeColor(
                                getLetterGrade(getAverageGrade(student.id))
                              )}
                            >
                              {getAverageGrade(student.id)}% ({
                                getLetterGrade(getAverageGrade(student.id))
                              })
                            </Badge>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
