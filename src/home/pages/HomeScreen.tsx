import { Box } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { CalculatorForm, CalculatorInfo } from '../components';
import { FormType, formSchema } from '../validators/formSchema';

export const HomeScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialValue: undefined,
      monthlyValue: undefined,
      interestRate: undefined,
      period: undefined,

      totalValue: '',
      totalInvested: '',
      totalInterest: '',
    },
  });

  return (
    <Box minHeight="100vh">
      <CalculatorForm
        setValue={setValue}
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
      />

      {watch('totalValue') && <CalculatorInfo watch={watch} />}
    </Box>
  );
};
