import { z } from 'zod';

export type SubscriptionType = 'basic' | 'pro' | 'enterprise';
const subscriptionTypes = ['basic', 'pro', 'enterprise'] as const satisfies SubscriptionType[];

export const sampleFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
  subscription: z.enum(subscriptionTypes, {
    errorMap: () => ({ message: 'Please select a subscription plan' }),
  }),
});

export type SampleFormValues = z.infer<typeof sampleFormSchema>;
