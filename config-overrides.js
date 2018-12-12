// const {injectBabelPlugin} = require('react-app-rewired')
// const rewireMobX = require('react-app-rewire-mobx')

const { override, addDecoratorsLegacy, disableEsLint } = require('customize-cra');

module.exports = override(
    addDecoratorsLegacy(),
    disableEsLint(),
);