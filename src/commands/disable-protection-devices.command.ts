import { Device, DeviceCommandResult } from "../interface";

export class DisableProtectionDevicesCommand {
  public async execute(
    devices: Device[]
  ): Promise<PromiseSettledResult<DeviceCommandResult>[]> {
    const requests = devices.map(async (device) => {
      try {
        const response = await fetch(
          `${device.ip}:${device.port}/protection/disable`,
          { signal: AbortSignal.timeout(10000) }
        );

        if (!response.ok) {
          return { ...device, success: false, error: await response.text() };
        } else {
          return { ...device, success: true, data: await response.json() };
        }
      } catch (error) {
        const err = error as Error;
        return { ...device, success: false, error: err.message };
      }
    });

    return Promise.allSettled(requests);
  }
}
