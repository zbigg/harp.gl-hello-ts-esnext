import { GeoCoordinates } from "@here/harp-geoutils";
import { MapControls, MapControlsUI } from "@here/harp-map-controls";
import { CopyrightElementHandler, CopyrightInfo, MapView } from "@here/harp-mapview";
import { APIFormat, OmvDataSource } from "@here/harp-omv-datasource";

const canvas = document.getElementById("mapCanvas") as HTMLCanvasElement;
const map = new MapView({
    canvas,
    theme: "node_modules/@here/harp-map-theme/resources/berlin_tilezen_base.json",
    decoderUrl: "./map-decoder-worker.bundle.js"
});

CopyrightElementHandler.install("copyrightNotice", map);

const mapControls = new MapControls(map);
mapControls.maxPitchAngle = 50;
const NY = new GeoCoordinates(40.707, -74.01);
map.lookAt(NY, 4000, 50, -20);
const ui = new MapControlsUI(mapControls);
canvas.parentElement!.appendChild(ui.domElement);

map.resize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
    map.resize(window.innerWidth, window.innerHeight);
});

const hereCopyrightInfo: CopyrightInfo = {
    id: "here.com",
    year: new Date().getFullYear(),
    label: "HERE",
    link: "https://legal.here.com/terms"
};
const copyrights: CopyrightInfo[] = [hereCopyrightInfo];

const omvDataSource = new OmvDataSource({
    baseUrl: "https://xyz.api.here.com/tiles/herebase.02",
    apiFormat: APIFormat.XYZOMV,
    styleSetName: "tilezen",
    maxZoomLevel: 17,
    authenticationCode: "AGln99HORnqL1kfIQtsQl70",
    copyrightInfo: copyrights
});
map.addDataSource(omvDataSource);
