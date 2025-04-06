
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StudentList } from "@/components/StudentList";
import { StudentDetail } from "@/components/StudentDetail";
import { students, courses, getStudentById } from "@/lib/data";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Students = () => {
  const { id } = useParams<{ id: string }>();
  const student = id ? getStudentById(id) : undefined;
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    grade: "A",
  });

  useEffect(() => {
    // Listen for the custom addStudent event
    const handleAddStudentEvent = () => {
      setIsAddStudentDialogOpen(true);
    };

    document.addEventListener("addStudent", handleAddStudentEvent);

    // Cleanup
    return () => {
      document.removeEventListener("addStudent", handleAddStudentEvent);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleGradeChange = (value: string) => {
    setNewStudent(prev => ({ ...prev, grade: value }));
  };

  const handleAddStudent = () => {
    // In a real app, we would add the student to the database
    // For now, we'll just show a success message and close the dialog
    toast.success("Student added successfully!", {
      description: `${newStudent.firstName} ${newStudent.lastName} has been added to the system.`,
    });
    
    // Reset form and close dialog
    setNewStudent({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      grade: "A",
    });
    setIsAddStudentDialogOpen(false);
  };

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
            <Button 
              className="mt-4 sm:mt-0"
              onClick={() => setIsAddStudentDialogOpen(true)}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>
          <StudentList students={students} />
        </>
      )}

      <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Fill in the student details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={newStudent.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={newStudent.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newStudent.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={newStudent.phone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={newStudent.grade} onValueChange={handleGradeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStudentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStudent}>Save Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
