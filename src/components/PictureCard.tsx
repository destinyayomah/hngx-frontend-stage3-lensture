import { Image, Text, VStack } from "@chakra-ui/react"
import { Picture } from "../types/general.types"

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRef } from "react";

interface Props {
    pic: Picture,
    index: number,
    loggedIn: Boolean
}

const PictureCard = ({ pic, loggedIn }: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: pic.id });
    const nonDraggableContentRef = useRef(null);

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        touchAction: 'manipulation'
    };

    return <VStack
        border='1px solid #D4D4D4'
        borderRadius='10px'
        cursor={loggedIn ? 'grabbing' : 'grab'}
        justifyContent='start'
        ref={loggedIn ? setNodeRef : nonDraggableContentRef}
        style={style}
        {...listeners}
        {...attributes}
    >
        <Image src={pic.src.medium} alt={pic.alt} width='100%' height={{ base: '110px', lg: '180px' }} minHeight={{ base: '110px', lg: '180px' }} fit='cover' borderRadius='10px 10px 0 0' />
        <Text
            borderRadius='0 0 10px 10px'
            bg='black'
            height='100%'
            width='100%'
            padding='0 10px'
            color='white'
            paddingBottom='5px'
            fontSize={{ base: '11px' }}>
            {pic.alt.slice(0, 35)}
        </Text>
    </VStack>

}

export default PictureCard