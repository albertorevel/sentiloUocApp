/**
 * Entidad que representa una ubicación.
 */
export class CustomLocation {

    // Primitive types
    private _longitude: number;
    private _latitude: number;
    
    constructor() { }

    /* *******************
     * Getters and setters
     * ******************* */
    
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

    /**
     * Método que informa una serie de campos de la entidad de manera agrupada
     */
    public fillData (longitude: number, latitude: number) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    /**
     * Devuelve la locaclización como una cadena de texto
     */
    public get locationString(): string {
        return this.latitude && this.longitude ? `${this.latitude} ${this.longitude}` : '';
    }

    /**
     * Formatea una locaclización a partir de una cadena de texto
     */
    public fillDataString(locationToParse: string) {
        var locations = locationToParse.split(' ');
        this.latitude = Number(locations[0]);
        this.longitude = Number(locations[1]);

    }

    /**
     * Devuelve una copia del objeto
     */
    public getClone(): CustomLocation {
        var copiedLocation = new CustomLocation;

        // Primitive types
        copiedLocation.longitude = this.longitude;
        copiedLocation.latitude = this.latitude;

        return copiedLocation;
    }
}