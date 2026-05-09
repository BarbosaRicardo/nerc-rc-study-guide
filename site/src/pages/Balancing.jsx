import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import AnalogyCard from '../components/AnalogyCard'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'

export default function Balancing() {
  return (
    <ChapterLayout
      chapterId="balancing"
      title="Resource & Demand Balancing"
      emoji="⚖️"
      prev="intro"
      next="transmission"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Every megawatt consumed must be generated simultaneously — there is no meaningful storage
        buffer in the Bulk Electric System. The Balancing Authority's job is to keep generation
        and load matched at every instant, expressed mathematically as Area Control Error (ACE).
        The RC's job is to make sure the BA is doing that correctly, and to coordinate when it isn't.
      </p>

      <GifCard gifKey="frequency" caption="This is your ACE on a bad day." side="right" />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">The ACE Formula</h2>

      <div className="bg-navy-700 rounded-2xl p-6 my-6 font-mono text-center">
        <div className="text-mcyan-400 text-xl font-bold mb-2">ACE = (NIA − NIS) − 10B(FA − FS) − IME</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-left text-sm">
          {[
            ['NIA', 'Net Interchange Actual — measured MW flowing across BA ties'],
            ['NIS', 'Net Interchange Scheduled — contractually scheduled net interchange'],
            ['B', 'Frequency Bias Setting (MW/0.1 Hz) — always negative'],
            ['FA', 'Actual Interconnection Frequency (Hz)'],
            ['FS', 'Scheduled Frequency (normally 60 Hz)'],
            ['IME', 'Inadvertent Meter Error — accumulated measurement error correction'],
            ['10', 'Converts B from MW/0.1Hz to MW/Hz'],
          ].map(([term, def]) => (
            <div key={term} className="flex gap-2">
              <span className="text-amber-400 font-bold flex-shrink-0 w-10">{term}</span>
              <span className="text-slate-300">{def}</span>
            </div>
          ))}
        </div>
      </div>

      <Callout type="key" title="ACE Near Zero = Balanced BA">
        When ACE ≈ 0, the BA is: (1) meeting its scheduled interchange with neighbors, and
        (2) contributing its proportional share of frequency support. A positive ACE means
        the BA is "over-generating" relative to its obligations. Negative = under-generating.
        CPS1 measures ACE performance over a rolling 12-month period — must be ≥ 100%.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Frequency Bias Setting (B)</h2>
      <p>
        The Frequency Bias Setting is the most misunderstood term in the ACE formula.
        It is always a negative number — typically set at or near the BA's natural frequency response.
      </p>

      <Callout type="example" title="Bias Example">
        A BA has B = −100 MW/0.1 Hz. Frequency drops to 59.9 Hz (0.1 Hz below nominal).
        The ACE bias term = 10 × (−100) × (59.9 − 60.0) = 10 × (−100) × (−0.1) = +100 MW.
        This adds +100 MW to ACE, telling AGC the BA needs to increase generation by 100 MW
        to fulfill its frequency bias obligation.
      </Callout>

      <AnalogyCard analogy={{
        title: "The Checkbook That Never Stops",
        concept: "ACE and real-time balancing",
        analogy: "Managing ACE is like balancing a checkbook that reconciles every 10 seconds, across 10 neighboring accounts, while someone keeps randomly depositing and withdrawing without telling you. And if your balance drifts too far, your neighbors' accounts start bouncing too. And the whole thing runs on 60 Hz.",
        gif: "thinking"
      }} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Contingency Reserve Requirements</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-navy-700 mb-3">Operating Reserve</h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-mblue-600 rounded-full flex-shrink-0 mt-1" />
              <span><strong>Regulation Reserve</strong> — Responds to AGC signals, maintains ACE near zero in real-time</span>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-amber-500 rounded-full flex-shrink-0 mt-1" />
              <span><strong>Contingency Reserve</strong> — Held for the MSSC event; includes Spinning + Non-Spinning</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-navy-700 mb-3">Reserve Types</h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-mgreen-500 rounded-full flex-shrink-0 mt-1" />
              <span><strong>Spinning Reserve</strong> — Online, unloaded, synchronized; deployable in 10 minutes</span>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-mcyan-500 rounded-full flex-shrink-0 mt-1" />
              <span><strong>Non-Spinning Reserve</strong> — Offline; also deployable in 10 minutes</span>
            </div>
          </div>
        </div>
      </div>

      <Callout type="warning" title="BAL-002-3: The 15-Minute Rule">
        Following a Reportable Balancing Contingency Event, the BA must return ACE within
        the Disturbance Recovery Limit (DRL) within <strong>15 minutes</strong>. After recovery,
        contingency reserves must be restored within <strong>90 minutes</strong>. The DRL
        itself equals the BA's MSSC (Most Severe Single Contingency) — the largest single
        resource loss possible. This sets the minimum reserve requirement.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Time Error Correction</h2>
      <p>
        Electric clocks use AC frequency cycles to keep time. If average frequency drifts
        below 60 Hz over time, clocks run slow — accumulated as Time Error (in seconds).
        The RC announces Time Error Corrections to correct this drift.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="font-bold text-amber-800 mb-2">🐌 Slow Time Error</h3>
          <p className="text-sm text-amber-900">Clocks running slow (frequency averaged below 60 Hz)</p>
          <p className="text-sm font-bold text-amber-900 mt-2">BAs set FS = 60.02 Hz</p>
          <p className="text-xs text-amber-700 mt-1">Higher scheduled frequency → AGC pushes generation up → actual frequency rises above 60 Hz → clocks speed up to compensate</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-blue-800 mb-2">🏃 Fast Time Error</h3>
          <p className="text-sm text-blue-900">Clocks running fast (frequency averaged above 60 Hz)</p>
          <p className="text-sm font-bold text-blue-900 mt-2">BAs set FS = 59.98 Hz</p>
          <p className="text-xs text-blue-700 mt-1">Lower scheduled frequency → AGC allows generation to drop → actual frequency falls below 60 Hz → clocks slow down to compensate</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Inadvertent Interchange</h2>
      <p>
        Inadvertent interchange is the time-accumulated difference between what a BA actually
        exported/imported and what it scheduled. It's like a running tab that the BA owes
        to or is owed by the Interconnection.
      </p>

      <Callout type="pro" title="Inadvertent ≠ Bad ACE">
        Good ACE doesn't prevent inadvertent accumulation — it can happen due to measurement
        errors, ramp timing, and frequency deviations. BAL-006 requires BAs to return
        inadvertent interchange over time, but they may do so gradually and with RC coordination.
        Positive inadvertent = exported more than scheduled (you "owe" the Interconnection).
      </Callout>

      <FunFact index={6} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Key Balancing Standards</h2>
      <div className="space-y-2">
        {[
          ['BAL-001-2', 'Real Power Balancing Control Performance — CPS1 (≥100%) and CPS2 standards'],
          ['BAL-002-3', 'Disturbance Control Standard — MSSC-based reserves, 15-min DRL recovery'],
          ['BAL-003-2', 'Frequency Response and Frequency Bias Setting — governor response obligation'],
          ['BAL-005', 'Balancing Authority Control — AGC system requirements'],
          ['BAL-006', 'Inadvertent Interchange — accounting and return methodology'],
        ].map(([std, desc]) => (
          <div key={std} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono text-xs font-bold text-mblue-600 bg-mblue-50 px-2 py-1 rounded-lg flex-shrink-0">{std}</span>
            <span className="text-sm text-slate-700">{desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-bold text-navy-700 mb-2">Chapter Quiz</h2>
        <p className="text-sm text-slate-500 mb-4">ACE formula, reserves, and time error corrections.</p>
        <Quiz chapterId="balancing" questions={QUIZZES.balancing} level={1} />
      </div>
    </ChapterLayout>
  )
}
