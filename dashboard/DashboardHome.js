// frontend/src/pages/dashboard/DashboardHome.js

import React from "react";
import TopBar from "./src/components/TopBar";
import Summary from "./src/components/Summary";
import Positions from "./src/components/Positions";
import Orders from "./src/components/Orders";
import WatchList from "./src/components/WatchList";
import Funds from "./src/components/Funds";

const DashboardHome = () => {
  
  
  return (
    <div>
      <TopBar />
      <Summary />
      <Positions />
      <Orders />
      <WatchList />
      <Funds />
    </div>
  );
};

export default DashboardHome;
