import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Panel as PanelType } from "../../types/Panel";

export const PanelTitles = ({
  panels,
  setActive,
  active,
}: {
  panels: PanelType[];
  active: PanelType;
  setActive: Dispatch<SetStateAction<PanelType>>;
}) => (
  <div className="mb-6">
    {panels.map((panel) => (
      <button
        type="button"
        className={`mr-4 border-b-1 ${
          panel.hash === active.hash ? "border-spice" : "border-b-0"
        }`}
        onClick={() => {
          setActive(panel);
        }}
        key={panel.hash}
      >
        <span
          className={`hover:text-spice duraction-300 ${
            panel.hash === active.hash ? "text-spice" : ""
          }`}
        >
          {panel.title}
        </span>
      </button>
    ))}
  </div>
);

export const Panel = ({
  panel,
  active,
}: {
  panel: PanelType;
  active: PanelType;
}) => {
  return (
    <div
      className={`${
        panel.hash === active.hash ? "block" : "hidden"
      } border-1 border-spice p-12 rounded-lg`}
    >
      {panel.content}
    </div>
  );
};

export const TabPanel = ({ panels }: { panels: PanelType[] }) => {
  const [active, setActive] = useState(panels[0]);

  const titles = panels.map((panel) => {
    return panel.title;
  });

  return (
    <div>
      <PanelTitles panels={panels} setActive={setActive} active={active} />
      {panels.map((panel) => (
        <Panel key={panel.hash} panel={panel} active={active} />
      ))}
    </div>
  );
};
