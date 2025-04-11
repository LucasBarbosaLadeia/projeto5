export interface Actor {
  id_actor: number;
  name: string;
}

export interface Film {
  id_film: number;
  name: string;
  description: string;
  images: string;
  launch_date: string;
  actors?: Actor[]; 
}
