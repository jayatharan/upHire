import { object, string, ref } from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        password: string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
        alternativeEmail: string()
            .email("Must be a valid email"),
        mobileNumber: string(),
        image: string(),
        role: string().oneOf(["client", "student", "freelancer", "general"], "User role is not valid")
    }),
});

export const updateUserSchema = object({
    body: object({
        name: string(),
        password: string(),
        email: string()
            .email("Must be a valid email"),
        alternativeEmail: string()
            .email("Must be a valid email"),
        mobileNumber: string(),
        image: string(),
        role: string().oneOf(["client", "student", "freelancer", "general"], "User role is not valid")
    })
})