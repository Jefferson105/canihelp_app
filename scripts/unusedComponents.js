const fs = require('fs').promises;
const path = require('path');
const { findAllFilesInSrcFolder, getBaseDir } = require('./fs-lib');

let packages = null;

async function readPackageJson() {
    if (packages !== null) return;

    try {
        const filePath = path.resolve(__dirname, '../package.json');
        const packageJsonContent = JSON.parse(
            await fs.readFile(filePath, 'utf-8')
        );
        packages = Object.keys(packageJsonContent.dependencies || {}).concat(
            Object.keys(packageJsonContent.devDependencies || {})
        );
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function transformPath(inputPath) {
    const finalPath = inputPath.split('/src/')[1];
    const withoutExtension = finalPath.replace(/\.[^/.]+$/, '');
    return inputPath.startsWith('@') || inputPath.startsWith('./')
        ? inputPath
        : '@' + withoutExtension;
}

const allImports = new Set();
const destructuredVarSet = new Set();
const defaultExports = {};

async function fetchImportAndDestructuredVars(filePath) {
    await readPackageJson();

    const content = await fs.readFile(filePath, 'utf-8');

    let isInsideImport = false;

    for (const line of content.split('\n')) {
        if (line.startsWith('import')) {
            const [importation, path] = line
                .replace(/import |'|;/g, '')
                .split(' from ');

            // if path is negative the import has multiple lines
            if (!path) {
                isInsideImport = true;
                continue;
            }

            // check the path is in package.json list
            if (packages.includes(path)) {
                continue;
            }

            allImports.add(path);

            // check has destructured imports
            if (importation.includes('{')) {
                importation
                    .replace(/\{ | \}/g, '')
                    .split(',')
                    .forEach((imp) => {
                        destructuredVarSet.add(imp.trim());
                    });
            }
        }

        // TODO: check if the import in package.json
        if (isInsideImport) {
            if (line.includes('from')) {
                allImports.add(line.replace(/} from |'|;/g, ''));
                isInsideImport = false;
            } else {
                destructuredVarSet.add(line.replace(',', '').trim());
            }
        }

        if (line.startsWith('export default')) {
            defaultExports[transformPath(filePath)] = line
                .replace(/export default |memo\(|'|;/g, '')
                .split(',')[0];
        }
    }

    return;
}

async function main() {
    try {
        const startPath = 'src';
        const allFiles = await findAllFilesInSrcFolder(startPath);

        for (const filePath of allFiles) {
            await fetchImportAndDestructuredVars(
                path.join(getBaseDir(), filePath)
            );
        }

        const allImportsArr = [...allImports];
        const destructuredArr = [...destructuredVarSet];

        const unusedPaths = [];

        for (const filePath of allFiles) {
            const transformedPath = transformPath(
                path.join(getBaseDir(), filePath)
            );

            if (allImportsArr.includes(transformedPath)) {
                continue;
            }

            if (!destructuredArr.includes(defaultExports[transformedPath])) {
                unusedPaths.push(transformedPath);
            }
        }

        console.log(
            'Caminhos não utilizados:',
            unusedPaths,
            unusedPaths.length
        );
        
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

main().catch(console.error);