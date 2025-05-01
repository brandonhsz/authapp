import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { response } from 'express';

@Injectable()
export class ApiService {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.USERFRONT_API_URL,
      headers: {
        Authorization: `Bearer ${process.env.USERFRONT_API_KEY}`,
      },
    });
  }

  async get(endpoint: string, params?: Record<string, any>): Promise<any> {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw new HttpException(
        `GET request failed: ${error.response?.data?.message ?? error.message}`,
        error.response?.status ?? 500,
      );
    }
  }

  async post(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new HttpException(
        `POST request failed: ${error.response.data.message ?? error.message}`,
        error.response.status ?? 500,
      );
    }
  }

  async put(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw new HttpException(
        `PUT request failed: ${error.response?.data?.message ?? error.message}`,
        error.response?.status ?? 500,
      );
    }
  }

  async delete(endpoint: string): Promise<any> {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw new HttpException(
        `DELETE request failed: ${error.response?.data?.message ?? error.message}`,
        error.response?.status ?? 500,
      );
    }
  }
}
