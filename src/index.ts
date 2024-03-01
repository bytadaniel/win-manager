import express from "express";
import { Commander } from "./commander";
import { Device } from "./interface";

const PORT = process.env.PORT || 8082;
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
    .then((devicesResult) =>
      res.sendStatus(200).json({ devices: devicesResult })
    )
    .catch(() => res.sendStatus(500));
});

app.post("/devices/shutdown", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .shutdown(devices)
    .then((devicesResult) =>
      res.sendStatus(200).json({ devices: devicesResult })
    )
    .catch(() => res.sendStatus(500));
});

app.post("/devices/enable-protection", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .enableProtection(devices)
    .then((devicesResult) =>
      res.sendStatus(200).json({ devices: devicesResult })
    )
    .catch(() => res.sendStatus(500));
});

app.post("/devices/disable-protection", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .disableProtection(devices)
    .then((devicesResult) =>
      res.sendStatus(200).json({ devices: devicesResult })
    )
    .catch(() => res.sendStatus(500));
});

app.post("/devices/ping", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .getDevicesPingStatus(devices)
    .then((devicesResult) =>
      res.sendStatus(200).json({ devices: devicesResult })
    )
    .catch(() => res.sendStatus(500));
});

app.post("/devices/protection-status", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .getDevicesProtectionStatus(devices)
    .then((devicesResult) =>
      res.sendStatus(200).json({ devices: devicesResult })
    )
    .catch(() => res.sendStatus(500));
});

app.listen(PORT, () => console.log("Start server on port", PORT));
