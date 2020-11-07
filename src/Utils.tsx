 

 export function createGuid(): string{
    return new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString(); 
 }


 export function secondsToDisplayTimeString(seconds: number): string{
   const newSeconds: number = seconds % 60;
   const newMinutes: number = Math.floor(seconds / 60);
   let prependZero: string = "";
   if(newSeconds < 10){
    prependZero = "0";
   }
   return newMinutes.toString() + ":" + prependZero + newSeconds.toString();
 }