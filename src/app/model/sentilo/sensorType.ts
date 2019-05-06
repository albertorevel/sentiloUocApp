export class SensorType {

    private _id: string;
    private _name: string;

    constructor (id: string) {
        this.id = id;
        this.name = '';
    }
    
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    
}