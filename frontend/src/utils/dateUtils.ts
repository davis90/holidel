/**
 * Utilitaires pour la manipulation des dates
 */

export const dateUtils = {
    /**
     * Formate une date en format français (jj/mm/aaaa)
     */
    formatDate(dateString: string): string {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
    },

    /**
     * Formate une date avec l'heure (jj/mm/aaaa hh:mm)
     */
    formatDateTime(dateString: string): string {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    },

    /**
     * Retourne la différence en jours entre deux dates
     */
    getDaysDifference(startDate: string, endDate: string): number {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end.getTime() - start.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    },
}
