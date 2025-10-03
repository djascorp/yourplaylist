const bcrypt = require('bcryptjs');
async function test() {
    // Exemple de mot de passe et hachage
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10); // Hachage du mot de passe

    console.log("Mot de passe haché :", hashedPassword);

    // Vérification
    const isMatch = await bcrypt.compare(password, hashedPassword); // Comparaison du mot de passe
    console.log("Correspondance :", isMatch); // Doit retourner true
}

test();
