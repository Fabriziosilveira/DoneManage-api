import { Request, Response } from "express";

export type HttpMethod = "get" | "post";

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod
} as const;

export interface Route {
    getHandler(): (request: Request, resposnse: Response) => Promise<void>;
    getPath(): string;
    getMethod(): HttpMethod;
};