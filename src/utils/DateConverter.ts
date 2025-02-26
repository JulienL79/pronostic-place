export const FormatedDate = (fullDate: string): string  => {
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

    return capitalizedDate
}