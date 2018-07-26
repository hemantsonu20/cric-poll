export interface Poll {
  id?: string;
  title: string;
  note?: string;
  createdDate: string;
  scheduledDate: string;
  ownerEmail?: string;
  ownerName?: string;
  userTags?: {};
  auction?: {};
}
