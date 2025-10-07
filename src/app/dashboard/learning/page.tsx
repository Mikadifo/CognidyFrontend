import { PuzzlesButton } from '@/app/components/PuzzlesButton';

export const metadata = {
  title: "Cognidy | Learning",
  description: "Learning section",
};

export default function Learning() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="font-poppins text-3xl font-bold mb-8">Learning</h1>
      <PuzzlesButton />
      <h2 className="font-poppins text-3xl font-bold mt-8">
        Coming Soon!
      </h2>
    </div>
  );
}
