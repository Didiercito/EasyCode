
export class User {
    public id: number;
    public nombre: string;
    public apellido_p: string;
    public apellido_m: string;
    public edad: number;
    public genero: string;
    public estado: string;
    public municipio: string;
    public correo: string;
    public contrasena: string;
    public telefono: string;
    public peso: number;
    public altura: number;
    public create_at: Date;
    public update_at: Date;;

    constructor(
        id: number,
        nombre: string,
        apellido_p: string,
        apellido_m: string,
        edad: number,
        genero: string,
        estado: string,
        municipio: string,
        correo: string,
        contrasena: string,
        telefono: string,
        peso: number,
        altura: number,
        create_at: Date,
        update_at: Date,     
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellido_p = apellido_p;
        this.apellido_m = apellido_m;
        this.edad = edad;
        this.genero = genero;
        this.estado = estado;
        this.municipio = municipio;
        this.correo = correo;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.peso = peso;
        this.altura = altura;
        this.create_at = create_at;
        this.update_at = update_at;

    }
}
