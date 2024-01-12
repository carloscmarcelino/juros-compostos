import { FormWrapper } from '@/components';
import { CustomInput } from '@/components/CustomInput';
import { FormType } from '@/home/validators/formSchema';
import { Mask, brlToNumber, toBRL } from '@/utils';
import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import {
  UseFormSetValue,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

type CalculatorFormPorps = {
  setValue: UseFormSetValue<FormType>;
  handleSubmit: UseFormHandleSubmit<FormType>;
  errors: FieldErrors<FormType>;
  register: UseFormRegister<FormType>;
};

export const CalculatorForm = ({
  setValue,
  handleSubmit,
  errors,
  register,
}: CalculatorFormPorps) => {
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

        <FormWrapper label="Taxa de juros (ano)" error={errors?.interestRate}>
          <CustomInput register={register('interestRate')} mask={Mask.rate} />
        </FormWrapper>

        <FormWrapper label="Período (ano)" error={errors?.period}>
          <CustomInput register={register('period')} mask={Mask.period} />
        </FormWrapper>
      </Flex>

      <Button bg="#34f" color="white" type="submit">
        Calcular
      </Button>
    </Flex>
  );
};
