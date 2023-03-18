// @ts-nocheck

import { useRef, useState } from "react";

import prefersDark from "./DetectThemePreference";
import styled from "styled-components";

const tabsData = [
  { title: "github", link: "https://github.com/taylorwaddell", value: 1 },
  { title: "dribble", link: "https://dribbble.com/twadd", value: 2 },
  { title: "photos", link: "https://taylorwaddell.com/", value: 3 },
  { title: "twitter", link: "https://twitter.com/t__wadd", value: 4 },
];

const Tabs = () => {
  const [tabBoundingBox, setTabBoundingBox] = useState(null);
  const [wrapperBoundingBox, setWrapperBoundingBox] = useState(null);
  const [highlightedTab, setHighlightedTab] = useState(null);
  const [isHoveredFromNull, setIsHoveredFromNull] = useState(true);
  const [isBeingPressed, setIsBeingPressed] = useState(false);

  const highlightRef = useRef(null);
  const wrapperRef = useRef(null);

  const repositionHighlight = (e: MouseEvent, tab: unknown) => {
    setTabBoundingBox(e.target.getBoundingClientRect());
    setWrapperBoundingBox(wrapperRef.current.getBoundingClientRect());
    setIsHoveredFromNull(highlightedTab);
    setHighlightedTab(tab);
  };

  const resetHighlight = () => setHighlightedTab(null);

  const highlightStyles = {};

  if (tabBoundingBox && wrapperBoundingBox) {
    highlightStyles.transitionDuration = isHoveredFromNull ? "0ms" : "150ms";
    highlightStyles.opacity = highlightedTab ? 1 : 0;
    highlightStyles.width = `${tabBoundingBox.width}px`;
    highlightStyles.transform = `translate(${
      tabBoundingBox.left - wrapperBoundingBox.left
    }px)`;
    if (isBeingPressed) {
      highlightStyles.boxShadow = `inset 1px 2px 4px 1px ${prefersDark() ? 'rgb(29, 29, 29)' : 'rgb(229, 229, 229)'}`;
    }
  }

  return (
    <ContainerFlexColumn>
      <TabsNav ref={wrapperRef} onMouseLeave={resetHighlight}>
        <TabsHighlight ref={highlightRef} style={highlightStyles} />
        {tabsData.map((tab) => (
          <Tab
            href={tab.link}
            target="_blank"
            key={tab.value}
            tabValue={tab.value}
            onMouseOver={(ev) => repositionHighlight(ev, tab)}
            onMouseDown={() => setIsBeingPressed(() => true)}
            onMouseUp={() => {
              setIsBeingPressed(() => false);
            }}
            onTouchStart={() => setIsBeingPressed(() => true)}
            onTouchEnd={() => setIsBeingPressed(() => false)}
          >
            {tab.title}
          </Tab>
        ))}
      </TabsNav>
    </ContainerFlexColumn>
  );
};

interface TabProps {
  tabValue: number;
}

const TabsNav = styled.div`
  position: relative;
  color: ${prefersDark() ? 'rgb(229, 229, 229)' : 'rgb(29, 29, 29)'};
  background-color: ${prefersDark() ? 'rgb(20, 20, 20)' : 'rgb(220, 220, 220)'};
  border-radius: 10px;
  padding: 5px;
`;

const Tab = styled.a<TabProps>`
  padding: 15px;
  font-size: ${14 / 16}rem;
  color: ${prefersDark() ? 'rgb(229, 229, 229)' : 'rgb(29, 29, 29)'};
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: color 250ms;
  height: 100%;
  user-select: none;
`;

const TabsHighlight = styled.div`
  background: ${prefersDark() ? 'rgb(90, 90, 90)' : 'rgb(290, 290, 290)'};
  position: absolute;
  top: 4.5px;
  left: 0;
  border-radius: 8px;
  height: 46px;
  transition: 0.15s ease;
  transition-property: width, transform, opacity;
  border: 1px ${prefersDark() ? 'rgb(20, 20, 20)' : 'rgb(220, 220, 220)'} solid;
`;

const ContainerFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Tabs;
