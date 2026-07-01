import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "./types";

type EditorialImageProps = {
  image?: SanityImage;
  className: string;
  alt: string;
};

export function EditorialImage({
  image,
  className,
  alt,
}: EditorialImageProps) {
  if (!image?.asset?._ref) {
    return (
      <div
        className={`${className} bg-[linear-gradient(160deg,#ede0cc,#9c7b5f_48%,var(--lpv-olive))]`}
      />
    );
  }

  const imageUrl = urlFor(image).width(1200).height(1600).url();

  return (
    <div className={`${className} relative overflow-hidden`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
