import {
  Collapse,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';

type FormWrapperProps = {
  label: string;
  children: JSX.Element;
  error?;
} & FormControlProps;

export const FormWrapper = ({ label, children, error, ...rest }: FormWrapperProps) => (
  <FormControl position="relative" {...rest}>
    <FormLabel fontWeight="bold" color="black">
      {label}
    </FormLabel>

    {children}

    <Collapse in={Boolean(error)} animateOpacity>
      <FormErrorMessage fontSize="1rem" color="error">
        *{error?.message}
      </FormErrorMessage>
    </Collapse>
  </FormControl>
);
