import React, { useState } from "react";
import { Container, VStack, Input, Text, Box, Heading, Divider, Select, Textarea, Button, Image, Flex, SimpleGrid, InputGroup, InputLeftElement, useColorModeValue, keyframes } from "@chakra-ui/react";
import { saveAs } from 'file-saver';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Index = () => {
  const [parts, setParts] = useState(3524.37);
  const [extras, setExtras] = useState(150);
  const [taxRate, setTaxRate] = useState(8.25);
  const [shopSupplies, setShopSupplies] = useState(150);
  const [sublet, setSublet] = useState(0);
  const [hrs, setHrs] = useState(60);
  const [laborRate, setLaborRate] = useState(175);

  const [roofMembrane, setRoofMembrane] = useState(1825.14);
  const [roofKit, setRoofKit] = useState(485.26);
  const [slfLvlDicor, setSlfLvlDicor] = useState(685.16);
  const [nonLvlDicir, setNonLvlDicir] = useState(355.72);
  const [roofScrews, setRoofScrews] = useState(76.28);
  const [glue, setGlue] = useState(96.81);
  const [additionalParts, setAdditionalParts] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [unitDescription, setUnitDescription] = useState("");
  const [vin, setVin] = useState("");
  const [estimate, setEstimate] = useState("");
  const [advisor, setAdvisor] = useState("");
  const [customerPayType, setCustomerPayType] = useState("");
  const [repairDescription, setRepairDescription] = useState("UPON INSPECTION, FOUND TRAILER TO BE DAMAGED: FOUND DAMAGE DONE TO MEMBRANE OF THE ROOF MEMBRANE ON TRAILER. POSSIBLY BY TREE BRANCH OR HAIL. NEED TO REMOVE ALL COMPONENTS (A/C UNITS, ATTIC VENTS, COVERS, ANTENNAS…ETC.) REMOVE MENBRANE. INSPECT OSB PLYWOOD FOR DAMAGE, REPLACE/OVERLAY IF NEEDED. LAY GLUE AND NEW MEMBRANE AND REINSTALL ALL COMPONENTS (CHECK FOR OPERATION).");
  const [notes, setNotes] = useState("Notes");

  const [deductible, setDeductible] = useState(0);
  const [formattedEstimate, setFormattedEstimate] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateLabor = () => hrs * laborRate;
  const calculateTax = () => `$${Math.ceil((parts + extras + shopSupplies + sublet) * 0.0825).toFixed(2)}`;
  const calculateTotal = () => `$${Math.ceil(parts + calculateLabor() + extras + shopSupplies + sublet + parseFloat(calculateTax().substring(1)) + additionalParts - deductible).toFixed(2)}`;

  const formatEstimate = () => {
    const laborSum = `${hrs}HRS X ${laborRate}/HR = $${calculateLabor().toFixed(2)}`;
    const partsList = [
      { name: "ROOF MEMBRANE", price: 1825.14 },
      { name: "ROOF KIT", price: 485.26 },
      { name: "SLF LVL DICOR", price: 685.16 },
      { name: "NON LVL DICIR", price: 355.72 },
      { name: "ROOF SCREWS", price: 76.28 },
      { name: "GLUE", price: 96.81 },
    ];

    const formattedParts = partsList.map(part => `${part.name}: $${part.price.toFixed(2)}`).join("\n");
    const formattedEstimate = `
Formula to calculate labor sum:
${laborSum}

${formattedParts}

Shop Supplies: $${shopSupplies.toFixed(2)}
PARTS: $${parts.toFixed(2)}
LABOR: $${calculateLabor().toFixed(2)}
TAX (${taxRate}%): $${calculateTax()}
TOTAL: $${calculateTotal()}

Formula to calculate Tax sum:
Total sum from parts X ${taxRate}% = Tax. Labor cannot be taxed.
    `;

    setFormattedEstimate(formattedEstimate);
  };

  const saveEstimate = () => {
    const blob = new Blob([formattedEstimate], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "estimate.txt");
  };

  const printEstimate = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<pre>${formattedEstimate}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Container centerContent maxW="container.xl" py={10}>
      <Box position="relative" width="100%" height="150px">
        <Image src="/images/new-company-logo.png" alt="Company Logo" objectFit="cover" width="100%" height="100%" />
        <Box position="absolute" top="0" right="0" p={4} color="white" textAlign="right">
          <Text>Mark Williamson</Text>
          <Text>Service Advisor</Text>
          <Text>RV Station</Text>
          <Text>Colbert, OK 74733</Text>
          <Text>580-579-5036</Text>
          <Text>mark@rvstation.com</Text>
        </Box>
      </Box>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" textAlign="center">
          ROOF REPAIR ESTIMATE
        </Heading>
        <Divider />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} width="100%">
          <Box>
            <Heading as="h2" size="md" mb={2}>Estimate#</Heading>
            <Input type="text" value={estimate} onChange={(e) => setEstimate(e.target.value)} />
            <Heading as="h2" size="md" mb={2}>First Name</Heading>
            <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Heading as="h2" size="md" mb={2}>Last Name</Heading>
            <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Heading as="h2" size="md" mb={2}>Phone Number</Heading>
            <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <Heading as="h2" size="md" mb={2}>Unit Description</Heading>
            <Input type="text" value={unitDescription} onChange={(e) => setUnitDescription(e.target.value)} />
            <Heading as="h2" size="md" mb={2}>VIN#</Heading>
            <Input type="text" value={vin} onChange={(e) => setVin(e.target.value)} />
            <Heading as="h2" size="md" mb={2}>Advisor</Heading>
            <Select placeholder="Select Service Advisor" value={advisor} onChange={(e) => setAdvisor(e.target.value)}>
              <option value="Mark.W">Mark.W</option>
              <option value="Alicia.E">Alicia.E</option>
              <option value="Hunter.S">Hunter.S</option>
            </Select>
            <Heading as="h2" size="md" mb={2}>Payment Type</Heading>
            <Select placeholder="Select option" value={customerPayType} onChange={(e) => setCustomerPayType(e.target.value)}>
              <option value="extWarranty">Ext Warranty</option>
              <option value="insurance">Insurance</option>
              <option value="rvStation">RV Station</option>
              <option value="warranty">Warranty</option>
              <option value="customerPay">Customer Pay</option>
            </Select>
            <Heading as="h2" size="md" mb={2}>Deductible</Heading>
            <Select placeholder="Select Deductible" value={deductible} onChange={(e) => setDeductible(parseFloat(e.target.value))}>
              <option value={200}>$200</option>
              <option value={250}>$250</option>
              <option value={500}>$500</option>
              <option value={750}>$750</option>
              <option value={1000}>$1000</option>
              <option value={1500}>$1500</option>
              <option value={2000}>$2000</option>
            </Select>
            <Heading as="h2" size="md" mb={2}>Repair Description</Heading>
            <Textarea value={repairDescription} onChange={(e) => setRepairDescription(e.target.value)} />
            <Heading as="h2" size="md" mb={2}>Notes</Heading>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Heading as="h2" size="md" mb={2}>Hrs</Heading>
            <Input type="number" value={hrs} onChange={(e) => setHrs(parseFloat(e.target.value))} />
            <Heading as="h2" size="md" mb={2}>Labor/Hr</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={laborRate} onChange={(e) => setLaborRate(parseFloat(e.target.value))} />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>Sublet</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={sublet} onChange={(e) => setSublet(parseFloat(e.target.value))} />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>Extras</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={extras} onChange={(e) => setExtras(parseFloat(e.target.value))} />
            </InputGroup>
          </Box>
          <Box>
            <Heading as="h2" size="md" mb={2}>Date</Heading>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Heading as="h2" size="md" mb={2}>Roof Kit</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={roofKit} onChange={(e) => setRoofKit(parseFloat(e.target.value))} />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>Roof Membrane</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={roofMembrane} onChange={(e) => setRoofMembrane(parseFloat(e.target.value))} />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>SLF LVL DICOR</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={slfLvlDicor} onChange={(e) => setSlfLvlDicor(parseFloat(e.target.value))} />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>NON LVL DICOR</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={nonLvlDicir} onChange={(e) => setNonLvlDicir(parseFloat(e.target.value))} />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>ROOF SCREWS</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={roofScrews} onChange={(e) => setRoofScrews(parseFloat(e.target.value))} />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>GLUE</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={glue} onChange={(e) => setGlue(parseFloat(e.target.value))} />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>Additional Parts</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={additionalParts} onChange={(e) => setAdditionalParts(parseFloat(e.target.value))} />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>Labor</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={calculateLabor()} isReadOnly />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>Parts</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={parts} onChange={(e) => setParts(parseFloat(e.target.value))} />
            </InputGroup>
            <Heading as="h2" size="md" mb={2}>Shop Supplies</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
              <Input type="number" value={shopSupplies} onChange={(e) => setShopSupplies(parseFloat(e.target.value))} />
            </InputGroup>
          </Box>
        </SimpleGrid>
        {formattedEstimate && (
          <Box width="100%" mt={4} p={4} borderWidth="1px" borderRadius="md">
            <Heading as="h2" size="md" mb={2}>Formatted Estimate</Heading>
            <pre>{formattedEstimate}</pre>
          </Box>
        )}
        <Heading as="h2" size="md" mb={2}>Tax</Heading>
        <Text>{calculateTax()}</Text>
        <Heading as="h2" size="md" mb={2}>Total Estimate</Heading>
        <Text>{calculateTotal()}</Text>
        <Flex width="100%" justifyContent="space-between" mt={4}>
          <Button
            colorScheme={useColorModeValue("blue", "teal")}
            bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
            _hover={{
              bgGradient: "linear(to-r, blue.500, blue.600, blue.700)",
              animation: `${pulse} 1s infinite`,
            }}
            onClick={saveEstimate}
          >
            Save Estimate
          </Button>
          <Button
            colorScheme={useColorModeValue("blue", "teal")}
            bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
            _hover={{
              bgGradient: "linear(to-r, blue.500, blue.600, blue.700)",
              animation: `${pulse} 1s infinite`,
            }}
            onClick={printEstimate}
          >
            Print Estimate
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Index;