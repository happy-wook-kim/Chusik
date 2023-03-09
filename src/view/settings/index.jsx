import infoStore from "../../stores/info"

export default function Settings() {
  const [name, setName] = infoStore((state) => [state.name, state.setName])

  return (
    <div>
      <h1>SEttings</h1>
      <strong>{name}</strong>
    </div>
  )
}