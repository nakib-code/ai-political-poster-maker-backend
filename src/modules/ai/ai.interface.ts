export interface PosterLayoutSuggestion {
  backgroundStyle: string;
  primaryColor: string;
  secondaryColor: string;
  textAlignment:
    | "left"
    | "center"
    | "right";
  photoArrangement:
    | "single"
    | "horizontal"
    | "grid";
  decoration: string;
  fontStyle:
    | "bold"
    | "elegant"
    | "modern";
}