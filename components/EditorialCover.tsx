import Image from "next/image";

const photos = {
  trust: ["Julia Taubitz", "concrete-brutalist-architecture-with-stairs-and-buildings-3TBzCd2ECVE"],
  audit: ["I P", "modern-concrete-architecture-with-geometric-patterns-and-stairs-dzql1-bpIso"],
  privacy: ["Amlan Sahoo", "misty-mountains-with-a-winding-path-visible-W9AoEAKqjeo"],
  data: ["Amanda Selby", "misty-mountains-and-forest-under-a-clear-sky-s2pl2N4lyVg"],
};

export default function EditorialCover({ photo }: { photo: keyof typeof photos }) {
  const [author, slug] = photos[photo];
  return (
    <figure className="mx-auto max-w-[1120px] px-5 pt-6 sm:pt-10">
      <div className="relative aspect-[1.65] overflow-hidden rounded-2xl bg-forge-cream2 sm:aspect-[2.6]">
        <Image src={`/editorial/${photo}.webp`} alt="" fill sizes="(min-width: 1120px) 1080px, 95vw" className="object-cover" />
      </div>
      <figcaption className="mt-2 text-right text-xs text-brand-muted">
        <a href={`https://unsplash.com/photos/${slug}`} className="hover:underline">Photo by {author} on Unsplash</a>
      </figcaption>
    </figure>
  );
}
