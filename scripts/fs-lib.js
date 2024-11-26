const fs = require('fs').promises;
const path = require('path');

const ignoredPatterns = [
    'src/__tests__/',
    'src/@types/',
    'src/utils',
    'src/styles/chat/index.ts',
    'src/styles/components/index.ts',
    'src/styles/elements/index.ts',
    'src/styles/form/index.ts',
    'src/styles/icons/index.js',
    'src/styles/layout/index.ts',
    'src/styles/typography/index.ts',
    'src/styles/index.ts'
];

const getBaseDir = () => {
    return __dirname.split('canihelp_app')[0] + 'canihelp_app';
};
console.log(`função getBase: ${getBaseDir()}`)

async function findAllFilesInSrcFolder(startPath, toIgnore = ignoredPatterns) {
    let result = [];

    const directoriesAndFiles = await fs.readdir(
        path.join(getBaseDir(), startPath),
        {
            withFileTypes: true
        }
    );

    const files = directoriesAndFiles
        .filter((item) => item.isFile())
        .map((item) => path.join(startPath, item.name))
        .filter(
            (file) =>
                file.endsWith('.ts') ||
                file.endsWith('.tsx') ||
                file.endsWith('.js')
        )
        .filter(
            (filePath) =>
                !toIgnore.some((pattern) => filePath.includes(pattern))
        );

    const directories = directoriesAndFiles
        .filter((item) => item.isDirectory())
        .map((item) => path.join(startPath, item.name))
        .filter((dir) => !toIgnore.some((pattern) => dir.includes(pattern)));

    result.push(...files);

    for (const dir of directories) {
        const subFiles = await findAllFilesInSrcFolder(dir);
        result = result.concat(subFiles);
    }

    return result;
}

module.exports = {
    findAllFilesInSrcFolder,
    ignoredPatterns,
    getBaseDir
};