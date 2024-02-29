import { Device, DeviceCommandResult } from "../interface";

export class EnableProtectionDevicesCommand {
  public async execute(
    devices: Device[]
  ): Promise<PromiseSettledResult<DeviceCommandResult>[]> {
    const requests = devices.map(async (device) => {
      const response = await fetch(
        `${device.ip}:${device.port}/protection/enable`
      );
      if (!response.ok) {
        return { ...device, success: false, error: await response.text() };
      } else {
        return { ...device, success: true, data: await response.json() };
      }
    });

    return Promise.allSettled(requests);
  }
}
