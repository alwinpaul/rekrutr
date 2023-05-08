import Box from "@mui/material/Box";

interface TabPanelProps {
  value: number;
  index: number;
  children?: React.ReactNode;
  tabName: string;
  tabDescription: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, tabName, tabDescription, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div className="tab-container">
            <div className="tab-desc">
              <div className="tab-title">{tabName}</div>
              <p className="tab-detail-short">{tabDescription}</p>
            </div>
            <div className="tab-card">{children}</div>
          </div>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
