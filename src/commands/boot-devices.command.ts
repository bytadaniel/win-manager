import wol from "wol";
import { Device, DeviceCommandResult } from "../interface";

export class BootDevicesCommand {
  public async execute(devices: Device[]): Promise<DeviceCommandResult[]> {
    const results: DeviceCommandResult[] = [];

    for (const { mac, ip, port } of devices) {
      await wol
        .wake(mac)
        .then(() => {
          console.log(mac, "wol success");
          results.push({
            success: true,
            data: {},
          });
        })
        .catch((wakeOnLanError) => {
          console.log(mac, "wol error", wakeOnLanError);
          results.push({
            success: true,
            data: {},
          });
        });
    }

    console.log({ results });

    return results;
  }
}
