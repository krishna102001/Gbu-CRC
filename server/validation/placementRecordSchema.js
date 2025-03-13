import z from "zod";

export const placementRecordSchema = z.object({
  session: z.coerce.string(),
  numberOfCompanies: z.coerce.number(),
  numberOfStudentsApplied: z.coerce.number(),
  numberOfStudentsPlaced: z.coerce.number(),
});
