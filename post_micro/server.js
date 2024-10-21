import express from "express";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 5002;

// middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({message:"post micro"});
});

//routes
import router from "./routes/index.js";
app.use(router)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
} )
