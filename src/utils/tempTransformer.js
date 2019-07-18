
export class TempTransformer {
    static convertFToC(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }

    static covertCToF(celcius) {
        return (celcius * 9 / 5) + 32;
    }
}