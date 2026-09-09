export const researchUniverse = [
  { code: '600519.SH', name: '贵州茅台', sector: '食品饮料', tag: '大盘股 · 红利研究池' },
  { code: '601398.SH', name: '工商银行', sector: '银行', tag: '大盘股 · 红利研究池' },
  { code: '601939.SH', name: '建设银行', sector: '银行', tag: '大盘股 · 红利研究池' },
  { code: '601088.SH', name: '中国神华', sector: '煤炭', tag: '大盘股 · 红利研究池' },
  { code: '600900.SH', name: '长江电力', sector: '电力', tag: '大盘股 · 红利研究池' },
  { code: '600028.SH', name: '中国石化', sector: '石油石化', tag: '大盘股 · 红利研究池' },
  { code: '601857.SH', name: '中国石油', sector: '石油石化', tag: '大盘股 · 红利研究池' },
  { code: '601288.SH', name: '农业银行', sector: '银行', tag: '大盘股 · 红利研究池' },
  { code: '600036.SH', name: '招商银行', sector: '银行', tag: '大盘股 · 红利研究池' },
  { code: '600585.SH', name: '海螺水泥', sector: '建筑材料', tag: '大盘股 · 红利研究池' },
]

// UI demo values are deliberately labeled as sample data. They must be replaced by
// real backtest output before being presented as the group's historical performance.
export const demoMetrics = {
  initialCash: 1000000,
  finalEquity: 1000000,
  totalReturn: null,
  annualizedReturn: null,
  maxDrawdown: null,
  sharpe: null,
  trades: 0,
  dataPeriod: '待接入真实历史数据',
}

export const demoEquity = [
  { date: '回测开始', equity: 1000000 },
  { date: '真实数据接入后', equity: 1000000 },
]

export const strategy = {
  name: '大盘红利低频趋势策略',
  version: 'Web Demo V2',
  frequency: '日线',
  style: '低频 · 纯多头',
  universe: '沪深 A 股大盘股 / 红利研究池',
  signal: '短期均线向上突破长期均线买入，向下跌破卖出',
  shortWindow: 5,
  longWindow: 20,
  targetWeight: 0.2,
  maxSymbolWeight: 0.3,
  execution: '收盘产生信号，下一根日 K 开盘模拟成交',
}
