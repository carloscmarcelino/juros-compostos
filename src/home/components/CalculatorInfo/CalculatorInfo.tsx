import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { UseFormWatch } from 'react-hook-form';

import { FormType } from '@/home/validators/formSchema';

type CalculatorInfoProps = {
  watch: UseFormWatch<FormType>;
};

export const CalculatorInfo = ({ watch }: CalculatorInfoProps) => (
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
);
