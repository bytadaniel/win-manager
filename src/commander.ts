import { BootDevicesCommand } from "./commands/boot-devices.command";
import { EnableProtectionDevicesCommand } from "./commands/enable-protection-devices.command";
import { RebootDevicesCommand } from "./commands/reboot-devices.command";
import { ShutdownDevicesCommand } from "./commands/shutdown-devices.command";
import { Device, DeviceCommandResult } from "./interface";

export class Commander {
  private readonly bootDevicesCommand = new BootDevicesCommand();
  private readonly rebootDevicesCommand = new RebootDevicesCommand();
  private readonly shutdownDevicesCommand = new ShutdownDevicesCommand();
  private readonly enableProtectionDevicesCommand =
    new EnableProtectionDevicesCommand();

  public async boot(devices: Device[]): Promise<void> {
    await this.bootDevicesCommand.execute(devices);
  }

  public async reboot(devices: Device[]): Promise<void> {
    await this.rebootDevicesCommand.execute(devices);
  }

  public async shutdown(devices: Device[]): Promise<void> {
    await this.shutdownDevicesCommand.execute(devices);
  }

  public async enableProtection(
    devices: Device[]
  ): Promise<PromiseSettledResult<DeviceCommandResult>[]> {
    return this.enableProtectionDevicesCommand.execute(devices);
  }
}
