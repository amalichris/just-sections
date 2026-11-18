import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Copy, Link } from 'lucide-react'
import requireProps from '../requireProps'
import './MoveInCalculator.css'

/**
 * @import { Cta } from '../types'
 *
 * @typedef {{ label: string, apartment: number, villa: number }} ByPropertyType
 * @typedef {{ label: string, amount: number, note?: string }} FixedFee
 * @typedef {{
 *   currency: string,
 *   rentPresets: number[],
 *   defaultRent: number,
 *   chequeOptions: number[],
 *   defaultCheques: number,
 *   depositPercent: { unfurnished: number, furnished: number },
 *   agentFeePercent: number,
 *   vatPercent: number,
 *   utilityDeposit: ByPropertyType,
 *   connectionFee: FixedFee,
 *   registrationFee: FixedFee,
 *   housingFee: { label: string, percent: number, note?: string },
 *   utilityEstimates: { label: string, apartment: number[], villa: number[] },
 * }} MoveInAssumptions
 *
 * @param {object} props
 * @param {string} props.title Required page heading, rendered as the page `h1`.
 * @param {MoveInAssumptions} props.assumptions Required market figures.
 * @param {string} [props.subtitle] Supporting copy below the title.
 * @param {{ title: string, body?: string, cta: Cta }} [props.aside] Closing card.
 * @param {string[]} [props.disclaimer] Fine print paragraphs.
 * @param {string} [props.shareUrl] Absolute page URL. Enables "Copy link".
 * @param {string} [props.id] Section id, defaults to `calculator`.
 */
export default function MoveInCalculator({
  title,
  assumptions,
  subtitle,
  aside,
  disclaimer,
  shareUrl,
  id = 'calculator',
}) {
  const uid = useId().replaceAll(':', '')
  const titleId = `${id}-${uid}-title`
  const resultRef = useRef(null)
  const introRef = useRef(null)
  const chartRef = useRef(null)
  const animTimer = useRef(0)
  const [state, setState] = useState(() => initialState(assumptions))
  const [rentText, setRentText] = useState(() => formatBare(state.rent))
  const [animate, setAnimate] = useState(false)
  const [month, setMonth] = useState(0)
  const [hoverMonth, setHoverMonth] = useState(null)
  const [chartFocused, setChartFocused] = useState(false)
  const [copied, setCopied] = useState('')
  const [dockVisible, setDockVisible] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    let resultVisible = false
    let pastIntro = false
    const update = () => setDockVisible(pastIntro && !resultVisible)
    const resultObserver = new IntersectionObserver(
      ([entry]) => {
        resultVisible = entry.isIntersecting
        update()
      },
      { threshold: 0.25 },
    )
    const introObserver = new IntersectionObserver(([entry]) => {
      pastIntro = !entry.isIntersecting
      update()
    })
    if (resultRef.current) resultObserver.observe(resultRef.current)
    if (introRef.current) introObserver.observe(introRef.current)

    return () => {
      resultObserver.disconnect()
      introObserver.disconnect()
    }
  }, [])

  useEffect(() => () => clearTimeout(animTimer.current), [])

  if (requireProps('MoveInCalculator', { title, assumptions })) return null

  const a = assumptions
  const fmt = (n) => `${a.currency} ${formatBare(n)}`
  const s = state

  function calc(cheques) {
    const cheque = s.rent / cheques
    const deposit = (s.rent * s.dep) / 100
    const agentFee = s.agent ? ((s.rent * s.fee) / 100) * (1 + a.vatPercent / 100) : 0
    const utilityDeposit = a.utilityDeposit[s.type]
    const back = deposit + utilityDeposit
    const fees = agentFee + a.connectionFee.amount + a.registrationFee.amount + s.once

    return { cheque, deposit, agentFee, utilityDeposit, back, fees, total: cheque + back + fees }
  }

  const r = calc(s.cheques)
  const housing = (s.rent * a.housingFee.percent) / 100 / 12
  const bills = housing + s.utility + s.extra
  const one = calc(1).total

  // Control taps animate the charts; typing never does (foundations §11).
  function tapped(patch) {
    setState((prev) => withPatch(prev, patch, a))
    setAnimate(true)
    clearTimeout(animTimer.current)
    animTimer.current = setTimeout(() => setAnimate(false), 450)
  }

  function typed(patch) {
    setState((prev) => withPatch(prev, patch, a))
  }

  function setRent(value, viaTap) {
    setRentText(formatBare(value))
    if (viaTap) tapped({ rent: value })
    else typed({ rent: value })
  }

  function shareLink() {
    const params = new URLSearchParams({
      rent: String(s.rent),
      cheques: String(s.cheques),
      type: s.type,
      beds: String(s.beds),
      furnished: s.furn === 'furnished' ? '1' : '0',
      agent: s.agent ? '1' : '0',
    })

    return `${shareUrl}?${params}`
  }

  function copy(text, key) {
    const done = () => {
      setCopied(key)
      setTimeout(() => setCopied(''), 1600)
    }
    try {
      navigator.clipboard.writeText(text).then(done, () => {})
    } catch {
      // Clipboard unavailable: the share URL stays visible as selectable text.
    }
  }

  function copyBreakdown() {
    copy(
      [
        `Cash needed to move in: ${fmt(r.total)}`,
        `Annual rent ${fmt(s.rent)}, ${plural(s.cheques)}`,
        '',
        `First rent cheque  ${fmt(r.cheque)}`,
        `Deposits that come back  ${fmt(r.back)}`,
        `One-time fees  ${fmt(r.fees)}`,
        '',
        `Bills per month after move-in: about ${fmt(bills)}`,
        '',
        'Estimate, not a quotation.',
      ].join('\n'),
      'breakdown',
    )
  }

  // Year: month 1 carries the move-in payment plus the first month of bills.
  const step = 12 / s.cheques
  const yearMax = r.total + bills || 1
  const months = Array.from({ length: 12 }, (_, i) => {
    const pay = i % step === 0
    const segs = [['bills', bills]]
    if (i === 0) segs.push(['fees', r.fees], ['back', r.back])
    if (pay) segs.push(['rent', r.cheque])
    const sum = segs.reduce((total, [, v]) => total + v, 0)

    return { i, pay, segs, sum, name: i === 0 ? 'Move-in month' : `Month ${i + 1}` }
  })
  const shown = months[hoverMonth ?? month]
  const dim = hoverMonth !== null || chartFocused

  function onChartKey(event, i) {
    const next = event.key === 'ArrowRight' ? i + 1 : event.key === 'ArrowLeft' ? i - 1 : null
    if (next === null || next < 0 || next > 11) return
    event.preventDefault()
    chartRef.current?.children[next]?.focus()
  }

  const insight =
    s.rent <= 0 ? (
      'Enter the annual rent to see your total.'
    ) : s.cheques === 1 ? (
      <>
        Paying in 2 cheques would lower day one by <mark>{fmt(one - calc(2).total)}</mark>.
      </>
    ) : (
      <>
        Compared with one cheque, {s.cheques} cheques keep <mark>{fmt(one - r.total)}</mark> in
        your account on day one.
      </>
    )

  const yearCaption =
    s.cheques === 1
      ? 'Everything goes on day one. After that, only monthly bills.'
      : s.cheques === 12
        ? 'Day one is the largest payment. Then a cheque and bills every month.'
        : `Day one is the largest payment. Then a cheque every ${step} months, and bills monthly.`

  return (
    <section
      id={id}
      className={`move-in-calculator${animate ? ' move-in-calculator--animate' : ''}`}
      aria-labelledby={titleId}
    >
      <div className="mic-wrap">
        <header className="mic-intro" ref={introRef}>
          <h1 id={titleId}>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </header>

        <div className="mic-app">
          <div className="mic-card mic-inputs">
            <div className="mic-field">
              <label htmlFor={`${uid}-rent`}>Annual rent</label>
              <div className="mic-hero-input" onClick={() => document.getElementById(`${uid}-rent`)?.focus()}>
                <span>{a.currency}</span>
                <input
                  id={`${uid}-rent`}
                  inputMode="numeric"
                  autoComplete="off"
                  value={rentText}
                  onChange={(event) => {
                    setRentText(event.target.value)
                    typed({ rent: parseAmount(event.target.value) })
                  }}
                  onBlur={() => setRentText(formatBare(s.rent))}
                />
                <span className="mic-per">per year</span>
              </div>
              <div className="mic-presets" role="group" aria-label="Common annual rents">
                {a.rentPresets.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="mic-chip"
                    aria-pressed={s.rent === value}
                    onClick={() => setRent(value, true)}
                  >
                    {formatShort(value)}
                  </button>
                ))}
              </div>
              {s.rent > 0 && s.rent < 25000 ? (
                <div className="mic-hint">
                  <span>That looks like a monthly rent. Annual would be {fmt(s.rent * 12)}.</span>
                  <button type="button" className="mic-text-button" onClick={() => setRent(s.rent * 12, true)}>
                    Use {fmt(s.rent * 12)}
                  </button>
                </div>
              ) : null}
            </div>

            <div className="mic-controls">
              <Track
                className="mic-wide"
                label="Rent cheques"
                options={a.chequeOptions.map((c) => [c, String(c)])}
                value={s.cheques}
                onChange={(v) => {
                  setMonth(0)
                  tapped({ cheques: v })
                }}
                sub={s.cheques === 1 ? `One payment of ${fmt(s.rent)}` : `${s.cheques} payments of ${fmt(r.cheque)}`}
              />
              <Track
                label="Property"
                options={[['apartment', 'Apartment'], ['villa', 'Villa']]}
                value={s.type}
                onChange={(v) => tapped({ type: v })}
              />
              <Track
                label="Furnishing"
                options={[['unfurnished', 'Unfurnished'], ['furnished', 'Furnished']]}
                value={s.furn}
                onChange={(v) => tapped({ furn: v })}
              />
              <Track
                className="mic-wide"
                label="Bedrooms"
                options={[[0, 'Studio'], [1, '1'], [2, '2'], [3, '3'], [4, '4+']]}
                value={s.beds}
                onChange={(v) => tapped({ beds: v })}
              />
              <Track
                className="mic-wide"
                label="Found through"
                options={[[1, 'An agent'], [0, 'The landlord']]}
                value={s.agent}
                onChange={(v) => tapped({ agent: v })}
              />
            </div>

            <details className="mic-adv">
              <summary>
                Adjust the assumptions
                <ChevronDown size={16} aria-hidden="true" />
              </summary>
              <div className="mic-adv-grid">
                <NumberField id={`${uid}-dep`} label="Security deposit" suffix="% of rent" value={s.dep} onChange={(v) => typed({ dep: v, depTouched: true })} />
                <NumberField id={`${uid}-fee`} label="Agent fee" suffix={`% + ${a.vatPercent}% VAT`} value={s.fee} onChange={(v) => typed({ fee: v })} />
                <NumberField
                  className="mic-wide"
                  id={`${uid}-once`}
                  label="One-time extras"
                  prefix={a.currency}
                  placeholder="Movers, furniture, internet setup"
                  value={s.once || ''}
                  onChange={(v) => typed({ once: v })}
                />
              </div>
            </details>
          </div>

          <div className="mic-card mic-result" ref={resultRef} id={`${id}-result`}>
            <div className="mic-result-top">
              <div>
                <p className="mic-eyebrow">Cash needed to move in</p>
                <p className="mic-total" aria-live="polite">{fmt(r.total)}</p>
                <p className="mic-caption">
                  For a {fmt(s.rent)} {s.type} in {plural(s.cheques)}.
                </p>
              </div>
              <div>
                <div className="mic-stack" aria-hidden="true">
                  <span style={{ flexGrow: r.cheque, background: 'var(--mic-rent)' }} />
                  <span style={{ flexGrow: r.back, background: 'var(--mic-back)' }} />
                  <span style={{ flexGrow: r.fees, background: 'var(--mic-fees)' }} />
                </div>
                <div className="mic-legend">
                  <div><span className="mic-cat mic-cat--rent">Rent</span><span>{formatBare(r.cheque)}</span></div>
                  <div><span className="mic-cat mic-cat--back">Comes back</span><span>{formatBare(r.back)}</span></div>
                  <div><span className="mic-cat mic-cat--fees">Fees</span><span>{formatBare(r.fees)}</span></div>
                </div>
              </div>
            </div>

            <div className="mic-lines">
              <div className="mic-group mic-group--full">
                <span className="mic-cat mic-cat--rent">Rent</span>
                <Line label="First rent cheque" note={s.cheques === 1 ? 'The whole year, paid upfront' : `1 of ${s.cheques}, usually handed over at signing`} value={fmt(r.cheque)} />
              </div>
              <div className="mic-group">
                <span className="mic-cat mic-cat--back">Comes back when you leave</span>
                <Line label="Security deposit" note={`${s.dep}% of annual rent`} value={fmt(r.deposit)} />
                <Line label={a.utilityDeposit.label} note={s.type === 'villa' ? 'Villa rate' : 'Apartment rate'} value={fmt(r.utilityDeposit)} />
              </div>
              <div className="mic-group">
                <span className="mic-cat mic-cat--fees">One-time fees</span>
                {s.agent ? <Line label="Agent fee" note={`${s.fee}% of rent plus ${a.vatPercent}% VAT`} value={fmt(r.agentFee)} /> : null}
                <Line label={a.connectionFee.label} note={a.connectionFee.note} value={fmt(a.connectionFee.amount)} />
                <Line label={a.registrationFee.label} note={a.registrationFee.note} value={fmt(a.registrationFee.amount)} />
                {s.once ? <Line label="One-time extras" value={fmt(s.once)} /> : null}
              </div>
            </div>

            <p className="mic-insight">{insight}</p>

            <div className="mic-actions">
              <button type="button" className="mic-button mic-button--primary" onClick={copyBreakdown}>
                <Copy size={16} aria-hidden="true" />
                {copied === 'breakdown' ? 'Copied' : 'Copy breakdown'}
              </button>
              {shareUrl ? (
                <button type="button" className="mic-button mic-button--sand" onClick={() => copy(shareLink(), 'link')}>
                  <Link size={16} aria-hidden="true" />
                  {copied === 'link' ? 'Link copied' : 'Copy link'}
                </button>
              ) : null}
            </div>
            {shareUrl ? <p className="mic-share-url">{shareLink()}</p> : null}
          </div>
        </div>

        <div className="mic-card mic-block">
          <div className="mic-head">
            <div>
              <p className="mic-eyebrow">After you move in</p>
              <h2>What you pay every month</h2>
            </div>
            <p className="mic-caption">Billed monthly, mostly on your utility bill. Not part of the move-in total.</p>
          </div>
          <div className="mic-monthly">
            <div>
              <div className="mic-mrow">
                <span className="mic-k">Rent, spread per month<small>Paid by cheque, shown here for comparison</small></span>
                <span className="mic-fixed">{fmt(s.rent / 12)}</span>
              </div>
              <div className="mic-mrow">
                <span className="mic-k">{a.housingFee.label}{a.housingFee.note ? <small>{a.housingFee.note}</small> : null}</span>
                <span className="mic-fixed">{fmt(housing)}</span>
              </div>
              <div className="mic-mrow">
                <label className="mic-k" htmlFor={`${uid}-utility`}>
                  {a.utilityEstimates.label}
                  <small>Rough year-round average for a {BED_NAMES[s.beds]} {s.type}. Summer runs higher</small>
                </label>
                <AmountInput id={`${uid}-utility`} prefix={a.currency} value={s.utility} onChange={(v) => typed({ utility: v, utilityTouched: true })} />
              </div>
              <div className="mic-mrow">
                <label className="mic-k" htmlFor={`${uid}-extra`}>
                  Internet, chiller and other<small>Chiller only if your building bills cooling separately</small>
                </label>
                <AmountInput id={`${uid}-extra`} prefix={a.currency} placeholder="0" value={s.extra || ''} onChange={(v) => typed({ extra: v })} />
              </div>
            </div>
            <div className="mic-summary">
              <p className="mic-eyebrow">Bills per month</p>
              <p className="mic-summary-value">{fmt(bills)}</p>
              <p className="mic-caption">On top of rent. {a.housingFee.label} plus your estimates.</p>
              <hr />
              <p className="mic-summary-row"><span>Rent and bills per month</span><strong>{fmt(s.rent / 12 + bills)}</strong></p>
              <p className="mic-summary-row"><span>First year, deposits excluded</span><strong>{fmt(s.rent + r.fees + bills * 12)}</strong></p>
            </div>
          </div>
        </div>

        <div className="mic-card mic-block">
          <div className="mic-head">
            <div>
              <p className="mic-eyebrow">Your year</p>
              <h2>When the money leaves your account</h2>
            </div>
            <p className="mic-caption">{yearCaption} Hover or tap a month to see what it includes.</p>
          </div>
          <div className="mic-year">
            <div className="mic-plot">
              <div
                className={`mic-chart${dim ? ' mic-chart--dim' : ''}`}
                ref={chartRef}
                role="group"
                aria-label="Payments over 12 months"
                onMouseLeave={() => setHoverMonth(null)}
                onFocus={() => setChartFocused(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setChartFocused(false)
                }}
              >
                {months.map((m) => (
                  <div
                    key={m.i}
                    className={`mic-bar${m.i === shown.i ? ' mic-bar--selected' : ''}${m.i === 0 ? ' mic-bar--first' : ''}`}
                    style={{ '--mic-bar-height': `${(m.sum / yearMax) * 100}%` }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${m.name}: ${m.segs.filter(([, v]) => v > 0).map(([k, v]) => `${SEGMENT_NAMES[k]} ${fmt(v)}`).join(', ')}. Total ${fmt(m.sum)}`}
                    onMouseEnter={() => setHoverMonth(m.i)}
                    onClick={() => setMonth(m.i)}
                    onFocus={() => setMonth(m.i)}
                    onKeyDown={(event) => onChartKey(event, m.i)}
                  >
                    {m.segs.map(([k, v]) =>
                      v > 0 ? <span key={k} style={{ height: `${(v / yearMax) * 100}%`, background: `var(--mic-${k})` }} /> : null,
                    )}
                    {m.pay ? <span className="mic-bar-value">{m.i === 0 ? fmt(r.total) : formatBare(r.cheque)}</span> : null}
                  </div>
                ))}
              </div>
              <div className="mic-month-labels" aria-hidden="true">
                {months.map((m) => (
                  <span key={m.i} className={m.i === shown.i ? 'mic-month-labels--selected' : undefined}>
                    {m.i === 0 ? 'Move-in' : `M${m.i + 1}`}
                  </span>
                ))}
              </div>
            </div>
            <div className="mic-detail" aria-live="polite">
              <div className="mic-detail-head">
                <strong>{shown.name}</strong>
                <span>{shown.i + 1} of 12</span>
              </div>
              <p className="mic-detail-value">{fmt(shown.sum)}</p>
              <p className="mic-detail-label">Leaves your account</p>
              {shown.segs
                .slice()
                .reverse()
                .filter(([, v]) => v > 0)
                .map(([k, v]) => (
                  <p key={k} className="mic-breakdown-row">
                    <i style={{ background: `var(--mic-${k})` }} />
                    <span>{SEGMENT_NAMES[k]}</span>
                    <span>{fmt(v)}</span>
                  </p>
                ))}
              <p className="mic-detail-note">
                {shown.i === 0 ? 'Includes the first month of bills.' : shown.pay ? 'A rent cheque is due this month.' : 'Bills only this month.'}
              </p>
            </div>
          </div>
          <div className="mic-key">
            <span className="mic-cat mic-cat--rent">Rent cheque</span>
            <span className="mic-cat mic-cat--back">Deposits that come back</span>
            <span className="mic-cat mic-cat--fees">One-time fees</span>
            <span className="mic-cat mic-cat--bills">Monthly bills</span>
          </div>
        </div>

        <div className="mic-card mic-block">
          <div className="mic-head">
            <div>
              <p className="mic-eyebrow">Compare</p>
              <h2>Same rent, different cheques</h2>
            </div>
            <p className="mic-caption">Tap a plan to use it. More cheques means less cash on day one, though some landlords charge more for them.</p>
          </div>
          <div className="mic-plans" role="group" aria-label="Cheque plans">
            {a.chequeOptions.map((c) => {
              const x = calc(c)
              const w = (v) => `${(v / (one || 1)) * 100}%`

              return (
                <button
                  key={c}
                  type="button"
                  className="mic-plan"
                  aria-pressed={c === s.cheques}
                  onClick={() => {
                    setMonth(0)
                    tapped({ cheques: c })
                  }}
                >
                  <span className="mic-plan-label">{plural(c)}</span>
                  <span className="mic-plan-bar">
                    <span style={{ width: w(x.cheque), background: 'var(--mic-rent)' }} />
                    <span style={{ width: w(x.back), background: 'var(--mic-back)' }} />
                    <span style={{ width: w(x.fees), background: 'var(--mic-fees)' }} />
                  </span>
                  <span className="mic-plan-value">{fmt(x.total)}</span>
                  <span className="mic-plan-card" aria-hidden="true">
                    <span className="mic-plan-card-title">{plural(c)} on day one</span>
                    <span className="mic-breakdown-row"><i style={{ background: 'var(--mic-rent)' }} /><span>{c === 1 ? 'Full year of rent' : `First of ${c} cheques`}</span><span>{fmt(x.cheque)}</span></span>
                    <span className="mic-breakdown-row"><i style={{ background: 'var(--mic-back)' }} /><span>{SEGMENT_NAMES.back}</span><span>{fmt(x.back)}</span></span>
                    <span className="mic-breakdown-row"><i style={{ background: 'var(--mic-fees)' }} /><span>{SEGMENT_NAMES.fees}</span><span>{fmt(x.fees)}</span></span>
                    <span className="mic-breakdown-total"><span>Cash to move in</span><span>{fmt(x.total)}</span></span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {aside?.title && aside?.cta ? (
          <div className="mic-card mic-aside">
            <div>
              <h2>{aside.title}</h2>
              {aside.body ? <p className="mic-caption">{aside.body}</p> : null}
            </div>
            <a className="mic-button mic-button--sand" href={aside.cta.href} target={aside.cta.target} rel={aside.cta.target === '_blank' ? 'noreferrer noopener' : undefined}>
              {aside.cta.label}
            </a>
          </div>
        ) : null}

        {disclaimer?.length ? (
          <div className="mic-fine">
            {disclaimer.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        ) : null}
      </div>

      <nav className="mic-dock" data-hidden={dockVisible ? 'false' : 'true'} aria-label="Move-in total">
        <a href={`#${id}-result`} tabIndex={dockVisible ? undefined : -1}>
          <span>
            <span className="mic-dock-label">Cash to move in</span>
            <span className="mic-dock-value">{fmt(r.total)}</span>
          </span>
          <span className="mic-dock-go">Breakdown</span>
        </a>
      </nav>
    </section>
  )
}

const BED_NAMES = ['studio', '1-bedroom', '2-bedroom', '3-bedroom', '4-bedroom']
const SEGMENT_NAMES = {
  rent: 'Rent cheque',
  back: 'Deposits, refundable',
  fees: 'One-time fees',
  bills: 'Monthly bills',
}

function Track({ label, options, value, onChange, sub, className }) {
  const labelId = useId()

  return (
    <div className={`mic-field${className ? ` ${className}` : ''}`}>
      <span className="mic-label" id={labelId}>{label}</span>
      <div className="mic-track" role="group" aria-labelledby={labelId}>
        {options.map(([v, text]) => (
          <button key={String(v)} type="button" aria-pressed={v === value} onClick={() => onChange(v)}>
            {text}
          </button>
        ))}
      </div>
      {sub ? <span className="mic-sub">{sub}</span> : null}
    </div>
  )
}

function Line({ label, note, value }) {
  return (
    <div className="mic-line">
      <span className="mic-k">
        {label}
        {note ? <small>{note}</small> : null}
      </span>
      <span>{value}</span>
    </div>
  )
}

function AmountInput({ id, prefix, suffix, placeholder, value, onChange }) {
  return (
    <div className="mic-small-input">
      {prefix ? <span>{prefix}</span> : null}
      <input id={id} inputMode="decimal" placeholder={placeholder} value={value} onChange={(event) => onChange(parseAmount(event.target.value))} />
      {suffix ? <span>{suffix}</span> : null}
    </div>
  )
}

function NumberField({ id, label, className, ...input }) {
  return (
    <div className={`mic-field${className ? ` ${className}` : ''}`}>
      <label htmlFor={id}>{label}</label>
      <AmountInput id={id} {...input} />
    </div>
  )
}

function parseAmount(text) {
  const n = parseFloat(String(text).replace(/[^0-9.]/g, ''))

  return Number.isFinite(n) && n >= 0 ? n : 0
}

function formatBare(n) {
  return Math.round(n).toLocaleString('en-US')
}

function formatShort(n) {
  return n >= 1000 ? `${Math.round(n / 1000)}K` : String(n)
}

function plural(c) {
  return `${c} ${c === 1 ? 'cheque' : 'cheques'}`
}

// Applies a change and keeps derived defaults in step: furnishing moves the
// deposit default, and property type or bedrooms move the utility estimate,
// until the visitor edits that field themselves.
function withPatch(prev, patch, a) {
  const next = { ...prev, ...patch }
  if (!next.depTouched && 'furn' in patch) next.dep = a.depositPercent[next.furn]
  if (!next.utilityTouched && ('type' in patch || 'beds' in patch)) next.utility = a.utilityEstimates[next.type][next.beds]

  return next
}

// Defaults from config, then any values a shared link carries.
function initialState(a) {
  const base = {
    rent: a?.defaultRent ?? 0,
    cheques: a?.defaultCheques ?? 1,
    type: 'apartment',
    furn: 'unfurnished',
    beds: 1,
    agent: 1,
    dep: a?.depositPercent?.unfurnished ?? 0,
    depTouched: false,
    fee: a?.agentFeePercent ?? 0,
    once: 0,
    utility: 0,
    utilityTouched: false,
    extra: 0,
  }
  if (typeof window !== 'undefined' && a) {
    const q = new URLSearchParams(window.location.search)
    const rent = Number(q.get('rent'))
    const cheques = Number(q.get('cheques'))
    const beds = Number(q.get('beds'))
    if (rent > 0) base.rent = rent
    if (a.chequeOptions?.includes(cheques)) base.cheques = cheques
    if (q.get('type') === 'villa' || q.get('type') === 'apartment') base.type = q.get('type')
    if (q.has('beds') && beds >= 0 && beds <= 4) base.beds = beds
    if (q.get('furnished') === '1') base.furn = 'furnished'
    if (q.get('agent') === '0') base.agent = 0
  }
  if (a) {
    base.dep = a.depositPercent[base.furn]
    base.utility = a.utilityEstimates[base.type][base.beds]
  }

  return base
}
