export class SensorHistory {
    public id: number;
    public sensorType: string; 
    public data: any;           
    public userId: number;      
    public create_at: Date;     
    public update_at: Date;     

    constructor(
        id: number,
        sensorType: string,
        data: any,
        userId: number,
        create_at: Date,
        update_at: Date
    ) {
        this.id = id;
        this.sensorType = sensorType;
        this.data = data;
        this.userId = userId;
        this.create_at = create_at;
        this.update_at = update_at;
    }
}
