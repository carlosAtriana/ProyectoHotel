import { Mode } from "../enums/mode";

export interface IdataTransferForm<T = any> {
    data: T,
    options?: any,
    mode: Mode,
    extraArgs?: any
}
