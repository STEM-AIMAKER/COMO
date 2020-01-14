//% weight=10 color=#1E90FF icon="\uf118"
namespace como {

    //% blockId=initSerial block="Init serial port to |TX = %Tx RX=%RX"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    export function initSerial(Tx: SerialPin, Rx: SerialPin): void {
        serial.redirect(Tx, Rx, 115200)
        serial.writeString("AT");
        serial.readString();
        basic.pause(100)
    }

    function addParameter(i: number, len : number): string {
        let str = "+";
        if( i < 10 ) {
            let k = 1;
            for( k=1; k<len; k++ ){
                str += "0";
            }
            str += i;
        } else if( i < 100 ){
            let k = 2;
            for (k = 2; k < len; k++) {
                str += "0";
            }
            str += i;
        } else if( i <1000 && len ==4 ){
            str += "0" + i;
        }
        return str;
    }
    //% blockId=runGroup block="run action group |%index number of times %time interval(MS) %interval"
    export function runGroup(index: number, time: number, interval: number): void {
        let cmd = "AT++servo+7" + addParameter(index, 2) + addParameter(time,3 ) + addParameter(interval, 4);
        serial.writeString(cmd);
    }

    //% blockId=goForward block="Go Forward"
    export function goForward(): void {
        let cmd = "AT+servo+3";
        serial.writeString(cmd);
    }

    //% blockId=goBack block="Go Back"
    export function goBack(): void {
        let cmd = "AT+servo+4";
        serial.writeString(cmd);
    }
    
    //% blockId=goLeft block="Go Left"
    export function goLeft(): void {
        let cmd = "AT+servo+5";
        serial.writeString(cmd);
    }

    //% blockId=goRight block="Go Right"
    export function goRight(): void {
        let cmd = "AT+servo+6";
        serial.writeString(cmd);
    }

}
