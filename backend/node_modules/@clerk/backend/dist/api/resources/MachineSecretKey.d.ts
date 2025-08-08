import type { MachineSecretKeyJSON } from './JSON';
export declare class MachineSecretKey {
    readonly secret: string;
    constructor(secret: string);
    static fromJSON(data: MachineSecretKeyJSON): MachineSecretKey;
}
//# sourceMappingURL=MachineSecretKey.d.ts.map