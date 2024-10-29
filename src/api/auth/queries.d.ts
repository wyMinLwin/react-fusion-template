import { UseMutationOptions } from "@tanstack/react-query";
import type { LoginPayload, LoginResponse } from "./types";
export declare const loginMutation: {
    useMutation: (opt?: UseMutationOptions<LoginResponse, Error, LoginPayload, void>) => import("@tanstack/react-query").UseMutationResult<LoginResponse, Error, LoginPayload, void>;
};
