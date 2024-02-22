import { Device } from "../interface";

export class RebootDevicesCommand {
  public async execute(devices: Device[]): Promise<void> {
    const requests = devices.map(async (device) => {
      const response = await fetch(`${device.ip}:${device.port}/reboot`);
      if (!response.ok) {
        throw new Error(await response.text());
      }
    });

    await Promise.allSettled(requests);
  }
}
