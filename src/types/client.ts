export interface Client {
  id: number;
  nom: string;
  prenom: string;
  tel?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  mail?: string;
  risque?: 'Faible' | 'Moyen' | 'Élevé';
  commentaire?: string;
}

export type ClientFormData = Omit<Client, 'id'>;
