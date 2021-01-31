module.exports = {
  roots:['<rootDir>/server'],
  preset:'ts-jest',
  testEnvironment:'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'node','js'],
  verbose:true,
  testPathIgnorePatterns:[
    'node_modules'
  ]
}