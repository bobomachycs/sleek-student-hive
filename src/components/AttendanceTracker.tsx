
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/EmptyState";
import { Calendar as CalendarIcon, Check, Clock, Plus, XCircle } from "lucide-react";
import { AttendanceRecord, Course } from "@/lib/data";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

type AttendanceTrackerProps = {
  attendanceRecords: AttendanceRecord[];
  courses: Course[];
  className?: string;
};

export function AttendanceTracker({ attendanceRecords, courses, className }: AttendanceTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const navigate = useNavigate();

  // Filter attendance records based on selected date and course
  const filteredRecords = attendanceRecords.filter((record) => {
    const recordDate = new Date(record.date);
    const sameDay = selectedDate && 
      recordDate.getDate() === selectedDate.getDate() &&
      recordDate.getMonth() === selectedDate.getMonth() &&
      recordDate.getFullYear() === selectedDate.getFullYear();
    
    return (
      sameDay && 
      (selectedCourse === "" || record.courseId === selectedCourse)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Absent</Badge>;
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Late</Badge>;
      case "excused":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Excused</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Attendance Tracker</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Attendance Record
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Course</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-courses">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-2">
                  <Check className="h-4 w-4 text-green-800" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Present</div>
                  <div className="text-muted-foreground">
                    {filteredRecords.reduce(
                      (sum, record) => sum + record.records.filter(r => r.status === "present").length, 
                      0
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-2">
                  <Clock className="h-4 w-4 text-yellow-800" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Late</div>
                  <div className="text-muted-foreground">
                    {filteredRecords.reduce(
                      (sum, record) => sum + record.records.filter(r => r.status === "late").length, 
                      0
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-2">
                  <XCircle className="h-4 w-4 text-red-800" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Absent</div>
                  <div className="text-muted-foreground">
                    {filteredRecords.reduce(
                      (sum, record) => sum + record.records.filter(r => r.status === "absent").length, 
                      0
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredRecords.length === 0 ? (
        <EmptyState
          title="No attendance records found"
          description={`No attendance records found for ${selectedDate ? format(selectedDate, "PPP") : "the selected date"}`}
          icon={<CalendarIcon className="h-8 w-8 text-muted-foreground" />}
        />
      ) : (
        <div className="space-y-6">
          {filteredRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{record.courseName}</CardTitle>
                  <Badge variant="outline">{format(new Date(record.date), "PPP")}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {record.records.map((studentRecord) => (
                      <TableRow key={studentRecord.studentId}>
                        <TableCell>{studentRecord.studentName}</TableCell>
                        <TableCell>{studentRecord.studentId}</TableCell>
                        <TableCell>{getStatusBadge(studentRecord.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
