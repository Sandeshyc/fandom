import React, { useState, useEffect } from 'react';
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
  duration: number;
  date: string;
  currentLayout: any[];
  playlist: any;
  setCurrentLayout: any;
}

const EditMenu: React.FC<Row> = ({ currentLayout, playlist, setCurrentLayout }) => {
  const [isReorderModalVisible, setReorderModalVisible] = useState(false);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [rowCount, setRowCount] = useState(currentLayout.items.length);

  const [rows, setRows] = useState<Row[]>(() => {
    const matchingItems = currentLayout.items.find((item) => item.displayType === playlist.displayType);
    if (matchingItems) {
      return matchingItems.items.map((item, index) => ({
        id: index + 1,
        showIcon: false,
        headline: item.title,
        description: item.description,
        duration: item.duration,
        date: item.createdDate,
        currentLayout: currentLayout,
        playlist: playlist
      }));
    } else {
      return [];
    }
  });
  

  const lables = [
    { key: 'title', label: 'Headline' },
    { key: 'displayType', label: <Tooltip bg='white' color='black' label="Description">Desc</Tooltip> },
    { key: 'views', label: <ShowChartIcon style={{ color: 'white' }} /> },
    { key: 'date', label: <EventIcon style={{ color: 'white' }} /> },
  ];
  const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);

  const handleAddRow = (): void => {
    const newRows = [
      {
        id: rowCount + 1,
        showIcon: false,
        headline: rows[0].headline,
        description: rows[0].description,
        duration: rows[0].duration,
        date: rows[0].date,
        currentLayout: currentLayout,
        playlist: playlist
      },
      ...rows
    ];
    setRows(newRows);
    setRowCount(rowCount + 1);
  
    const newLayout = { ...currentLayout };
    const matchingItems = newLayout.items.find((item) => item.displayType === playlist.displayType);
    if (matchingItems) {
      matchingItems.items.unshift({
        title: rows[0].headline,
        description: rows[0].description,
        duration: rows[0].duration,
        date: rows[0].date
      });
    }
    setCurrentLayout(newLayout);
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
    setHoveredRowIndex(null);
  };

  const handleMouseLeave = (index: number): void => {
    const newRows = [...rows];
    newRows[index].showIcon = false;
    setRows(newRows);
    setHoveredRowIndex(index);
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
  
    const newLayout = { ...currentLayout };
    const matchingItems = newLayout.items.find((item) => item.displayType === playlist.displayType);
    if (matchingItems) {
      matchingItems.items = rows.map((row) => ({
        title: row.headline,
        description: row.description,
        duration: row.duration,
        date: row.date
      }));
    }
    setCurrentLayout(newLayout);
  };
  

  return (
    <>
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
            borderColor: 'white'
          }}
        >
          <div style={{ height: '60px', display: 'flex', alignItems: 'end' }}>
            <div style={{ color: 'white', marginLeft: '25px', fontSize: '20px', fontWeight: 'bold' }}>Change Content</div>
            <div style={{marginRight:"25px"}} className="cursor-pointer absolute top-6 right-40">
              <Button variant="contained" onClick={handleAddRow}>
                Insert
              </Button>
            </div>
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

<div style={{ width: '100%', maxHeight: '600px', overflowY: 'auto',height:"450px" }}>
<div style={{ display: 'flex', flexDirection: 'column', marginBottom:"100px" }}>
  {rows.map((row, index) => (
    <React.Fragment key={row.id}>
      <div
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
          <div style={{ width: '15%', marginRight: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.headline}</div>
          <div style={{ width: '18%', marginRight: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {row.description}
          </div>
          <div style={{ width: '15%', marginRight: '10px' }}>{row.duration}</div>
          <div style={{ width: '20%', marginRight: '10px' }}>{row.date}</div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <DeleteIcon onClick={() => handleDeleteRow(index)} style={{ fontSize: 20, color: '#fff', marginRight: '180px', cursor: 'pointer' }} />
            <DragHandleIcon style={{ fontSize: 20, color: '#fff' }} />
          </div>
        </div>
      </div>
    </React.Fragment>
  ))}
  </div>
</div>


          </div>
        </div>
      )}
    </>
  );
};

export default EditMenu;

