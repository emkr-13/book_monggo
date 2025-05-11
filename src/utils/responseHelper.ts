import { Response } from "express";

export const sendResponse = (
  res: Response,
  status: number,
  message: string,
  data?: any,
  error?: any
) => {
  
  const response: any = {
    status,
    message,
  };

  if (data) response.data = data;
  if (error) response.error = error;

  return res.status(status).json(response);
};
