import React, { useState } from 'react';
import { Edit as EditIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Event as EventIcon,
  BarChart as ShowChartIcon,
  Info as InfoIcon,
  DragHandle as DragHandleIcon
} from '@mui/icons-material';
import { Tooltip } from '@chakra-ui/react';

interface Row {
  id: number;
  showIcon: boolean;
  headline: string;
  description: string;
  amount: number;
  date: string;
}

const EditMenu: React.FC = () => {
  const [isReorderModalVisible, setReorderModalVisible] = useState(false);
  const [rows, setRows] = useState<Row[]>([
    { id: 1, showIcon: false, headline: 'Headline 1', description: 'This is Desc 1', amount: 100, date: '20 Mar 2023' },
    { id: 2, showIcon: false, headline: 'Headline 2', description: 'This is Desc 2', amount: 100, date: '20 Mar 2023' },
    { id: 3, showIcon: false, headline: 'Headline 3', description: 'This is Desc 3', amount: 100, date: '20 Mar 2023' },
  ]);

  const lables = [
    { key: 'title', label: 'Headline' },
    { key: 'displayType', label: <Tooltip bg='white' color='black' label="Description">Desc</Tooltip> },
    { key: 'views', label: <ShowChartIcon style={{ color: 'white' }} /> },
    { key: 'date', label: <EventIcon style={{ color: 'white' }} /> },
  ];
  const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);

  const handleAddRow = (index: number): void => {
    const newRows = [...rows];
    const newRow = { ...newRows[index] };
    newRow.id = newRows.length + 1;
    newRows.splice(index + 1, 0, newRow);
    setRows(newRows);
  };

  const handleDeleteRow = (index: number): void => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleMouseEnter = (index: number): void => {
    const newRows = [...rows];
    newRows[index].showIcon = true;
    setRows(newRows);
  };

  const handleMouseLeave = (index: number): void => {
    const newRows = [...rows];
    newRows[index].showIcon = false;
    setRows(newRows);
  };

  const handleEditClick = (): void => {
    setReorderModalVisible(true);
  };

  const handleCloseModal = (): void => {
    setReorderModalVisible(false);
  };

  const handleDragStart = (index: number): void => {
    setDraggedRowIndex(index);
  };

  const handleDragOver = (index: number): void => {
    if (draggedRowIndex !== null) {
      const newRows = [...rows];
      const draggedRow = newRows[draggedRowIndex];
      newRows.splice(draggedRowIndex, 1);
      newRows.splice(index, 0, draggedRow);
      setRows(newRows);
      setDraggedRowIndex(index);
    }
  };

  const handleDragEnd = (): void => {
    setDraggedRowIndex(null);
  };

  return (
    <>
      {/* Other menu content */}
      <EditIcon onClick={handleEditClick} />
      {isReorderModalVisible && (
        <div
          style={{
            color: 'black',
            zIndex: '99999999999999',
            width: '1200px',
            height: '600px',
            background: 'black',
            position: 'fixed',
            left: '0',
            right: '0',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '5px',
            borderWidth: '2px',
            borderColor: 'white',
          }}
        >
          <div style={{ height: '60px', display: 'flex', alignItems: 'end' }}>
            <div style={{ color: 'white', marginLeft: '25px', fontSize: '20px', fontWeight: 'bold' }}>Change Content</div>
            <div className="cursor-pointer absolute top-6 right-20">
              <Button variant="contained" onClick={handleCloseModal} data-button="close">
                Cancel
              </Button>
            </div>
            <div className="cursor-pointer absolute top-6 right-3 h-10 w-10 rounded-full bg-white bg-opacity-70 flex items-center justify-center">
              <XMarkIcon onClick={handleCloseModal} className="text-white w-6" data-button="close" />
            </div>
          </div>
          <div style={{ padding: '25px' }}>
          <div className="grid gap-6 grid-cols-6">
        {lables?.map(({ key, label }: { key: string; label: string }) => (
          <span key={key}>
            <span style={{ color: 'white', marginLeft: "20px" }}>{label}</span>
          </span>
        ))}
        <span className="mr-6 span-1"></span>
        <span className="mr-6 span-1"></span>
        <span className="mr-6 span-1"></span>
        <span className="mr-6 span-1"></span>
      </div>
            {rows.map((row, index) => (
              <div
                key={row.id}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={() => handleDragOver(index)}
                onDragEnd={handleDragEnd}
                style={{
                  padding: '10px',
                  borderColor: '#f0f0f0',
                  marginBottom: '10px',
                  borderWidth: '2px',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'move',
                  opacity: draggedRowIndex === index ? 0.5 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <div style={{ width: '15%', marginRight: '10px' }}>{row.headline}</div>
                  <div style={{ width: '18%', marginRight: '10px' }}>{row.description}</div>
                  <div style={{ width: '15%', marginRight: '10px' }}>{row.amount}</div>
                  <div style={{ width: '20%', marginRight: '10px' }}>{row.date}</div>
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                    <DeleteIcon onClick={() => handleDeleteRow(index)} style={{ fontSize: 20, color: '#fff', marginRight: '180px', cursor: 'pointer' }} />
                    <DragHandleIcon style={{ fontSize: 20, color: '#fff' }} />
                  </div>
                </div>
                {row.showIcon && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '5px',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleAddRow(index)}
                    >
                      <AddIcon style={{ fontSize: 20, color: '#fff' }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EditMenu;
