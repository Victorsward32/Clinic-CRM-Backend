import { sendSMS } from "./sms.service.js";
import { sendWhatsApp } from "./whatsapp.service.js";

export const sendNotification = async (reminder) => {
  if (reminder.channel === "SMS") {
    await sendSMS(reminder.phone, reminder.message);
  }

  if (reminder.channel === "WHATSAPP") {
    await sendWhatsApp(reminder.phone, reminder.message);
  }
};
