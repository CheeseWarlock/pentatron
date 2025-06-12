function DemoListItem({ selected, name, description, onClick }: { selected: boolean, name: string, description: string, onClick: () => void }) {
  return (<div onClick={onClick} className={`${selected ? "text-blue-500" : ""}`}>
    <h2>{name}</h2>
    <p>{description}</p>
</div>)
}

export default DemoListItem;