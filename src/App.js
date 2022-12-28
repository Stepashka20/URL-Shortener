import React from 'react';
import { useState, useEffect } from 'react';
import {MdContentCopy } from 'react-icons/md'
import {HiQrcode } from 'react-icons/hi'
import {IoIosStats } from 'react-icons/io'
import { ChakraProvider, Box, Button, Input, InputGroup, InputRightElement, Center, Text, List, ListIcon, useBreakpointValue,ListItem,Card,CardBody,Flex,Grid,IconButton } from "@chakra-ui/react"
import { CopyToClipboard } from "react-copy-to-clipboard"

function App() {
  const [loading, setLoading] = useState(false)
  const [shortenedURLs, setShortenedURLs] = useState([])
  const fontSize = useBreakpointValue({ base: "md", md: "lg" })

  const handleClick = () => {
    // Shorten the URL and add it to the list of shortened URLs
    setShortenedURLs([...shortenedURLs, { longURL: "https://themesave.in/product/premium-url-shortener-script-download", shortURL: "http://short.url" }])
    setLoading(false)
  }

  return (
    <ChakraProvider>
      <Center h="100vh">
        <Box w="100%" maxW="800px">
          <Text fontSize={fontSize} fontWeight="bold" textAlign="center" mb="1rem">
            Shorten your url
          </Text>
          <InputGroup size="md">
            <Input pr="6.5rem" placeholder="Enter url" size={"lg"} variant='filled'/>
            <InputRightElement width="6rem">
              <Button h="2.1rem"  size="md" isLoading={loading} onClick={handleClick}>
                Shorten 
              </Button>
            </InputRightElement>
          </InputGroup>
          {shortenedURLs.length > 0 && (
            <Box mt="1rem">
              <List spacing="1rem">
                {shortenedURLs.map(({ longURL, shortURL }, index) => (
                <ListItem key={index}>
                    <Box p="2" borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <Flex alignItems={"center"}>
                      <Box flex="1"  ml="5px" overflow='hidden' textOverflow={"ellipsis"} whiteSpace="nowrap">{longURL}</Box>
                      <Grid templateColumns="1fr auto auto" gap="1rem" alignItems={"center"}>
                        <Box color="blue.300" fontWeight={"bold"}>{shortURL}</Box>
                        <IconButton aria-label='qrcode' variantColor="teal" size="md" icon={<HiQrcode />} />
                        {/* <IconButton aria-label='stats' variantColor="teal" size="md" icon={<IoIosStats />} /> */}
                        <CopyToClipboard text={shortURL}>
                            <IconButton aria-label='copy' variantColor="teal" size="md" icon={<MdContentCopy />} />
                        </CopyToClipboard>
                      </Grid>
                    </Flex>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Center>
    </ChakraProvider>
  )
}
// function App() {
//     const [loading, setLoading] = useState(false);

//     const toast = useToast()
//     useEffect(() => {
//         if (loading) {
//             setTimeout(() => {
//                 setLoading(false);
//                 toast({
//                     title: 'Error',
//                     description: "Url is not valid",
//                     status: 'error',
//                     duration: 3000,
//                     isClosable: true,
//                     variant: "subtle",
//                     position: "top-right"
//                   })
//             }, 2000);
//         }
//     }, [loading]);
//     return (
//         <Center h="100vh">
//             <Box w="100%" maxW="800px">
//                 <Text fontSize={useBreakpointValue({ base: 'md', md: 'lg' })} fontWeight="bold" textAlign="center" mb="1rem">
//                     Shorten your url
//                 </Text>
//                 <InputGroup size='md'>
//                     <Input
//                         pr='4.5rem'
//                         placeholder='Enter url'
//                     />
//                     <InputRightElement width='4.5rem'>
//                         <Button h='1.75rem' size='sm' isLoading={loading} onClick={()=>setLoading(true)}>
//                         Short
//                         </Button>
//                     </InputRightElement>
//                 </InputGroup>
//             </Box>
//         </Center>
//     );
// }

export default App;
