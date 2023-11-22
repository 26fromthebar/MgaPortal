export interface IListItem {
  title: string;
  creator: string;
  type: string;
  imageUrl: string;
  thumbnails?: {
    small: string;
    medium: string;
    large: string;
  };
  uuid: string;
}
