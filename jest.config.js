module.exports = {
    testEnvironment: 'node', // Environnement de test pour Node.js
    setupFilesAfterEnv: ['./src/tests/setup.js'], // Fichier de configuration supplémentaire
    coveragePathIgnorePatterns: ['/node_modules/'], // Ignorer les fichiers dans node_modules
    testTimeout: 10000, // Temps d'attente pour les tests
};