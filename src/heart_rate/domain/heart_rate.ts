export class HeartRate {
    public id: number;
    public ECG: number;
    public createdAt: Date;
    public updatedAt: Date;
  
    constructor(id: number, ECG: number, createdAt: Date, updatedAt: Date) {
      this.id = id;
      this.ECG = ECG;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  