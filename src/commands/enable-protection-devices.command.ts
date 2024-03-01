import axios from "axios";
import { Device, DeviceCommandResult } from "../interface";
import { isJSON } from "../utils/is-json";
import { commandRequest } from "../common/command-request";

export class EnableProtectionDevicesCommand {
  public async execute(devices: Device[]): Promise<DeviceCommandResult[]> {
    const requests = devices.map((device) =>
      commandRequest(
        device,
        `http://${device.ip}:${device.port}/protection/enable`
      )
    );

    return Promise.all(requests);
  }
}
