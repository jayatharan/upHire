import { object, string, ref } from "yup";

export const googleLoginSchema = object({
  body: object({
    tokenId: string().required("Token id is required")
  })
})

export const createUserSchema = object({
    body: object({
      name: string().required("Name is required"),
      password: string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
      passwordConfirmation: string().oneOf(
        [ref("password"), null],
        "Passwords must match"
      ),
      email: string()
        .email("Must be a valid email")
        .required("Email is required"),
      alternativeEmail: string()
        .email("Must be a valid email"),
      mobileNumber:string(),
      image:string(),
      role:string().oneOf(["client", "student", "freelancer", "general"], "User role is not valid")
    }),
});

export const updateUserSchema =  object({
  body: object({
    name: string(),
    password: string()
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    email: string()
      .email("Must be a valid email"),
    alternativeEmail: string()
      .email("Must be a valid email"),
    mobileNumber:string(),
    image:string(),
    role:string().oneOf(["client", "student", "freelancer", "general"], "User role is not valid")
  })
})

export const createUserSessionSchema = object({
    body: object({
      password: string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
  
      email: string()
        .email("Must be a valid email")
        .required("Email is required"),
    }),
});

export const refreshTokenSchema = object({
  body: object({
    refreshToken: string()
    .required("Refresh token is required")
  })
})

export const verifyEmailSchema = object({
  body: object({
    email: string()
      .email("Must be a valid email")
      .required("User is required."),
    guid: string()
      .required("Verification code is required.")
  })
})