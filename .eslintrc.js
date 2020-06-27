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
      "jsx-a11y/label-has-associated-control": 0,
      "jsx-a11y/no-noninteractive-element-interactions": 0,
      "jsx-a11y/click-events-have-key-events": 0,
    }
};
