import axios from "axios";
import { Device, DeviceCommandResult } from "../interface";
import { commandRequest } from "../common/command-request";

export class ShutdownDevicesCommand {
  public async execute(devices: Device[]): Promise<DeviceCommandResult[]> {
    const requests = devices.map((device) =>
      commandRequest(
        device,
        `http://${device.ip}:${device.port}/device/shutdown`
      )
    );

    return Promise.all(requests);
  }
}
