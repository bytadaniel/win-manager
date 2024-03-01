import express from "express";
import { Commander } from "./commander";
import { Device } from "./interface";

const PORT = process.env.PORT || 8082;
const app = express();
const commander = new Commander();

app.use(express.json());

app.use((req, res, next) => next(console.log(new Date(), req.method, req.url)));

app.post("/devices/boot", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .boot(devices)
    .then((devices) => {
      console.log({ devices });
      res.status(200).json({ devices })
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/devices/reboot", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .reboot(devices)
    .then((devices) => {
      console.log({ devices });
      res.status(200).json({ devices })
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/devices/shutdown", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .shutdown(devices)
    .then((devices) => {
      console.log({ devices });
      res.status(200).json({ devices })
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/devices/enable-protection", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .enableProtection(devices)
    .then((devices) => {
      console.log({ devices });
      res.status(200).json({ devices })
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/devices/disable-protection", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .disableProtection(devices)
    .then((devices) => {
      console.log({ devices });
      res.status(200).json({ devices })
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/devices/ping", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .getDevicesPingStatus(devices)
    .then((devices) => {
      console.log({ devices });
      res.status(200).json({ devices })
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/devices/protection-status", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await commander
    .getDevicesProtectionStatus(devices)
    .then((devices) => {
      console.log({ devices });
      res.status(200).json({ devices })
    })
    .catch((error) => res.status(500).send(error));
});

app.listen(PORT, () => console.log("Start server on port", PORT));
