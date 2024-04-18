// Assuming this is in a type definition file somewhere in your project
export interface Metadata {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    type: string;
    url: string;
    title: string;
    description: string;
    images: string[];
  };
  twitter: {
    title: string;
    description: string;
    images: string[];
    // Ensure all properties are correctly typed
  };
  // Add any other properties you need
}
