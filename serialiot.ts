/**
 * Custom blocks
 */
//% color=#2b569b weight=10 icon="\uf1b9"

namespace serialiot {
    /**
    *
    * @param data String to send
    */
    //% blockId=sendString weight=100
    //% block="Sends info as a string to hub"
    export function sendString(data: string): void {
        let strLength:number = data.length
        let packets: number = Math.ceil(strLength/18)
        radio.sendString(`{"type: "header", data: {chars: ${strLength}, packets: ${packets} }')
    }
}
