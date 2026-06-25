import { appellation } from "./appellation";
import { article } from "./article";
import { author } from "./author";
import { category } from "./category";
import { country } from "./country";
import { food } from "./food";
import { grape } from "./grape";
import { guide } from "./guide";
import { page } from "./page";
import { place } from "./place";
import { producer } from "./producer";
import { region } from "./region";
import { vineyard } from "./vineyard";
import { wine } from "./wine";

export const schemaTypes = [
  // Pages du site
  page,

  // Contenu éditorial
  article,
  guide,
  category,
  author,

  // Répertoire
  place,
  vineyard,
  producer,

  // Référentiels vin
  country,
  region,
  appellation,
  grape,
  wine,
  food,
];