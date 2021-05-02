class Utils {
    static formatDateWithTime(dateTime, reverse) {
        let month = '' + (dateTime.getMonth() + 1);
        let day = '' + dateTime.getDate();
        let year = dateTime.getFullYear();

        let hours = dateTime.getHours().toString();
        let minutes = dateTime.getMinutes().toString();

        
        if (month.length < 2) 
            month = '0' + month;
        
        if (day.length < 2) 
            day = '0' + day;

        if (hours.length < 2) 
            hours = '0' + hours;

        if (minutes.length < 2) 
            minutes = '0' + minutes;
        
        const d = [year, month, day];

        if(reverse)
            d.reverse();

        const formattedDate = d.join('-');
        const dateWithTime = `${formattedDate} ${hours}:${minutes}`;
        return dateWithTime;
    }

    static formatDate(dateTime, reverse) {
        let month = '' + (dateTime.getMonth() + 1);
        let day = '' + dateTime.getDate();
        let year = dateTime.getFullYear();

        
        if (month.length < 2) 
            month = '0' + month;
        
        if (day.length < 2) 
            day = '0' + day;
        
        const d = [year, month, day];

        if(reverse)
            d.reverse();

        const formattedDate = d.join('-');
        return formattedDate;
    }
}

export {
    Utils,
}