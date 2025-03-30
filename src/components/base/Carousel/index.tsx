"use client";

import { ReactNode, JSX, useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Stack } from "@/components";

type CarouselProps = {
  children: ReactNode;
  focus?: number;
  watchDrag?: boolean;
};

/**
 * Carousel component
 * @param children 子要素
 * @param { number } focus フォーカスするスライドのインデックス
 * @param { boolean } watchDrag ドラッグ機能 (default: true)
 * @returns JSX.Element
 */
export const Carousel = ({
  children,
  focus = 0,
  watchDrag = true,
}: CarouselProps): JSX.Element => {
  const options: EmblaOptionsType = {
    watchDrag: watchDrag,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    emblaApi?.scrollTo(focus);
  }, [emblaApi, focus]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <Stack>{children}</Stack>
    </div>
  );
};

type CarouselItemProps = {
  children: ReactNode;
};

export const CarouselItem = ({ children }: CarouselItemProps): JSX.Element => {
  return <div className="min-w-0 shrink-0 grow-0 basis-full">{children}</div>;
};
