export async function sendRequest(url, data = null) {
    try {
        // Configuration de la requête HTTP
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        };

        // Si des données sont fournies, on les ajoute au corps
        if (data) {
            options.body = JSON.stringify(data);
        }

        // Envoi de la requête
        const result = await fetch(url, options);

        // Vérifie le statut HTTP
        if (!result.ok) {
            throw new Error(`Erreur HTTP ${result.status} sur ${url}`);
        }

        // Tentative de lecture de la réponse JSON
        let response = null;
        try {
            response = await result.json();
        } catch {
            console.warn(`Réponse vide ou non JSON depuis ${url}`);
        }

        return response;

    } catch (error) {
        console.error("Erreur dans sendRequest :", error);
        throw error;
    }
}



