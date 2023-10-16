export interface LoginResult {
    userId: number;
    issuanceTime: number;
    expirationTime: number;
    roles: string[];
}
