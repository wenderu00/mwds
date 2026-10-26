// Gerado por scripts/icons/generate.ts. Não edite à mão.
import { Anvil as LucideAnvil, Castle as LucideCastle, CircleDollarSign as LucideCircleDollarSign, Coins as LucideCoins, Croissant as LucideCroissant, Flag as LucideFlag, Gem as LucideGem, House as LucideHouse, Landmark as LucideLandmark, Mountain as LucideMountain, MoveRight as LucideMoveRight, Pickaxe as LucidePickaxe, Shield as LucideShield, ShieldHalf as LucideShieldHalf, Sword as LucideSword, Swords as LucideSwords, Target as LucideTarget, Tent as LucideTent, TreePine as LucideTreePine, Trees as LucideTrees, Warehouse as LucideWarehouse, Wheat as LucideWheat, type LucideIcon } from "lucide-react";
import { Coin as BaseCoin } from "@/registry/marcio/icons/base/coin";
import { CrossedSwords as BaseCrossedSwords } from "@/registry/marcio/icons/base/crossed-swords";
import { Shield as BaseShield } from "@/registry/marcio/icons/base/shield";
import { Archer as MedievalArcher } from "@/registry/marcio/icons/medieval/archer";
import { Barracks as MedievalBarracks } from "@/registry/marcio/icons/medieval/barracks";
import { Castle as MedievalCastle } from "@/registry/marcio/icons/medieval/castle";
import { Farm as MedievalFarm } from "@/registry/marcio/icons/medieval/farm";
import { Food as MedievalFood } from "@/registry/marcio/icons/medieval/food";
import { Iron as MedievalIron } from "@/registry/marcio/icons/medieval/iron";
import { Spearman as MedievalSpearman } from "@/registry/marcio/icons/medieval/spearman";
import { Stone as MedievalStone } from "@/registry/marcio/icons/medieval/stone";
import { Wood as MedievalWood } from "@/registry/marcio/icons/medieval/wood";

export type AuthoredIcon = { pack: string; name: string; Icon: LucideIcon; tags: string[]; similar: { name: string; Icon: LucideIcon }[] };

export const iconPacks = [
  { name: "base", description: "Ícones genéricos de jogo e economia, base dos pacotes de domínio.", dependsOn: [], aliases: [] },
  { name: "medieval", description: "Recursos, edifícios e unidades de um reino medieval.", dependsOn: ["base"], aliases: [] },
];

export const authoredIcons: AuthoredIcon[] = [
  { pack: "base", name: "coin", Icon: BaseCoin, tags: ["moeda","ouro","dinheiro"], similar: [{ name: "Coins", Icon: LucideCoins }, { name: "CircleDollarSign", Icon: LucideCircleDollarSign }] },
  { pack: "base", name: "crossed-swords", Icon: BaseCrossedSwords, tags: ["espadas","batalha","combate"], similar: [{ name: "Swords", Icon: LucideSwords }, { name: "Sword", Icon: LucideSword }] },
  { pack: "base", name: "shield", Icon: BaseShield, tags: ["escudo","defesa","proteção"], similar: [{ name: "Shield", Icon: LucideShield }, { name: "ShieldHalf", Icon: LucideShieldHalf }] },
  { pack: "medieval", name: "archer", Icon: MedievalArcher, tags: ["arqueiro","arco","flecha","unidade"], similar: [{ name: "Target", Icon: LucideTarget }, { name: "MoveRight", Icon: LucideMoveRight }] },
  { pack: "medieval", name: "barracks", Icon: MedievalBarracks, tags: ["quartel","tenda","edifício","treino"], similar: [{ name: "Tent", Icon: LucideTent }, { name: "Flag", Icon: LucideFlag }] },
  { pack: "medieval", name: "castle", Icon: MedievalCastle, tags: ["castelo","edifício","fortaleza"], similar: [{ name: "Castle", Icon: LucideCastle }, { name: "Landmark", Icon: LucideLandmark }] },
  { pack: "medieval", name: "farm", Icon: MedievalFarm, tags: ["fazenda","celeiro","edifício"], similar: [{ name: "Warehouse", Icon: LucideWarehouse }, { name: "House", Icon: LucideHouse }] },
  { pack: "medieval", name: "food", Icon: MedievalFood, tags: ["comida","pão","alimento","recurso"], similar: [{ name: "Croissant", Icon: LucideCroissant }, { name: "Wheat", Icon: LucideWheat }] },
  { pack: "medieval", name: "iron", Icon: MedievalIron, tags: ["ferro","lingote","metal","recurso"], similar: [{ name: "Anvil", Icon: LucideAnvil }, { name: "Pickaxe", Icon: LucidePickaxe }] },
  { pack: "medieval", name: "spearman", Icon: MedievalSpearman, tags: ["lanceiro","lança","unidade"], similar: [{ name: "Shield", Icon: LucideShield }, { name: "Swords", Icon: LucideSwords }] },
  { pack: "medieval", name: "stone", Icon: MedievalStone, tags: ["pedra","rocha","recurso"], similar: [{ name: "Mountain", Icon: LucideMountain }, { name: "Gem", Icon: LucideGem }] },
  { pack: "medieval", name: "wood", Icon: MedievalWood, tags: ["madeira","tora","recurso"], similar: [{ name: "TreePine", Icon: LucideTreePine }, { name: "Trees", Icon: LucideTrees }] },
];
