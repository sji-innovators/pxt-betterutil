/**
 * Custom blocks
 */
//% color=#2b569b weight=10 icon="\uf287"

namespace serialiot {
    /**
    *
    * @param data String to send
    */
    //% blockId=sendString weight=100
    //% block="send String %data"
    export function sendString(data: string): void {
        let strLength:number = data.length
        let packets:number = Math.ceil(strLength/18)
        radio.sendString(`{"type: "header", data: {chars: ${strLength}, packets: ${packets} }'`);

        for (let i = 0; i < packets; i++) {
            let sliced = data.slice(i*18, i+1*18)
            console.log(sliced)
        }
        
        return;
    }
}
