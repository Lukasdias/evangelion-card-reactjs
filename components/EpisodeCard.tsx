"use client";

import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Stage, Layer, Rect, Text, Group, Transformer } from "react-konva";
import Konva from "konva";

export interface TextEffects {
  glowEnabled: boolean;
  glowColor: string;
  glowBlur: number;
  glowOpacity: number;
}

export interface EpisodeCardRef {
  exportImage: () => string | undefined;
}

interface EpisodeCardProps {
  topText: string;
  midText: string;
  botText: string;
  epText: string;
  titleText: string;
  titleStyle?: "serif" | "sans";
  titleAlign?: "left" | "center" | "right";
  aspectRatio?: "standard" | "wide";
  effects?: TextEffects;
}

const EpisodeCard = forwardRef<EpisodeCardRef, EpisodeCardProps>(
  (
    {
      topText,
      midText,
      botText,
      epText,
      titleText,
      titleStyle = "serif",
      titleAlign = "left",
      aspectRatio = "standard",
      effects = {
        glowEnabled: false,
        glowColor: "#ffffff",
        glowBlur: 20,
        glowOpacity: 0.8,
      },
    },
    ref,
  ) => {
    const stageRef = useRef<Konva.Stage>(null);
    const group1Ref = useRef<Konva.Group>(null);
    const group2Ref = useRef<Konva.Group>(null);
    const group3Ref = useRef<Konva.Group>(null);
    const groupEpRef = useRef<Konva.Group>(null);
    const groupTitleRef = useRef<Konva.Group>(null);

    // Calculate dimensions based on aspect ratio
    const canvasWidth = aspectRatio === "wide" ? 1280 : 900;
    const canvasHeight = aspectRatio === "wide" ? 720 : 675;
    const leftMargin = aspectRatio === "wide" ? 115 : 75;
    const rightBoundary = aspectRatio === "wide" ? 1150 : 815;

    // Font sizes proportional to canvas height
    const smHeadSize = canvasHeight * 0.184;
    const lgHeadSize = canvasHeight * 0.308;
    const epSize = canvasHeight * 0.095;
    const titleSize = canvasHeight * 0.095;

    // Scale factors (squash horizontally)
    const topSquash = 0.62;
    const midSquash = 0.62;
    const botSquash = 0.57;
    const epSquash = 0.76;
    const titleSquash = titleStyle === "sans" ? 0.8 : 0.76;

    useImperativeHandle(ref, () => ({
      exportImage: () => {
        if (stageRef.current) {
          return stageRef.current.toDataURL({
            pixelRatio: 2,
            mimeType: "image/png",
          });
        }
        return undefined;
      },
    }));

    // Apply squash transforms after mount
    useEffect(() => {
      if (group1Ref.current) {
        group1Ref.current.scaleX(topSquash);
        group1Ref.current.x(leftMargin);
        group1Ref.current.y(canvasHeight * 0.074);
      }
      if (group2Ref.current) {
        group2Ref.current.scaleX(midSquash);
        group2Ref.current.x(leftMargin);
        group2Ref.current.y(canvasHeight * 0.222);
      }
      if (group3Ref.current) {
        group3Ref.current.scaleX(botSquash);
        group3Ref.current.x(leftMargin);
        group3Ref.current.y(canvasHeight * 0.354);
      }
      if (groupEpRef.current) {
        groupEpRef.current.scaleX(epSquash);
        groupEpRef.current.x(leftMargin);
        groupEpRef.current.y(canvasHeight * 0.637);
      }
      if (groupTitleRef.current) {
        groupTitleRef.current.scaleX(titleSquash);
        groupTitleRef.current.x(leftMargin);
        groupTitleRef.current.y(canvasHeight * 0.785);
      }
    }, [topSquash, midSquash, botSquash, epSquash, titleSquash, leftMargin, canvasHeight]);

    const bgColor = "#000000";
    const textColor = "#FFFFFF";

    // Calculate title position based on alignment
    const getTitleX = () => {
      if (titleAlign === "right") return rightBoundary / titleSquash;
      if (titleAlign === "center") return (rightBoundary + leftMargin) / 2 / titleSquash;
      return leftMargin / titleSquash;
    };

    const titleX = getTitleX();

    // Glow config
    const glowConfig = effects.glowEnabled
      ? {
          shadowColor: effects.glowColor,
          shadowBlur: effects.glowBlur,
          shadowOpacity: effects.glowOpacity,
        }
      : {};

    return (
      <Stage
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        className="rounded-lg overflow-hidden"
      >
        <Layer>
          {/* Black background */}
          <Rect x={0} y={0} width={canvasWidth} height={canvasHeight} fill={bgColor} />

          {/* Line 1: NEON */}
          <Group ref={group1Ref}>
            <Text
              text={topText.toUpperCase()}
              fontSize={smHeadSize}
              fontFamily="Times New Roman"
              fontStyle="900"
              fill={textColor}
              {...glowConfig}
            />
          </Group>

          {/* Line 2: GENESIS */}
          <Group ref={group2Ref}>
            <Text
              text={midText.toUpperCase()}
              fontSize={smHeadSize}
              fontFamily="Times New Roman"
              fontStyle="900"
              fill={textColor}
              {...glowConfig}
            />
          </Group>

          {/* Line 3: EVANGELION */}
          <Group ref={group3Ref}>
            <Text
              text={botText.toUpperCase()}
              fontSize={lgHeadSize}
              fontFamily="Times New Roman"
              fontStyle="900"
              fill={textColor}
              {...glowConfig}
            />
          </Group>

          {/* EPISODE: line */}
          <Group ref={groupEpRef}>
            <Text
              text={epText.toUpperCase()}
              fontSize={epSize}
              fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
              fontStyle="700"
              fill={textColor}
              {...glowConfig}
            />
          </Group>

          {/* Title */}
          <Group ref={groupTitleRef}>
            {titleText.split("\n").map((line, index) => (
              <Text
                key={index}
                text={line}
                y={index * titleSize * 1.1}
                fontSize={titleSize}
                fontFamily={
                  titleStyle === "sans"
                    ? "Helvetica Neue, Helvetica, Arial, sans-serif"
                    : "Times New Roman"
                }
                fontStyle={titleStyle === "sans" ? "800" : "600"}
                fill={textColor}
                align={titleAlign}
                width={
                  titleAlign === "left" ? (rightBoundary - leftMargin) / titleSquash : undefined
                }
                x={titleAlign === "left" ? 0 : titleAlign === "center" ? titleX : titleX}
                {...glowConfig}
              />
            ))}
          </Group>
        </Layer>
      </Stage>
    );
  },
);

EpisodeCard.displayName = "EpisodeCard";

export default EpisodeCard;
