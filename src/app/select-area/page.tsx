"use client";

import { useState } from "react";

import { AreaOptionsList } from "@/components/features";
import { Grid, Col, Text, Card, Carousel, CarouselItem } from "@/components/ui";
import { useAppRouter, useSelectArea } from "@/hooks/features";

export default function SelectArea() {
  const {
    setProvisionalCenter,
    setProvisionalOffice,
    selectClass20,
    // リセット関数
    removeProvisionalCenter,
    removeProvisionalOffice,
    // 選択肢
    centerOptions,
    officeOptions,
    class20Options,
    // ローディング・エラー
    loading,
    error,
  } = useSelectArea();

  const { navigateTo, goBack } = useAppRouter();
  const [focus, setFocus] = useState(0);

  if (loading)
    return (
      <div role="status" className="flex h-full animate-pulse flex-col gap-2">
        <div className="mx-auto h-4 w-full max-w-[320px] rounded-full bg-background-light dark:bg-foreground-light"></div>
        <div className="h-[800px] w-full rounded bg-background-light dark:bg-foreground-light"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );

  if (error)
    return (
      <Grid>
        <Col cols={12} justify="center">
          <Card>
            <Text>Error: {error}</Text>
          </Card>
        </Col>
      </Grid>
    );

  return (
    <Grid>
      <Col cols={12} justify="center">
        <Text>いちばん近い地域を選択してください</Text>
      </Col>
      <Col cols={12}>
        <Carousel focus={focus} watchDrag={false}>
          <CarouselItem>
            <Card>
              <AreaOptionsList
                options={centerOptions || {}}
                action={(code) => {
                  setProvisionalCenter(code);
                  setFocus(1);
                }}
                goBackAction={goBack}
              />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <AreaOptionsList
                options={officeOptions || {}}
                action={(code) => {
                  setProvisionalOffice(code);
                  setFocus(2);
                }}
                goBackAction={() => {
                  removeProvisionalCenter();
                  setFocus(0);
                }}
              />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <AreaOptionsList
                options={class20Options || {}}
                action={(code) => {
                  selectClass20(code);
                  navigateTo("home");
                }}
                goBackAction={() => {
                  removeProvisionalOffice();
                  setFocus(1);
                }}
              />
            </Card>
          </CarouselItem>
        </Carousel>
      </Col>
    </Grid>
  );
}
