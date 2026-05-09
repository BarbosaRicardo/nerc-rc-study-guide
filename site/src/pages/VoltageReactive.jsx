import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import AnalogyCard from '../components/AnalogyCard'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'

export default function VoltageReactive() {
  return (
    <ChapterLayout
      chapterId="var"
      title="Voltage & Reactive Power"
      emoji="📊"
      prev="power-systems"
      next="lab"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Voltage management is the RC's most nuanced daily challenge. Unlike frequency —
        which is a single Interconnection-wide value — voltage varies at every bus in the system.
        Managing it requires understanding reactive power flows, generator excitation systems,
        and the progressive nature of voltage collapse. This chapter is where the physics
        meets the operating decisions.
      </p>

      <AnalogyCard analogy={{
        title: "The Bouncer at the Voltage Club",
        concept: "Reactive power and voltage support",
        analogy: "Reactive power is the bouncer at the voltage club — you don't see it doing useful work, but without it, everything collapses and nobody has a good time. Generators produce reactive power (MVAR) when overexcited and absorb it when underexcited. Capacitor banks produce MVAR. Reactors consume it. And none of this shows up on your electric bill, which is why most people have never heard of it.",
        gif: "voltage"
      }} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">MVAR Sources and Sinks</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-mgreen-50 border border-mgreen-400 rounded-2xl p-5">
          <h3 className="font-bold text-mgreen-800 mb-3">MVAR Sources (Produce Reactive Power)</h3>
          <div className="space-y-2 text-sm">
            {[
              ['Overexcited Generators', 'Excitation > 1.0 pu; produces MVAR, raises terminal voltage'],
              ['Capacitor Banks', 'Switched on to inject MVAR into low-voltage buses'],
              ['Static VAR Compensators (SVC)', 'Fast-response MVAR injection; adjusts continuously'],
              ['STATCOMs', 'Voltage-source converter-based MVAR injection'],
            ].map(([name, desc]) => (
              <div key={name}>
                <span className="font-semibold text-mgreen-700">{name}:</span>
                <span className="text-slate-700 ml-1">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-50 border border-mred-400 rounded-2xl p-5">
          <h3 className="font-bold text-mred-800 mb-3">MVAR Sinks (Absorb Reactive Power)</h3>
          <div className="space-y-2 text-sm">
            {[
              ['Underexcited Generators', 'Excitation < 1.0 pu; absorbs MVAR, lowers terminal voltage'],
              ['Shunt Reactors', 'Switched on to absorb MVAR from high-voltage buses (Ferranti effect)'],
              ['Transmission Lines', 'Long, heavily loaded lines consume significant MVAR'],
              ['Inductive Loads', 'Motors, transformers with lagging power factor draw MVAR'],
            ].map(([name, desc]) => (
              <div key={name}>
                <span className="font-semibold text-mred-700">{name}:</span>
                <span className="text-slate-700 ml-1">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Callout type="key" title="Overexcited vs Underexcited Generator">
        An <strong>overexcited</strong> generator produces MVAR (lagging current from system perspective)
        and raises voltage. An <strong>underexcited</strong> generator absorbs MVAR (leading current)
        and lowers voltage. The AVR (Automatic Voltage Regulator) controls excitation.
        The Q-capability curve shows the maximum and minimum MVAR limits as MW output changes.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Generator Q-Capability Curve</h2>
      <p>
        The Q-capability curve (also called reactive capability curve) shows how much MVAR
        a generator can produce (overexcited) or absorb (underexcited) at different MW loading levels.
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 my-4">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <div className="font-bold text-red-700 text-sm mb-1">Underexcited Limit</div>
            <div className="text-slate-600">Absorbing MVAR limit</div>
            <div className="text-red-700 mt-1">Constrained by stator heating, stability limits</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center">
            <div className="font-bold text-slate-700">Operating Zone</div>
            <div className="text-xs text-slate-500 mt-1">Normal operation within Q limits</div>
          </div>
          <div className="bg-mgreen-50 border border-mgreen-300 rounded-xl p-3">
            <div className="font-bold text-mgreen-700 text-sm mb-1">Overexcited Limit</div>
            <div className="text-slate-600">Producing MVAR limit</div>
            <div className="text-mgreen-700 mt-1">Constrained by rotor (field) current heating</div>
          </div>
        </div>
        <p className="text-xs text-slate-500 text-center mt-3">
          As MW output increases, MVAR capability (both overexcited and underexcited) generally decreases.
          This is why high-MW generators can provide less voltage support during heavy loading.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Voltage Collapse: The Mechanics</h2>

      <AnalogyCard analogy={{
        title: "The Polite Catastrophe",
        concept: "Voltage collapse progression",
        analogy: "Voltage collapse is the most polite catastrophe in engineering — the system slowly, graciously, completely destroys itself while giving you multiple opportunities to prevent it. Unlike a fault (instantaneous), voltage collapse takes minutes to hours to develop. There are warning signs at every step. And then, at the nose of the P-V curve, the system says 'I've been trying to tell you' and simply stops delivering voltage.",
        gif: "powerOut"
      }} />

      <Callout type="warning" title="The P-V Curve Nose Point">
        The P-V curve shows how voltage varies with power transfer at a receiving bus.
        As power transfer increases, voltage drops. At the "nose point," voltage collapse
        is imminent. The distance from current operating point to the nose point is the
        voltage stability margin. The RC must monitor this margin and take action before
        the nose is reached — not after.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">VAR-001-6 and VAR-002-4</h2>

      <div className="space-y-3 my-4">
        {[
          {
            std: 'VAR-001-6',
            entity: 'Transmission Operator',
            req: 'The TOP must establish voltage schedules or reactive power output schedules at generator interconnection points. Must monitor and maintain voltage within those schedules. Must coordinate with RC when local reactive resources are insufficient.',
            color: 'bg-blue-50 border-blue-200'
          },
          {
            std: 'VAR-002-4',
            entity: 'Generator Operator',
            req: 'The GOP must maintain generator terminal voltage or reactive output within the schedule established by the TOP. If the GOP cannot comply (equipment limits), it must immediately notify the TOP, who must take alternate corrective action.',
            color: 'bg-mgreen-50 border-mgreen-300'
          },
        ].map(({ std, entity, req, color }) => (
          <div key={std} className={`border rounded-2xl p-4 ${color}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-mblue-600 bg-white px-2 py-1 rounded-lg border">{std}</span>
              <span className="font-semibold text-navy-700 text-sm">{entity}</span>
            </div>
            <p className="text-sm text-slate-700">{req}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Ferranti Effect</h2>
      <p>
        During light load conditions, long transmission lines behave like large capacitors
        — the line's distributed capacitance generates reactive power with little load to
        absorb it. This causes receiving-end voltage to RISE above sending-end voltage.
        Shunt reactors are switched on to absorb this excess MVAR and control voltage.
      </p>

      <Callout type="pro" title="Night Operations: Watch for Over-Voltage">
        During overnight light-load periods, lightly loaded long transmission lines can cause
        voltage to rise dangerously. The RC may direct TOPs to switch on shunt reactors,
        reduce generator excitation (operate underexcited), or reduce line voltage. Over-voltage
        can damage equipment and is as dangerous as under-voltage in sustained conditions.
      </Callout>

      <FunFact index={3} />

      <div className="mt-10 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-bold text-navy-700 mb-2">Chapter Quiz</h2>
        <p className="text-sm text-slate-500 mb-4">MVAR sources/sinks, Q-capability, voltage collapse, VAR standards.</p>
        <Quiz chapterId="var" questions={QUIZZES.var} level={1} />
      </div>
    </ChapterLayout>
  )
}
