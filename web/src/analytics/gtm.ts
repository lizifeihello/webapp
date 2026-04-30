type DataLayerValue = string | number | boolean | undefined;

export type DataLayerEvent = {
    event: string;
    [key:string]: DataLayerValue
};
declare global {
    interface Window {
        dataLayer?: DataLayerEvent[];
    }
}

export function pushDataLayer(data: DataLayerEvent) {
    if(typeof window ==="undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
    console.log("[dataLayer.push]", data);
    console.trace("[dataLayer.push trace]");
}