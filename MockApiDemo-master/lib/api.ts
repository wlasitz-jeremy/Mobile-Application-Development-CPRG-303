// ---------- Type Definitions ----------

// Shape of the data shown on the dashboard home screen.
export type DashboardData = {
  studentName: string; // Name of the logged-in student
  nextDeadline: string; // Text describing the next upcoming deadline
  attendanceText: string; // Text describing weekly attendance
};

// Shape of a single course object.
export type Course = {
  id: string; // Unique identifier, also used in the route (e.g. "cprg216")
  code: string; // Human-readable course code (e.g. "CPRG 216")
  title: string; // Full course name
  instructor: string; // Instructor's name
  schedule: string; // When the class meets
  grade: number | null; // Numeric grade, or null if not yet graded
  announcements: string[]; // List of announcement messages (may be empty)
};

// ---------- Debug / Test Flags ----------

// When true, every API function will throw an error (useful for testing error states).
const SHOULD_FAIL = false;

// When true, getCourses() returns an empty array (useful for testing empty states).
const RETURN_EMPTY_COURSES = false;

// ---------- Mock Database ----------

// Static list of courses that stands in for a real backend/database.
const COURSES: Course[] = [
  {
    id: "cprg216",
    code: "CPRG 216",
    title: "Object-Oriented Programming",
    instructor: "John Doe",
    schedule: "Monday and Wednesday, 9:00 AM",
    grade: 84,
    announcements: [
      "Assignment 3 is due Friday.",
      "Review unit 4 before the next class.",
    ],
  },
  {
    id: "cprg303",
    code: "CPRG 303",
    title: "Mobile Application Development",
    instructor: "Dr. Hamdy Ibrahim",
    schedule: "Tuesday and Thursday, 1:00 PM",
    grade: 91,
    announcements: [
      "Week 11 focuses on API calls and loading states.",
      "Complete the pull-to-refresh activity.",
    ],
  },
  {
    id: "cprg306",
    code: "CPRG 306",
    title: "Web Development 2",
    instructor: "Dr. Hamdy Ibrahim",
    schedule: "Wednesday, 08:00 AM -Friday, 03:00 PM",
    grade: null, // Not graded yet
    announcements: [], // No announcements for this course
  },
];

// ---------- Helper Functions ----------

// Simulates network latency by resolving after the given number of milliseconds.
// This lets the UI show loading spinners realistically.
// delay is a function with milliseconds parameter with 800 as default value
// It returns a Promise that resolves after the specified delay
function delay(milliseconds = 800): Promise<void> {
  /*
  - new Promise(...) creates a Promise in the "pending" state immediately.
  - The function passed in is called the **executor** and runs synchronously right away. 
  - It receives two callbacks:
     - `resolve` → call this when the async work succeeds
     - `reject`  → call this when the async work fails (unused here)
      
  - setTimeout(callback, ms) schedules `callback` to run after `ms` milliseconds have passed. 
        - Here the callback is `resolve`, so when the timer fires, the Promise transitions from "pending" to "fulfilled".
        - Because `resolve` is passed as a reference (not called with `resolve()`), the Promise resolves with `undefined` — which matches the `Promise<void>`
          return type. The `void` type means "resolves but carries no value."
    
    Note: `setTimeout` does NOT block the JS thread. The rest of the program keeps running while the timer counts down, which is why this is
           a realistic stand-in for a real network call.
  */
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Throws a fake network error when the SHOULD_FAIL flag is enabled.
// Used to test how the UI handles failures.
function maybeThrow(): void {
  if (SHOULD_FAIL) {
    throw new Error("Network request failed. Please try again.");
  }
}

// ---------- API Functions ----------

// Returns the dashboard summary data.
// Simulates a network request, optionally fails, then returns mock data.
export async function getDashboard(): Promise<DashboardData> {
  await delay(); // Simulate network latency
  maybeThrow(); // Optionally throw an error

  return {
    studentName: "Hamdy Ibrahim",
    nextDeadline: "CPRG 303 API activity due Friday",
    attendanceText: "You attended 3 of 4 classes this week",
  };
}

// Returns the full list of courses.
// Returns an empty array instead of the mock data if RETURN_EMPTY_COURSES is true.
export async function getCourses(): Promise<Course[]> {
  await delay();
  maybeThrow();

  return RETURN_EMPTY_COURSES ? [] : COURSES;
}

// Returns a single course matching the given id, or null if no match is found.
// The null return lets the UI show a "course not found" state.
export async function getCourseById(id: string): Promise<Course | null> {
  await delay();
  maybeThrow();

  return COURSES.find((course) => course.id === id) ?? null;
}
