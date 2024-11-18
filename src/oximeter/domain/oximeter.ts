export class Oximeter {
    public id: number; 
    public valor: number; 
    public create_at: Date; 
    public update_at: Date; 
    constructor(
        id: number,
        valor: number,
        create_at: Date,
        update_at: Date
    ) {
        this.id = id;
        this.valor = valor;
        this.create_at = create_at;
        this.update_at = update_at;
    }
}
