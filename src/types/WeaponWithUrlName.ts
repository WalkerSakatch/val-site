import { Weapon } from "@mrbabalafe/valorant-api-helper";
import { SkinWithUrlName } from "./SkinWithUrlName";

export interface WeaponWithUrlName {
    data: Weapon
    urlEncodedName: string
    urlEncodedSkins: SkinWithUrlName[]
}

