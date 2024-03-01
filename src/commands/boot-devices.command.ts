import wol from "wol";
import { Device } from "../interface";

export class BootDevicesCommand {
  public async execute(devices: Device[]): Promise<void> {
    for (const { macAddress, ip, port } of devices) {
      await wol
        .wake(macAddress)
        .catch((wakeOnLanError) => {
          console.log(wakeOnLanError);
          throw wakeOnLanError;
        });
    }
  }
}
