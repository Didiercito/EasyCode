export class MedicalHistory {
    public id: number; 
    public id_usuario: number; 
    public condicion: string;
    public date: Date; 

    constructor(
        id: number, 
        id_user: number, 
        condicion: string,
        date: Date = new Date()
    ) {
        this.id = id;
        this.id_usuario = id_user; 
        this.condicion = condicion;
        this.date = date; 
    }
}
