import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: "User",
    isPro: false,
    coins: 120,
    enrolledTests: []
  });

  const [currentAffairs, setCurrentAffairs] = useState([
    { id: 1, title: "National Current Affairs August 2026", category: "National", date: "Today" },
    { id: 2, title: "RRB NTPC & SSC CGL GS Special Notes", category: "Exams", date: "Yesterday" }
  ]);

  const [jobAlerts, setJobAlerts] = useState([
    { id: 1, title: "SSC CGL 2026 Recruitment", totalPosts: "17,727", lastDate: "30 Aug 2026" },
    { id: 2, title: "Railway RRB ALP / Technician", totalPosts: "9,900+", lastDate: "15 Sep 2026" }
  ]);

  return (
    <AppContext.Provider value={{ user, setUser, currentAffairs, jobAlerts }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
