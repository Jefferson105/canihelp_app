export default {
    typescript: true,
    notUseSpecifiers: true,
    filterComponents: (files) =>
        files.filter((filepath) => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath))
};
