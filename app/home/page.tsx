import ApplicationsFeed from "@/components/ApplicationsFeed"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Apply | Dashboard"
}

export default function Home() {
  return (
    <main>
      <ApplicationsFeed/>
    </main>
  );
}

