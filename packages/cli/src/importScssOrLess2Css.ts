function transformImportLess2Css() {
  return {
    name: 'import-scss-or-less-to-css',
    visitor: {
      ImportDeclaration(path:any) {
        const re = /(\.scss|\.less)$/;
        if (re.test(path.node.source.value)) {
          path.node.source.value = path.node.source.value.replace(re, '.css');
        }
      },
    },
  };
}

export default transformImportLess2Css;
