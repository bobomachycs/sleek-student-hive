
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Book, Calendar, Check, Edit, GraduationCap, Mail, MapPin, Phone, User, X } from "lucide-react";
import { Student, Course, getCourseById, getAttendancePercentage } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type StudentDetailProps = {
  student: Student;
  courses: Course[];
  className?: string;
};

export function StudentDetail({ student: initialStudent, courses, className }: StudentDetailProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student, setStudent] = useState<Student>(initialStudent);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Student>(initialStudent);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getGradeBadgeColor = (grade: string) => {
    switch (grade.charAt(0)) {
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-blue-100 text-blue-800";
      case "C":
        return "bg-yellow-100 text-yellow-800";
      case "D":
        return "bg-orange-100 text-orange-800";
      case "F":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGradeChange = (value: string) => {
    setEditedStudent((prev) => ({
      ...prev,
      grade: value,
    }));
  };

  const handleSaveChanges = () => {
    // In a real app, we would send changes to the server
    setStudent(editedStudent);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Student information has been updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    if (JSON.stringify(editedStudent) !== JSON.stringify(student)) {
      setIsConfirmDialogOpen(true);
    } else {
      setIsEditing(false);
      setEditedStudent(student);
    }
  };

  const confirmCancel = () => {
    setIsEditing(false);
    setEditedStudent(student);
    setIsConfirmDialogOpen(false);
  };

  const attendancePercentage = getAttendancePercentage(student.id);
  const studentCourses = student.courses.map(courseId => getCourseById(courseId)).filter(Boolean) as Course[];

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Student Profile</h1>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              <Check className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={student.profileImage} alt={`${student.firstName} ${student.lastName}`} />
                <AvatarFallback className="text-2xl">{getInitials(student.firstName, student.lastName)}</AvatarFallback>
              </Avatar>
              {isEditing ? (
                <div className="space-y-2 w-full">
                  <div className="flex gap-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={editedStudent.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={editedStudent.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="studentGrade">Grade</Label>
                    <Select value={editedStudent.grade} onValueChange={handleGradeChange}>
                      <SelectTrigger id="studentGrade">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="C+">C+</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="C-">C-</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <>
                  <CardTitle className="text-2xl">
                    {student.firstName} {student.lastName}
                  </CardTitle>
                  <Badge variant="secondary" className={`mt-2 ${getGradeBadgeColor(student.grade)}`}>
                    Grade: {student.grade}
                  </Badge>
                </>
              )}
              <p className="text-sm text-muted-foreground mt-1">Student ID: {student.id}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Separator />
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={editedStudent.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={editedStudent.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={editedStudent.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{student.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{student.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{student.gender}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">DOB: {formatDate(student.dateOfBirth)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{student.address}</span>
                  </div>
                </>
              )}
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Attendance</h3>
                <Progress value={attendancePercentage} className="h-2" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs">{attendancePercentage}%</span>
                  <span className="text-xs text-muted-foreground">
                    {student.attendance.present} / {student.attendance.total} days
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Courses and Grades */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="courses">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Academic Information</CardTitle>
                <TabsList>
                  <TabsTrigger value="courses">
                    <Book className="h-4 w-4 mr-2" />
                    Courses
                  </TabsTrigger>
                  <TabsTrigger value="grades">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Grades
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="courses" className="mt-0">
                <div className="space-y-4">
                  {studentCourses.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No courses enrolled</p>
                  ) : (
                    studentCourses.map((course) => (
                      <div key={course.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <h3 className="font-medium">{course.name}</h3>
                            <p className="text-sm text-muted-foreground">Code: {course.code}</p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <Badge variant="outline">{course.instructor}</Badge>
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          <p>{course.schedule.days.join(", ")} • {course.schedule.startTime} - {course.schedule.endTime}</p>
                          <p className="text-muted-foreground">{course.room}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="grades" className="mt-0">
                <div className="space-y-6">
                  {Object.entries(student.grades).length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No grades available</p>
                  ) : (
                    Object.entries(student.grades).map(([courseId, gradeInfo]) => {
                      const course = getCourseById(courseId);
                      return (
                        <div key={courseId} className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">{course?.name || courseId}</h3>
                          
                          {gradeInfo.assignments.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2">Assignments</h4>
                              <div className="space-y-2">
                                {gradeInfo.assignments.map((assignment) => (
                                  <div key={assignment.id} className="flex justify-between items-center text-sm">
                                    <span>{assignment.name}</span>
                                    <span className="font-medium">{assignment.score}/{assignment.maxScore}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {gradeInfo.tests.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2">Tests/Exams</h4>
                              <div className="space-y-2">
                                {gradeInfo.tests.map((test) => (
                                  <div key={test.id} className="flex justify-between items-center text-sm">
                                    <span>{test.name}</span>
                                    <span className="font-medium">{test.score}/{test.maxScore}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {gradeInfo.finalGrade !== undefined && (
                            <div className="flex justify-between items-center border-t pt-2 mt-2">
                              <span className="font-medium">Final Grade</span>
                              <Badge className={getGradeBadgeColor(student.grade)}>
                                {gradeInfo.finalGrade}%
                              </Badge>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to discard them?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsConfirmDialogOpen(false)}>No, continue editing</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>Yes, discard changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
