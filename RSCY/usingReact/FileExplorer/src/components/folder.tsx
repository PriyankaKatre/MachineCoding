import React, { useState } from 'react'
import explorer from './../data/folderData';

interface Item {
  id: string;
  name: string;
  isFolder: boolean;
  items: Item[];
}


const Folder = ({ explorer, handleInsertNode }: Item) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolderFile = (e, isFolder) => {
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleAddNewFolder = (e) => {

      if (e.keyCode === 13 && e.target.value) {
         handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div>
        <span className="folder" onClick={() => setIsExpand(!isExpand)}>
          📁{explorer.name}
          <div>
            <button onClick={(e) => handleNewFolderFile(e, true)}>
              Folder +
            </button>
            <button onClick={(e) => handleNewFolderFile(e, false)}>
              File -
            </button>
          </div>
        </span>
        {isExpand && (
          <div
            style={{
              //   display: isExpand ? "block" : "none",
              paddingLeft: "25px",
            }}
          >
            {showInput.visible && (
              <div className="inputContainer">
                <span>{showInput.isFolder ? "📁" : "📄"}</span>
                <input
                  type="text"
                  className="inputContainer__input"
                  onKeyDown={(e) => handleAddNewFolder(e)}
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                  autoFocus
                />
              </div>
            )}
            {explorer.items.map((exp: Item) => {
              return (
                <Folder explorer={exp} handleInsertNode={handleInsertNode} />
              );
            })}
          </div>
        )}
      </div>
    );
  } else {
    return <span>🗄️{explorer.name}</span>;
  }
};

export default Folder
