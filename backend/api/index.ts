import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});


app.get("/api/v1/mobs", (req, res) => {
  res.send("all mobs")
})

export default app;

