declare module 'google-trends-api' {
  interface GoogleTrendsOptions {
    keyword?: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    tz?: number;
    category?: number;
    hl?: string;
    resolution?: string;
    granularTimeResolution?: boolean;
  }

  interface RelatedQueriesOptions {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    category?: number;
    tz?: number;
  }

  interface RelatedTopicsOptions {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    category?: number;
    tz?: number;
  }

  interface InterestByRegionOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    category?: number;
    tz?: number;
    resolution?: string;
  }

  interface AutocompleteOptions {
    keyword: string;
    hl?: string;
  }

  export function interestOverTime(options: GoogleTrendsOptions): Promise<string>;
  export function interestByRegion(options: InterestByRegionOptions): Promise<string>;
  export function relatedQueries(options: RelatedQueriesOptions): Promise<string>;
  export function relatedTopics(options: RelatedTopicsOptions): Promise<string>;
  export function autoComplete(options: AutocompleteOptions): Promise<string>;
  export function dailyTrends(options?: { geo?: string; hl?: string }): Promise<string>;
  export function realTimeTrends(options?: { geo?: string; hl?: string; category?: string }): Promise<string>;

  const googleTrends: {
    interestOverTime: typeof interestOverTime;
    interestByRegion: typeof interestByRegion;
    relatedQueries: typeof relatedQueries;
    relatedTopics: typeof relatedTopics;
    autoComplete: typeof autoComplete;
    dailyTrends: typeof dailyTrends;
    realTimeTrends: typeof realTimeTrends;
  };

  export default googleTrends;
}