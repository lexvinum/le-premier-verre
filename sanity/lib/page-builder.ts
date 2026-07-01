import { client } from "@/sanity/lib/client";
import type { PageSection } from "@/components/page-builder/types";

export type BuilderPage = {
  title?: string;
  slug?: string;
  pageType?: string;
  sections?: PageSection[];
};

export async function getPageByType(pageType: string): Promise<BuilderPage | null> {
  return client.fetch(
    `*[_type == "page" && pageType == $pageType && published == true][0]{
      title,
      "slug": slug.current,
      pageType,
      sections[]{
        ...,
        image,
        secondaryImage,
        thirdImage,
        editorialAsset->{
          title,
          alt,
          image
        },
        wines[]->{
          _id,
          name,
          vintage,
          "slug": slug.current,
          color,
          producer->{name},
          region->{name},
          bottleImage
        },
        producers[]->{
          _id,
          name,
          "slug": slug.current,
          shortBio,
          region->{name},
          country->{name},
          photo,
          heroImage
        }
      }
    }`,
    { pageType },
    { next: { revalidate: 60 } }
  );
}
