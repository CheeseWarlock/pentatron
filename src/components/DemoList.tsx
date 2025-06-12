import { useState } from "react";
import DemoListItem from "./DemoListItem";

function DemoList() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const demos = [
    { name: "Demo 1", description: "This is a demo of the first demo" },
    { name: "Demo 2", description: "This is a demo of the second demo" },
    { name: "Demo 3", description: "This is a demo of the cool structure" },
    { name: "Demo 4", description: "This is not the demo you're looking for" },
    { name: "Demo 5", description: "You have no special power" },
  ];

  return (
    <div>
      <h1>Demo List</h1>
      {demos.map((demo, index) => (
        <DemoListItem key={index} selected={selectedIndex === index} name={demo.name} description={demo.description} onClick={() => setSelectedIndex(index)} />
      ))}
    </div>
  );
}

export default DemoList;