export class CustomLocation {

    private _longitude: number;
    private _latitude: number;
    
    public get longitude(): number {
        return this._longitude;
    }
    public set longitude(value: number) {
        this._longitude = value;
    }

    public get latitude(): number {
        return this._latitude;
    }
    public set latitude(value: number) {
        this._latitude = value;
    }

    public fillData (longitude: number, latitude: number) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public fillDataString(locationToParse: string) {
        // TODO check errors
        var locations = locationToParse.split(' ');
        this.latitude = Number(locations[0]);
        this.longitude = Number(locations[1]);

    }
}