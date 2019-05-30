import { CustomLocation } from './customLocation';

/**
 * Entidad que representa una medida de un sensor de Sentilo.
 */
export class Measurement {

    // Primitive types
    private _value: string;
    private _date: string;
    private _active: boolean  = true;

    // Objects
    private _location: CustomLocation = new CustomLocation();
    
    constructor() { }

    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }

    public get date(): string {
        return this._date;
    }
    public set date(value: string) {
        this._date = value;
    }

    public get location(): CustomLocation {
        return this._location;
    }
    public set location(value: CustomLocation) {
        this._location = value;
    }

    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }

    /**
     * Devuelve una copia del objeto
     */
    public getClone(): Measurement {
        var copiedMeasurement = new Measurement();

        // Primitive types
        copiedMeasurement.value = this.value;
        copiedMeasurement.date = this.date;
        copiedMeasurement.active = this.active;

        // Objects
        copiedMeasurement.location = this.location.getClone();

        return copiedMeasurement;
    }
}