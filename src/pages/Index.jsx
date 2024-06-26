import React, { useState } from "react";
import { Container, VStack, HStack, Input, Text, Box, Heading, Divider } from "@chakra-ui/react";

const Index = () => {
  const [parts, setParts] = useState(3524.37);
  const [labor, setLabor] = useState(11940);
  const [extras, setExtras] = useState(150);
  const [taxRate, setTaxRate] = useState(8.25);
  const [shopSupplies, setShopSupplies] = useState(150);
  const [sublet, setSublet] = useState(0);

  const calculateTax = () => (parts + labor + extras + shopSupplies + sublet) * (taxRate / 100);
  const calculateTotal = () => parts + labor + extras + shopSupplies + sublet + calculateTax();

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">RV Repair Estimate Builder</Heading>
        <Divider />
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Parts</Heading>
          <Input type="number" value={parts} onChange={(e) => setParts(parseFloat(e.target.value))} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Labor</Heading>
          <Input type="number" value={labor} onChange={(e) => setLabor(parseFloat(e.target.value))} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Extras</Heading>
          <Input type="number" value={extras} onChange={(e) => setExtras(parseFloat(e.target.value))} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Shop Supplies</Heading>
          <Input type="number" value={shopSupplies} onChange={(e) => setShopSupplies(parseFloat(e.target.value))} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Sublet</Heading>
          <Input type="number" value={sublet} onChange={(e) => setSublet(parseFloat(e.target.value))} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Tax Rate (%)</Heading>
          <Input type="number" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value))} />
        </Box>
        <Divider />
        <Box width="100%">
          <HStack justifyContent="space-between">
            <Text fontSize="lg">Tax:</Text>
            <Text fontSize="lg">${calculateTax().toFixed(2)}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontSize="lg">Total:</Text>
            <Text fontSize="lg">${calculateTotal().toFixed(2)}</Text>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;