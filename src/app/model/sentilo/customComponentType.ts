export class CustomComponentType {

    private _id: string;
    private _name: string;
    private _newId: string;
    
    constructor (id:string) {
        this.id = id;
        this.name = '';   
        this.newId = '';
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
    
    public get newId(): string {
        return this._newId;
    }
    public set newId(value: string) {
        this._newId = value;
    }
    
}