import { Button, HStack } from '@chakra-ui/react';

export default function Page() {
  return (
    <HStack>
      <Button colorPalette="teal" variant="solid">
        Email
      </Button>
      <Button colorPalette="teal" variant="outline">
        Call us
      </Button>
    </HStack>
  );
}
