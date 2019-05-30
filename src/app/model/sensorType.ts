/**
 * Entidad que representa un tipo de sensor del catálogo de Sentilo.
 */
export class SensorType {

    // Primitive types
    private _id: string;
    private _name: string;

    constructor (id: string) {
        this.id = id;
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

    /**
     * Devuelve una copia del objeto
     */
    public getClone(): SensorType {
        var copiedSensorType = new SensorType(this.id);

        // Primitive types
        copiedSensorType.name = this.name;

        return copiedSensorType;
    }
    
}