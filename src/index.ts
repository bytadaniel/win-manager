import express, { Response } from "express";
import { Commander } from "./commander";
import { Device, DeviceCommandResult } from "./interface";
import { AxiosError } from "axios";

const PORT = process.env.PORT || 8082;
const app = express();
const commander = new Commander();

app.use(express.json());

app.use((req, res, next) => next(console.log(new Date(), req.method, req.url)));

async function handleHttpCommandExecution(
  name: string,
  commandExecutor: () => Promise<DeviceCommandResult[]>,
  res: Response
) {
  await commandExecutor()
    .then((devices) => {
      console.log(
        name,
        devices.map(
          (device) =>
            `${device.mac} [${device.ip}:${device.port}] status = ${device.success}`
        )
      );
      res.status(200).json({ devices });
    })
    .catch((commandExecutionError: Error & AxiosError) => {
      console.log(name, commandExecutionError);
      res.status(500).send(commandExecutionError);
    });
}

app.post("/devices/boot", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await handleHttpCommandExecution(
    "BootDevices",
    () => commander.boot(devices),
    res
  );
});

app.post("/devices/reboot", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await handleHttpCommandExecution(
    "RebootDevices",
    () => commander.reboot(devices),
    res
  );
});

app.post("/devices/shutdown", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await handleHttpCommandExecution(
    "ShutdownDevices",
    () => commander.shutdown(devices),
    res
  );
});

app.post("/devices/enable-protection", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await handleHttpCommandExecution(
    "EnableDevicesProtectino",
    () => commander.enableProtection(devices),
    res
  );
});

app.post("/devices/disable-protection", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await handleHttpCommandExecution(
    "EnableDevicesProtectino",
    () => commander.disableProtection(devices),
    res
  );
});

app.post("/devices/ping", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await handleHttpCommandExecution(
    "PingDevices",
    () => commander.getDevicesPingStatus(devices),
    res
  );
});

app.post("/devices/protection-status", async (req, res) => {
  const devices: Device[] = req.body.devices;

  await handleHttpCommandExecution(
    "ProtectionStatuses",
    () => commander.getDevicesProtectionStatus(devices),
    res
  );
});

app.listen(PORT, () => console.log("Start server on port", PORT));
