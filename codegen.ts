
import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './src/pothos/pothos';

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(schema),
  documents: "src/**/*.tsx",
  generates: {
    "./src/graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: 'gql',

      }
    },
  }
};

export default config;
