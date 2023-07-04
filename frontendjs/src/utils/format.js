

export const dateTimeLocal = (date) => {
    try{
        return new Date(date)
            .toLocaleDateString("id-ID", 
                            { weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        }) 
                        + 
                        " " 
                        +
            new Date(date)
            .toLocaleTimeString("id-ID", {hour: '2-digit', minute: '2-digit'})
    }catch(e){
        return ""
    }

}

export const dateISOString = (date) => {
    try{
        return new Date(date)
            .toISOString()
            .split("T")[0]
    }catch(e){
        return ""
    }
    
}

export const dateTimeISOString = (date) => {
    try{
        return new Date(date)
        .toISOString()
        .split("T")[0]
    }catch(e){
        return ""
    }

}