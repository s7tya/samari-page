import { GridItem, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
}) => {
  return (
    <GridItem bg="white" p="20px" rounded="md" textAlign="center">
      <VStack spacing="8px">
        <Heading as="h2" fontSize="20px">
          {title}
        </Heading>
        <Text>{description}</Text>
      </VStack>
    </GridItem>
  );
};
