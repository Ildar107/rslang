module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "react/jsx-props-no-spreading": 0,
      "no-underscore-dangle": 0,
      'linebreak-style': 0,
      "react/prefer-stateless-function": 0,
      'class-methods-use-this': 0,
      "react/destructuring-assignment": 0,
      "react/sort-comp": 0,
      "react/no-did-update-set-state":0,
    }
};
