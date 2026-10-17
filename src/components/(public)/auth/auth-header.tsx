import Link from "next/link";
import Image from "next/image";

export function AuthHeader() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Link href="/" className="flex items-center" aria-label="Provera AI home">
        <Image
          src="/provera-logo.png"
          alt="Provera AI"
          width={140}
          height={40}
          priority
        />
      </Link>
    </div>
  );
}
