export interface ISeason {
  competitionId: string;
  endDate: string;
  id: string;
  name: string;
  sport: TSportType;
  startDate: string;
  __v: number;
  _id: string;
}

export interface IEvent {
  winnerId: string;
  awayScore: number;
  homeScore: number;
  competitors: ICompetitor[];
  id: string;
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

export type TSportType = "mma" | "soccer";
