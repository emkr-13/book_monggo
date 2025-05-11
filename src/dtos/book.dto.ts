export interface AuthorRefDto {
  id: number;
  name?: string;
  nationality?: string;
}

export interface BookResponseDto {
  id: number;
  title: string;
  author: AuthorRefDto | null;
  publishedYear: number;
  genre?: string[];
  createdAt: Date;
  updatedAt: Date;
}
