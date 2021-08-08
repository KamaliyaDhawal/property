import * as l10n from "jm-ez-l10n";

export class ResponseBuilder {

  public static data(result: any, msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 200;
    rb.result = result;
    rb.msg = msg || null;
    return rb;
  }

  public static paginateData(result: Json, totalCount?: number, msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 200;
    rb.result = result;
    rb.totalCount = totalCount;
    rb.msg = msg || null;
    return rb;
  }

  public static badRequest(msg: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 400;
    rb.error = msg;
    return rb;
  }

  public code: number;
  public msg: string;
  public error: string;
  public result: any;
  public totalCount: number;
}
