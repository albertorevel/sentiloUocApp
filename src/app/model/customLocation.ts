export class CustomLocation {

    // Primitive types
    private _longitude: number;
    private _latitude: number;
    
    constructor() { }

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

    public get locationString(): string {
        return this.latitude && this.longitude ? `${this.latitude} ${this.longitude}` : '';
    }

    public fillDataString(locationToParse: string) {
        // TODO check errors
        var locations = locationToParse.split(' ');
        this.latitude = Number(locations[0]);
        this.longitude = Number(locations[1]);

    }

    public getClone(): CustomLocation {
        var copiedLocation = new CustomLocation;

        // Primitive types
        copiedLocation.longitude = this.longitude;
        copiedLocation.latitude = this.latitude;

        return copiedLocation;
    }
}