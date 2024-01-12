import { Input } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { MaskType } from '@/utils';

type CustomInputProps = {
  mask?: (value: string, maskType?: MaskType) => string;
  register?: UseFormRegisterReturn;
};

export const CustomInput = ({ register, mask }: CustomInputProps) => {
  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (mask) {
      return (event.currentTarget.value = mask(event.currentTarget.value));
    }
  };

  return <Input onChangeCapture={handleChangeInputValue} {...register} borderColor="black" />;
};
