export class HeartRate {
    public id: number;
    public id_usuario: number;
    public BPM: number;

    constructor(id: number ,id_usuario: number, BPM: number) {
        this.id = id;
        this.id_usuario = id_usuario;
        this.BPM = BPM;
    }
}
