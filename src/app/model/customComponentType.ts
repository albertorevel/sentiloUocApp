/**
 * Entidad que representa un tipo de componente del catálogo de Sentilo.
 */
export class CustomComponentType {

    // Primitive types
    private _id: string;
    private _name: string;

    constructor (id:string) {
        this.id = id;  
    }

    /* *******************
     * Getters and setters
     * ******************* */
    
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
    public getClone(): CustomComponentType {
        var copiedCustomComponentType = new CustomComponentType(this.id);

        // Primitive types
        copiedCustomComponentType.name = this.name;

        return copiedCustomComponentType;
    }
}