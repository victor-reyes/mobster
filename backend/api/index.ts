import express from "express";

export const app = express();

app.get("/", (req, res) => {
  res.send("Express on vercel");
});

app.listen(3000, () => {
  console.log("Server is ready on port 3000");
});
