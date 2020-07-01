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
    'react/no-access-state-in-setstate':0,
    'react/button-has-type':0,
    'jsx-a11y/anchor-is-valid':0,
    'react/no-array-index-key':0,
    'no-script-url':0,
    'no-unused-expressions':0,
    'jsx-a11y/click-events-have-key-events':0,
    'jsx-a11y/no-static-element-interactions':0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/control-has-associated-label': 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    'react/prop-types': 0,
    'jsx-a11y/media-has-caption': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'no-param-reassign': 0,
  }
};
