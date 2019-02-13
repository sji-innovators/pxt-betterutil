/**
 * Custom blocks
 */
//% color=#2b569b weight=10 icon="\uf7d9"

namespace betterutil {
    /**
    *
    * @param data String to send
    */
    //% blockId=sendString weight=100
    //% block="send String %data"
    export function sendString(data: string): void {
        let strLength:number = data.length
        let packets:number = Math.ceil(strLength/18)
        radio.sendString(`{"type": "header", "data": {chars: ${strLength}, packets: ${packets} }`);

        for (let i = 0; i < packets; i++) {
            let sliced = data.substr(i*18, i+1*18)
            radio.sendString(`{"type": "data", "data": {payload:"${sliced}", packet:${i}`);
        }
        return;
    }
    /**
    *
    * @param str String to split
    */
    //% blockId=splitStr weight=100
    //% block="Split string %str"
    export function splitStr(str: string, delimiter: string, removeEmptyItems: boolean=true): Array<string> {
        if (!delimiter || delimiter.length === 0) return [str];
        if (!str || str.length === 0) return [];
        let result = [];
        let j = 0;
        let lastStart = 0;
        for (var i=0;i<=str.length;) {
            if (i == str.length || str.substr(i,delimiter.length) == delimiter) {
                if (!removeEmptyItems || lastStart != i) {
                    result[j++] = str.substr(lastStart, i-lastStart);
                }
                lastStart = i+delimiter.length;
                i += delimiter.length;
            } else i++;
        }
        return result;
    }
}
