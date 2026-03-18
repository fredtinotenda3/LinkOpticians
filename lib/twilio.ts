import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhone) {
  console.error('Twilio credentials missing');
}

const client = twilio(accountSid, authToken);

export const sendSMS = async (to: string, body: string) => {
  try {
    const message = await client.messages.create({
      body,
      from: twilioPhone,
      to
    });
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('Twilio SMS error:', error);
    return { success: false, error };
  }
};