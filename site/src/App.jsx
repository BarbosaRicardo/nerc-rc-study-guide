import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Intro from './pages/Intro'
import Balancing from './pages/Balancing'
import Transmission from './pages/Transmission'
import EmergencyPrep from './pages/EmergencyPrep'
import EmergencyResponse from './pages/EmergencyResponse'
import IRO from './pages/IRO'
import Interchange from './pages/Interchange'
import PowerSystems from './pages/PowerSystems'
import VoltageReactive from './pages/VoltageReactive'
import Lab from './pages/Lab'
import Flashcards from './pages/Flashcards'

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Routes>
          <Route path="/"                  element={<Intro />} />
          <Route path="/balancing"         element={<Balancing />} />
          <Route path="/transmission"      element={<Transmission />} />
          <Route path="/emergency-prep"    element={<EmergencyPrep />} />
          <Route path="/emergency-response" element={<EmergencyResponse />} />
          <Route path="/iro"               element={<IRO />} />
          <Route path="/interchange"       element={<Interchange />} />
          <Route path="/power-systems"     element={<PowerSystems />} />
          <Route path="/var"               element={<VoltageReactive />} />
          <Route path="/lab"               element={<Lab />} />
          <Route path="/flashcards"        element={<Flashcards />} />
        </Routes>
      </main>
    </div>
  )
}
