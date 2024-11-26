module.exports = {
    plugins: [
        'gatsby-plugin-react-native-web',
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true, // defaults to false
                jsxPragma: `jsx`, // defaults to "React"
                allExtensions: true // defaults to false
            }
        },
        {
            resolve: `gatsby-plugin-tsconfig-paths`,
            options: {
                configFile: `${__dirname}/../tsconfig.json`,
                silent: true
            }
        }
    ]
};
