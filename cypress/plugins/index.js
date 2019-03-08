const wp = require('@cypress/webpack-preprocessor');

module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".js", ".graphql", ".gql", ".mjs"]
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {transpileOnly: true}
          },
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: {transpileOnly: true}
          },
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
          },
          {
            test: /\.(graphql|gql)$/,
            loader: 'graphql-tag/loader'
          }
        ]
      }
    },
  };

  on('file:preprocessor', wp(options))
};
