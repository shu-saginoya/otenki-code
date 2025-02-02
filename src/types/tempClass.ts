export type TempClass =
  | "boiling" //（煮えるように）暑い
  | "melting" //（溶けるほど）暑い
  | "humid" //蒸し暑い
  | "hot" //暑い
  | "warm" //温かい
  | "cool" //涼しい
  | "chilly" //少し寒い
  | "cold" //寒い
  | "freezing"; //（凍えるほど）寒い

export type TempClassObject = {
  boiling: string;
  melting: string;
  humid: string;
  hot: string;
  warm: string;
  cool: string;
  chilly: string;
  cold: string;
  freezing: string;
};
