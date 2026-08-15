import { dateReviver } from '../utils/date.utils';
import { HttpError } from './api.error';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type HttpResponse<Res> = {
  data: Res;
  status: number;
};

export type ExtendedRequestInit<Req> = Omit<RequestInit, 'body'> & {
  body?: Req;
};

async function request<Req, Res>(
  method: HttpMethod,
  target: string,
  requestInit?: ExtendedRequestInit<Req>,
): Promise<HttpResponse<Res>> {
  let res: Response;

  try {
    res = await fetch('http://localhost:3000' + target, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...requestInit?.headers,
      },
      ...requestInit,
      body: requestInit?.body ? JSON.stringify(requestInit.body) : undefined,
    });
  } catch (err) {
    // network failure, CORS, etc. — fetch itself rejected
    console.error(err);
    throw new Error('Failed to fetch from remote API.');
  }

  let data: Res = null as unknown as Res;
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    data = JSON.parse(await res.text(), dateReviver) as Res;
  }

  if (!res.ok) {
    throw new HttpError(res.status, data);
  }

  return { data, status: res.status };
}

export const HTTP = {
  get: <Res>(url: string, init?: ExtendedRequestInit<void>) => request<void, Res>('GET', url, init),
  post: <Req, Res>(url: string, init?: ExtendedRequestInit<Req>) => request<Req, Res>('POST', url, init),
  put: <Req, Res>(url: string, init?: ExtendedRequestInit<Req>) => request<Req, Res>('PUT', url, init),
  delete: <Req, Res>(url: string, init?: ExtendedRequestInit<Req>) => request<Req, Res>('DELETE', url, init),
  patch: <Req, Res>(url: string, init?: ExtendedRequestInit<Req>) => request<Req, Res>('PATCH', url, init),
};
