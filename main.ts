
//% block="TickEvents"
namespace tickevent {

    export class KeyValue {
        constructor(
            public key: string,
            public value: string | number
        ) { }
    }

    //% block="key $key value $value"
    //% value.shadow=text
    //% blockId=tickeventcreatekv
    export function createKV(key: string, value: string | number): KeyValue {
        return new KeyValue(key, value);
    }

    //% block="post tick event $tickData"
    //% blockId=tickeventpost
    //% tickData.shadow=lists_create_with
    //% tickData.defl=tickeventcreatekv
    export function post(tickData: KeyValue[]) {
        const tick: { [index: string]: string | number } = {};

        for (const data of tickData) {
            tick[data.key] = data.value;
        }

        const toSend = JSON.stringify(tick);
        const buf = Buffer.create(toSend.length);
        for (let i = 0; i < toSend.length; ++i) {
            buf[i] = toSend.charCodeAt(i);
        }
        console.log(buf.toString())
        sendTick(buf);
    }

    // List this as an identity function, so the call will get elided in hw compile
    //% shim=TD_ID
    function sendTick(msg: Buffer) {
        control.simmessages.send("tick-event", msg);
        // TODO: https://github.com/microsoft/pxt-common-packages/pull/1194
        // control.simmessages.send("tick-event", msg, /** noBroadcast */ true);
    }
}