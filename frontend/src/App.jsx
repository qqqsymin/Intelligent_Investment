import { useMemo, useState } from 'react'
import { researchUniverse, strategy, demoMetrics } from './mock/demo'

const nav = [
  ['dashboard', '总览'],
  ['universe', '股票池'],
  ['backtest', '历史回测'],
  ['simulation', '模拟盘'],
  ['orders', '订单与成交'],
]

function Metric({ label, value, note }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</div>
}

function Chart() {
  const points = [24, 21, 26, 25, 31, 29, 35, 33, 39, 43, 41, 48, 46, 53, 58, 55, 62, 67, 64, 72]
  const max = Math.max(...points)
  const path = points.map((v, i) => `${(i / (points.length - 1)) * 100},${100 - (v / max) * 78 - 8}`).join(' ')
  return <div className="chart"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={path} fill="none" stroke="currentColor" strokeWidth="1.8" vectorEffect="non-scaling-stroke" /></svg><div className="axis"><span>回测开始</span><span>最新</span></div></div>
}

function Dashboard({ setPage }) {
  return <>
    <section className="hero">
      <div><div className="eyebrow">LOW-FREQUENCY A-SHARE QUANT</div><h1>智能量化投资<br /><em>低频大盘 · 红利研究</em></h1><p>把研究股票池、策略回测与模拟交易放进一个可演示的闭环。当前 Web V2 与仓库现有日线回测内核保持一致。</p></div>
      <div className="status"><span className="dot" />模拟环境 · 就绪<div>策略：{strategy.name}</div></div>
    </section>
    <div className="metrics"><Metric label="初始资金" value="¥1,000,000" /><Metric label="策略累计收益" value="待回测" note="不虚构历史收益" /><Metric label="最大回撤" value="待回测" /><Metric label="Sharpe" value="待回测" /></div>
    <div className="grid two">
      <section className="panel"><div className="panel-head"><div><span className="eyebrow">PERFORMANCE</span><h2>策略净值曲线</h2></div><button onClick={() => setPage('backtest')}>运行回测 →</button></div><Chart /><div className="notice">当前仓库示例数据仅用于程序联调；正式演示前应替换为 A 股多年真实历史日 K，并由回测结果自动填入收益、回撤与 Sharpe。</div></section>
      <section className="panel"><div className="panel-head"><div><span className="eyebrow">STRATEGY</span><h2>我们的策略</h2></div><span className="pill">低频</span></div><dl className="spec"><div><dt>股票范围</dt><dd>{strategy.universe}</dd></div><div><dt>核心信号</dt><dd>{strategy.signal}</dd></div><div><dt>参数</dt><dd>MA{strategy.shortWindow} / MA{strategy.longWindow} · 目标仓位 {strategy.targetWeight * 100}%</dd></div><div><dt>执行规则</dt><dd>{strategy.execution}</dd></div></dl></section>
    </div>
  </>
}

function Universe() {
  return <section className="panel full"><div className="panel-head"><div><span className="eyebrow">RESEARCH UNIVERSE</span><h2>沪深 A 股大盘 / 红利研究池</h2><p>每组至少标注 10 个研究标的；这里先建立 Web 展示入口，后续可由数据模块接入真实行情与筛选结果。</p></div><span className="count">{researchUniverse.length} 个标的</span></div><div className="table-wrap"><table><thead><tr><th>代码</th><th>名称</th><th>行业</th><th>研究标签</th></tr></thead><tbody>{researchUniverse.map(s => <tr key={s.code}><td className="mono">{s.code}</td><td>{s.name}</td><td>{s.sector}</td><td><span className="tag">{s.tag}</span></td></tr>)}</tbody></table></div></section>
}

function Backtest({ onRun }) {
  const [years, setYears] = useState('2021-2025')
  const [short, setShort] = useState(strategy.shortWindow)
  const [long, setLong] = useState(strategy.longWindow)
  return <div className="grid two"><section className="panel"><span className="eyebrow">BACKTEST CONFIG</span><h2>历史回测</h2><p>参数提交后应由后端调用现有 <span className="mono">build_engine()</span>，前端不复制账户、成交或绩效逻辑。</p><div className="form"><label>历史数据区间<select value={years} onChange={e => setYears(e.target.value)}><option>2021-2025</option><option>2020-2025</option><option>2019-2025</option><option>自定义</option></select></label><label>短均线<input type="number" value={short} onChange={e => setShort(Number(e.target.value))} /></label><label>长均线<input type="number" value={long} onChange={e => setLong(Number(e.target.value))} /></label><label>初始资金<input value="¥1,000,000" disabled /></label><button className="primary" onClick={() => onRun(years, short, long)}>运行策略回测</button></div></section><section className="panel"><span className="eyebrow">RESULT CONTRACT</span><h2>回测结果</h2><div className="result-grid"><Metric label="累计收益" value={demoMetrics.totalReturn == null ? '待计算' : `${demoMetrics.totalReturn}%`} /><Metric label="年化收益" value="待计算" /><Metric label="最大回撤" value="待计算" /><Metric label="交易次数" value="待计算" /></div><div className="notice">助教要求的“使用哪几年数据、这几年赚了多少个点”必须来自真实回测结果。当前示例 CSV 不能支撑多年收益结论，因此页面明确显示“待计算”。</div></section></div>
}

function Simulation({ running, setRunning }) {
  return <div className="grid two"><section className="panel"><span className="eyebrow">SIMULATION MODE</span><h2>智能模拟盘</h2><p>模拟盘复用策略、风控、OMS、撮合和账户逻辑；第一版不连接真实券商，不涉及真实资金。</p><div className={`sim-state ${running ? 'on' : ''}`}><span className="dot" />{running ? '策略运行中' : '策略已停止'}<strong>{running ? 'RUNNING' : 'STOPPED'}</strong></div><button className={running ? 'danger' : 'primary'} onClick={() => setRunning(!running)}>{running ? '停止模拟交易' : '启动模拟交易'}</button></section><section className="panel"><span className="eyebrow">ACCOUNT</span><h2>模拟账户</h2><div className="metrics compact"><Metric label="现金" value="¥1,000,000" /><Metric label="持仓市值" value="¥0" /><Metric label="总资产" value="¥1,000,000" /><Metric label="未实现盈亏" value="¥0" /></div><div className="notice">启动后由后端 Simulation Mode 推送最新订单、成交、持仓与账户状态。</div></section></div>
}

function Orders() { return <section className="panel full"><div className="panel-head"><div><span className="eyebrow">OMS / TRADES</span><h2>订单与成交</h2></div><span className="pill">模拟环境</span></div><div className="empty"><strong>暂无成交</strong><span>运行回测或启动模拟盘后，这里将展示 Order → Trade → Account 的完整链路。</span></div></section> }

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [running, setRunning] = useState(false)
  const [toast, setToast] = useState('')
  const title = useMemo(() => nav.find(n => n[0] === page)?.[1] || '总览', [page])
  const run = (years, short, long) => { setToast(`已提交回测：${years} · MA${short}/MA${long}。等待后端真实历史数据计算。`); setTimeout(() => setToast(''), 3500) }
  return <div className="app"><aside><div className="brand"><span className="mark">IQ</span><div><strong>INTELLIGENT</strong><small>INVESTMENT</small></div></div><nav>{nav.map(([id, label]) => <button className={page === id ? 'active' : ''} key={id} onClick={() => setPage(id)}><span>{String(nav.findIndex(n => n[0] === id) + 1).padStart(2, '0')}</span>{label}</button>)}</nav><div className="side-foot">E · WEB & INTEGRATION<br /><span>e-web-v2 · simulation</span></div></aside><main><header><span>{title}</span><div className="branch">● e-web-v2</div></header><div className="content">{page === 'dashboard' && <Dashboard setPage={setPage} />}{page === 'universe' && <Universe />}{page === 'backtest' && <Backtest onRun={run} />}{page === 'simulation' && <Simulation running={running} setRunning={setRunning} />}{page === 'orders' && <Orders />}</div></main>{toast && <div className="toast">{toast}</div>}</div>
}
