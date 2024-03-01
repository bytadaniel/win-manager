import wol from "wol";
import { Device, DeviceCommandResult } from "../interface";

export class BootDevicesCommand {
  public async execute(devices: Device[]): Promise<DeviceCommandResult[]> {
    const results: DeviceCommandResult[] = [];

    for (const { macAddress, ip, port } of devices) {
      await wol
        .wake(macAddress)
        .then(() => {
          console.log(macAddress, "wol success");
          results.push({
            success: true,
            data: {},
          });
        })
        .catch((wakeOnLanError) => {
          console.log(macAddress, "wol error", wakeOnLanError);
          results.push({
            success: true,
            data: {},
          });
        });
    }

    return results;
  }
}
