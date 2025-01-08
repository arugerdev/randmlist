/* eslint-disable prettier/prettier */
import { Button, DatePicker, Input, Checkbox } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

import ThrashIcon from "@/icons/thrash";


const ListData = ({ data, setData, defaultInputType = 'numbers'
    // , defaultRemoveInSelect = true
}: {
    data: any[], setData: React.Dispatch<React.SetStateAction<any[]>>, defaultInputType: string
    // , defaultRemoveInSelect: boolean
}) => {

    return (
        <section className="flex flex-col gap-4">
            <section className="flex flex-row gap-4 items-center justify-start w-full">
                <Button className="w-full" color="success" variant="ghost" onClick={() => {
                    setData([...data, (defaultInputType === 'numbers' ? 0 : (defaultInputType === 'date' ? parseDate('2024-12-19') : ''))]);
                }}>+</Button>
            </section>
            <section className="grid grid-cols-5 gap-4 items-center justify-center w-full relative pb-32">
                {data.map((item, index) => (
                    <section key={index} className="flex flex-row gap-4 items-center justify-start max-w-content p-4 bg-foreground-50 shadow-xl rounded-xl">
                        {defaultInputType === 'any' &&
                            <Input className="w-full" color="secondary" placeholder="Inserte un valor de texto o numerico..." type="text" value={item} variant="underlined" onChange={(e) => {
                                const newData = [...data];

                                newData[index] = e.target.value;
                                setData(newData);
                            }} />
                        }
                        {defaultInputType === 'numbers' &&
                            <Input color="secondary" max={Math.max()} min={Math.min()} placeholder="Inserte un valor numérico..." type="number" value={item} variant="underlined" onChange={(e) => {
                                const newData = [...data];

                                newData[index] = parseInt(e.target.value);
                                setData(newData);
                            }} />
                        }
                        {defaultInputType === 'date' &&
                            <DatePicker color="secondary" value={item || parseDate('2024-12-19')} variant="underlined" onChange={(e) => {
                                const newData = [...data];

                                newData[index] = e;
                                setData(newData);
                            }} />
                        }
                        <Button isIconOnly color="danger" variant="light" onClick={() => {
                            const newData = [...data];

                            newData.splice(index, 1);
                            setData(newData);
                        }}><ThrashIcon /></Button>
                    </section>
                ))}
            </section>

        </section>

    );
};

export default ListData;
