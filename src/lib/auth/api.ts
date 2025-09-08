import axios, { AxiosInstance } from 'axios';
import { SignUpParams } from '@/types';

// todo: remove (?)
class AuthApi {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: process.env.AUTH0_DOMAIN,
    });
  }

  public signup(data: Omit<SignUpParams, 'client_id' | 'connection'>) {
    return this.api.post('/dbconnections/signup', {
      ...data,
      client_id: process.env.AUTH0_CLIENT_ID,
      connection: process.env.AUTH0_CONNECTION,
    });
  }
}
const api = new AuthApi();
export default api;
