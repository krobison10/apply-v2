import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Apply"
}

export default function Home() {
  return (
    <main>
      <div className='flex items-center justify-center h-screen'>
        <h1>Root</h1>
      </div>
    </main>
  )
}

