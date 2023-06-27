import React, { useState, DragEvent } from 'react';
import { capFirstLetter, stableKeys } from '@/utils';
import { MenuItem, Select } from '@mui/material';
import {
  DragHandle as DragHandleIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

interface ReorderProps {
  list: any[];
  setList: (list: any[]) => void;
  lables: any[];
  exclude?: any[];
}

const Reorder: React.FC<ReorderProps> = ({ list, setList, lables, exclude, }) => {
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

  const getUniqueColumnValues = (columnKey: string, excludeValue?: string) => {
    const uniqueValues = new Set();
    list.forEach((item) => {
      if (item[columnKey] && item[columnKey] !== excludeValue) {
        uniqueValues.add(item[columnKey]);
      }
    });

    exclude?.forEach(({ key, value }: { key: string; value: string }) => {
      uniqueValues.delete(value);
    });
    uniqueValues.delete('NavBar');
    return Array.from(uniqueValues);
  };

  const styles = `
  .MuiSelect-icon {
    fill: white;
  }
`;

  const handleSelectChange = (
    e: React.ChangeEvent<{ value: unknown }>,
    index: number,
    key: string
  ) => {
    const value = e.target.value as string;
    const updatedList = list.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [key]: value,
        };
      }
      return item;
    });

    // Create an array to keep track of selected values
    const selectedValues: { [key: string]: string } = {};

    // Loop through the updated list and store the selected values for each key
    updatedList.forEach((item) => {
      Object.keys(item).forEach((k) => {
        if (item[k] !== '' && k !== key) {
          selectedValues[k] = item[k];
        }
      });
    });

    const updatedLabels = lables.map((label) => {
      if (label.key === key) {
        return {
          ...label,
          options: getUniqueColumnValues(key),
        };
      }
      return {
        ...label,
        options: getUniqueColumnValues(label.key).filter(
          (menuItem: string) => !selectedValues[label.key] || menuItem === selectedValues[label.key]
        ),
      };
    });

    setList(updatedList);
  };

  const handleVisibilityToggle = (index: number) => {
    const updatedList = list.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          visibility: !item.visibility, // Toggle the visibility state
        };
      }
      return item;
    });
    setList(updatedList);
  };

  const handleDelete = (index: number) => {
    const updatedList = list.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          visibility: !item.visibility, // Toggle the visibility state
        };
      }
      return item;
    });
    updatedList.splice(index, 1),
    setList(updatedList);
    
  };

  return (
    <div className="reorder-layout">
      {/* Labels */}
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
      <div style={{overflow: "auto", maxHeight: "500px"}}>
      {/* Table Rows */}
      {list.map((item, index) => {
        if (
          exclude?.some(
            ({ key, value }: { key: string; value: string }) =>
              item[key].toLowerCase() === value.toLowerCase()
          )
        )
          return null;
        return (
          <div
            key={stableKeys[index]}
            draggable
            onDragStart={handleDragStart}
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            id={index.toString()}
            className="p-3 mb-2 bg-rgb(14, 17, 23)-100 border-2 border-rgb(14, 17, 23)-200 rounded-md cursor-move relative"
            style={{
              transition: 'background 0.3s ease',
              backgroundColor: 'rgb(14, 17, 23)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgb(22, 27, 34)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgb(14, 17, 23)';
            }}
          >
            <span className="grid gap-5 grid-cols-6">
              {lables?.map(({ key }: { key: string }) => {
                if (key === 'views') {
                  return (
                    <span style={!item.visibility ? { color: "white" }: { color: "grey" }} className="mr-6 ml-5 span-1" key={key}>
                   {item.title !== "" ? 100  :  ""} 
                    </span>
                  );
                }
                if (key === 'date') {
                  return (
                    <span style={!item.visibility ? { color: "white" }: { color: "grey" }} className="mr-6 span-1" key={key}>
                      {item.title !== "" ? "20 Mar 2023": "" }
                    </span>
                  );
                }
                return (
                  <span className="mr-8 span-1" key={key}>
                    <style>{styles}</style>
                    <Select
                      value={item[key]}
                      onChange={(e) => handleSelectChange(e, index, key)}
                      variant="standard"
                      disableUnderline={true}
                      style={{ color: item.visibility ? 'grey' : 'white', height: '30px', width: 'auto', }}
                    >
                      {getUniqueColumnValues(key).map(
                        (menuItem: string, menuItemIndex: number) => (
                          <MenuItem key={menuItemIndex} value={menuItem}>
                            {menuItem}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </span>
                );
              })}

              <DeleteIcon
                style={{ color: 'white', cursor: 'pointer' }}
                className="absolute right-60 top-4"
                onClick={() => handleDelete(index)}
              />
              {!item.visibility ? (
                <VisibilityIcon
                  style={{ color: 'white', cursor: 'pointer' }}
                  className="absolute right-32 top-4"
                  onClick={() => handleVisibilityToggle(index)}
                />
              ) : (
                <VisibilityOffIcon
                  style={{ color: 'white', cursor: 'pointer' }}
                  className="absolute right-32 top-4"
                  onClick={() => handleVisibilityToggle(index)}
                />
              )}
              <DragHandleIcon style={{ color: 'white' }} className="absolute right-2 top-4" />
            </span>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Reorder;
