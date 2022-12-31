import React from 'react';
import { useState, useEffect } from 'react';
import {MdContentCopy,MdDelete } from 'react-icons/md'
import {HiQrcode } from 'react-icons/hi'
import { useColorMode, Box, Button, Input, InputGroup, InputRightElement, Center, Text, List, useToast , useBreakpointValue,ListItem,Flex,Grid,IconButton } from "@chakra-ui/react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import './App.css';
import QrModal from './QrModal';

import { useDisclosure } from "@chakra-ui/react"

const BACKEND_URL = "https://url.stepashka20.ru"

function App() {
    const { colorMode, toggleColorMode } = useColorMode()
    const [loading, setLoading] = useState(false)
    const [shortenedURLs, setShortenedURLs] = useState([])
    const [url, setUrl] = useState("")
    const fontSize = useBreakpointValue({ base: "md", md: "lg" })
    const toast = useToast();


    const handleClick = async () => {
        if (!url) return
        setLoading(true)

        const res = await fetch(`${BACKEND_URL}/getShortUrl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'url='+url
        })

        const data = await res.text()

        if (res.ok){
            setShortenedURLs([{ longURL: url, shortURL: `${BACKEND_URL}/${data}` },...shortenedURLs])
            setUrl("")
            setLoading(false)
        } else {
            setLoading(false)
            toast({
                title: 'Error',
                description: "Something went wrong",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
        }
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [qrUrl,setQrUrl] = useState("")
    const handleQrClick = (url) => {
        setQrUrl(url)
        onOpen()
    }
    useEffect(() => {
        if (colorMode !== "dark") toggleColorMode()
        console.log("Load")
        const storedURLs = window.localStorage.getItem("shortenedURLs");
        if (storedURLs) {
            setShortenedURLs(JSON.parse(storedURLs));
        }
    }, [])
    useEffect(() => {
        console.log("Save")
        window.localStorage.setItem("shortenedURLs", JSON.stringify(shortenedURLs));
    }, [shortenedURLs]); 
    const isMobile = useBreakpointValue({ base: true, md: false })
    return ( 
        <>
        <QrModal isOpen={isOpen} url={qrUrl} onClose={onClose}/>
        <Center display="flex" flexDirection="column" alignItems="center" h={isMobile ? "calc(100vh - 60px)" : "100vh"} >
        
            <Box w="100%" maxW="800px">
                <Text fontSize={fontSize} fontWeight="bold" textAlign="center" mb="1rem">
                    Shorten your url
                </Text>
                <InputGroup size="md">
                    <Input pr="6.5rem" placeholder="Enter url" size={"lg"} variant='filled' onChange={(e) => setUrl(e.target.value)} value={url} />
                    <InputRightElement width="6rem" h="100%" mr="4px">
                    <Button h="2.1rem"  size="md" isLoading={loading} onClick={handleClick}>
                        Shorten 
                    </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Box overflowY="scroll" maxH={700} w="100%" maxW="800px" className="scrollable-container">
                {shortenedURLs.length > 0 && (
                    <Box mt="1rem">
                        <List spacing="1rem">
                            {shortenedURLs.map(({ longURL, shortURL }, index) => (
                            <ListItem key={index}>
                                <Box p="2" borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                <Flex alignItems={"center"}>
                                <Box flex="1"  ml="5px" overflow='hidden' textOverflow={"ellipsis"} whiteSpace="nowrap">{longURL}</Box>
                                <Grid templateColumns="1fr auto auto auto" gap="1rem" alignItems={"center"}>
                                    <Box color="blue.300" fontWeight={"bold"}>{shortURL}</Box>
                                    <IconButton aria-label='qrcode'  size="md" icon={<HiQrcode />}onClick={()=>handleQrClick(shortURL)} />
                                    {/* <IconButton aria-label='stats'  size="md" icon={<IoIosStats />} /> */}
                                    <CopyToClipboard text={shortURL}>
                                        <IconButton aria-label='copy' size="md" icon={<MdContentCopy />} />
                                    </CopyToClipboard>
                                    <IconButton aria-label='delete' size="md" icon={<MdDelete />} variant='outline' onClick={() => {
                                        setShortenedURLs(shortenedURLs.filter((_, i) => i !== index))
                                    }} />
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
        </>
    )
}

export default App;
