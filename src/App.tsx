import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useSearchParams, useParams } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Index from "./pages/Index";

import NotFound from "./pages/NotFound";
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { DashboardHeader } from "./components/DashboardHeader";
import ITMetricDetail from "./pages/ITMetricDetail";
import StaticFloorLayout from './pages/StaticFloorLayout'
import LabDetail from './pages/LabDetail'


// Wrapper component to handle search params for DataCenter2D
const DataCenterWrapper = () => {
  const { direction } = useParams<{ direction: string }>();
  const [searchParams] = useSearchParams();
  const floor = searchParams.get("floor") || "";
  const wing = direction || "";

  // Combine floor and wing as needed, e.g., "3-North"
  const floorWing = floor && wing ? `${floor}-${wing.charAt(0).toUpperCase()}${wing.slice(1)}` : "";

  return <StaticFloorLayout floor={floorWing} />;
};

const LabWrapper=()=>{
  const { lab } = useParams<{ lab: string }>();

  return <LabDetail labName={lab}/>


}

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Grommet theme={hpe}>
          <DashboardHeader />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/datacenter-2d/:direction" element={<DataCenterWrapper />} />
              <Route path="/labs/:lab" element={<LabWrapper />} />
              <Route path="/BU/:category" element={<ITMetricDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Grommet>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
