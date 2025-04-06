
import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardCard } from "@/components/DashboardCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, BookOpen, GraduationCap, LineChart, Users } from "lucide-react";
import { 
  Bar, 
  BarChart as ReBarChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  students, 
  courses, 
  getTotalStudents, 
  getTotalCourses, 
  getAverageAttendance, 
  getAverageGradeAllStudents,
  getAverageGrade
} from "@/lib/data";

const Dashboard = () => {
  const navigate = useNavigate();

  // Prepare data for charts
  const gradeDistribution = [
    { name: "A", count: students.filter(s => s.grade.startsWith("A")).length },
    { name: "B", count: students.filter(s => s.grade.startsWith("B")).length },
    { name: "C", count: students.filter(s => s.grade.startsWith("C")).length },
    { name: "D", count: students.filter(s => s.grade.startsWith("D")).length },
    { name: "F", count: students.filter(s => s.grade.startsWith("F")).length },
  ];

  const courseEnrollment = courses.map(course => ({
    name: course.code,
    students: course.enrolledStudents,
    capacity: course.maxCapacity
  }));

  const studentGrades = students.map(student => ({
    name: `${student.firstName} ${student.lastName}`,
    grade: getAverageGrade(student.id)
  }));

  const attendanceDistribution = [
    { name: "Present", value: students.reduce((sum, s) => sum + s.attendance.present, 0) },
    { name: "Absent", value: students.reduce((sum, s) => sum + s.attendance.absent, 0) },
    { name: "Late", value: students.reduce((sum, s) => sum + s.attendance.late, 0) },
  ];

  const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

  return (
    <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Student Management System</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Students"
          value={getTotalStudents()}
          icon={<Users className="h-4 w-4" />}
          description="Number of enrolled students"
          trend={{ value: 12, isPositive: true }}
          onClick={() => navigate("/students")}
        />
        <DashboardCard
          title="Total Courses"
          value={getTotalCourses()}
          icon={<BookOpen className="h-4 w-4" />}
          description="Available courses this semester"
          trend={{ value: 5, isPositive: true }}
          onClick={() => navigate("/courses")}
        />
        <DashboardCard
          title="Average Attendance"
          value={`${getAverageAttendance()}%`}
          icon={<BarChart className="h-4 w-4" />}
          description="Student attendance rate"
          trend={{ value: 3, isPositive: true }}
          onClick={() => navigate("/attendance")}
        />
        <DashboardCard
          title="Average Grade"
          value={`${getAverageGradeAllStudents()}%`}
          icon={<GraduationCap className="h-4 w-4" />}
          description="Student performance"
          trend={{ value: 2, isPositive: true }}
          onClick={() => navigate("/grades")}
        />
      </div>

      <div className="grid gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
        <Tabs defaultValue="enrollment" className="col-span-2">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="enrollment">Course Enrollment</TabsTrigger>
              <TabsTrigger value="grades">Student Grades</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="enrollment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Enrollment</CardTitle>
                <CardDescription>
                  Current enrollment numbers for each course
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <ReBarChart data={courseEnrollment} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#2563EB" name="Enrolled" />
                    <Bar dataKey="capacity" fill="#E5E7EB" name="Capacity" />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="grades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Grades</CardTitle>
                <CardDescription>
                  Average grades for each student
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <ReLineChart data={studentGrades} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="grade" stroke="#8B5CF6" name="Avg. Grade" />
                  </ReLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>
              Distribution of grades across all students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <RePieChart>
                  <Pie
                    data={attendanceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {attendanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
