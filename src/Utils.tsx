 

 export function createGuid(): string{
    return new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString(); 
 }