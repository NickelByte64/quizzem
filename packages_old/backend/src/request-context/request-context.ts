import { UUID } from 'crypto';
import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';
import { SessionRedis } from 'src/session/model/session.redis';
import { SessionService } from 'src/session/session.service';
import { TenantModel } from 'src/tenant/model/tenant.model';
import { TenantService } from 'src/tenant/tenant.service';
import { UserModel } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';

export class RequestContext {
  protected static _clsService: ClsService;
  private readonly _req: Request;
  private readonly _res: Response;
  private readonly _sessionService: SessionService;
  private readonly _userService: UserService;
  private readonly _tenantService: TenantService;

  constructor(options: RequestContextOptions) {
    const { req, res, sessionService, userService, tenantService } = options;

    this._req = req;
    this._res = res;
    this._sessionService = sessionService;
    this._userService = userService;
    this._tenantService = tenantService;
  }

  static getRequestContext(): RequestContext {
    return RequestContext._clsService.get(RequestContext.name);
  }

  static getRequest(): Request {
    return RequestContext.getRequestContext()._req;
  }

  static getResponse(): Response {
    return RequestContext.getRequestContext()._res;
  }

  static async getSession(): Promise<SessionRedis | null> {
    const ctx = RequestContext.getRequestContext();
    const sessionToken = ctx.extractSessionToken();
    if (!sessionToken) return null;
    return ctx._sessionService.findSessionByToken(sessionToken);
  }

  static async getUser(): Promise<UserModel | null> {
    const ctx = RequestContext.getRequestContext();
    const session = await RequestContext.getSession();
    if (!session) return null;
    return await ctx._userService.findOneById(session.userId);
  }

  static setClsService(clsService: ClsService): void {
    RequestContext._clsService = clsService;
  }

  private extractSessionToken(): string | null {
    const signedCookies = this._req.signedCookies as Record<
      string,
      string | undefined
    >;
    return signedCookies['_act_'] ?? null;
  }

  static async getTenant(): Promise<TenantModel | null> {
    const ctx = RequestContext.getRequestContext();
    const user = await RequestContext.getUser();
    if (!user) return null;
    return ctx._tenantService.getTenantByUserId(user.id);
  }

  static async getTenantId(): Promise<UUID | null> {
    const tenant = await RequestContext.getTenant();
    if (!tenant) return null;
    return tenant.id;
  }
}

type RequestContextOptions = {
  req: Request;
  res: Response;
  sessionService: SessionService;
  userService: UserService;
  tenantService: TenantService;
};
