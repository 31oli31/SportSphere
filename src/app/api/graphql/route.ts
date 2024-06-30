
import { createSchema, createYoga } from 'graphql-yoga'
import SchemaBuilder from "@pothos/core";
import {PrismaClient, Space} from '@prisma/client';
import PrismaPlugin from '@pothos/plugin-prisma';
import{PrismaModelTypes} from "@pothos/plugin-prisma";
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import {DateTimeResolver} from "graphql-scalars";
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { schema } from "@/pothos/pothos";
import { authenticateUser } from '@/services/auth';
import {NextRequest} from "next/server";



// Create the Apollo Server instance
const { handleRequest } = createYoga({
  schema: schema,
// While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',
  context: async (initalContext) => ({
    // This part is up to you!
    currentUser: await authenticateUser(initalContext.request),
  }),
  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response }
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }


