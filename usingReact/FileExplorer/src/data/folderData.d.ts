interface Item {
  id: string;
  name: string;
  isFolder: boolean;
  items: Item[];
}

declare const explorer: Item;

export default explorer;
