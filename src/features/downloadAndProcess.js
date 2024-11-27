const axios = require('axios');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

async function downloadAndProcess() {
    const url = 'URL_DU_FICHIER_ZIP'; // Remplacez par l'URL de la FDJ
    const outputZip = 'results.zip';
    const outputDir = './results';
    const jsonOutput = './results.json';

    try {
        // Télécharger le fichier ZIP
        console.log('Téléchargement...');
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(outputZip);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log('Téléchargement terminé. Décompression...');

        // Décompresser le fichier ZIP
        await fs.createReadStream(outputZip)
            .pipe(unzipper.Extract({ path: outputDir }))
            .promise();

        console.log('Décompression terminée.');

        // Lire et convertir le fichier CSV en JSON
        const files = fs.readdirSync(outputDir);
        const csvFile = files.find((file) => file.endsWith('.csv')); // Modifier selon le format attendu

        if (csvFile) {
            console.log('Conversion en JSON...');
            const results = [];
            fs.createReadStream(path.join(outputDir, csvFile))
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    fs.writeFileSync(jsonOutput, JSON.stringify(results, null, 2));
                    console.log('Fichier JSON créé:', jsonOutput);
                });
        } else {
            console.error('Aucun fichier CSV trouvé après la décompression.');
        }
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        // Nettoyage
        if (fs.existsSync(outputZip)) fs.unlinkSync(outputZip);
    }
}

downloadAndProcess();
