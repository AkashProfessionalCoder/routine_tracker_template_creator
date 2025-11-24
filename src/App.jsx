import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { format } from 'date-fns';
import Layout from './components/Layout';
import MonthView from './components/MonthView';
import ProgressGraph from './components/ProgressGraph';
import SettingsPage from './components/SettingsPage';
import LandingPage from './components/LandingPage';
import { useRoutineData } from './hooks/useRoutineData';
import { exportToPDF } from './utils/pdfExport';

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const {
    data,
    updateProfile,
    updateDay,
    getMonthData,
    getRoutineItems,
    addRoutineItem,
    deleteRoutineItem,
    editRoutineItem,
    reorderRoutineItems
  } = useRoutineData();

  const monthKey = format(currentMonth, 'yyyy-MM');
  const monthData = getMonthData(monthKey);
  const routineItems = getRoutineItems();

  const handleExport = () => {
    const fileName = `routine-report-${monthKey}.pdf`;
    exportToPDF(['report-content', 'graph-content'], fileName);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/tracker"
        element={
          <Layout
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            onExport={handleExport}
          >
            <div id="report-content" className="bg-gray-50 min-h-full pb-10">
              <div className="pt-8 text-center mb-2">
                <h2 className="text-3xl font-bold text-gray-800">Monthly Routine Report</h2>
                <p className="text-gray-500 mt-1">{format(currentMonth, 'MMMM yyyy')}</p>
              </div>

              <MonthView
                currentMonth={currentMonth}
                data={monthData}
                routineItems={routineItems}
                onUpdateProfile={updateProfile}
                onUpdateDay={updateDay}
              />
            </div>

            <div id="graph-content" className="bg-gray-50 min-h-screen pb-10 pt-8">
              <div className="max-w-7xl mx-auto px-4">
                <ProgressGraph
                  currentMonth={currentMonth}
                  data={monthData}
                  routineItems={routineItems}
                />
              </div>
            </div>
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout showNavigation={false}>
            <SettingsPage
              routineItems={routineItems}
              onAdd={addRoutineItem}
              onEdit={editRoutineItem}
              onDelete={deleteRoutineItem}
              onReorder={reorderRoutineItems}
            />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
