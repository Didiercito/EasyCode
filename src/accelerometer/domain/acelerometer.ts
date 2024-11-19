export class Acelerometer {
    public id : number; 
    public x : number; 
    public y : number; 
    public z : number; 
    public create_at: Date; 
    public update_at: Date; 

    constructor
    (
        id: number,
        x: number, 
        y: number, 
        z: number,
        create_at: Date,
        update_at: Date
    ){
        this.id = id,
        this.x = x,
        this.y = y,
        this.z = z, 
        this.create_at = create_at,
        this.update_at = update_at
    }
}