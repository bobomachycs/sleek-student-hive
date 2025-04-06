
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
import { EmptyState } from "@/components/EmptyState";
import { Search, UserPlus, Users, ChevronRight } from "lucide-react";
import { Student } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

type StudentListProps = {
  students: Student[];
  className?: string;
};

export function StudentList({ students, className }: StudentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Filter students based on search query
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.id.toLowerCase().includes(query)
    );
  });

  const handleStudentClick = (studentId: string) => {
    navigate(`/students/${studentId}`);
  };

  const handleAddStudent = () => {
    // Dispatch a custom event that the parent component can listen for
    const event = new CustomEvent("addStudent", { bubbles: true });
    document.dispatchEvent(event);
  };

  if (students.length === 0) {
    return (
      <EmptyState
        title="No students found"
        description="There are no students in the system yet."
        icon={<Users className="h-8 w-8 text-muted-foreground" />}
        actionLabel="Add Student"
        onAction={handleAddStudent}
      />
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
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

  // Mobile card view component
  const StudentCard = ({ student }: { student: Student }) => (
    <Card 
      key={student.id} 
      className="mb-3 cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => handleStudentClick(student.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={student.profileImage} alt={`${student.firstName} ${student.lastName}`} />
              <AvatarFallback>{getInitials(student.firstName, student.lastName)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="font-medium">{student.firstName} {student.lastName}</div>
              <div className="text-sm text-muted-foreground">{student.id}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={getGradeBadgeColor(student.grade)}>
              {student.grade}
            </Badge>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="w-full sm:w-auto" onClick={handleAddStudent}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {isMobile ? (
        // Mobile view - cards
        <div className="space-y-2">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No students found matching your search.
            </div>
          ) : (
            filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))
          )}
        </div>
      ) : (
        // Desktop view - table
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleStudentClick(student.id)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={student.profileImage} alt={`${student.firstName} ${student.lastName}`} />
                          <AvatarFallback>{getInitials(student.firstName, student.lastName)}</AvatarFallback>
                        </Avatar>
                        {student.firstName} {student.lastName}
                      </div>
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getGradeBadgeColor(student.grade)}>
                        {student.grade}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
