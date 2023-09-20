import { SimpleGrid, Skeleton, Text, forwardRef } from "@chakra-ui/react"
import PictureCard from "./PictureCard"
import usePictures from "../hooks/usePitctures"
import { Picture } from "../types/general.types"
import { useState, useEffect } from "react"

import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy
} from '@dnd-kit/sortable';

interface Props {
    loggedIn: Boolean,
    searchQuery: string
}

const PictureList = ({ loggedIn, searchQuery }: Props) => {
    const { data, isLoading, error } = usePictures();
    const [pictures, setPictures] = useState<Picture[]>([]);
    const sklData = [1, 2, 3, 4, 5, 6, 7];
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(TouchSensor, { activationConstraint: { delay: 2, tolerance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const Item = forwardRef(({ id, ...props }, ref) => {
        return (
            <div {...props} ref={ref}></div>
        )
    });

    useEffect(() => {
        const filtered = data.filter((picture) =>
            picture.alt.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setPictures(filtered);
    }, [searchQuery]);

    useEffect(() => {
        setPictures(data);
    }, [isLoading]);

    function handleDragStart(event: any) {
        const { active } = event;

        if (!loggedIn) {
            alert('You need to login to use that feature');
        }

        setActiveId(active.id);
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id === over.id) return;


        setPictures((items) => {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);

            return arrayMove(items, oldIndex, newIndex);
        });
    }

    if (error) return <Text>{error}</Text>

    if (isLoading) {
        return <SimpleGrid
            columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
            spacing='10px' width='90%'
        >
            {sklData.map((dt) => <Skeleton key={dt} borderRadius='10px' height={{ base: '140px', lg: '210px' }} />)}
        </SimpleGrid>
    }

    if (!loggedIn) {
        return <>
            <SimpleGrid
                columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
                spacing='10px' width='90%'
                className="row"
            >
                {!isLoading && pictures.map((pic, index) =>
                    <PictureCard key={pic.id} index={index} pic={pic} loggedIn={loggedIn} />
                )}
            </SimpleGrid>
        </>
    }

    return <>
        <SimpleGrid
            columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
            spacing='10px' width='90%'
            className="row"
        >
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <SortableContext items={pictures} strategy={rectSortingStrategy}>
                    {!isLoading && pictures.map((pic, index) =>
                        <PictureCard key={pic.id} index={index} pic={pic} loggedIn={loggedIn} />
                    )}
                </SortableContext>
                <DragOverlay>
                    {activeId ? <Item id={activeId} /> : null}
                </DragOverlay>
            </DndContext>
        </SimpleGrid>
    </>
}

export default PictureList