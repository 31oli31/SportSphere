export const PAGE_ROUTE = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    ADMIN: '/admin',
    LOGIN: '/login',
    PLAYER: '/player',
    PLAYER_CREATE: '/player/create',
    SPORT: '/sport',
    SPORT_CREATE: '/sport/create',
    SPACES: '/spaces',
    SPACES_CREATE: '/spaces/create',
    SPACE: '/space',
    SPACE_GAMES: '/games',
    SPACE_GAMES_CREATE: '/games/create',

    SPACE_SPORT: '/sport',
    SPACE_SPORT_CREATE: '/sport/create',

    SPACE_TEAM: '/team',
    SPACE_TEAM_CREATE: '/team/create',

    PERMISSION_DENIED: '/permission-denied',
    REGISTER: '/register',
    API: '/api',

    TERMS_OF_SERVICE: '/terms-of-service',
    PRIVACY: '/privacy',
}

export const dynamicRoutePage = (route: string, {space}: {
    space?: string
}): string => {
    switch (route) {
        case PAGE_ROUTE.SPACE:
            return `/space/${space}`;

        case PAGE_ROUTE.SPACE_TEAM:
            return `/space/${space}/team`;
        case PAGE_ROUTE.SPACE_TEAM_CREATE:
            return `/space/${space}/team/create`;

        case PAGE_ROUTE.SPACE_SPORT:
            return `/space/${space}/sport`;
        case PAGE_ROUTE.SPACE_SPORT_CREATE:
            return `/space/${space}/sport/create`;
        

        case PAGE_ROUTE.SPACE_GAMES:
            return `/space/${space}/games`;
        case PAGE_ROUTE.SPACE_GAMES_CREATE:
            return `/space/${space}/games/create`;

        default:
            return PAGE_ROUTE.HOME;

    }
}

export type PAGE_ROUTE = typeof PAGE_ROUTE[keyof typeof PAGE_ROUTE];