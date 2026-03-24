"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(1000, "Message must be less than 1000 characters."),
});

export type FormState = {
    message: string;
    status: 'success' | 'error' | 'idle';
};

// This is a mock action. In a real app, you would save this to a database (e.g., Firestore).
export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
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
    
    console.log("New contact form submission:", validatedFields.data);
    // Here you would add logic to save to Firestore.
    // e.g., await db.collection("contacts").add(validatedFields.data);

    return {
      message: "Thank you for your message! We will get back to you soon.",
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
