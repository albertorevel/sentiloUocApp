export class CustomComponentType {

    private _id: String;
    private _name: String;
    
    constructor (id:String, name: String) {
        this.id = id;
        this.name = name;   
    }

    public get id(): String {
        return this._id;
    }
    public set id(value: String) {
        this._id = value;
    }

    public get name(): String {
        return this._name;
    }
    public set name(value: String) {
        this._name = value;
    }
    
    
}