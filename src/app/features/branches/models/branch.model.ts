import { Franchise } from "../../franchises/models/franchise.model";

export class Branch {
  id!: number;
  name!: string;
  status!: boolean;
  franchise!: Franchise;
  createdAt!: string;
  updatedAt!: string;
}