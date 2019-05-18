import { Sensor } from './sensor';
import { CustomLocation } from './customLocation';

export class Measurement {

    private _value: string;
    private _date: string;
    private _location: CustomLocation;
    private _active: boolean;
    private _sensor: Sensor;

    constructor() {
        this._value = '';
        this._active = true;
    }
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
    
    public get sensor(): Sensor {
        return this._sensor;
    }
    public set sensor(value: Sensor) {
        this._sensor = value;
    }

}