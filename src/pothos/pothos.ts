import SchemaBuilder from "@pothos/core";
import {Prisma, PrismaClient} from '@prisma/client';
import PrismaPlugin from '@pothos/plugin-prisma';
import {DateTimeResolver} from "graphql-scalars";
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import {compare, hash} from "bcryptjs";
import {sign} from 'jsonwebtoken'
import {APP_SECRET} from "../services/auth";
import ErrorsPlugin from '@pothos/plugin-errors';

const prisma = new PrismaClient({});


class User {
    user: string;
    userId: string;
    space: string;

    constructor(user: string, space: string, userId: string) {
        this.user = user;
        this.userId = userId;
        this.space = space;
    }
}


class UserSession {
    token: string;
    id: string;
    email: string | null
    spaces: string[]
    username: string;
    isGuest: boolean;

    constructor(token: string, id: string, email: string | null, spaces: string[], username: string, isGuest: boolean) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.spaces = spaces;
        this.username = username;
        this.isGuest = isGuest;
    }
}


const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes;
    Context: {
        currentUser: User,
    };
    Scalars: {
        Date: {
            Input: Date;
            Output: Date;
        };
    };
}>({
    plugins: [PrismaPlugin, ErrorsPlugin],
    errorOptions: {
        defaultTypes: [],
    },
    prisma: {
        client: prisma,
        // defaults to false, uses /// comments from prisma schema as descriptions
        // for object types, relations and exposed fields.
        // descriptions can be omitted by setting description to false
//    exposeDescriptions: boolean | { models: boolean, fields: boolean },
        exposeDescriptions: true,
        // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
        filterConnectionTotalCount: true,
        // warn when not using a query parameter correctly
        onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
    },
});
builder.addScalarType("Date", DateTimeResolver, {});


builder.objectType(Error, {
    name: 'Error',
    fields: (t) => ({
        message: t.exposeString('message'),
    }),
});

builder.prismaObject('User', {
    fields: (t) => ({
        id: t.exposeID('id'),
        username: t.exposeString('username'),
        isGuest: t.exposeBoolean('isGuest'),
        adminSpaces: t.relation('adminSpaces'),
        userSpaces: t.relation('userSpaces'),
        email: t.exposeString('email', {nullable: true}),
        createdAt: t.expose('createdAt', {type: 'Date'}),
        updatedAt: t.expose('updatedAt', {type: 'Date'}),
    }),
});


builder.prismaObject('Space', {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        createdAt: t.expose('createdAt', {type: 'Date'}),
        updatedAt: t.expose('updatedAt', {type: 'Date'}),
        players: t.relation('players'),
        games: t.relation('games'),
        sports: t.relation('sports'),
        teams: t.relation('teams'),
        admin: t.relation('admin')
    }),
});

builder.prismaObject('Sport', {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        createdAt: t.expose('createdAt', {type: 'Date'}),
        updatedAt: t.expose('updatedAt', {type: 'Date'}),
        games: t.relation('games'),
    }),
});


builder.prismaObject('Team', {
    fields: (t) => ({
        id: t.exposeID('id'),
        spaceId: t.exposeID('spaceId'),
        sportId: t.exposeID('sportId', {nullable: true}),
        name: t.exposeString('name'),
        createdAt: t.expose('createdAt', {type: 'Date'}),
        updatedAt: t.expose('updatedAt', {type: 'Date'}),
        gamesAsA: t.relation('gamesAsA'),
        gamesAsB: t.relation('gamesAsB'),
        playerTeams: t.relation('playerTeams'),
        space: t.relation('space'),
    }),
});

builder.prismaObject('Player', {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        createdAt: t.expose('createdAt', {type: 'Date'}),
        updatedAt: t.expose('updatedAt', {type: 'Date'}),
        playerTeams: t.relation('playerTeams'),
    }),
});


builder.prismaObject('PlayerTeam', {
    fields: (t) => ({
        id: t.exposeID('id'),
        playerId: t.exposeID('playerId'),
        teamId: t.exposeID('teamId'),
        player: t.relation('player'),
        team: t.relation('team'),
    }),
});

builder.prismaObject('Game', {
    fields: (t) => ({
        id: t.exposeID('id'),
        teamAId: t.exposeID('teamAId'),
        teamBId: t.exposeID('teamBId'),
        teamAScore: t.exposeInt('teamAScore'),
        teamBScore: t.exposeInt('teamBScore'),
        spaceId: t.exposeID('spaceId'),
        sportId: t.exposeID('sportId', {nullable: true}),
        gameDate: t.expose('gameDate', {type: 'Date'}),
        createdAt: t.expose('createdAt', {type: 'Date'}),
        updatedAt: t.expose('updatedAt', {type: 'Date'}),
        space: t.relation('space'),
        teamA: t.relation('teamA'),
        teamB: t.relation('teamB'),
        sport: t.relation('sport'),
    }),
});

// Define query and mutation types

builder.queryType({
    description: 'Query type for the application',
    fields: (t) => ({
        currentUser: t.field({
            type: User,
            resolve: (root, args, context) => context.currentUser,
        }),
    }),
});

builder.objectType(User, {
    name: "Login",
    fields: (t) => ({
        user: t.exposeString('user'),
        space: t.exposeString('space'),
    })
});
builder.objectType(UserSession, {
    name: "UserSession",
    fields: (t) => ({
        token: t.exposeString('token'),
        id: t.exposeString('id'),
        username: t.exposeString('username'),
        email: t.exposeString('email', {nullable: true}),
        spaces: t.exposeStringList('spaces'),
        isGuest: t.exposeBoolean('isGuest'),
    })
})

builder.queryFields((t) => ({
    spaces: t.prismaField({
        type: ['Space'],
        resolve: async (query, parent, args, context, info) => {
            if (!context?.currentUser?.userId) {
                return [];
            }
            return prisma.space.findMany(
                {
                    where: {
                        users: {
                            some: {
                                id: context.currentUser.userId
                            }
                        }
                    }
                }
            )
        },
    }),
    sports: t.prismaField({
        type: ['Sport'],
        resolve: async () => prisma.sport.findMany(),
    }),
    sport: t.prismaField({
        type: 'Sport',
        args: {
            id: t.arg.string({required: true}),
        },
        resolve: async (query, root, {id}, ctx, info) => {
            return prisma.sport.findUniqueOrThrow({
                where: {id: id},
            });
        },
    }),
    teams: t.prismaField({
        type: ['Team'],
        resolve: async () => prisma.team.findMany(),
    }),
    team: t.prismaField({
        type: 'Team',
        args: {
            id: t.arg.string({required: true}),
        },
        resolve: async (query, root, {id}, ctx, info) => {
            return prisma.team.findUniqueOrThrow({
                where: {id: id},
            });
        },
    }),
    players: t.prismaField({
        type: ['Player'],
        resolve: async () => prisma.player.findMany(),
    }),
    games: t.prismaField({
        type: ['Game'],
        resolve: async () => prisma.game.findMany(),
    }),
    space: t.prismaField({
        type: 'Space',
        args: {
            name: t.arg.string({required: true}),
        },
        resolve: async (query, root, {name}, ctx, info) => {
            console.log(ctx.currentUser)
            /* if (ctx.currentUser.space !== name) {
                 throw new Error('Not authorized');
             }*/
            return prisma.space.findUniqueOrThrow({
                where: {name: name},
            });
        },
    }),
}));

builder.queryFields((t) => ({
    user: t.prismaField({
        type: 'User',
        args: {
            id: t.arg.string({required: true}),
        },
        resolve: async (query, root, {id}, ctx, info) => {
            return prisma.user.findUniqueOrThrow({
                where: {id: id},
            });
        },
    }),
}));


builder.queryFields((t) => ({
    spacesPaginated: t.prismaField({
        type: ['Space'],
        args: {
            skip: t.arg.int({required: true}),
            take: t.arg.int({required: true}),
        },
        resolve: async (query, root, {skip, take}, ctx, info) => {
            return prisma.space.findMany({
                take: take + 1,
                skip: skip,
            });
        },
    }),
}));


builder.queryFields((t) => ({
    teamsBySpaceName: t.prismaField({
        type: ['Team'],
        args: {
            spaceName: t.arg.string({required: true}),
        },
        resolve: async (query, root, {spaceName}, ctx, info) => {
            return prisma.team.findMany({
                where: {
                    space: {
                        name: spaceName
                    },
                },
            });
        },
    }),
}));

builder.queryFields((t) => ({
    getGamesSpacePaginated: t.prismaField({
        type: ['Game'],
        args: {
            spaceName: t.arg.string({required: true}),
            skip: t.arg.int({required: true}),
            take: t.arg.int({required: true}),
        },
        resolve: async (query, root, {spaceName, skip, take}, ctx, info) => {
            return prisma.game.findMany({
                take: take + 1,
                skip: skip,
                where: {
                    space: {
                        name: spaceName
                    },
                },
                orderBy: {
                    gameDate: 'desc',
                }
            });
        },
    }),
}));

const NumberResponse = builder.objectRef<{
    result: number;
}>('NumberResult').implement({
    fields: (t) => ({
        result: t.exposeInt('result'),
    }),
});


builder.queryFields((t) => ({
    spaceCount: t.field({
        type: NumberResponse,
        resolve: async (root, args, context, info) => {
            return {result: await prisma.space.count()};
        },
    }),
}));


builder.mutationType({
    description: 'Mutation type for the application',
});

const SuccessResponse = builder.objectRef<{
    success: boolean;
}>('AddMultiplePlayersResult').implement({
    fields: (t) => ({
        success: t.exposeBoolean('success'),
    }),
});

builder.mutationFields((t) => ({
    createSpace: t.prismaField({
        type: 'Space',
        args: {
            adminId: t.arg.string({required: true}),
            name: t.arg.string({required: true}),
            privatePassword: t.arg.string({required: true}),
        },
        resolve: async (query, root, {adminId, name, privatePassword}, ctx, info) => {
            try {
                const res = await prisma.$transaction(async (prisma) => {
                    const space = await prisma.space.create({
                        data: {
                            name: name,
                            adminId: adminId,
                        },
                    });

                    await prisma.user.create({
                        data: {
                            username: 'guest_' + name,
                            isGuest: true,
                            password: await hash(privatePassword, 10),
                            userSpaces: {
                                connect: {
                                    id: space.id,
                                },
                            },
                        },
                    });

                    await prisma.user.update({
                        where: {
                            id: adminId,
                        },
                        data: {
                            adminSpaces: {
                                connect: {
                                    id: space.id,
                                },
                            },
                            userSpaces: {
                                connect: {
                                    id: space.id,
                                },
                            },
                        },
                    });

                    return space;
                });
                return res;
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    // The .code property can be accessed in a type-safe manner
                    if (error.code === 'P2002') {
                        throw new Error(
                            'Space with that name already exists'
                        )
                    }
                }
                throw error
            }
        },
    }),
}));

builder.mutationFields((t) => ({
    createSport: t.prismaField({
        type: 'Sport',
        args: {
            name: t.arg.string({required: true}),
        },
        resolve: async (query, root, {name}, ctx, info) => {
            return prisma.sport.create({
                data: {
                    name: name,
                },
            });
        },
    }),
}));

builder.mutationFields((t) => ({
    createTeam: t.prismaField({
        type: 'Team',
        args: {
            name: t.arg.string({required: true}),
            spaceId: t.arg.string({required: true}),
            sportId: t.arg.string({required: true}),
            playerIds: t.arg.stringList({required: true}),
        },
        resolve: async (query, root, {name, spaceId, sportId, playerIds}, ctx, info) => {
            const res = await prisma.$transaction(async (prisma) => {
                const team = await prisma.team.create({
                  data: {
                    name: name,
                    spaceId: spaceId,
                    sportId: sportId
                  }
                });
              
                await prisma.playerTeam.createMany({
                  data: playerIds.map((playerId) => ({
                    playerId: playerId,
                    teamId: team.id
                  }))
                });
              
                return team;
                });

            return res;
        },
    }),
}));


builder.mutationFields((t) => ({
        createUser: t.field({
            type: UserSession,
            args: {
                username: t.arg.string({required: true}),
                email: t.arg.string({required: false}),
                password: t.arg.string({required: false}),
                ssoProvider: t.arg.string({required: false}),
                ssoProviderUserId: t.arg.string({required: false}),
            },
            resolve: async (root, {username, email, password, ssoProvider, ssoProviderUserId}, ctx, info) => {

                if ((!email && !password) && (!ssoProvider && !ssoProvider)) {
                    throw new Error('email and password or ssoProvider and ssoProviderUserId are required')
                }

                const user = await prisma.user.create({
                    data: {
                        username: username,
                        email: email ? email : null,
                        password: password ? await hash(password, 10) : null,
                        ssoProvider: ssoProvider ? ssoProvider : null,
                        ssoProviderUserId: ssoProviderUserId ? ssoProviderUserId : null,
                    },
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        userSpaces: true,
                        isGuest: true,
                    }
                });
                const spaces = user.userSpaces.map((space) => space.name)
                const token = createToken(user.id, user.username, user.email, spaces, user.isGuest)

                return new UserSession(token, user.id, user.email, spaces, user.username, user.isGuest)
            },
        }),
    }),
)


builder.queryFields((t) => ({
    fetchUser: t.field({
        type: UserSession,
        args: {
            id: t.arg.string({required: true}),
        },
        resolve: async (root, {id}, ctx, info) => {
            const user = await prisma.user.findUniqueOrThrow({
                where: {id: id},
                select: {
                    id: true,
                    username: true,
                    email: true,
                    userSpaces: true,
                    isGuest: true,
                }
            });

            const spaces = user.userSpaces.map((space) => space.name)
            const token = createToken(user.id, user.username, user.email, spaces, user.isGuest)
            return new UserSession(token, user.id, user.email, spaces, user.username, user.isGuest)
        },
    }),
}));

const LoginResponse = builder.objectRef<{
    token: string;
    user: string;
    space: string;
}>('LoginResult').implement({
    fields: (t) => ({
        token: t.exposeString('token'),
        user: t.exposeString('user'),
        space: t.exposeString('space'),
    }),
});

builder.mutationFields((t) => ({
    userLogin: t.field({
        type: UserSession,
        args: {
            email: t.arg.string({required: true}),
            password: t.arg.string({required: true}),
        },
        resolve: async (root, args, context, info) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {email: args.email},
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        userSpaces: true,
                        password: true,
                        isGuest: true,
                    }
                })

                if (!user) {
                    throw new Error('No such user found')
                }

                if (!user.password) {
                    throw new Error('No admin found (no sso)')
                }

                const valid = await compare(args.password,user.password)
                if (!valid) {
                    throw new Error('Invalid password')
                }
                console.log(user.id, user.username, user.email)
                const token = createToken(user.id, user.username, user.email, user.userSpaces.map((space) => space.name), user.isGuest)
                return new UserSession(token, user.id, user.email, user.userSpaces.map((space) => space.name), user.username, user.isGuest)
            } catch (error) {
                throw new Error('Invalid password')
            }
        },
    }),
}));

const createToken = (id: string, username: string, email: string | null, spaces: string[], isGuest: boolean) => {
    return sign({id, username, email, spaces, isGuest}, APP_SECRET);
}


builder.queryFields((t) => ({
    guestLogin: t.field({
        type: UserSession,
        args: {
            password: t.arg.string({required: true}),
            spaceName: t.arg.string({required: true}),
        },
        resolve: async (root, args, context, info) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {username: 'guest_' + args.spaceName},
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        userSpaces: true,
                        password: true,
                        isGuest: true,
                    }
                })

                if (!user) {
                    throw new Error('No such space found')
                }


                const valid = user.password ? await compare(args.password, user.password) : false;
                if (!valid) {
                    throw new Error('Invalid password')
                }
                const spaces = user.userSpaces.map((space) => space.name)
                const token = createToken(user.id, user.username, user.email,spaces, user.isGuest)
                return new UserSession(token, user.id, user.email, spaces, user.username, user.isGuest)
            } catch (error) {
                throw new Error('Invalid password')
            }
        },
    }),
}));


builder.mutationFields((t) => ({
    deleteTeam: t.field({
        type: SuccessResponse,
        args: {
            teamId: t.arg.string({required: true}),
        },
        resolve: async (root, args, context, info) => {
            try {
                const sports = await prisma.team.findUnique({
                    where: {
                        id: args.teamId,
                    },
                });

                const players = await prisma.playerTeam.findMany({
                    where: {
                        teamId: args.teamId,
                    },
                });

                await prisma.team.delete({
                    where: {
                        id: args.teamId,
                    },
                });


                const spaceTeams = await prisma.team.findMany({
                    where: {
                        spaceId: sports?.spaceId,
                        sportId: sports?.sportId,
                    },
                });


                for (const player of players) {
                    const playerTeams = await prisma.playerTeam.findMany({
                        where: {
                            playerId: player.playerId,
                            team: {
                                spaceId: sports?.spaceId,
                            }
                        },
                    });


                }


                return {
                    success: true,
                };
            } catch (error) {
                return {
                    success: false,
                };
            }
        },
    }),
}));

builder.mutationFields((t) => ({
    createPlayer: t.prismaField({
        type: 'Player',
        args: {
            name: t.arg.string({required: true}),
        },
        resolve: async (query, root, {name}, ctx, info) => {
            return prisma.player.create({
                data: {
                    name: name,
                },
            });
        },
    }),
}));


builder.mutationFields((t) => ({
    addMultiplePlayersToTeam: t.field({
        type: SuccessResponse,
        args: {
            teamId: t.arg.string({required: true}),
            playerIds: t.arg.stringList({required: true}),
        },
        resolve: async (root, args, context, info) => {
            try {
                const result = await prisma.playerTeam.createMany({
                    data: args.playerIds.map((playerId) => ({
                        teamId: args.teamId,
                        playerId,
                    })),
                    skipDuplicates: true,
                });

                const team = await prisma.team.findUnique({
                    where: {id: args.teamId},
                });

                if (team === null) return {success: false};


                return {
                    success: true,
                };
            } catch (error) {
                return {
                    success: false,
                };
            }
        },
    }),
}));

builder.mutationFields((t) => ({
    removePlayerFromTeam: t.field({
        type: SuccessResponse,
        args: {
            teamId: t.arg.string({required: true}),
            playerId: t.arg.string({required: true}),
        },
        resolve: async (root, args, context, info) => {
            try {
                const team = await prisma.team.findUnique({
                    where: {id: args.teamId},
                });

                if (!team) return {success: false}

                await prisma.playerTeam.delete({
                    where: {
                        playerId_teamId: {
                            teamId: args.teamId,
                            playerId: args.playerId,
                        }
                    },
                });


                const teams = await prisma.playerTeam.findMany({
                    where: {
                        playerId: args.playerId,
                        team: {
                            spaceId: team.spaceId,
                        }
                    }
                });


                const sports = await prisma.playerTeam.findMany({
                    where: {
                        playerId: args.playerId,
                        team: {
                            sportId: team.sportId,
                        }
                    }
                });


                return {
                    success: true,
                };
            } catch (error) {
                return {
                    success: false,
                };
            }
        },
    }),
}));


builder.mutationFields((t) => ({
    createGame: t.field({
        type: SuccessResponse,
        args: {
            teamAId: t.arg.string({required: true}),
            teamBId: t.arg.string({required: true}),
            teamAScore: t.arg.int({required: true}),
            teamBScore: t.arg.int({required: true}),
            spaceName: t.arg.string({required: true}),
            sportId: t.arg.string({required: true}),
            gameDate: t.arg.string({required: true}),
        },
        resolve: async (root, args, ctx, info) => {
            try {


                const space = await prisma.space.findUnique({
                    where: {name: args.spaceName},
                });

                if (!space) return {success: false};

                const date = new Date(args.gameDate);

                const result = await prisma.game.create({
                    data: {
                        teamAId: args.teamAId,
                        teamBId: args.teamBId,
                        teamAScore: args.teamAScore,
                        teamBScore: args.teamBScore,
                        spaceId: space.id,
                        gameDate: date,
                        sportId: args.sportId,
                    },
                });

                return {success: true};
            } catch (error) {
                return {success: false};
            }
        },
    }),
}));


builder.mutationFields((t) => ({
    deleteGameById: t.field({
        type: SuccessResponse,
        args: {
            id: t.arg.string({required: true}),
        },
        resolve: async (root, args, context, info) => {
            try {
                await prisma.game.delete({
                    where: {
                        id: args.id,
                    },
                });

                return {
                    success: true,
                };
            } catch (error) {
                return {
                    success: false,
                };
            }
        },
    }),
}));


builder.mutationFields((t) => ({
    deleteSport: t.field({
        type: SuccessResponse,
        args: {
            sportId: t.arg.string({required: true}),
        },
        resolve: async (root, args, context, info) => {
            try {
                await prisma.sport.delete({
                    where: {
                        id: args.sportId,
                    },
                });

                return {
                    success: true,
                };
            } catch (error) {
                return {
                    success: false,
                };
            }
        },
    }),
}));


// AUTH


export const schema = builder.toSchema();
