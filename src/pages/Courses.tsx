
import React, { useState } from "react";
import { CourseList } from "@/components/CourseList";
import { courses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Courses = () => {
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const { toast } = useToast();

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would add the course to the database
    
    toast({
      title: "Course Added",
      description: "The course has been added successfully.",
    });
    
    setShowAddCourseDialog(false);
  };

  return (
    <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Manage and view course information</p>
        </div>
        <Button 
          className="mt-4 sm:mt-0"
          onClick={() => setShowAddCourseDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>
      <CourseList courses={courses} />

      {/* Add Course Dialog */}
      <Dialog open={showAddCourseDialog} onOpenChange={setShowAddCourseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Enter the details for the new course.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCourse}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="course-name">Course Name</Label>
                <Input
                  id="course-name"
                  placeholder="Introduction to Programming"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="course-code">Course Code</Label>
                  <Input
                    id="course-code"
                    placeholder="CS101"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="max-capacity">Max Capacity</Label>
                  <Input
                    id="max-capacity"
                    type="number"
                    placeholder="30"
                    min="1"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  placeholder="Dr. John Smith"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="A brief description of the course"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Course</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Courses;
