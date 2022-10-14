/// <reference types="node" />

declare module "clickhouse" {
  import { Stream } from "stream";

  type callbackExec<T> = (error: Error, rows?: T[]) => void;

  export class ClickHouse {
    constructor(opts: Object);
    query(query: String, reqParams?: object): QueryCursor;
    insert(query: String, data?: object): QueryCursor;
    sessionId: string;
  }

  export class WriteStream extends Stream.Transform {
    writeRow(data: Array<any> | string): Promise<void>;
    exec(): Promise<{}>;
  }

  class QueryCursor {
    toPromise<T = any>(): Promise<T[]>;
    exec<T>(callback: callbackExec<T>): void;
    stream(): Stream & WriteStream;
  }
}
