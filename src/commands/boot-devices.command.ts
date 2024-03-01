import wol from "wol";
import { Device, DeviceCommandResult } from "../interface";

export class BootDevicesCommand {
  public async execute(devices: Device[]): Promise<DeviceCommandResult[]> {
    const results: DeviceCommandResult[] = [];

    for (const device of devices) {
      await wol
        .wake(device.mac)
        .then(() => {
          console.log(device.mac, "wol success");
          results.push({
            ...device,
            success: true,
            data: {},
          });
        })
        .catch((wakeOnLanError) => {
          console.log(device.mac, "wol error", wakeOnLanError);
          results.push({
            ...device,
            success: true,
            data: {},
          });
        });
    }

    console.log({ results });

    return results;
  }
}
