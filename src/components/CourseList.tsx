
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
import { BookOpen, Search, Plus, UserPlus, UserMinus } from "lucide-react";
import { Course, Student, getCourseById, students } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

type CourseListProps = {
  courses: Course[];
  className?: string;
};

export function CourseList({ courses, className }: CourseListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [showRemoveStudentDialog, setShowRemoveStudentDialog] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchStudentQuery, setSearchStudentQuery] = useState("");
  const { toast } = useToast();
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

  const handleAddStudentClick = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent course click from triggering
    setSelectedCourse(course);
    setSelectedStudents([]);
    setShowAddStudentDialog(true);
  };

  const handleRemoveStudentClick = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent course click from triggering
    setSelectedCourse(course);
    setSelectedStudents([]);
    setShowRemoveStudentDialog(true);
  };

  const handleAddStudents = () => {
    if (!selectedCourse || selectedStudents.length === 0) return;
    
    // Update course with new students
    const updatedCourse = {
      ...selectedCourse,
      enrolledStudents: Math.min(selectedCourse.enrolledStudents + selectedStudents.length, selectedCourse.maxCapacity)
    };
    
    // In a real app, we would update the database here
    
    // Show toast notification
    toast({
      title: "Students Added",
      description: `${selectedStudents.length} student(s) added to ${selectedCourse.name}`,
    });
    
    setShowAddStudentDialog(false);
  };

  const handleRemoveStudents = () => {
    if (!selectedCourse || selectedStudents.length === 0) return;
    
    // Update course with removed students
    const updatedCourse = {
      ...selectedCourse,
      enrolledStudents: Math.max(selectedCourse.enrolledStudents - selectedStudents.length, 0)
    };
    
    // In a real app, we would update the database here
    
    // Show toast notification
    toast({
      title: "Students Removed",
      description: `${selectedStudents.length} student(s) removed from ${selectedCourse.name}`,
    });
    
    setShowRemoveStudentDialog(false);
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Filter students for add dialog
  const availableStudents = students.filter(student => {
    // Filter by search query
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const query = searchStudentQuery.toLowerCase();
    const matchesSearch = fullName.includes(query) || student.id.toLowerCase().includes(query);
    
    return matchesSearch;
  });

  // Filter students for remove dialog (mock implementation)
  const enrolledStudents = selectedCourse 
    ? students.slice(0, selectedCourse.enrolledStudents) 
    : [];

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
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
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => handleAddStudentClick(course, e)}
                        disabled={course.enrolledStudents >= course.maxCapacity}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => handleRemoveStudentClick(course, e)}
                        disabled={course.enrolledStudents <= 0}
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Students to Course</DialogTitle>
            <DialogDescription>
              {selectedCourse ? `${selectedCourse.name} (${selectedCourse.code})` : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="student-search">Search Students</Label>
              <Input
                id="student-search"
                placeholder="Search by name or ID..."
                value={searchStudentQuery}
                onChange={(e) => setSearchStudentQuery(e.target.value)}
              />
            </div>
            <div>
              <Label>Available Students</Label>
              <ScrollArea className="h-72 border rounded-md">
                <div className="p-4 space-y-2">
                  {availableStudents.length === 0 ? (
                    <p className="text-center text-muted-foreground p-4">No students found</p>
                  ) : (
                    availableStudents.map((student) => (
                      <div key={student.id} className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                        <Checkbox 
                          id={`add-student-${student.id}`} 
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={() => toggleStudentSelection(student.id)}
                        />
                        <div className="flex items-center flex-1">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={student.profileImage} alt={`${student.firstName} ${student.lastName}`} />
                            <AvatarFallback>{getInitials(student.firstName, student.lastName)}</AvatarFallback>
                          </Avatar>
                          <Label htmlFor={`add-student-${student.id}`} className="cursor-pointer flex-1">
                            {student.firstName} {student.lastName} ({student.id})
                          </Label>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Selected: {selectedStudents.length} students
            </div>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                type="submit" 
                onClick={handleAddStudents}
                disabled={selectedStudents.length === 0 || (selectedCourse && selectedCourse.enrolledStudents >= selectedCourse.maxCapacity)}
              >
                Add Students
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Student Dialog */}
      <Dialog open={showRemoveStudentDialog} onOpenChange={setShowRemoveStudentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Students from Course</DialogTitle>
            <DialogDescription>
              {selectedCourse ? `${selectedCourse.name} (${selectedCourse.code})` : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="student-remove-search">Search Enrolled Students</Label>
              <Input
                id="student-remove-search"
                placeholder="Search by name or ID..."
                value={searchStudentQuery}
                onChange={(e) => setSearchStudentQuery(e.target.value)}
              />
            </div>
            <div>
              <Label>Enrolled Students</Label>
              <ScrollArea className="h-72 border rounded-md">
                <div className="p-4 space-y-2">
                  {enrolledStudents.length === 0 ? (
                    <p className="text-center text-muted-foreground p-4">No students enrolled</p>
                  ) : (
                    enrolledStudents.map((student) => (
                      <div key={student.id} className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                        <Checkbox 
                          id={`remove-student-${student.id}`} 
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={() => toggleStudentSelection(student.id)}
                        />
                        <div className="flex items-center flex-1">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={student.profileImage} alt={`${student.firstName} ${student.lastName}`} />
                            <AvatarFallback>{getInitials(student.firstName, student.lastName)}</AvatarFallback>
                          </Avatar>
                          <Label htmlFor={`remove-student-${student.id}`} className="cursor-pointer flex-1">
                            {student.firstName} {student.lastName} ({student.id})
                          </Label>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Selected: {selectedStudents.length} students
            </div>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                type="submit" 
                onClick={handleRemoveStudents}
                disabled={selectedStudents.length === 0}
                variant="destructive"
              >
                Remove Students
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
