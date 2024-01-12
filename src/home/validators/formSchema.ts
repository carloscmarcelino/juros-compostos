import { z } from 'zod';

export const formSchema = z.object({
  initialValue: z.string(),
  monthlyValue: z.string(),
  interestRate: z.string(),
  period: z.string(),
  totalValue: z.string(),
  totalInvested: z.string(),
  totalInterest: z.string(),
});

export type FormType = z.infer<typeof formSchema>;
