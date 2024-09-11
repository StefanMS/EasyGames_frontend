export interface Countdown {
    days: string;
    hours: string;
    minutes: string;
  }

  export interface UserCollectionItem {
    id: number;
    game_name: string;
    game_status: string;
    enrolled_user: boolean;
    capacity: number;
    countdown: Countdown;
}