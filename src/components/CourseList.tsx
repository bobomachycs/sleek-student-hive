
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/EmptyState";
import { BookOpen, Search, Plus } from "lucide-react";
import { Course } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

type CourseListProps = {
  courses: Course[];
  className?: string;
};

export function CourseList({ courses, className }: CourseListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.toLowerCase();
    return (
      course.name.toLowerCase().includes(query) ||
      course.code.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query)
    );
  });

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  if (courses.length === 0) {
    return (
      <EmptyState
        title="No courses found"
        description="There are no courses in the system yet."
        icon={<BookOpen className="h-8 w-8 text-muted-foreground" />}
        actionLabel="Add Course"
        onAction={() => console.log("Add course clicked")}
      />
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Enrollment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
                <TableRow
                  key={course.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.code}</Badge>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{course.schedule.days.join(", ")}</div>
                      <div className="text-muted-foreground">
                        {course.schedule.startTime} - {course.schedule.endTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{course.enrolledStudents}</span>
                        <span className="text-muted-foreground">{course.maxCapacity}</span>
                      </div>
                      <Progress 
                        value={(course.enrolledStudents / course.maxCapacity) * 100} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
