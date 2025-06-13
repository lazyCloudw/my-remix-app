import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const db = new sqlite3.Database("./bbs.db");

app.use(cors());
app.use(express.json());

db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, name TEXT, body TEXT, date TEXT, ip TEXT)");

app.get("/api/posts", (req, res) => {
    console.log("res:", res.json)
    db.all("SELECT * FROM posts ORDER BY id DESC", [], (err, rows) => {
        res.json(rows);
    });
});

app.post("/api/posts", (req, res) => {
    console.log("res:", req.json)
    const { name, body } = req.body;
    if (!name || !body || body.length > 100) return res.status(400).end();
    const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.socket.remoteAddress;
    db.run(
        "INSERT INTO posts (name, body, date, ip) VALUES (?, ?, ?, ?)",
        [name, body, new Date().toISOString(), ip],
        function () {
            res.json({ id: this.lastID, name, body, date: new Date().toISOString(), ip });
        }
    );
});

app.listen(3001, () => console.log("API server on http://localhost:3001"));