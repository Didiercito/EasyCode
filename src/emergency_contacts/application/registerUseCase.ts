import { EmergencyContactsRepository } from "../domain/emergency_contacRepository";
import { EmergencyContacts } from "../domain/emergency_contacts";

export class RegisterUseCase {
    constructor(private emergencyContactsRepository: EmergencyContactsRepository) {}

    async execute(contactData: {
        id_usuario: number;
        nombre: string;
        apellido_p: string;
        apellido_m: string;
        telefono: string;
        relacion: string;
        correo: string;
    }): Promise<EmergencyContacts> {
        const newContact = new EmergencyContacts(
            0,
            contactData.id_usuario,
            contactData.nombre,
            contactData.apellido_p,
            contactData.apellido_m,
            contactData.telefono,
            contactData.relacion,
            contactData.correo
        );

        return await this.emergencyContactsRepository.register(newContact);
    }
}
