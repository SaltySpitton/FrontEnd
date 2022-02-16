export const RelativeTime = (createdAt) => {
    const showCreatedDate = new Date(createdAt).toLocaleString('en')
        const createdAtMilisec = new Date(createdAt).getTime()

        const Today = new Date()
        const today = Today.getTime()  


        let displayTime
        const timeDifference = today - createdAtMilisec
        const hours = (timeDifference / 3600000)

        if(hours > 12){
            return displayTime = showCreatedDate
        }
        if(hours > 1 && hours <= 12){
           return displayTime =`${Math.floor(hours)} hours ago`
        } 
        if(hours < 2 && hours > 1){
           return displayTime =`${Math.floor(hours)} hour ago`
        }

        const minutes = (timeDifference / 60000)
        const seconds = (timeDifference / 1000)

        if(hours > 1 && minutes > 1){
           return displayTime =`${Math.floor(minutes)} minutes ago`
        }
        if(minutes === 1){
            return displayTime =`${Math.floor(minutes)} minute ago`
        }
        if(minutes < 1){
           return displayTime =`${Math.floor(seconds)} seconds ago`
        }
}
