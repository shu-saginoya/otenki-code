"use client";

import type { Area } from "@/types";
import { useState } from "react";
import {
  Grid,
  Col,
  Text,
  Card,
  AreaOptionsList,
  Carousel,
  CarouselItem,
} from "@/components";
import { useSelectArea, useAppRouter } from "@/hooks";
import { useDispatch } from "react-redux";
import { setArea } from "@/lib/features/areas/areasSlice";

export default function SelectArea() {
  const {
    newCenter,
    newOffice,
    newClass10,
    setNewCenter,
    setNewOffice,
    setNewClass10,
    removeNewCenter,
    removeNewOffice,
    centerOptions,
    officeOptions,
    class10Options,
    loading,
    error,
  } = useSelectArea();

  const { navigateTo, goBack } = useAppRouter();

  const [focus, setFocus] = useState(0);

  const dispatch = useDispatch();
  // Redux の state 更新処理
  const saveStore = (areaLv1: Area, areaLv2: Area, areaLv3: Area) => {
    dispatch(
      setArea({
        areaLv1,
        areaLv2,
        areaLv3,
      })
    );
  };

  const selectNewCenter = (area: Area) => {
    setNewCenter(area);
    setFocus(1);
  };

  const selectNewOffice = (area: Area) => {
    setNewOffice(area);
    setFocus(2);
  };

  const finalizeSelection = (area: Area) => {
    setNewClass10(area);
    if (newCenter && newOffice && newClass10) {
      saveStore(newCenter, newOffice, newClass10);
      navigateTo("home");
    }
  };

  const goBackCenter = () => {
    removeNewCenter();
    setFocus(0);
  };

  const goBackOffice = () => {
    removeNewOffice();
    setFocus(1);
  };

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
                action={selectNewCenter}
                goBackAction={goBack}
              />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <AreaOptionsList
                options={officeOptions || {}}
                action={selectNewOffice}
                goBackAction={goBackCenter}
              />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <AreaOptionsList
                options={class10Options || {}}
                action={finalizeSelection}
                goBackAction={goBackOffice}
              />
            </Card>
          </CarouselItem>
        </Carousel>
      </Col>
    </Grid>
  );
}
