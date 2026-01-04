import cron from "node-cron"

import { getPendingReminders,markAsSent } from "../modules/reminders/reminder.service.js"
import { sendNotification } from "../services/notification.services.js"


cron.schedule("*/2 * * * *", async ()=>{
console.log("⏰ Checking reminders...");

const reminder= await getPendingReminders();

for(const reminder of reminder){
    await sendNotification(reminder);
    await markAsSent(reminder._id);
}

})