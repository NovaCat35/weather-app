export default function convertKelvin(kelvin, desireConversion) {
   if(desireConversion == 'C') {
      const celsius = kelvin - 273.15;
      return Math.round(celsius * 100)/100
   } 
   const fahrenheit = ((kelvin-273.15)*1.8)+32
   return Math.round(fahrenheit * 10)/10;
}