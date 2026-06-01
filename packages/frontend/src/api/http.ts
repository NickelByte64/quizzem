export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type HttpResponse<Res> = {
  data: Res;
  status: number;
  ok: boolean;
};

export type ExtendedRequestInit<Req> = Omit<RequestInit, "body"> & {
  body?: Req;
};

async function request<Req, Res>(
  method: HttpMethod,
  target: string,
  requestInit?: ExtendedRequestInit<Req>,
): Promise<HttpResponse<Res>> {
  try {
    // TODO implement correct base URL handling in .env
    const res = await fetch("http://localhost:8080" + target, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...requestInit?.headers,
      },
      ...requestInit,
      body: requestInit?.body ? JSON.stringify(requestInit.body) : undefined,
    });

    let data: Res = null as unknown as Res;

    if (res.headers.get("Content-Type")?.includes("application/json")) {
      data = (await res.json()) as Res;
    }

    return {
      data,
      status: res.status,
      ok: res.ok,
    };
  } catch (err) {
    // TODO implement correct error handling
    console.error(err);
    throw new Error("Failed to fetch from remote API.");
  }
}

export const HTTP = {
  get: <Res>(url: string, init?: ExtendedRequestInit<void>) =>
    request<void, Res>("GET", url, init),
  post: <Req, Res>(url: string, init?: ExtendedRequestInit<Req>) =>
    request<Req, Res>("POST", url, init),
  put: <Req, Res>(url: string, init?: ExtendedRequestInit<Req>) =>
    request<Req, Res>("PUT", url, init),
  delete: <Req, Res>(url: string, init?: ExtendedRequestInit<Req>) =>
    request<Req, Res>("DELETE", url, init),
  patch: <Req, Res>(url: string, init?: ExtendedRequestInit<Req>) =>
    request<Req, Res>("PATCH", url, init),
};
