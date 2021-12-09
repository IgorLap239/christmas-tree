export interface DataNews {
  articles?: Array<Text>;
  status: string;
  totalResults?: number;
}

export interface DataSources {
  sources?: Array<Article>;
  status: string;
}

export type Text = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: string;
  title: string;
  url: string;
  urlToImage: string;
}

export type Article = {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

/*export interface DataObj {
  articles: Array<Text>;
  status: string;
  totalResults: number;
}*/

export type CallbackFunc<T> = (data: T) => void;

export type TUrlOptions = {
  [prop: string]: string;
}

export interface OptionsLoad {
  [key: string]: string;
}