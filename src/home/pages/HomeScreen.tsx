import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { FormWrapper } from '@/components';
import { CustomInput } from '@/components/CustomInput';
import { Mask, brlToNumber, toBRL } from '@/utils';

import { FormType, formSchema } from '../validators/formSchema';
import { CalculatorForm, CalculatorInfo } from '../components';

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
