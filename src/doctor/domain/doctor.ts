export class Doctor  { 
    public id : number; 
    public id_usuario : number; 
    public nombre : string; 
    public especialidad : string; 
    public telefono : string; 
    public correo : string; 


    constructor
    (
        id : number, 
        id_usuario : number, 
        nombre : string, 
        especialidad : string, 
        telefono : string, 
        correo : string
    ){
        this.id = id; 
        this.id_usuario = id_usuario; 
        this.nombre = nombre; 
        this.especialidad = especialidad; 
        this.telefono = telefono;
        this.correo = correo;
    }
}