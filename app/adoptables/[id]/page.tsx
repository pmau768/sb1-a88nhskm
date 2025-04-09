import { adoptables } from "@/data/adoptables";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DogProfilePage({ params }: { params: { id: string } }) {
  const dog = adoptables.find((d) => d.id === params.id);
  if (!dog) return notFound();


  return (
    <div className="section-container">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Image
          src={dog.image}
          alt={dog.name}
          width={600}
          height={400}
          className="rounded-xl w-full h-auto object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold mb-2">{dog.name}</h1>
          <p className="text-muted-foreground mb-4 italic">{dog.breed}</p>
          <ul className="space-y-2 mb-6">
            <li><strong>Age:</strong> {dog.age}</li>
            <li><strong>Size:</strong> {dog.size}</li>
            <li><strong>Personality:</strong> {dog.personality}</li>
          </ul>
          <p className="mb-6">{dog.description}</p>

          <Button asChild size="lg">
            <Link href={`/apply?id=${dog.id}`}>Apply to Adopt</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// This tells Next.js which paths to pre-render
export function generateStaticParams() {
  return adoptables.map((dog) => ({
    id: dog.id, // Use the ID directly - it's already a string in the data
  }))
}