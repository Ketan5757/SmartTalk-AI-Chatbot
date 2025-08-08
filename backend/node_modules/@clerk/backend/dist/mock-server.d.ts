import { type DefaultBodyType, type HttpResponseResolver, type PathParams } from 'msw';
export declare const server: import("msw/node").SetupServerApi;
export declare function validateHeaders<Params extends PathParams, RequestBodyType extends DefaultBodyType, ResponseBodyType extends DefaultBodyType>(resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>;
//# sourceMappingURL=mock-server.d.ts.map