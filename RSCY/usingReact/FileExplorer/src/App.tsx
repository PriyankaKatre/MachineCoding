import { useState, useRef } from "react";
import "./App.css";
import explorer from './data/folderData.js'
import Folder from "./components/folder.js";
import useTraverseTree from "./hooks/use-traverse-tree.js";

interface Item {
  id: string;
  name: string;
  isFolder: boolean;
  items: Item[];
}



function App() {
    const [explorerData, setExplorerData] = useState<Item>(explorer);
    const { insertNode } = useTraverseTree();

    const handleInsertNode = (folderId, item, isFolder) => {
      const finalTree = insertNode(explorerData, folderId, item, isFolder);
      setExplorerData(finalTree);
    };
  return (
    <>
      <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
    </>
  );
}

export default App;
