import express from "express";
import { Commander } from "./commander";
import { Device } from "./interface";

const PORT = process.env.PORT || 8083;
const app = express();
const commander = new Commander();

app.use(express.json());

app.post("/devices/boot", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .boot(devices)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.post("/devices/reboot", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .reboot(devices)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.post("/devices/shutdown", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .shutdown(devices)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.post("/devices/enable-protection", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .enableProtection(devices)
    .then((devicesResult) => {
      res.sendStatus(200).json({ devices: devicesResult });
    })
    .catch(() => res.sendStatus(500));
});

app.listen(PORT, () => console.log("Start server on port", PORT));
