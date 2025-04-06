
// Mock data for the Student Management System

// Student Data
export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  grade: string;
  address: string;
  enrollmentDate: string;
  profileImage?: string;
  courses: string[];
  attendance: {
    present: number;
    absent: number;
    late: number;
    total: number;
  };
  grades: {
    [courseId: string]: {
      assignments: { id: string; name: string; score: number; maxScore: number }[];
      tests: { id: string; name: string; score: number; maxScore: number }[];
      finalGrade?: number;
    };
  };
};

// Course Data
export type Course = {
  id: string;
  name: string;
  code: string;
  description: string;
  instructor: string;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  room: string;
  enrolledStudents: number;
  maxCapacity: number;
};

// Attendance Record
export type AttendanceRecord = {
  id: string;
  date: string;
  courseId: string;
  courseName: string;
  records: {
    studentId: string;
    studentName: string;
    status: "present" | "absent" | "late" | "excused";
  }[];
};

// Generate mock students
export const students: Student[] = [
  {
    id: "STU001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "2000-05-15",
    gender: "Male",
    grade: "A",
    address: "123 Main St, Anytown, CA 12345",
    enrollmentDate: "2022-09-01",
    profileImage: "/placeholder.svg",
    courses: ["CRS001", "CRS002", "CRS003"],
    attendance: {
      present: 42,
      absent: 3,
      late: 5,
      total: 50,
    },
    grades: {
      "CRS001": {
        assignments: [
          { id: "ASN001", name: "Assignment 1", score: 85, maxScore: 100 },
          { id: "ASN002", name: "Assignment 2", score: 92, maxScore: 100 },
        ],
        tests: [
          { id: "TST001", name: "Midterm", score: 88, maxScore: 100 },
          { id: "TST002", name: "Final", score: 94, maxScore: 100 },
        ],
        finalGrade: 90,
      },
      "CRS002": {
        assignments: [
          { id: "ASN003", name: "Project 1", score: 78, maxScore: 100 },
          { id: "ASN004", name: "Project 2", score: 85, maxScore: 100 },
        ],
        tests: [
          { id: "TST003", name: "Quiz 1", score: 90, maxScore: 100 },
          { id: "TST004", name: "Final Exam", score: 82, maxScore: 100 },
        ],
        finalGrade: 84,
      },
    },
  },
  {
    id: "STU002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    dateOfBirth: "2001-02-28",
    gender: "Female",
    grade: "A+",
    address: "456 Oak Ave, Somewhere, NY 54321",
    enrollmentDate: "2022-09-01",
    profileImage: "/placeholder.svg",
    courses: ["CRS001", "CRS003", "CRS004"],
    attendance: {
      present: 47,
      absent: 1,
      late: 2,
      total: 50,
    },
    grades: {
      "CRS001": {
        assignments: [
          { id: "ASN001", name: "Assignment 1", score: 98, maxScore: 100 },
          { id: "ASN002", name: "Assignment 2", score: 97, maxScore: 100 },
        ],
        tests: [
          { id: "TST001", name: "Midterm", score: 95, maxScore: 100 },
          { id: "TST002", name: "Final", score: 96, maxScore: 100 },
        ],
        finalGrade: 97,
      },
      "CRS003": {
        assignments: [
          { id: "ASN005", name: "Research Paper", score: 92, maxScore: 100 },
          { id: "ASN006", name: "Presentation", score: 95, maxScore: 100 },
        ],
        tests: [
          { id: "TST005", name: "Midterm", score: 94, maxScore: 100 },
          { id: "TST006", name: "Final Exam", score: 97, maxScore: 100 },
        ],
        finalGrade: 95,
      },
    },
  },
  {
    id: "STU003",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    phone: "(555) 456-7890",
    dateOfBirth: "1999-11-10",
    gender: "Male",
    grade: "B+",
    address: "789 Pine Ln, Elsewhere, TX 67890",
    enrollmentDate: "2022-09-01",
    profileImage: "/placeholder.svg",
    courses: ["CRS002", "CRS003", "CRS005"],
    attendance: {
      present: 40,
      absent: 5,
      late: 5,
      total: 50,
    },
    grades: {
      "CRS002": {
        assignments: [
          { id: "ASN003", name: "Project 1", score: 82, maxScore: 100 },
          { id: "ASN004", name: "Project 2", score: 79, maxScore: 100 },
        ],
        tests: [
          { id: "TST003", name: "Quiz 1", score: 85, maxScore: 100 },
          { id: "TST004", name: "Final Exam", score: 80, maxScore: 100 },
        ],
        finalGrade: 82,
      },
      "CRS003": {
        assignments: [
          { id: "ASN005", name: "Research Paper", score: 88, maxScore: 100 },
          { id: "ASN006", name: "Presentation", score: 85, maxScore: 100 },
        ],
        tests: [
          { id: "TST005", name: "Midterm", score: 83, maxScore: 100 },
          { id: "TST006", name: "Final Exam", score: 80, maxScore: 100 },
        ],
        finalGrade: 84,
      },
    },
  },
  {
    id: "STU004",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.w@example.com",
    phone: "(555) 234-5678",
    dateOfBirth: "2000-08-20",
    gender: "Female",
    grade: "A-",
    address: "321 Maple Dr, Nowhere, WA 13579",
    enrollmentDate: "2022-09-01",
    profileImage: "/placeholder.svg",
    courses: ["CRS001", "CRS004", "CRS005"],
    attendance: {
      present: 45,
      absent: 2,
      late: 3,
      total: 50,
    },
    grades: {
      "CRS001": {
        assignments: [
          { id: "ASN001", name: "Assignment 1", score: 90, maxScore: 100 },
          { id: "ASN002", name: "Assignment 2", score: 88, maxScore: 100 },
        ],
        tests: [
          { id: "TST001", name: "Midterm", score: 92, maxScore: 100 },
          { id: "TST002", name: "Final", score: 89, maxScore: 100 },
        ],
        finalGrade: 90,
      },
      "CRS004": {
        assignments: [
          { id: "ASN007", name: "Lab Report 1", score: 88, maxScore: 100 },
          { id: "ASN008", name: "Lab Report 2", score: 92, maxScore: 100 },
        ],
        tests: [
          { id: "TST007", name: "Lab Exam", score: 90, maxScore: 100 },
          { id: "TST008", name: "Theory Exam", score: 87, maxScore: 100 },
        ],
        finalGrade: 89,
      },
    },
  },
  {
    id: "STU005",
    firstName: "David",
    lastName: "Brown",
    email: "david.b@example.com",
    phone: "(555) 876-5432",
    dateOfBirth: "2001-04-05",
    gender: "Male",
    grade: "B",
    address: "654 Cedar St, Anywhere, FL 97531",
    enrollmentDate: "2022-09-01",
    profileImage: "/placeholder.svg",
    courses: ["CRS002", "CRS004", "CRS005"],
    attendance: {
      present: 38,
      absent: 8,
      late: 4,
      total: 50,
    },
    grades: {
      "CRS002": {
        assignments: [
          { id: "ASN003", name: "Project 1", score: 75, maxScore: 100 },
          { id: "ASN004", name: "Project 2", score: 80, maxScore: 100 },
        ],
        tests: [
          { id: "TST003", name: "Quiz 1", score: 78, maxScore: 100 },
          { id: "TST004", name: "Final Exam", score: 82, maxScore: 100 },
        ],
        finalGrade: 79,
      },
      "CRS004": {
        assignments: [
          { id: "ASN007", name: "Lab Report 1", score: 80, maxScore: 100 },
          { id: "ASN008", name: "Lab Report 2", score: 83, maxScore: 100 },
        ],
        tests: [
          { id: "TST007", name: "Lab Exam", score: 79, maxScore: 100 },
          { id: "TST008", name: "Theory Exam", score: 81, maxScore: 100 },
        ],
        finalGrade: 81,
      },
    },
  },
];

// Generate mock courses
export const courses: Course[] = [
  {
    id: "CRS001",
    name: "Introduction to Computer Science",
    code: "CS101",
    description: "Fundamentals of computer science including programming basics and algorithmic thinking.",
    instructor: "Dr. Alan Turing",
    schedule: {
      days: ["Monday", "Wednesday"],
      startTime: "09:00",
      endTime: "10:30",
    },
    room: "Science Building 101",
    enrolledStudents: 28,
    maxCapacity: 35,
  },
  {
    id: "CRS002",
    name: "Web Development",
    code: "CS220",
    description: "Modern web development techniques and frameworks including HTML, CSS, and JavaScript.",
    instructor: "Prof. Ada Lovelace",
    schedule: {
      days: ["Tuesday", "Thursday"],
      startTime: "13:00",
      endTime: "14:30",
    },
    room: "Tech Center 305",
    enrolledStudents: 25,
    maxCapacity: 30,
  },
  {
    id: "CRS003",
    name: "Data Structures and Algorithms",
    code: "CS201",
    description: "Advanced data structures, algorithm design and analysis techniques.",
    instructor: "Dr. Donald Knuth",
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      startTime: "11:00",
      endTime: "12:00",
    },
    room: "Science Building 205",
    enrolledStudents: 22,
    maxCapacity: 25,
  },
  {
    id: "CRS004",
    name: "Database Systems",
    code: "CS330",
    description: "Database design, data modeling, SQL, and database management systems.",
    instructor: "Prof. Edgar Codd",
    schedule: {
      days: ["Tuesday", "Thursday"],
      startTime: "15:00",
      endTime: "16:30",
    },
    room: "Tech Center 210",
    enrolledStudents: 20,
    maxCapacity: 30,
  },
  {
    id: "CRS005",
    name: "Artificial Intelligence",
    code: "CS440",
    description: "Introduction to AI concepts, machine learning, and natural language processing.",
    instructor: "Dr. Geoffrey Hinton",
    schedule: {
      days: ["Wednesday", "Friday"],
      startTime: "14:00",
      endTime: "15:30",
    },
    room: "AI Lab 110",
    enrolledStudents: 18,
    maxCapacity: 20,
  },
];

// Generate mock attendance records
export const attendanceRecords: AttendanceRecord[] = [
  {
    id: "ATT001",
    date: "2023-03-01",
    courseId: "CRS001",
    courseName: "Introduction to Computer Science",
    records: [
      { studentId: "STU001", studentName: "John Doe", status: "present" },
      { studentId: "STU002", studentName: "Jane Smith", status: "present" },
      { studentId: "STU004", studentName: "Emily Williams", status: "present" },
    ],
  },
  {
    id: "ATT002",
    date: "2023-03-02",
    courseId: "CRS002",
    courseName: "Web Development",
    records: [
      { studentId: "STU001", studentName: "John Doe", status: "present" },
      { studentId: "STU003", studentName: "Michael Johnson", status: "late" },
      { studentId: "STU005", studentName: "David Brown", status: "absent" },
    ],
  },
  {
    id: "ATT003",
    date: "2023-03-03",
    courseId: "CRS003",
    courseName: "Data Structures and Algorithms",
    records: [
      { studentId: "STU002", studentName: "Jane Smith", status: "present" },
      { studentId: "STU003", studentName: "Michael Johnson", status: "present" },
    ],
  },
  {
    id: "ATT004",
    date: "2023-03-06",
    courseId: "CRS001",
    courseName: "Introduction to Computer Science",
    records: [
      { studentId: "STU001", studentName: "John Doe", status: "late" },
      { studentId: "STU002", studentName: "Jane Smith", status: "present" },
      { studentId: "STU004", studentName: "Emily Williams", status: "present" },
    ],
  },
  {
    id: "ATT005",
    date: "2023-03-07",
    courseId: "CRS004",
    courseName: "Database Systems",
    records: [
      { studentId: "STU004", studentName: "Emily Williams", status: "present" },
      { studentId: "STU005", studentName: "David Brown", status: "present" },
    ],
  },
];

// Helper function to get a student by ID
export function getStudentById(id: string): Student | undefined {
  return students.find(student => student.id === id);
}

// Helper function to get a course by ID
export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id);
}

// Helper function to get the attendance percentage for a student
export function getAttendancePercentage(studentId: string): number {
  const student = getStudentById(studentId);
  if (!student) return 0;
  
  const { present, total } = student.attendance;
  return Math.round((present / total) * 100);
}

// Helper function to get the average grade for a student
export function getAverageGrade(studentId: string): number {
  const student = getStudentById(studentId);
  if (!student) return 0;
  
  const grades = Object.values(student.grades)
    .filter(course => course.finalGrade !== undefined)
    .map(course => course.finalGrade as number);
  
  if (grades.length === 0) return 0;
  return Math.round(grades.reduce((sum, grade) => sum + grade, 0) / grades.length);
}

// Helper functions for dashboard metrics
export function getTotalStudents(): number {
  return students.length;
}

export function getTotalCourses(): number {
  return courses.length;
}

export function getAverageAttendance(): number {
  return Math.round(
    students.reduce((sum, student) => {
      const percentage = (student.attendance.present / student.attendance.total) * 100;
      return sum + percentage;
    }, 0) / students.length
  );
}

export function getAverageGradeAllStudents(): number {
  const grades = students.map(student => getAverageGrade(student.id));
  return Math.round(grades.reduce((sum, grade) => sum + grade, 0) / grades.length);
}
