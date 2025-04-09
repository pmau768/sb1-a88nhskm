import { notFound } from "next/navigation"
import { lostDogPosts } from "@/data/lost-dogs"
import { LostDogDetailsClient } from "@/components/lost-dog-details-client"

// This tells Next.js which paths to pre-render
export function generateStaticParams() {
  return lostDogPosts.map((post) => ({
    id: post.id,
  }))
}

export default function LostDogDetailsPage({ params }: { params: { id: string } }) {
  const post = lostDogPosts.find(post => post.id === params.id)
  if (!post) return notFound()

  return <LostDogDetailsClient post={post} />
}