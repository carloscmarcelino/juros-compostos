import {
  Collapse,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import React from 'react';

type FormWrapperProps = {
  label: string;
  children: JSX.Element;
  error?;
} & FormControlProps;

export const FormWrapper = ({ label, children, error, ...rest }: FormWrapperProps) => (
  <FormControl {...rest}>
    <FormLabel fontWeight="bold" color="black">
      {label}
    </FormLabel>

    {children}

    <Collapse in={Boolean(error)} animateOpacity>
      <Text fontSize="0.875rem" color="red">
        *{error?.message}
      </Text>
    </Collapse>
  </FormControl>
);
