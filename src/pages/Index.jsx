import React, { useState } from "react";
import { Container, VStack, HStack, Input, Text, Box, Heading, Divider, Select, Textarea, Button } from "@chakra-ui/react";

const Index = () => {
  const [parts, setParts] = useState(3524.37);
  const [labor, setLabor] = useState(11940);
  const [extras, setExtras] = useState(150);
  const [taxRate, setTaxRate] = useState(8.25);
  const [shopSupplies, setShopSupplies] = useState(150);
  const [sublet, setSublet] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [unitDescription, setUnitDescription] = useState("");
  const [vin, setVin] = useState("");
  const [estimate, setEstimate] = useState("");
  const [advisor, setAdvisor] = useState("");
  const [customerPayType, setCustomerPayType] = useState("");
  const [repairDescription, setRepairDescription] = useState("UPON INSPECTION, FOUND TRAILER TO BE DAMAGED: FOUND DAMAGE DONE TO MEMBRANE OF THE ROOF MEMBRANE ON TRAILER. POSSIBLY BY TREE BRANCH OR HAIL. NEED TO REMOVE ALL COMPONENTS (A/C UNITS, ATTIC VENTS, COVERS, ANTENNAS…ETC.) REMOVE MENBRANE. INSPECT OSB PLYWOOD FOR DAMAGE, REPLACE/OVERLAY IF NEEDED. LAY GLUE AND NEW MEMBRANE AND REINSTALL ALL COMPONENTS (CHECK FOR OPERATION).");

  const calculateTax = () => (parts + labor + extras + shopSupplies + sublet) * (taxRate / 100);
  const calculateTotal = () => parts + labor + extras + shopSupplies + sublet + calculateTax();

  const formatEstimate = () => {
    return `
Formula to calculate labor sum:
60HRS X 175/HR = $${labor.toFixed(2)}

ROOF MEMBRANE: $1,825.14
ROOF KIT: $485.26
SLF LVL DICOR: $685.16
NON LVL DICIR: $355.72
ROOF SCREWS: $76.28
GLUE: $96.81

Shop Supplies: $${shopSupplies.toFixed(2)}
PARTS: $${parts.toFixed(2)}
LABOR: $${labor.toFixed(2)}
TAX (${taxRate}%): $${calculateTax().toFixed(2)}
TOTAL: $${calculateTotal().toFixed(2)}

Formula to calculate Tax sum
    `;
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">RV Repair Estimate Builder</Heading>
        <Divider />
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Estimate#</Heading>
          <Input type="text" value={estimate} onChange={(e) => setEstimate(e.target.value)} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>First Name</Heading>
          <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Last Name</Heading>
          <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Phone Number</Heading>
          <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Unit Description</Heading>
          <Input type="text" value={unitDescription} onChange={(e) => setUnitDescription(e.target.value)} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>VIN#</Heading>
          <Input type="text" value={vin} onChange={(e) => setVin(e.target.value)} />
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Advisor</Heading>
          <Select placeholder="Select Service Advisor" value={advisor} onChange={(e) => setAdvisor(e.target.value)}>
            <option value="Mark.W">Mark.W</option>
            <option value="Alicia.E">Alicia.E</option>
            <option value="Hunter.S">Hunter.S</option>
          </Select>
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Payment Type</Heading>
          <Select placeholder="Select option" value={customerPayType} onChange={(e) => setCustomerPayType(e.target.value)}>
            <option value="extWarranty">Ext Warranty</option>
            <option value="insurance">Insurance</option>
            <option value="rvStation">RV Station</option>
            <option value="warranty">Warranty</option>
          </Select>
        </Box>
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Deductible</Heading>
          <Input type="number" placeholder="$" />
        </Box>
        <Divider />
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Repair Description</Heading>
          <Textarea value={repairDescription} onChange={(e) => setRepairDescription(e.target.value)} />
        </Box>
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
        <Box width="100%">
          <Heading as="h2" size="md" mb={2}>Formatted Estimate</Heading>
          <Textarea value={formatEstimate()} readOnly />
        </Box>
        <Button colorScheme="blue" onClick={() => alert("Estimate added!")}>Add Estimate</Button>
      </VStack>
    </Container>
  );
};

export default Index;