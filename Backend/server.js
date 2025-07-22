require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const {protect} = require("./middlewares/authMiddlewares");
const {generateInterviewQuestions, generateConceptExplanation} = require("./controllers/aiController");

const app = express();

// Middleware to handle cors
app.use(
    cors({
        origin:"*",
        methods:["GET","POST","DELETE","PUT"],
        allowedHeaders:["content-Type","Authorization"],
    })
);

connectDB()

//Middleware
app.use(express.json()); 

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/questions",questionRoutes);
app.use("/api/sessions",sessionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

//Server uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})