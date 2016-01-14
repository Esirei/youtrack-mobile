module.exports = {
    'extends': [
        'defaults'
    ],
    'ecmaFeatures': {
        'arrowFunctions': true,
        'binaryLiterals': true,
        'blockBindings': true,
        'classes': true,
        'defaultParams': true,
        'destructuring': true,
        'forOf': true,
        'generators': true,
        'modules': true,
        'objectLiteralComputedProperties': true,
        'objectLiteralDuplicateProperties': true,
        'objectLiteralShorthandMethods': true,
        'objectLiteralShorthandProperties': true,
        'octalLiterals': true,
        'regexUFlag': true,
        'regexYFlag': true,
        'restParams': true,
        'spread': true,
        'superInFunctions': true,
        'templateStrings': true,
        'unicodeCodePointEscapes': true,
        'globalReturn': true,
        'jsx': true,
        'experimentalObjectRestSpread': true
    },
    'plugins': [
        'react',
        'react-native'
    ],
    'rules': {
        'no-unused-vars': [2, {'vars': 'local', 'args': 'none'}],
        'no-console': 0,
        'quotes': [2, 'single'],
        'react-native/no-unused-styles': 2,
        'react-native/split-platform-components': 2
    },
    'env': {
        'es6': true,
        'commonjs': true,
        'jest': true
    },
    'globals': {
        'fetch': true,
        'console': true
    }
}