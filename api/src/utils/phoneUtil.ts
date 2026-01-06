import {parsePhoneNumber, isValidPhoneNumber} from 'libphonenumber-js'


/**
 * Validate if a phone number is valid in E.164 format or can be converted to it
 * @param phoneNumber - Phone number string (can be with or without country code)
 * @param countryCode - Optional country code (e.g., 'FR' for France, 'US' for USA)
 * @returns boolean - true if valid, false otherwise
 */
export const isPhoneNumberValid = (phoneNumber: string, countryCode?: string): boolean => {
    try {
        return isValidPhoneNumber(phoneNumber, 'FR')
    } catch (error) {
        return false
    }
}

/**
 * Format a phone number to E.164 format
 * @param phoneNumber - Phone number string
 * @param countryCode - Country code (e.g., 'FR', 'US')
 * @returns E.164 formatted number or null if invalid
 * @example
 * formatToE164('+33 6 12 34 56 78', 'FR') => '+33612345678'
 * formatToE164('0612345678', 'FR') => '+33612345678'
 * formatToE164('612345678', 'FR') => '+33612345678'
 */
export const formatToE164 = (phoneNumber: string): string | null => {
    try {
        const parsed = parsePhoneNumber(phoneNumber, 'FR')
        if (!parsed) return null
        return parsed.format('E.164')
    } catch (error) {
        return null
    }
}
