const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentNotesDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Import Model
const Note = require("./models/Note");


// =============================
// 1. ADD NOTE
// =============================
app.post("/notes", async (req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            subject: req.body.subject,
            description: req.body.description
        });

        await newNote.save();
        res.json({ message: "Note added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// =============================
// 2. VIEW NOTES
// =============================
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// =============================
// 3. UPDATE NOTE
// =============================
app.put("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            }
        );
        res.json({ message: "Note updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// =============================
// 4. DELETE NOTE
// =============================
app.delete("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});