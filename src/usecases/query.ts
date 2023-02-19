export interface Query {
  run(args: any): Promise<any>;
}