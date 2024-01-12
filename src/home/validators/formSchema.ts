import { z } from 'zod';

const errorMessage = 'Preencha um valor';

export const formSchema = z.object({
  initialValue: z.string().refine((val) => val !== '', {
    message: errorMessage,
  }),
  monthlyValue: z.string().refine((val) => val !== '', {
    message: errorMessage,
  }),
  interestRate: z.string().refine((val) => val !== '', {
    message: errorMessage,
  }),
  period: z.string().refine((val) => val !== '', {
    message: errorMessage,
  }),

  totalValue: z.string(),
  totalInvested: z.string(),
  totalInterest: z.string(),
});

export type FormType = z.infer<typeof formSchema>;
