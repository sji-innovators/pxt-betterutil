/**
 * Custom blocks
 */
//% color=#2b569b weight=10 icon="\uf7d9"

namespace betterutil {
    /**
    *
    * @param data String to send via radio
    */
    //% blockId=sendString weight=100
    //% block="send String %data"
    export function sendString(data: string): void {
        let strLength:number = data.length
        let packets:number = Math.ceil(strLength/5)
        radio.sendValue(`header-${packets}`, 121);

        for (let i = 0; i < packets; i++) {
            let sliced = data.substr(i*5, i+1*5)
            radio.sendString(`content-${sliced}-${i}`, 121);
        }
        return;
    }
    /**
    *
    * @param data String to read and decode from radio
    */
    //% blockId=readString weight=100
    //% block="reads String %data from radio"
    export function readString(data: string): any {
        let parts = betterutil.splitStr(data, "-")
        if(parts.length != 3)return;
        let output:any =
            {
            "type": parts[0],
            "body": parts[1],
            "last": parts[2]
            };
        return output;
    }
    /**
    *
    * @param str String to split
    */
    //% blockId=splitStr weight=100
    //% block="Split string %str by %delimiter and removeEmptyItems %removeEmptyItems"
    export function splitStr(str: string, delimiter: string, removeEmptyItems: boolean=true): Array<string> {
        if (!delimiter || delimiter.length === 0) return [str];
        if (!str || str.length === 0) return [];
        let result:Array<string> = [];
        let j = 0;
        let lastStart = 0;
        for (let i=0;i<=str.length;) {
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
