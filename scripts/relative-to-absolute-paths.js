const fs = require('fs').promises;
const path = require('path');

const { findAllFilesInSrcFolder, getBaseDir } = require('./fs-lib');

async function parseRelativePaths(filePath) {
    let content = await fs.readFile(filePath, 'utf-8');

    const relativePaths = content.split("from './").slice(1);

    const lastBarPos = filePath.lastIndexOf('/');

    for (const relative of relativePaths) {
        const originalImport = './' + relative.slice(0, relative.indexOf("'"));
        const formatedPath =
            filePath
                .slice(0, lastBarPos)
                .replace(
                    '/home/daniel/Documentos/canihelp/canihelp_app/src',
                    '@'
                ) + originalImport.replace('.', '');

        content = content.replace(originalImport, formatedPath);
    }

    //if (relativePaths.length > 1) fs.writeFile(filePath, content);

    return;
}

const main = async () => {
    const startPath = 'src';
    const allFiles = await findAllFilesInSrcFolder(startPath);

    for (const filePath of allFiles) {
        await parseRelativePaths(path.join(getBaseDir(), filePath));
        console.log(getBaseDir)
    }
};

main();