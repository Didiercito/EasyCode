import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { User } from '../../user/domain/user';
import { EmergencyContacts } from '../../emergency_contacts/domain/emergency_contacts';
import { Doctor } from '../../doctor/domain/doctor';
import { HeartRate } from "../../heart_rate/domain/heart_rate";
import { BodyTemperature } from "../../body_temperature/domain/body_temperature";
import { Acelerometer } from "../../accelerometer/domain/acelerometer";
import { Oximeter } from "../../oximeter/domain/oximeter";

dotenv.config();

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async sendEmailToUserAndContacts(
    user: User,
    heartRate: HeartRate,
    bodyTemp: BodyTemperature,
    oximeter: Oximeter,
    accelerometer: Acelerometer,
    emergencyContacts: EmergencyContacts[] = [],
    doctors: Doctor[] = []
  ) {
    try {
      const htmlContent = this.createEmailContentFromTemplate(user, heartRate, bodyTemp, oximeter, accelerometer);

      await this.sendEmailToRecipient(user.correo, htmlContent);

      for (const contact of emergencyContacts) {
        await this.sendEmailToRecipient(contact.correo, htmlContent);
      }

      for (const doctor of doctors) {
        await this.sendEmailToRecipient(doctor.correo, htmlContent);
      }

      console.log(`Correo(s) enviado(s) con éxito.`);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }

  private async sendEmailToRecipient(recipientEmail: string, htmlContent: string) {
    await this.transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: 'Historial Médico Actualizado',
      html: htmlContent,
    });
    console.log(`Correo enviado a ${recipientEmail}`);
  }

  private createEmailContentFromTemplate(
    user: User,
    heartRate: HeartRate,
    bodyTemp: BodyTemperature,
    oximeter: Oximeter,
    accelerometer: Acelerometer
  ): string {
    const templatePath = path.join(__dirname, '../../template/History.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    template = template
      .replace(/{{nombre}}/g, user.nombre)
      .replace(/{{apellido_p}}/g, user.apellido_p)
      .replace(/{{apellido_m}}/g, user.apellido_m)
      .replace(/{{edad}}/g, user.edad.toString())
      .replace(/{{genero}}/g, user.genero)
      .replace(/{{estado}}/g, user.estado)
      .replace(/{{municipio}}/g, user.municipio)
      .replace(/{{correo}}/g, user.correo)
      .replace(/{{telefono}}/g, user.telefono)
      .replace(/{{peso}}/g, user.peso.toString())
      .replace(/{{altura}}/g, user.altura.toString())
      .replace(/{{frecuencia_cardiaca}}/g, heartRate.ECG.toString())
      .replace(/{{oxigenacion}}/g, oximeter.valor.toString())
      .replace(/{{temperatura}}/g, bodyTemp.valor.toString())
      .replace(/{{acelerometro_x}}/g, accelerometer.x.toString())
      .replace(/{{acelerometro_y}}/g, accelerometer.y.toString())
      .replace(/{{acelerometro_z}}/g, accelerometer.z.toString())
      .replace(/{{notificaciones_salud}}/g, this.getHealthNotification(heartRate, oximeter, bodyTemp));

    return template;
  }

  private getHealthNotification(heartRate: HeartRate, oximeter: Oximeter, bodyTemp: BodyTemperature): string {
    let message = '';

    if (heartRate.ECG < 60) {
      message += 'Tu frecuencia cardíaca es baja. Te recomendamos descansar y consultar a un médico si es necesario. ';
    } else if (heartRate.ECG > 100) {
      message += 'Tu frecuencia cardíaca está elevada. Te recomendamos descansar y controlar el estrés. ';
    }

    if (oximeter.valor < 95) {
      message += 'Tu nivel de oxigenación en la sangre es bajo. Se recomienda tomar medidas para mejorar la oxigenación. ';
    }

    if (bodyTemp.valor > 37.5) {
      message += 'Tu temperatura corporal está elevada. Te recomendamos consultar a un médico. ';
    }

    return message || 'Tus niveles están dentro de los parámetros normales.';
  }
}
