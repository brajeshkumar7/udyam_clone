import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import validateRoutes from "./routes/validate.route.js";
import submitRoutes from "./routes/submit.route.js";
import path from "path";



dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
const __dirname = path.resolve();
app.use(cors());
app.use(express.json());

app.use('/validate', validateRoutes);
app.use('/submit', submitRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
