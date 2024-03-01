import { BootDevicesCommand } from "./commands/boot-devices.command";
import { DisableProtectionDevicesCommand } from "./commands/disable-protection-devices.command";
import { EnableProtectionDevicesCommand } from "./commands/enable-protection-devices.command";
import { GetDevicesPingStatusCommand } from "./commands/get-devices-ping-status.command";
import { GetDevicesProtectionStatusCommand } from "./commands/get-devices-protection-status.command";
import { RebootDevicesCommand } from "./commands/reboot-devices.command";
import { ShutdownDevicesCommand } from "./commands/shutdown-devices.command";
import { Device, DeviceCommandResult } from "./interface";

export class Commander {
  private readonly bootDevicesCommand = new BootDevicesCommand();
  private readonly rebootDevicesCommand = new RebootDevicesCommand();
  private readonly shutdownDevicesCommand = new ShutdownDevicesCommand();
  private readonly enableProtectionDevicesCommand =
    new EnableProtectionDevicesCommand();
  private readonly disableProtectionDevicesCommand =
    new DisableProtectionDevicesCommand();
  private readonly getDevicesPingStatusCommand =
    new GetDevicesPingStatusCommand();
  private readonly getDevicesProtectionStatusCommand =
    new GetDevicesProtectionStatusCommand();

  public async boot(devices: Device[]): Promise<DeviceCommandResult[]> {
    return this.bootDevicesCommand.execute(devices);
  }

  public async reboot(devices: Device[]): Promise<DeviceCommandResult[]> {
    return this.rebootDevicesCommand.execute(devices);
  }

  public async shutdown(devices: Device[]): Promise<DeviceCommandResult[]> {
    return this.shutdownDevicesCommand.execute(devices);
  }

  public async enableProtection(
    devices: Device[]
  ): Promise<DeviceCommandResult[]> {
    return this.enableProtectionDevicesCommand.execute(devices);
  }

  public async disableProtection(
    devices: Device[]
  ): Promise<DeviceCommandResult[]> {
    return this.disableProtectionDevicesCommand.execute(devices);
  }

  public async getDevicesPingStatus(
    devices: Device[]
  ): Promise<DeviceCommandResult[]> {
    return this.getDevicesPingStatusCommand.execute(devices);
  }

  public async getDevicesProtectionStatus(
    devices: Device[]
  ): Promise<DeviceCommandResult[]> {
    return this.getDevicesProtectionStatusCommand.execute(devices);
  }
}
