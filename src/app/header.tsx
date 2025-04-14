import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <div className="header p-2 m-0 flex items-center justify-between text-left bg-secondary">
      <Link href="/" className="text-5xl font-bold">
        the corkboard.
      </Link>
      <div className="flex items-end space-x-3">
        <Link href="/new">
          <Button>new post.</Button>
        </Link>
      </div>
    </div>
  );
}
