module.exports = {
    preset: 'ts-jest', // Use ts-jest preset
    testEnvironment: 'node', // Test environment for Node.js
    setupFilesAfterEnv: ['./src/tests/setup.js'], // Additional setup file
    coveragePathIgnorePatterns: ['/node_modules/'], // Ignore files in node_modules
    testTimeout: 10000, // Test timeout
    testMatch: ['<rootDir>/src/tests/**/*.test.ts'], // Match TypeScript test files
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Optional: if you use path aliases
    },
};