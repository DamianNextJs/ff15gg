import Button from "@/components/Button";
import Link from "next/link";

export default function BuildGuides() {
  return (
    <div>
      BUILD GUIDES!!{" "}
      <Link href={"/build-guides/create"}>
        <Button>Create </Button>
      </Link>
    </div>
  );
}
