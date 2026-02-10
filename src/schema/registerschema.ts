import * as zod from "zod";

export const schema=zod.object({
    name:zod.string().nonempty("Name is required")
    .min(3,"Name must be at least 3 characters").max(30,"Name must be at most 30 characters"),


    email:zod.string().nonempty("Email is required")
    .regex( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"),

    password:zod.string().nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/, "Password must include uppercase, lowercase, number and special character") , 
    
    

    phone:zod.string().nonempty("Phone is required")
    .regex(/^01[0125][0-9]{8}$/, "Phone number must be 10 digits"),


    rePassword:zod.string().nonempty("Repassword is required")
    .refine((data)=> data.password === data.rePassword , {path:["rePassword"], message:"Passwords do not match"})
});