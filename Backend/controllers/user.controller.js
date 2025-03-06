import Student from "../model/user.model.js";
import bcrypt from "bcrypt";
// Register a new student
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // Check if the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new student entry
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ name, email, password: hashedPassword, course });
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
