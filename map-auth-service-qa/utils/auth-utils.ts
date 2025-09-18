
import axios from 'axios';
import { URLS } from '../config/urls';
import fs from 'fs';
import path from 'path';

interface Credentials {
  username: string;
  password: string;
}

const credentialsPath = path.join(__dirname, '../config/creds.json');

const loadCredentials = (): Credentials => {
  const credentials = fs.readFileSync(credentialsPath, 'utf8');
  return JSON.parse(credentials);
};

export { loadCredentials };

export async function getAuthToken(username: string, password: string) {
  const response = await axios.post(`${URLS.npe_api}/api/v1/auth/token`, {
    username,
    password,
  });
  return response.data.token;
}
