import { BootDevicesCommand } from "./commands/boot-devices.command";
import { RebootDevicesCommand } from "./commands/reboot-devices.command";
import { ShutdownDevicesCommand } from "./commands/shutdown-devices.command copy";
import { Device } from "./interface";

export class Commander {
  private readonly bootDevicesCommand = new BootDevicesCommand();
  private readonly rebootDevicesCommand = new RebootDevicesCommand();
  private readonly shutdownDevicesCommand = new ShutdownDevicesCommand();

  public async boot(devices: Device[]): Promise<void> {
    await this.bootDevicesCommand.execute(devices);
  }

  public async reboot(devices: Device[]): Promise<void> {
    await this.rebootDevicesCommand.execute(devices);
  }

  public async shutdown(devices: Device[]): Promise<void> {
    await this.shutdownDevicesCommand.execute(devices);
  }
}
