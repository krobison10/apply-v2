

export default function ApplicationCard({ data }) {

  return (
    <div className="border-2 rounded m-4 p-3">
      <h2 className="">Application</h2>
      <ul>
        <li>{data.title}</li>
        <li>{data.name}</li>
      </ul>
    </div>
  )
}