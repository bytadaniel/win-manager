import { Device } from "../interface";

export class ShutdownDevicesCommand {
  public async execute(devices: Device[]): Promise<void> {
    const requests = devices.map(async (device) => {
      const response = await fetch(`${device.ip}:${device.port}/shutdown`);
      if (!response.ok) {
        throw new Error(await response.text());
      }
    });

    await Promise.allSettled(requests);
  }
}
