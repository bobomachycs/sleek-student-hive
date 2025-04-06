
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Book, Calendar, Edit, GraduationCap, Mail, MapPin, Phone, User } from "lucide-react";
import { Student, Course, getCourseById, getAttendancePercentage } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

type StudentDetailProps = {
  student: Student;
  courses: Course[];
  className?: string;
};

export function StudentDetail({ student, courses, className }: StudentDetailProps) {
  const navigate = useNavigate();

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
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
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
              <CardTitle className="text-2xl">
                {student.firstName} {student.lastName}
              </CardTitle>
              <Badge variant="secondary" className={`mt-2 ${getGradeBadgeColor(student.grade)}`}>
                Grade: {student.grade}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">Student ID: {student.id}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Separator />
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
    </div>
  );
}
