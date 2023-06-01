import React, {useState, DragEvent} from 'react'
import { capFirstLetter, stableKeys } from '@/utils';
import { GrDrag } from 'react-icons/gr';

interface ReorderProps {
    list: any[]
    setList: (list: any[]) => void
    lables: any[]
    exclude?: any[]
}

const Reorder: React.FC<ReorderProps> = ({list, setList, lables, exclude}) => {
    const [dragId, setDragId] = useState<string>('0');

    const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.effectAllowed = 'move';
        e.currentTarget.classList.add('jk-dragging');
        setDragId(e.currentTarget.id);
    };

    const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
        const originId = dragId ? parseInt(dragId) : 0;
        const newList = [...list];
        const id = parseInt(e.currentTarget.id);
        const dragEl = newList[originId];
        newList.splice(originId, 1);
        newList.splice(id, 0, dragEl);
        // setDragId(null);
        setList(newList);
        e.currentTarget.classList.add('jk-droped');
        
    };


    /* const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        const newList = [...list];
        const id = e.currentTarget.id;
        const dragEl = newList[dragId];
        newList.splice(dragId, 1);
        newList.splice(id, 0, dragEl);
        setDragId(id);
        setList(newList);
    }; */

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('jk-dragover');
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('jk-dragover');
    };

    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('jk-dragging');
        // remove bg-green-100 from all elements
        const elements = document.querySelectorAll('.jk-dragover');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('jk-dragover');
        }
        setTimeout(() => {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('jk-droped');
            }
        }, 500);

    };

    return (
        <div className="reorder-layout">
            {list.map((item, index) => {

                if(exclude?.some(({key, value} : {key: string, value: string}) => item[key].toLowerCase() === value.toLocaleLowerCase())) return null;

                return (
                    <div 
                        key={stableKeys[index]}
                        draggable
                        onDragStart={handleDragStart}
                        onDrop={handleOnDrop}
                        // onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDragEnd={handleDragEnd}
                        id={index.toString()}
                        className='p-3 mb-2 bg-gray-100 border-2 border-gray-200 rounded-md cursor-move relative'
                        >
                        <span className='grid gap-4 grid-cols-2'>
                            {lables?.map(({key, lable} : {key: string, lable: string}) => (
                                item[key] && (<span className='mr-6 span-1'>{lable} <b>{capFirstLetter(item[key])}</b></span>)
                            ))}
                            <GrDrag className='absolute right-2 top-4'/>
                        </span>
                    </div>
                )}
            )}
        </div>
    )
}

export default Reorder