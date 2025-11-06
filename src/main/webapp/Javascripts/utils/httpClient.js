export async function sendRequest(url, data = null) {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const result = await fetch(url, options);

        if (!result.ok) {
            throw new Error(`Erreur HTTP ${result.status} sur ${url}`);
        }

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



