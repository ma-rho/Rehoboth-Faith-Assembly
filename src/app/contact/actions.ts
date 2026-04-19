'use server';

import { z } from "zod";
import { Resend } from 'resend';
import { adminDb } from '../../lib/firebase-admin'; // Import the admin db instance

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(1000, "Message must be less than 1000 characters."),
});

export type FormState = {
    message: string;
    status: 'success' | 'error' | 'idle';
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    const validatedFields = contactSchema.safeParse(data);
    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.flatten().fieldErrors;
      const firstError = Object.values(errorMessages).flat()[0] || "Invalid data provided.";
      return {
        message: firstError,
        status: 'error',
      };
    }

    const { name, email, message } = validatedFields.data;

    // 1. Save the message to Firestore
    await adminDb.collection('contacts').add({
        ...validatedFields.data,
        createdAt: new Date(),
    });
    
    // 2. Send the email with Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
        from: 'RFA Website <noreply@rehobothfa.org>', // Your verified Resend domain
        to: 'rehobothfa@gmail.com', // Your admin email
        replyTo: email,
        subject: `New Contact Message from ${name}`,
        text: message,
    });

    return {
      message: "Thank you for your message! It has been sent successfully.",
      status: 'success',
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      message: "Something went wrong on our end. Please try again later.",
      status: 'error',
    };
  }
}
