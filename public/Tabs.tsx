// @ts-nocheck

import { useRef, useState, useEffect } from "react";

// import prefersDark from "./DetectThemePreference";
import styled, {css} from "styled-components";

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
  const [prefersDark, setPrefersDark] = useState(false);

  const highlightRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      setPrefersDark(() => true);
      return;
    } else {
      setPrefersDark(() => false);
    }
  }, []);

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
      highlightStyles.boxShadow = `inset 1px 2px 4px 1px ${prefersDark ? 'rgb(29, 29, 29)' : 'rgb(229, 229, 229)'}`;
    }
  }

  return (
    <ContainerFlexColumn>
      <TabsNav prefersDark={prefersDark} ref={wrapperRef} onMouseLeave={resetHighlight}>
        <TabsHighlight prefersDark={prefersDark} ref={highlightRef} style={highlightStyles} />
        {tabsData.map((tab) => (
          <Tab
            href={tab.link}
            target="_blank"
            key={tab.value}
            tabValue={tab.value}
            prefersDark={prefersDark}
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
  border-radius: 10px;
  padding: 5px;

  ${(props) => {
    if (props.prefersDark) {
      return css`
        background-color: rgb(20, 20, 20);
        color: rgb(229, 229, 229);
      `;
    } else {
      return css`
        background-color: rgb(220, 220, 220);
        color: rgb(29, 29, 29);
      `;
    }
  }}
`;

const Tab = styled.a<TabProps>`
  padding: 15px;
  font-size: ${14 / 16}rem;
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: color 250ms;
  height: 100%;
  user-select: none;

  ${(props) => {
      return css`
        color: ${props.prefersDark ? 'rgb(229, 229, 229)' : 'rgb(29, 29, 29)'};
      `;
  }}
`;

const TabsHighlight = styled.div`
  position: absolute;
  top: 4.5px;
  left: 0;
  border-radius: 8px;
  height: 46px;
  transition: 0.15s ease;
  transition-property: width, transform, opacity;

  ${(props) => {
    if (props.prefersDark) {
      return css`
        background-color: rgb(90, 90, 90);
        border: 1px rgb(20, 20, 20) solid;
      `;
    } else {
      return css`
        background-color: rgb(290, 290, 290);
        border: 1px rgb(220, 220, 220) solid;
      `;
    }
  }}
`;

const ContainerFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Tabs;
