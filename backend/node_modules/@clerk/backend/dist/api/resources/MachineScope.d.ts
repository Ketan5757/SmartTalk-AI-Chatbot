import type { MachineScopeJSON } from './JSON';
export declare class MachineScope {
    readonly fromMachineId: string;
    readonly toMachineId: string;
    readonly createdAt?: number | undefined;
    readonly deleted?: boolean | undefined;
    constructor(fromMachineId: string, toMachineId: string, createdAt?: number | undefined, deleted?: boolean | undefined);
    static fromJSON(data: MachineScopeJSON): MachineScope;
}
//# sourceMappingURL=MachineScope.d.ts.map