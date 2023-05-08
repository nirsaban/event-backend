import { Router } from "express";
import { BaseRoute } from "../interfaces/baseRoute.interface";

export abstract class BaseAbstractRoute {
  abstract initRouter(): Router;
  abstract controller: any;

  protected router: Router = Router({ mergeParams: true });

  public applyMiddleware(middleware: any[]) {
    this.router.use(middleware);
  }

  public init(path: string, routerInstance: BaseRoute) {
    this.router.use(`/${path}/`, routerInstance.initRouter());
  }
}
