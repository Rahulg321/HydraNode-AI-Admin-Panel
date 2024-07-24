import { z } from "zod";

export const CreateVendorFormSchema = z.object({
  vendorName: z.string().min(2, {
    message: "Vendor Name must be at least 2 characters.",
  }),
});

export type VendorFormZodType = z.infer<typeof CreateVendorFormSchema>;
