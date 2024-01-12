import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { FormWrapper } from '@/components';
import { CustomInput } from '@/components/CustomInput';
import { Mask, brlToNumber, toBRL } from '@/utils';

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
      initialValue: '',
      monthlyValue: '',
      interestRate: '',
      period: '',

      totalValue: '',
      totalInvested: '',
      totalInterest: '',
    },
  });

  const onSubmit = ({ initialValue, monthlyValue, interestRate, period }: FormType) => {
    const initialValueFormattedToNumber = brlToNumber(initialValue);
    const monthlyValueFormattedToNumber = brlToNumber(monthlyValue);
    const annualInterestRateFormattedToMonthly = Number(
      (Number(interestRate.replace('%', '')) / 100).toFixed(4),
    );
    const periodFormattedToMonthly = Number(period);

    const monthlyInterestRate = annualInterestRateFormattedToMonthly / 12;
    const totalMonths = periodFormattedToMonthly * 12;

    const totalInvested =
      initialValueFormattedToNumber + monthlyValueFormattedToNumber * totalMonths;

    const totalValue =
      initialValueFormattedToNumber * Math.pow(1 + monthlyInterestRate, totalMonths) +
      monthlyValueFormattedToNumber *
        ((Math.pow(1 + monthlyInterestRate, totalMonths) - 1) / monthlyInterestRate);

    const totalInterest = totalValue - totalInvested;

    setValue('totalValue', toBRL(totalValue) ?? '');
    setValue('totalInvested', toBRL(totalInvested) ?? '');
    setValue('totalInterest', toBRL(totalInterest) ?? '');
  };

  return (
    <Box minHeight="100vh">
      <Flex
        flexDirection="column"
        maxWidth="30rem"
        m="auto"
        p="2rem"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text fontWeight="bold" color="black" fontSize="2rem">
          Simulador de juros compostos
        </Text>

        <Flex flexDirection="column" m="2rem 0" gap="1rem">
          <FormWrapper label="Valor inicial" error={errors?.initialValue}>
            <CustomInput register={register('initialValue')} mask={Mask.formatBRL} />
          </FormWrapper>

          <FormWrapper label="Valor mensal" error={errors?.monthlyValue}>
            <CustomInput register={register('monthlyValue')} mask={Mask.formatBRL} />
          </FormWrapper>

          <FormWrapper label="Taxa de juros" error={errors?.interestRate}>
            <CustomInput register={register('interestRate')} mask={Mask.rate} />
          </FormWrapper>

          <FormWrapper label="Período em" error={errors?.period}>
            <CustomInput register={register('period')} mask={Mask.period} />
          </FormWrapper>
        </Flex>

        <Button bg="#34f" color="white" type="submit">
          Calcular
        </Button>
      </Flex>

      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        gap="1rem"
        m="2rem"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          flexDirection="column"
          border="1px solid #dddddd"
          borderRadius="0.5rem"
          p="2rem"
          minWidth="15rem"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontWeight="bold">Valor total final</Text>

          <Text>{watch('totalValue')}</Text>
        </Flex>

        <Flex
          flexDirection="column"
          border="1px solid #dddddd"
          borderRadius="0.5rem"
          p="2rem"
          minWidth="15rem"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontWeight="bold">Valor total investido</Text>

          <Text>{watch('totalInvested')}</Text>
        </Flex>

        <Flex
          flexDirection="column"
          border="1px solid #dddddd"
          borderRadius="0.5rem"
          p="2rem"
          minWidth="15rem"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontWeight="bold">Total em juros</Text>

          <Text>{watch('totalInterest')}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
