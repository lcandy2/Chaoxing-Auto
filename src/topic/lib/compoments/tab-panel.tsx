import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Status from "@topic/lib/compoments/panel-status";
import Settings from "@topic/lib/compoments/panel-settings";
import About from "@topic/lib/compoments/panel-about";
import { useStatusStore } from "@topic/lib/store";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cx-auto-tabpanel-${index}`}
      aria-labelledby={`cx-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 0,
            maxWidth: 280,
            maxHeight: 300,
            minWidth: 260,
            minHeight: 200,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `cx-auto-tab-${index}`,
    "aria-controls": `cx-auto-tabpanel-${index}`,
  };
}

export default function TabPanel() {
  const [tab, setTab] = useState(0);
  const { isInActionFrame } = useStatusStore();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab disabled={isInActionFrame} label="状态" {...a11yProps(0)} />
          <Tab disabled={isInActionFrame} label="设定" {...a11yProps(1)} />
          <Tab disabled={isInActionFrame} label="关于" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tab} index={0}>
        <Status />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <Settings />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={2}>
        <About />
      </CustomTabPanel>
    </Box>
  );
}
