import { z } from "zod";

export const formShema = z.object({
    fullName: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    dateOfBirth: z.date(),
    heardAbout: z.string().min(1, "Choose variant"),
})

export type FormValues = z.infer<typeof formShema>