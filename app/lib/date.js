export function creationDate(isoString) {
    if (isoString) {
        console.log("iso", isoString)
        const formattedString = isoString.slice(0, 23) + "Z"; // trim microseconds to milliseconds
        const date = new Date(formattedString);
        console.log("date from crearion", date)
        return date.toLocaleString()
    }
    // return date.toString()
}

// return date.toLocaleString()
