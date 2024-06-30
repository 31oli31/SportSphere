export const USER_ROLE = {
    ADMIN: 'admin',
    STANDARD: 'standard',
}

export type USER_ROLE = typeof USER_ROLE[keyof typeof USER_ROLE];

export interface SessionUser {
    id: string,
    username: string,
    token: string,
    email: string | null,
    spaces: string[],
    isGuest: boolean,
}