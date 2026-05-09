import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import AnalogyCard from '../components/AnalogyCard'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'

export default function Interchange() {
  return (
    <ChapterLayout
      chapterId="interchange"
      title="Interchange Scheduling"
      emoji="🔄"
      prev="iro"
      next="power-systems"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Energy doesn't just flow across state lines by accident — every megawatt that crosses
        a Balancing Authority boundary is supposed to be scheduled, tagged, and coordinated
        in advance. The e-Tag system is how the industry keeps track of who owes whom what,
        and the RC has the authority to modify or curtail any interchange that threatens
        reliability.
      </p>

      <GifCard gifKey="controlRoom" caption="The interchange desk: where contracts meet physics." side="right" />

      <AnalogyCard analogy={{
        title: "Writing Everything Down Anyway",
        concept: "E-tagging and interchange scheduling",
        analogy: "E-tagging is the power industry's way of saying 'we trust each other, but we're going to write everything down anyway.' Which is the correct approach when billions of dollars and grid stability are involved. Every MW that moves across a BA boundary has a tag. No tag, no flow. The system is not on the honor system — the data is enforced by physics and audited by NERC.",
        gif: "teamwork"
      }} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">E-Tag Required Elements</h2>
      <p>
        An e-Tag is the electronic record of an interchange transaction. NERC standards
        require specific elements to be present for a valid transaction:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          { field: 'MW Amount', desc: 'The amount of energy to be transferred in MW' },
          { field: 'Start/End Time', desc: 'The period during which the interchange is to take place' },
          { field: 'Ramp Time & Rate', desc: 'Beginning and ending ramp times and rate of change (MW/min)' },
          { field: 'Type of Service', desc: 'Firm or Non-Firm for both delivery and receipt points' },
          { field: 'Source/Sink', desc: 'Generating resource (source) and load area (sink)' },
          { field: 'Path', desc: 'The transmission path the energy will flow through' },
        ].map(({ field, desc }) => (
          <div key={field} className="flex gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-mblue-600 font-bold text-sm flex-shrink-0">✓</span>
            <div>
              <div className="font-semibold text-navy-700 text-sm">{field}</div>
              <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Interchange States</h2>
      <div className="space-y-3 my-6">
        {[
          { state: 'Arranged', color: 'bg-slate-100 border-slate-300', desc: 'Transaction submitted but not yet confirmed by all parties (source BA, sink BA, TSPs)' },
          { state: 'Confirmed', color: 'bg-blue-50 border-blue-300', desc: 'All parties have agreed to the transaction; it is approved to flow' },
          { state: 'Implemented', color: 'bg-mgreen-50 border-mgreen-400', desc: 'Energy is actively flowing per the agreed schedule' },
          { state: 'Reliability Adjustment', color: 'bg-amber-50 border-amber-400', desc: 'RC-directed modification to an existing Confirmed or Implemented transaction for reliability reasons' },
        ].map(({ state, color, desc }) => (
          <div key={state} className={`flex gap-3 p-4 rounded-xl border-2 ${color}`}>
            <span className="font-bold text-sm flex-shrink-0 w-28">{state}</span>
            <span className="text-sm text-slate-700">{desc}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">INT-006-5: RC Modification Authority</h2>

      <Callout type="key" title="The 60-Minute Rule">
        When the RC directs modification of Confirmed or Implemented Interchange for
        reliability reasons, a Reliability Adjustment Arranged Interchange schedule must
        be submitted within <strong>60 minutes</strong> of the start of the modification.
        This documents the RC-directed change in the e-Tag system and ensures proper accounting.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Firm vs Non-Firm Service</h2>
      <p>The type of transmission service determines curtailment priority during TLR events:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-mgreen-50 border border-mgreen-400 rounded-2xl p-5">
          <h3 className="font-bold text-mgreen-700 mb-2">Firm Service</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• Higher reliability guarantee</li>
            <li>• Last to be curtailed during TLR</li>
            <li>• TLR Level 4+ required to curtail</li>
            <li>• Examples: long-term firm PTP, Network Integration Transmission Service (NITS)</li>
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5">
          <h3 className="font-bold text-amber-700 mb-2">Non-Firm Service</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• Subject to curtailment for reliability</li>
            <li>• Curtailed before firm service (TLR 2-3b)</li>
            <li>• Typically day-ahead or real-time market transactions</li>
            <li>• Lower cost — reflects the curtailment risk</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">INT-009-3: Interchange Evaluation</h2>
      <p>
        Before a new interchange transaction is implemented, the RC must evaluate whether
        it will cause or contribute to an SOL or IROL violation:
      </p>

      <div className="space-y-2 my-4">
        {[
          ['Evaluate', 'RC assesses impact of new Arranged Interchange on SOLs and IROLs using contingency analysis'],
          ['Approve', 'RC approves transactions that do not cause reliability concerns'],
          ['Deny', 'RC may deny transactions that would cause or contribute to violations'],
          ['Condition', 'RC may approve with conditions (e.g., reduced MW, restricted time window)'],
        ].map(([action, desc]) => (
          <div key={action} className="flex gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-mblue-600 text-sm w-20 flex-shrink-0">{action}</span>
            <span className="text-sm text-slate-700">{desc}</span>
          </div>
        ))}
      </div>

      <Callout type="warning" title="Non-Firm Priority Order During TLR">
        When curtailing non-firm transactions under TLR, the order of curtailment matters.
        Exchanges (imports/exports for reliability) are typically protected. Non-firm transactions
        are curtailed in reverse order of reservation priority — lowest priority first.
        The RC coordinates with all affected TSPs to ensure consistent curtailment across the Interconnection.
      </Callout>

      <FunFact index={5} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Key Interchange Standards</h2>
      <div className="space-y-2">
        {[
          ['INT-006-5', 'Interchange evaluation — RC evaluates, approves, or denies Arranged Interchange'],
          ['INT-009-3', 'Interchange evaluation by Reliability Coordinators — coordination requirements'],
          ['BAL-005', 'Balancing Authority control — AGC properly accounts for scheduled interchange'],
          ['BAL-006', 'Inadvertent Interchange — accounting methodology and return process'],
        ].map(([std, desc]) => (
          <div key={std} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono text-xs font-bold text-mblue-600 bg-mblue-50 px-2 py-1 rounded-lg flex-shrink-0">{std}</span>
            <span className="text-sm text-slate-700">{desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-bold text-navy-700 mb-2">Chapter Quiz</h2>
        <p className="text-sm text-slate-500 mb-4">E-tag elements, interchange states, RC modification authority.</p>
        <Quiz chapterId="interchange" questions={QUIZZES.interchange} level={1} />
      </div>
    </ChapterLayout>
  )
}
