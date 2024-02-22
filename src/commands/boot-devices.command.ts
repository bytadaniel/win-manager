import wol from "wol";
import { Device } from "../interface";

export class BootDevicesCommand {
  public async execute(devices: Device[]): Promise<void> {
    await Promise.allSettled(
      devices.map(({ macAddress, ip, port }) =>
        wol.wake(macAddress, { address: ip, port })
      )
    );
  }
}
