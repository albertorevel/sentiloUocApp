export class CustomLocation {

    private _longitude: Number;
    private _latitude: Number;
    
    public get longitude(): Number {
        return this._longitude;
    }
    public set longitude(value: Number) {
        this._longitude = value;
    }

    public get latitude(): Number {
        return this._latitude;
    }
    public set latitude(value: Number) {
        this._latitude = value;
    }

    public fillData (longitude: Number, latitude: Number) {
        this.longitude = longitude;
        this.latitude = latitude;
    }
}