function parseDateAndTime(isoDateString) {
    try {
        const date = new Date(isoDateString);
        
        // Format date as YYYY-MM-DD
        const date_only = date.toISOString().split('T')[0];
        
        // Format time as HH:mm (hours and minutes only)
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const time_only = `${hours}:${minutes}`;
        
        return {
            date_only,
            time_only
        };
    } catch (error) {
        console.error('Error parsing date:', error);
        return {
            date_only: null,
            time_only: null
        };
    }
}


module.exports = parseDateAndTime;