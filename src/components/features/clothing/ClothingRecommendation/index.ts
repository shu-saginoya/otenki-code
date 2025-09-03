import { JSX } from "react";
import { useClothing } from '@/hooks/useClothing';
import { Stack, Text, ShapeImage } from '@/components/ui';

interface ClothingRecommendationProps {
  maxTemperature: number;
  minTemperature: number;
}

export const ClothingRecommendation =({
  maxTemperature,
  minTemperature
}: ClothingRecommendationProps): JSX.Element => {
  const { isLoading, getRecommendation } = useClothing();
  
  if (isLoading) {
    return <Text>服装データを読み込み中</Text>;
  }
  
  const { tops, bottoms, outer } = getRecommendation(maxTemperature, minTemperature);
  
  return (
      <Stack spacing={4}>
        <Text size="lg" weight="bold">今日のおすすめ服装</Text>
        
        <div>
          <Text size="md" weight="bold">トップス</Text>
          {tops ? (
            <div className="flex items-center gap-2 mt-2">
              <img 
                src={tops.imageUrl} 
                alt={tops.name} 
                className="w-12 h-12 object-contain"
              />
              <Text>{tops.name}</Text>
            </div>
          ) : (
            <Text>適切なトップスが見つかりません</Text>
          )}
        </div>
        
        <div>
          <Text size="md" weight="bold">ボトムス</Text>
          {bottoms ? (
            <div className="flex items-center gap-2 mt-2">
              <img 
                src={bottoms.imageUrl} 
                alt={bottoms.name} 
                className="w-12 h-12 object-contain"
              />
              <Text>{bottoms.name}</Text>
            </div>
          ) : (
            <Text>適切なボトムスが見つかりません</Text>
          )}
        </div>
        
        <div>
          <Text size="md" weight="bold">アウター</Text>
          {outer ? (
            <div className="flex items-center gap-2 mt-2">
              <img 
                src={outer.imageUrl} 
                alt={outer.name} 
                className="w-12 h-12 object-contain"
              />
              <Text>{outer.name}</Text>
            </div>
          ) : (
            <Text>適切なアウターが見つかりません</Text>
          )}
        </div>
      </Stack>
  );
};
