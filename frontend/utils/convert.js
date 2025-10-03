
/**
 * Convertit des millisecondes en une chaîne de caractères formatée.
 * - Si la durée est supérieure ou égale à 1 heure, le format est "HH:MM:SS".
 * - Si la durée est supérieure ou égale à 60 secondes, le format est "MM:SS".
 * - Sinon, le format est "SS".
 *
 * @param {number} millisecondes - Le nombre de millisecondes à convertir.
 * @returns {string} La durée formatée.
 *
 * @example
 * // Exemple d'utilisation
 * console.log(formaterDuree(3661000)); // "01:01:01"
 * console.log(formaterDuree(65000));   // "01:05"
 */
export const formaterDuree = (millisecondes) => {
    // Convertir les millisecondes en secondes
    const secondesTotal = Math.floor(millisecondes / 1000);

    // Calculer les heures, minutes et secondes
    const heures = Math.floor(secondesTotal / 3600);
    const minutes = Math.floor((secondesTotal % 3600) / 60);
    const secondes = secondesTotal % 60;

    // Formater en fonction de la durée
    if (heures > 0) {
        // Format HH:MM:SS
        return `${String(heures).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondes).padStart(2, '0')}`;
    } else {
        // Format MM:SS
        return `${String(minutes).padStart(2, '0')}:${String(secondes).padStart(2, '0')}`;
    }
}