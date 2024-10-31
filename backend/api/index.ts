import express from "express";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type Mobster = { id: string; name: string };
const pathToDataFolder = path.join(process.cwd(), "data");
const pathToMobsterFile = path.join(pathToDataFolder, "mobsters.json");

async function loadMobstersFromFile() {
  if (existsSync(pathToMobsterFile)) {
    const data = await readFile(pathToMobsterFile, "utf-8");
    if (data) return JSON.parse(data);
  }
  return [];
}

async function writeMobstersToFile(mobsters: Mobster[]) {
  if (!existsSync(pathToDataFolder)) await mkdir(pathToDataFolder);
  await writeFile(pathToMobsterFile, JSON.stringify(mobsters, null, 4));
}

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Express on Vercel");
});

app.get("/api/v1/mobs", async (req, res) => {
  const mobsters = await loadMobstersFromFile();
  res.json(mobsters);
});

app.post("/api/v1/mobs", async (req, res) => {
  const id = createId();
  const name = req.body.name;
  const mobsters = await loadMobstersFromFile();
  writeMobstersToFile([...mobsters, { id, name }]);

  res.status(201).end();
});

const createId = () => Math.random().toString();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
