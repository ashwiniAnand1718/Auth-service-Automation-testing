

import { URLS } from '../config/urls';

// request: Playwright's APIRequestContext
export async function makeApiRequest(request: any, method: string, endpoint: string, headers: Record<string, string>, data?: any) {
  const url = `${URLS.npe_api}${endpoint}`;
  let response;
  const options: any = { headers };
  switch (method.toLowerCase()) {
    case 'get':
      // Playwright does not support 'data' for GET; use 'params' if needed
      response = await request.get(url, options);
      break;
    case 'post':
      response = await request.post(url, { ...options, data });
      break;
    case 'put':
      response = await request.put(url, { ...options, data });
      break;
    case 'delete':
      response = await request.delete(url, options);
      break;
    case 'patch':
      response = await request.patch(url, { ...options, data });
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
  return response;
}