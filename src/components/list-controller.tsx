/* eslint-disable prettier/prettier */
import {
    Select, SelectItem, Button, Checkbox, Accordion, AccordionItem, ScrollShadow, Link, Divider, Input, Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure, Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { parseDate } from "@internationalized/date";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import ListData from "./list-data";

export const types = [
    { key: "numbers", label: "Solo Números" },
    { key: "any", label: "Texto y números" },
    { key: "date", label: "Fechas" },
];

const ListController = ({ defaultInputType = 'numbers', defaultRemoveInSelect = true, defaultResultNumber = 1 }) => {
    const [inputType, setInputType] = useState<string>(defaultInputType)
    const [removeInSelect, setRemoveInSelect] = useState<boolean>(defaultRemoveInSelect);
    const [resultNumber, setResultNumber] = useState<number>(defaultResultNumber);
    const [data, setData] = useState<any[]>([0]);
    const [selectedData, setSelectedData] = useState<any[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { width, height } = useWindowSize()
    const { isOpen: isHistoryOpen, onOpen: onHistoyOpen, onOpenChange: onHistoyOpenChange } = useDisclosure();
    const portalContainer = useRef()

    useEffect(() => {
        setData([])
        setData([(inputType === 'numbers' ? 0 : (inputType === 'date' ? parseDate('2024-12-19') : ''))])
    }, [inputType])

    const randomDataSelection = () => {
        let dataSelected: any[] = []

        for (let i = 0; i < resultNumber; i++) {
            const randomIndex = parseInt((Math.random() * (data.length - 1)).toFixed(0))
            let element;

            if (removeInSelect) {
                element = data.splice(randomIndex, 1)
            }
            else {
                element = data.at(randomIndex)
            }

            dataSelected = [...dataSelected, element]
        }
        setSelectedData([...selectedData, dataSelected])

        onOpen()
    }

    return (
        <>
            {isOpen &&

                <Confetti
                    height={height}
                    width={width}
                />
            }
            <Button isIconOnly className="absolute bg-background right-0 top-[50%] rounded-full text-xl font-extrabold" variant="solid" onPress={onHistoyOpen}>{"<"}</Button>
            <Drawer isOpen={isHistoryOpen} onOpenChange={onHistoyOpenChange}>
                <DrawerContent className="overflow-visible">
                    {(onClose) => (
                        <>
                            <DrawerHeader>Historial de selecciones</DrawerHeader>
                            <DrawerBody className="relative overflow-visible">
                                <section className="overflow-visible w-full flex flex-col gap-2 items-center justify-center text-xl">
                                    {[...selectedData].map((data, index) => (
                                        <section key={data + '_' + index} className="flex flex-row gap-1 items-center justify-start">
                                            <p>{index + 1}.</p>
                                            <p className="text-default-600">{data.join(',')}</p>
                                        </section>
                                    ))
                                    }
                                </section>
                                <Button isIconOnly className="absolute bg-background left-[-15px] top-[50%] rounded-full text-xl font-extrabold" variant="solid" onPress={onClose}>{">"}</Button>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="danger" variant="light" onPress={onHistoyOpenChange}>
                                    Cerrar
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>

            <section ref={portalContainer as unknown as React.RefObject<HTMLDivElement>} className="flex flex-col gap-4 items-center justify-center w-full relative">
                <Accordion className="w-full" variant="shadow">
                    <AccordionItem key="1" aria-label="Configuración de la lista" subtitle="Configura la lista con opciones dinamicas de tipo de datos, funcionamiento de la lista y más" title="Configuración de la lista">
                        <section className="flex flex-row w-full gap-4 items-center justify-start">
                            <Select isRequired className="max-w-xs" defaultSelectedKeys={[defaultInputType]} label="Tipo de entrada" value={inputType} onChange={(e) => {
                                setData([(inputType === 'numbers' ? 0 : (inputType === 'date' ? parseDate('2024-12-19') : ''))])
                                setResultNumber(1)
                                setInputType(e.target.value);
                            }}>
                                {types.map((type) => (
                                    <SelectItem key={type.key}>{type.label}</SelectItem>
                                ))}
                            </Select>
                            <p>Eliminar el registro al ser elegido</p>
                            <Checkbox defaultChecked={defaultRemoveInSelect} isSelected={removeInSelect} onValueChange={setRemoveInSelect} />
                            <Input className="max-w-[256px]" label="Cantidad a seleccionar" labelPlacement="outside-left" max={data.length - 1} min={1} type='number' value={resultNumber.toString()} onChange={(e) => setResultNumber(parseInt(e.target.value))} />
                        </section>
                    </AccordionItem>
                </Accordion>
                <Divider />

                <section className="w-full max-h-[500px] flex items-start justify-center overflow-auto">
                    <ScrollShadow className="w-full h-full" size={100}>
                        <ListData data={data} defaultInputType={inputType} defaultRemoveInSelect={removeInSelect} setData={setData} />
                    </ScrollShadow>
                </section>
                <footer className="fixed bottom-0 w-full flex flex-col gap-2 p-2 items-center justify-center shadow-xl bg-background">
                    <section className="flex flex-row gap-4 items-center justify-center w-full">

                        <Button className="font-bold" color="primary" isDisabled={data.length <= 1} variant="faded" onPress={() => randomDataSelection()}>Ejecutar lista</Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Datos seleccionados</ModalHeader>
                                        <ModalBody>
                                            <section className="w-full flex flex-col gap-2 items-center justify-center">
                                                <p className="text-default-600">{[...selectedData].at(selectedData.length - 1).join(', ')}</p>
                                            </section>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Cerrar
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>

                        <Button className="font-bold" color="danger" variant="light" onPress={() => { setData([(inputType === 'numbers' ? '0' : (inputType === 'date' ? parseDate('2024-12-19') : ''))]); setSelectedData([]) }
                        }>Limpiar datos</Button>
                    </section>
                    <Divider />
                    <section className="w-full flex items-center justify-center py-3">
                        <Link
                            isExternal
                            className="flex items-center gap-1 text-current"
                            href="https://aruger.dev"
                            title="aruger.dev"
                        >
                            <span className="text-default-600">Hecho por</span>
                            <p className="text-primary">ArugerDev</p>
                        </Link>
                    </section>
                </footer>
            </section>
        </>

    );
};

export default ListController;
