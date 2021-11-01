module.exports = {
  env: {
    jest: true,
    node: true,
  },
  extends: 'airbnb-base',
  rules: {
    'linebreak-style': ['error', 'windows'],
    'no-underscore-dangle': ['error', { allow: ['__v', '_id'] }],
    'no-param-reassign': ['error', {props: true, ignorePropertyModificationsFor: ['ret', 'res'] }],
  },
};
