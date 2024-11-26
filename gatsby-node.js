exports.onCreateWebpackConfig = ({ loaders, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                'react-native': 'react-native-web',
                'react-native-linear-gradient':
                    'react-native-web-linear-gradient'
            },
            modules: ['node_modules']
        },
        module: {
            rules: [
                {
                    test: /react-native-fs/,
                    use: loaders.null()
                },
                {
                    test: /react-native-fast-image/,
                    use: loaders.null()
                },
                {
                    test: /@react-native-community/,
                    use: loaders.null()
                },
                {
                    test: /realm/,
                    use: loaders.null()
                }
                //{
                //    test: /react-native-vision-camera/,
                //    use: loaders.null()
                //}
            ]
        },
        node: {
            fs: 'empty'
        }
    });
};
