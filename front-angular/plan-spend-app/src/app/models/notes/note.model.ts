export interface Note {
  p_note_id: number;
  puser_id: number;
  ptitle: string;
  pdescription: string;
  pis_favorite: boolean;
  pcreated_at: Date;
  pupdated_at: Date;
  isDropdownVisible: boolean;
}
