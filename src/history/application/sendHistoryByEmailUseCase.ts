// import { SensorHistoryRepository } from '../domain/historyRepository';


// export class SendSensorHistoryEmailUseCase {
//     private sensorHistoryRepository: SensorHistoryRepository;

//     constructor(sensorHistoryRepository: SensorHistoryRepository) {
//         this.sensorHistoryRepository = sensorHistoryRepository;
//     }

//     async execute(userId: number, email: string): Promise<void> {
//         try {
//             await this.sensorHistoryRepository.sendHistoryByEmail(userId, email);
//         } catch (error) {
//             throw new Error(`Error sending sensor history email`);
//         }
//     }
// }
