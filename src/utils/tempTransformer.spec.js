import { TempTransformer } from './tempTransformer';


describe('tempTransformer', () => {
    let tempMapMock;

    beforeAll(() => {
        tempMapMock = new Map([
            [56.57, 13.649999999999999], 
            [65.14, 18.41111111111111],
            [69.6, 20.888888888888886],
            [69.82, 21.011111111111106],
            [64.92, 18.28888888888889]
        ]);
    });

    it('should convert fahrenheit to celcius properly', () => {
        // given
        const tempMap = tempMapMock;
        for (const map of tempMap) {
            // when
            const cVal = TempTransformer.convertFToC(map[0]);
            // then
            expect(cVal).toEqual(map[1]);
        }
    });

    it('should convert celcius to fahrenheit properly', () => {
        // given
        const tempMap = tempMapMock;
        for (const map of tempMap) {
            // when
            const cVal = TempTransformer.covertCToF(map[1]);
            // then
            expect(cVal).toEqual(map[0]);
        }
    });
});