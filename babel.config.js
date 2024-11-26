module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module:react-native-dotenv',
            {
                moduleName: '@env',
                path: '.env',
                safe: false,
                allowUndefined: true,
                allowList: ['API_URL', 'SERVICE_URL']
            }
        ],
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: [
                    '.ios.ts',
                    '.android.ts',
                    '.ts',
                    '.ios.tsx',
                    '.android.tsx',
                    '.tsx',
                    '.jsx',
                    '.js',
                    '.json'
                ],
                alias: {
                    '@components': './src/components',
                    '@constants': './src/constants',
                    '@hooks': './src/hooks',
                    '@pages': './src/pages',
                    '@context': './src/context',
                    '@routes': './src/routes',
                    '@services': './src/services',
                    '@styles': './src/styles',
                    '@utils': './src/utils',
                    underscore: ['lodash']
                }
            }
        ]
    ]
};
