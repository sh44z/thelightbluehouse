import ListPropertyForm from "@/components/ListPropertyForm";

export default function ListPropertyPage() {
  const userId = "64b7f9e5e4b0f5a1c8d9e123"; // Replace with a valid ObjectId

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">List Your Property</h1>
      <ListPropertyForm userId={userId} />
    </div>
  );
}