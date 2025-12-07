import data from "./placeholder-images.json";

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// A map to easily access images by their ID
export const placeholderImages: { [key: string]: ImagePlaceholder } =
  data.placeholderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as { [key: string]: ImagePlaceholder });
