import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON bodies

const dbPath = path.resolve("./db.json");

// Helper: Read students from db.json
function readStudents() {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
}

// Helper: Write students to db.json
function writeStudents(students) {
    fs.writeFileSync(dbPath, JSON.stringify(students, null, 2));
}

// ----------------- Routes -----------------

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to Student Management System!");
});

// GET /students - fetch all students
app.get("/students", (req, res) => {
    const students = readStudents();
    res.json(students);
});

// POST /students - add new student
app.post("/students", (req, res) => {
    const students = readStudents();
    const { id, name, course, year } = req.body;

    if (!id || !name || !course || !year) {
        return res.status(400).json({ error: "All student fields are required" });
    }

    if (students.find((s) => s.id === id)) {
        return res.status(400).json({ error: "Student with this ID already exists" });
    }

    const newStudent = { id, name, course, year };
    students.push(newStudent);
    writeStudents(students);

    res.status(201).json({ message: "Student added successfully", student: newStudent });
});

// PUT /students - update student
app.put("/students", (req, res) => {
    const students = readStudents();
    const { id, name, course, year } = req.body;

    const index = students.findIndex((s) => s.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    // Update fields if provided
    if (name) students[index].name = name;
    if (course) students[index].course = course;
    if (year) students[index].year = year;

    writeStudents(students);
    res.json({ message: "Student updated successfully", student: students[index] });
});

// DELETE /students/:id - delete student by ID
app.delete("/students/:id", (req, res) => {
    const students = readStudents();
    const id = parseInt(req.params.id);

    const index = students.findIndex((s) => s.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    const removed = students.splice(index, 1);
    writeStudents(students);

    res.json({ message: "Student deleted successfully", student: removed[0] });
});

// ----------------- Server Start -----------------
app.listen(PORT, () => {
    console.log(`Student Management Server running on http://localhost:${PORT}`);
});
