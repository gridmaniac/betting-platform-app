export type TSportType = "mma" | "soccer" | "nfl";

export interface ISeason {
  competitionId: string;
  endDate: string;
  id: string;
  name: string;
  sport: string;
  startDate: string;
  __v: number;
  _id: string;
}

export interface IEvent {
  closeTime: string;
  winnerId: string;
  awayScore: number;
  homeScore: number;
  competitors: ICompetitor[];
  id: string;
  processed: boolean;
  seasonId: string;
  startTime: string;
  startTimeConfirmed: boolean;
  status: string;
  __v: number;
  _id: string;
}

export interface ICompetitor {
  abbreviation: string;
  id: string;
  name: string;
  qualifier: string;
  country: string;
}
