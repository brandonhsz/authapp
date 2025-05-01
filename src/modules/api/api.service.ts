import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

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
      throw new Error(`GET request failed: ${error.message}`);
    }
  }

  async post(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`POST request failed: ${error}`);
    }
  }

  async put(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`PUT request failed: ${error.message}`);
    }
  }

  async delete(endpoint: string): Promise<any> {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`DELETE request failed: ${error.message}`);
    }
  }
}
