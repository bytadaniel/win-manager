import axios from "axios";
import { Device, DeviceCommandResult } from "../interface";
import { isJSON } from "../utils/is-json";

export async function commandRequest(
  device: Device,
  url: string
): Promise<DeviceCommandResult> {
  return axios
    .get(url, {
      validateStatus: (status) => status === 200,
      timeout: 5000,
      responseType: "text",
    })
    .then((response) => ({
      ...device,
      success: true,
      data: isJSON(response.data) ? JSON.parse(response.data) : response.data,
    }))
    .catch((error: Error) => ({
      ...device,
      success: false,
      error: error.message,
    }));
}
