export function FormatedDate(fullDate) {
    const date = new Date(fullDate);

    // Formater la date en français
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long', // Jour complet (e.g., "Mardi")
        day: 'numeric',  // Jour numérique (e.g., "19")
        month: 'long',   // Mois complet (e.g., "novembre")
        year: 'numeric'  // Année (e.g., "2024")
    }).format(date);

    // Capitaliser la première lettre du format complet
    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    // Construire la date sous le format "mardi-10-juin-2024" -> utile pour créer un lien vers la fdj
    // const weekday = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date);
    // const day = date.getDate();
    // const month = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date);
    // const year = date.getFullYear();
    // const formattedShortDate = `${weekday}-${day}-${month}-${year}`;

    return {
        fullDate: capitalizedDate,
        // shortDate: formattedShortDate
    };
}