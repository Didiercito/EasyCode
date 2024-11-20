export class HeartRate {
  public id: number;
  public ECG: number;
  public BPM: number; 
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
      id: number, 
      ECG: number, 
      BPM: number, 
      createdAt: Date, 
      updatedAt: Date
  ) {
      this.id = id;
      this.ECG = ECG;
      this.BPM = BPM;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
  }
}
