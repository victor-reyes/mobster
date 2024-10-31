import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/api/v1/mobs", (req, res) => {
  res.send("all mobs");
});

app.post("/api/v1/mobs", (req, res) => {
  console.log(req.body);
  res.send("Hajsan");
});

export default app;
