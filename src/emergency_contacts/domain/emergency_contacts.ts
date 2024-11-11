export class EmergencyContacts {
    public id : number; 
    public id_usuario : number; 
    public nombre : string; 
    public apellido_p : string; 
    public apellido_m : string; 
    public telefono : string; 
    public ralacion : string; 
    public correo : string; 

    constructor
    (
        id: number,
        id_usuario : number, 
        nombre: string, 
        apellido_p : string, 
        apellido_m : string, 
        telefono : string, 
        relacion : string, 
        correo : string
    ) 
    {
        this.id = id; 
        this.id_usuario = id_usuario; 
        this.nombre = nombre; 
        this.apellido_p = apellido_p; 
        this.apellido_m = apellido_m; 
        this.telefono = telefono; 
        this.ralacion = relacion; 
        this.correo = correo;
    }
}