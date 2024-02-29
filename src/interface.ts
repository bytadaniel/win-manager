export interface Device {
  macAddress: string;
  ip: string;
  port: number;
}

export type DeviceCommandResult = {
  success: boolean;
  error?: string;
  data?: Record<string, unknown>;
};

export type RequestResponse = {
  devices: (Device & DeviceCommandResult)[];
};
