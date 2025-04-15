import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DsButton, DsCheckbox, DsRadioGroup } from '@design-system/ui';
import { sampleFormSchema, SampleFormValues, SubscriptionType } from './sampleFormSchema';
import DsFormControl from '../../lib/components/ds-form-control/ds-form-control';

const defaultValues = {
  name: '',
  email: '',
  description: '',
  acceptTerms: false as any,
  subscription: undefined,
};

const SampleForm = () => {
  const methods = useForm<SampleFormValues>({
    resolver: zodResolver(sampleFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, isDirty },
    setValue,
    watch,
    trigger,
    reset,
  } = methods;

  const onSubmit: SubmitHandler<SampleFormValues> = (data: SampleFormValues) => {
    alert(JSON.stringify(data, null, 2));
    reset(defaultValues);
  };

  const handleRadioChange = (val: string) => {
    setValue('subscription', val as SubscriptionType, {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const handleCheckboxChange = (val: any) => {
    setValue('acceptTerms', val, {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}
      >
        <DsFormControl
          label="Name"
          required
          {...register('name', {
            onBlur: () => trigger('name'),
            onChange: () => trigger('name'),
          })}
          message={touchedFields.name ? errors.name?.message : undefined}
        />

        <DsFormControl
          label="Email"
          required
          type="email"
          {...register('email', {
            onBlur: () => trigger('email'),
            onChange: () => trigger('email'),
          })}
          message={touchedFields.email ? errors.email?.message : undefined}
        />

        <DsFormControl
          as="textarea"
          label="Description"
          required
          {...register('description', {
            onBlur: () => trigger('description'),
            onChange: () => trigger('description'),
          })}
          message={touchedFields.description ? errors.description?.message : undefined}
        />

        <DsRadioGroup
          options={[
            { label: 'Basic', value: 'basic' },
            { label: 'Pro', value: 'pro' },
            { label: 'Enterprise', value: 'enterprise' },
          ]}
          value={watch('subscription') || ''}
          onValueChange={handleRadioChange}
        />
        {errors.subscription && (
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.subscription.message}</span>
        )}

        <DsCheckbox
          label="I accept the terms and conditions"
          checked={watch('acceptTerms')}
          onCheckedChange={handleCheckboxChange}
        />
        {errors.acceptTerms && (
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.acceptTerms.message}</span>
        )}

        <DsButton type="submit" disabled={!isDirty || !isValid}>
          Submit
        </DsButton>
      </form>
    </FormProvider>
  );
};

export default SampleForm;
