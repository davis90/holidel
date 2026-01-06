/**
 * Constantes de l'application
 */

export const API_CONFIG = {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    timeout: 30000, // 30 secondes
}

export const PAGINATION = {
    defaultLimit: 10,
    defaultPage: 1,
    maxLimit: 100,
}

export const NURSE_STATUSES = {
    TITULAR: 'titular',
    ASSOCIATE: 'associate',
    COLLABORATOR: 'collaborator',
}

export const NURSE_STATUS_LABELS = {
    titular: 'Titulaire',
    associate: 'Associé',
    collaborator: 'Collaborateur',
}
