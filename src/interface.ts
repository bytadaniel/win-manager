export interface Device {
  ip: string;
  mac: string;
  port: number;
}

export type DeviceCommandResult = Device & {
  success: boolean;
  error?: string;
  data?: Record<string, unknown>;
};

export type RequestResponse = {
  devices: (Device & DeviceCommandResult)[];
};
