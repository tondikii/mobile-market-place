import { HStack, Spinner, Heading, Center } from "native-base";
export default function Loading() {
  return (
    <Center flex={1}>
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </Center>
  );
}
