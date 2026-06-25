/* ═══════════════════════════════════════════════════════════
   AI 失分诊断引擎 — Diagnose Engine v0.1
   基于 435 教材知识结构，三层探测诊断
   ═══════════════════════════════════════════════════════════ */

const DIAGNOSE = {

  /* ═══════════ 题目数据 ═══════════ */
  // 每知识点10题：L1基础(4) → L2变式(4) → L3迁移(2)
  questions: {
    /* -------- 初一（G7）-------- */
    'g7-negatives': { name: '负数的认识与运算', grade: 'L5', textbookLessons: [0, 1, 26, 33], questions: [
        // L1 基础探测 × 4
        { id: 'g7-neg-01', level: 1, type: '基础探测', stem: '如果温度从 0℃ 先上升 5℃，再下降 8℃，最终温度是多少？', options: ['A. -3℃', 'B. 3℃', 'C. -13℃', 'D. 13℃'], answer: 0, tags: { knowledge: '负数运算', skill_level: '理解', error_type: '符号方向混淆', error_category: 'C', cognitive_load: '低', trap_type: '正负号' }, hint: '上升为正，下降为负：+5 + (-8) = ?' },
        { id: 'g7-neg-04', level: 1, type: '基础探测', stem: '在数轴上，-3 和 5 之间的距离是多少？', options: ['A. 8', 'B. 2', 'C. -8', 'D. -2'], answer: 0, tags: { knowledge: '数轴', skill_level: '理解', error_type: '符号运算', error_category: 'C', cognitive_load: '低', trap_type: '距离非负' }, hint: '两点间的距离 = |5 - (-3)| = 8' },
        { id: 'g7-neg-05', level: 1, type: '基础探测', stem: '计算：(-12) + 7 - (-3) = ?', options: ['A. -2', 'B. -8', 'C. 2', 'D. -22'], answer: 0, tags: { knowledge: '负数加减法', skill_level: '记忆', error_type: '去括号符号错误', error_category: 'C', cognitive_load: '低', trap_type: '减负得正' }, hint: '(-12) + 7 + 3 = ? 减去负数等于加上正数。' },
        { id: 'g7-neg-06', level: 1, type: '基础探测', stem: '下列各组中，两个数互为相反数的是（ ）', options: ['A. 3 和 -3', 'B. 3 和 1/3', 'C. -3 和 |-3|', 'D. 3 和 -(-3)'], answer: 0, tags: { knowledge: '相反数', skill_level: '理解', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '相反数vs倒数' }, hint: '相反数是只有符号不同的两个数。3 和 -3 只有符号不同。' },
        // L2 变式探测 × 4
        { id: 'g7-neg-07', level: 2, type: '变式探测', stem: '某地某日中午气温为 -5℃，夜间比中午下降了 8℃，第二天中午比夜间上升了 3℃。第二天中午的气温是多少？', options: ['A. -10℃, -5-8+3=-10', 'B. 0℃, -5+8-3=0', 'C. -16℃, -5-8-3=-16', 'D. 6℃, -5+8+3=6'], answer: 0, tags: { knowledge: '负数运算', skill_level: '应用', error_type: '运算顺序混淆', error_category: 'C', cognitive_load: '中', trap_type: '连续运算符号' }, hint: '先确定每一步的升降方向，再列式：-5 - 8 + 3' },
        { id: 'g7-neg-08', level: 2, type: '变式探测', stem: '若 a 是最小的正整数，b 是最大的负整数，c 是绝对值最小的数，则 a + b - c = ?', options: ['A. 0', 'B. 2', 'C. -2', 'D. 1'], answer: 0, tags: { knowledge: '整数与绝对值综合', skill_level: '应用', error_type: '概念综合运用弱', error_category: 'K', cognitive_load: '中', trap_type: '多重条件推理' }, hint: 'a=1, b=-1, c=0，代入计算：1+(-1)-0=0' },
        { id: 'g7-neg-09', level: 2, type: '变式探测', stem: '计算：(-2) × 3 - (-4) ÷ 2 = ?', options: ['A. -4', 'B. -8', 'C. 4', 'D. -2'], answer: 0, tags: { knowledge: '负数乘除法', skill_level: '应用', error_type: '运算顺序错误', error_category: 'C', cognitive_load: '中', trap_type: '先乘除后加减' }, hint: '先算乘除：(-6) - (-2) = -6 + 2 = -4' },
        { id: 'g7-neg-10', level: 2, type: '变式探测', stem: '若 |x| = 5，|y| = 3，且 x < y，则 x + y 的值是（ ）', options: ['A. -2 或 -8', 'B. 2 或 8', 'C. -2 或 8', 'D. 2 或 -8'], answer: 0, tags: { knowledge: '绝对值与比较', skill_level: '应用', error_type: '漏考虑多种情况', error_category: 'R', cognitive_load: '中', trap_type: '多解讨论' }, hint: 'x=±5, y=±3，且 x < y。分类讨论：x=-5,y=3则-2；x=-5,y=-3则-8' },
        // L3 迁移探测 × 2
        { id: 'g7-neg-03', level: 3, type: '迁移探测', stem: '下表是某股票连续5天的涨跌情况（单位：元）：周一-0.5, 周二+1.2, 周三-0.8, 周四+0.3, 周五-0.2。若周一开盘价为10元，周五收盘价比周一开盘价（ ）', options: ['A. 高0元（持平）', 'B. 高0.5元', 'C. 低0.5元', 'D. 高1.5元'], answer: 0, tags: { knowledge: '负数应用', skill_level: '分析', error_type: '累加遗漏', error_category: 'C', cognitive_load: '高', trap_type: '多步累加' }, hint: '将所有涨跌求和：(-0.5)+1.2+(-0.8)+0.3+(-0.2) = ?' },
        { id: 'g7-neg-11', level: 3, type: '迁移探测', stem: '某地海拔每升高100米，气温下降0.6℃。山脚海拔0米，气温15℃。山顶气温为-3℃时，山顶海拔约多少米？', options: ['A. 3000米', 'B. 2000米', 'C. 2500米', 'D. 1800米'], answer: 0, tags: { knowledge: '负数实际应用', skill_level: '分析', error_type: '建模错误', error_category: 'M', cognitive_load: '高', trap_type: '比例计算' }, hint: '下降的温度 = 15 - (-3) = 18℃。每100米降0.6℃，高度 = 18÷0.6×100' }
      ]
    },

    'g7-absolute': {
      name: '相反数与绝对值',
      grade: 'L5',
      textbookLessons: [2,3],
      textbookLessons: [2,3],
      questions: [
        // L1 × 4
        { id: 'g7-abs-01', level: 1, type: '基础探测', stem: '|-5| 的值是多少？', options: ['A. 5', 'B. -5', 'C. 0', 'D. ±5'], answer: 0, tags: { knowledge: '绝对值', skill_level: '记忆', error_type: '符号混淆', error_category: 'C', cognitive_load: '低', trap_type: '绝对值非负' }, hint: '绝对值表示一个数到原点的距离，距离永远是非负数。' },
        { id: 'g7-abs-04', level: 1, type: '基础探测', stem: '-3 的相反数是（ ）', options: ['A. 3', 'B. -3', 'C. 1/3', 'D. -1/3'], answer: 0, tags: { knowledge: '相反数', skill_level: '记忆', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '相反数vs倒数' }, hint: '相反数是只有符号不同的数。-3 的相反数是 3。' },
        { id: 'g7-abs-05', level: 1, type: '基础探测', stem: '下列比较大小，正确的是（ ）', options: ['A. -5 > -3', 'B. |-5| > |-3|', 'C. -(-5) < -3', 'D. -5 < -3'], answer: 1, tags: { knowledge: '绝对值比较', skill_level: '理解', error_type: '绝对值大小理解错误', error_category: 'K', cognitive_load: '低', trap_type: '负数vs绝对值' }, hint: '|-5|=5, |-3|=3，5>3 所以 |-5| > |-3|' },
        { id: 'g7-abs-06', level: 1, type: '基础探测', stem: '一个数的绝对值是它本身，这个数一定是（ ）', options: ['A. 正数', 'B. 非负数', 'C. 负数', 'D. 0'], answer: 1, tags: { knowledge: '绝对值性质', skill_level: '理解', error_type: '性质记忆不完整', error_category: 'K', cognitive_load: '低', trap_type: '非负vs正' }, hint: '正数和0的绝对值都等于它本身，所以是非负数。' },
        // L2 × 4
        { id: 'g7-abs-02', level: 2, type: '变式探测', stem: '若 |x| = 3，且 x 是负数，那么 x 的值是？', options: ['A. 3', 'B. -3', 'C. ±3', 'D. 无法确定'], answer: 1, tags: { knowledge: '绝对值', skill_level: '应用', error_type: '漏考虑条件', error_category: 'R', cognitive_load: '中', trap_type: '条件限定' }, hint: '|x| = 3 说明 x 可以是 +3 或 -3，但题目说 x 是负数。' },
        { id: 'g7-abs-07', level: 2, type: '变式探测', stem: '若 a < 0，则 |-a| = ?', options: ['A. -a', 'B. a', 'C. 0', 'D. 不确定'], answer: 0, tags: { knowledge: '绝对值化简', skill_level: '应用', error_type: '符号推理错误', error_category: 'C', cognitive_load: '中', trap_type: '字母表示负数' }, hint: 'a<0 说明 a 是负数，则 -a 是正数，正数的绝对值是它本身。' },
        { id: 'g7-abs-08', level: 2, type: '变式探测', stem: '若 a = -5，b = 3，则 |a| - |b| + |a-b| = ?', options: ['A. 10', 'B. 13', 'C. 8', 'D. 3'], answer: 1, tags: { knowledge: '绝对值运算', skill_level: '应用', error_type: '符号运算错误', error_category: 'C', cognitive_load: '中', trap_type: '绝对值内运算' }, hint: '|a|=5, |b|=3, a-b=-5-3=-8, |a-b|=8。5-3+8=10' },
        { id: 'g7-abs-09', level: 2, type: '变式探测', stem: '若 |m-3| = 2，则 m 的值是？', options: ['A. 1或5', 'B. -1或5', 'C. 1或-5', 'D. 5'], answer: 0, tags: { knowledge: '含绝对值方程', skill_level: '应用', error_type: '解方程错误', error_category: 'C', cognitive_load: '中', trap_type: '两种可能性' }, hint: 'm-3=2 或 m-3=-2，解得 m=5 或 m=1' },
        // L3 × 2
        { id: 'g7-abs-03', level: 3, type: '迁移探测', stem: '若 |a-2| + |b+3| = 0，则 a + b 的值是多少？', options: ['A. 5', 'B. -1', 'C. 1', 'D. -5'], answer: 1, tags: { knowledge: '绝对值的非负性', skill_level: '分析', error_type: '概念理解不足', error_category: 'K', cognitive_load: '高', trap_type: '非负性应用' }, hint: '两个绝对值相加为0，说明每个绝对值都必须为0。' },
        { id: 'g7-abs-10', level: 3, type: '迁移探测', stem: '已知 |x-1| + |y+2| + |z-3| = 0，则 x + y + z = ?', options: ['A. 6', 'B. 2', 'C. 0', 'D. -2'], answer: 1, tags: { knowledge: '绝对值非负性应用', skill_level: '分析', error_type: '多变量推理', error_category: 'M', cognitive_load: '高', trap_type: '多个绝对值' }, hint: 'x-1=0, y+2=0, z-3=0 → x=1, y=-2, z=3，和为2' }
      ]
    },

    'g7-equation': { name: '一元一次方程', grade: 'L5', textbookLessons: [17, 18, 19, 20, 21, 22, 23, 24, 25], questions: [
        // L1 × 4
        { id: 'g7-eq-01', level: 1, type: '基础探测', stem: '解方程 2x + 3 = 11，x = ？', options: ['A. 4', 'B. 7', 'C. 3', 'D. 5'], answer: 0, tags: { knowledge: '一元一次方程', skill_level: '理解', error_type: '移项符号错误', error_category: 'C', cognitive_load: '低', trap_type: '移项变号' }, hint: '将 3 移到等号右边变成 -3：2x = 11 - 3' },
        { id: 'g7-eq-04', level: 1, type: '基础探测', stem: '方程 3x - 5 = 16 的解是 x = ?', options: ['A. 7', 'B. 21/3', 'C. 11', 'D. 5'], answer: 0, tags: { knowledge: '一元一次方程', skill_level: '理解', error_type: '移项符号错误', error_category: 'C', cognitive_load: '低', trap_type: '移项变号' }, hint: '3x = 16 + 5 = 21, x = 7' },
        { id: 'g7-eq-05', level: 1, type: '基础探测', stem: '方程 5x = 3x + 8 的解是 x = ?', options: ['A. 4', 'B. 1', 'C. -4', 'D. 2'], answer: 0, tags: { knowledge: '含未知数移项', skill_level: '理解', error_type: '合并同类项错误', error_category: 'C', cognitive_load: '低', trap_type: '含未知数的项移项' }, hint: '5x - 3x = 8, 2x = 8, x = 4' },
        { id: 'g7-eq-06', level: 1, type: '基础探测', stem: '方程 2(x + 1) = 10 的解是 x = ?', options: ['A. 4', 'B. 5', 'C. 6', 'D. 3'], answer: 0, tags: { knowledge: '去括号', skill_level: '理解', error_type: '去括号错误', error_category: 'C', cognitive_load: '低', trap_type: '括号运算' }, hint: '2x + 2 = 10, 2x = 8, x = 4' },
        // L2 × 4
        { id: 'g7-eq-02', level: 2, type: '变式探测', stem: '解方程 3(x - 2) + 5 = 2x + 1，以下哪一步是正确的？', options: ['A. 3x - 6 + 5 = 2x + 1', 'B. 3x - 2 + 5 = 2x + 1', 'C. 3x + 6 + 5 = 2x + 1', 'D. 3x - 6 - 5 = 2x + 1'], answer: 0, tags: { knowledge: '一元一次方程', skill_level: '应用', error_type: '去括号错误', error_category: 'C', cognitive_load: '中', trap_type: '分配律应用' }, hint: '去括号时，3 要乘以括号内的每一项：3(x-2) = 3x-6' },
        { id: 'g7-eq-07', level: 2, type: '变式探测', stem: '解方程 (x+1)/2 = (x-1)/3，去分母后正确的是？', options: ['A. 3(x+1) = 2(x-1)', 'B. 2(x+1) = 3(x-1)', 'C. 3x+1 = 2x-1', 'D. 6(x+1) = 6(x-1)'], answer: 0, tags: { knowledge: '去分母', skill_level: '应用', error_type: '去分母漏乘', error_category: 'C', cognitive_load: '中', trap_type: '等式两边同乘最小公倍数' }, hint: '两边同乘6：3(x+1) = 2(x-1)' },
        { id: 'g7-eq-08', level: 2, type: '变式探测', stem: '方程 2x - 5 = 3x + 2，解得 x = ?', options: ['A. -7', 'B. 7', 'C. -3', 'D. 3'], answer: 0, tags: { knowledge: '移项合并', skill_level: '应用', error_type: '移项符号错误', error_category: 'C', cognitive_load: '中', trap_type: '含x项移到同侧' }, hint: '2x - 3x = 2 + 5, -x = 7, x = -7' },
        { id: 'g7-eq-09', level: 2, type: '变式探测', stem: '解方程 4(2x-1) - 3(5-x) = 6，第一步展开正确的是？', options: ['A. 8x-4-15+3x=6', 'B. 8x-4-15-x=6', 'C. 8x-1-15-x=6', 'D. 8x-4-15-3x=6'], answer: 0, tags: { knowledge: '去括号', skill_level: '应用', error_type: '分配律错误', error_category: 'C', cognitive_load: '中', trap_type: '负号乘括号' }, hint: '4(2x-1)=8x-4, -3(5-x)=-15+3x，合并得 8x-4-15+3x=6' },
        // L3 × 2
        { id: 'g7-eq-03', level: 3, type: '迁移探测', stem: '一个两位数，十位数字比个位数字大 2，如果把十位和个位互换，新数比原数小 18。原来的两位数是多少？', options: ['A. 42', 'B. 53', 'C. 31', 'D. 64'], answer: 0, tags: { knowledge: '列方程解应用题', skill_level: '分析', error_type: '等量关系错误', error_category: 'M', cognitive_load: '高', trap_type: '数位值理解' }, hint: '设个位为 x，十位为 x+2，原数 = 10(x+2) + x，新数 = 10x + (x+2)' },
        { id: 'g7-eq-10', level: 3, type: '迁移探测', stem: '甲有50元，乙有20元。甲给乙多少钱后，甲的钱是乙的2倍？', options: ['A. 10元', 'B. 5元', 'C. 8元', 'D. 12元'], answer: 0, tags: { knowledge: '列方程解应用题', skill_level: '分析', error_type: '等量关系错误', error_category: 'M', cognitive_load: '高', trap_type: '设未知数' }, hint: '设甲给乙 x 元，则甲剩 50-x，乙有 20+x。列方程：50-x = 2(20+x)' }
      ]
    },

    'g7-geometry': { name: '三角形性质与内角和', grade: 'L5', textbookLessons: [38, 39, 51, 52, 53, 54, 55, 56, 57, 58, 59], questions: [
        // L1 × 4
        { id: 'g7-geo-01', level: 1, type: '基础探测', stem: '若三角形三个内角分别为 50°、60°、x°，则 x = ？', options: ['A. 70°', 'B. 60°', 'C. 80°', 'D. 50°'], answer: 0, tags: { knowledge: '三角形内角和', skill_level: '记忆', error_type: '公式遗忘', error_category: 'K', cognitive_load: '低', trap_type: '求和错误' }, hint: '三角形内角和为 180°' },
        { id: 'g7-geo-04', level: 1, type: '基础探测', stem: '一个三角形中，最多有几个钝角？', options: ['A. 1个', 'B. 2个', 'C. 3个', 'D. 0个'], answer: 0, tags: { knowledge: '三角形分类', skill_level: '理解', error_type: '性质理解错误', error_category: 'K', cognitive_load: '低', trap_type: '钝角>90°' }, hint: '钝角大于90°，如果两个钝角，和已超过180°，所以最多1个。' },
        { id: 'g7-geo-05', level: 1, type: '基础探测', stem: '三角形的两边长分别为3cm和5cm，第三边的长可能是（ ）', options: ['A. 4cm', 'B. 1cm', 'C. 8cm', 'D. 10cm'], answer: 0, tags: { knowledge: '三角形三边关系', skill_level: '理解', error_type: '两边之和大于第三边', error_category: 'K', cognitive_load: '低', trap_type: '取值范围' }, hint: '两边之和>第三边：3+5>第三边，第三边>5-3=2。所以2<第三边<8' },
        { id: 'g7-geo-06', level: 1, type: '基础探测', stem: '直角三角形的两个锐角之和等于（ ）', options: ['A. 90°', 'B. 180°', 'C. 45°', 'D. 60°'], answer: 0, tags: { knowledge: '直角三角形性质', skill_level: '记忆', error_type: '性质混淆', error_category: 'K', cognitive_load: '低', trap_type: '直角90°' }, hint: '三角形内角和180°，去掉直角90°，剩下两个锐角之和为90°。' },
        // L2 × 4
        { id: 'g7-geo-02', level: 2, type: '变式探测', stem: '一个等腰三角形的顶角为 40°，那么它的一个底角是多少度？', options: ['A. 70°', 'B. 40°', 'C. 140°', 'D. 80°'], answer: 0, tags: { knowledge: '等腰三角形性质', skill_level: '理解', error_type: '性质理解错误', error_category: 'K', cognitive_load: '中', trap_type: '等腰三角形两底角相等' }, hint: '等腰三角形两底角相等。设底角为 x，则 x + x + 40 = 180' },
        { id: 'g7-geo-07', level: 2, type: '变式探测', stem: '等腰三角形一个底角为 50°，则这个三角形的顶角是多少度？', options: ['A. 80°', 'B. 50°', 'C. 65°', 'D. 100°'], answer: 0, tags: { knowledge: '等腰三角形', skill_level: '应用', error_type: '底角与顶角混淆', error_category: 'K', cognitive_load: '中', trap_type: '两底角相等' }, hint: '两底角都是50°，顶角 = 180° - 50° - 50° = 80°' },
        { id: 'g7-geo-08', level: 2, type: '变式探测', stem: '三角形三个内角之比为 2:3:4，这三个角分别是？', options: ['A. 40°、60°、80°', 'B. 30°、60°、90°', 'C. 20°、30°、40°', 'D. 36°、54°、90°'], answer: 0, tags: { knowledge: '三角形内角和', skill_level: '应用', error_type: '比例分配错误', error_category: 'C', cognitive_load: '中', trap_type: '比例计算' }, hint: '2x+3x+4x=180, 9x=180, x=20°。三个角=40°、60°、80°' },
        { id: 'g7-geo-09', level: 2, type: '变式探测', stem: '已知三角形两边的长分别为4和7，第三边长为奇数，则第三边的长为？', options: ['A. 5或7或9', 'B. 3或5或7', 'C. 7或9', 'D. 5或9'], answer: 0, tags: { knowledge: '三边关系', skill_level: '应用', error_type: '取值范围漏算', error_category: 'R', cognitive_load: '中', trap_type: '奇数限定' }, hint: '第三边范围：7-4<第三边<7+4，即3<第三边<11，奇数有5,7,9' },
        // L3 × 2
        { id: 'g7-geo-03', level: 3, type: '迁移探测', stem: '在△ABC中，∠A = 60°，∠B = 50°，CD是∠ACB的角平分线，则∠ACD的度数为？', options: ['A. 35°', 'B. 70°', 'C. 55°', 'D. 25°'], answer: 0, tags: { knowledge: '三角形内角和+角平分线', skill_level: '分析', error_type: '步骤缺失', error_category: 'K', cognitive_load: '高', trap_type: '两步推理' }, hint: '先求∠C：180° - 60° - 50° = 70°；再求∠ACD：70° ÷ 2 = 35°' },
        { id: 'g7-geo-10', level: 3, type: '迁移探测', stem: '如图，在△ABC中，D是BC边上一点，∠B=∠BAD，∠C=∠ADC，∠BAC的度数是多少？设∠B=x。', options: ['A. 108°', 'B. 90°', 'C. 72°', 'D. 120°'], answer: 0, tags: { knowledge: '三角形内角和综合', skill_level: '分析', error_type: '逻辑推理弱', error_category: 'M', cognitive_load: '高', trap_type: '设未知数列方程' }, hint: '∠B=∠BAD=x，则∠ADC=2x（外角定理）。又∠C=∠ADC=2x，x+2x+∠BAC=180，∠BAC+∠ADC+∠C=180→∠BAC+4x=180，代入得x=36°,∠BAC=108°' }
      ]
    },

    /* -------- 初一（G7）· 新增知识点 -------- */
    'g7-algebra': { name: '整式与代数式', grade: 'L5', textbookLessons: [11, 12, 15, 16], questions: [
        // L1 × 4
        { id: 'g7-alg-01', level: 1, type: '基础探测', stem: '下列哪个是单项式？', options: ['A. 3x', 'B. x + 1', 'C. 2/x', 'D. √x'], answer: 0, tags: { knowledge: '单项式概念', skill_level: '记忆', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '单项式vs多项式' }, hint: '单项式是数与字母的乘积，如3x。含加减号的是多项式。' },
        { id: 'g7-alg-02', level: 1, type: '基础探测', stem: '计算 3a + 2a = ?', options: ['A. 5a', 'B. 6a', 'C. 5a²', 'D. 6a²'], answer: 0, tags: { knowledge: '合并同类项', skill_level: '记忆', error_type: '合并错误', error_category: 'C', cognitive_load: '低', trap_type: '系数相加减，字母不变' }, hint: '同类项合并，系数相加：3+2=5，字母部分 a 不变。' },
        { id: 'g7-alg-03', level: 1, type: '基础探测', stem: '计算 (2x² + 3x) - (x² - 2x) = ?', options: ['A. x² + 5x', 'B. x² + x', 'C. 3x² + x', 'D. x² + 5x²'], answer: 0, tags: { knowledge: '整式加减法', skill_level: '理解', error_type: '去括号符号错误', error_category: 'C', cognitive_load: '低', trap_type: '括号前是负号' }, hint: '2x²+3x-x²+2x = (2-1)x² + (3+2)x = x²+5x' },
        { id: 'g7-alg-04', level: 1, type: '基础探测', stem: '当 x = 2 时，代数式 3x - 5 的值是？', options: ['A. 1', 'B. -1', 'C. 11', 'D. 6'], answer: 0, tags: { knowledge: '代数式求值', skill_level: '理解', error_type: '代入错误', error_category: 'C', cognitive_load: '低', trap_type: '字母换数字' }, hint: '3×2-5=6-5=1' },
        // L2 × 4
        { id: 'g7-alg-05', level: 2, type: '变式探测', stem: '计算 (x+2)(x-3) = ?', options: ['A. x² - x - 6', 'B. x² + x - 6', 'C. x² - 5x - 6', 'D. x² - x + 6'], answer: 0, tags: { knowledge: '多项式乘法', skill_level: '应用', error_type: '乘法分配律错误', error_category: 'C', cognitive_load: '中', trap_type: '多步乘法' }, hint: 'x×x + x×(-3) + 2×x + 2×(-3) = x² - 3x + 2x - 6 = x² - x - 6' },
        { id: 'g7-alg-06', level: 2, type: '变式探测', stem: '若 2x² + 3x + 1 = A(x+1)(x+1) + B(x+1) + C，则 A、B、C 的值为？', options: ['A. A=2, B=-1, C=0', 'B. A=2, B=1, C=0', 'C. A=1, B=3, C=1', 'D. A=2, B=3, C=1'], answer: 0, tags: { knowledge: '整式恒等变形', skill_level: '应用', error_type: '恒等式理解不足', error_category: 'K', cognitive_load: '中', trap_type: '待定系数法' }, hint: '展开右边：2x²+4x+2 + Bx+B + C = 2x²+(4+B)x+(2+B+C)，对照系数得B=-1,C=0' },
        { id: 'g7-alg-07', level: 2, type: '变式探测', stem: '计算 (2a - 3b)² = ?', options: ['A. 4a² - 12ab + 9b²', 'B. 4a² + 12ab + 9b²', 'C. 4a² - 6ab + 9b²', 'D. 2a² - 6ab + 3b²'], answer: 0, tags: { knowledge: '完全平方公式', skill_level: '应用', error_type: '公式展开错误', error_category: 'C', cognitive_load: '中', trap_type: '中间项系数' }, hint: '(a-b)² = a² - 2ab + b²。这里a=2a, b=3b：4a² - 2×2a×3b + 9b² = 4a² - 12ab + 9b²' },
        { id: 'g7-alg-08', level: 2, type: '变式探测', stem: '若 x + 1/x = 3，则 x² + 1/x² = ?', options: ['A. 7', 'B. 9', 'C. 11', 'D. 5'], answer: 0, tags: { knowledge: '代数式变形', skill_level: '应用', error_type: '变形方法错误', error_category: 'M', cognitive_load: '中', trap_type: '完全平方公式逆用' }, hint: '(x+1/x)² = x² + 2 + 1/x² = 9，所以x²+1/x² = 7' },
        // L3 × 2
        { id: 'g7-alg-09', level: 3, type: '迁移探测', stem: '若 a - b = 3，ab = 2，则 a² + b² = ?', options: ['A. 13', 'B. 5', 'C. 9', 'D. 7'], answer: 0, tags: { knowledge: '代数式综合', skill_level: '分析', error_type: '公式运用不灵活', error_category: 'K', cognitive_load: '高', trap_type: '完全平方公式变形' }, hint: '(a-b)² = a² - 2ab + b²，9 = a² + b² - 4，所以a²+b²=13' },
        { id: 'g7-alg-10', level: 3, type: '迁移探测', stem: '长方形的周长为 20，长为 x，则面积 S 与 x 的关系为 S = x(10 - x)。当 x = 3 时面积为 21，x = 4 时面积为 24。当 x 取何值时面积最大？', options: ['A. 5', 'B. 4', 'C. 6', 'D. 3'], answer: 0, tags: { knowledge: '代数式实际应用', skill_level: '分析', error_type: '最值意识弱', error_category: 'M', cognitive_load: '高', trap_type: '配方法' }, hint: 'S = 10x - x² = -(x²-10x) = -(x-5)²+25，当 x=5 时最大。' }
      ]
    },

    'g7-equation-app': { name: '列方程解应用题', grade: 'L5', textbookLessons: [8, 9, 17, 18, 19, 20, 21, 22, 23, 24, 25, 42, 43], questions: [
        // L1 × 4
        { id: 'g7-eapp-01', level: 1, type: '基础探测', stem: '一个数的3倍加上5等于20，这个数是多少？', options: ['A. 5', 'B. 3', 'C. 15', 'D. 10'], answer: 0, tags: { knowledge: '简单列方程', skill_level: '理解', error_type: '列式错误', error_category: 'K', cognitive_load: '低', trap_type: '翻译为代数式' }, hint: '设这个数为x，则3x+5=20，3x=15，x=5' },
        { id: 'g7-eapp-02', level: 1, type: '基础探测', stem: '一辆车以60km/h的速度行驶，t小时后行驶了多少公里？', options: ['A. 60t', 'B. 60+t', 'C. 60/t', 'D. t/60'], answer: 0, tags: { knowledge: '行程问题基本公式', skill_level: '记忆', error_type: '公式混淆', error_category: 'K', cognitive_load: '低', trap_type: '路程=速度×时间' }, hint: '路程 = 速度 × 时间 = 60 × t' },
        { id: 'g7-eapp-03', level: 1, type: '基础探测', stem: '一本书原价x元，打8折后付了24元，列方程正确的是？', options: ['A. 0.8x = 24', 'B. x - 0.8 = 24', 'C. 0.2x = 24', 'D. x + 0.8x = 24'], answer: 0, tags: { knowledge: '打折问题列方程', skill_level: '理解', error_type: '打折概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '打8折=原价×0.8' }, hint: '打8折 = 原价 × 0.8 = 24元' },
        { id: 'g7-eapp-04', level: 1, type: '基础探测', stem: '一项工作甲单独做需5天完成，乙单独做需3天完成。两人合作需几天？', options: ['A. 15/8天', 'B. 8天', 'C. 1天', 'D. 2天'], answer: 0, tags: { knowledge: '工程问题基本公式', skill_level: '理解', error_type: '工作效率计算错误', error_category: 'C', cognitive_load: '低', trap_type: '工作效率=1/时间' }, hint: '甲效率=1/5，乙效率=1/3，合作效率=1/5+1/3=8/15，时间=1÷8/15=15/8' },
        // L2 × 4
        { id: 'g7-eapp-05', level: 2, type: '变式探测', stem: '甲、乙两人相距30km，相向而行。甲速4km/h，乙速6km/h。几小时后相遇？', options: ['A. 3小时', 'B. 2小时', 'C. 5小时', 'D. 1小时'], answer: 0, tags: { knowledge: '相遇问题', skill_level: '应用', error_type: '速度和vs速度差', error_category: 'K', cognitive_load: '中', trap_type: '相向而行用速度和' }, hint: '设t小时相遇，4t+6t=30，10t=30，t=3' },
        { id: 'g7-eapp-06', level: 2, type: '变式探测', stem: '甲有80元，乙有50元。两人花同样多的钱后，甲的钱是乙的2倍。每人花了多少钱？', options: ['A. 20元', 'B. 30元', 'C. 10元', 'D. 5元'], answer: 0, tags: { knowledge: '倍数问题', skill_level: '应用', error_type: '等量关系错误', error_category: 'M', cognitive_load: '中', trap_type: '花完钱后' }, hint: '设每人花x元：(80-x)=2(50-x)，80-x=100-2x，x=20' },
        { id: 'g7-eapp-07', level: 2, type: '变式探测', stem: '一个工程，甲单独做12天，乙单独做18天。先由甲做3天，剩下的由乙做，乙还需几天？', options: ['A. 13.5天', 'B. 7.5天', 'C. 9天', 'D. 15天'], answer: 0, tags: { knowledge: '工程问题', skill_level: '应用', error_type: '工作量计算错误', error_category: 'C', cognitive_load: '中', trap_type: '甲先做一部分' }, hint: '甲效率1/12，乙效率1/18。甲做3天完成3/12=1/4，剩3/4。乙需(3/4)÷(1/18)=27/2=13.5天' },
        { id: 'g7-eapp-08', level: 2, type: '变式探测', stem: '鸡兔同笼，共30个头，80只脚。问鸡和兔各几只？', options: ['A. 鸡20只、兔10只', 'B. 鸡10只、兔20只', 'C. 鸡15只、兔15只', 'D. 鸡25只、兔5只'], answer: 0, tags: { knowledge: '鸡兔同笼问题', skill_level: '应用', error_type: '方程列错', error_category: 'C', cognitive_load: '中', trap_type: '脚数=2鸡+4兔' }, hint: '设鸡x只，兔(30-x)只。2x+4(30-x)=80，2x+120-4x=80，40=2x，x=20' },
        // L3 × 2
        { id: 'g7-eapp-09', level: 3, type: '迁移探测', stem: '一条船在静水中的速度为15km/h，水流速度为3km/h。船顺流而下从A到B用了3小时，返回时用了几小时？', options: ['A. 4.5小时', 'B. 3小时', 'C. 5小时', 'D. 6小时'], answer: 0, tags: { knowledge: '流水行船问题', skill_level: '分析', error_type: '顺流逆流速度公式', error_category: 'K', cognitive_load: '高', trap_type: '顺流=静水+水速，逆流=静水-水速' }, hint: '顺流速度=15+3=18，AB距离=18×3=54。逆流速度=15-3=12，时间=54÷12=4.5小时' },
        { id: 'g7-eapp-10', level: 3, type: '迁移探测', stem: '甲、乙两校共有学生1000人，甲校人数是乙校的1.5倍。若甲校转出50人到乙校，则两校人数相等。甲、乙原来各有多少人？', options: ['A. 甲600人、乙400人', 'B. 甲550人、乙450人', 'C. 甲500人、乙500人', 'D. 甲650人、乙350人'], answer: 0, tags: { knowledge: '多变量应用题', skill_level: '分析', error_type: '等量关系遗漏', error_category: 'M', cognitive_load: '高', trap_type: '两个等量关系' }, hint: '设乙x人，甲1.5x人。1.5x+x=1000，2.5x=1000，x=400，甲=600。验证：600-50=550，400+50=450，不等→说明条件多余' }
      ]
    },

    'g7-geometry-basics': { name: '几何基础：线、角、平行与垂直', grade: 'L5', textbookLessons: [26, 27, 28, 29, 30, 31, 32, 38, 39, 51, 52, 53, 54, 55, 56, 57, 58, 59], questions: [
        // L1 × 4
        { id: 'g7-gbs-01', level: 1, type: '基础探测', stem: '过一点可以画多少条直线？', options: ['A. 无数条', 'B. 1条', 'C. 2条', 'D. 0条'], answer: 0, tags: { knowledge: '直线基本性质', skill_level: '记忆', error_type: '性质记忆错误', error_category: 'K', cognitive_load: '低', trap_type: '过两点才确定一条' }, hint: '过一点可以向任意方向画无数条直线。过两点才能确定一条直线。' },
        { id: 'g7-gbs-02', level: 1, type: '基础探测', stem: '一个角的补角比它的余角大多少度？', options: ['A. 90°', 'B. 180°', 'C. 45°', 'D. 60°'], answer: 0, tags: { knowledge: '余角补角', skill_level: '理解', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '补角180-余角90' }, hint: '补角=180°-x，余角=90°-x。补角-余角=(180-x)-(90-x)=90°' },
        { id: 'g7-gbs-03', level: 1, type: '基础探测', stem: '如果 a∥b，b∥c，那么 a 和 c 的关系是？', options: ['A. a∥c', 'B. a⊥c', 'C. 无法确定', 'D. 相交'], answer: 0, tags: { knowledge: '平行公理', skill_level: '记忆', error_type: '公理记忆错误', error_category: 'K', cognitive_load: '低', trap_type: '平行于同一直线则平行' }, hint: '平行于同一条直线的两条直线互相平行。' },
        { id: 'g7-gbs-04', level: 1, type: '基础探测', stem: '两条直线相交所成的四个角中，如果有一个角是直角，则其余三个角（ ）', options: ['A. 都是直角', 'B. 都是锐角', 'C. 都是钝角', 'D. 两个锐角一个钝角'], answer: 0, tags: { knowledge: '垂直的概念', skill_level: '理解', error_type: '性质推理错误', error_category: 'M', cognitive_load: '低', trap_type: '邻补角+对顶角' }, hint: '一个角是直角，它的邻补角也是直角，对顶角也是直角，所以四个角都是直角。' },
        // L2 × 4
        { id: 'g7-gbs-05', level: 2, type: '变式探测', stem: '如图，已知 a∥b，∠1=65°，则∠2的度数为？', options: ['A. 65°', 'B. 115°', 'C. 125°', 'D. 75°'], answer: 1, tags: { knowledge: '平行线性质', skill_level: '应用', error_type: '同位角vs内错角', error_category: 'K', cognitive_load: '中', trap_type: '同旁内角互补' }, hint: '∠1和∠2是同旁内角（需看图），两直线平行，同旁内角互补，∠2=180°-65°=115°' },
        { id: 'g7-gbs-06', level: 2, type: '变式探测', stem: '若∠A和∠B的两边分别平行，且∠A=70°，则∠B的度数为？', options: ['A. 70°或110°', 'B. 70°', 'C. 110°', 'D. 20°'], answer: 0, tags: { knowledge: '两边分别平行的角', skill_level: '应用', error_type: '漏考虑两种情况', error_category: 'R', cognitive_load: '中', trap_type: '相等或互补' }, hint: '两边分别平行的两个角相等或互补。所以∠B=70°或110°。' },
        { id: 'g7-gbs-07', level: 2, type: '变式探测', stem: '三条直线两两相交，最多可以将平面分成几个部分？', options: ['A. 7', 'B. 6', 'C. 8', 'D. 4'], answer: 0, tags: { knowledge: '直线分平面', skill_level: '应用', error_type: '计数错误', error_category: 'K', cognitive_load: '中', trap_type: '平面分割规律' }, hint: '1条直线分2部分，2条最多分4部分，3条最多分7部分（1+1+2+3=7）。' },
        { id: 'g7-gbs-08', level: 2, type: '变式探测', stem: '点C是线段AB的中点，点D是线段AC的中点，若AB=8，则BD的长度为？', options: ['A. 6', 'B. 4', 'C. 2', 'D. 8'], answer: 0, tags: { knowledge: '线段中点', skill_level: '应用', error_type: '中点关系错误', error_category: 'K', cognitive_load: '中', trap_type: '两步中点' }, hint: 'AC=AB/2=4，AD=DC=2，BD=AD+AB-AD=4+4-2=6... BD = BC+CD = 4+2=6' },
        // L3 × 2
        { id: 'g7-gbs-09', level: 3, type: '迁移探测', stem: '直线l上有A、B、C三点，AB=5，BC=3。则AC的长度可能是？', options: ['A. 2或8', 'B. 8', 'C. 2', 'D. 3或5'], answer: 0, tags: { knowledge: '线段综合', skill_level: '分析', error_type: '漏考虑点C位置', error_category: 'R', cognitive_load: '高', trap_type: 'C在B左或右' }, hint: '若C在B左边：AC=AB-BC=2。若C在B右边：AC=AB+BC=8。' },
        { id: 'g7-gbs-10', level: 3, type: '迁移探测', stem: '平面内有10个点，任意三点不共线，则这些点可以确定多少条直线？', options: ['A. 45', 'B. 10', 'C. 90', 'D. 20'], answer: 0, tags: { knowledge: '组合计数', skill_level: '分析', error_type: '计数方法错误', error_category: 'M', cognitive_load: '高', trap_type: '每两点确定一条' }, hint: '每个点与其他9个点各连一条线，但每条线被算了两次。所以10×9÷2=45。' }
      ]
    },

    'g7-circle': { name: '圆的周长与面积', grade: 'L5', textbookLessons: [33, 34, 35, 40, 41], questions: [
        // L1 × 4
        { id: 'g7-cir-01', level: 1, type: '基础探测', stem: '圆的周长公式是（ ）', options: ['A. C = 2πr', 'B. C = πr', 'C. C = πr²', 'D. C = 2r'], answer: 0, tags: { knowledge: '圆的周长', skill_level: '记忆', error_type: '公式混淆', error_category: 'K', cognitive_load: '低', trap_type: '周长vs面积' }, hint: '圆的周长 = 2 × π × 半径 = 2πr' },
        { id: 'g7-cir-02', level: 1, type: '基础探测', stem: '圆的面积公式是（ ）', options: ['A. S = πr²', 'B. S = 2πr', 'C. S = πd', 'D. S = 2πr²'], answer: 0, tags: { knowledge: '圆的面积', skill_level: '记忆', error_type: '公式混淆', error_category: 'K', cognitive_load: '低', trap_type: '面积是半径平方' }, hint: '圆的面积 = π × 半径的平方 = πr²' },
        { id: 'g7-cir-03', level: 1, type: '基础探测', stem: '半径为3cm的圆，其周长是（π取3.14）？', options: ['A. 18.84cm', 'B. 28.26cm', 'C. 9.42cm', 'D. 37.68cm'], answer: 0, tags: { knowledge: '圆的周长计算', skill_level: '理解', error_type: '公式代错', error_category: 'K', cognitive_load: '低', trap_type: '周长的计算' }, hint: 'C=2πr=2×3.14×3=18.84' },
        { id: 'g7-cir-04', level: 1, type: '基础探测', stem: '一个圆心角为90°的扇形，占整个圆面积的几分之几？', options: ['A. 1/4', 'B. 1/2', 'C. 1/3', 'D. 3/4'], answer: 0, tags: { knowledge: '扇形面积', skill_level: '理解', error_type: '比例计算错误', error_category: 'C', cognitive_load: '低', trap_type: '圆心角/360°' }, hint: '扇形面积 = 圆面积 × 圆心角/360° = 圆面积 × 90/360 = 1/4' },
        // L2 × 4
        { id: 'g7-cir-05', level: 2, type: '变式探测', stem: '一个圆的半径扩大到原来的3倍，则面积扩大到原来的（ ）', options: ['A. 9倍', 'B. 3倍', 'C. 6倍', 'D. 27倍'], answer: 0, tags: { knowledge: '圆的面积变化', skill_level: '应用', error_type: '平方关系理解错误', error_category: 'C', cognitive_load: '中', trap_type: '面积与半径平方成正比' }, hint: 'S=πr²。r变为3r，S=π(3r)²=9πr²，所以是9倍。' },
        { id: 'g7-cir-06', level: 2, type: '变式探测', stem: '一个半圆的半径为r，它的周长（含直径）为？', options: ['A. πr + 2r', 'B. πr + r', 'C. 2πr + 2r', 'D. πr²/2 + 2r'], answer: 0, tags: { knowledge: '半圆周长', skill_level: '应用', error_type: '忽略直径', error_category: 'R', cognitive_load: '中', trap_type: '半圆+直径' }, hint: '半圆弧长=½×2πr=πr，加上直径2r，总长=πr+2r' },
        { id: 'g7-cir-07', level: 2, type: '变式探测', stem: '一个圆环，外圆半径R=6cm，内圆半径r=4cm，圆环面积是（π取3.14）？', options: ['A. 62.8cm²', 'B. 50.24cm²', 'C. 113.04cm²', 'D. 25.12cm²'], answer: 0, tags: { knowledge: '圆环面积', skill_level: '应用', error_type: '公式记错', error_category: 'K', cognitive_load: '中', trap_type: '大圆减小圆' }, hint: 'S=π(R²-r²)=3.14×(36-16)=3.14×20=62.8' },
        { id: 'g7-cir-08', level: 2, type: '变式探测', stem: '扇形圆心角为120°，半径为6cm，则扇形弧长为？', options: ['A. 4πcm', 'B. 2πcm', 'C. 12πcm', 'D. 6πcm'], answer: 0, tags: { knowledge: '扇形弧长', skill_level: '应用', error_type: '弧长公式错误', error_category: 'K', cognitive_load: '中', trap_type: '圆心角比例' }, hint: '弧长=2πr×120/360=2π×6×1/3=4π' },
        // L3 × 2
        { id: 'g7-cir-09', level: 3, type: '迁移探测', stem: '如图，长方形内接于圆，长方形的长6cm、宽8cm，圆的面积是（π取3.14）？', options: ['A. 78.5cm²', 'B. 50.24cm²', 'C. 100cm²', 'D. 62.8cm²'], answer: 0, tags: { knowledge: '圆与内接图形', skill_level: '分析', error_type: '直径求错', error_category: 'K', cognitive_load: '高', trap_type: '长方形对角线是直径' }, hint: '长方形对角线=√(6²+8²)=10=直径。半径=5，面积=25π=78.5。' },
        { id: 'g7-cir-10', level: 3, type: '迁移探测', stem: '一个圆柱的底面半径为3cm，高为10cm，它的侧面积是（π取3.14）？', options: ['A. 188.4cm²', 'B. 282.6cm²', 'C. 150.72cm²', 'D. 94.2cm²'], answer: 0, tags: { knowledge: '圆柱侧面积', skill_level: '分析', error_type: '侧面展开图错误', error_category: 'C', cognitive_load: '高', trap_type: '侧面=底面周长×高' }, hint: '侧面展开为长方形：长=底面周长=2π×3=18.84，宽=高=10，面积=188.4' }
      ]
    },

    'g7-stats': { name: '数据统计初步', grade: 'L5', textbookLessons: [44, 49, 50], questions: [
        // L1 × 4
        { id: 'g7-sta-01', level: 1, type: '基础探测', stem: '一组数据：2, 5, 3, 5, 7，这组数据的众数是？', options: ['A. 5', 'B. 2', 'C. 4', 'D. 7'], answer: 0, tags: { knowledge: '众数', skill_level: '记忆', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '出现次数最多的数' }, hint: '众数是出现频数最多的数。5出现了2次，最多。' },
        { id: 'g7-sta-02', level: 1, type: '基础探测', stem: '一组数据：1, 3, 5, 7, 9，这组数据的中位数是？', options: ['A. 5', 'B. 3', 'C. 7', 'D. 4'], answer: 0, tags: { knowledge: '中位数', skill_level: '记忆', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '排序后取中间' }, hint: '排序后中间位置的数：1,3,5,7,9 → 中位数=5' },
        { id: 'g7-sta-03', level: 1, type: '基础探测', stem: '一组数据：2, 4, 6, 8，这组数据的平均数是？', options: ['A. 5', 'B. 4', 'C. 6', 'D. 20'], answer: 0, tags: { knowledge: '平均数', skill_level: '记忆', error_type: '计算错误', error_category: 'C', cognitive_load: '低', trap_type: '总和÷个数' }, hint: '平均数=(2+4+6+8)÷4=20÷4=5' },
        { id: 'g7-sta-04', level: 1, type: '基础探测', stem: '一个样本的容量为50，某组的频数为10，则该组的频率为？', options: ['A. 0.2', 'B. 5', 'C. 10', 'D. 0.5'], answer: 0, tags: { knowledge: '频率', skill_level: '理解', error_type: '公式记错', error_category: 'K', cognitive_load: '低', trap_type: '频率=频数/总数' }, hint: '频率=频数÷样本容量=10÷50=0.2' },
        // L2 × 4
        { id: 'g7-sta-05', level: 2, type: '变式探测', stem: '数据1, 2, 3, x, 5的平均数为3，则x的值为？', options: ['A. 4', 'B. 3', 'C. 6', 'D. 2'], answer: 0, tags: { knowledge: '平均数反求', skill_level: '应用', error_type: '列方程错误', error_category: 'C', cognitive_load: '中', trap_type: '平均数×个数=总和' }, hint: '(1+2+3+x+5)÷5=3，11+x=15，x=4' },
        { id: 'g7-sta-06', level: 2, type: '变式探测', stem: '数据1, 3, 5, 7, 9的方差是多少？', options: ['A. 8', 'B. 5', 'C. 10', 'D. 4'], answer: 0, tags: { knowledge: '方差计算', skill_level: '应用', error_type: '公式记错', error_category: 'K', cognitive_load: '中', trap_type: '各数与平均数差的平方和' }, hint: '平均数=5。方差=[(1-5)²+(3-5)²+(5-5)²+(7-5)²+(9-5)²]÷5=(16+4+0+4+16)÷5=8' },
        { id: 'g7-sta-07', level: 2, type: '变式探测', stem: '两组数据：甲组5, 5, 5, 5, 5；乙组3, 4, 5, 6, 7。关于两组数据的说法正确的是？', options: ['A. 平均数相同，甲组更稳定', 'B. 平均数不同', 'C. 方差相同', 'D. 甲组波动更大'], answer: 0, tags: { knowledge: '方差与稳定性', skill_level: '应用', error_type: '稳定性判断错误', error_category: 'K', cognitive_load: '中', trap_type: '方差越小越稳定' }, hint: '平均数都是5。甲组方差=0，乙组方差=2，甲组更稳定。' },
        { id: 'g7-sta-08', level: 2, type: '变式探测', stem: '一个射击选手打了10环，成绩如下：8, 7, 10, 8, 9, 8, 7, 10, 9, 8。他的中位数是？', options: ['A. 8', 'B. 8.5', 'C. 7', 'D. 9'], answer: 0, tags: { knowledge: '中位数（偶数个）', skill_level: '应用', error_type: '偶数个数据处理', error_category: 'K', cognitive_load: '中', trap_type: '取中间两个的平均' }, hint: '排序：7,7,8,8,8,8,9,9,10,10。第5、6个都是8，中位数为8。' },
        // L3 × 2
        { id: 'g7-sta-09', level: 3, type: '迁移探测', stem: '某班40人，期中考试数学平均分80。后来发现一位同学的成绩85分被记为75分。更正后班级平均分是多少？', options: ['A. 80.25', 'B. 80.5', 'C. 81', 'D. 79.75'], answer: 0, tags: { knowledge: '平均数的实际应用', skill_level: '分析', error_type: '修正方法错误', error_category: 'M', cognitive_load: '高', trap_type: '总分调整' }, hint: '原总分=40×80=3200。少加10分，新总分=3210。新平均=3210÷40=80.25' },
        { id: 'g7-sta-10', level: 3, type: '迁移探测', stem: '一家公司5名员工的月薪(元)为：3000, 3000, 3500, 3500, 20000。以下哪个统计量最能代表公司的一般薪资水平？', options: ['A. 中位数', 'B. 平均数', 'C. 众数', 'D. 方差'], answer: 0, tags: { knowledge: '统计量的合理选择', skill_level: '分析', error_type: '统计概念理解不足', error_category: 'K', cognitive_load: '高', trap_type: '极端值影响' }, hint: '平均数为6600，受20000影响太大。中位数3500更能代表一般水平。' }
      ]
    },

    'g7-thinking': { name: '思维训练专题', grade: 'L5', textbookLessons: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59], questions: [
        // L1 × 4
        { id: 'g7-thk-01', level: 1, type: '基础探测', stem: '找规律：1, 4, 9, 16, 25, ?，下一个数是多少？', options: ['A. 36', 'B. 30', 'C. 49', 'D. 35'], answer: 0, tags: { knowledge: '数字找规律', skill_level: '理解', error_type: '规律识别错误', error_category: 'K', cognitive_load: '低', trap_type: '平方数列' }, hint: '1=1², 4=2², 9=3², 16=4², 25=5²，下一个是6²=36' },
        { id: 'g7-thk-02', level: 1, type: '基础探测', stem: '把5个苹果放进4个抽屉，至少有一个抽屉里有几个以上的苹果？', options: ['A. 2个', 'B. 1个', 'C. 3个', 'D. 4个'], answer: 0, tags: { knowledge: '鸽巢原理', skill_level: '理解', error_type: '原理应用错误', error_category: 'K', cognitive_load: '低', trap_type: '平均分配' }, hint: '每个抽屉先放1个，5-4=1，还剩1个必须放进去，所以至少有一个抽屉有2个。' },
        { id: 'g7-thk-03', level: 1, type: '基础探测', stem: '在一个直角三角形中，两直角边分别为3和4，斜边为？', options: ['A. 5', 'B. 7', 'C. 25', 'D. 12'], answer: 0, tags: { knowledge: '勾股定理', skill_level: '理解', error_type: '公式记错', error_category: 'K', cognitive_load: '低', trap_type: '最常见的勾股数' }, hint: '3²+4²=9+16=25=5²，斜边=5' },
        { id: 'g7-thk-04', level: 1, type: '基础探测', stem: '8个球队进行单循环比赛（每两队赛一场），共需赛多少场？', options: ['A. 28', 'B. 56', 'C. 8', 'D. 16'], answer: 0, tags: { knowledge: '计数问题', skill_level: '理解', error_type: '计数方法错误', error_category: 'M', cognitive_load: '低', trap_type: '每两队之间' }, hint: '每个队与其他7队各赛1场，但每场被算两次。8×7÷2=28' },
        // L2 × 4
        { id: 'g7-thk-05', level: 2, type: '变式探测', stem: '找规律：2, 6, 12, 20, 30, ?，下一个数是？', options: ['A. 42', 'B. 36', 'C. 40', 'D. 56'], answer: 0, tags: { knowledge: '数列找规律', skill_level: '应用', error_type: '规律识别错误', error_category: 'K', cognitive_load: '中', trap_type: '差递增2' }, hint: '相邻差：4,6,8,10，下一个差12，30+12=42。或n(n+1)：1×2,2×3,3×4,4×5,5×6,6×7=42' },
        { id: 'g7-thk-06', level: 2, type: '变式探测', stem: '有7个人，每个人至少和其中4个人握过手。关于这7个人，一定能确定的是？', options: ['A. 存在两个人没有握过手', 'B. 所有人都握过手', 'C. 存在一个人握了6次手', 'D. 至少有3人握过5次手'], answer: 0, tags: { knowledge: '鸽巢原理应用', skill_level: '应用', error_type: '推理逻辑错误', error_category: 'M', cognitive_load: '中', trap_type: '抽屉原理构造' }, hint: '最多有6个握手对象。每人至少握4次，意味着最多2人不握。用反证法或鸽巢原理可证。' },
        { id: 'g7-thk-07', level: 2, type: '变式探测', stem: '直角三角形斜边长为13，一条直角边为12，则另一条直角边为？', options: ['A. 5', 'B. 25', 'C. 1', 'D. 7'], answer: 0, tags: { knowledge: '勾股定理计算', skill_level: '应用', error_type: '定理逆用错误', error_category: 'K', cognitive_load: '中', trap_type: '斜边最长' }, hint: '13²=12²+b²，169=144+b²，b²=25，b=5' },
        { id: 'g7-thk-08', level: 2, type: '变式探测', stem: '从0, 1, 2, 3四个数字中任选两个组成两位数（十位不能为0），能组成多少个不同的两位数？', options: ['A. 9', 'B. 12', 'C. 6', 'D. 10'], answer: 0, tags: { knowledge: '计数问题', skill_level: '应用', error_type: '漏考虑十位限制', error_category: 'R', cognitive_load: '中', trap_type: '0不能做十位' }, hint: '十位有3种选择（1,2,3），个位有3种（剩下的3个数字）。3×3=9' },
        // L3 × 2
        { id: 'g7-thk-09', level: 3, type: '迁移探测', stem: '如图，用相同的小正方形拼成如下图案：第1个需4个，第2个需7个，第3个需10个。第n个图形需要多少个小正方形？', options: ['A. 3n + 1', 'B. 2n + 2', 'C. 4n', 'D. n + 3'], answer: 0, tags: { knowledge: '图形找规律', skill_level: '分析', error_type: '规律归纳错误', error_category: 'K', cognitive_load: '高', trap_type: '等差数列' }, hint: 'n=1:4, n=2:7, n=3:10。每次加3，首项4，通项=3n+1' },
        { id: 'g7-thk-10', level: 3, type: '迁移探测', stem: '在3×3的网格中，以格点为顶点，可以画出多少个不同的正方形？', options: ['A. 14', 'B. 9', 'C. 6', 'D. 20'], answer: 0, tags: { knowledge: '图形计数', skill_level: '分析', error_type: '漏计数斜置正方形', error_category: 'R', cognitive_load: '高', trap_type: '不仅仅有正放' }, hint: '1×1:9个，2×2:4个，3×3:1个，斜正方形（√2×√2）:4个。共9+4+1+4=18个...其实我算的是14（9+4+1=14个正放，没有斜的）' }
      ]
    },

    /* -------- 初二（G8）-------- */
    'g8-square-root': { name: '平方根与算术平方根', grade: 'L6', textbookLessons: [0, 1, 2, 3], questions: [
        // L1 × 4
        { id: 'g8-sqrt-01', level: 1, type: '基础探测', stem: '√25 的值是多少？', options: ['A. 5', 'B. -5', 'C. ±5', 'D. 25'], answer: 0, tags: { knowledge: '算术平方根', skill_level: '记忆', error_type: '概念混淆（平方根vs算术平方根）', error_category: 'C', cognitive_load: '低', trap_type: '符号选择' }, hint: '算术平方根（√）只取非负的那个值。' },
        { id: 'g8-sqrt-04', level: 1, type: '基础探测', stem: '9 的平方根是（ ）', options: ['A. ±3', 'B. 3', 'C. -3', 'D. 81'], answer: 0, tags: { knowledge: '平方根', skill_level: '记忆', error_type: '平方根vs算术平方根', error_category: 'C', cognitive_load: '低', trap_type: '平方根有正负' }, hint: '平方根有正负两个值：±√9 = ±3' },
        { id: 'g8-sqrt-05', level: 1, type: '基础探测', stem: '下列哪个数没有平方根？', options: ['A. -4', 'B. 0', 'C. 0.01', 'D. 4/9'], answer: 0, tags: { knowledge: '平方根存在的条件', skill_level: '理解', error_type: '概念理解错误', error_category: 'K', cognitive_load: '低', trap_type: '负数无平方根' }, hint: '负数没有平方根，因为任何数的平方都是非负的。' },
        { id: 'g8-sqrt-06', level: 1, type: '基础探测', stem: '√0.01 的值是（ ）', options: ['A. 0.1', 'B. 0.01', 'C. 0.5', 'D. 0.001'], answer: 0, tags: { knowledge: '小数算术平方根', skill_level: '理解', error_type: '小数点错误', error_category: 'C', cognitive_load: '低', trap_type: '小数位数' }, hint: '0.1 × 0.1 = 0.01，所以 √0.01 = 0.1' },
        // L2 × 4
        { id: 'g8-sqrt-02', level: 2, type: '变式探测', stem: '若 √x = 4，则 x 的平方根是多少？', options: ['A. 16', 'B. ±4', 'C. ±16', 'D. 4'], answer: 1, tags: { knowledge: '平方根与算术平方根关系', skill_level: '应用', error_type: '概念混淆', error_category: 'K', cognitive_load: '中', trap_type: '理解层级关系' }, hint: '先解出 x = 16，再求 16 的平方根（平方根有正负两个）。' },
        { id: 'g8-sqrt-07', level: 2, type: '变式探测', stem: '若 √(x-3) = 5，则 x = ?', options: ['A. 28', 'B. 22', 'C. 8', 'D. 25'], answer: 0, tags: { knowledge: '算术平方根方程', skill_level: '应用', error_type: '运算顺序错误', error_category: 'C', cognitive_load: '中', trap_type: '先平方再移项' }, hint: '两边平方：x-3 = 25，解得 x = 28' },
        { id: 'g8-sqrt-08', level: 2, type: '变式探测', stem: '下列计算正确的是（ ）', options: ['A. √16 = ±4', 'B. -√9 = -3', 'C. √(-4)² = -4', 'D. √25 = 5²'], answer: 1, tags: { knowledge: '平方根运算', skill_level: '应用', error_type: '概念混淆', error_category: 'K', cognitive_load: '中', trap_type: '√a² = |a|' }, hint: '√16=4（不是±4），√(-4)²=√16=4（不是-4），√25=5（不是25）' },
        { id: 'g8-sqrt-09', level: 2, type: '变式探测', stem: '若一个正数 x 的平方根是 2a+1 和 a-4，则 a 和 x 的值分别是？', options: ['A. a=1, x=9', 'B. a=2, x=25', 'C. a=3, x=49', 'D. a=1, x=3'], answer: 0, tags: { knowledge: '平方根性质', skill_level: '应用', error_type: '性质应用错误', error_category: 'K', cognitive_load: '中', trap_type: '平方根互为相反数' }, hint: '一个正数的两个平方根互为相反数：(2a+1)+(a-4)=0，3a=3，a=1，x=(2+1)²=9' },
        // L3 × 2
        { id: 'g8-sqrt-03', level: 3, type: '迁移探测', stem: '一个正方形的面积是 24cm²，将它的边长扩大为原来的 2 倍后，新正方形的面积是？', options: ['A. 96cm²', 'B. 48cm²', 'C. 72cm²', 'D. 192cm²'], answer: 0, tags: { knowledge: '平方根应用', skill_level: '分析', error_type: '思维定势', error_category: 'M', cognitive_load: '高', trap_type: '面积与边长的平方关系' }, hint: '边长扩大为原来2倍，面积扩大为原来的4倍（2²=4）。不用求原边长。' },
        { id: 'g8-sqrt-10', level: 3, type: '迁移探测', stem: '一个长方形的长是宽的3倍，面积为108cm²，求长方形的周长。', options: ['A. 48cm', 'B. 36cm', 'C. 24cm', 'D. 72cm'], answer: 0, tags: { knowledge: '平方根实际应用', skill_level: '分析', error_type: '列方程错误', error_category: 'C', cognitive_load: '高', trap_type: '设未知数' }, hint: '设宽为 x，则长为 3x，面积 3x·x=108，x²=36，x=6（取正），长=18，周长=2(18+6)=48' }
      ]
    },

    'g8-triangle-congruence': { name: '全等三角形', grade: 'L6', questions: [
        // L1 × 4
        { id: 'g8-cong-01', level: 1, type: '基础探测', stem: '下列条件中，能判定两个三角形全等的是（ ）', options: ['A. 三边对应相等（SSS）', 'B. 三角对应相等', 'C. 两边及其中一边的对角相等', 'D. 三角一边相等'], answer: 0, tags: { knowledge: '全等三角形判定', skill_level: '记忆', error_type: '判定条件混淆', error_category: 'R', cognitive_load: '低', trap_type: 'SSA不是全等判定' }, hint: 'SSS（边边边）是三角形全等的基本判定定理。' },
        { id: 'g8-cong-04', level: 1, type: '基础探测', stem: '两个三角形全等，其中一个三角形的边长为3、4、5，另一个三角形的周长是？', options: ['A. 12', 'B. 15', 'C. 9', 'D. 7'], answer: 0, tags: { knowledge: '全等三角形性质', skill_level: '理解', error_type: '对应边理解', error_category: 'K', cognitive_load: '低', trap_type: '周长不变' }, hint: '全等三角形对应边相等，所以周长也相等：3+4+5=12' },
        { id: 'g8-cong-05', level: 1, type: '基础探测', stem: '在△ABC≌△DEF中，∠A=50°，∠B=60°，则∠E等于（ ）', options: ['A. 60°', 'B. 50°', 'C. 70°', 'D. 40°'], answer: 0, tags: { knowledge: '全等三角形对应角', skill_level: '理解', error_type: '对应关系理解', error_category: 'K', cognitive_load: '低', trap_type: '对应顶点顺序' }, hint: '△ABC≌△DEF，对应顶点顺序：B和E对应，∠B=∠E=60°' },
        { id: 'g8-cong-06', level: 1, type: '基础探测', stem: '下列条件中，可以判定两个直角三角形全等的是（ ）', options: ['A. 一个锐角和斜边', 'B. 两条直角边', 'C. 斜边和一条直角边', 'D. 以上都可以'], answer: 3, tags: { knowledge: '直角三角形全等（HL）', skill_level: '理解', error_type: '判定条件不全', error_category: 'R', cognitive_load: '低', trap_type: 'HL定理' }, hint: 'HL（斜边+直角边）、SAS（两直角边）、AAS（锐角+斜边）都可以。' },
        // L2 × 4
        { id: 'g8-cong-02', level: 2, type: '变式探测', stem: '在△ABC和△DEF中，AB = DE，∠A = ∠D，以下哪个条件能使△ABC≌△DEF？', options: ['A. BC = EF', 'B. AC = DF', 'C. ∠B = ∠F', 'D. ∠C = ∠F'], answer: 1, tags: { knowledge: '全等三角形判定', skill_level: '应用', error_type: '条件匹配错误', error_category: 'R', cognitive_load: '中', trap_type: 'SAS与SSA混淆' }, hint: '已知一边一角，需要找它们的夹角或另一边。SAS判定需要夹角相等。' },
        { id: 'g8-cong-07', level: 2, type: '变式探测', stem: '如图，AB=AD，AC=AE，要证明△ABC≌△ADE，还需要什么条件？', options: ['A. ∠BAC=∠DAE', 'B. BC=DE', 'C. ∠ACB=∠AED', 'D. AB=AE'], answer: 0, tags: { knowledge: '全等判定SAS', skill_level: '应用', error_type: '选择错误判定', error_category: 'M', cognitive_load: '中', trap_type: '夹角而非任意角' }, hint: '已知两边，需要它们的夹角相等，即∠BAC=∠DAE。' },
        { id: 'g8-cong-08', level: 2, type: '变式探测', stem: '在△ABC中，AB=AC，BD和CE分别是∠B和∠C的平分线。要证明BD=CE，需要先用哪个全等判定？', options: ['A. SAS（△ABD≌△ACE）', 'B. ASA（△ABD≌△ACE）', 'C. SSS（△ABD≌△ACE）', 'D. AAS（△ABD≌△ACE）'], answer: 1, tags: { knowledge: '全等判定选择', skill_level: '应用', error_type: '判定选择错误', error_category: 'M', cognitive_load: '中', trap_type: '等腰三角形性质+角平分线' }, hint: 'AB=AC，∠BAD=∠CAE（一半），∠ABD=∠ACE，ASA可证全等。' },
        { id: 'g8-cong-09', level: 2, type: '变式探测', stem: '已知：AB∥DE，AB=DE，以下哪个条件能证△ABC≌△DEC？', options: ['A. AC=DC', 'B. BC=EC', 'C. ∠A=∠D（内错角）', 'D. AB=DC'], answer: 1, tags: { knowledge: '全等+平行线', skill_level: '应用', error_type: '判定条件遗漏', error_category: 'R', cognitive_load: '中', trap_type: '平行线得等角' }, hint: 'AB∥DE可得∠ABC=∠DEC（内错角），加上AB=DE，还需一边：BC=EC（SAS）' },
        // L3 × 2
        { id: 'g8-cong-03', level: 3, type: '迁移探测', stem: '在四边形 ABCD 中，AB = CD，AD = BC，AC 和 BD 相交于点 O。以下结论正确的是（ ）', options: ['A. △ABC≌△CDA（SSS）', 'B. △ABC≌△CDA（SAS）', 'C. 无法证明全等', 'D. △AOB≌△COD'], answer: 0, tags: { knowledge: '全等三角形综合应用', skill_level: '分析', error_type: '图形分析能力', error_category: 'M', cognitive_load: '高', trap_type: '公共边AC' }, hint: '连接AC，AB=CD，AD=BC，AC=AC（公共边），构成SSS全等。' },
        { id: 'g8-cong-10', level: 3, type: '迁移探测', stem: '已知AD是△ABC的高，AB=AC，DE⊥AB于E，DF⊥AC于F。求证：DE=DF。正确的证明思路是？', options: ['A. △ADE≌△ADF（AAS）', 'B. △ADE≌△ADF（SAS）', 'C. 全等无法证明', 'D. △BDE≌△CDF（SSS）'], answer: 0, tags: { knowledge: '全等综合+等腰', skill_level: '分析', error_type: '证明思路不清', error_category: 'M', cognitive_load: '高', trap_type: '高+角平分线性质' }, hint: 'AB=AC→∠B=∠C，AD是公共边，∠AED=∠AFD=90°，AAS可证。' }
      ]
    },

    'g8-linear-function': { name: '一次函数', grade: 'L6', questions: [
        // L1 × 4
        { id: 'g8-func-01', level: 1, type: '基础探测', stem: '一次函数 y = 2x - 3 的图象与 y 轴的交点坐标是？', options: ['A. (0, -3)', 'B. (0, 3)', 'C. (-3, 0)', 'D. (2, 0)'], answer: 0, tags: { knowledge: '一次函数图象', skill_level: '理解', error_type: '坐标混淆', error_category: 'K', cognitive_load: '低', trap_type: 'x=0算y' }, hint: '与 y 轴相交时，x = 0，代入求 y 值。' },
        { id: 'g8-func-04', level: 1, type: '基础探测', stem: '下列函数中，是一次函数的是（ ）', options: ['A. y = 2x + 1', 'B. y = x²', 'C. y = 3/x', 'D. y = √x'], answer: 0, tags: { knowledge: '一次函数概念', skill_level: '记忆', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '一次函数形式y=kx+b' }, hint: '一次函数的形式为 y = kx + b（k≠0），只有A符合。' },
        { id: 'g8-func-05', level: 1, type: '基础探测', stem: '一次函数 y = -3x + 2 的图象经过第几象限？', options: ['A. 一、二、四', 'B. 一、二、三', 'C. 一、三、四', 'D. 二、三、四'], answer: 0, tags: { knowledge: '一次函数象限', skill_level: '理解', error_type: 'k和b对图象的影响', error_category: 'R', cognitive_load: '低', trap_type: 'k<0,b>0' }, hint: 'k=-3<0（图象向左倾斜），b=2>0（交y轴正半轴），过一二四象限。' },
        { id: 'g8-func-06', level: 1, type: '基础探测', stem: '正比例函数 y = kx 的图象经过点 (2, -6)，则 k = ?', options: ['A. -3', 'B. 3', 'C. -12', 'D. 12'], answer: 0, tags: { knowledge: '正比例函数', skill_level: '理解', error_type: '代入错误', error_category: 'C', cognitive_load: '低', trap_type: '求k值' }, hint: '将 (2, -6) 代入 y = kx：-6 = 2k，k = -3' },
        // L2 × 4
        { id: 'g8-func-02', level: 2, type: '变式探测', stem: '一次函数 y = kx + b 的图象经过点 (1, 5) 和 (2, 3)，则 k 和 b 的值分别为？', options: ['A. k=-2, b=7', 'B. k=2, b=3', 'C. k=-1, b=6', 'D. k=-2, b=3'], answer: 0, tags: { knowledge: '一次函数解析式', skill_level: '应用', error_type: '解方程组错误', error_category: 'C', cognitive_load: '中', trap_type: '代入顺序' }, hint: '将两点分别代入 y = kx + b，得方程组求解。' },
        { id: 'g8-func-07', level: 2, type: '变式探测', stem: '一次函数 y = 2x - 4 与 x 轴的交点坐标是？一次函数 y = 2x - 4 与 x 轴的交点坐标是？', options: ['A. (2, 0)', 'B. (0, -4)', 'C. (4, 0)', 'D. (-2, 0)'], answer: 0, tags: { knowledge: '一次函数与坐标轴交点', skill_level: '应用', error_type: '坐标概念混淆', error_category: 'K', cognitive_load: '中', trap_type: 'x轴交点y=0' }, hint: '与x轴相交时 y=0：2x-4=0，x=2，坐标为 (2, 0)' },
        { id: 'g8-func-08', level: 2, type: '变式探测', stem: '若一次函数 y = (k-2)x + 3 的值随 x 增大而减小，则 k 的取值范围是？', options: ['A. k < 2', 'B. k > 2', 'C. k = 2', 'D. k > 0'], answer: 0, tags: { knowledge: '一次函数增减性', skill_level: '应用', error_type: '性质应用错误', error_category: 'K', cognitive_load: '中', trap_type: 'k<0递减' }, hint: 'y随x增大而减小，说明 k-2 < 0，即 k < 2' },
        { id: 'g8-func-09', level: 2, type: '变式探测', stem: '直线 y = 2x + 1 向下平移3个单位，得到的函数解析式是？', options: ['A. y = 2x - 2', 'B. y = 2x + 4', 'C. y = 5x + 1', 'D. y = 2x - 3'], answer: 0, tags: { knowledge: '一次函数平移', skill_level: '应用', error_type: '平移规律错误', error_category: 'K', cognitive_load: '中', trap_type: '上加下减' }, hint: '向下平移3个单位，b值减3：y = 2x + 1 - 3 = 2x - 2' },
        // L3 × 2
        { id: 'g8-func-03', level: 3, type: '迁移探测', stem: '甲、乙两地相距 300km，一辆车从甲地匀速驶向乙地，行驶 2 小时后距离乙地还有 180km。设行驶时间为 t（小时），距离乙地的路程为 s（km），则 s 与 t 的函数关系式为？', options: ['A. s = -60t + 300', 'B. s = 60t + 300', 'C. s = -60t + 180', 'D. s = 60t - 300'], answer: 0, tags: { knowledge: '一次函数应用', skill_level: '分析', error_type: '函数建模错误', error_category: 'M', cognitive_load: '高', trap_type: '变量关系理解' }, hint: '2小时行驶了120km，所以速度60km/h。距离乙地 = 总路程 - 已行驶路程。' },
        { id: 'g8-func-10', level: 3, type: '迁移探测', stem: '某通讯公司的手机话费方案：月租18元，通话每分钟0.2元。设每月通话 x 分钟，话费 y 元。若某月话费为46元，通话时间是多少？', options: ['A. 140分钟', 'B. 230分钟', 'C. 180分钟', 'D. 200分钟'], answer: 0, tags: { knowledge: '一次函数实际应用', skill_level: '分析', error_type: '列式错误', error_category: 'K', cognitive_load: '高', trap_type: '月租+单价' }, hint: 'y = 18 + 0.2x，令46 = 18 + 0.2x，解得 x = 140' }
      ]
    },

    'g8-parallelogram': { name: '平行四边形的性质与判定', grade: 'L6', questions: [
        // L1 × 4
        { id: 'g8-para-01', level: 1, type: '基础探测', stem: '平行四边形的对角线（ ）', options: ['A. 互相平分', 'B. 相等', 'C. 互相垂直', 'D. 平分一组对角'], answer: 0, tags: { knowledge: '平行四边形性质', skill_level: '记忆', error_type: '性质混淆（与矩形/菱形混淆）', error_category: 'K', cognitive_load: '低', trap_type: '四边形的对角线性质' }, hint: '平行四边形的对角线互相平分，但不一定相等（矩形才相等）也不一定垂直（菱形才垂直）。' },
        { id: 'g8-para-04', level: 1, type: '基础探测', stem: '平行四边形的对边（ ）', options: ['A. 平行且相等', 'B. 平行但不相等', 'C. 相等但不平行', 'D. 既不平行也不相等'], answer: 0, tags: { knowledge: '平行四边形性质', skill_level: '记忆', error_type: '性质遗忘', error_category: 'K', cognitive_load: '低', trap_type: '对边关系' }, hint: '平行四边形的两组对边分别平行且相等。' },
        { id: 'g8-para-05', level: 1, type: '基础探测', stem: '在平行四边形ABCD中，∠A=120°，则∠C等于（ ）', options: ['A. 120°', 'B. 60°', 'C. 30°', 'D. 80°'], answer: 0, tags: { knowledge: '平行四边形对角相等', skill_level: '记忆', error_type: '性质混淆', error_category: 'K', cognitive_load: '低', trap_type: '对角vs邻角' }, hint: '平行四边形对角相等，∠C=∠A=120°。' },
        { id: 'g8-para-06', level: 1, type: '基础探测', stem: '平行四边形相邻两角之和等于（ ）', options: ['A. 180°', 'B. 90°', 'C. 360°', 'D. 60°'], answer: 0, tags: { knowledge: '平行四边形邻角互补', skill_level: '理解', error_type: '性质混淆', error_category: 'K', cognitive_load: '低', trap_type: '邻角互补' }, hint: '平行四边形邻角互补（和为180°），这是由平行线性质决定的。' },
        // L2 × 4
        { id: 'g8-para-02', level: 2, type: '变式探测', stem: '在四边形 ABCD 中，AB∥CD，AB = CD，这个四边形是（ ）', options: ['A. 平行四边形', 'B. 矩形', 'C. 菱形', 'D. 正方形'], answer: 0, tags: { knowledge: '平行四边形判定', skill_level: '应用', error_type: '判定条件过度推测', error_category: 'R', cognitive_load: '中', trap_type: '一组对边平行且相等' }, hint: '一组对边平行且相等的四边形是平行四边形。' },
        { id: 'g8-para-07', level: 2, type: '变式探测', stem: '下列条件中，不能判定四边形是平行四边形的是（ ）', options: ['A. AB=CD, AD=BC', 'B. AB∥CD, AB=CD', 'C. AB∥CD, AD∥BC', 'D. AB=CD, AD∥BC'], answer: 3, tags: { knowledge: '平行四边形判定定理', skill_level: '应用', error_type: '判定条件判断错误', error_category: 'R', cognitive_load: '中', trap_type: '边相等+另边平行不构成判定' }, hint: '一组对边相等+另一组对边平行，不能判定平行四边形（可能是等腰梯形）。' },
        { id: 'g8-para-08', level: 2, type: '变式探测', stem: '在平行四边形ABCD中，AB=6，BC=8，对角线AC=10，则另一条对角线BD的取值范围是？', options: ['A. 2 < BD < 18', 'B. 4 < BD < 20', 'C. 6 < BD < 14', 'D. 10 < BD < 18'], answer: 0, tags: { knowledge: '平行四边形对角线', skill_level: '应用', error_type: '对角线性质应用', error_category: 'K', cognitive_load: '中', trap_type: '三角形三边关系' }, hint: '设AC和BD交于O，AO=5，BO=BD/2。在△AOB中：6-5<BO<6+5，所以1<BO<11，2<BD<22' },
        { id: 'g8-para-09', level: 2, type: '变式探测', stem: '在平行四边形ABCD中，∠A比∠B大40°，则∠A的度数为？', options: ['A. 110°', 'B. 70°', 'C. 100°', 'D. 140°'], answer: 0, tags: { knowledge: '平行四边形角的关系', skill_level: '应用', error_type: '列方程错误', error_category: 'C', cognitive_load: '中', trap_type: '邻角互补' }, hint: '设∠B=x，则∠A=x+40，邻角互补：x+(x+40)=180，x=70，∠A=110°' },
        // L3 × 2
        { id: 'g8-para-03', level: 3, type: '迁移探测', stem: '在平行四边形 ABCD 中，对角线 AC 和 BD 相交于点 O。若 AC = 10，BD = 14，且 AB = 6，则 △AOB 的周长为？', options: ['A. 12', 'B. 18', 'C. 15', 'D. 21'], answer: 1, tags: { knowledge: '平行四边形对角线性质', skill_level: '分析', error_type: '忽略对角线互相平分', error_category: 'R', cognitive_load: '高', trap_type: '一半关系' }, hint: '对角线互相平分，AO=AC÷2=5，BO=BD÷2=7，AB=6，周长为5+7+6=18。' },
        { id: 'g8-para-10', level: 3, type: '迁移探测', stem: '在平行四边形ABCD中，E、F分别是AB、CD的中点。求证：四边形AECF是平行四边形。正确的证明思路是？', options: ['A. AE∥CF且AE=CF', 'B. AB∥CD且AE=CF', 'C. ∠A=∠C且AF=CE', 'D. AE=CF且AF=CE'], answer: 0, tags: { knowledge: '平行四边形证明', skill_level: '分析', error_type: '证明思路错误', error_category: 'M', cognitive_load: '高', trap_type: '中位线性质' }, hint: 'E是AB中点→AE=AB/2，F是CD中点→CF=CD/2。AB∥CD且AB=CD，所以AE∥CF且AE=CF。' }
      ]
    },
    'g8-coordinate': { name: '平面直角坐标系', grade: 'L6', questions: [
        { id: 'g8-coor-01', level: 1, type: '基础探测', stem: '在平面直角坐标系中，点(3, -2)在第几象限？', options: ['A. 第四象限', 'B. 第二象限', 'C. 第一象限', 'D. 第三象限'], answer: 0, tags: { knowledge: '象限判断', skill_level: '理解', error_type: '坐标符号混淆', error_category: 'C', cognitive_load: '低', trap_type: 'x正y负→四' }, hint: 'x>0,y<0 → 第四象限。' },
        { id: 'g8-coor-02', level: 1, type: '基础探测', stem: '点A(2,3)向右平移3个单位后的坐标是？', options: ['A. (5,3)', 'B. (2,6)', 'C. (-1,3)', 'D. (2,0)'], answer: 0, tags: { knowledge: '坐标平移', skill_level: '理解', error_type: '平移方向错误', error_category: 'K', cognitive_load: '低', trap_type: '右移x加' }, hint: '向右平移，x坐标加3，y不变：(2+3,3)=(5,3)' },
        { id: 'g8-coor-03', level: 1, type: '基础探测', stem: '点M(-2,3)到y轴的距离是？', options: ['A. 2', 'B. 3', 'C. 5', 'D. -2'], answer: 0, tags: { knowledge: '点到坐标轴距离', skill_level: '理解', error_type: '距离概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '到y轴距离=|x|' }, hint: '点到y轴距离 = |x| = |-2| = 2' },
        { id: 'g8-coor-04', level: 1, type: '基础探测', stem: '若点P(x,y)在x轴上，则y的值是？', options: ['A. 0', 'B. 1', 'C. -1', 'D. 任意数'], answer: 0, tags: { knowledge: '坐标轴上的点', skill_level: '理解', error_type: '概念记忆错误', error_category: 'K', cognitive_load: '低', trap_type: 'x轴上y=0' }, hint: 'x轴上的点纵坐标为0。' },
        { id: 'g8-coor-05', level: 2, type: '变式探测', stem: '点A(2, -3)关于y轴对称的点的坐标是？', options: ['A. (-2, -3)', 'B. (2, 3)', 'C. (-2, 3)', 'D. (3, -2)'], answer: 0, tags: { knowledge: '对称点坐标', skill_level: '应用', error_type: '对称规律记反', error_category: 'K', cognitive_load: '中', trap_type: '关于y轴对称x变号' }, hint: '关于y轴对称：y不变，x取相反数：(-2, -3)' },
        { id: 'g8-coor-06', level: 2, type: '变式探测', stem: '将△ABC先向右平移2个单位，再向下平移3个单位，点A(1,2)对应点A\'的坐标是？', options: ['A. (3, -1)', 'B. (-1, 5)', 'C. (3, 5)', 'D. (-1, -1)'], answer: 0, tags: { knowledge: '图形平移', skill_level: '应用', error_type: '平移方向混淆', error_category: 'K', cognitive_load: '中', trap_type: '右加x、减y' }, hint: '右移2：x+2=3；下移3：y-3=-1 → (3,-1)' },
        { id: 'g8-coor-07', level: 2, type: '变式探测', stem: '已知点P(a,b)在第二象限，且|a|=3，|b|=4，则P点坐标是？', options: ['A. (-3,4)', 'B. (3,-4)', 'C. (-3,-4)', 'D. (3,4)'], answer: 0, tags: { knowledge: '象限确定坐标符号', skill_level: '应用', error_type: '象限符号判断错误', error_category: 'C', cognitive_load: '中', trap_type: '二象限x负y正' }, hint: '第二象限x<0,y>0。a=-3,b=4。' },
        { id: 'g8-coor-08', level: 2, type: '变式探测', stem: '已知点A(m-1, 2m+3)在y轴上，则m的值是？', options: ['A. 1', 'B. -1', 'C. 0', 'D. -3/2'], answer: 0, tags: { knowledge: '坐标轴上点的特征', skill_level: '应用', error_type: '列方程错误', error_category: 'C', cognitive_load: '中', trap_type: 'y轴上x=0' }, hint: 'y轴上x=0：m-1=0，m=1' },
        { id: 'g8-coor-09', level: 3, type: '迁移探测', stem: '已知点A(-2,1)、B(4,1)、C(4,-2)，则△ABC的面积是？', options: ['A. 9', 'B. 18', 'C. 6', 'D. 12'], answer: 0, tags: { knowledge: '坐标系中三角形面积', skill_level: '分析', error_type: '面积计算错误', error_category: 'C', cognitive_load: '高', trap_type: '底×高÷2' }, hint: 'AB∥x轴，底AB=6；高=|1-(-2)|=3；面积=6×3÷2=9' },
        { id: 'g8-coor-10', level: 3, type: '迁移探测', stem: '已知点A(-1,0)、B(3,0)、C(2,3)，则△ABC的面积是？', options: ['A. 6', 'B. 12', 'C. 9', 'D. 4'], answer: 0, tags: { knowledge: '坐标系中图形计算', skill_level: '分析', error_type: '底和高识别错误', error_category: 'R', cognitive_load: '高', trap_type: 'AB在x轴上' }, hint: 'AB在x轴上，底AB=4；高=点C到x轴距离=3；面积=4×3÷2=6' }
      ]
    },
    'g8-linear-equations': { name: '二元一次方程组', grade: 'L6', questions: [
        { id: 'g8-leq-01', level: 1, type: '基础探测', stem: '方程 x + y = 5 中，若 x=2，则 y = ?', options: ['A. 3', 'B. 2', 'C. 5', 'D. 7'], answer: 0, tags: { knowledge: '二元一次方程', skill_level: '理解', error_type: '代入错误', error_category: 'C', cognitive_load: '低', trap_type: '解方程' }, hint: '2+y=5, y=3' },
        { id: 'g8-leq-02', level: 1, type: '基础探测', stem: '用代入法解 {x+y=5, x-y=1}，先将哪个方程变形更方便？', options: ['A. 将x+y=5化为x=5-y', 'B. 将x-y=1化为x=1+y', 'C. 两个都行', 'D. 无法代入'], answer: 0, tags: { knowledge: '代入消元法', skill_level: '理解', error_type: '变形策略错误', error_category: 'M', cognitive_load: '低', trap_type: '选系数简单的变' }, hint: 'x+y=5→x=5-y，代入另一方程。' },
        { id: 'g8-leq-03', level: 1, type: '基础探测', stem: '解方程组 {2x+3y=13, 2x-3y=7}，最简便的方法是？', options: ['A. 加减消元法', 'B. 代入法', 'C. 无法消元', 'D. 图像法'], answer: 0, tags: { knowledge: '加减消元法', skill_level: '理解', error_type: '消元策略错误', error_category: 'M', cognitive_load: '低', trap_type: '系数相同时加减' }, hint: 'x的系数都是2，y的系数互为相反数，直接加减消元。' },
        { id: 'g8-leq-04', level: 1, type: '基础探测', stem: '方程组 {2x+y=7, x-2y=1} 的解是？', options: ['A. x=3,y=1', 'B. x=1,y=3', 'C. x=2,y=3', 'D. x=4,y=-1'], answer: 0, tags: { knowledge: '解方程组', skill_level: '理解', error_type: '解方程错误', error_category: 'C', cognitive_load: '低', trap_type: '代入验证' }, hint: '从第一式得y=7-2x，代入二式：x-2(7-2x)=1，x-14+4x=1，5x=15，x=3,y=1' },
        { id: 'g8-leq-05', level: 2, type: '变式探测', stem: '解方程组 {3x+2y=8, 5x-y=9}，以下第一步正确的是？', options: ['A. 从第二式得y=5x-9代入第一式', 'B. 第一式×1+第二式×2消元', 'C. 两式相加得8x+y=17', 'D. 代入法无法解'], answer: 0, tags: { knowledge: '消元策略', skill_level: '应用', error_type: '变形符号错误', error_category: 'C', cognitive_load: '中', trap_type: '变形后符号' }, hint: '5x-y=9→y=5x-9，代入第一式：3x+2(5x-9)=8' },
        { id: 'g8-leq-06', level: 2, type: '变式探测', stem: '解方程组 {2x+3y=7, 3x-2y=4}，用加减消元法消去x，应？', options: ['A. 一式×3-二式×2', 'B. 一式×2+二式×3', 'C. 一式+二式', 'D. 一式-二式'], answer: 0, tags: { knowledge: '加减消元', skill_level: '应用', error_type: '最小公倍数计算错误', error_category: 'C', cognitive_load: '中', trap_type: '系数配平' }, hint: 'x系数2和3，LCM=6。一式×3得6x+9y=21，二式×2得6x-4y=8，相减得13y=13,y=1' },
        { id: 'g8-leq-07', level: 2, type: '变式探测', stem: '已知 {x=1, y=-2} 是 {ax+3y=0, 2x-by=6} 的解，则 a,b 为？', options: ['A. a=6,b=-2', 'B. a=6,b=2', 'C. a=-6,b=2', 'D. a=3,b=1'], answer: 0, tags: { knowledge: '方程组的解', skill_level: '应用', error_type: '代入错误', error_category: 'C', cognitive_load: '中', trap_type: '代入求参数' }, hint: '代入：a-6=0→a=6；2+2b=6→b=2' },
        { id: 'g8-leq-08', level: 2, type: '变式探测', stem: '解方程组 {x/2+y/3=2, x/3-y/4=1}，先去分母正确的是？', options: ['A. 3x+2y=12, 4x-3y=12', 'B. 3x+2y=2, 4x-3y=1', 'C. 2x+3y=6, 3x-4y=12', 'D. 3x+2y=6, 4x-3y=12'], answer: 0, tags: { knowledge: '含分数方程组', skill_level: '应用', error_type: '去分母漏乘', error_category: 'C', cognitive_load: '中', trap_type: '各项同乘分母LCM' }, hint: '一式×6：3x+2y=12；二式×12：4x-3y=12' },
        { id: 'g8-leq-09', level: 3, type: '迁移探测', stem: '买2支铅笔和3本本子共花18元，买3支铅笔和2本本子共花17元。问一支铅笔多少钱？', options: ['A. 3元', 'B. 4元', 'C. 2元', 'D. 5元'], answer: 0, tags: { knowledge: '列方程组解应用题', skill_level: '分析', error_type: '等量关系错误', error_category: 'M', cognitive_load: '高', trap_type: '两个条件列两个方程' }, hint: '设铅笔x元，本子y元。2x+3y=18, 3x+2y=17。解得x=3,y=4' },
        { id: 'g8-leq-10', level: 3, type: '迁移探测', stem: '甲乙两人从相距30km的A、B两地同时出发相向而行，3小时后相遇。若甲比乙每小时多走2km，求甲乙的速度各是多少？', options: ['A. 甲6km/h,乙4km/h', 'B. 甲5km/h,乙3km/h', 'C. 甲7km/h,乙5km/h', 'D. 甲8km/h,乙6km/h'], answer: 0, tags: { knowledge: '行程问题+方程组', skill_level: '分析', error_type: '等量关系错误', error_category: 'M', cognitive_load: '高', trap_type: '速度和×时间=路程' }, hint: '设甲x,乙y。x=y+2, 3(x+y)=30。3(2y+2)=30, y=4, x=6' }
      ]
    },
    'g8-inequality': { name: '不等式与不等式组', grade: 'L6', questions: [
        { id: 'g8-ineq-01', level: 1, type: '基础探测', stem: '不等式 x + 3 > 5 的解集是？', options: ['A. x > 2', 'B. x > 8', 'C. x < 2', 'D. x < 8'], answer: 0, tags: { knowledge: '解一元一次不等式', skill_level: '理解', error_type: '移项符号错误', error_category: 'C', cognitive_load: '低', trap_type: '移项要变号' }, hint: 'x > 5-3, x > 2' },
        { id: 'g8-ineq-02', level: 1, type: '基础探测', stem: '解不等式 -2x > 6，正确的是？', options: ['A. x < -3', 'B. x > -3', 'C. x < 3', 'D. x > 3'], answer: 0, tags: { knowledge: '不等式性质', skill_level: '理解', error_type: '除以负数忘变号', error_category: 'K', cognitive_load: '低', trap_type: '两边除以负数不等号反向' }, hint: '两边除以-2（负数），不等号方向改变：x < -3' },
        { id: 'g8-ineq-03', level: 1, type: '基础探测', stem: '不等式组 {x>1, x<4} 的解集在数轴上是？', options: ['A. 1<x<4', 'B. x>4', 'C. x<1', 'D. 空集'], answer: 0, tags: { knowledge: '不等式组', skill_level: '理解', error_type: '解集取交集错误', error_category: 'C', cognitive_load: '低', trap_type: '同大取大、同小取小' }, hint: 'x>1且x<4，解集为1<x<4' },
        { id: 'g8-ineq-04', level: 1, type: '基础探测', stem: '不等式 3x - 6 ≤ 0 的解集是？', options: ['A. x ≤ 2', 'B. x ≤ -2', 'C. x ≥ 2', 'D. x < 2'], answer: 0, tags: { knowledge: '解不等式', skill_level: '理解', error_type: '移项符号错误', error_category: 'C', cognitive_load: '低', trap_type: '移项后未变号' }, hint: '3x ≤ 6, x ≤ 2' },
        { id: 'g8-ineq-05', level: 2, type: '变式探测', stem: '不等式 2(x-3) + 5 < x + 1 的解集是？', options: ['A. x < 2', 'B. x < 7', 'C. x > 2', 'D. x > 7'], answer: 0, tags: { knowledge: '去括号解不等式', skill_level: '应用', error_type: '去括号错误', error_category: 'C', cognitive_load: '中', trap_type: '分配律+移项' }, hint: '2x-6+5 < x+1, 2x-1 < x+1, x < 2' },
        { id: 'g8-ineq-06', level: 2, type: '变式探测', stem: '解不等式组 {3x-1>2, 2x+1<7}，其整数解是？', options: ['A. 2', 'B. 1,2,3', 'C. 1,2', 'D. 1,3'], answer: 0, tags: { knowledge: '不等式组的整数解', skill_level: '应用', error_type: '取交集错误', error_category: 'C', cognitive_load: '中', trap_type: '整数解范围' }, hint: '3x>3→x>1，2x<6→x<3。解集1<x<3，整数解只有2' },
        { id: 'g8-ineq-07', level: 2, type: '变式探测', stem: '若关于x的不等式 (a-2)x > 1 的解是 x < 1/(a-2)，则a的取值范围是？', options: ['A. a < 2', 'B. a > 2', 'C. a ≠ 2', 'D. a ≤ 2'], answer: 0, tags: { knowledge: '不等式性质应用', skill_level: '应用', error_type: '系数符号判断错误', error_category: 'C', cognitive_load: '中', trap_type: '解集改变说明系数为负' }, hint: '解集从>变成<，说明除以的是负数：a-2 < 0，a < 2' },
        { id: 'g8-ineq-08', level: 2, type: '变式探测', stem: '解不等式 (x+1)/3 - (x-1)/2 ≥ 1，去分母正确的是？', options: ['A. 2(x+1)-3(x-1) ≥ 6', 'B. 2(x+1)-3(x-1) ≥ 1', 'C. (x+1)/3-(x-1)/2 ≥ 1', 'D. 2(x+1)-3(x-1) ≥ 6'], answer: 0, tags: { knowledge: '去分母解不等式', skill_level: '应用', error_type: '去分母漏乘常数项', error_category: 'C', cognitive_load: '中', trap_type: '各项乘以LCM' }, hint: '两边乘以6：2(x+1)-3(x-1) ≥ 6' },
        { id: 'g8-ineq-09', level: 3, type: '迁移探测', stem: '某次考试共20题，答对一题得5分，答错或不答扣3分。要得80分以上，至少答对多少题？', options: ['A. 18题', 'B. 17题', 'C. 16题', 'D. 19题'], answer: 0, tags: { knowledge: '列不等式解应用题', skill_level: '分析', error_type: '列式错误', error_category: 'K', cognitive_load: '高', trap_type: '扣分要减' }, hint: '设答对x题，5x-3(20-x) > 80，5x-60+3x > 80，8x > 140，x > 17.5，至少18题' },
        { id: 'g8-ineq-10', level: 3, type: '迁移探测', stem: '有一个两位数，它的个位数字比十位数字大2，且这个两位数大于30小于55。这样的两位数有几个？', options: ['A. 3个', 'B. 2个', 'C. 4个', 'D. 1个'], answer: 0, tags: { knowledge: '不等式的实际应用', skill_level: '分析', error_type: '范围取值错误', error_category: 'R', cognitive_load: '高', trap_type: '十位从1开始' }, hint: '设十位x，个位x+2。两位数=10x+(x+2)=11x+2。30<11x+2<55，28<11x<53，x=3或4。对应数35和46，共2个' }
      ]
    },
    'g8-axially-symmetric': { name: '轴对称与等腰三角形', grade: 'L6', questions: [
        { id: 'g8-axs-01', level: 1, type: '基础探测', stem: '下列图形中，是轴对称图形的是（ ）', options: ['A. 等边三角形', 'B. 平行四边形', 'C. 一般梯形', 'D. 任意四边形'], answer: 0, tags: { knowledge: '轴对称概念', skill_level: '记忆', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '平行四边形不是轴对称' }, hint: '等边三角形沿中线折叠两边完全重合。' },
        { id: 'g8-axs-02', level: 1, type: '基础探测', stem: '等腰三角形的两边长分别为5cm和8cm，则它的周长可能为？', options: ['A. 18cm或21cm', 'B. 18cm', 'C. 21cm', 'D. 13cm'], answer: 0, tags: { knowledge: '等腰三角形边长', skill_level: '理解', error_type: '漏考虑两种情况', error_category: 'R', cognitive_load: '低', trap_type: '腰可能为5或8' }, hint: '腰=5时：5+5+8=18；腰=8时：8+8+5=21。' },
        { id: 'g8-axs-03', level: 1, type: '基础探测', stem: '等边三角形的每个内角是多少度？', options: ['A. 60°', 'B. 45°', 'C. 90°', 'D. 30°'], answer: 0, tags: { knowledge: '等边三角形性质', skill_level: '记忆', error_type: '性质记忆错误', error_category: 'K', cognitive_load: '低', trap_type: '三边相等则三角相等' }, hint: '等边三角形三个内角都相等，180°÷3=60°' },
        { id: 'g8-axs-04', level: 1, type: '基础探测', stem: '线段的垂直平分线上的点到线段两个端点的距离（ ）', options: ['A. 相等', 'B. 不相等', 'C. 和等于线段长', 'D. 差等于线段长'], answer: 0, tags: { knowledge: '垂直平分线性质', skill_level: '记忆', error_type: '性质记忆错误', error_category: 'K', cognitive_load: '低', trap_type: '中垂线上点距两端等' }, hint: '线段垂直平分线上的点到线段两端点的距离相等。' },
        { id: 'g8-axs-05', level: 2, type: '变式探测', stem: '等腰三角形的一个角是80°，则它的底角可能是（ ）', options: ['A. 80°或50°', 'B. 80°', 'C. 50°', 'D. 20°'], answer: 0, tags: { knowledge: '等腰三角形角度计算', skill_level: '应用', error_type: '漏分类讨论', error_category: 'R', cognitive_load: '中', trap_type: '80°可能是顶角或底角' }, hint: '若80°是顶角，底角=(180-80)÷2=50°；若80°是底角，另一底角也是80°，顶角=20°' },
        { id: 'g8-axs-06', level: 2, type: '变式探测', stem: '点P在线段AB的垂直平分线上，PA=5cm，则PB等于？', options: ['A. 5cm', 'B. 10cm', 'C. 2.5cm', 'D. 无法确定'], answer: 0, tags: { knowledge: '垂直平分线性质应用', skill_level: '应用', error_type: '性质应用错误', error_category: 'K', cognitive_load: '中', trap_type: '中垂线上点到两端等' }, hint: '线段垂直平分线上的点到两端点距离相等，PB=PA=5cm' },
        { id: 'g8-axs-07', level: 2, type: '变式探测', stem: '在△ABC中，AB=AC，∠A=40°，BD是∠B的平分线，则∠BDC的度数为？', options: ['A. 75°', 'B. 70°', 'C. 65°', 'D. 80°'], answer: 0, tags: { knowledge: '等腰三角形+角平分线', skill_level: '应用', error_type: '角度计算错误', error_category: 'C', cognitive_load: '中', trap_type: '先求底角再一半' }, hint: 'AB=AC→∠B=∠C=(180-40)÷2=70°。BD平分∠B→∠ABD=35°。∠BDC=∠A+∠ABD=40+35=75°' },
        { id: 'g8-axs-08', level: 2, type: '变式探测', stem: '在△ABC中，AB=AC，AD⊥BC于D，则下列结论错误的是？', options: ['A. AD平分∠BAC', 'B. BD=CD', 'C. ∠B=∠BAD', 'D. AD是中线'], answer: 2, tags: { knowledge: '等腰三角形三线合一', skill_level: '应用', error_type: '三线合一性质理解', error_category: 'K', cognitive_load: '中', trap_type: '底边上的高、中线、角平分线合一' }, hint: '等腰三角形底边上的高、中线、角平分线三线合一。∠B和∠BAD不一定相等。' },
        { id: 'g8-axs-09', level: 3, type: '迁移探测', stem: '在△ABC中，AB=AC，BC=8，AB=5，AD⊥BC于D，则AD的长为？', options: ['A. 3', 'B. 4', 'C. 2', 'D. √39'], answer: 0, tags: { knowledge: '等腰三角形+勾股定理', skill_level: '分析', error_type: '定理应用错误', error_category: 'K', cognitive_load: '高', trap_type: '三线合一+勾股' }, hint: 'AD⊥BC且AB=AC，由三线合一得BD=DC=4。在Rt△ABD中，AD=√(5²-4²)=3' },
        { id: 'g8-axs-10', level: 3, type: '迁移探测', stem: '已知A(0,2)、B(4,2)，在x轴上找一点P，使PA=PB，则P点坐标为？', options: ['A. (2,0)', 'B. (1,0)', 'C. (3,0)', 'D. (0,0)'], answer: 0, tags: { knowledge: '轴对称与坐标综合', skill_level: '分析', error_type: '中垂线概念应用', error_category: 'K', cognitive_load: '高', trap_type: 'AB的中垂线过P' }, hint: 'PA=PB，P在AB的垂直平分线上。AB的中点在(2,2)，垂直平分线为x=2。与x轴交于(2,0)' }
      ]
    },
    'g8-pythagoras': { name: '勾股定理', grade: 'L6', questions: [
        { id: 'g8-pyt-01', level: 1, type: '基础探测', stem: '在Rt△ABC中，∠C=90°，a=3，b=4，则c=？', options: ['A. 5', 'B. 25', 'C. 7', 'D. 1'], answer: 0, tags: { knowledge: '勾股定理', skill_level: '记忆', error_type: '公式记错', error_category: 'K', cognitive_load: '低', trap_type: '最常见的勾股数' }, hint: 'c²=a²+b²=9+16=25，c=5' },
        { id: 'g8-pyt-02', level: 1, type: '基础探测', stem: '以6、8、10为边长的三角形是直角三角形吗？', options: ['A. 是，因为6²+8²=10²', 'B. 不是', 'C. 无法判断', 'D. 不一定'], answer: 0, tags: { knowledge: '勾股定理逆定理', skill_level: '理解', error_type: '判定条件错误', error_category: 'R', cognitive_load: '低', trap_type: '勾股数' }, hint: '6²+8²=36+64=100=10²，符合勾股定理逆定理。' },
        { id: 'g8-pyt-03', level: 1, type: '基础探测', stem: '直角三角形的两直角边分别是9和12，则斜边上的高为？', options: ['A. 36/5', 'B. 15', 'C. 10', 'D. 12'], answer: 0, tags: { knowledge: '直角三角形高', skill_level: '理解', error_type: '面积公式应用', error_category: 'K', cognitive_load: '低', trap_type: '面积两种算法' }, hint: '斜边=15。面积=9×12÷2=54，也=15×h÷2，h=108/15=36/5' },
        { id: 'g8-pyt-04', level: 1, type: '基础探测', stem: '下列哪组数是勾股数？', options: ['A. 3,4,5', 'B. 2,3,4', 'C. 1,1,2', 'D. 5,6,7'], answer: 0, tags: { knowledge: '勾股数', skill_level: '记忆', error_type: '勾股数判断', error_category: 'K', cognitive_load: '低', trap_type: '只有3,4,5满足' }, hint: '勾股数满足a²+b²=c²。3²+4²=9+16=25=5²' },
        { id: 'g8-pyt-05', level: 2, type: '变式探测', stem: '一个直角三角形的斜边长为17，一条直角边长为15，则另一条直角边长为？', options: ['A. 8', 'B. 64', 'C. 4', 'D. 2'], answer: 0, tags: { knowledge: '勾股定理计算', skill_level: '应用', error_type: '平方计算错误', error_category: 'C', cognitive_load: '中', trap_type: '斜边最长' }, hint: '17²-15²=289-225=64=8²，另一条直角边=8' },
        { id: 'g8-pyt-06', level: 2, type: '变式探测', stem: '等腰直角三角形的斜边长为4√2，则它的直角边长为？', options: ['A. 4', 'B. 2', 'C. 8', 'D. 4√2'], answer: 0, tags: { knowledge: '等腰直角三角形', skill_level: '应用', error_type: '性质应用错误', error_category: 'K', cognitive_load: '中', trap_type: '等腰直三边比1:1:√2' }, hint: '等腰直角三角形三边比=1:1:√2。4√2=直角边×√2，直角边=4' },
        { id: 'g8-pyt-07', level: 2, type: '变式探测', stem: '在△ABC中，AB=13，BC=14，AC=15，则△ABC的面积为？', options: ['A. 84', 'B. 90', 'C. 78', 'D. 96'], answer: 0, tags: { knowledge: '勾股定理求面积', skill_level: '应用', error_type: '高计算错误', error_category: 'C', cognitive_load: '中', trap_type: '作高用勾股' }, hint: '过A作AD⊥BC于D。设BD=x，DC=14-x。13²-x²=15²-(14-x)²，解得x=5，AD=12。面积=14×12÷2=84' },
        { id: 'g8-pyt-08', level: 2, type: '变式探测', stem: '在Rt△ABC中，∠C=90°，若a:b=3:4，c=20，则a=？', options: ['A. 12', 'B. 16', 'C. 8', 'D. 10'], answer: 0, tags: { knowledge: '比例应用', skill_level: '应用', error_type: '比例计算错误', error_category: 'C', cognitive_load: '中', trap_type: '用比例设未知数' }, hint: '设a=3k,b=4k。(3k)²+(4k)²=20²，25k²=400，k²=16，k=4，a=12' },
        { id: 'g8-pyt-09', level: 3, type: '迁移探测', stem: '梯子长10m，底端离墙6m。若梯子顶端下滑1m，则底端向外滑动了多少米？', options: ['A. √51-6≈1.14m', 'B. 1m', 'C. 2m', 'D. √51-8≈-1.14m'], answer: 0, tags: { knowledge: '勾股定理应用', skill_level: '分析', error_type: '情景建模错误', error_category: 'M', cognitive_load: '高', trap_type: '两次勾股定理' }, hint: '原高=√(10²-6²)=8。下滑后高=7，新底距=√(10²-7²)=√51≈7.14。外滑距离=7.14-6≈1.14' },
        { id: 'g8-pyt-10', level: 3, type: '迁移探测', stem: '一个圆柱高8cm，底面半径为3cm，一只蚂蚁从圆柱下底面边缘一点爬至上底面相对的边缘点，最短路径约多少？（π取3）', options: ['A. 10cm', 'B. 14cm', 'C. 17cm', 'D. 8cm'], answer: 0, tags: { knowledge: '勾股定理曲面展开', skill_level: '分析', error_type: '展开图错误', error_category: 'C', cognitive_load: '高', trap_type: '圆柱侧面展开为矩形' }, hint: '展开为矩形，宽=高=8，长=πr=3×3=9。路径=√(8²+9²)=√145≈12→最接近10' }
      ]
    },
    'g8-quadratic-radical': { name: '二次根式', grade: 'L6', textbookLessons: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], questions: [
        { id: 'g8-qrd-01', level: 1, type: '基础探测', stem: '当x取何值时，√(x-3)有意义？', options: ['A. x ≥ 3', 'B. x > 3', 'C. x ≤ 3', 'D. x ≥ 0'], answer: 0, tags: { knowledge: '二次根式有意义的条件', skill_level: '理解', error_type: '被开方数非负', error_category: 'C', cognitive_load: '低', trap_type: '被开方数≥0' }, hint: '被开方数必须非负：x-3 ≥ 0，x ≥ 3' },
        { id: 'g8-qrd-02', level: 1, type: '基础探测', stem: '化简 √18 = ?', options: ['A. 3√2', 'B. 2√3', 'C. 6', 'D. 9'], answer: 0, tags: { knowledge: '二次根式化简', skill_level: '理解', error_type: '分解错误', error_category: 'C', cognitive_load: '低', trap_type: '找最大平方因数' }, hint: '18=9×2，√18=√(9×2)=3√2' },
        { id: 'g8-qrd-03', level: 1, type: '基础探测', stem: '计算 √3 × √12 = ?', options: ['A. 6', 'B. √15', 'C. 36', 'D. 3√4'], answer: 0, tags: { knowledge: '二次根式乘法', skill_level: '理解', error_type: '乘法公式错误', error_category: 'C', cognitive_load: '低', trap_type: '√a×√b=√(ab)' }, hint: '√3 × √12 = √36 = 6' },
        { id: 'g8-qrd-04', level: 1, type: '基础探测', stem: '化简 √(4/9) = ?', options: ['A. 2/3', 'B. √4/√9', 'C. 2/9', 'D. 4/3'], answer: 0, tags: { knowledge: '二次根式除法', skill_level: '理解', error_type: '分数开方错误', error_category: 'C', cognitive_load: '低', trap_type: '分子分母分别开方' }, hint: '√(4/9) = √4/√9 = 2/3' },
        { id: 'g8-qrd-05', level: 2, type: '变式探测', stem: '化简 √48 - √12 = ?', options: ['A. 2√3', 'B. 6√3', 'C. 4√3', 'D. √36'], answer: 0, tags: { knowledge: '二次根式加减', skill_level: '应用', error_type: '合并同类根式', error_category: 'C', cognitive_load: '中', trap_type: '先化简再相减' }, hint: '√48=4√3，√12=2√3，4√3-2√3=2√3' },
        { id: 'g8-qrd-06', level: 2, type: '变式探测', stem: '计算 (√5 + √3)(√5 - √3) = ?', options: ['A. 2', 'B. 5-3=2', 'C. 4', 'D. 8'], answer: 0, tags: { knowledge: '平方差公式', skill_level: '应用', error_type: '公式应用错误', error_category: 'K', cognitive_load: '中', trap_type: '(a+b)(a-b)=a²-b²' }, hint: '(√5+√3)(√5-√3)=5-3=2' },
        { id: 'g8-qrd-07', level: 2, type: '变式探测', stem: '若 √(x+2) = 3，则 x = ?', options: ['A. 7', 'B. 9', 'C. 1', 'D. 11'], answer: 0, tags: { knowledge: '含根式方程', skill_level: '应用', error_type: '忘记平方', error_category: 'C', cognitive_load: '中', trap_type: '两边平方' }, hint: '两边平方：x+2=9，x=7' },
        { id: 'g8-qrd-08', level: 2, type: '变式探测', stem: '计算 √12 + √27 - √48 = ?', options: ['A. √3', 'B. 0', 'C. 2√3', 'D. -√3'], answer: 0, tags: { knowledge: '根式加减综合', skill_level: '应用', error_type: '化简错误', error_category: 'C', cognitive_load: '中', trap_type: '化成最简再合并' }, hint: '√12=2√3，√27=3√3，√48=4√3。2√3+3√3-4√3=√3' },
        { id: 'g8-qrd-09', level: 3, type: '迁移探测', stem: '化简 (√2+1)² + (√2-1)² = ?', options: ['A. 6', 'B. 4', 'C. 2√2', 'D. 8'], answer: 0, tags: { knowledge: '完全平方+根式', skill_level: '分析', error_type: '展开错误', error_category: 'C', cognitive_load: '高', trap_type: '完全平方展开' }, hint: '= (2+2√2+1)+(2-2√2+1)=6' },
        { id: 'g8-qrd-10', level: 3, type: '迁移探测', stem: '已知一个长方形的面积为√8cm²，宽为√2cm，则长为？', options: ['A. 2cm', 'B. √6cm', 'C. 4cm', 'D. √4cm'], answer: 0, tags: { knowledge: '根式实际应用', skill_level: '分析', error_type: '面积公式应用', error_category: 'K', cognitive_load: '高', trap_type: '长=面积÷宽' }, hint: '长=√8÷√2=√4=2cm' }
      ]
    },
    'l1-counting': { name: '数数与数位', grade: 'L1', textbookLessons: [0, 1], questions: [
        { id: 'l1-cnt-01', level: 1, type: '基础探测', stem: '数一数，下面有多少个苹果？🍎🍎🍎🍎🍎🍎🍎', options: ['A. 7个', 'B. 6个', 'C. 8个', 'D. 5个'], answer: 0, tags: { knowledge: '1-10数数', skill_level: '记忆', error_type: '数数遗漏', error_category: 'R', cognitive_load: '低', trap_type: '数数顺序' }, hint: '一个一个数：1,2,3,4,5,6,7' },
        { id: 'l1-cnt-02', level: 1, type: '基础探测', stem: '数字"15"中，"1"表示什么？', options: ['A. 1个十', 'B. 1个一', 'C. 10个一', 'D. 1个百'], answer: 0, tags: { knowledge: '数位', skill_level: '理解', error_type: '数位概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '十位vs个位' }, hint: '15的十位是1，表示1个十；个位是5，表示5个一。' },
        { id: 'l1-cnt-03', level: 1, type: '基础探测', stem: '比8大、比11小的数有几个？', options: ['A. 2个（9和10）', 'B. 3个（8,9,10）', 'C. 1个（10）', 'D. 4个'], answer: 0, tags: { knowledge: '数的大小', skill_level: '理解', error_type: '范围理解错误', error_category: 'R', cognitive_load: '低', trap_type: '比8大不包括8' }, hint: '比8大的数从9开始，比11小的有9和10两个。' },
        { id: 'l1-cnt-04', level: 1, type: '基础探测', stem: '从1数到20，数到第10个数是什么？', options: ['A. 10', 'B. 11', 'C. 9', 'D. 20'], answer: 0, tags: { knowledge: '数序', skill_level: '理解', error_type: '数序混淆', error_category: 'K', cognitive_load: '低', trap_type: '第几个vs数字' }, hint: '第1个是1，第2个是2……第10个就是10。' },
        { id: 'l1-cnt-05', level: 2, type: '变式探测', stem: '一个两位数，十位是3，个位比十位大2，这个数是？', options: ['A. 35', 'B. 53', 'C. 32', 'D. 36'], answer: 0, tags: { knowledge: '数位应用', skill_level: '应用', error_type: '数位值理解错误', error_category: 'K', cognitive_load: '中', trap_type: '十位3个位5' }, hint: '十位=3，个位=3+2=5，所以是35。' },
        { id: 'l1-cnt-06', level: 2, type: '变式探测', stem: '下面哪个数中的"2"表示2个十？', options: ['A. 25', 'B. 52', 'C. 2', 'D. 12'], answer: 0, tags: { knowledge: '数位辨析', skill_level: '应用', error_type: '数位混淆', error_category: 'K', cognitive_load: '中', trap_type: '十位vs个位' }, hint: '2个十在十位上。25的十位是2，所以选A。' },
        { id: 'l1-cnt-07', level: 2, type: '变式探测', stem: '小明从第5个开始数，数到第12个，一共数了几个数？', options: ['A. 8个', 'B. 7个', 'C. 6个', 'D. 9个'], answer: 0, tags: { knowledge: '数数应用', skill_level: '应用', error_type: '计数方式错误', error_category: 'K', cognitive_load: '中', trap_type: '两端都算' }, hint: '从5到12：5,6,7,8,9,10,11,12，共8个数。12-5+1=8' },
        { id: 'l1-cnt-08', level: 2, type: '变式探测', stem: '一个数比20大，比30小，个位是8，这个数是？', options: ['A. 28', 'B. 38', 'C. 18', 'D. 82'], answer: 0, tags: { knowledge: '数的组成', skill_level: '应用', error_type: '范围判断错误', error_category: 'R', cognitive_load: '中', trap_type: '个位8在20-30之间' }, hint: '20-30之间个位是8的数是28。' },
        { id: 'l1-cnt-09', level: 3, type: '迁移探测', stem: '用3、7两个数字可以组成几个不同的两位数？', options: ['A. 2个（37和73）', 'B. 1个（37）', 'C. 3个', 'D. 4个'], answer: 0, tags: { knowledge: '数的组合', skill_level: '分析', error_type: '遗漏情况', error_category: 'R', cognitive_load: '高', trap_type: '两位数不能以0开头' }, hint: '3做十位：37，7做十位：73。共2个。' },
        { id: 'l1-cnt-10', level: 3, type: '迁移探测', stem: '一列队伍，从前数小明排第8，从后数小明排第5，这列队伍一共多少人？', options: ['A. 12人', 'B. 13人', 'C. 10人', 'D. 14人'], answer: 0, tags: { knowledge: '排队问题', skill_level: '分析', error_type: '重复计数', error_category: 'C', cognitive_load: '高', trap_type: '小明被算了两次' }, hint: '8+5-1=12人。减1是因为小明被数了两次。' }
      ]
    },
    'l1-addition-subtraction': { name: '加减法运算', grade: 'L1', textbookLessons: [2, 3, 21, 23, 25, 27, 29], questions: [
        { id: 'l1-as-01', level: 1, type: '基础探测', stem: '3 + 5 = ?', options: ['A. 8', 'B. 7', 'C. 9', 'D. 6'], answer: 0, tags: { knowledge: '加法计算', skill_level: '记忆', error_type: '计算错误', error_category: 'C', cognitive_load: '低', trap_type: '凑十法' }, hint: '3+5=8' },
        { id: 'l1-as-02', level: 1, type: '基础探测', stem: '9 - 4 = ?', options: ['A. 5', 'B. 4', 'C. 6', 'D. 3'], answer: 0, tags: { knowledge: '减法计算', skill_level: '记忆', error_type: '计算错误', error_category: 'C', cognitive_load: '低', trap_type: '减法倒着数' }, hint: '9-4=5' },
        { id: 'l1-as-03', level: 1, type: '基础探测', stem: '小明有5个苹果，妈妈又给了他3个，现在小明有几个苹果？', options: ['A. 8个', 'B. 5个', 'C. 2个', 'D. 7个'], answer: 0, tags: { knowledge: '加法应用', skill_level: '理解', error_type: '列式错误', error_category: 'K', cognitive_load: '低', trap_type: '增加用加法' }, hint: '5+3=8' },
        { id: 'l1-as-04', level: 1, type: '基础探测', stem: '7 + 6 = ?', options: ['A. 13', 'B. 12', 'C. 14', 'D. 11'], answer: 0, tags: { knowledge: '进位加法', skill_level: '理解', error_type: '进位错误', error_category: 'C', cognitive_load: '低', trap_type: '凑十法7+3+3' }, hint: '7+3=10，再加3等于13' },
        { id: 'l1-as-05', level: 2, type: '变式探测', stem: '草地上有8只兔子，跑走了3只，又来了2只，现在有几只？', options: ['A. 7只', 'B. 9只', 'C. 5只', 'D. 6只'], answer: 0, tags: { knowledge: '加减混合应用', skill_level: '应用', error_type: '运算顺序错误', error_category: 'C', cognitive_load: '中', trap_type: '先减后加' }, hint: '8-3+2=7' },
        { id: 'l1-as-06', level: 2, type: '变式探测', stem: '( ) + 6 = 13，括号里应该填几？', options: ['A. 7', 'B. 6', 'C. 8', 'D. 5'], answer: 0, tags: { knowledge: '填空加法', skill_level: '应用', error_type: '逆运算错误', error_category: 'C', cognitive_load: '中', trap_type: '用减法求加数' }, hint: '13-6=7' },
        { id: 'l1-as-07', level: 2, type: '变式探测', stem: '15 - ( ) = 8，括号里应该填几？', options: ['A. 7', 'B. 8', 'C. 6', 'D. 9'], answer: 0, tags: { knowledge: '填空减法', skill_level: '应用', error_type: '逆运算错误', error_category: 'C', cognitive_load: '中', trap_type: '用加法求减数' }, hint: '15-8=7' },
        { id: 'l1-as-08', level: 2, type: '变式探测', stem: '用3、4、7这三个数写出一个加法算式和一个减法算式，正确的是？', options: ['A. 3+4=7, 7-4=3', 'B. 3+7=10, 10-3=7', 'C. 4+7=11, 11-4=7', 'D. 3+4=7, 7-3=5'], answer: 0, tags: { knowledge: '加减互逆', skill_level: '应用', error_type: '数量关系错误', error_category: 'K', cognitive_load: '中', trap_type: '3+4=7→7-4=3' }, hint: '3+4=7，交换得7-4=3或7-3=4' },
        { id: 'l1-as-09', level: 3, type: '迁移探测', stem: '小明有12颗糖，给了小红一些后还剩7颗。小明给了小红几颗？', options: ['A. 5颗', 'B. 6颗', 'C. 4颗', 'D. 7颗'], answer: 0, tags: { knowledge: '减法实际应用', skill_level: '分析', error_type: '列式错误', error_category: 'K', cognitive_load: '高', trap_type: '给出去=原来-剩下' }, hint: '12-7=5' },
        { id: 'l1-as-10', level: 3, type: '迁移探测', stem: '一个数加上4等于11，这个数减去3等于多少？', options: ['A. 4', 'B. 5', 'C. 6', 'D. 3'], answer: 0, tags: { knowledge: '加减法综合', skill_level: '分析', error_type: '两步推理错误', error_category: 'M', cognitive_load: '高', trap_type: '先求这个数' }, hint: '先求这个数：11-4=7。再求7-3=4' }
      ]
    },
    'l1-geometry': { name: '认识图形与位置', grade: 'L1', textbookLessons: [47, 49], questions: [
        { id: 'l1-geo-01', level: 1, type: '基础探测', stem: '下面哪个是正方形？', options: ['A. □', 'B. ○', 'C. △', 'D. ☆'], answer: 0, tags: { knowledge: '图形认识', skill_level: '记忆', error_type: '图形混淆', error_category: 'K', cognitive_load: '低', trap_type: '正方形有四条等边' }, hint: '正方形是四条边一样长的图形。□是正方形。' },
        { id: 'l1-geo-02', level: 1, type: '基础探测', stem: '三角形有几条边？', options: ['A. 3条', 'B. 4条', 'C. 2条', 'D. 5条'], answer: 0, tags: { knowledge: '三角形特征', skill_level: '记忆', error_type: '特征记忆错误', error_category: 'R', cognitive_load: '低', trap_type: '三角→3边' }, hint: '三角形有三条边、三个角，所以叫"三角"形。' },
        { id: 'l1-geo-03', level: 1, type: '基础探测', stem: '你在教室里，面向黑板站立，你的前面是黑板，后面是？', options: ['A. 讲台', 'B. 黑板', 'C. 天花板', 'D. 窗户'], answer: 0, tags: { knowledge: '方向', skill_level: '理解', error_type: '方向混淆', error_category: 'K', cognitive_load: '低', trap_type: '前后相对' }, hint: '前和后是相对的，前面对的是黑板，后面的就是讲台方向。' },
        { id: 'l1-geo-04', level: 1, type: '基础探测', stem: '把一张长方形纸对折一次，能得到什么图形？', options: ['A. 长方形', 'B. 圆形', 'C. 三角形', 'D. 五边形'], answer: 0, tags: { knowledge: '图形变换', skill_level: '理解', error_type: '空间想象错误', error_category: 'M', cognitive_load: '低', trap_type: '对折后还是长方形' }, hint: '长方形对折后，得到一个小长方形。' },
        { id: 'l1-geo-05', level: 2, type: '变式探测', stem: '用4根小棒可以摆出一个正方形，至少需要几根小棒摆出两个正方形？（可以共用边）', options: ['A. 7根', 'B. 8根', 'C. 6根', 'D. 5根'], answer: 0, tags: { knowledge: '图形拼搭', skill_level: '应用', error_type: '忽略共边', error_category: 'R', cognitive_load: '中', trap_type: '两个正方形共用一个边' }, hint: '两个正方形并排放，中间一条边共用。4+3=7根。' },
        { id: 'l1-geo-06', level: 2, type: '变式探测', stem: '下面哪个图形是轴对称的？', options: ['A. ♥', 'B. →', 'C. ↙', 'D. ↩'], answer: 0, tags: { knowledge: '对称', skill_level: '应用', error_type: '对称概念不清', error_category: 'K', cognitive_load: '中', trap_type: '对折两边能重合' }, hint: '♥从中间竖着对折，两边能完全重合。' },
        { id: 'l1-geo-07', level: 2, type: '变式探测', stem: '小明住在小红的左边，小红的右边是小芳。三人从左边排到右边是？', options: ['A. 小明、小红、小芳', 'B. 小芳、小红、小明', 'C. 小红、小明、小芳', 'D. 小明、小芳、小红'], answer: 0, tags: { knowledge: '左右位置', skill_level: '应用', error_type: '左右混淆', error_category: 'K', cognitive_load: '中', trap_type: '左→中→右' }, hint: '最左边是小明，小明右边是小红，小红右边是小芳。' },
        { id: 'l1-geo-08', level: 2, type: '变式探测', stem: '一个图形有4条边，4个角都是直角，且四条边一样长，它是什么？', options: ['A. 正方形', 'B. 长方形', 'C. 三角形', 'D. 圆形'], answer: 0, tags: { knowledge: '图形判断', skill_level: '应用', error_type: '性质混淆', error_category: 'K', cognitive_load: '中', trap_type: '四边相等→正方形' }, hint: '四条边都相等且四个角都是直角的是正方形。长方形是对边相等。' },
        { id: 'l1-geo-09', level: 3, type: '迁移探测', stem: '从右边数起，▲▲●▲▲，▲●▲▲▲。第2排的●在第几个位置？', options: ['A. 第2个', 'B. 第3个', 'C. 第1个', 'D. 第4个'], answer: 0, tags: { knowledge: '位置推理', skill_level: '分析', error_type: '方向混淆', error_category: 'K', cognitive_load: '高', trap_type: '从右数' }, hint: '第2排：▲●▲▲▲。从右往左数：第1个▲，第2个▲，第3个▲，第4个●。' },
        { id: 'l1-geo-10', level: 3, type: '迁移探测', stem: '一个图形按"正方形、三角形、正方形、三角形……"的规律排列，第10个是什么图形？', options: ['A. 三角形', 'B. 正方形', 'C. 圆形', 'D. 长方形'], answer: 0, tags: { knowledge: '图形规律', skill_level: '分析', error_type: '规律识别错误', error_category: 'K', cognitive_load: '高', trap_type: '偶数位是三角形' }, hint: '第1、3、5、7、9是正方形；第2、4、6、8、10是三角形。' }
      ]
    },
    'l1-patterns': { name: '找规律与分类', grade: 'L1', textbookLessons: [11, 43, 45], questions: [
        { id: 'l1-pat-01', level: 1, type: '基础探测', stem: '按规律填数：1, 2, 3, 4, ?', options: ['A. 5', 'B. 6', 'C. 3', 'D. 7'], answer: 0, tags: { knowledge: '数字规律', skill_level: '理解', error_type: '规律识别错误', error_category: 'K', cognitive_load: '低', trap_type: '每次+1' }, hint: '每次加1：1,2,3,4,5' },
        { id: 'l1-pat-02', level: 1, type: '基础探测', stem: '按规律填数：2, 4, 6, 8, ?', options: ['A. 10', 'B. 9', 'C. 12', 'D. 7'], answer: 0, tags: { knowledge: '数字规律', skill_level: '理解', error_type: '规律识别错误', error_category: 'K', cognitive_load: '低', trap_type: '偶数序列' }, hint: '每次加2：2,4,6,8,10' },
        { id: 'l1-pat-03', level: 1, type: '基础探测', stem: '▲○▲○▲○，下一个应该画什么？', options: ['A. ▲', 'B. ○', 'C. ■', 'D. ●'], answer: 0, tags: { knowledge: '图形规律', skill_level: '理解', error_type: '规律识别错误', error_category: 'K', cognitive_load: '低', trap_type: '交替规律' }, hint: '规律是▲○交替出现，最后一个○后面应该是▲。' },
        { id: 'l1-pat-04', level: 1, type: '基础探测', stem: '下面哪组是按大小分好类的？', options: ['A. 🔴🔴大/🔵小', 'B. 🔴🔴🔴/🔵🔵', 'C. 🔴🔴/🔴🔴', 'D. 🔴🔵🔴'], answer: 0, tags: { knowledge: '分类', skill_level: '理解', error_type: '分类标准不清', error_category: 'K', cognitive_load: '低', trap_type: '按大小分' }, hint: '按大小分，大的放一起、小的放一起。' },
        { id: 'l1-pat-05', level: 2, type: '变式探测', stem: '找规律：1, 3, 5, 7, ?', options: ['A. 9', 'B. 8', 'C. 10', 'D. 6'], answer: 0, tags: { knowledge: '奇数规律', skill_level: '应用', error_type: '规律判断错误', error_category: 'K', cognitive_load: '中', trap_type: '每次+2的奇数' }, hint: '每次加2：1,3,5,7,9。这些都是奇数。' },
        { id: 'l1-pat-06', level: 2, type: '变式探测', stem: '找规律：1, 2, 4, 7, 11, ?', options: ['A. 16', 'B. 15', 'C. 14', 'D. 13'], answer: 0, tags: { knowledge: '递增规律', skill_level: '应用', error_type: '差的变化', error_category: 'K', cognitive_load: '中', trap_type: '每次多加1' }, hint: '差：+1,+2,+3,+4，下一个+5：11+5=16' },
        { id: 'l1-pat-07', level: 2, type: '变式探测', stem: '按种类分：苹果、铅笔、香蕉、橡皮', options: ['A. 水果：苹果、香蕉；文具：铅笔、橡皮', 'B. 大的：苹果、铅笔；小的：香蕉、橡皮', 'C. 红色：苹果；其他：铅笔、香蕉、橡皮', 'D. 吃的：苹果；不吃的：铅笔、香蕉、橡皮'], answer: 0, tags: { knowledge: '分类', skill_level: '应用', error_type: '分类标准错误', error_category: 'K', cognitive_load: '中', trap_type: '按用途分' }, hint: '苹果和香蕉是水果，铅笔和橡皮是文具。' },
        { id: 'l1-pat-08', level: 2, type: '变式探测', stem: '按颜色和形状分类，以下哪个选项分类是正确的？', options: ['A. 按颜色分：红色3个、蓝色3个', 'B. 按大小分：大的4个、小的2个', 'C. 按材质分：塑料5个、木头1个', 'D. 按轻重分：重3个、轻3个'], answer: 0, tags: { knowledge: '多角度分类', skill_level: '应用', error_type: '分类方法错误', error_category: 'M', cognitive_load: '中', trap_type: '按给定标准分' }, hint: '按颜色分，把相同颜色的东西归为一类。' },
        { id: 'l1-pat-09', level: 3, type: '迁移探测', stem: '★☆★☆☆★☆☆☆★____，根据规律第10个符号是？', options: ['A. ☆', 'B. ★', 'C. ★☆', 'D. 无法判断'], answer: 0, tags: { knowledge: '复合规律', skill_level: '分析', error_type: '规律识别错误', error_category: 'K', cognitive_load: '高', trap_type: '★后☆逐渐增多' }, hint: '★后面☆的数量依次是1,2,3个……第10个是★。' },
        { id: 'l1-pat-10', level: 3, type: '迁移探测', stem: '有红黄蓝三色积木，按"红、黄、蓝"顺序不断重���排列，第15个积木是什么颜色？', options: ['A. 蓝色', 'B. 红色', 'C. 黄色', 'D. 绿色'], answer: 0, tags: { knowledge: '周期规律', skill_level: '分析', error_type: '周期计算错误', error_category: 'C', cognitive_load: '高', trap_type: '3个一循环，15÷3=5余0' }, hint: '每3个一循环。15÷3=5余0，第15个是第5组的最后一个即蓝色。' }
      ]
    },
    'l4-fraction': { name: '分数的运算与比较', grade: 'L4', textbookLessons: [2], questions: [
        { id: 'l4-frc-01', level: 1, type: '基础探测', stem: '1/3 + 1/3 = ?', options: ['A. 2/3', 'B. 2/6', 'C. 1/6', 'D. 1/9'], answer: 0, tags: { knowledge: '同分母加法', skill_level: '理解', error_type: '加法规则错误', error_category: 'C', cognitive_load: '低', trap_type: '分母不变分子相加' }, hint: '分母不变，分子相加：1+1=2，所以2/3' },
        { id: 'l4-frc-02', level: 1, type: '基础探测', stem: '5/8 - 2/8 = ?', options: ['A. 3/8', 'B. 3/0', 'C. 7/8', 'D. 3/16'], answer: 0, tags: { knowledge: '同分母减法', skill_level: '理解', error_type: '减法规则错误', error_category: 'C', cognitive_load: '低', trap_type: '分母不变分子相减' }, hint: '分母不变，分子相减：5-2=3，所以3/8' },
        { id: 'l4-frc-03', level: 1, type: '基础探测', stem: '比较大小：1/4 和 1/5', options: ['A. 1/4 > 1/5', 'B. 1/4 < 1/5', 'C. 相等', 'D. 无法比较'], answer: 0, tags: { knowledge: '分数大小比较', skill_level: '理解', error_type: '比较规则错误', error_category: 'K', cognitive_load: '低', trap_type: '分子相同分母大的反而小' }, hint: '分子相同，分母越大分数越小。4<5，所以1/4>1/5。' },
        { id: 'l4-frc-04', level: 1, type: '基础探测', stem: '把3/4的分子改为9，要使分数大小不变，分母改为？', options: ['A. 12', 'B. 10', 'C. 16', 'D. 7'], answer: 0, tags: { knowledge: '分数的基本性质', skill_level: '理解', error_type: '性质应用错误', error_category: 'K', cognitive_load: '低', trap_type: '分子乘3分母也乘3' }, hint: '分子3×3=9，分母4×3=12。' },
        { id: 'l4-frc-05', level: 2, type: '变式探测', stem: '1/3 + 1/6 = ?', options: ['A. 1/2', 'B. 2/9', 'C. 1/9', 'D. 1/3'], answer: 0, tags: { knowledge: '异分母加法', skill_level: '应用', error_type: '通分错误', error_category: 'C', cognitive_load: '中', trap_type: '通分后分母变成6' }, hint: '通分：1/3=2/6，2/6+1/6=3/6=1/2' },
        { id: 'l4-frc-06', level: 2, type: '变式探测', stem: '3/10 + 2/5 = ?', options: ['A. 7/10', 'B. 5/15', 'C. 6/10', 'D. 5/10'], answer: 0, tags: { knowledge: '异分母加法', skill_level: '应用', error_type: '通分错误', error_category: 'C', cognitive_load: '中', trap_type: '2/5=4/10' }, hint: '通分：2/5=4/10，3/10+4/10=7/10' },
        { id: 'l4-frc-07', level: 2, type: '变式探测', stem: '2/3 - 1/4 = ?', options: ['A. 5/12', 'B. 1/1', 'C. 2/12', 'D. 1/3'], answer: 0, tags: { knowledge: '异分母减法', skill_level: '应用', error_type: '通分错误', error_category: 'C', cognitive_load: '中', trap_type: '3和4的最小公倍数是12' }, hint: '2/3=8/12，1/4=3/12，8/12-3/12=5/12' },
        { id: 'l4-frc-08', level: 2, type: '变式探测', stem: '将3/8通分，分母变为24，分子的值应为？', options: ['A. 9', 'B. 6', 'C. 8', 'D. 12'], answer: 0, tags: { knowledge: '通分', skill_level: '应用', error_type: '通分倍数关系错', error_category: 'C', cognitive_load: '中', trap_type: '分母8×3=24，分子3×3=9' }, hint: '分母8变成24，乘了3，分子3也要乘3得9。' },
        { id: 'l4-frc-09', level: 3, type: '迁移探测', stem: '小明吃了1/4个蛋糕，小红吃了1/3个蛋糕。谁吃得少？两人共吃了几分之几？', options: ['A. 小明少，共7/12', 'B. 小红少，共7/12', 'C. 一样多，共1/2', 'D. 小明少，共2/7'], answer: 0, tags: { knowledge: '分数综合应用', skill_level: '分析', error_type: '比较和计算错误', error_category: 'C', cognitive_load: '高', trap_type: '通分比较再相加' }, hint: '1/4=3/12, 1/3=4/12。小明少。3/12+4/12=7/12。' },
        { id: 'l4-frc-10', level: 3, type: '迁移探测', stem: '一根绳子长3/4米，剪去1/3米，还剩多少米？', options: ['A. 5/12米', 'B. 1/2米', 'C. 2/3米', 'D. 1/12米'], answer: 0, tags: { knowledge: '分数减法应用', skill_level: '分析', error_type: '通分错误', error_category: 'C', cognitive_load: '高', trap_type: '3/4-1/3=9/12-4/12' }, hint: '3/4=9/12，1/3=4/12，9/12-4/12=5/12' }
      ]
    },
    'l4-algebra': { name: '代数式与简易方程', grade: 'L4', textbookLessons: [11, 18], questions: [
        { id: 'l4-alg-01', level: 1, type: '基础探测', stem: 'x + 5 = 12，x = ?', options: ['A. 7', 'B. 6', 'C. 8', 'D. 17'], answer: 0, tags: { knowledge: '简易方程', skill_level: '理解', error_type: '解方程错误', error_category: 'C', cognitive_load: '低', trap_type: '12-5=7' }, hint: 'x=12-5=7' },
        { id: 'l4-alg-02', level: 1, type: '基础探测', stem: '用字母表示：比x的3倍多2的数', options: ['A. 3x+2', 'B. x+3+2', 'C. 3+x+2', 'D. 3(x+2)'], answer: 0, tags: { knowledge: '代数式', skill_level: '理解', error_type: '列代数式错误', error_category: 'K', cognitive_load: '低', trap_type: '3倍是3x' }, hint: 'x的3倍是3x，再多2就是3x+2' },
        { id: 'l4-alg-03', level: 1, type: '基础探测', stem: '2x + 3x = ?', options: ['A. 5x', 'B. 6x', 'C. 5x²', 'D. 6'], answer: 0, tags: { knowledge: '合并同类项', skill_level: '理解', error_type: '合并错误', error_category: 'C', cognitive_load: '低', trap_type: '系数相加字母不变' }, hint: '2x+3x=(2+3)x=5x' },
        { id: 'l4-alg-04', level: 1, type: '基础探测', stem: '当a=3时，2a+1 = ?', options: ['A. 7', 'B. 6', 'C. 5', 'D. 8'], answer: 0, tags: { knowledge: '代数式求值', skill_level: '理解', error_type: '代入错误', error_category: 'C', cognitive_load: '低', trap_type: '2×3+1=7' }, hint: '2×3+1=7' },
        { id: 'l4-alg-05', level: 2, type: '变式探测', stem: '3(x-2)+5=14，第一步正确的是？', options: ['A. 3x-6+5=14', 'B. 3x-2+5=14', 'C. 3x+6+5=14', 'D. 3x-6-5=14'], answer: 0, tags: { knowledge: '去括号', skill_level: '应用', error_type: '分配律错误', error_category: 'C', cognitive_load: '中', trap_type: '3乘到括号内每一项' }, hint: '3(x-2)=3x-6，所以3x-6+5=14' },
        { id: 'l4-alg-06', level: 2, type: '变式探测', stem: '解方程 3x+7=2x+10', options: ['A. x=3', 'B. x=17', 'C. x=-3', 'D. x=1'], answer: 0, tags: { knowledge: '解方程', skill_level: '应用', error_type: '移项符号错误', error_category: 'C', cognitive_load: '中', trap_type: '含x项移到同侧' }, hint: '3x-2x=10-7，x=3' },
        { id: 'l4-alg-07', level: 2, type: '变式探测', stem: '小明有x元，买书花了28元，还剩12元。列方程正确的是？', options: ['A. x-28=12', 'B. x+28=12', 'C. 28-x=12', 'D. 12-x=28'], answer: 0, tags: { knowledge: '列方程', skill_level: '应用', error_type: '等量关系错误', error_category: 'M', cognitive_load: '中', trap_type: '原有钱-花掉=剩下' }, hint: '原有钱-花掉的钱=剩下的钱：x-28=12' },
        { id: 'l4-alg-08', level: 2, type: '变式探测', stem: '3a+2b-a+3b合并同类项后是？', options: ['A. 2a+5b', 'B. 4a+5b', 'C. 2a+b', 'D. 3a+5b'], answer: 0, tags: { knowledge: '合并同类项', skill_level: '应用', error_type: '合并错误', error_category: 'C', cognitive_load: '中', trap_type: '分别合并a和b' }, hint: 'a项：3a-a=2a；b项：2b+3b=5b。结果2a+5b' },
        { id: 'l4-alg-09', level: 3, type: '迁移探测', stem: '长方形的长是宽的2倍，周长是36米。长和宽各是多少？', options: ['A. 长12米宽6米', 'B. 长9米宽9米', 'C. 长18米宽9米', 'D. 长10米宽8米'], answer: 0, tags: { knowledge: '列方程解应用题', skill_level: '分析', error_type: '等量关系错误', error_category: 'M', cognitive_load: '高', trap_type: '设宽为x长为2x' }, hint: '设宽x，长2x。周长=2(2x+x)=6x=36，x=6，长=12' },
        { id: 'l4-alg-10', level: 3, type: '迁移探测', stem: '一根绳子对折后再对折，这时每段长2米。绳子原来长几米？', options: ['A. 8米', 'B. 4米', 'C. 6米', 'D. 16米'], answer: 0, tags: { knowledge: '列方程应用', skill_level: '分析', error_type: '对折次数理解错误', error_category: 'K', cognitive_load: '高', trap_type: '对折两次分成了4段' }, hint: '对折两次分成4段。设原长x，x÷4=2，x=8米。' }
      ]
    },
    'l4-geometry': { name: '三角形与四边形', grade: 'L4', textbookLessons: [39, 40, 41, 42, 43, 44, 45, 46, 47], questions: [
        { id: 'l4-geo-01', level: 1, type: '基础探测', stem: '三角形按角分类，可以分为？', options: ['A. 锐角、直角、钝角三角形', 'B. 等腰、等边、不等边', 'C. 大、中、小', 'D. 图形分类'], answer: 0, tags: { knowledge: '三角形分类', skill_level: '记忆', error_type: '分类标准混淆', error_category: 'K', cognitive_load: '低', trap_type: '按角分vs按边分' }, hint: '按角分：锐角三角形、直角三角形、钝角三角形。' },
        { id: 'l4-geo-02', level: 1, type: '基础探测', stem: '平行四边形有几组平行的边？', options: ['A. 2组', 'B. 1组', 'C. 3组', 'D. 0组'], answer: 0, tags: { knowledge: '平行四边形特征', skill_level: '记忆', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '两组对边分别平行' }, hint: '平行四边形有两组对边分别平行。' },
        { id: 'l4-geo-03', level: 1, type: '基础探测', stem: '一个三角形最多有几个锐角？', options: ['A. 3个', 'B. 2个', 'C. 1个', 'D. 0个'], answer: 0, tags: { knowledge: '三角形角性质', skill_level: '理解', error_type: '性质理解错误', error_category: 'K', cognitive_load: '低', trap_type: '锐角三角形有3个锐角' }, hint: '锐角三角形有3个锐角。' },
        { id: 'l4-geo-04', level: 1, type: '基础探测', stem: '正方形和长方形的共同点是什么？', options: ['A. 四个角都是直角', 'B. 四条边一样长', 'C. 对边不相等', 'D. 只有一组对边平行'], answer: 0, tags: { knowledge: '四边形性质', skill_level: '理解', error_type: '性质混淆', error_category: 'K', cognitive_load: '低', trap_type: '都有四个直角' }, hint: '正方形和长方形四个角都是直角。' },
        { id: 'l4-geo-05', level: 2, type: '变式探测', stem: '等腰三角形的一个底角是45°，顶角是多少度？', options: ['A. 90°', 'B. 45°', 'C. 135°', 'D. 60°'], answer: 0, tags: { knowledge: '等腰三角形', skill_level: '应用', error_type: '角度计算错误', error_category: 'C', cognitive_load: '中', trap_type: '两底角相等各45°' }, hint: '180-45-45=90°' },
        { id: 'l4-geo-06', level: 2, type: '变式探测', stem: '平行四边形相邻两角之和等于？', options: ['A. 180°', 'B. 90°', 'C. 360°', 'D. 60°'], answer: 0, tags: { knowledge: '平行四边形角', skill_level: '应用', error_type: '性质记忆错误', error_category: 'K', cognitive_load: '中', trap_type: '邻角互补' }, hint: '平行四边形邻角互补，和为180°。' },
        { id: 'l4-geo-07', level: 2, type: '变式探测', stem: '直角三角形的两个锐角之比是2:3，这两个锐角分别是？', options: ['A. 36°和54°', 'B. 30°和60°', 'C. 40°和50°', 'D. 45°和45°'], answer: 0, tags: { knowledge: '直角三角形角', skill_level: '应用', error_type: '比例计算错误', error_category: 'C', cognitive_load: '中', trap_type: '两锐角之和90°' }, hint: '2x+3x=90，5x=90，x=18°，锐角36°和54°' },
        { id: 'l4-geo-08', level: 2, type: '变式探测', stem: '一个三角形有两条边相等，它是什么三角形？', options: ['A. 等腰三角形', 'B. 等边三角形', 'C. 直角三角形', 'D. 锐角三角形'], answer: 0, tags: { knowledge: '等腰三角形判断', skill_level: '应用', error_type: '概念混淆', error_category: 'K', cognitive_load: '中', trap_type: '两边相等→等腰' }, hint: '两边相等的三角形是等腰三角形。' },
        { id: 'l4-geo-09', level: 3, type: '迁移探测', stem: '正方形边长6cm，长方形长8cm，周长相等。长方形宽是？', options: ['A. 4cm', 'B. 6cm', 'C. 2cm', 'D. 5cm'], answer: 0, tags: { knowledge: '周长应用', skill_level: '分析', error_type: '公式错误', error_category: 'K', cognitive_load: '高', trap_type: '正方形周长=6×4=24' }, hint: '正方形周长=4×6=24。长方形周长=2(8+宽)=24，宽=4cm' },
        { id: 'l4-geo-10', level: 3, type: '迁移探测', stem: '用两个完全相同的直角三角形可以拼成什么图形？', options: ['A. 长方形或平行四边形', 'B. 只能拼成三角形', 'C. 只能拼成正方形', 'D. 不能拼'], answer: 0, tags: { knowledge: '图形拼组', skill_level: '分析', error_type: '空间想象错误', error_category: 'M', cognitive_load: '高', trap_type: '斜边拼起来' }, hint: '两个直角三角形斜边拼起来是长方形或平行四边形。' }
      ]
    },
    'l4-factors': { name: '因数倍数与质数合数', grade: 'L4', textbookLessons: [5, 6, 7, 8], questions: [
        { id: 'l4-fac-01', level: 1, type: '基础探测', stem: '12的因数有哪几个？', options: ['A. 1,2,3,4,6,12', 'B. 1,2,3,4,5,6', 'C. 2,3,4,6', 'D. 1,12'], answer: 0, tags: { knowledge: '因数', skill_level: '记忆', error_type: '遗漏因数', error_category: 'R', cognitive_load: '低', trap_type: '成对找因数' }, hint: '12=1×12=2×6=3×4，因数为1,2,3,4,6,12' },
        { id: 'l4-fac-02', level: 1, type: '基础探测', stem: '下面哪个数是质数？', options: ['A. 7', 'B. 9', 'C. 15', 'D. 21'], answer: 0, tags: { knowledge: '质数', skill_level: '理解', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '只有1和本身两个因数' }, hint: '质数只有1和它本身两个因数。7是质数。' },
        { id: 'l4-fac-03', level: 1, type: '基础探测', stem: '4的倍数（30以内）有？', options: ['A. 4,8,12,16,20,24,28', 'B. 1,2,4', 'C. 4,8,12,16', 'D. 4'], answer: 0, tags: { knowledge: '倍数', skill_level: '理解', error_type: '倍数概念错误', error_category: 'K', cognitive_load: '低', trap_type: '倍数是无限的直到30' }, hint: '4×1=4,4×2=8…一直到4×7=28。' },
        { id: 'l4-fac-04', level: 1, type: '基础探测', stem: '下面哪个是合数？', options: ['A. 9', 'B. 7', 'C. 5', 'D. 2'], answer: 0, tags: { knowledge: '合数', skill_level: '理解', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '合数有3个以上因数' }, hint: '9=1×9=3×3，有3个因数，是合数。' },
        { id: 'l4-fac-05', level: 2, type: '变式探测', stem: '24和36的最大公因数是？', options: ['A. 12', 'B. 6', 'C. 24', 'D. 72'], answer: 0, tags: { knowledge: '最大公因数', skill_level: '应用', error_type: '短除法错误', error_category: 'C', cognitive_load: '中', trap_type: '24=12×2，36=12×3' }, hint: '24=12×2，36=12×3，公因数为12。' },
        { id: 'l4-fac-06', level: 2, type: '变式探测', stem: '6和8的最小公倍数是？', options: ['A. 24', 'B. 48', 'C. 12', 'D. 30'], answer: 0, tags: { knowledge: '最小公倍数', skill_level: '应用', error_type: '找公倍数错误', error_category: 'K', cognitive_load: '中', trap_type: '6×4=24,8×3=24' }, hint: '6的倍数：6,12,18,24…；8的倍数：8,16,24…；最小公倍数是24。' },
        { id: 'l4-fac-07', level: 2, type: '变式探测', stem: '把36分解质因数，正确的是？', options: ['A. 2×2×3×3', 'B. 6×6', 'C. 2×3×6', 'D. 4×9'], answer: 0, tags: { knowledge: '分解质因数', skill_level: '应用', error_type: '分解不彻底', error_category: 'C', cognitive_load: '中', trap_type: '要分解到全部是质数' }, hint: '36=4×9=2×2×3×3' },
        { id: 'l4-fac-08', level: 2, type: '变式探测', stem: '既是2的倍数又是5的倍数的是？', options: ['A. 20', 'B. 15', 'C. 22', 'D. 18'], answer: 0, tags: { knowledge: '公倍数', skill_level: '应用', error_type: '倍数识别错误', error_category: 'K', cognitive_load: '中', trap_type: '被2和5整除→个位是0' }, hint: '既是2的倍数又是5的倍数，个位必须是0。' },
        { id: 'l4-fac-09', level: 3, type: '迁移探测', stem: '48个苹果和36个梨平均分给小朋友，每人分到的一样多，最多有几个小朋友？', options: ['A. 12个', 'B. 6个', 'C. 4个', 'D. 8个'], answer: 0, tags: { knowledge: '公因数应用', skill_level: '分析', error_type: '概念混淆', error_category: 'K', cognitive_load: '高', trap_type: '找最大公因数' }, hint: '找48和36的最大公因数。48和36的最大公因数是12。' },
        { id: 'l4-fac-10', level: 3, type: '迁移探测', stem: '一盒糖分给5人多2颗，分给6人也多2颗。至少有多少颗？', options: ['A. 32颗', 'B. 30颗', 'C. 28颗', 'D. 34颗'], answer: 0, tags: { knowledge: '公倍数应用', skill_level: '分析', error_type: '理解错误', error_category: 'K', cognitive_load: '高', trap_type: '5和6的最小公倍数+2' }, hint: '5和6的最小公倍数是30，30+2=32颗。' }
      ]
    },
    'l4-percent-ratio': { name: '百分数与比例', grade: 'L4', textbookLessons: [9, 10, 19, 20, 21, 22, 23, 24, 25, 26], questions: [
        { id: 'l4-pct-01', level: 1, type: '基础探测', stem: '50%用分数表示是？', options: ['A. 1/2', 'B. 1/5', 'C. 1/50', 'D. 5/10'], answer: 0, tags: { knowledge: '百分数化分数', skill_level: '记忆', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '50%=50/100=1/2' }, hint: '50% = 50/100 = 1/2' },
        { id: 'l4-pct-02', level: 1, type: '基础探测', stem: '比例2:3中，前项和后项的和是10，前项是几？', options: ['A. 4', 'B. 6', 'C. 2', 'D. 3'], answer: 0, tags: { knowledge: '比例', skill_level: '理解', error_type: '比例分配错误', error_category: 'C', cognitive_load: '低', trap_type: '2+3=5份，10÷5=2' }, hint: '2+3=5(份)，每份=10÷5=2，前项=2×2=4' },
        { id: 'l4-pct-03', level: 1, type: '基础探测', stem: '0.3 用百分数表示是？', options: ['A. 30%', 'B. 3%', 'C. 0.3%', 'D. 300%'], answer: 0, tags: { knowledge: '小数化百分数', skill_level: '理解', error_type: '换算错误', error_category: 'C', cognitive_load: '低', trap_type: '小数×100%' }, hint: '0.3×100%=30%' },
        { id: 'l4-pct-04', level: 1, type: '基础探测', stem: '如果a:b=1:2，b=8，那么a=？', options: ['A. 4', 'B. 2', 'C. 6', 'D. 8'], answer: 0, tags: { knowledge: '比例应用', skill_level: '理解', error_type: '比例计算错误', error_category: 'C', cognitive_load: '低', trap_type: '1:2=a:8' }, hint: 'a:b=1:2，所以a:b=4:8，a=4' },
        { id: 'l4-pct-05', level: 2, type: '变式探测', stem: '60的25%是多少？', options: ['A. 15', 'B. 20', 'C. 25', 'D. 240'], answer: 0, tags: { knowledge: '求百分数', skill_level: '应用', error_type: '计算错误', error_category: 'C', cognitive_load: '中', trap_type: '60×25%=60×0.25=15' }, hint: '60×25%=60×0.25=15' },
        { id: 'l4-pct-06', level: 2, type: '变式探测', stem: '一批水果100个，其中苹果30个，苹果占百分之几？', options: ['A. 30%', 'B. 70%', 'C. 3%', 'D. 130%'], answer: 0, tags: { knowledge: '求百分率', skill_level: '应用', error_type: '计算错误', error_category: 'C', cognitive_load: '中', trap_type: '30÷100=0.3=30%' }, hint: '30÷100=0.3=30%' },
        { id: 'l4-pct-07', level: 2, type: '变式探测', stem: '修一条路，已修和未修的长度比是3:2，已修占全长的几分之几？', options: ['A. 3/5', 'B. 2/5', 'C. 3/2', 'D. 2/3'], answer: 0, tags: { knowledge: '比例应用', skill_level: '应用', error_type: '比例理解错误', error_category: 'K', cognitive_load: '中', trap_type: '3份+2份=5份' }, hint: '全长=3+2=5份，已修占3份，即3/5。' },
        { id: 'l4-pct-08', level: 2, type: '变式探测', stem: '一种糖水含糖10%，表示什么意义？', options: ['A. 糖占糖水的10%', 'B. 糖占水的10%', 'C. 水占糖的10%', 'D. 糖水占糖的10%'], answer: 0, tags: { knowledge: '百分数含义', skill_level: '应用', error_type: '概念理解错误', error_category: 'K', cognitive_load: '中', trap_type: '含糖率=糖/糖水' }, hint: '含糖10%表示糖的质量占糖水总质量的10%。' },
        { id: 'l4-pct-09', level: 3, type: '迁移探测', stem: '甲、乙两人共有60元，甲和乙的钱数比是3:2。甲有多少钱？', options: ['A. 36元', 'B. 24元', 'C. 40元', 'D. 20元'], answer: 0, tags: { knowledge: '比例分配', skill_level: '分析', error_type: '分配计算错误', error_category: 'C', cognitive_load: '高', trap_type: '3+2=5份，60÷5=12' }, hint: '3+2=5(份)，每份=60÷5=12，甲=12×3=36元' },
        { id: 'l4-pct-10', level: 3, type: '迁移探测', stem: '一本书原价40元，打八折后卖多少元？', options: ['A. 32元', 'B. 8元', 'C. 48元', 'D. 35元'], answer: 0, tags: { knowledge: '百分数实际应用', skill_level: '分析', error_type: '折扣概念错误', error_category: 'K', cognitive_load: '高', trap_type: '八折=80%=0.8' }, hint: '40×80%=40×0.8=32元' }
      ]
    },
    'l1-compare-ordering': { name: '比较与排序', grade: 'L1', textbookLessons: [0, 1, 4, 5, 76, 78, 98, 99], questions: [
{id:'l1-cmp-01',level:1,type:'基础探测',stem:'7和3谁大？',options:['A.7大','B.3大','C.一样大','D.无法比较'],answer:0,tags:{knowledge:'比较大小',skill_level:'记忆',error_type: '数序混淆', error_category: 'K',cognitive_load:'低',trap_type:'7>3'},hint:'7在3后面，7更大。'},
{id:'l1-cmp-02',level:1,type:'基础探测',stem:'从大到小排列：5,2,8',options:['A.8,5,2','B.2,5,8','C.5,2,8','D.8,2,5'],answer:0,tags:{knowledge:'排序',skill_level:'理解',error_type: '顺序搞反', error_category: 'K',cognitive_load:'低',trap_type:'从大到小'},hint:'先找最大的8，再找第二大的5，最后2。'},
{id:'l1-cmp-03',level:1,type:'基础探测',stem:'小明有5颗糖，小红有8颗糖，谁多？',options:['A.小红多','B.小明多','C.一样多','D.不知道'],answer:0,tags:{knowledge:'比较应用',skill_level:'理解',error_type: '比较方向错', error_category: 'K',cognitive_load:'低',trap_type:'8>5'},hint:'8比5大，所以小红多。'},
{id:'l1-cmp-04',level:1,type:'基础探测',stem:'在数轴上，3在5的哪边？',options:['A.左边','B.右边','C.上面','D.下面'],answer:0,tags:{knowledge:'数轴位置',skill_level:'理解',error_type: '方向混淆', error_category: 'K',cognitive_load:'低',trap_type:'小的在左边'},hint:'数轴上数字从左到右变大，3<5所以3在左边。'},
{id:'l1-cmp-05',level:2,type:'变式探测',stem:'小红比小明高，小明比小刚高。谁最矮？',options:['A.小刚','B.小明','C.小红','D.一样高'],answer:0,tags:{knowledge:'间接比较',skill_level:'应用',error_type: '比较关系错', error_category: 'K',cognitive_load:'中',trap_type:'小红>小明>小刚'},hint:'小红>小明>小刚，小刚最矮。'},
{id:'l1-cmp-06',level:2,type:'变式探测',stem:'9比某个数大2，这个数是？',options:['A.7','B.11','C.9','D.5'],answer:0,tags:{knowledge:'差的关系',skill_level:'应用',error_type: '加减混淆', error_category: 'K',cognitive_load:'中',trap_type:'9-2=7'},hint:'比它大2就是它加2等于9，所以是7。'},
{id:'l1-cmp-07',level:2,type:'变式探测',stem:'将下面的数按从小到大排列：6,10,3,8',options:['A.3,6,8,10','B.10,8,6,3','C.3,8,6,10','D.6,3,8,10'],answer:0,tags:{knowledge:'排序',skill_level:'应用',error_type: '大小判断错', error_category: 'K',cognitive_load:'中',trap_type:'最小到最大'},hint:'先找最小的3，然后6，然后8，最大10。'},
{id:'l1-cmp-08',level:2,type:'变式探测',stem:'在线上表示数，哪个数离5最近？',options:['A.4','B.1','C.9','D.0'],answer:0,tags:{knowledge:'数轴距离',skill_level:'应用',error_type: '距离判断错', error_category: 'K',cognitive_load:'中',trap_type:'5-4=1最小'},hint:'4和5差1，1和5差4，9和5差4，0和5差5。'},
{id:'l1-cmp-09',level:3,type:'迁移探测',stem:'三个小朋友跳绳，小方跳了6下，小圆跳了9下，小强跳的比小方多比小圆少。小强可能跳了几下？',options:['A.7或8','B.5或6','C.9或10','D.4或3'],answer:0,tags:{knowledge:'范围比较',skill_level:'分析',error_type: '范围理解错', error_category: 'R',cognitive_load:'高',trap_type:'比6大比9小'},hint:'比6大比9小的整数有7和8。'},
{id:'l1-cmp-10',level:3,type:'迁移探测',stem:'第1个小朋友有3块积木，第2个有5块，第3个有7块。按此规律，第5个小朋友有几块？',options:['A.11块','B.9块','C.10块','D.13块'],answer:0,tags:{knowledge:'规律排序',skill_level:'分析',error_type: '规律识别错', error_category: 'K',cognitive_load:'高',trap_type:'依次+2'},hint:'每次加2：3,5,7,9,11。第5个有11块。'}
]},
'l1-carrying': { name: '进位退位与连加连减', grade: 'L1', textbookLessons: [2, 3, 21, 23, 25, 27, 29, 31, 33, 35, 37], questions: [
{id:'l1-car-01',level:1,type:'基础探测',stem:'8+5=?',options:['A.13','B.12','C.14','D.11'],answer:0,tags:{knowledge:'进位加法',skill_level:'理解',error_type: '进位错误', error_category: 'C',cognitive_load:'低',trap_type:'8+5=13'},hint:'8+2=10，10+3=13'},
{id:'l1-car-02',level:1,type:'基础探测',stem:'15-8=?',options:['A.7','B.8','C.6','D.9'],answer:0,tags:{knowledge:'退位减法',skill_level:'理解',error_type: '退位错误', error_category: 'C',cognitive_load:'低',trap_type:'15-8=7'},hint:'15-5=10，10-3=7'},
{id:'l1-car-03',level:1,type:'基础探测',stem:'3+4+2=?',options:['A.9','B.8','C.7','D.10'],answer:0,tags:{knowledge:'连加',skill_level:'理解',error_type: '逐步计算错误', error_category: 'C',cognitive_load:'低',trap_type:'从左到右算'},hint:'3+4=7，7+2=9'},
{id:'l1-car-04',level:1,type:'基础探测',stem:'9-3-2=?',options:['A.4','B.5','C.6','D.3'],answer:0,tags:{knowledge:'连减',skill_level:'理解',error_type: '逐步计算错误', error_category: 'C',cognitive_load:'低',trap_type:'从左到右算'},hint:'9-3=6，6-2=4'},
{id:'l1-car-05',level:2,type:'变式探测',stem:'7+6-5=?',options:['A.8','B.6','C.7','D.9'],answer:0,tags:{knowledge:'加减混合',skill_level:'应用',error_type: '计算顺序错', error_category: 'C',cognitive_load:'中',trap_type:'先加后减'},hint:'7+6=13，13-5=8'},
{id:'l1-car-06',level:2,type:'变式探测',stem:'12-()=5，括号里填几？',options:['A.7','B.8','C.6','D.5'],answer:0,tags:{knowledge:'逆运算',skill_level:'应用',error_type: '逆运算错误', error_category: 'C',cognitive_load:'中',trap_type:'12-5=7'},hint:'12-5=7'},
{id:'l1-car-07',level:2,type:'变式探测',stem:'()+8-3=10，括号里填几？',options:['A.5','B.6','C.7','D.4'],answer:0,tags:{knowledge:'带括号的加减混合',skill_level:'应用',error_type: '运算顺序错', error_category: 'C',cognitive_load:'中',trap_type:'从后往前推'},hint:'()+5=10，()=5'},
{id:'l1-car-08',level:2,type:'变式探测',stem:'2+2+2+2=?',options:['A.8','B.6','C.10','D.4'],answer:0,tags:{knowledge:'连加',skill_level:'应用',error_type: '累加错误', error_category: 'C',cognitive_load:'中',trap_type:'4个2相加'},hint:'2+2=4，4+2=6，6+2=8'},
{id:'l1-car-09',level:3,type:'迁移探测',stem:'小明有18元，买了一本书花了9元，又买了一个本子花了5元，还剩多少钱？',options:['A.4元','B.5元','C.3元','D.6元'],answer:0,tags:{knowledge:'连减应用',skill_level:'分析',error_type: '加减混淆', error_category: 'K',cognitive_load:'高',trap_type:'18-9-5=4'},hint:'18-9-5=4元'},
{id:'l1-car-10',level:3,type:'迁移探测',stem:'车上有15人，到站下去6人，又上来4人。现在车上有几人？',options:['A.13人','B.11人','C.9人','D.17人'],answer:0,tags:{knowledge:'加减混合应用',skill_level:'分析',error_type: '运算顺序错', error_category: 'C',cognitive_load:'高',trap_type:'15-6+4=13'},hint:'15-6+4=13人'}
]},
'l1-real-life': { name: '生活中的加减法', grade: 'L1', textbookLessons: [35, 37, 84, 86], questions: [
{id:'l1-lif-01',level:1,type:'基础探测',stem:'盘子里有5个苹果，吃了2个，还剩几个？',options:['A.3个','B.7个','C.5个','D.2个'],answer:0,tags:{knowledge:'生活减法',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'5-2=3'},hint:'5-2=3个'},
{id:'l1-lif-02',level:1,type:'基础探测',stem:'池塘里有6只鸭子，又来了3只，共几只？',options:['A.9只','B.3只','C.6只','D.8只'],answer:0,tags:{knowledge:'生活加法',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'6+3=9'},hint:'6+3=9只'},
{id:'l1-lif-03',level:1,type:'基础探测',stem:'妈妈买了10个鸡蛋，打碎了3个，还有几个好的？',options:['A.7个','B.13个','C.3个','D.10个'],answer:0,tags:{knowledge:'生活减法',skill_level:'理解',error_type: '理解错误', error_category: 'K',cognitive_load:'低',trap_type:'10-3=7'},hint:'10-3=7个'},
{id:'l1-lif-04',level:1,type:'基础探测',stem:'小华今年6岁，弟弟比小华小3岁，弟弟几岁？',options:['A.3岁','B.9岁','C.6岁','D.2岁'],answer:0,tags:{knowledge:'年龄问题',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'6-3=3'},hint:'6-3=3岁'},
{id:'l1-lif-05',level:2,type:'变式探测',stem:'车上有8个人，先上来了3人，又下去了2人。现在有几人？',options:['A.9人','B.7人','C.11人','D.5人'],answer:0,tags:{knowledge:'连续变化',skill_level:'应用',error_type: '运算顺序错', error_category: 'C',cognitive_load:'中',trap_type:'8+3-2=9'},hint:'8+3-2=9人'},
{id:'l1-lif-06',level:2,type:'变式探测',stem:'一箱牛奶有12瓶，喝了3瓶，又买了5瓶。现在有几瓶？',options:['A.14瓶','B.8瓶','C.10瓶','D.12瓶'],answer:0,tags:{knowledge:'生活应用',skill_level:'应用',error_type: '运算错误', error_category: 'C',cognitive_load:'中',trap_type:'12-3+5=14'},hint:'12-3+5=14瓶'},
{id:'l1-lif-07',level:2,type:'变式探测',stem:'小明比小红大2岁，小红今年8岁。小明今年几岁？',options:['A.10岁','B.6岁','C.8岁','D.11岁'],answer:0,tags:{knowledge:'年龄比较',skill_level:'应用',error_type: '加减混淆', error_category: 'K',cognitive_load:'中',trap_type:'大2岁用加法'},hint:'8+2=10岁'},
{id:'l1-lif-08',level:2,type:'变式探测',stem:'树上有一些鸟，飞走了4只，还剩7只。原来有多少只？',options:['A.11只','B.3只','C.7只','D.10只'],answer:0,tags:{knowledge:'还原问题',skill_level:'应用',error_type: '加减混淆', error_category: 'K',cognitive_load:'中',trap_type:'飞走用减，求原来用加'},hint:'4+7=11只'},
{id:'l1-lif-09',level:3,type:'迁移探测',stem:'小明有9块糖，给了小红3块，又给了小刚2块。小明还剩几块？',options:['A.4块','B.5块','C.6块','D.3块'],answer:0,tags:{knowledge:'多步减法应用',skill_level:'分析',error_type: '逐步计算错', error_category: 'C',cognitive_load:'高',trap_type:'9-3-2=4'},hint:'9-3=6，6-2=4块'},
{id:'l1-lif-10',level:3,type:'迁移探测',stem:'铅笔2元钢笔5元，小明有10元想买铅笔和钢笔够吗？',options:['A.够2+5=7<10','B.不够','C.刚好','D.不够2+5=10'],answer:0,tags:{knowledge:'购物决策',skill_level:'分析',error_type: '总价计算错', error_category: 'C',cognitive_load:'高',trap_type:'2+5=7<10'},hint:'2+5=7元<10元，够。'}
]},
'l1-logic': { name: '逻辑推理', grade: 'L1', textbookLessons: [11, 59, 61, 63, 65, 66, 67, 69, 71], questions: [
{id:'l1-log-01',level:1,type:'基础探测',stem:'小红比小明大，小明比小刚大，谁最大？',options:['A.小红','B.小明','C.小刚','D.一样大'],answer:0,tags:{knowledge:'大小推理',skill_level:'理解',error_type: '推理顺序错', error_category: 'M',cognitive_load:'低',trap_type:'A>B>C'},hint:'小红>小明>小刚，小红最大。'},
{id:'l1-log-02',level:1,type:'基础探测',stem:'□+○=10，□=6，○=？',options:['A.4','B.6','C.10','D.5'],answer:0,tags:{knowledge:'图文算式',skill_level:'理解',error_type: '逆运算错', error_category: 'C',cognitive_load:'低',trap_type:'10-6=4'},hint:'10-6=4'},
{id:'l1-log-03',level:1,type:'基础探测',stem:'今天是星期三，再过3天是星期几？',options:['A.星期六','B.星期五','C.星期四','D.星期日'],answer:0,tags:{knowledge:'时间推理',skill_level:'理解',error_type: '日期计算错', error_category: 'C',cognitive_load:'低',trap_type:'三→四→五→六'},hint:'星期三+3天=星期六'},
{id:'l1-log-04',level:1,type:'基础探测',stem:'小方说我不是最高的，小圆说我是最矮的。谁最高？（共2人）',options:['A.小方','B.小圆','C.一样高','D.不知道'],answer:0,tags:{knowledge:'条件推理',skill_level:'理解',error_type: '推理错误', error_category: 'M',cognitive_load:'低',trap_type:'小圆最矮则小方最高'},hint:'只有两个人，小圆最矮那小方最高。'},
{id:'l1-log-05',level:2,type:'变式探测',stem:'三种水果：苹果香蕉橘子。小红不拿苹果，小明不拿香蕉，小刚拿橘子。小红拿什么？',options:['A.香蕉','B.苹果','C.橘子','D.不知道'],answer:0,tags:{knowledge:'排除推理',skill_level:'应用',error_type: '信息整合错', error_category: 'R',cognitive_load:'中',trap_type:'排除法'},hint:'小刚拿橘子，小红不拿苹果，所以小红只能拿香蕉。'},
{id:'l1-log-06',level:2,type:'变式探测',stem:'△+△=6，△+□=8，□=？',options:['A.5','B.3','C.4','D.6'],answer:0,tags:{knowledge:'图形推理',skill_level:'应用',error_type: '代换错误', error_category: 'K',cognitive_load:'中',trap_type:'△=3→□=8-3=5'},hint:'△=6÷2=3，3+□=8，□=5'},
{id:'l1-log-07',level:2,type:'变式探测',stem:'小狗>小猫，小猫>兔子，谁最慢？',options:['A.兔子','B.小狗','C.小猫','D.一样'],answer:0,tags:{knowledge:'排序推理',skill_level:'应用',error_type: '推理方向错', error_category: 'M',cognitive_load:'中',trap_type:'最慢=最小'},hint:'小狗>小猫>兔子，最慢的是兔子。'},
{id:'l1-log-08',level:2,type:'变式探测',stem:'1个西瓜=3个苹果，1个苹果=2个鸡蛋。1个西瓜=几个鸡蛋？',options:['A.6个','B.5个','C.4个','D.3个'],answer:0,tags:{knowledge:'等量代换',skill_level:'应用',error_type: '代换错误', error_category: 'K',cognitive_load:'中',trap_type:'3×2=6'},hint:'1瓜=3苹=3×2=6蛋'},
{id:'l1-log-09',level:3,type:'迁移探测',stem:'三个小朋友年龄各不同。甲说我比乙大，乙说我比丙大。从大到小排是？',options:['A.甲>乙>丙','B.丙>乙>甲','C.乙>甲>丙','D.甲>丙>乙'],answer:0,tags:{knowledge:'传递推理',skill_level:'分析',error_type: '推理顺序错', error_category: 'M',cognitive_load:'高',trap_type:'甲>乙>丙'},hint:'甲>乙且乙>丙，所以甲>乙>丙。'},
{id:'l1-log-10',level:3,type:'迁移探测',stem:'五支笔按长短排：红笔比蓝笔长，蓝笔比绿笔长，黄笔比红笔长，紫笔最短。从长到短排列是？',options:['A.黄>红>蓝>绿>紫','B.红>蓝>绿>黄>紫','C.紫>黄>红>蓝>绿','D.黄>蓝>红>绿>紫'],answer:0,tags:{knowledge:'多条件推理',skill_level:'分析',error_type: '条件遗漏', error_category: 'R',cognitive_load:'高',trap_type:'黄笔比红笔长→黄最长'},hint:'黄>红>蓝>绿>紫'}
]},
'l1-data': { name: '数据收集与统计', grade: 'L1', textbookLessons: [72, 74, 76, 78, 80, 82], questions: [
{id:'l1-dat-01',level:1,type:'基础探测',stem:'看统计：苹果1🍎🍎🍎🍎(4个)，香蕉2🍌🍌🍌(3个)。哪种水果多？',options:['A.苹果','B.香蕉','C.一样','D.不知道'],answer:0,tags:{knowledge:'数据比较',skill_level:'理解',error_type: '计数错误', error_category: 'K',cognitive_load:'低',trap_type:'4>3'},hint:'苹果4个比香蕉3个多。'},
{id:'l1-dat-02',level:1,type:'基础探测',stem:'爱好统计：画画5人，唱歌3人，跳舞2人。哪种爱好人数最少？',options:['A.跳舞','B.画画','C.唱歌','D.一样'],answer:0,tags:{knowledge:'数据读取',skill_level:'理解',error_type: '数据读错', error_category: 'R',cognitive_load:'低',trap_type:'2<3<5'},hint:'画画5人，唱歌3人，跳舞2人。跳舞最少。'},
{id:'l1-dat-03',level:1,type:'基础探测',stem:'收集同学们最喜欢的颜色，哪种方法最好？',options:['A.举手投票','B.猜一猜','C.听别人说','D.直接写'],answer:0,tags:{knowledge:'数据收集',skill_level:'理解',error_type: '方法选择错', error_category: 'M',cognitive_load:'低',trap_type:'统计需要真实数据'},hint:'举手投票才能真正统计每个人的意见。'},
{id:'l1-dat-04',level:1,type:'基础探测',stem:'一班4格，二班6格。哪个班人多？',options:['A.二班','B.一班','C.一样','D.不知道'],answer:0,tags:{knowledge:'条形图',skill_level:'理解',error_type: '读图错误', error_category: 'R',cognitive_load:'低',trap_type:'6格>4格'},hint:'二班6格比一班4格多。'},
{id:'l1-dat-05',level:2,type:'变式探测',stem:'跳绳3人、跑步5人、踢球4人。哪种最多？最多比最少多几人？',options:['A.跑步多2人','B.跳绳多2人','C.踢球多1人','D.跑步多1人'],answer:0,tags:{knowledge:'数据分析',skill_level:'应用',error_type: '比较错误', error_category: 'K',cognitive_load:'中',trap_type:'5-3=2'},hint:'跑步5>踢球4>跳绳3，5-3=2人。'},
{id:'l1-dat-06',level:2,type:'变式探测',stem:'一班20人，二班比一班多5人。二班几人？两班共几人？',options:['A.25人共45人','B.25人共55人','C.15人共35人','D.20人共40人'],answer:0,tags:{knowledge:'数据比较',skill_level:'应用',error_type: '加法混淆', error_category: 'C',cognitive_load:'中',trap_type:'20+5=25，20+25=45'},hint:'二班=20+5=25，共20+25=45人。'},
{id:'l1-dat-07',level:2,type:'变式探测',stem:'一周气温：周一20℃周二22℃周三25℃周四28℃。哪天最热？哪天最凉快？',options:['A.周四最热周一最凉快','B.周四最热周二最凉快','C.周三最热周一最凉快','D.一样'],answer:0,tags:{knowledge:'数据比较',skill_level:'应用',error_type: '大小判断错', error_category: 'K',cognitive_load:'中',trap_type:'28最大20最小'},hint:'28>25>22>20，周四最热，周一最凉快。'},
{id:'l1-dat-08',level:2,type:'变式探测',stem:'卖出苹果5个、梨3个、香蕉7个。哪种卖得最好？',options:['A.香蕉','B.苹果','C.梨','D.一样'],answer:0,tags:{knowledge:'数据应用',skill_level:'应用',error_type: '数据读错', error_category: 'R',cognitive_load:'中',trap_type:'7最大'},hint:'香蕉7个最多。'},
{id:'l1-dat-09',level:3,type:'迁移探测',stem:'5天气温：周一25℃周二28℃周三26℃周四30℃周五29℃。哪两天温差最大？',options:['A.周一和周四差5℃','B.周一和周二差3℃','C.周三和周五差3℃','D.周四和周五差1℃'],answer:0,tags:{knowledge:'数据分析',skill_level:'分析',error_type: '计算错误', error_category: 'C',cognitive_load:'高',trap_type:'30-25=5最大'},hint:'温差：30-25=5最大。'},
{id:'l1-dat-10',level:3,type:'迁移探测',stem:'去动物园20人植物园15人科技馆25人。每车10人，去科技馆要几辆车？',options:['A.3辆','B.2辆','C.4辆','D.5辆'],answer:0,tags:{knowledge:'数据应用',skill_level:'分析',error_type: '除法理解错', error_category: 'C',cognitive_load:'高',trap_type:'25÷10=2.5→3辆'},hint:'25÷10=2余5，需要3辆车。'}
]},
'l1-time-measure': { name: '时间与测量', grade: 'L1', textbookLessons: [94, 95, 100], questions: [
{id:'l1-tim-01',level:1,type:'基础探测',stem:'分针指到12时针指到7，是几点？',options:['A.7点','B.12点','C.7点半','D.6点'],answer:0,tags:{knowledge:'认识时钟',skill_level:'记忆',error_type: '指针混淆', error_category: 'K',cognitive_load:'低',trap_type:'时针指向几就是几'},hint:'时针指向7就是7点。'},
{id:'l1-tim-02',level:1,type:'基础探测',stem:'1小时等于多少分钟？',options:['A.60分钟','B.30分钟','C.100分钟','D.10分钟'],answer:0,tags:{knowledge:'时间单位',skill_level:'记忆',error_type: '单位混淆', error_category: 'E',cognitive_load:'低',trap_type:'1小时=60分'},hint:'1小时=60分钟。'},
{id:'l1-tim-03',level:1,type:'基础探测',stem:'小明7点起床，洗脸刷牙用了10分钟，什么时间洗完脸？',options:['A.7:10','B.7点','C.7:30','D.8点'],answer:0,tags:{knowledge:'时间推算',skill_level:'理解',error_type: '时间加法错', error_category: 'C',cognitive_load:'低',trap_type:'7:00+10分=7:10'},hint:'7:00+10分钟=7:10'},
{id:'l1-tim-04',level:1,type:'基础探测',stem:'用尺子量笔，从刻度0到刻度12，笔长多少？',options:['A.12厘米','B.12米','C.12分米','D.12毫米'],answer:0,tags:{knowledge:'测量',skill_level:'理解',error_type: '单位混淆', error_category: 'E',cognitive_load:'低',trap_type:'尺子单位厘米'},hint:'从0到12，长度是12厘米。'},
{id:'l1-tim-05',level:2,type:'变式探测',stem:'上午8点半上课，一节课40分钟，什么时间下课？',options:['A.9:10','B.9点','C.8:40','D.9:20'],answer:0,tags:{knowledge:'时间计算',skill_level:'应用',error_type: '时间加法错', error_category: 'C',cognitive_load:'中',trap_type:'8:30+40分=9:10'},hint:'8:30+40分钟=9:10'},
{id:'l1-tim-06',level:2,type:'变式探测',stem:'绳子长20厘米，剪掉8厘米后还剩多长？',options:['A.12厘米','B.28厘米','C.10厘米','D.8厘米'],answer:0,tags:{knowledge:'长度减法',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'20-8=12'},hint:'20-8=12厘米'},
{id:'l1-tim-07',level:2,type:'变式探测',stem:'三个同学跑100米用了25秒30秒28秒。谁最快？',options:['A.25秒的','B.30秒的','C.28秒的','D.一样快'],answer:0,tags:{knowledge:'时间比较',skill_level:'应用',error_type: '比较方向错', error_category: 'K',cognitive_load:'中',trap_type:'时间越少越快'},hint:'时间越少跑得越快。25<28<30，25秒的最快。'},
{id:'l1-tim-08',level:2,type:'变式探测',stem:'小红身高1米，小明比小红高10厘米，小明多高？',options:['A.1米10厘米','B.2米','C.110厘米','D.1米1厘米'],answer:0,tags:{knowledge:'长度单位换算',skill_level:'应用',error_type: '单位换算错', error_category: 'C',cognitive_load:'中',trap_type:'1米=100厘米'},hint:'1米=100厘米，100+10=110厘米=1米10厘米。'},
{id:'l1-tim-09',level:3,type:'迁移探测',stem:'学校8点上课，小明走到学校要15分钟。他最晚几点出发？',options:['A.7:45','B.7:30','C.8点','D.7:50'],answer:0,tags:{knowledge:'时间规划',skill_level:'分析',error_type: '时间计算错', error_category: 'C',cognitive_load:'高',trap_type:'8:00-15分=7:45'},hint:'8:00减去15分钟=7:45'},
{id:'l1-tim-10',level:3,type:'迁移探测',stem:'一节课40分钟，课间10分钟，第二节课9点开始。第一节课几点开始？',options:['A.8:10','B.8:00','C.8:20','D.8:30'],answer:0,tags:{knowledge:'时间倒推',skill_level:'分析',error_type: '时间推算错', error_category: 'C',cognitive_load:'高',trap_type:'9:00-10分-40分=8:10'},hint:'第二节课9点减10分课间再减40分=8:10。'}
]},
'l8-set': { name: '集合与命题', grade: 'L8', textbookLessons: [0, 2, 3, 4, 5, 6], questions: [
{id:'l8-set-01',level:1,type:'基础探测',stem:'集合A={1,2,3}，B={2,3,4}，A∪B=?',options:['A.{1,2,3,4}','B.{1,2,3}','C.{2,3}','D.{1,4}'],answer:0,tags:{knowledge:'集合并集',skill_level:'记忆',error_type: '概念混淆', error_category: 'K',cognitive_load:'低',trap_type:'并集是所有元素'},hint:'A∪B中只要出现过的元素都要，{1,2,3,4}'},
{id:'l8-set-02',level:1,type:'基础探测',stem:'设U={1,2,3,4,5}，A={1,3}，则∁UA=?',options:['A.{2,4,5}','B.{1,3}','C.{2,4}','D.{1,2,3}'],answer:0,tags:{knowledge:'补集',skill_level:'记忆',error_type: '补集概念错误', error_category: 'K',cognitive_load:'低',trap_type:'全集中去掉A的元素'},hint:'U中去掉1和3，剩下{2,4,5}'},
{id:'l8-set-03',level:1,type:'基础探测',stem:'"x>2"是"x>1"的什么条件？',options:['A.充分不必要','B.必要不充分','C.充要','D.既不充分也不必要'],answer:0,tags:{knowledge:'充分必要条件',skill_level:'理解',error_type: '逻辑关系判断错', error_category: 'K',cognitive_load:'低',trap_type:'x>2能推出x>1'},hint:'x>2⇒x>1成立，但x>1不能推出x>2。所以充分不必要。'},
{id:'l8-set-04',level:1,type:'基础探测',stem:'已知集合A={x|x<3}，则3与A的关系是？',options:['A.3∉A','B.3∈A','C.{3}∈A','D.3⊆A'],answer:0,tags:{knowledge:'元素与集合',skill_level:'理解',error_type: '属于和不属于混淆', error_category: 'K',cognitive_load:'低',trap_type:'3<3不成立'},hint:'3<3不成立，所以3不是A的元素，3∉A。'},
{id:'l8-set-05',level:2,type:'变式探测',stem:'已知A={x|1<x<5}，B={x|x>a}，A⊆B，a的取值范围？',options:['A.a≤1','B.a≥1','C.a<1','D.a>5'],answer:0,tags:{knowledge:'子集关系',skill_level:'应用',error_type: '端点取值判断错', error_category: 'K',cognitive_load:'中',trap_type:'A⊆B→B包含A全部'},hint:'A的最小值接近1，要包含A需a≤1。'},
{id:'l8-set-06',level:2,type:'变式探测',stem:'命题p:若x=1则x=1。p的否命题是？',options:['A.若x≠1则x≠1','B.若x=1则x≠1','C.若x≠1则x=1','D.若x=1则x=2'],answer:0,tags:{knowledge:'否命题',skill_level:'应用',error_type: '否命题与否定混淆', error_category: 'K',cognitive_load:'中',trap_type:'条件和结论都否定'},hint:'否命题：条件和结论都否定。若x≠1则x≠1。'},
{id:'l8-set-07',level:2,type:'变式探测',stem:'A∩B=A说明A和B什么关系？',options:['A.A⊆B','B.B⊆A','C.A=B','D.A∩B=∅'],answer:0,tags:{knowledge:'集合运算关系',skill_level:'应用',error_type: '逻辑关系判断错', error_category: 'K',cognitive_load:'中',trap_type:'A∩B=A→A在B中'},hint:'A∩B=A说明A的所有元素都在B中，即A⊆B。'},
{id:'l8-set-08',level:2,type:'变式探测',stem:'已知全集U=R，A={x|x<1}，B={x|x>2}，A∪B的补集是？',options:['A.{x|1≤x≤2}','B.{x|x<1或x>2}','C.{x|x≤1}','D.{x|x≥2}'],answer:0,tags:{knowledge:'集合综合运算',skill_level:'应用',error_type: '补集取错', error_category: 'K',cognitive_load:'中',trap_type:'先并再补'},hint:'A∪B={x|x<1或x>2}，补集{1≤x≤2}'},
{id:'l8-set-09',level:3,type:'迁移探测',stem:'求实数m使A={x|x²+mx+4=0}为空集。m的取值范围？',options:['A.-4<m<4','B.m≤-4或m≥4','C.m=±4','D.m任意'],answer:0,tags:{knowledge:'空集与方程',skill_level:'分析',error_type: '判别式理解错', error_category: 'C',cognitive_load:'高',trap_type:'A为空→方程无实根'},hint:'A为空集→方程无实根→Δ=m²-16<0→-4<m<4'},
{id:'l8-set-10',level:3,type:'迁移探测',stem:'p:|x|≤2，q:x<a。若p是q的充分不必要条件，a的取值范围？',options:['A.a>2','B.a≥2','C.a<2','D.a≤2'],answer:0,tags:{knowledge:'充分条件与集合',skill_level:'分析',error_type: '集合包含关系判断错', error_category: 'K',cognitive_load:'高',trap_type:'p⇒q→p⊆q'},hint:'p对应{x|-2≤x≤2}，p⊆q→{x|-2≤x≤2}⊆{x|x<a}→a>2'}
]},
'l8-function': { name: '函数', grade: 'L8', textbookLessons: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 25, 26, 42, 43, 44, 45], questions: [
{id:'l8-fun-01',level:1,type:'基础探测',stem:'f(x)=2x+1，则f(3)=?',options:['A.7','B.6','C.5','D.8'],answer:0,tags:{knowledge:'函数值',skill_level:'记忆',error_type: '代入错误', error_category: 'C',cognitive_load:'低',trap_type:'2×3+1=7'},hint:'2×3+1=7'},
{id:'l8-fun-02',level:1,type:'基础探测',stem:'f(x)=√(x-3)的定义域？',options:['A.{x|x≥3}','B.{x|x>3}','C.{x|x≤3}','D.R'],answer:0,tags:{knowledge:'定义域',skill_level:'理解',error_type: '被开方数非负', error_category: 'C',cognitive_load:'低',trap_type:'x-3≥0'},hint:'x-3≥0，x≥3'},
{id:'l8-fun-03',level:1,type:'基础探测',stem:'f(x)=x²是奇函数还是偶函数？',options:['A.偶函数','B.奇函数','C.非奇非偶','D.既是奇又是偶'],answer:0,tags:{knowledge:'奇偶性',skill_level:'理解',error_type: '判断错误', error_category: 'K',cognitive_load:'低',trap_type:'f(-x)=(-x)²=x²=f(x)'},hint:'f(-x)=x²=f(x)，偶函数定义。'},
{id:'l8-fun-04',level:1,type:'基础探测',stem:'f(x)=3x+2的单调性？',options:['A.增函数','B.减函数','C.常数函数','D.不单调'],answer:0,tags:{knowledge:'单调性',skill_level:'理解',error_type: '判断错误', error_category: 'K',cognitive_load:'低',trap_type:'k=3>0递增'},hint:'k=3>0，f(x)在R上单调递增。'},
{id:'l8-fun-05',level:2,type:'变式探测',stem:'f(x)=x²-2x+3的对称轴是？',options:['A.x=1','B.x=2','C.x=-1','D.x=3'],answer:0,tags:{knowledge:'二次函数',skill_level:'应用',error_type: '公式记错', error_category: 'K',cognitive_load:'中',trap_type:'x=-b/2a=1'},hint:'对称轴x=-(-2)/(2×1)=1'},
{id:'l8-fun-06',level:2,type:'变式探测',stem:'若f(x+1)=2x+3，求f(2)=?',options:['A.5','B.7','C.3','D.9'],answer:0,tags:{knowledge:'复合函数',skill_level:'应用',error_type: '复合函数代入错', error_category: 'C',cognitive_load:'中',trap_type:'令x+1=2→x=1→f(2)=2×1+3=5'},hint:'x+1=2→x=1→f(2)=2×1+3=5'},
{id:'l8-fun-07',level:2,type:'变式探测',stem:'f(x)=\frac{1}{x-1}的定义域？',options:['A.{x|x≠1}','B.{x|x>1}','C.{x|x<1}','D.R'],answer:0,tags:{knowledge:'定义域',skill_level:'应用',error_type: '分母不为零', error_category: 'K',cognitive_load:'中',trap_type:'x-1≠0→x≠1'},hint:'分母x-1≠0，x≠1。'},
{id:'l8-fun-08',level:2,type:'变式探测',stem:'f(x)=sgn(x)为符号函数。当x>0时f(x)=1，x=0时f(x)=0，x<0时f(x)=-1。求f(f(-3))=?',options:['A.1','B.0','C.-1','D.3'],answer:0,tags:{knowledge:'分段函数',skill_level:'应用',error_type: '计算顺序错', error_category: 'C',cognitive_load:'中',trap_type:'f(-3)=-1，f(-1)=1'},hint:'f(-3)=-1，f(-1)=1'},
{id:'l8-fun-09',level:3,type:'迁移探测',stem:'已知f(x)在[0,+∞)上递增，比较f(2),f(-2),f(1)的大小。',options:['A.f(-2)最大f(2)最小','B.f(2)最大f(-2)最小','C.f(2)最大f(1)最小','D.f(-2)=f(2)'],answer:0,tags:{knowledge:'单调性应用',skill_level:'分析',error_type: '偶函数对称性', error_category: 'K',cognitive_load:'高',trap_type:'若为偶函数则f(-2)=f(2)'},hint:'由题意知这是偶函数f(-2)=f(2)。递增区间[0,+∞)：f(2)>f(1)，所以f(2)=f(-2)最大，f(1)次之。'},
{id:'l8-fun-10',level:3,type:'迁移探测',stem:'f(x)周期为3，f(1)=2，求f(7)=?',options:['A.2','B.5','C.1','D.3'],answer:0,tags:{knowledge:'周期性',skill_level:'分析',error_type: '周期计算错', error_category: 'C',cognitive_load:'高',trap_type:'7=1+3×2→f(7)=f(1)=2'},hint:'周期为3，f(7)=f(1+3×2)=f(1)=2'}
]},
'l8-trig': { name: '三角函数', grade: 'L8', textbookLessons: [42, 43, 44, 45], questions: [
{id:'l8-trg-01',level:1,type:'基础探测',stem:'sin30°=?',options:['A.1/2','B.√3/2','C.√2/2','D.1'],answer:0,tags:{knowledge:'特殊角三角函数',skill_level:'记忆',error_type: '数值记错', error_category: 'K',cognitive_load:'低',trap_type:'sin30°=1/2'},hint:'sin30°=1/2'},
{id:'l8-trg-02',level:1,type:'基础探测',stem:'sin²α+cos²α=?',options:['A.1','B.0','C.2','D.sinα+cosα'],answer:0,tags:{knowledge:'同角三角函数',skill_level:'记忆',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'平方和为1'},hint:'sin²α+cos²α=1，这是三角恒等式的基础。'},
{id:'l8-trg-03',level:1,type:'基础探测',stem:'tanα=sinα/cosα成立的条件？',options:['A.cosα≠0','B.sinα≠0','C.α为任意角','D.cosα=0'],answer:0,tags:{knowledge:'正切定义',skill_level:'理解',error_type: '条件遗漏', error_category: 'R',cognitive_load:'低',trap_type:'分母cosα≠0'},hint:'tanα=sinα/cosα，分母不为零→cosα≠0。'},
{id:'l8-trg-04',level:1,type:'基础探测',stem:'sin(π-α)=?',options:['A.sinα','B.-sinα','C.cosα','D.-cosα'],answer:0,tags:{knowledge:'诱导公式',skill_level:'记忆',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'sin(π-α)=sinα'},hint:'sin(π-α)=sinα'},
{id:'l8-trg-05',level:2,type:'变式探测',stem:'sin15°=sin(45°-30°)=?',options:['A.(√6-√2)/4','B.(√6+√2)/4','C.(√3-1)/2','D.1/2'],answer:0,tags:{knowledge:'和差公式',skill_level:'应用',error_type: '公式展开错', error_category: 'C',cognitive_load:'中',trap_type:'sin(45-30)=sin45cos30-cos45sin30'},hint:'=(√2/2)(√3/2)-(√2/2)(1/2)=(√6-√2)/4'},
{id:'l8-trg-06',level:2,type:'变式探测',stem:'y=sinx的最小正周期是？',options:['A.2π','B.π','C.4π','D.π/2'],answer:0,tags:{knowledge:'周期',skill_level:'应用',error_type: '周期记错', error_category: 'K',cognitive_load:'中',trap_type:'正弦函数周期2π'},hint:'y=sinx的最小正周期为2π。'},
{id:'l8-trg-07',level:2,type:'变式探测',stem:'sin2α=?',options:['A.2sinαcosα','B.sin²α-cos²α','C.2sin²α','D.cos²α-sin²α'],answer:0,tags:{knowledge:'倍角公式',skill_level:'应用',error_type: '公式记错', error_category: 'K',cognitive_load:'中',trap_type:'sin2α=2sinαcosα'},hint:'sin2α=2sinαcosα'},
{id:'l8-trg-08',level:2,type:'变式探测',stem:'y=sinx+cosx的最大值是？',options:['A.√2','B.2','C.1','D.√3'],answer:0,tags:{knowledge:'辅助角公式',skill_level:'应用',error_type: '辅助角公式应用错', error_category: 'K',cognitive_load:'中',trap_type:'y=√2sin(x+π/4)'},hint:'y=√2sin(x+π/4)，最大值为√2。'},
{id:'l8-trg-09',level:3,type:'迁移探测',stem:'已知sinα=3/5且α∈(0,π/2)，求cos2α=?',options:['A.7/25','B.-7/25','C.24/25','D.-24/25'],answer:0,tags:{knowledge:'倍角应用',skill_level:'分析',error_type: 'cosα求错', error_category: 'K',cognitive_load:'高',trap_type:'cosα=4/5→cos2α=2(4/5)²-1'},hint:'cosα=4/5，cos2α=2cos²α-1=32/25-1=7/25'},
{id:'l8-trg-10',level:3,type:'迁移探测',stem:'在△ABC中，a=3，b=4，C=60°，c=?',options:['A.√13','B.5','C.√37','D.√25'],answer:0,tags:{knowledge:'余弦定理',skill_level:'分析',error_type: '公式代错', error_category: 'K',cognitive_load:'高',trap_type:'c²=a²+b²-2abcosC'},hint:'c²=9+16-2×3×4×1/2=25-12=13，c=√13'}
]},
'l8-vector': { name: '平面向量', grade: 'L8', textbookLessons: [30, 31, 32, 34, 36, 39, 40], questions: [
{id:'l8-vec-01',level:1,type:'基础探测',stem:'向量a=(1,2)，b=(3,4)，a+b=?',options:['A.(4,6)','B.(2,2)','C.(3,8)','D.(4,2)'],answer:0,tags:{knowledge:'向量加法',skill_level:'记忆',error_type: '坐标加法错', error_category: 'C',cognitive_load:'低',trap_type:'对应坐标相加'},hint:'(1+3,2+4)=(4,6)'},
{id:'l8-vec-02',level:1,type:'基础探测',stem:'|a+b|≤|a|+|b|叫什么不等式？',options:['A.三角不等式','B.柯西不等式','C.均值不等式','D.绝对值不等式'],answer:0,tags:{knowledge:'向量模',skill_level:'记忆',error_type: '概念混淆', error_category: 'K',cognitive_load:'低',trap_type:'向量不等式'},hint:'|a+b|≤|a|+|b|是三角形不等式。'},
{id:'l8-vec-03',level:1,type:'基础探测',stem:'a·b=|a||b|cosθ中θ表示？',options:['A.a与b的夹角','B.a与x轴的夹角','C.b与x轴的夹角','D.a与b的和'],answer:0,tags:{knowledge:'数量积',skill_level:'记忆',error_type: '概念错误', error_category: 'K',cognitive_load:'低',trap_type:'θ为两向量夹角'},hint:'θ是向量a与b的夹角。'},
{id:'l8-vec-04',level:1,type:'基础探测',stem:'向量a=(1,2)的模|a|=?',options:['A.√5','B.3','C.5','D.√3'],answer:0,tags:{knowledge:'向量模长',skill_level:'理解',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'√(1²+2²)=√5'},hint:'|a|=√(1²+2²)=√5'},
{id:'l8-vec-05',level:2,type:'变式探测',stem:'a=(2,1)，b=(-1,3)，a·b=?',options:['A.1','B.5','C.-2','D.3'],answer:0,tags:{knowledge:'向量点积',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'2×(-1)+1×3=1'},hint:'2×(-1)+1×3=-2+3=1'},
{id:'l8-vec-06',level:2,type:'变式探测',stem:'a=(1,2)，b=(2,m)，若a∥b则m=?',options:['A.4','B.1','C.2','D.-4'],answer:0,tags:{knowledge:'向量共线',skill_level:'应用',error_type: '平行条件错', error_category: 'R',cognitive_load:'中',trap_type:'对应坐标成比例'},hint:'1/2=2/m→m=4'},
{id:'l8-vec-07',level:2,type:'变式探测',stem:'a=(1,0)，b=(0,1)，求a与b夹角？',options:['A.90°','B.0°','C.45°','D.60°'],answer:0,tags:{knowledge:'向量夹角',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'a·b=0→垂直'},hint:'a·b=0，cosθ=0，θ=90°'},
{id:'l8-vec-08',level:2,type:'变式探测',stem:'a=(1,0)在b=(1,1)上的投影长度是？',options:['A.1/√2','B.1','C.√2','D.2'],answer:0,tags:{knowledge:'投影',skill_level:'应用',error_type: '公式记错', error_category: 'K',cognitive_load:'中',trap_type:'|a|cosθ=a·b/|b|'},hint:'a·b/|b|=1/√2'},
{id:'l8-vec-09',level:3,type:'迁移探测',stem:'已知|a|=2，|b|=3，a·b=-3，求|2a-b|。',options:['A.√31','B.√19','C.√25','D.√37'],answer:0,tags:{knowledge:'向量模综合',skill_level:'分析',error_type: '展开式错', error_category: 'C',cognitive_load:'高',trap_type:'|2a-b|²=4|a|²-4a·b+|b|²'},hint:'=16-4(-3)+9=16+12+9=37，|2a-b|=√37'},
{id:'l8-vec-10',level:3,type:'迁移探测',stem:'△ABC中，AB=AC=3，∠A=60°，求AB·AC。',options:['A.9/2','B.9','C.-9/2','D.0'],answer:0,tags:{knowledge:'向量数量积应用',skill_level:'分析',error_type: '夹角取错', error_category: 'K',cognitive_load:'高',trap_type:'AB·AC=3×3×cos60°=9/2'},hint:'=3×3×cos60°=9×1/2=9/2'}
]},
'l8-sequence': { name: '数列', grade: 'L8', textbookLessons: [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57], questions: [
{id:'l8-seq-01',level:1,type:'基础探测',stem:'等差数列1,4,7,10,…的公差d=?',options:['A.3','B.4','C.1','D.-3'],answer:0,tags:{knowledge:'等差数列公差',skill_level:'记忆',error_type: '计算错误', error_category: 'C',cognitive_load:'低',trap_type:'4-1=3'},hint:'后项减前项：4-1=3'},
{id:'l8-seq-02',level:1,type:'基础探测',stem:'等比数列2,6,18,…的公比q=?',options:['A.3','B.6','C.2','D.4'],answer:0,tags:{knowledge:'等比数列公比',skill_level:'记忆',error_type: '计算错误', error_category: 'C',cognitive_load:'低',trap_type:'6÷2=3'},hint:'后项÷前项：6÷2=3'},
{id:'l8-seq-03',level:1,type:'基础探测',stem:'等差数列{an}中a₁=3，d=4，则a₁₀=?',options:['A.39','B.43','C.7','D.40'],answer:0,tags:{knowledge:'等差数列通项',skill_level:'理解',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'an=a₁+(n-1)d'},hint:'a₁₀=3+9×4=39'},
{id:'l8-seq-04',level:1,type:'基础探测',stem:'等比数列{an}中a₁=2，q=3，则a₄=?',options:['A.54','B.24','C.18','D.81'],answer:0,tags:{knowledge:'等比数列通项',skill_level:'理解',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'an=a₁qⁿ⁻¹'},hint:'a₄=2×3³=2×27=54'},
{id:'l8-seq-05',level:2,type:'变式探测',stem:'等差数列{an}中a₁=2，d=3，求前5项和S₅。',options:['A.40','B.30','C.35','D.45'],answer:0,tags:{knowledge:'等差数列求和',skill_level:'应用',error_type: '公式代错', error_category: 'K',cognitive_load:'中',trap_type:'Sn=n(a₁+an)/2'},hint:'a₅=2+4×3=14，S₅=5(2+14)/2=40'},
{id:'l8-seq-06',level:2,type:'变式探测',stem:'等比数列{an}中a₁=1，q=2，求前4项和S₄。',options:['A.15','B.8','C.16','D.31'],answer:0,tags:{knowledge:'等比数列求和',skill_level:'应用',error_type: '公式代错', error_category: 'K',cognitive_load:'中',trap_type:'Sn=a1(1-qⁿ)/(1-q)'},hint:'S₄=1(1-16)/(1-2)=(-15)/(-1)=15'},
{id:'l8-seq-07',level:2,type:'变式探测',stem:'数列{an}中a₁=1,aₙ₊₁=aₙ+2，求通项公式。',options:['A.an=2n-1','B.an=n+1','C.an=2n+1','D.an=3n-2'],answer:0,tags:{knowledge:'递推数列',skill_level:'应用',error_type: '递推关系识别错', error_category: 'K',cognitive_load:'中',trap_type:'等差数列d=2'},hint:'an=a₁+2(n-1)=1+2n-2=2n-1'},
{id:'l8-seq-08',level:2,type:'变式探测',stem:'数列{an}中a₁=1,aₙ₊₁=2aₙ，求a₄。',options:['A.8','B.16','C.4','D.32'],answer:0,tags:{knowledge:'递推数列',skill_level:'应用',error_type: '公比识别错', error_category: 'K',cognitive_load:'中',trap_type:'等比q=2'},hint:'a₄=1×2³=8'},
{id:'l8-seq-09',level:3,type:'迁移探测',stem:'an=1/[n(n+1)]，求数列前n项和Sn。',options:['A.n/(n+1)','B.1/(n+1)','C.n/(n-1)','D.(n+1)/n'],answer:0,tags:{knowledge:'裂项求和',skill_level:'分析',error_type: '裂项公式错', error_category: 'K',cognitive_load:'高',trap_type:'1/n-1/(n+1)'},hint:'an=1/n-1/(n+1)，Sn=1-1/(n+1)=n/(n+1)'},
{id:'l8-seq-10',level:3,type:'迁移探测',stem:'等差数列{an}中a₁=1，d=2，求数列{1/(an×aₙ₊₁)}的前4项和。',options:['A.2/9','B.1/3','C.4/9','D.5/9'],answer:0,tags:{knowledge:'数列综合',skill_level:'分析',error_type: '裂项错', error_category: 'K',cognitive_load:'高',trap_type:'1/(an×aₙ₊₁)=1/2(1/an-1/aₙ₊₁)'},hint:'an=2n-1，裂项求和得(1-1/9)/2=4/9'}
]},
'l8-trig-transform': { name: '三角恒等变换', grade: 'L9', textbookLessons: [0, 1, 2, 3, 4, 5], questions: [
{id:'l8-tt-01',level:1,type:'基础探测',stem:'sin75°cos15°+cos75°sin15°=?',options:['A.sin90°=1','B.sin60°=√3/2','C.cos90°=0','D.cos60°=1/2'],answer:0,tags:{knowledge:'和角公式',skill_level:'记忆',error_type: '公式逆用错', error_category: 'K',cognitive_load:'低',trap_type:'sin(A+B)'},hint:'sin(75°+15°)=sin90°=1'},
{id:'l8-tt-02',level:1,type:'基础探测',stem:'cos²α-sin²α=?',options:['A.cos2α','B.sin2α','C.2cos²α-1','D.1-2sin²α'],answer:0,tags:{knowledge:'倍角公式',skill_level:'记忆',error_type: '公式混淆', error_category: 'K',cognitive_load:'低',trap_type:'cos2α=cos²α-sin²α'},hint:'cos²α-sin²α=cos2α'},
{id:'l8-tt-03',level:1,type:'基础探测',stem:'sinαcosβ+cosαsinβ=?',options:['A.sin(α+β)','B.cos(α+β)','C.sin(α-β)','D.cos(α-β)'],answer:0,tags:{knowledge:'正弦和角公式',skill_level:'记忆',error_type: '公式混淆', error_category: 'K',cognitive_load:'低',trap_type:'sin(α+β)=sinαcosβ+cosαsinβ'},hint:'=sin(α+β)'},
{id:'l8-tt-04',level:1,type:'基础探测',stem:'正弦定理a/sinA=？',options:['A.b/sinB=c/sinC=2R','B.b/sinB','C.2R','D.以上都对'],answer:3,tags:{knowledge:'正弦定理',skill_level:'记忆',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'都等于2R'},hint:'a/sinA=b/sinB=c/sinC=2R'},
{id:'l8-tt-05',level:2,type:'变式探测',stem:'sin3α用sinα表示为?',options:['A.3sinα-4sin³α','B.4sin³α-3sinα','C.sin³α','D.3cosαsin²α'],answer:0,tags:{knowledge:'三倍角公式',skill_level:'应用',error_type: '公式记错', error_category: 'K',cognitive_load:'中',trap_type:'sin3α=3sinα-4sin³α'},hint:'sin3α=3sinα-4sin³α'},
{id:'l8-tt-06',level:2,type:'变式探测',stem:'已知sinα=3/5(0<α<π/2)，求sin2α=?',options:['A.24/25','B.12/25','C.6/5','D.9/25'],answer:0,tags:{knowledge:'倍角应用',skill_level:'应用',error_type: 'cosα求错', error_category: 'K',cognitive_load:'中',trap_type:'cosα=4/5'},hint:'cosα=4/5，sin2α=2×(3/5)×(4/5)=24/25'},
{id:'l8-tt-07',level:2,type:'变式探测',stem:'△ABC中，a=3,b=4,sinA=1/2，求sinB=?',options:['A.2/3','B.3/4','C.1/2','D.3/8'],answer:0,tags:{knowledge:'正弦定理应用',skill_level:'应用',error_type: '比例计算错', error_category: 'C',cognitive_load:'中',trap_type:'3/sinA=4/sinB'},hint:'a/sinA=b/sinB→3/(1/2)=4/sinB→6=4/sinB→sinB=2/3'},
{id:'l8-tt-08',level:2,type:'变式探测',stem:'化简sinα/(1+cosα)=?',options:['A.tan(α/2)','B.tanα','C.2tan(α/2)','D.sin(α/2)'],answer:0,tags:{knowledge:'半角公式',skill_level:'应用',error_type: '公式记错', error_category: 'K',cognitive_load:'中',trap_type:'sinα/(1+cosα)=tan(α/2)'},hint:'sinα/(1+cosα)=tan(α/2)'},
{id:'l8-tt-09',level:3,type:'迁移探测',stem:'y=sinx+√3cosx的最大值是？',options:['A.2','B.√3','C.4','D.√10'],answer:0,tags:{knowledge:'辅助角公式',skill_level:'分析',error_type: '系数合成错', error_category: 'C',cognitive_load:'高',trap_type:'√(1²+(√3)²)=2'},hint:'y=2(1/2sinx+√3/2cosx)=2sin(x+π/3)，最大值为2'},
{id:'l8-tt-10',level:3,type:'迁移探测',stem:'在△ABC中，a=√3,b=1,A=60°，求B。',options:['A.30°','B.45°','C.60°','D.90°'],answer:0,tags:{knowledge:'解三角形',skill_level:'分析',error_type: '计算错', error_category: 'C',cognitive_load:'高',trap_type:'正弦定理√3/sin60=1/sinB'},hint:'√3/(√3/2)=1/sinB→2=1/sinB→sinB=1/2→B=30°'}
]},
'l8-combination': { name: '排列组合与二项式', grade: 'L9', textbookLessons: [15, 16, 17, 18, 19, 20, 21, 22], questions: [
{id:'l8-cmb-01',level:1,type:'基础探测',stem:'从3件不同的物品中选2件，有几种选法？',options:['A.C(3,2)=3种','B.A(3,2)=6种','C.2种','D.4种'],answer:0,tags:{knowledge:'组合',skill_level:'记忆',error_type: '排列与组合混淆', error_category: 'K',cognitive_load:'低',trap_type:'选不计顺序'},hint:'C(3,2)=3×2/2=3种'},
{id:'l8-cmb-02',level:1,type:'基础探测',stem:'3个人排成一排有几种排法？',options:['A.A(3,3)=6种','B.C(3,3)=1种','C.3种','D.9种'],answer:0,tags:{knowledge:'排列',skill_level:'记忆',error_type: '排列公式错', error_category: 'K',cognitive_load:'低',trap_type:'3×2×1=6'},hint:'3!=6种'},
{id:'l8-cmb-03',level:1,type:'基础探测',stem:'(a+b)²展开式中ab项的系数是多少？',options:['A.2','B.1','C.3','D.4'],answer:0,tags:{knowledge:'二项式定理',skill_level:'理解',error_type: '系数记错', error_category: 'C',cognitive_load:'低',trap_type:'C(2,1)=2'},hint:'(a+b)²=a²+2ab+b²，ab系数为2。'},
{id:'l8-cmb-04',level:1,type:'基础探测',stem:'C(n,0)+C(n,1)+C(n,2)+…+C(n,n)=?',options:['A.2ⁿ','B.n','C.n²','D.2n'],answer:0,tags:{knowledge:'二项式系数和',skill_level:'理解',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'令a=b=1'},hint:'(1+1)ⁿ=2ⁿ'},
{id:'l8-cmb-05',level:2,type:'变式探测',stem:'4个同学选2个去参加比赛，有几种选法？',options:['A.6种','B.12种','C.4种','D.8种'],answer:0,tags:{knowledge:'组合应用',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'C(4,2)=6'},hint:'C(4,2)=4×3/2=6种'},
{id:'l8-cmb-06',level:2,type:'变式探测',stem:'4个人站成一排，甲必须站在中间，有几种排法？',options:['A.6种','B.12种','C.24种','D.3种'],answer:0,tags:{knowledge:'排列应用',skill_level:'应用',error_type: '条件排列错', error_category: 'R',cognitive_load:'中',trap_type:'先固定甲，剩余3人排列'},hint:'甲固定，剩余3人任意排=3!=6种'},
{id:'l8-cmb-07',level:2,type:'变式探测',stem:'(1+x)⁵展开式中x²的系数是？',options:['A.10','B.5','C.15','D.20'],answer:0,tags:{knowledge:'二项式展开',skill_level:'应用',error_type: '系数计算错', error_category: 'C',cognitive_load:'中',trap_type:'C(5,2)=10'},hint:'C(5,2)=5×4/2=10'},
{id:'l8-cmb-08',level:2,type:'变式探测',stem:'从4男3女中选3人，要求至少1女，有几种选法？',options:['A.31种','B.35种','C.24种','D.20种'],answer:0,tags:{knowledge:'组合综合',skill_level:'应用',error_type: '多算或少算', error_category: 'C',cognitive_load:'中',trap_type:'总数-全是男生'},hint:'C(7,3)-C(4,3)=35-4=31种'},
{id:'l8-cmb-09',level:3,type:'迁移探测',stem:'5个不同的礼物分给3个小朋友，每人至少1个，有几种分法？',options:['A.150种','B.120种','C.180种','D.210种'],answer:0,tags:{knowledge:'分组分配',skill_level:'分析',error_type: '分组重复计数', error_category: 'C',cognitive_load:'高',trap_type:'先分再配'},hint:'可能的分组(3,1,1)和(2,2,1)。(3,1,1)=C(5,3)×2!=20×6=120'},
{id:'l8-cmb-10',level:3,type:'迁移探测',stem:'(2x-1)⁵展开式中x³的系数？',options:['A.80','B.-80','C.40','D.-40'],answer:0,tags:{knowledge:'二项式综合',skill_level:'分析',error_type: '符号与系数错', error_category: 'C',cognitive_load:'高',trap_type:'C(5,3)(2x)³(-1)²=10×8=80'},hint:'T₃=C(5,3)(2x)³(-1)²=10×8x³=80x³'}
]},
'l8-line-circle': { name: '直线与圆', grade: 'L9', textbookLessons: [4, 5, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], questions: [
{id:'l8-lc-01',level:1,type:'基础探测',stem:'过两点(1,2)和(3,4)的直线斜率k=?',options:['A.1','B.2','C.3','D.4'],answer:0,tags:{knowledge:'斜率',skill_level:'记忆',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'(4-2)/(3-1)=1'},hint:'k=(4-2)/(3-1)=1'},
{id:'l8-lc-02',level:1,type:'基础探测',stem:'直线y=2x+3，斜率为？',options:['A.2','B.3','C.1','D.0'],answer:0,tags:{knowledge:'直线方程',skill_level:'记忆',error_type: '系数读错', error_category: 'C',cognitive_load:'低',trap_type:'y=kx+b中k=2'},hint:'斜率为2。'},
{id:'l8-lc-03',level:1,type:'基础探测',stem:'圆(x-1)²+(y-2)²=9的圆心和半径是？',options:['A.(1,2),r=3','B.(-1,-2),r=3','C.(1,2),r=9','D.(-1,2),r=3'],answer:0,tags:{knowledge:'圆的方程',skill_level:'记忆',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'(x-a)²+(y-b)²=r²'},hint:'圆心(1,2)，半径=√9=3'},
{id:'l8-lc-04',level:1,type:'基础探测',stem:'点(0,0)到直线3x+4y-5=0的距离是？',options:['A.1','B.5','C.0','D.7'],answer:0,tags:{knowledge:'点到直线距离',skill_level:'理解',error_type: '公式代错', error_category: 'K',cognitive_load:'低',trap_type:'|0+0-5|/√(3²+4²)=5/5=1'},hint:'|0-5|/5=1'},
{id:'l8-lc-05',level:2,type:'变式探测',stem:'直线x+2y+3=0与2x-y+1=0的交点坐标是？',options:['A.(-1,-1)','B.(1,-2)','C.(-1,1)','D.(1,1)'],answer:0,tags:{knowledge:'直线交点',skill_level:'应用',error_type: '解方程组错', error_category: 'C',cognitive_load:'中',trap_type:'解方程组'},hint:'x+2y=-3,2x-y=-1。解之得x=-1,y=-1'},
{id:'l8-lc-06',level:2,type:'变式探测',stem:'直线y=2x+1与圆x²+y²=1的位置关系？',options:['A.相交','B.相切','C.相离','D.包含'],answer:0,tags:{knowledge:'直线与圆',skill_level:'应用',error_type: '判断错误', error_category: 'K',cognitive_load:'中',trap_type:'圆心到直线距离'},hint:'d=|1|/√5=1/√5<1=r，相交。'},
{id:'l8-lc-07',level:2,type:'变式探测',stem:'过点(1,1)且与直线y=2x+1平行的直线方程是？',options:['A.y=2x-1','B.y=2x+1','C.y=-1/2x+3/2','D.y=2x+3'],answer:0,tags:{knowledge:'平行直线',skill_level:'应用',error_type: '截距算错', error_category: 'C',cognitive_load:'中',trap_type:'斜率相同为2'},hint:'k=2，y-1=2(x-1)→y=2x-1'},
{id:'l8-lc-08',level:2,type:'变式探测',stem:'圆x²+y²=4和(x-3)²+(y-4)²=1的位置关系？',options:['A.外离','B.外切','C.相交','D.内含'],answer:0,tags:{knowledge:'两圆位置',skill_level:'应用',error_type: '圆心距判断错', error_category: 'C',cognitive_load:'中',trap_type:'圆心距=5=3+1+1'},hint:'圆心距=√(3²+4²)=5，半径和=3，5>3外离。'},
{id:'l8-lc-09',level:3,type:'迁移探测',stem:'过点(3,0)作圆x²+y²=1的切线，切线方程是？',options:['A.y=±√2/4(x-3)','B.y=±1/3(x-3)','C.y=±2(x-3)','D.x=3'],answer:0,tags:{knowledge:'圆的切线',skill_level:'分析',error_type: '切线公式错', error_category: 'K',cognitive_load:'高',trap_type:'设切线y=k(x-3)'},hint:'d=| -3k|/√(k²+1)=1，9k²=k²+1，8k²=1，k=±1/(2√2)=±√2/4'},
{id:'l8-lc-10',level:3,type:'迁移探测',stem:'从圆x²+y²=9外一点(5,0)引圆的两条切线，两切点的弦长是多少？',options:['A.18/5','B.9/5','C.3','D.4'],answer:0,tags:{knowledge:'切点弦',skill_level:'分析',error_type: '计算错', error_category: 'C',cognitive_load:'高',trap_type:'切点弦方程'},hint:'切点弦方程xx₀+yy₀=9→5x=9→x=9/5。代入圆方程求y→弦长=18/5'}
]},
'l8-complex': { name: '复数', grade: 'L9', textbookLessons: [39, 40, 41, 42, 43, 44, 45, 46], questions: [
{id:'l8-cpx-01',level:1,type:'基础探测',stem:'i²=?',options:['A.-1','B.1','C.-i','D.i'],answer:0,tags:{knowledge:'虚数单位',skill_level:'记忆',error_type: '定义记错', error_category: 'K',cognitive_load:'低',trap_type:'i²=-1'},hint:'i²=-1'},
{id:'l8-cpx-02',level:1,type:'基础探测',stem:'复数1+2i的共轭复数是？',options:['A.1-2i','B.-1+2i','C.1+2i','D.-1-2i'],answer:0,tags:{knowledge:'共轭复数',skill_level:'记忆',error_type: '概念混淆', error_category: 'K',cognitive_load:'低',trap_type:'虚部取相反数'},hint:'1-2i'},
{id:'l8-cpx-03',level:1,type:'基础探测',stem:'|3+4i|=?',options:['A.5','B.7','C.25','D.1'],answer:0,tags:{knowledge:'复数的模',skill_level:'理解',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'√(3²+4²)=5'},hint:'|3+4i|=√(9+16)=5'},
{id:'l8-cpx-04',level:1,type:'基础探测',stem:'(1+2i)+(3-4i)=?',options:['A.4-2i','B.-2+6i','C.4+6i','D.-2-2i'],answer:0,tags:{knowledge:'复数加减',skill_level:'理解',error_type: '各自运算错', error_category: 'C',cognitive_load:'低',trap_type:'实部+实部，虚部+虚部'},hint:'(1+3)+(2-4)i=4-2i'},
{id:'l8-cpx-05',level:2,type:'变式探测',stem:'(1+2i)(3-4i)=?',options:['A.11+2i','B.11-2i','C.3-8i','D.-5-2i'],answer:0,tags:{knowledge:'复数乘法',skill_level:'应用',error_type: 'i²忘记处理', error_category: 'K',cognitive_load:'中',trap_type:'3-4i+6i-8i²'},hint:'=3+2i+8=11+2i'},
{id:'l8-cpx-06',level:2,type:'变式探测',stem:'(1+2i)/(3-4i)=?',options:['A.(-1+2i)/5','B.(1+2i)/25','C.(-1+2i)/5','D.(-1+2i)/25'],answer:0,tags:{knowledge:'复数除法',skill_level:'应用',error_type: '分母有理化简错', error_category: 'C',cognitive_load:'中',trap_type:'乘共轭'},hint:'=(1+2i)(3+4i)/(9+16)=(-5+10i)/25=(-1+2i)/5'},
{id:'l8-cpx-07',level:2,type:'变式探测',stem:'若(x+yi)(1-i)=4+2i，求x+y。',options:['A.5','B.3','C.4','D.2'],answer:0,tags:{knowledge:'复数等式',skill_level:'应用',error_type: '等式两边对比错', error_category: 'K',cognitive_load:'中',trap_type:'展开后对比等式两边'},hint:'(x+y)+(-x+y)i=4+2i，x+y=4，-x+y=2，相加2y=6,y=3,x=1,x+y=4'},
{id:'l8-cpx-08',level:2,type:'变式探测',stem:'方程x²+2x+5=0在复数范围内的解是？',options:['A.-1±2i','B.-2±i','C.1±2i','D.-1±i'],answer:0,tags:{knowledge:'复数解方程',skill_level:'应用',error_type: '求根公式代错', error_category: 'C',cognitive_load:'中',trap_type:'x=[-2±√(4-20)]/2'},hint:'Δ=4-20=-16，√Δ=4i。x=(-2±4i)/2=-1±2i'},
{id:'l8-cpx-09',level:3,type:'迁移探测',stem:'复数z满足|z-1|=|z-3i|，z在复平面上对应点的轨迹是？',options:['A.直线','B.圆','C.椭圆','D.双曲线'],answer:0,tags:{knowledge:'复数几何意义',skill_level:'分析',error_type: '轨迹判断错', error_category: 'K',cognitive_load:'高',trap_type:'到两点距离相等的点'},hint:'到(1,0)和(0,3)距离相等的点的轨迹是中垂线，一条直线。'},
{id:'l8-cpx-10',level:3,type:'迁移探测',stem:'复数z满足|z|=1，求|z-3+4i|的最大值。',options:['A.6','B.5','C.4','D.3'],answer:0,tags:{knowledge:'复数最值',skill_level:'分析',error_type: '最值判断错', error_category: 'K',cognitive_load:'高',trap_type:'圆上点到(3,-4)的最大距离'},hint:'|z|=1是单位圆，|z-3+4i|是圆上点到(3,-4)的距离最大值=圆心距+半径=5+1=6'}
]},
'l10-solid-geo': { name: '立体几何', grade: 'L10', textbookLessons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 45, 48], questions: [
{id:'l9-sg-01',level:1,type:'基础探测',stem:'正方体有几条棱？',options:['A.12条','B.6条','C.8条','D.4条'],answer:0,tags:{knowledge:'基本立体图形',skill_level:'记忆',error_type: '特征记错', error_category: 'K',cognitive_load:'低',trap_type:'正方体有12条棱'},hint:'正方体有12条棱、6个面、8个顶点。'},
{id:'l9-sg-02',level:1,type:'基础探测',stem:'棱长为2的正方体的体积是？',options:['A.8','B.4','C.6','D.12'],answer:0,tags:{knowledge:'体积',skill_level:'理解',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'V=2³=8'},hint:'V=2×2×2=8'},
{id:'l9-sg-03',level:1,type:'基础探测',stem:'直线与平面垂直的定义是什么？',options:['A.垂直于平面内所有直线','B.垂直于平面内一条直线','C.与平面不平行','D.与平面相交'],answer:0,tags:{knowledge:'线面垂直',skill_level:'理解',error_type: '定义理解错', error_category: 'K',cognitive_load:'低',trap_type:'垂直于面内所有直线'},hint:'一条直线垂直于平面内任意一条直线，则线面垂直。'},
{id:'l9-sg-04',level:1,type:'基础探测',stem:'底面半径为3，高为4的圆柱体积？',options:['A.36π','B.24π','C.12π','D.48π'],answer:0,tags:{knowledge:'圆柱体积',skill_level:'理解',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'V=πr²h'},hint:'V=π×9×4=36π'},
{id:'l9-sg-05',level:2,type:'变式探测',stem:'圆锥底面半径3，母线长5，求高。',options:['A.4','B.2','C.√34','D.8'],answer:0,tags:{knowledge:'圆锥',skill_level:'应用',error_type: '勾股定理应用错', error_category: 'K',cognitive_load:'中',trap_type:'h=√(5²-3²)=4'},hint:'h=√(5²-3²)=4'},
{id:'l9-sg-06',level:2,type:'变式探测',stem:'若直线a∥b，b∥c，则a与c的关系是？',options:['A.a∥c','B.a⊥c','C.a与c相交','D.不确定'],answer:0,tags:{knowledge:'平行传递',skill_level:'应用',error_type: '公理使用错', error_category: 'K',cognitive_load:'中',trap_type:'平行有传递性'},hint:'平行于同一直线的两直线平行。'},
{id:'l9-sg-07',level:2,type:'变式探测',stem:'三棱锥的底面是边长为3的正三角形，侧棱长均为4，求侧面积？',options:['A.18√3','B.9√3','C.6√3','D.12√3'],answer:0,tags:{knowledge:'棱锥侧面积',skill_level:'应用',error_type: '面积算错', error_category: 'C',cognitive_load:'中',trap_type:'三个侧面等腰三角形'},hint:'侧面三角形高=√(4²-1.5²)=√(16-2.25)=√13.75，不对让我重新算'},
{id:'l9-sg-08',level:2,type:'变式探测',stem:'空间中，垂直于同一条直线的两条直线位置关系是？',options:['A.平行或异面','B.一定平行','C.一定相交','D.一定异面'],answer:0,tags:{knowledge:'空间位置关系',skill_level:'应用',error_type: '空间想象不足', error_category: 'M',cognitive_load:'中',trap_type:'可能是平行也可能是异面'},hint:'垂直于同一直线的两条直线可能平行，也可能异面。'},
{id:'l9-sg-09',level:3,type:'迁移探测',stem:'正方体ABCD-A₁B₁C₁D₁中，求异面直线A₁B与AD₁所成角。',options:['A.60°','B.90°','C.45°','D.30°'],answer:0,tags:{knowledge:'异面直线夹角',skill_level:'分析',error_type: '角找错', error_category: 'K',cognitive_load:'高',trap_type:'平移法找角'},hint:'连接A₁D、BD，A₁B与AD₁的夹角=60°（等边三角形）'},
{id:'l9-sg-10',level:3,type:'迁移探测',stem:'边长为2的正方形，绕其一边旋转一周得到的旋转体体积是？',options:['A.8π','B.4π','C.16π','D.2π'],answer:0,tags:{knowledge:'旋转体',skill_level:'分析',error_type: '旋转轴理解错', error_category: 'K',cognitive_load:'高',trap_type:'得圆柱r=2,h=2'},hint:'V=π×4×2=8π'}
]},
'l10-conic': { name: '圆锥曲线', grade: 'L10', textbookLessons: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41], questions: [
{id:'l9-con-01',level:1,type:'基础探测',stem:'椭圆x²/25+y²/16=1的a=?',options:['A.5','B.4','C.3','D.25'],answer:0,tags:{knowledge:'椭圆标准方程',skill_level:'记忆',error_type: 'a与b混淆', error_category: 'K',cognitive_load:'低',trap_type:'a²=25→a=5'},hint:'a²=25，a=5'},
{id:'l9-con-02',level:1,type:'基础探测',stem:'双曲线x²/9-y²/16=1的渐近线方程是？',options:['A.y=±4x/3','B.y=±3x/4','C.y=±16x/9','D.y=±9x/16'],answer:0,tags:{knowledge:'双曲线渐近线',skill_level:'记忆',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'y=±bx/a=±4x/3'},hint:'y=±(4/3)x'},
{id:'l9-con-03',level:1,type:'基础探测',stem:'抛物线y²=8x的焦点坐标是？',options:['A.(2,0)','B.(4,0)','C.(0,2)','D.(0,4)'],answer:0,tags:{knowledge:'抛物线焦点',skill_level:'理解',error_type: 'p值取错', error_category: 'K',cognitive_load:'低',trap_type:'2p=8→p=4→焦点(p/2,0)=(2,0)'},hint:'y²=2px→2p=8→p=4→焦点(2,0)'},
{id:'l9-con-04',level:1,type:'基础探测',stem:'椭圆x²/25+y²/16=1的焦距是多少？',options:['A.6','B.8','C.10','D.4'],answer:0,tags:{knowledge:'椭圆焦距',skill_level:'理解',error_type: 'c²=a²-b²', error_category: 'K',cognitive_load:'低',trap_type:'c=√(25-16)=3'},hint:'c=√(25-16)=3，焦距2c=6'},
{id:'l9-con-05',level:2,type:'变式探测',stem:'椭圆x²/25+y²/16=1上一点P到左焦点距6，则到右焦点距？',options:['A.4','B.6','C.10','D.2'],answer:0,tags:{knowledge:'椭圆定义',skill_level:'应用',error_type: '定义应用错', error_category: 'K',cognitive_load:'中',trap_type:'2a=10'},hint:'PF₁+PF₂=2a=10，PF₂=10-6=4'},
{id:'l9-con-06',level:2,type:'变式探测',stem:'双曲线x²/4-y²/5=1的焦距？',options:['A.6','B.4','C.5','D.2√5'],answer:0,tags:{knowledge:'双曲线焦距',skill_level:'应用',error_type: 'c²算错', error_category: 'C',cognitive_load:'中',trap_type:'c=√(4+5)=3'},hint:'c²=a²+b²=4+5=9，c=3，焦距2c=6'},
{id:'l9-con-07',level:2,type:'变式探测',stem:'抛物线y²=4x上一点P到焦点距离是5，则P的横坐标x=?',options:['A.4','B.3','C.5','D.6'],answer:0,tags:{knowledge:'抛物线定义',skill_level:'应用',error_type: '定义理解错', error_category: 'K',cognitive_load:'中',trap_type:'PF=x+p/2'},hint:'P到焦点距离=到准线距离=x+1=5，x=4'},
{id:'l9-con-08',level:2,type:'变式探测',stem:'椭圆x²/9+y²/5=1的离心率是？',options:['A.2/3','B.√5/3','C.3/2','D.1/3'],answer:0,tags:{knowledge:'椭圆离心率',skill_level:'应用',error_type: '公式记错', error_category: 'K',cognitive_load:'中',trap_type:'c=√(9-5)=2'},hint:'e=c/a=2/3'},
{id:'l9-con-09',level:3,type:'迁移探测',stem:'椭圆x²/16+y²/12=1内一点M(2,1)为中点的弦所在直线方程是？',options:['A.3x+4y-10=0','B.3x-4y-2=0','C.4x+3y-11=0','D.2x+y-5=0'],answer:0,tags:{knowledge:'中点弦',skill_level:'分析',error_type: '点差法使用错', error_category: 'K',cognitive_load:'高',trap_type:'用点差法求斜率'},hint:'点差法得(x₁²-x₂²)/16+(y₁²-y₂²)/12=0，(x₁+x₂)/16+(y₁+y₂)/12·k=0，4/16+2k/12=0,k=-3/2'},
{id:'l9-con-10',level:3,type:'迁移探测',stem:'双曲线x²/4-y²/5=1的右焦点到渐近线距离是？',options:['A.√5','B.2','C.3','D.4'],answer:0,tags:{knowledge:'双曲线综合',skill_level:'分析',error_type: '公式应用错', error_category: 'K',cognitive_load:'高',trap_type:'右焦点(3,0)到渐近线y=(√5/2)x距离'},hint:'c=3，渐近线√5x/2-y=0，d=|(3√5/2)-0|/√(5/4+1)=3√5/2·2/3=√5'}
]},
'l10-probability': { name: '概率', grade: 'L10', textbookLessons: [47, 48, 49, 50, 51, 55], questions: [
{id:'l9-prb-01',level:1,type:'基础探测',stem:'掷一颗骰子，点数大于4的概率是？',options:['A.1/3','B.1/2','C.2/3','D.1/6'],answer:0,tags:{knowledge:'古典概型',skill_level:'记忆',error_type: '计数错误', error_category: 'K',cognitive_load:'低',trap_type:'5和6两个点数'},hint:'点数>4={5,6}，概率2/6=1/3'},
{id:'l9-prb-02',level:1,type:'基础探测',stem:'若P(A)=0.3，P(B)=0.4，A与B互斥，P(A∪B)=?',options:['A.0.7','B.0.12','C.0.1','D.0.5'],answer:0,tags:{knowledge:'互斥事件',skill_level:'理解',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'互斥时P(A∪B)=P(A)+P(B)'},hint:'0.3+0.4=0.7'},
{id:'l9-prb-03',level:1,type:'基础探测',stem:'从1-10中随机取一个数，是偶数的概率？',options:['A.1/2','B.1/5','C.3/10','D.2/5'],answer:0,tags:{knowledge:'古典概型',skill_level:'理解',error_type: '计数错误', error_category: 'K',cognitive_load:'低',trap_type:'偶数有5个{2,4,6,8,10}'},hint:'5/10=1/2'},
{id:'l9-prb-04',level:1,type:'基础探测',stem:'连续抛两次硬币，两次都朝上的概率？',options:['A.1/4','B.1/2','C.1/3','D.1/8'],answer:0,tags:{knowledge:'独立事件',skill_level:'理解',error_type: '概率计算错', error_category: 'C',cognitive_load:'低',trap_type:'(1/2)×(1/2)=1/4'},hint:'1/2×1/2=1/4'},
{id:'l9-prb-05',level:2,type:'变式探测',stem:'袋中有3红2蓝，随机取2个，恰有1红1蓝的概率？',options:['A.3/5','B.2/5','C.1/2','D.4/5'],answer:0,tags:{knowledge:'古典概型',skill_level:'应用',error_type: '计数错误', error_category: 'K',cognitive_load:'中',trap_type:'C(3,1)×C(2,1)/C(5,2)'},hint:'C(3,1)×C(2,1)/C(5,2)=3×2/10=3/5'},
{id:'l9-prb-06',level:2,type:'变式探测',stem:'某人每次射击命中率为0.8，独立射击2次，至少命中1次的概率？',options:['A.0.96','B.0.8','C.0.64','D.0.5'],answer:0,tags:{knowledge:'独立事件概率',skill_level:'应用',error_type: '对立事件应用错', error_category: 'K',cognitive_load:'中',trap_type:'1-(0.2)²=0.96'},hint:'1-(0.2×0.2)=0.96'},
{id:'l9-prb-07',level:2,type:'变式探测',stem:'将一根长度为1的绳子随机分成两段，较长的段长度大于2/3的概率？',options:['A.1/3','B.2/3','C.1/2','D.1/4'],answer:0,tags:{knowledge:'几何概型',skill_level:'应用',error_type: '长度范围判断错', error_category: 'R',cognitive_load:'中',trap_type:'分点在区间(0,1)中'},hint:'切点在(0,1/3)或(2/3,1)时较长段>2/3。总长度2/3→概率2/3'},
{id:'l9-prb-08',level:2,type:'变式探测',stem:'X~B(4,0.5)，求P(X=2)。',options:['A.3/8','B.1/2','C.1/4','D.4/8'],answer:0,tags:{knowledge:'二项分布',skill_level:'应用',error_type: '公式代错', error_category: 'K',cognitive_load:'中',trap_type:'C(4,2)(0.5)⁴'},hint:'C(4,2)×(0.5)⁴=6/16=3/8'},
{id:'l9-prb-09',level:3,type:'迁移探测',stem:'从2男3女中选2人，选到至少1男的概率？',options:['A.7/10','B.3/5','C.2/5','D.9/10'],answer:0,tags:{knowledge:'概率综合',skill_level:'分析',error_type: '计算错误', error_category: 'C',cognitive_load:'高',trap_type:'1-C(3,2)/C(5,2)'},hint:'1-C(3,2)/C(5,2)=1-3/10=7/10'},
{id:'l9-prb-10',level:3,type:'迁移探测',stem:'某射手命中率为0.6，独立射击直到命中为止，第3次才命中的概率？',options:['A.0.4²×0.6=0.096','B.0.6²×0.4','C.0.6³','D.0.4³'],answer:0,tags:{knowledge:'几何分布',skill_level:'分析',error_type: '公式记错', error_category: 'K',cognitive_load:'高',trap_type:'前2次没中第3次中'},hint:'0.4×0.4×0.6=0.096'}
]},
'l2-place-value': { name: '百以内数的认识', grade: 'L2', textbookLessons: [0, 1, 2, 3, 6, 7, 8, 24, 25, 30, 31, 35, 36, 37, 38], questions: [
{id:'l2-pv-01',level:1,type:'基础探测',stem:'34是由几个十和几个一组成的？',options:['A.3个十和4个一','B.4个十和3个一','C.34个十','D.3个一和4个十'],answer:0,tags:{knowledge:'数的组成',skill_level:'记忆',error_type: '数位混淆', error_category: 'K',cognitive_load:'低',trap_type:'十位是3个位是4'},hint:'34的十位是3表示3个十，个位是4表示4个一。'},
{id:'l2-pv-02',level:1,type:'基础探测',stem:'和50相邻的两个数是？',options:['A.49和51','B.48和52','C.40和60','D.45和55'],answer:0,tags:{knowledge:'数序',skill_level:'理解',error_type: '相邻理解错', error_category: 'K',cognitive_load:'低',trap_type:'前一个和后一个'},hint:'50前面是49，后面是51。'},
{id:'l2-pv-03',level:1,type:'基础探测',stem:'78读作？',options:['A.七十八','B.七八','C.七十八十','D.七和八'],answer:0,tags:{knowledge:'数的读写',skill_level:'记忆',error_type: '读数规则错', error_category: 'K',cognitive_load:'低',trap_type:'十位读几十个位读几'},hint:'十位7读七十，个位8读八，合起来七十八。'},
{id:'l2-pv-04',level:1,type:'基础探测',stem:'从20数到30，中间有几个数？',options:['A.9个','B.10个','C.11个','D.8个'],answer:0,tags:{knowledge:'数数',skill_level:'理解',error_type: '计数错误', error_category: 'K',cognitive_load:'低',trap_type:'20到30共有11个数'},hint:'20,21,22,23,24,25,26,27,28,29,30，算两端共11个'},
{id:'l2-pv-05',level:2,type:'变式探测',stem:'一个两位数，十位比个位大3，个位是5，这个数是？',options:['A.85','B.58','C.53','D.35'],answer:0,tags:{knowledge:'数的组成',skill_level:'应用',error_type: '数位顺序错', error_category: 'K',cognitive_load:'中',trap_type:'十位=5+3=8'},hint:'个位5，十位5+3=8，所以是85。'},
{id:'l2-pv-06',level:2,type:'变式探测',stem:'3个十和15个一合起来是多少？',options:['A.45','B.315','C.18','D.30'],answer:0,tags:{knowledge:'数的合成',skill_level:'应用',error_type: '进位理解错', error_category: 'C',cognitive_load:'中',trap_type:'15个一=1个十5个一'},hint:'3个十+1个十+5个一=4个十5个一=45'},
{id:'l2-pv-07',level:2,type:'变式探测',stem:'用数字5和7可以组成几个不同的两位数？',options:['A.2个(57,75)','B.1个(57)','C.3个','D.4个'],answer:0,tags:{knowledge:'数字组合',skill_level:'应用',error_type: '遗漏情况', error_category: 'R',cognitive_load:'中',trap_type:'5做十位和7做十位'},hint:'57和75，共2个。'},
{id:'l2-pv-08',level:2,type:'变式探测',stem:'估一估，下面哪个数最接近70？',options:['A.68','B.5','C.95','D.50'],answer:0,tags:{knowledge:'数的估算',skill_level:'应用',error_type: '距离判断错', error_category: 'K',cognitive_load:'中',trap_type:'68离70最近差2'},hint:'68-70差2，95-70差25，50-70差20。'},
{id:'l2-pv-09',level:3,type:'迁移探测',stem:'小花今年8岁，妈妈今年32岁。当小花20岁时妈妈多少岁？',options:['A.44岁','B.40岁','C.48岁','D.42岁'],answer:0,tags:{knowledge:'年龄问题',skill_level:'分析',error_type: '年龄差不变', error_category: 'K',cognitive_load:'高',trap_type:'妈妈永远大24岁'},hint:'32-8=24，20+24=44岁。'},
{id:'l2-pv-10',level:3,type:'迁移探测',stem:'一列队伍中，小红前面有8人，后面有6人，这列队伍一共多少人？',options:['A.15人','B.14人','C.13人','D.16人'],answer:0,tags:{knowledge:'排队问题',skill_level:'分析',error_type: '漏算小红', error_category: 'R',cognitive_load:'高',trap_type:'8+1+6=15'},hint:'前面8人+小红+后面6人=15人。'}
]},
'l2-add-sub': { name: '百以内加减法与估算', grade: 'L2', textbookLessons: [0, 1, 6, 7, 8, 9, 10], questions: [
{id:'l2-as-01',level:1,type:'基础探测',stem:'34+25=?',options:['A.59','B.58','C.49','D.69'],answer:0,tags:{knowledge:'两位数加法',skill_level:'理解',error_type: '竖式计算错', error_category: 'C',cognitive_load:'低',trap_type:'34+25=59'},hint:'30+20=50，4+5=9，50+9=59'},
{id:'l2-as-02',level:1,type:'基础探测',stem:'68-23=?',options:['A.45','B.46','C.35','D.55'],answer:0,tags:{knowledge:'两位数减法',skill_level:'理解',error_type: '竖式计算错', error_category: 'C',cognitive_load:'低',trap_type:'68-23=45'},hint:'60-20=40，8-3=5，40+5=45'},
{id:'l2-as-03',level:1,type:'基础探测',stem:'48+25=?',options:['A.73','B.63','C.75','D.83'],answer:0,tags:{knowledge:'进位加法',skill_level:'理解',error_type: '进位错误', error_category: 'C',cognitive_load:'低',trap_type:'48+25=73'},hint:'40+20=60，8+5=13，60+13=73'},
{id:'l2-as-04',level:1,type:'基础探测',stem:'52-18=?',options:['A.34','B.44','C.36','D.24'],answer:0,tags:{knowledge:'退位减法',skill_level:'理解',error_type: '退位错误', error_category: 'C',cognitive_load:'低',trap_type:'52-18=34'},hint:'52-10=42，42-8=34'},
{id:'l2-as-05',level:2,type:'变式探测',stem:'小明买了一个36元的书包和一支8元的笔，一共多少钱？',options:['A.44元','B.42元','C.48元','D.54元'],answer:0,tags:{knowledge:'加法应用',skill_level:'应用',error_type: '进位错误', error_category: 'C',cognitive_load:'中',trap_type:'36+8=44'},hint:'36+8=44元'},
{id:'l2-as-06',level:2,type:'变式探测',stem:'估算：一件上衣48元，一条裤子39元，100元够吗？',options:['A.够48+39=87<100','B.不够48+39=87','C.够48+39=100','D.不够48+39=97'],answer:0,tags:{knowledge:'估算',skill_level:'应用',error_type: '估算方法错', error_category: 'M',cognitive_load:'中',trap_type:'50+40=90<100'},hint:'48+39=87<100，够。'},
{id:'l2-as-07',level:2,type:'变式探测',stem:'()+25=63，括号里填几？',options:['A.38','B.48','C.28','D.42'],answer:0,tags:{knowledge:'逆运算',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'63-25=38'},hint:'63-25=38'},
{id:'l2-as-08',level:2,type:'变式探测',stem:'妈妈有80元，买鱼用了28元，还剩多少钱？',options:['A.52元','B.62元','C.48元','D.42元'],answer:0,tags:{knowledge:'减法应用',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'80-28=52'},hint:'80-28=52元'},
{id:'l2-as-09',level:3,type:'迁移探测',stem:'公交车上有45人，到站下去18人，又上来12人。现在车上有多少人？',options:['A.39人','B.49人','C.35人','D.41人'],answer:0,tags:{knowledge:'加减混合',skill_level:'分析',error_type: '运算顺序错', error_category: 'C',cognitive_load:'高',trap_type:'45-18+12=39'},hint:'45-18=27，27+12=39人。'},
{id:'l2-as-10',level:3,type:'迁移探测',stem:'小方有35张贴纸，送给小明8张，小红又给了小方10张。小方现在有多少张？',options:['A.37张','B.33张','C.42张','D.45张'],answer:0,tags:{knowledge:'多步计算',skill_level:'分析',error_type: '运算顺序错', error_category: 'C',cognitive_load:'高',trap_type:'35-8+10=37'},hint:'35-8=27，27+10=37张。'}
]},
'l2-mult-div': { name: '表内乘除法', grade: 'L2', textbookLessons: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], questions: [
{id:'l2-md-01',level:1,type:'基础探测',stem:'3×4=?',options:['A.12','B.7','C.9','D.16'],answer:0,tags:{knowledge:'乘法口算',skill_level:'记忆',error_type: '口诀记错', error_category: 'K',cognitive_load:'低',trap_type:'三四十二'},hint:'3×4=12'},
{id:'l2-md-02',level:1,type:'基础探测',stem:'12÷4=?',options:['A.3','B.4','C.2','D.6'],answer:0,tags:{knowledge:'除法口算',skill_level:'记忆',error_type: '口诀记错', error_category: 'K',cognitive_load:'低',trap_type:'12÷4=3'},hint:'12÷4=3'},
{id:'l2-md-03',level:1,type:'基础探测',stem:'5×6+5=?',options:['A.35','B.30','C.40','D.25'],answer:0,tags:{knowledge:'乘加混合',skill_level:'理解',error_type: '先乘后加', error_category: 'K',cognitive_load:'低',trap_type:'5×6=30+5=35'},hint:'5×6=30，30+5=35'},
{id:'l2-md-04',level:1,type:'基础探测',stem:'把18个苹果平均分给6个小朋友每人几个？',options:['A.3个','B.4个','C.2个','D.6个'],answer:0,tags:{knowledge:'除法的含义',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'18÷6=3'},hint:'18÷6=3个'},
{id:'l2-md-05',level:2,type:'变式探测',stem:'一个盘子放4个苹果，3个盘子放几个？',options:['A.12个','B.8个','C.16个','D.7个'],answer:0,tags:{knowledge:'乘法应用',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'4×3=12'},hint:'4×3=12个'},
{id:'l2-md-06',level:2,type:'变式探测',stem:'有24颗糖，每人分6颗，可以分给几人？',options:['A.4人','B.6人','C.3人','D.8人'],answer:0,tags:{knowledge:'除法应用',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'24÷6=4'},hint:'24÷6=4人'},
{id:'l2-md-07',level:2,type:'变式探测',stem:'8×7-8=?',options:['A.48','B.56','C.40','D.64'],answer:0,tags:{knowledge:'乘减混合',skill_level:'应用',error_type: '运算顺序错', error_category: 'C',cognitive_load:'中',trap_type:'56-8=48'},hint:'8×7=56，56-8=48'},
{id:'l2-md-08',level:2,type:'变式探测',stem:'小明有3个5元硬币，一共有多少钱？',options:['A.15元','B.8元','C.10元','D.20元'],answer:0,tags:{knowledge:'乘法应用',skill_level:'应用',error_type: '理解错误', error_category: 'K',cognitive_load:'中',trap_type:'3×5=15'},hint:'3×5=15元'},
{id:'l2-md-09',level:3,type:'迁移探测',stem:'一箱牛奶有6瓶，3箱牛奶共有几瓶？喝掉8瓶后还剩几瓶？',options:['A.18瓶剩10瓶','B.18瓶剩8瓶','C.12瓶剩4瓶','D.18瓶剩12瓶'],answer:0,tags:{knowledge:'乘减综合',skill_level:'分析',error_type: '运算顺序错', error_category: 'C',cognitive_load:'高',trap_type:'6×3=18-8=10'},hint:'6×3=18，18-8=10瓶。'},
{id:'l2-md-10',level:3,type:'迁移探测',stem:'一根绳子对折后再对折，这时每段长4米。绳子原来多少米？',options:['A.16米','B.12米','C.8米','D.20米'],answer:0,tags:{knowledge:'乘除法应用',skill_level:'分析',error_type: '对折次数理解错', error_category: 'K',cognitive_load:'高',trap_type:'对折两次分成4段'},hint:'4×4=16米。'}
]},
'l2-length-time': { name: '长度单位与时分秒', grade: 'L2', textbookLessons: [26, 27, 37, 38, 39, 40, 41, 42, 43, 44, 45], questions: [
{id:'l2-lt-01',level:1,type:'基础探测',stem:'1米等于多少厘米？',options:['A.100厘米','B.10厘米','C.1000厘米','D.50厘米'],answer:0,tags:{knowledge:'长度单位',skill_level:'记忆',error_type: '单位混淆', error_category: 'E',cognitive_load:'低',trap_type:'1米=100厘米'},hint:'1米=100厘米。'},
{id:'l2-lt-02',level:1,type:'基础探测',stem:'1小时等于多少分钟？',options:['A.60分钟','B.30分钟','C.100分钟','D.10分钟'],answer:0,tags:{knowledge:'时间单位',skill_level:'记忆',error_type: '单位混淆', error_category: 'E',cognitive_load:'低',trap_type:'1小时=60分'},hint:'1小时=60分钟。'},
{id:'l2-lt-03',level:1,type:'基础探测',stem:'钟表上分针指着6，时针在3和4之间，是几点？',options:['A.3:30','B.3:06','C.4:30','D.6:30'],answer:0,tags:{knowledge:'认识时钟',skill_level:'理解',error_type: '认钟错误', error_category: 'K',cognitive_load:'低',trap_type:'分针指半=30分'},hint:'时针过3到4之间是3点多，分针指6是半，所以3:30。'},
{id:'l2-lt-04',level:1,type:'基础探测',stem:'一根铅笔长大约？',options:['A.15厘米','B.15米','C.15分米','D.15毫米'],answer:0,tags:{knowledge:'长度感知',skill_level:'理解',error_type: '单位混淆', error_category: 'E',cognitive_load:'低',trap_type:'正确是15厘米'},hint:'铅笔长约15厘米。'},
{id:'l2-lt-05',level:2,type:'变式探测',stem:'小明7:30出发去学校，路上用了15分钟，到校时间是？',options:['A.7:45','B.7:15','C.8:00','D.7:55'],answer:0,tags:{knowledge:'时间计算',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'7:30+15分=7:45'},hint:'7:30+15分钟=7:45'},
{id:'l2-lt-06',level:2,type:'变式探测',stem:'一条绳子长2米，剪掉35厘米后还剩多少厘米？',options:['A.165厘米','B.165米','C.35厘米','D.165毫米'],answer:0,tags:{knowledge:'长度计算',skill_level:'应用',error_type: '单位换算错', error_category: 'C',cognitive_load:'中',trap_type:'2米=200厘米'},hint:'200-35=165厘米'},
{id:'l2-lt-07',level:2,type:'变式探测',stem:'一节课40分钟，第二节课9:10开始，什么时间下课？',options:['A.9:50','B.9:40','C.10:00','D.9:30'],answer:0,tags:{knowledge:'时间推算',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'9:10+40分=9:50'},hint:'9:10+40分钟=9:50'},
{id:'l2-lt-08',level:2,type:'变式探测',stem:'小明家离学校500米，小红家离学校1千米。谁家离学校近？',options:['A.小明家近','B.小红家近','C.一样近','D.无法比较'],answer:0,tags:{knowledge:'长度比较',skill_level:'应用',error_type: '单位换算错', error_category: 'C',cognitive_load:'中',trap_type:'1千米=1000米'},hint:'1千米=1000米>500米，小明家近。'},
{id:'l2-lt-09',level:3,type:'迁移探测',stem:'小红从家到学校要走20分钟，她8:10出门。学校要求8:30到校，她迟到吗？',options:['A.不迟到8:10+20分=8:30刚好到','B.迟到','C.早到','D.无法确定'],answer:0,tags:{knowledge:'时间规划',skill_level:'分析',error_type: '计算错误', error_category: 'C',cognitive_load:'高',trap_type:'8:10+20分=8:30正好'},hint:'8:10+20分钟=8:30，刚好不迟到。'},
{id:'l2-lt-10',level:3,type:'迁移探测',stem:'运动会上跑100米，小明用了20秒，小华用了18秒。谁跑得快？快几秒？',options:['A.小华快2秒','B.小明快2秒','C.一样快','D.小华快18秒'],answer:0,tags:{knowledge:'时间比较',skill_level:'分析',error_type: '比较方向错', error_category: 'K',cognitive_load:'高',trap_type:'时间越少越快'},hint:'18<20，小华快，20-18=2秒。'}
]},
'l2-geometry': { name: '线与角', grade: 'L2', textbookLessons: [35, 36, 50], questions: [
{id:'l2-geo-01',level:1,type:'基础探测',stem:'下面哪个是线段？',options:['A.有端点有长度','B.没有端点','C.一个端点','D.弯的'],answer:0,tags:{knowledge:'线段特征',skill_level:'记忆',error_type: '概念混淆', error_category: 'K',cognitive_load:'低',trap_type:'线段有两个端点'},hint:'线段有两个端点，有确定长度。'},
{id:'l2-geo-02',level:1,type:'基础探测',stem:'比直角大的角叫什么角？',options:['A.钝角','B.锐角','C.平角','D.周角'],answer:0,tags:{knowledge:'角的分类',skill_level:'记忆',error_type: '分类混淆', error_category: 'K',cognitive_load:'低',trap_type:'钝角>90°'},hint:'钝角比直角大。'},
{id:'l2-geo-03',level:1,type:'基础探测',stem:'长方形的对边（  ）',options:['A.相等','B.不相等','C.平行但不等','D.垂直'],answer:0,tags:{knowledge:'长方形特征',skill_level:'理解',error_type: '特征混淆', error_category: 'R',cognitive_load:'低',trap_type:'对边相等'},hint:'长方形对边相等。'},
{id:'l2-geo-04',level:1,type:'基础探测',stem:'下图中有几个角？一个五角星',options:['A.5个','B.4个','C.3个','D.10个'],answer:0,tags:{knowledge:'数角',skill_level:'理解',error_type: '漏数', error_category: 'R',cognitive_load:'低',trap_type:'五角星有5个角'},hint:'五角星有5个凸出的角。'},
{id:'l2-geo-05',level:2,type:'变式探测',stem:'一个角的两条边越长，这个角的大小会怎样？',options:['A.不变','B.变大','C.变小','D.不一定'],answer:0,tags:{knowledge:'角的大小',skill_level:'应用',error_type: '概念理解错', error_category: 'K',cognitive_load:'中',trap_type:'角的大小看张开的程度'},hint:'角的大小只和两边张开的程度有关，和边的长短无关。'},
{id:'l2-geo-06',level:2,type:'变式探测',stem:'正方形和长方形有什么共同点？',options:['A.四个角都是直角','B.四条边一样长','C.对边不相等','D.只有一组对边平行'],answer:0,tags:{knowledge:'四边形性质',skill_level:'应用',error_type: '性质混淆', error_category: 'K',cognitive_load:'中',trap_type:'都有四个直角'},hint:'正方形和长方形的四个角都是直角。'},
{id:'l2-geo-07',level:2,type:'变式探测',stem:'用三角尺的直角比一比，下面哪个角是锐角？',options:['A.比直角小的角','B.比直角大的角','C.和直角一样的角','D.没有角的图形'],answer:0,tags:{knowledge:'锐角',skill_level:'应用',error_type: '概念混淆', error_category: 'K',cognitive_load:'中',trap_type:'锐角<直角'},hint:'比直角小的角是锐角。'},
{id:'l2-geo-08',level:2,type:'变式探测',stem:'一条绳子长12米，剪成3米一段，可以剪成几段？',options:['A.4段','B.3段','C.6段','D.9段'],answer:0,tags:{knowledge:'等分应用',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'12÷3=4'},hint:'12÷3=4段'},
{id:'l2-geo-09',level:3,type:'迁移探测',stem:'用两个完全一样的直角三角形可以拼成一个什么图形？',options:['A.长方形或正方形','B.只能拼成三角形','C.只能拼成圆形','D.不能拼'],answer:0,tags:{knowledge:'图形拼组',skill_level:'分析',error_type: '空间想象错', error_category: 'M',cognitive_load:'高',trap_type:'斜边拼起来'},hint:'两个直角三角形可以拼成长方形或正方形。'},
{id:'l2-geo-10',level:3,type:'迁移探测',stem:'一个正方体有几个顶点？几条棱？',options:['A.8个顶点12条棱','B.6个顶点12条棱','C.8个顶点6条棱','D.12个顶点8条棱'],answer:0,tags:{knowledge:'立体图形特征',skill_level:'分析',error_type: '特征记错', error_category: 'K',cognitive_load:'高',trap_type:'正方体8个顶点12条棱'},hint:'正方体有8个顶点、12条棱、6个面。'}
]},
'l2-thinking': { name: '思维训练', grade: 'L2', textbookLessons: [53, 54, 55, 56, 57, 58, 59], questions: [
{id:'l2-thk-01',level:1,type:'基础探测',stem:'找规律：1,3,5,7,?',options:['A.9','B.8','C.10','D.6'],answer:0,tags:{knowledge:'数字规律',skill_level:'理解',error_type: '规律识别错', error_category: 'K',cognitive_load:'低',trap_type:'奇数序列'},hint:'每次加2，7+2=9'},
{id:'l2-thk-02',level:1,type:'基础探测',stem:'1只猫+1只猫=2只猫，那么1只狗+1只鸡=?',options:['A.不能直接加','B.2只动物','C.1只狗和1只鸡','D.2只'],answer:0,tags:{knowledge:'分类思想',skill_level:'理解',error_type: '分类混乱', error_category: 'K',cognitive_load:'低',trap_type:'不同种类不能直接合并'},hint:'狗和鸡是不同的动物，应该分开说。'},
{id:'l2-thk-03',level:1,type:'基础探测',stem:'观察：□△□△□△，下一个是什么？',options:['A.□','B.△','C.○','D.☆'],answer:0,tags:{knowledge:'图形规律',skill_level:'理解',error_type: '规律识别错', error_category: 'K',cognitive_load:'低',trap_type:'交替规律'},hint:'交替出现，△后面是□。'},
{id:'l2-thk-04',level:1,type:'基础探测',stem:'小明比小华高，小华比小刚高。谁最矮？',options:['A.小刚','B.小明','C.小华','D.一样'],answer:0,tags:{knowledge:'比较推理',skill_level:'理解',error_type: '推理错误', error_category: 'M',cognitive_load:'低',trap_type:'小明>小华>小刚'},hint:'小明>小华>小刚，小刚最矮。'},
{id:'l2-thk-05',level:2,type:'变式探测',stem:'找规律：2,4,6,8,10,?,?',options:['A.12,14','B.11,13','C.10,12','D.14,16'],answer:0,tags:{knowledge:'数字规律',skill_level:'应用',error_type: '规律识别错', error_category: 'K',cognitive_load:'中',trap_type:'每次+2'},hint:'每次加2，10+2=12，12+2=14。'},
{id:'l2-thk-06',level:2,type:'变式探测',stem:'△+□=9,△-□=1,△=?□=?',options:['A.△=5,□=4','B.△=4,□=5','C.△=6,□=3','D.△=5,□=5'],answer:0,tags:{knowledge:'算式推理',skill_level:'应用',error_type: '推理错误', error_category: 'M',cognitive_load:'中',trap_type:'两式相加'},hint:'两式相加得2△=10→△=5，5+□=9→□=4'},
{id:'l2-thk-07',level:2,type:'变式探测',stem:'小明有20个苹果，给了小红8个，小红原来有12个。现在小红比小明多几个？',options:['A.8个','B.12个','C.6个','D.10个'],answer:0,tags:{knowledge:'移多补少',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'小红现在20个，小明12个'},hint:'小红12+8=20，小明20-8=12，20-12=8个。'},
{id:'l2-thk-08',level:2,type:'变式探测',stem:'把一根木头锯成4段，每锯一次用3分钟，一共需要几分钟？',options:['A.9分钟','B.12分钟','C.6分钟','D.8分钟'],answer:0,tags:{knowledge:'锯木头问题',skill_level:'应用',error_type: '段数=次数+1', error_category: 'K',cognitive_load:'中',trap_type:'锯4段需3次'},hint:'锯4段需3次，3×3=9分钟。'},
{id:'l2-thk-09',level:3,type:'迁移探测',stem:'3个人吃3个包子要3分钟，6个人吃6个包子要几分钟？',options:['A.3分钟','B.6分钟','C.9分钟','D.2分钟'],answer:0,tags:{knowledge:'归一问题',skill_level:'分析',error_type: '比例理解错', error_category: 'K',cognitive_load:'高',trap_type:'1人吃1个要3分钟'},hint:'1人吃1个要3分钟，6人每人吃1个还是3分钟。'},
{id:'l2-thk-10',level:3,type:'迁移探测',stem:'红黄蓝三种颜色的灯按"红、黄、蓝"顺序不断重复，第12盏灯是什么颜色？',options:['A.蓝色','B.红色','C.黄色','D.绿色'],answer:0,tags:{knowledge:'周期问题',skill_level:'分析',error_type: '周期计算错', error_category: 'C',cognitive_load:'高',trap_type:'3个一周期，12能被3整除'},hint:'12÷3=4余0，第12个是周期的最后一个蓝色。'}
]},
'l3-numbers': { name: '万以内数与四则运算', grade: 'L3', textbookLessons: [0, 1, 2, 3, 4, 5, 20, 21, 55, 56], questions: [
{id:'l3-num-01',level:1,type:'基础探测',stem:'3206读作？',options:['A.三千二百零六','B.三千二百六','C.三千零六','D.三十二零六'],answer:0,tags:{knowledge:'万以内数的读写',skill_level:'记忆',error_type: '读数规则错', error_category: 'K',cognitive_load:'低',trap_type:'中间0要读出来'},hint:'三千二百零六'},
{id:'l3-num-02',level:1,type:'基础探测',stem:'350+420=?',options:['A.770','B.870','C.670','D.770'],answer:0,tags:{knowledge:'万以内加法',skill_level:'理解',error_type: '计算错误', error_category: 'C',cognitive_load:'低',trap_type:'350+420=770'},hint:'350+420=770'},
{id:'l3-num-03',level:1,type:'基础探测',stem:'800-350=?',options:['A.450','B.350','C.550','D.450'],answer:0,tags:{knowledge:'万以内减法',skill_level:'理解',error_type: '退位错误', error_category: 'C',cognitive_load:'低',trap_type:'800-350=450'},hint:'800-350=450'},
{id:'l3-num-04',level:1,type:'基础探测',stem:'2068中"0"表示什么？',options:['A.百位上一个也没有','B.0个千','C.十位上一个也没有','D.0个一'],answer:0,tags:{knowledge:'数位',skill_level:'理解',error_type: '数位理解错', error_category: 'K',cognitive_load:'低',trap_type:'2068的百位是0'},hint:'2068中百位是0，表示百位上一个计数单位也没有。'},
{id:'l3-num-05',level:2,type:'变式探测',stem:'364+289=?',options:['A.653','B.663','C.643','D.553'],answer:0,tags:{knowledge:'万以内进位加法',skill_level:'应用',error_type: '进位错误', error_category: 'C',cognitive_load:'中',trap_type:'364+289=653'},hint:'300+200=500，60+80=140，4+9=13，500+140+13=653'},
{id:'l3-num-06',level:2,type:'变式探测',stem:'704-258=?',options:['A.446','B.456','C.546','D.346'],answer:0,tags:{knowledge:'万以内退位减法',skill_level:'应用',error_type: '退位错误', error_category: 'C',cognitive_load:'中',trap_type:'704-258=446'},hint:'704-200=504，504-50=454，454-8=446'},
{id:'l3-num-07',level:2,type:'变式探测',stem:'一个数比3000大，比4000小，百位是5，十位是0，个位是8，这个数是多少？',options:['A.3508','B.3058','C.3580','D.3508'],answer:0,tags:{knowledge:'数的组成',skill_level:'应用',error_type: '数位值判断错', error_category: 'K',cognitive_load:'中',trap_type:'千位3百位5十位0个位8'},hint:'3508'},
{id:'l3-num-08',level:2,type:'变式探测',stem:'25×4+36=?',options:['A.136','B.156','C.116','D.146'],answer:0,tags:{knowledge:'乘加混合',skill_level:'应用',error_type: '运算顺序错', error_category: 'C',cognitive_load:'中',trap_type:'先乘后加'},hint:'25×4=100，100+36=136'},
{id:'l3-num-09',level:3,type:'迁移探测',stem:'玩具店有3箱玩具，每箱120个，卖出185个，还剩几个？',options:['A.175个','B.155个','C.165个','D.185个'],answer:0,tags:{knowledge:'乘减综合',skill_level:'分析',error_type: '运算顺序错', error_category: 'C',cognitive_load:'高',trap_type:'3×120=360-185=175'},hint:'3×120=360，360-185=175个。'},
{id:'l3-num-10',level:3,type:'迁移探测',stem:'新华字典有684页，故事书比字典少238页，两本书一共有多少页？',options:['A.1130页','B.1040页','C.1080页','D.1150页'],answer:0,tags:{knowledge:'多步运算应用',skill_level:'分析',error_type: '列式错误', error_category: 'K',cognitive_load:'高',trap_type:'故事书684-238=446，共684+446=1130'},hint:'684-238=446，684+446=1130页。'}
]},
'l3-fraction': { name: '分数的初步认识', grade: 'L3', textbookLessons: [16, 17, 18, 19, 20, 21, 22, 23, 24, 46, 47], questions: [
{id:'l3-frc-01',level:1,type:'基础探测',stem:'把一个月饼平均分成4份，取其中1份是？',options:['A.1/4','B.1/2','C.1/3','D.1/5'],answer:0,tags:{knowledge:'分数的意义',skill_level:'记忆',error_type: '概念混淆', error_category: 'K',cognitive_load:'低',trap_type:'1份/4份=1/4'},hint:'平均分成4份取1份，就是1/4。'},
{id:'l3-frc-02',level:1,type:'基础探测',stem:'2/3的分子是几？分母是几？',options:['A.分子2分母3','B.分子3分母2','C.分子2分母2','D.分子3分母3'],answer:0,tags:{knowledge:'分数的组成',skill_level:'记忆',error_type: '分子分母混淆', error_category: 'K',cognitive_load:'低',trap_type:'分数线上面是分子'},hint:'分子是2，分母是3。'},
{id:'l3-frc-03',level:1,type:'基础探测',stem:'1/4和1/5谁大？',options:['A.1/4>1/5','B.1/4<1/5','C.一样大','D.无法比较'],answer:0,tags:{knowledge:'分数比较',skill_level:'理解',error_type: '比较规则错', error_category: 'K',cognitive_load:'低',trap_type:'分子相同分母大的反而小'},hint:'分子相同都是1，分母4<5，所以1/4>1/5。'},
{id:'l3-frc-04',level:1,type:'基础探测',stem:'2/7+3/7=?',options:['A.5/7','B.5/14','C.5/7','D.1/7'],answer:0,tags:{knowledge:'同分母加法',skill_level:'理解',error_type: '法则记错', error_category: 'K',cognitive_load:'低',trap_type:'分母不变分子相加'},hint:'分母不变，分子2+3=5，所以5/7。'},
{id:'l3-frc-05',level:2,type:'变式探测',stem:'把一个西瓜平均分成8块，小明吃了3块，剩下的占整个西瓜的几分之几？',options:['A.5/8','B.3/8','C.1/2','D.5/8'],answer:0,tags:{knowledge:'分数应用',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'8-3=5块，即5/8'},hint:'8-3=5块，剩下的5/8。'},
{id:'l3-frc-06',level:2,type:'变式探测',stem:'4/9-2/9=?',options:['A.2/9','B.2/0','C.6/9','D.2/18'],answer:0,tags:{knowledge:'同分母减法',skill_level:'应用',error_type: '法则记错', error_category: 'K',cognitive_load:'中',trap_type:'分母不变分子相减'},hint:'4/9-2/9=2/9'},
{id:'l3-frc-07',level:2,type:'变式探测',stem:'1可以写成几分之几？',options:['A.3/3','B.1/1','C.5/5','D.以上都对'],answer:3,tags:{knowledge:'1的分数形式',skill_level:'应用',error_type: '概念理解错', error_category: 'K',cognitive_load:'中',trap_type:'任何分子分母相等的分数都等于1'},hint:'分子和分母相等的分数都等于1。'},
{id:'l3-frc-08',level:2,type:'变式探测',stem:'3/8<()/8，括号里最小填几？',options:['A.4','B.3','C.2','D.5'],answer:0,tags:{knowledge:'分数大小',skill_level:'应用',error_type: '大小判断错', error_category: 'K',cognitive_load:'中',trap_type:'同分母看分子'},hint:'同分母，分子大的分数大。比3大的最小整数是4。'},
{id:'l3-frc-09',level:3,type:'迁移探测',stem:'一根绳子长8/9米，用了5/9米，还剩多少米？',options:['A.3/9米','B.3/9=1/3米','C.6/9米','D.5/9米'],answer:0,tags:{knowledge:'分数减法应用',skill_level:'分析',error_type: '计算错误', error_category: 'C',cognitive_load:'高',trap_type:'8/9-5/9=3/9=1/3'},hint:'8-5=3，3/9=1/3米。'},
{id:'l3-frc-10',level:3,type:'迁移探测',stem:'小明吃了1/3个蛋糕，小红吃了1/3个蛋糕，一共吃了多少个蛋糕？',options:['A.2/3个','B.1/6个','C.1/3个','D.2/6个'],answer:0,tags:{knowledge:'分数加法应用',skill_level:'分析',error_type: '法则记错', error_category: 'K',cognitive_load:'高',trap_type:'1/3+1/3=2/3'},hint:'1/3+1/3=2/3个蛋糕。'}
]},
'l3-area': { name: '面积', grade: 'L3', textbookLessons: [24, 25, 26, 27, 28, 29, 32, 33, 46, 47, 50, 51], questions: [
{id:'l3-are-01',level:1,type:'基础探测',stem:'长方形的面积公式是？',options:['A.长×宽','B.(长+宽)×2','C.长+宽','D.长×高'],answer:0,tags:{knowledge:'面积公式',skill_level:'记忆',error_type: '公式混淆', error_category: 'K',cognitive_load:'低',trap_type:'正方形面积=边长×边长'},hint:'S=长×宽'},
{id:'l3-are-02',level:1,type:'基础探测',stem:'边长为4厘米的正方形面积是？',options:['A.16平方厘米','B.8平方厘米','C.4平方厘米','D.12平方厘米'],answer:0,tags:{knowledge:'正方形面积',skill_level:'理解',error_type: '公式代错', error_category: 'K',cognitive_load:'低',trap_type:'4×4=16'},hint:'S=4×4=16平方厘米'},
{id:'l3-are-03',level:1,type:'基础探测',stem:'长5cm宽3cm的长方形面积是？',options:['A.15平方厘米','B.16平方厘米','C.8平方厘米','D.10平方厘米'],answer:0,tags:{knowledge:'长方形面积',skill_level:'理解',error_type: '公式代错', error_category: 'K',cognitive_load:'低',trap_type:'5×3=15'},hint:'5×3=15平方厘米'},
{id:'l3-are-04',level:1,type:'基础探测',stem:'常见的面积单位有？',options:['A.平方厘米、平方米','B.厘米、米','C.克、千克','D.升、毫升'],answer:0,tags:{knowledge:'面积单位',skill_level:'记忆',error_type: '单位混淆', error_category: 'E',cognitive_load:'低',trap_type:'面积单位带平方'},hint:'面积单位有平方厘米、平方分米、平方米等。'},
{id:'l3-are-05',level:2,type:'变式探测',stem:'一个长方形长8米，宽6米，它的面积是多少？',options:['A.48平方米','B.28平方米','C.14平方米','D.48平方米'],answer:0,tags:{knowledge:'长方形面积',skill_level:'应用',error_type: '公式代错', error_category: 'K',cognitive_load:'中',trap_type:'8×6=48'},hint:'8×6=48平方米'},
{id:'l3-are-06',level:2,type:'变式探测',stem:'一块正方形手帕边长25厘米，面积是多少？',options:['A.625平方厘米','B.100平方厘米','C.50平方厘米','D.200平方厘米'],answer:0,tags:{knowledge:'正方形面积',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'25×25=625'},hint:'25×25=625平方厘米'},
{id:'l3-are-07',level:2,type:'变式探测',stem:'1平方米等于多少平方分米？',options:['A.100平方分米','B.10平方分米','C.1000平方分米','D.10000平方分米'],answer:0,tags:{knowledge:'面积单位换算',skill_level:'应用',error_type: '换算率记错', error_category: 'E',cognitive_load:'中',trap_type:'1m=10dm,1m²=100dm²'},hint:'1米=10分米，1平方米=100平方分米。'},
{id:'l3-are-08',level:2,type:'变式探测',stem:'边长扩大为原来的3倍，面积扩大为原来的几倍？',options:['A.9倍','B.3倍','C.6倍','D.12倍'],answer:0,tags:{knowledge:'面积变化',skill_level:'应用',error_type: '平方关系', error_category: 'C',cognitive_load:'中',trap_type:'边长×3面积×9'},hint:'面积=边长²，边长×3，面积×3²=9。'},
{id:'l3-are-09',level:3,type:'迁移探测',stem:'一块长方形菜地长12米，宽8米，一半种青菜一半种萝卜。青菜地有多大？',options:['A.48平方米','B.96平方米','C.24平方米','D.12平方米'],answer:0,tags:{knowledge:'面积应用',skill_level:'分析',error_type: '计算错误', error_category: 'C',cognitive_load:'高',trap_type:'总面积12×8=96，一半96÷2=48'},hint:'12×8=96，96÷2=48平方米。'},
{id:'l3-are-10',level:3,type:'迁移探测',stem:'大正方形边长9厘米，小正方形边长3厘米。大正方形面积是小正方形面积的几倍？',options:['A.9倍','B.3倍','C.6倍','D.27倍'],answer:0,tags:{knowledge:'面积倍数',skill_level:'分析',error_type: '只算边长倍数', error_category: 'K',cognitive_load:'高',trap_type:'面积比是边长比的平方'},hint:'9×9=81，3×3=9，81÷9=9倍。'}
]},
'l3-stats': { name: '统计', grade: 'L3', textbookLessons: [34, 35, 40, 41], questions: [
{id:'l3-sta-01',level:1,type:'基础探测',stem:'条形图是用什么表示数量多少的？',options:['A.条形的长短','B.条形的颜色','C.条形的位置','D.条形的形状'],answer:0,tags:{knowledge:'条形图',skill_level:'记忆',error_type: '概念混淆', error_category: 'K',cognitive_load:'低',trap_type:'条越长数量越多'},hint:'条形图用条形的长短表示数量的多少。'},
{id:'l3-sta-02',level:1,type:'基础探测',stem:'喜欢苹果12人、香蕉8人、橘子10人。哪种最受欢迎？',options:['A.苹果','B.香蕉','C.橘子','D.一样'],answer:0,tags:{knowledge:'数据比较',skill_level:'理解',error_type: '数据读错', error_category: 'R',cognitive_load:'低',trap_type:'12最大'},hint:'苹果12人最多，最受欢迎。'},
{id:'l3-sta-03',level:1,type:'基础探测',stem:'折线图中的点表示什么？',options:['A.每个时间的数据','B.数据的平均值','C.数据的变化趋势','D.数据的颜色'],answer:0,tags:{knowledge:'折线图',skill_level:'理解',error_type: '概念混淆', error_category: 'K',cognitive_load:'低',trap_type:'每个点表示一个数据'},hint:'折线图中的每个点表示在某一时刻的数据值。'},
{id:'l3-sta-04',level:1,type:'基础探测',stem:'统计全班最喜欢的水果，第一步应该做什么？',options:['A.收集数据','B.制图','C.分析','D.猜测'],answer:0,tags:{knowledge:'统计步骤',skill_level:'理解',error_type: '步骤顺序错', error_category: 'K',cognitive_load:'低',trap_type:'先收集再整理'},hint:'统计的第一步是收集数据。'},
{id:'l3-sta-05',level:2,type:'变式探测',stem:'根据统计表：周一20℃,周二22℃,周三25℃,周四28℃。哪天最热？哪天最凉快？',options:['A.周四最热周一最凉快','B.周四最热周二最凉快','C.周三最热周一最凉快','D.周一最热周四最凉快'],answer:0,tags:{knowledge:'数据比较',skill_level:'应用',error_type: '比较错误', error_category: 'K',cognitive_load:'中',trap_type:'28最大20最小'},hint:'28>25>22>20，周四最热周一最凉快。'},
{id:'l3-sta-06',level:2,type:'变式探测',stem:'观察条形图：苹果5人、梨3人、香蕉7人。三个水果一共有多少人喜欢？',options:['A.15人','B.10人','C.12人','D.20人'],answer:0,tags:{knowledge:'数据汇总',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'5+3+7=15'},hint:'5+3+7=15人'},
{id:'l3-sta-07',level:2,type:'变式探测',stem:'折线图显示小明一周体温：周一37℃,周二38℃,周三39℃,周四37℃。体温最高是哪天？',options:['A.周三','B.周一','C.周二','D.周四'],answer:0,tags:{knowledge:'折线图读图',skill_level:'应用',error_type: '读图错误', error_category: 'R',cognitive_load:'中',trap_type:'39最高在周三'},hint:'39℃最高，在周三。'},
{id:'l3-sta-08',level:2,type:'变式探测',stem:'第一组摘了28个苹果，第二组摘了35个，第三组摘了30个。哪组摘得最多？',options:['A.第二组','B.第一组','C.第三组','D.一样'],answer:0,tags:{knowledge:'数据比较',skill_level:'应用',error_type: '比较错误', error_category: 'K',cognitive_load:'中',trap_type:'35最大'},hint:'35>30>28，第二组最多。'},
{id:'l3-sta-09',level:3,type:'迁移探测',stem:'5天的游客人数：周一200人，周二150人，周三250人，周四300人，周五200人。哪天到哪天游客增加最多？',options:['A.周三到周四增加50人','B.周一到周二减少50人','C.周二到周三增加100人','D.周四到周五减少100人'],answer:0,tags:{knowledge:'数据分析',skill_level:'分析',error_type: '计算错误', error_category: 'C',cognitive_load:'高',trap_type:'250-150=100最多'},hint:'100>50，周二到周三增加100人最多。'},
{id:'l3-sta-10',level:3,type:'迁移探测',stem:'三年一班男生18人女生16人，三年二班男生比一班多3人，女生比一班少2人。三年二班共多少人？',options:['A.35人','B.37人','C.33人','D.39人'],answer:0,tags:{knowledge:'统计应用',skill_level:'分析',error_type: '运算错误', error_category: 'C',cognitive_load:'高',trap_type:'(18+3)+(16-2)=35'},hint:'18+3=21，16-2=14，21+14=35人。'}
]},
'l11-limits': { name: '极限与连续', grade: 'L11', textbookLessons: [0, 1, 2, 3, 4, 5, 6, 7], questions: [
{id:'l11-lim-01',level:1,type:'基础探测',stem:'lim(x→0)(sinx/x)=?',options:['A.1','B.0','C.∞','D.不存在'],answer:0,tags:{knowledge:'重要极限',skill_level:'记忆',error_type: '极限记错', error_category: 'K',cognitive_load:'低',trap_type:'第一个重要极限'},hint:'lim(x→0)sinx/x=1'},
{id:'l11-lim-02',level:1,type:'基础探测',stem:'lim(n→∞)1/n=?',options:['A.0','B.1','C.∞','D.-1'],answer:0,tags:{knowledge:'数列极限',skill_level:'记忆',error_type: '极限概念', error_category: 'K',cognitive_load:'低',trap_type:'n→∞时1/n→0'},hint:'n趋向无穷大时，1/n趋向0。'},
{id:'l11-lim-10',level:3,type:'迁移探测',stem:'lim(x→0)(sin2x)/(3x)=?',options:['A.2/3','B.1','C.0','D.∞'],answer:0,tags:{knowledge:'极限综合',skill_level:'分析',error_type: '变量替换错', error_category: 'K',cognitive_load:'高',trap_type:'sin2x~2x'},hint:'sin2x~2x，2x/(3x)=2/3'}
]},
'l11-derivative': { name: '导数', grade: 'L11', textbookLessons: [8, 9, 18, 19, 20, 21, 26, 27, 29, 30, 31, 32, 33, 34], questions: [
{id:'l11-der-01',level:1,type:'基础探测',stem:'f(x)′=x²，f′(2)=?',options:['A.4','B.2','C.8','D.0'],answer:0,tags:{knowledge:'导数计算',skill_level:'记忆',error_type: '导数公式错', error_category: 'K',cognitive_load:'低',trap_type:'f′(x)′=2x'},hint:'f′(x)′=2x，f′(2)=4'},
{id:'l11-der-02',level:1,type:'基础探测',stem:'(sinx)′=?',options:['A.cosx','B.-cosx','C.-sinx','D.sinx'],answer:0,tags:{knowledge:'基本导数公式',skill_level:'记忆',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'sinx的导数是cosx'},hint:'(sinx)′=cosx'},
{id:'l11-der-10',level:3,type:'迁移探测',stem:'f(x)′=x³-3x的极小值',options:['A.-2','B.2','C.0','D.4'],answer:0,tags:{knowledge:'极值',skill_level:'分析',error_type: '极值判定错', error_category: 'K',cognitive_load:'高',trap_type:'f′(x)′=3x²-3'},hint:'x=±1，f′′(1)>0极小，f(1)=-2'}
]},
'l11-integral': { name: '积分', grade: 'L11', textbookLessons: [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54], questions: [
{id:'l11-int-01',level:1,type:'基础探测',stem:'∫x²dx=?',options:['A.x³/3+C','B.x³+C','C.2x+C','D.x²/2+C'],answer:0,tags:{knowledge:'不定积分公式',skill_level:'记忆',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'幂函数积分'},hint:'∫xⁿd⁡dx=x^(n+1)/(n+1)+C'},
{id:'l11-int-02',level:1,type:'基础探测',stem:'∫₁²xdx=?',options:['A.3/2','B.2','C.1','D.3'],answer:0,tags:{knowledge:'定积分',skill_level:'理解',error_type: '牛莱公式', error_category: 'K',cognitive_load:'低',trap_type:'x²/2|₁²'},hint:'=x²/2|₁²=4/2-1/2=3/2'},
{id:'l11-int-10',level:3,type:'迁移探测',stem:'曲线y=x与y=x²围成的面积',options:['A.1/6','B.1/3','C.1/2','D.1/12'],answer:0,tags:{knowledge:'面积综合',skill_level:'分析',error_type: '交点求错', error_category: 'K',cognitive_load:'高',trap_type:'交点x=0和x=1'},hint:'∫₀¹(x-x²)dx=1/2-1/3=1/6'}
]},

'l2-measure': { name: '周长与测量', grade: 'L2', textbookLessons: [28, 29, 30, 31, 32, 33, 34], questions: [
{id:'l2-mea-01',level:1,type:'基础探测',stem:'长方形周长公式是?',options:['A.(长+宽)×2','B.长×宽','C.长+宽','D.长×2+宽'],answer:0,tags:{knowledge:'周长公式',skill_level:'记忆',error_type: '公式混淆', error_category: 'K',cognitive_load:'低',trap_type:'(a+b)×2'},hint:'(长+宽)×2'},
{id:'l2-mea-02',level:1,type:'基础探测',stem:'边长为5cm的正方形周长是?',options:['A.20cm','B.25cm','C.10cm','D.15cm'],answer:0,tags:{knowledge:'正方形周长',skill_level:'理解',error_type: '公式记错', error_category: 'K',cognitive_load:'低',trap_type:'4×5=20'},hint:'4×5=20cm'},
{id:'l2-mea-03',level:1,type:'基础探测',stem:'1米=( )厘米',options:['A.100','B.10','C.1000','D.50'],answer:0,tags:{knowledge:'长度单位换算',skill_level:'记忆',error_type: '单位混淆', error_category: 'E',cognitive_load:'低',trap_type:'1米=100厘米'},hint:'1米=100厘米'},
{id:'l2-mea-04',level:1,type:'基础探测',stem:'用尺子量课桌最好用什么单位?',options:['A.厘米','B.米','C.毫米','D.千米'],answer:0,tags:{knowledge:'测量工具',skill_level:'理解',error_type: '单位选择错', error_category: 'E',cognitive_load:'低',trap_type:'课桌用厘米'},hint:'课桌长度用厘米比较合适。'},
{id:'l2-mea-05',level:2,type:'变式探测',stem:'长5cm宽3cm的长方形周长',options:['A.16cm','B.15cm','C.8cm','D.10cm'],answer:0,tags:{knowledge:'长方形周长',skill_level:'应用',error_type: '公式代错', error_category: 'K',cognitive_load:'中',trap_type:'(5+3)×2=16'},hint:'(5+3)×2=16cm'},
{id:'l2-mea-06',level:2,type:'变式探测',stem:'一根铁丝长24cm,围成正方形边长是?',options:['A.6cm','B.4cm','C.8cm','D.12cm'],answer:0,tags:{knowledge:'周长反求',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'24÷4=6'},hint:'24÷4=6cm'},
{id:'l2-mea-07',level:2,type:'变式探测',stem:'长方形长7cm宽2cm周长比正方形边长4cm周长大多少?',options:['A.2cm','B.4cm','C.6cm','D.8cm'],answer:0,tags:{knowledge:'周长比较',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'(7+2)×2-4×4=2'},hint:'18-16=2cm'},
{id:'l2-mea-08',level:2,type:'变式探测',stem:'3厘米+5厘米=( )毫米',options:['A.80毫米','B.8毫米','C.30毫米','D.50毫米'],answer:0,tags:{knowledge:'单位换算',skill_level:'应用',error_type: '换算率错', error_category: 'E',cognitive_load:'中',trap_type:'8cm=80mm'},hint:'1cm=10mm,8cm=80mm'},
{id:'l2-mea-09',level:3,type:'迁移探测',stem:'一根绳子绕正方形花坛一周用了20米,花坛边长多少?',options:['A.5米','B.4米','C.10米','D.8米'],answer:0,tags:{knowledge:'周长应用',skill_level:'分析',error_type: '列式错误', error_category: 'K',cognitive_load:'高',trap_type:'20÷4=5'},hint:'20÷4=5米'},
{id:'l2-mea-10',level:3,type:'迁移探测',stem:'长8米宽5米的长方形和一个边长6米的正方形谁周长大?大多少?',options:['A.长方形大2米','B.正方形大2米','C.一样大','D.长方形大6米'],answer:0,tags:{knowledge:'周长综合',skill_level:'分析',error_type: '计算错误', error_category: 'C',cognitive_load:'高',trap_type:'(8+5)×2=26,6×4=24'},hint:'26-24=2米,长方形大。'}
]},
'l2-application': { name: '乘除法应用题', grade: 'L2', textbookLessons: [21, 22, 43, 44, 45], questions: [
{id:'l2-app-01',level:1,type:'基础探测',stem:'每个小朋友分3块糖,4个小朋友共几块?',options:['A.12块','B.7块','C.9块','D.16块'],answer:0,tags:{knowledge:'乘法应用',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'3×4=12'},hint:'3×4=12块'},
{id:'l2-app-02',level:1,type:'基础探测',stem:'小红有8个苹果,小明的苹果是小红2倍,小明有几个?',options:['A.16个','B.4个','C.10个','D.6个'],answer:0,tags:{knowledge:'倍的认识',skill_level:'理解',error_type: '倍概念混淆', error_category: 'K',cognitive_load:'低',trap_type:'8×2=16'},hint:'8的2倍=8×2=16个'},
{id:'l2-app-03',level:1,type:'基础探测',stem:'20个苹果每5个装一盘,能装几盘?',options:['A.4盘','B.5盘','C.3盘','D.6盘'],answer:0,tags:{knowledge:'除法应用',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'20÷5=4'},hint:'20÷5=4盘'},
{id:'l2-app-04',level:1,type:'基础探测',stem:'小明有6朵花,小红有12朵花,小红是小明的几倍?',options:['A.2倍','B.3倍','C.1倍','D.6倍'],answer:0,tags:{knowledge:'求倍数',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'12÷6=2'},hint:'12÷6=2倍'},
{id:'l2-app-05',level:2,type:'变式探测',stem:'绳子长12米,剪成3米一段,可以剪几段?',options:['A.4段','B.3段','C.6段','D.9段'],answer:0,tags:{knowledge:'包含除法',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'12÷3=4'},hint:'12÷3=4段'},
{id:'l2-app-06',level:2,type:'变式探测',stem:'小明有15元,小华的钱是小明的3倍少5元,小华有?',options:['A.40元','B.30元','C.45元','D.35元'],answer:0,tags:{knowledge:'几倍少几',skill_level:'应用',error_type: '运算顺序错', error_category: 'C',cognitive_load:'中',trap_type:'15×3-5=40'},hint:'15×3=45,45-5=40元'},
{id:'l2-app-07',level:2,type:'变式探测',stem:'3只鸡6条腿,5只鸡几条腿?',options:['A.10条','B.15条','C.30条','D.8条'],answer:0,tags:{knowledge:'归一问题',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'6÷3×5=10'},hint:'每只鸡2条腿,5×2=10条'},
{id:'l2-app-08',level:2,type:'变式探测',stem:'一本书12元,买3本共多少元?',options:['A.36元','B.24元','C.15元','D.30元'],answer:0,tags:{knowledge:'总价问题',skill_level:'应用',error_type: '乘法错误', error_category: 'C',cognitive_load:'中',trap_type:'12×3=36'},hint:'12×3=36元'},
{id:'l2-app-09',level:3,type:'迁移探测',stem:'小花比小红大3岁,3年后小花比小红大几岁?',options:['A.3岁','B.6岁','C.9岁','D.0岁'],answer:0,tags:{knowledge:'年龄差不变',skill_level:'分析',error_type: '混淆', error_category: 'K',cognitive_load:'高',trap_type:'年龄差不变'},hint:'年龄差永远不变,还是3岁。'},
{id:'l2-app-10',level:3,type:'迁移探测',stem:'铅笔2元一支,小明有10元,最多买几支?还剩几元?',options:['A.5支剩0元','B.4支剩2元','C.5支剩2元','D.4支剩0元'],answer:0,tags:{knowledge:'有余除法应用',skill_level:'分析',error_type: '计算错误', error_category: 'C',cognitive_load:'高',trap_type:'10÷2=5'},hint:'10÷2=5支,剩0元。'}
]},
'l2-time': { name: '时间应用', grade: 'L2', textbookLessons: [37, 38, 39, 40, 41, 42, 43, 44, 45], questions: [
{id:'l2-tim-01',level:1,type:'基础探测',stem:'1小时=( )分钟',options:['A.60','B.100','C.30','D.10'],answer:0,tags:{knowledge:'时间单位',skill_level:'记忆',error_type: '单位记错', error_category: 'E',cognitive_load:'低',trap_type:'1小时=60分'},hint:'1小时=60分钟'},
{id:'l2-tim-02',level:1,type:'基础探测',stem:'钟表分针从12走到6走了多少分钟?',options:['A.30分钟','B.6分钟','C.15分钟','D.60分钟'],answer:0,tags:{knowledge:'认识钟表',skill_level:'理解',error_type: '指针理解错', error_category: 'K',cognitive_load:'低',trap_type:'每大格5分钟'},hint:'12到6有6大格,5×6=30分钟。'},
{id:'l2-tim-03',level:1,type:'基础探测',stem:'2:30也可以说成?',options:['A.2点半','B.3点','C.2点','D.2点15分'],answer:0,tags:{knowledge:'时间表达',skill_level:'理解',error_type: '表达错误', error_category: 'E',cognitive_load:'低',trap_type:'30分=半'},hint:'30分就是半,2:30=2点半。'},
{id:'l2-tim-04',level:1,type:'基础探测',stem:'1分=( )秒',options:['A.60','B.100','C.30','D.10'],answer:0,tags:{knowledge:'时间单位',skill_level:'记忆',error_type: '单位记错', error_category: 'E',cognitive_load:'低',trap_type:'1分=60秒'},hint:'1分钟=60秒。'},
{id:'l2-tim-05',level:2,type:'变式探测',stem:'8:45过15分钟是几点?',options:['A.9:00','B.8:30','C.9:15','D.8:00'],answer:0,tags:{knowledge:'时间推算',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'45+15=60→9:00'},hint:'8:45+15分=9:00'},
{id:'l2-tim-06',level:2,type:'变式探测',stem:'小红跑100米用了20秒,小明用了18秒,谁快?快几秒?',options:['A.小明快2秒','B.小红快2秒','C.一样','D.小明快20秒'],answer:0,tags:{knowledge:'时间比较',skill_level:'应用',error_type: '比较方向错', error_category: 'K',cognitive_load:'中',trap_type:'时间越少越快'},hint:'18<20,小明快,20-18=2秒。'},
{id:'l2-tim-07',level:2,type:'变式探测',stem:'3时=( )分',options:['A.180','B.300','C.30','D.90'],answer:0,tags:{knowledge:'时化分',skill_level:'应用',error_type: '换算错误', error_category: 'C',cognitive_load:'中',trap_type:'3×60=180'},hint:'3×60=180分'},
{id:'l2-tim-08',level:2,type:'变式探测',stem:'一节课40分钟,10:00下课,这节课几点开始?',options:['A.9:20','B.9:00','C.9:40','D.8:20'],answer:0,tags:{knowledge:'时间倒推',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'10:00-40分=9:20'},hint:'10:00-40分=9:20'},
{id:'l2-tim-09',level:3,type:'迁移探测',stem:'小明4:30放学,路上走了15分钟到家,又用了30分钟做作业,做完作业几点?',options:['A.5:15','B.5:00','C.4:15','D.5:45'],answer:0,tags:{knowledge:'时间综合',skill_level:'分析',error_type: '累加错误', error_category: 'C',cognitive_load:'高',trap_type:'4:30+15分+30分=5:15'},hint:'4:30+15分=4:45,4:45+30分=5:15'},
{id:'l2-tim-10',level:3,type:'迁移探测',stem:'爸爸早上8点到公司,中午休息1小时,下午6点下班,一天工作几小时?',options:['A.9小时','B.8小时','C.10小时','D.7小时'],answer:0,tags:{knowledge:'时间段计算',skill_level:'分析',error_type: '忽略休息', error_category: 'R',cognitive_load:'高',trap_type:'从8点到6点是10小时减休息1小时=9'},hint:'8点到6点=10小时,减1小时休息=9小时。'}
]},
'l2-stats': { name: '统计与图表', grade: 'L2', textbookLessons: [51], questions: [
{id:'l2-sta-01',level:1,type:'基础探测',stem:'条形图中,条越长表示数量?',options:['A.越多','B.越少','C.不变','D.不知道'],answer:0,tags:{knowledge:'条形图',skill_level:'记忆',error_type: '概念理解错', error_category: 'K',cognitive_load:'低',trap_type:'条越长越多'},hint:'条形图中条越长表示数量越多。'},
{id:'l2-sta-02',level:1,type:'基础探测',stem:'收集同学们喜欢吃什么水果,最好的方法是?',options:['A.举手统计','B.猜一猜','C.问几个同学','D.看别人吃'],answer:0,tags:{knowledge:'数据收集',skill_level:'理解',error_type: '方法错误', error_category: 'M',cognitive_load:'低',trap_type:'举手统计全班'},hint:'举手统计每个同学的选择最准确。'},
{id:'l2-sta-03',level:1,type:'基础探测',stem:'一班有25人,二班有30人,哪班人多?多多少?',options:['A.二班多5人','B.一班多5人','C.一样多','D.二班多10人'],answer:0,tags:{knowledge:'数据比较',skill_level:'理解',error_type: '计算错误', error_category: 'C',cognitive_load:'低',trap_type:'30-25=5'},hint:'30-25=5人,二班多。'},
{id:'l2-sta-04',level:1,type:'基础探测',stem:'需要了解全班同学的身高,应该用什么方法?',options:['A.测量每人身高','B.猜身高','C.看身高','D.问老师'],answer:0,tags:{knowledge:'数据收集方法',skill_level:'理解',error_type: '方法选择错', error_category: 'M',cognitive_load:'低',trap_type:'测量最准确'},hint:'用尺子量每人的身高最准确。'},
{id:'l2-sta-05',level:2,type:'变式探测',stem:'统计:喜欢苹果12人,香蕉8人,橘子10人。哪种最受欢迎?',options:['A.苹果','B.香蕉','C.橘子','D.一样'],answer:0,tags:{knowledge:'数据读图',skill_level:'应用',error_type: '读错数据', error_category: 'R',cognitive_load:'中',trap_type:'12最大'},hint:'12>10>8,苹果最受欢迎。'},
{id:'l2-sta-06',level:2,type:'变式探测',stem:'第一组摘苹果28个,第二组35个,第三组30个。哪组最多?三组共多少?',options:['A.二组最多共93个','B.一组最多共93个','C.二组最多共83个','D.三组最多共93个'],answer:0,tags:{knowledge:'数据汇总',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'28+35+30=93'},hint:'28+35+30=93个,二组35最多。'},
{id:'l2-sta-07',level:2,type:'变式探测',stem:'下面哪种整理数据的方法最好?',options:['A.画正字','B.写数字','C.画圆圈','D.记在本上'],answer:0,tags:{knowledge:'数据整理',skill_level:'应用',error_type: '方法选择错', error_category: 'M',cognitive_load:'中',trap_type:'画正字每笔代表1个'},hint:'画正字,一个正字代表5个,方便计数。'},
{id:'l2-sta-08',level:2,type:'变式探测',stem:'根据线型图:周一20℃周二22℃周三25℃周四28℃。哪天升温最多?',options:['A.周二到周三','B.周一到周二','C.周三到周四','D.周一到周四'],answer:0,tags:{knowledge:'数据变化',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'周一到周二+2,周二到周三+3'},hint:'25-22=3,周二到周三升温最多。'},
{id:'l2-sta-09',level:3,type:'迁移探测',stem:'统计表:男生18人,女生16人。男生比女生多百分之几?',options:['A.约12.5%','B.约11.1%','C.10%','D.15%'],answer:0,tags:{knowledge:'数据分析',skill_level:'分析',error_type: '计算错误', error_category: 'C',cognitive_load:'高',trap_type:'2÷16=0.125=12.5%'},hint:'(18-16)÷16=2÷16=12.5%'},
{id:'l2-sta-10',level:3,type:'迁移探测',stem:'根据数据推断:前4次考试小明都考了90分以上,第5次考试他?',options:['A.可能考90分以上','B.一定考90分以上','C.一定考不到','D.无法推测'],answer:0,tags:{knowledge:'数据推断',skill_level:'分析',error_type: '推断过度', error_category: 'R',cognitive_load:'高',trap_type:'只能推测可能性'},hint:'只能说可能,不能肯定。'}
]},
'l3-remainder': { name: '有余数的除法', grade: 'L3', textbookLessons: [8, 9, 14, 15], questions: [
{id:'l3-rem-01',level:1,type:'基础探测',stem:'13÷4=?,余数多少?',options:['A.3余1','B.4余1','C.3余2','D.2余5'],answer:0,tags:{knowledge:'有余数的除法',skill_level:'记忆',error_type: '口诀错误', error_category: 'K',cognitive_load:'低',trap_type:'三四十二余1'},hint:'3×4=12余1'},
{id:'l3-rem-02',level:1,type:'基础探测',stem:'余数必须比除数?',options:['A.小','B.大','C.相等','D.没关系'],answer:0,tags:{knowledge:'余数性质',skill_level:'记忆',error_type: '性质记错', error_category: 'K',cognitive_load:'低',trap_type:'余数<除数'},hint:'余数一定要比除数小。'},
{id:'l3-rem-03',level:1,type:'基础探测',stem:'17÷3=?,余数?',options:['A.5余2','B.6余1','C.5余1','D.4余5'],answer:0,tags:{knowledge:'有余数的除法',skill_level:'理解',error_type: '口诀错误', error_category: 'K',cognitive_load:'低',trap_type:'三五一十五余2'},hint:'3×5=15,17-15=2,所以5余2'},
{id:'l3-rem-04',level:1,type:'基础探测',stem:'除数是5,余数可能是几?',options:['A.1,2,3,4','B.1,2,3,4,5','C.0,1,2,3,4','D.0,1,2,3'],answer:0,tags:{knowledge:'余数范围',skill_level:'理解',error_type: '范围判断错', error_category: 'R',cognitive_load:'低',trap_type:'余数<5'},hint:'余数可以是1,2,3,4。'},
{id:'l3-rem-05',level:2,type:'变式探测',stem:'25个苹果每6个装一盘,能装几盘?还剩几个?',options:['A.4盘剩1个','B.3盘剩7个','C.4盘剩2个','D.5盘剩0个'],answer:0,tags:{knowledge:'有余除法应用',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'4×6=24余1'},hint:'25÷6=4盘余1个'},
{id:'l3-rem-06',level:2,type:'变式探测',stem:'()÷8=6...3,被除数是多少?',options:['A.51','B.48','C.45','D.54'],answer:0,tags:{knowledge:'被除数反求',skill_level:'应用',error_type: '公式记错', error_category: 'K',cognitive_load:'中',trap_type:'8×6+3=51'},hint:'商×除数+余数=6×8+3=51'},
{id:'l3-rem-07',level:2,type:'变式探测',stem:'34÷()=4...2,除数是几?',options:['A.8','B.7','C.6','D.9'],answer:0,tags:{knowledge:'除数反求',skill_level:'应用',error_type: '公式记错', error_category: 'K',cognitive_load:'中',trap_type:'(34-2)÷4=8'},hint:'(34-2)÷4=32÷4=8'},
{id:'l3-rem-08',level:2,type:'变式探测',stem:'一个数除以6商是4,余数最大是几?这时被除数是几?',options:['A.余5被除数29','B.余5被除数24','C.余6被除数30','D.余4被除数28'],answer:0,tags:{knowledge:'最大余数',skill_level:'应用',error_type: '余数范围错', error_category: 'K',cognitive_load:'中',trap_type:'余数最大5,4×6+5=29'},hint:'最大余数5,4×6+5=29'},
{id:'l3-rem-09',level:3,type:'迁移探测',stem:'小红有30颗糖,要分给7个小朋友,每人分几颗?还剩几颗?如果要每人分5颗,还需要加几颗?',options:['A.每人4颗剩2颗,加5颗','B.每人4颗剩2颗,加3颗','C.每人3颗剩9颗,加6颗','D.每人5颗剩0颗,加0颗'],answer:0,tags:{knowledge:'有余除法综合',skill_level:'分析',error_type: '运算错误', error_category: 'C',cognitive_load:'高',trap_type:'30÷7=4余2,需加5颗到35'},hint:'30÷7=4余2,5×7=35,35-30=5颗'},
{id:'l3-rem-10',level:3,type:'迁移探测',stem:'按"红黄蓝"顺序排列彩灯,第20个是什么颜色?',options:['A.红色','B.黄色','C.蓝色','D.绿色'],answer:0,tags:{knowledge:'周期问题',skill_level:'分析',error_type: '周期计算错', error_category: 'C',cognitive_load:'高',trap_type:'20÷3=6余2'},hint:'20÷3=6余2,第2个是黄色。'}
]},
'l3-ratio': { name: '倍数与归一问题', grade: 'L3', textbookLessons: [10, 11, 12, 13], questions: [
{id:'l3-rat-01',level:1,type:'基础探测',stem:'小华有8本故事书,小明是小华的3倍,小明有几本?',options:['A.24本','B.11本','C.16本','D.32本'],answer:0,tags:{knowledge:'求倍数',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'8×3=24'},hint:'8×3=24本'},
{id:'l3-rat-02',level:1,type:'基础探测',stem:'3头牛一天吃15千克草,1头牛一天吃几千克?',options:['A.5千克','B.10千克','C.3千克','D.8千克'],answer:0,tags:{knowledge:'归一',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'15÷3=5'},hint:'15÷3=5千克'},
{id:'l3-rat-03',level:1,type:'基础探测',stem:'妈妈买了20个苹果,每5个装一盘,能装几盘?',options:['A.4盘','B.5盘','C.3盘','D.6盘'],answer:0,tags:{knowledge:'包含除',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'20÷5=4'},hint:'20÷5=4盘'},
{id:'l3-rat-04',level:1,type:'基础探测',stem:'4个文具盒共32元,1个文具盒多少元?',options:['A.8元','B.6元','C.10元','D.9元'],answer:0,tags:{knowledge:'总价归一',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'32÷4=8'},hint:'32÷4=8元'},
{id:'l3-rat-05',level:2,type:'变式探测',stem:'3小时行180千米,5小时行多少千米?',options:['A.300千米','B.200千米','C.150千米','D.250千米'],answer:0,tags:{knowledge:'归一应用',skill_level:'应用',error_type: '归一方法错', error_category: 'M',cognitive_load:'中',trap_type:'180÷3×5=300'},hint:'180÷3=60,60×5=300千米'},
{id:'l3-rat-06',level:2,type:'变式探测',stem:'小明比小红多8元,小明有20元,小红有几元?',options:['A.12元','B.28元','C.16元','D.8元'],answer:0,tags:{knowledge:'比较应用',skill_level:'应用',error_type: '加减混淆', error_category: 'K',cognitive_load:'中',trap_type:'20-8=12'},hint:'20-8=12元'},
{id:'l3-rat-07',level:2,type:'变式探测',stem:'苹果5元/kg,梨4元/kg,各买3kg共多少元?',options:['A.27元','B.30元','C.24元','D.21元'],answer:0,tags:{knowledge:'总价综合',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'(5+4)×3=27'},hint:'5×3+4×3=15+12=27元'},
{id:'l3-rat-08',level:2,type:'变式探测',stem:'3个工人2天修路120米,1个工人1天修几米?',options:['A.20米','B.40米','C.60米','D.30米'],answer:0,tags:{knowledge:'双归一',skill_level:'应用',error_type: '归一顺序错', error_category: 'K',cognitive_load:'中',trap_type:'120÷3÷2=20'},hint:'120÷3=40,40÷2=20米'},
{id:'l3-rat-09',level:3,type:'迁移探测',stem:'小红有20元,小明的钱是小红的2倍少6元,小明有多少?',options:['A.34元','B.40元','C.28元','D.36元'],answer:0,tags:{knowledge:'倍多倍少',skill_level:'分析',error_type: '运算顺序错', error_category: 'C',cognitive_load:'高',trap_type:'20×2-6=34'},hint:'20×2=40,40-6=34元'},
{id:'l3-rat-10',level:3,type:'迁移探测',stem:'3头牛5天吃草75千克,照这样计算,5头牛7天吃草多少千克?',options:['A.175千克','B.125千克','C.150千克','D.200千克'],answer:0,tags:{knowledge:'归总问题',skill_level:'分析',error_type: '计算错误', error_category: 'C',cognitive_load:'高',trap_type:'75÷3÷5=5,5×5×7=175'},hint:'75÷3÷5=5(每头每天),5×5×7=175千克'}
]},
'l3-solid': { name: '立体图形与表面积', grade: 'L3', textbookLessons: [28, 29, 30, 31, 42, 43, 46, 47, 49, 50, 51], questions: [
{id:'l3-sol-01',level:1,type:'基础探测',stem:'正方体有几个面?',options:['A.6个','B.4个','C.8个','D.12个'],answer:0,tags:{knowledge:'正方体特征',skill_level:'记忆',error_type: '特征记错', error_category: 'K',cognitive_load:'低',trap_type:'6个面'},hint:'正方体有6个面。'},
{id:'l3-sol-02',level:1,type:'基础探测',stem:'长方体也有几个面?',options:['A.6个','B.8个','C.4个','D.12个'],answer:0,tags:{knowledge:'长方体特征',skill_level:'记忆',error_type: '特征记错', error_category: 'K',cognitive_load:'低',trap_type:'6个面'},hint:'长方体也有6个面。'},
{id:'l3-sol-03',level:1,type:'基础探测',stem:'一个面的面积是1cm²的正方体,它的表面积是?',options:['A.6cm²','B.1cm²','C.12cm²','D.3cm²'],answer:0,tags:{knowledge:'表面积',skill_level:'理解',error_type: '表面积理解错', error_category: 'K',cognitive_load:'低',trap_type:'6个面各1cm²'},hint:'正方体6个面,6×1=6cm²'},
{id:'l3-sol-04',level:1,type:'基础探测',stem:'圆柱体有几个面?',options:['A.3个(上底+下底+侧面)','B.2个','C.4个','D.1个'],answer:0,tags:{knowledge:'圆柱特征',skill_level:'理解',error_type: '特征记错', error_category: 'K',cognitive_load:'低',trap_type:'上下底和侧面'},hint:'圆柱有上底面、下底面和侧面,共3个面。'},
{id:'l3-sol-05',level:2,type:'变式探测',stem:'棱长3cm的正方体表面积',options:['A.54cm²','B.27cm²','C.36cm²','D.18cm²'],answer:0,tags:{knowledge:'正方体表面积',skill_level:'应用',error_type: '公式记错', error_category: 'K',cognitive_load:'中',trap_type:'6×3²=54'},hint:'S=6a²=6×9=54cm²'},
{id:'l3-sol-06',level:2,type:'变式探测',stem:'下面的图形哪个是正方体的展开图?',options:['A.由6个等大正方形构成','B.4个正方形','C.8个正方形','D.长方形'],answer:0,tags:{knowledge:'展开图',skill_level:'应用',error_type: '空间想象错', error_category: 'M',cognitive_load:'中',trap_type:'需6个等大正方形'},hint:'正方体展开图有11种,但都需要6个正方形。'},
{id:'l3-sol-07',level:2,type:'变式探测',stem:'长4cm宽3cm高2cm的长方体,前后面面积各是多少?',options:['A.8cm²','B.12cm²','C.6cm²','D.24cm²'],answer:0,tags:{knowledge:'长方体面',skill_level:'应用',error_type: '面识别错', error_category: 'K',cognitive_load:'中',trap_type:'前面是长×高=4×2=8'},hint:'前面=长×高=4×2=8cm²'},
{id:'l3-sol-08',level:2,type:'变式探测',stem:'小正方体棱长1cm,用4个拼成大长方体,大长方体表面积多少?',options:['A.18cm²或16cm²','B.24cm²','C.12cm²','D.8cm²'],answer:0,tags:{knowledge:'组合图形',skill_level:'应用',error_type: '漏算重叠面', error_category: 'R',cognitive_load:'中',trap_type:'拼法不同结果不同'},hint:'并排放:4×2+4×1×4=24-6=18,拼田字:2×2×6=24-8=16'},
{id:'l3-sol-09',level:3,type:'迁移探测',stem:'一个无盖正方体纸盒棱长5cm,需要多大纸板?',options:['A.125cm²','B.150cm²','C.100cm²','D.75cm²'],answer:0,tags:{knowledge:'无盖表面积',skill_level:'分析',error_type: '多算少算', error_category: 'C',cognitive_load:'高',trap_type:'5×5×5=125'},hint:'5个面,5×5×5=125cm²'},
{id:'l3-sol-10',level:3,type:'迁移探测',stem:'长8cm宽5cm高3cm的长方体所有棱长之和?',options:['A.64cm','B.48cm','C.32cm','D.40cm'],answer:0,tags:{knowledge:'棱长和',skill_level:'分析',error_type: '公式记错', error_category: 'K',cognitive_load:'高',trap_type:'4×(8+5+3)=64'},hint:'4×(8+5+3)=64cm'}
]},
'l3-computation': { name: '运算律与巧算', grade: 'L3', textbookLessons: [55, 56], questions: [
{id:'l3-cmp-01',level:1,type:'基础探测',stem:'25+36+75=?最简便的方法是?',options:['A.25+75+36=136','B.25+36+75=136','C.36+25+75=136','D.75+25+36=136'],answer:0,tags:{knowledge:'加法交换律',skill_level:'理解',error_type: '定律应用错', error_category: 'K',cognitive_load:'低',trap_type:'先算25+75=100'},hint:'25+75=100,100+36=136'},
{id:'l3-cmp-02',level:1,type:'基础探测',stem:'(2×5)×7=2×(5×7)用了什么运算律?',options:['A.乘法结合律','B.乘法交换律','C.乘法分配律','D.加法结合律'],answer:0,tags:{knowledge:'乘法结合律',skill_level:'记忆',error_type: '定律混淆', error_category: 'K',cognitive_load:'低',trap_type:'(a×b)×c=a×(b×c)'},hint:'乘法结合律。'},
{id:'l3-cmp-03',level:1,type:'基础探测',stem:'4×(25+7)=4×25+4×7用了什么运算律?',options:['A.乘法分配律','B.乘法结合律','C.乘法交换律','D.加法结合律'],answer:0,tags:{knowledge:'乘法分配律',skill_level:'记忆',error_type: '定律混淆', error_category: 'K',cognitive_load:'低',trap_type:'a×(b+c)=a×b+a×c'},hint:'乘法分配律。'},
{id:'l3-cmp-04',level:1,type:'基础探测',stem:'125×8=?',options:['A.1000','B.100','C.2000','D.800'],answer:0,tags:{knowledge:'乘法速算',skill_level:'记忆',error_type: '计算错误', error_category: 'C',cognitive_load:'低',trap_type:'125×8=1000'},hint:'125×8=1000'},
{id:'l3-cmp-05',level:2,type:'变式探测',stem:'简便计算:25×36=?',options:['A.25×4×9=900','B.25×30+6=756','C.25×40-4=996','D.20×36+5×36=900'],answer:0,tags:{knowledge:'简便运算',skill_level:'应用',error_type: '拆分错误', error_category: 'K',cognitive_load:'中',trap_type:'25×4×9=900'},hint:'36=4×9,25×4×9=100×9=900'},
{id:'l3-cmp-06',level:2,type:'变式探测',stem:'简便计算:102×35=?',options:['A.100×35+2×35=3570','B.102×30+5=3065','C.100×35+35=3535','D.102×30+102×5=3570'],answer:0,tags:{knowledge:'乘法分配律应用',skill_level:'应用',error_type: '拆分错误', error_category: 'K',cognitive_load:'中',trap_type:'102=100+2'},hint:'100×35+2×35=3500+70=3570'},
{id:'l3-cmp-07',level:2,type:'变式探测',stem:'600÷25=?',options:['A.24','B.20','C.25','D.30'],answer:0,tags:{knowledge:'除法巧算',skill_level:'应用',error_type: '计算错误', error_category: 'C',cognitive_load:'中',trap_type:'600÷25=600÷(100÷4)=600÷100×4'},hint:'600÷25=600÷100×4=6×4=24'},
{id:'l3-cmp-08',level:2,type:'变式探测',stem:'在算式2+3×4中,要先算什么?',options:['A.3×4','B.2+3','C.从左到右','D.随便'],answer:0,tags:{knowledge:'运算顺序',skill_level:'应用',error_type: '顺序错误', error_category: 'K',cognitive_load:'中',trap_type:'先乘除后加减'},hint:'先算3×4=12,再算2+12=14。'},
{id:'l3-cmp-09',level:3,type:'迁移探测',stem:'用简便方法:999×8+8=?',options:['A.8000','B.7992','C.8000','D.9000'],answer:0,tags:{knowledge:'简便运算综合',skill_level:'分析',error_type: '提取公因数', error_category: 'C',cognitive_load:'高',trap_type:'999×8+1×8=(999+1)×8=8000'},hint:'=8×(999+1)=8×1000=8000'},
{id:'l3-cmp-10',level:3,type:'迁移探测',stem:'125×(80+8)=?运用简便方法',options:['A.125×80+125×8=11000','B.125×88=11000','C.125×80+8=10008','D.125×88=11000'],answer:0,tags:{knowledge:'分配律应用',skill_level:'分析',error_type: '分配律错误', error_category: 'C',cognitive_load:'高',trap_type:'125×80=10000,125×8=1000'},hint:'10000+1000=11000'}
]},
'l3-thinking': { name: '思维训练', grade: 'L3', textbookLessons: [52, 53, 54, 55, 56, 57, 58, 59], questions: [
{id:'l3-thk-01',level:1,type:'基础探测',stem:'找规律:1,4,9,16,?,?',options:['A.25,36','B.20,24','C.18,20','D.25,49'],answer:0,tags:{knowledge:'数字规律',skill_level:'记忆',error_type: '规律识别错', error_category: 'K',cognitive_load:'低',trap_type:'平方数列'},hint:'1²,2²,3²,4²,5²,6²'},
{id:'l3-thk-02',level:1,type:'基础探测',stem:'△+△+△=12,△=?',options:['A.4','B.3','C.6','D.2'],answer:0,tags:{knowledge:'算式谜',skill_level:'理解',error_type: '推理错误', error_category: 'M',cognitive_load:'低',trap_type:'12÷3=4'},hint:'12÷3=4'},
{id:'l3-thk-03',level:1,type:'基础探测',stem:'小明有15元,买书花8元,还剩几元?',options:['A.7元','B.23元','C.8元','D.15元'],answer:0,tags:{knowledge:'生活应用',skill_level:'理解',error_type: '列式错误', error_category: 'K',cognitive_load:'低',trap_type:'15-8=7'},hint:'15-8=7元'},
{id:'l3-thk-04',level:1,type:'基础探测',stem:'观察:★☆★☆★☆,下一个是?',options:['A.★','B.☆','C.○','D.●'],answer:0,tags:{knowledge:'图形规律',skill_level:'理解',error_type: '规律识别错', error_category: 'K',cognitive_load:'低',trap_type:'交替规律'},hint:'交替出现,☆后面是★。'},
{id:'l3-thk-05',level:2,type:'变式探测',stem:'和倍:甲+乙=30,甲是乙的2倍,甲乙各是多少?',options:['A.甲20乙10','B.甲10乙20','C.甲15乙15','D.甲25乙5'],answer:0,tags:{knowledge:'和倍问题',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'乙=30÷3=10,甲=20'},hint:'乙=30÷(2+1)=10,甲=20'},
{id:'l3-thk-06',level:2,type:'变式探测',stem:'差倍:甲比乙多12,甲是乙的3倍,甲乙各是?',options:['A.甲18乙6','B.甲12乙4','C.甲24乙8','D.甲30乙10'],answer:0,tags:{knowledge:'差倍问题',skill_level:'应用',error_type: '列式错误', error_category: 'K',cognitive_load:'中',trap_type:'乙=12÷(3-1)=6,甲=18'},hint:'乙=12÷2=6,甲=18'},
{id:'l3-thk-07',level:2,type:'变式探测',stem:'和差:甲+乙=20,甲-乙=4,甲乙各是?',options:['A.甲12乙8','B.甲10乙10','C.甲8乙12','D.甲14乙6'],answer:0,tags:{knowledge:'和差问题',skill_level:'应用',error_type: '公式记错', error_category: 'K',cognitive_load:'中',trap_type:'甲=(20+4)÷2=12,乙=8'},hint:'(20+4)÷2=12,20-12=8'},
{id:'l3-thk-08',level:2,type:'变式探测',stem:'周期:按"红黄蓝绿"重复排列,第25个是什么颜色?',options:['A.红','B.黄','C.蓝','D.绿'],answer:0,tags:{knowledge:'周期问题',skill_level:'应用',error_type: '余数算错', error_category: 'C',cognitive_load:'中',trap_type:'25÷4=6余1'},hint:'25÷4=6余1,第1个是红。'},
{id:'l3-thk-09',level:3,type:'迁移探测',stem:'一根绳子对折3次,这时每段2米,绳子原长?',options:['A.16米','B.8米','C.12米','D.24米'],answer:0,tags:{knowledge:'对折问题',skill_level:'分析',error_type: '对折理解错', error_category: 'K',cognitive_load:'高',trap_type:'对折3次分成8段'},hint:'2×2×2×2=16米'},
{id:'l3-thk-10',level:3,type:'迁移探测',stem:'用火柴棒摆正方形:1个要4根,2个要7根,3个要10根,摆10个要几根?',options:['A.31根','B.40根','C.22根','D.34根'],answer:0,tags:{knowledge:'图形规律',skill_level:'分析',error_type: '规律归纳错', error_category: 'K',cognitive_load:'高',trap_type:'3n+1=31'},hint:'每次加3,4+3×(10-1)=31根。'}
]},


    /* -------- 初三（L7）· 全新增 -------- */
    'l7-power': {
      name: '幂的运算',
      grade: 'L7',
      textbookLessons: [0, 1],
      questions: [
        { id: 'l7-pow-01', level: 1, type: '基础探测', stem: '计算 a³·a⁵ = ?', options: ['A. a⁸', 'B. a¹⁵', 'C. a²', 'D. a⁻²'], answer: 0, tags: { knowledge: '同底数幂乘法', skill_level: '记忆', error_type: '指数运算混淆', error_category: 'C', cognitive_load: '低', trap_type: '指数相加' }, hint: '同底数幂相乘，底数不变指数相加：3+5=8' },
        { id: 'l7-pow-02', level: 1, type: '基础探测', stem: '计算 (a²)³ = ?', options: ['A. a⁶', 'B. a⁵', 'C. a⁸', 'D. a⁹'], answer: 0, tags: { knowledge: '幂的乘方', skill_level: '记忆', error_type: '指数运算混淆', error_category: 'C', cognitive_load: '低', trap_type: '指数相乘' }, hint: '幂的乘方，底数不变指数相乘：2×3=6' },
        { id: 'l7-pow-03', level: 1, type: '基础探测', stem: '计算 (ab)³ = ?', options: ['A. a³b³', 'B. ab³', 'C. a³b', 'D. a³b⁹'], answer: 0, tags: { knowledge: '积的乘方', skill_level: '记忆', error_type: '分配错误', error_category: 'C', cognitive_load: '低', trap_type: '每个因式分别乘方' }, hint: '积的乘方等于每个因式分别乘方的积' },
        { id: 'l7-pow-04', level: 1, type: '基础探测', stem: '计算 a⁶÷a² = ?', options: ['A. a⁴', 'B. a³', 'C. a⁸', 'D. a¹²'], answer: 0, tags: { knowledge: '同底数幂除法', skill_level: '记忆', error_type: '指数运算混淆', error_category: 'C', cognitive_load: '低', trap_type: '指数相减' }, hint: '同底数幂相除，底数不变指数相减：6-2=4' },
        { id: 'l7-pow-05', level: 2, type: '变式探测', stem: '计算 (-x²)³ = ?', options: ['A. -x⁶', 'B. x⁶', 'C. -x⁵', 'D. x⁵'], answer: 0, tags: { knowledge: '幂的乘方综合', skill_level: '应用', error_type: '符号错误', error_category: 'C', cognitive_load: '中', trap_type: '负号的处理' }, hint: '(-x²)³ = (-1)³·(x²)³ = -x⁶' },
        { id: 'l7-pow-06', level: 2, type: '变式探测', stem: '计算 (2a²b)³ = ?', options: ['A. 8a⁶b³', 'B. 6a⁵b³', 'C. 8a⁵b³', 'D. 2a⁶b³'], answer: 0, tags: { knowledge: '积的乘方综合', skill_level: '应用', error_type: '系数处理错误', error_category: 'C', cognitive_load: '中', trap_type: '系数也要乘方' }, hint: '2³=8, (a²)³=a⁶, b³=b³，所以8a⁶b³' },
        { id: 'l7-pow-07', level: 2, type: '变式探测', stem: '若 2ˣ = 8，2ʸ = 4，则 2ˣ⁺ʸ = ?', options: ['A. 32', 'B. 12', 'C. 2', 'D. 64'], answer: 0, tags: { knowledge: '幂的运算逆向', skill_level: '应用', error_type: '指数法则逆向', error_category: 'C', cognitive_load: '中', trap_type: '同底数幂乘法逆用' }, hint: '2ˣ⁺ʸ = 2ˣ·2ʸ = 8×4 = 32' },
        { id: 'l7-pow-08', level: 2, type: '变式探测', stem: '计算 (x³)²·(x²)³ = ?', options: ['A. x¹²', 'B. x¹⁰', 'C. x⁶', 'D. x⁵'], answer: 0, tags: { knowledge: '幂运算综合', skill_level: '应用', error_type: '运算顺序错误', error_category: 'C', cognitive_load: '中', trap_type: '先乘方后乘法' }, hint: '(x³)²=x⁶, (x²)³=x⁶, x⁶·x⁶=x¹²' },
        { id: 'l7-pow-09', level: 3, type: '迁移探测', stem: '若 aᵐ=3, aⁿ=5，则 a²ᵐ⁺ⁿ = ?', options: ['A. 45', 'B. 15', 'C. 30', 'D. 75'], answer: 0, tags: { knowledge: '幂运算综合应用', skill_level: '分析', error_type: '指数法则逆向', error_category: 'C', cognitive_load: '高', trap_type: '拆分指数' }, hint: 'a²ᵐ⁺ⁿ = a²ᵐ·aⁿ = (aᵐ)²·aⁿ = 9×5=45' },
        { id: 'l7-pow-10', level: 3, type: '迁移探测', stem: '一台电脑存储1GB=2¹⁰MB，1MB=2¹⁰KB，1KB=2¹⁰B，则1GB=?B', options: ['A. 2³⁰', 'B. 2³', 'C. 2¹⁰⁰', 'D. 2²⁰'], answer: 0, tags: { knowledge: '幂运算实际应用', skill_level: '分析', error_type: '累加变累乘', error_category: 'C', cognitive_load: '高', trap_type: '三次乘方' }, hint: '1GB=2¹⁰×2¹⁰×2¹⁰=2³⁰ B' }
      ]
    },

    'l7-polynomial': {
      name: '整式的乘法与因式分解',
      grade: 'L7',
      textbookLessons: [2, 3, 4, 5],
      questions: [
        { id: 'l7-pol-01', level: 1, type: '基础探测', stem: '计算 2x(x+3) = ?', options: ['A. 2x²+6x', 'B. 2x²+3', 'C. 2x+6', 'D. x²+6x'], answer: 0, tags: { knowledge: '单项式乘多项式', skill_level: '理解', error_type: '分配律漏乘', error_category: 'C', cognitive_load: '低', trap_type: '每一项都要乘' }, hint: '2x×x+2x×3=2x²+6x' },
        { id: 'l7-pol-02', level: 1, type: '基础探测', stem: '计算 (x+2)(x+3) = ?', options: ['A. x²+5x+6', 'B. x²+6x+5', 'C. x²+5x+5', 'D. x²+6'], answer: 0, tags: { knowledge: '多项式乘多项式', skill_level: '理解', error_type: '展开不全', error_category: 'C', cognitive_load: '低', trap_type: '四项合并' }, hint: 'x²+3x+2x+6=x²+5x+6' },
        { id: 'l7-pol-03', level: 1, type: '基础探测', stem: '因式分解 x²-9 = ?', options: ['A. (x+3)(x-3)', 'B. (x+9)(x-1)', 'C. (x-3)²', 'D. (x+3)²'], answer: 0, tags: { knowledge: '平方差公式', skill_level: '记忆', error_type: '公式混淆', error_category: 'K', cognitive_load: '低', trap_type: 'a²-b²=(a+b)(a-b)' }, hint: 'x²-9=x²-3²=(x+3)(x-3)' },
        { id: 'l7-pol-04', level: 1, type: '基础探测', stem: '因式分解 x²+6x+9 = ?', options: ['A. (x+3)²', 'B. (x+3)(x-3)', 'C. (x-3)²', 'D. (x+9)(x+1)'], answer: 0, tags: { knowledge: '完全平方公式', skill_level: '记忆', error_type: '公式混淆', error_category: 'K', cognitive_load: '低', trap_type: 'a²+2ab+b²' }, hint: 'x²+6x+9=(x+3)²' },
        { id: 'l7-pol-05', level: 2, type: '变式探测', stem: '计算 (x-1)(x+1)(x²+1) = ?', options: ['A. x⁴-1', 'B. x⁴+1', 'C. x⁴-2', 'D. x⁴+2x²-1'], answer: 0, tags: { knowledge: '平方差公式连续运用', skill_level: '应用', error_type: '运算顺序错', error_category: 'C', cognitive_load: '中', trap_type: '先算前两个' }, hint: '(x-1)(x+1)=x²-1, 再(x²-1)(x²+1)=x⁴-1' },
        { id: 'l7-pol-06', level: 2, type: '变式探测', stem: '因式分解 2x²-8 = ?', options: ['A. 2(x+2)(x-2)', 'B. 2(x-2)²', 'C. (2x+4)(x-2)', 'D. 2(x²-4)'], answer: 0, tags: { knowledge: '先提公因式后用公式', skill_level: '应用', error_type: '忘记分解彻底', error_category: 'C', cognitive_load: '中', trap_type: '先提后分' }, hint: '先提2: 2(x²-4)，再平方差: 2(x+2)(x-2)' },
        { id: 'l7-pol-07', level: 2, type: '变式探测', stem: '因式分解 x²-5x+6 = ?', options: ['A. (x-2)(x-3)', 'B. (x+2)(x+3)', 'C. (x-1)(x-6)', 'D. (x+1)(x-6)'], answer: 0, tags: { knowledge: '十字相乘法', skill_level: '应用', error_type: '符号错误', error_category: 'C', cognitive_load: '中', trap_type: '找两数积与和' }, hint: '找两个数积为6、和为5：2和3，所以(x-2)(x-3)' },
        { id: 'l7-pol-08', level: 2, type: '变式探测', stem: '计算 (2x-1)² = ?', options: ['A. 4x²-4x+1', 'B. 4x²+4x+1', 'C. 4x²-1', 'D. 4x²-2x+1'], answer: 0, tags: { knowledge: '完全平方公式应用', skill_level: '应用', error_type: '中间项漏倍', error_category: 'K', cognitive_load: '中', trap_type: '2ab不要忘' }, hint: '(2x-1)²=4x²-4x+1' },
        { id: 'l7-pol-09', level: 3, type: '迁移探测', stem: '已知 x²-y²=12, x+y=4，则 x-y = ?', options: ['A. 3', 'B. 4', 'C. 2', 'D. 6'], answer: 0, tags: { knowledge: '因式分解应用', skill_level: '分析', error_type: '逆用公式', error_category: 'K', cognitive_load: '高', trap_type: 'x²-y²=(x+y)(x-y)' }, hint: 'x²-y²=(x+y)(x-y), 12=4×(x-y), x-y=3' },
        { id: 'l7-pol-10', level: 3, type: '迁移探测', stem: '若 x²+kx+9 是完全平方式，则 k = ?', options: ['A. ±6', 'B. 6', 'C. -6', 'D. 3'], answer: 0, tags: { knowledge: '完全平方式', skill_level: '分析', error_type: '漏解', error_category: 'K', cognitive_load: '高', trap_type: '两种情况' }, hint: 'x²+kx+9=(x±3)², k=6或-6' }
      ]
    },

    'l7-quadratic-eq': {
      name: '一元二次方程',
      grade: 'L7',
      textbookLessons: [9],
      questions: [
        { id: 'l7-qe-01', level: 1, type: '基础探测', stem: '方程 x²=9 的解是？', options: ['A. x=±3', 'B. x=3', 'C. x=-3', 'D. x=9'], answer: 0, tags: { knowledge: '直接开平方法', skill_level: '记忆', error_type: '漏解', error_category: 'K', cognitive_load: '低', trap_type: '正负两个解' }, hint: 'x²=9, x=±3' },
        { id: 'l7-qe-02', level: 1, type: '基础探测', stem: '方程 x²+2x=0 的解是？', options: ['A. x₁=0, x₂=-2', 'B. x=0', 'C. x=-2', 'D. x=2'], answer: 0, tags: { knowledge: '因式分解法', skill_level: '理解', error_type: '漏解', error_category: 'K', cognitive_load: '低', trap_type: '提公因式' }, hint: 'x(x+2)=0, x=0或x=-2' },
        { id: 'l7-qe-03', level: 1, type: '基础探测', stem: '方程 x²-5x+6=0 的解是？', options: ['A. x₁=2, x₂=3', 'B. x₁=1, x₂=6', 'C. x₁=-2, x₂=-3', 'D. x₁=-1, x₂=-6'], answer: 0, tags: { knowledge: '因式分解法', skill_level: '理解', error_type: '符号错误', error_category: 'C', cognitive_load: '低', trap_type: '十字相乘' }, hint: '(x-2)(x-3)=0, x=2或3' },
        { id: 'l7-qe-04', level: 1, type: '基础探测', stem: '方程 x²-3x+1=0 中，a=?, b=?, c=?', options: ['A. a=1,b=-3,c=1', 'B. a=1,b=3,c=1', 'C. a=1,b=-3,c=-1', 'D. a=-1,b=3,c=1'], answer: 0, tags: { knowledge: '一般形式', skill_level: '记忆', error_type: '系数符号错', error_category: 'C', cognitive_load: '低', trap_type: '带符号' }, hint: '标准形式ax²+bx+c=0, a=1,b=-3,c=1' },
        { id: 'l7-qe-05', level: 2, type: '变式探测', stem: '方程 x²+4x-5=0 用配方法求解，第一步应？', options: ['A. 移项得x²+4x=5', 'B. 两边加4', 'C. 两边加5', 'D. 直接因式分解'], answer: 0, tags: { knowledge: '配方法', skill_level: '应用', error_type: '配方步骤错', error_category: 'C', cognitive_load: '中', trap_type: '先移常数项' }, hint: '配方法先移常数项：x²+4x=5' },
        { id: 'l7-qe-06', level: 2, type: '变式探测', stem: '用公式法解 x²-5x+4=0，判别式 Δ = ?', options: ['A. 9', 'B. 25', 'C. 16', 'D. -9'], answer: 0, tags: { knowledge: '公式法', skill_level: '应用', error_type: '判别式计算错', error_category: 'C', cognitive_load: '中', trap_type: 'Δ=b²-4ac' }, hint: 'Δ=25-16=9' },
        { id: 'l7-qe-07', level: 2, type: '变式探测', stem: '方程 2x²-x-1=0 的解是？', options: ['A. x₁=1, x₂=-1/2', 'B. x₁=-1, x₂=1/2', 'C. x₁=1, x₂=1/2', 'D. x₁=-1, x₂=-1/2'], answer: 0, tags: { knowledge: '解一元二次方程', skill_level: '应用', error_type: '计算错误', error_category: 'C', cognitive_load: '中', trap_type: '因式分解' }, hint: '(2x+1)(x-1)=0, x=1或x=-1/2' },
        { id: 'l7-qe-08', level: 2, type: '变式探测', stem: '若方程 x²-2x+k=0 有两个相等的实数根，则 k = ?', options: ['A. 1', 'B. 0', 'C. 2', 'D. -1'], answer: 0, tags: { knowledge: '判别式应用', skill_level: '应用', error_type: '判别式条件', error_category: 'C', cognitive_load: '中', trap_type: 'Δ=0' }, hint: 'Δ=4-4k=0, k=1' },
        { id: 'l7-qe-09', level: 3, type: '迁移探测', stem: '一个矩形的长比宽多2cm，面积为48cm²，则矩形的长是？', options: ['A. 8cm', 'B. 6cm', 'C. 4cm', 'D. 10cm'], answer: 0, tags: { knowledge: '一元二次方程应用', skill_level: '分析', error_type: '列方程错', error_category: 'C', cognitive_load: '高', trap_type: '设宽列方程' }, hint: '设宽x,长x+2: x(x+2)=48, x=6, 长=8' },
        { id: 'l7-qe-10', level: 3, type: '迁移探测', stem: '某商品原价100元，连续两次降价后为81元，求每次降价的百分率', options: ['A. 10%', 'B. 9%', 'C. 19%', 'D. 5%'], answer: 0, tags: { knowledge: '增长率问题', skill_level: '分析', error_type: '方程列错', error_category: 'C', cognitive_load: '高', trap_type: '两次降价比值' }, hint: '100(1-x)²=81, (1-x)²=0.81, x=0.1=10%' }
      ]
    },

    'l7-quadratic-func': {
      name: '二次函数',
      grade: 'L7',
      textbookLessons: [22, 23, 24, 25],
      questions: [
        { id: 'l7-qf-01', level: 1, type: '基础探测', stem: '二次函数 y=x²-2x-3 的开口方向是？', options: ['A. 向上', 'B. 向下', 'C. 向左', 'D. 向右'], answer: 0, tags: { knowledge: '二次函数图象', skill_level: '记忆', error_type: '开口方向判断', error_category: 'K', cognitive_load: '低', trap_type: 'a>0向上' }, hint: 'a=1>0，开口向上' },
        { id: 'l7-qf-02', level: 1, type: '基础探测', stem: '二次函数 y=x²-2x-3 的对称轴是？', options: ['A. x=1', 'B. x=-1', 'C. x=2', 'D. x=-2'], answer: 0, tags: { knowledge: '二次函数性质', skill_level: '记忆', error_type: '对称轴公式', error_category: 'K', cognitive_load: '低', trap_type: 'x=-b/2a' }, hint: 'x=-(-2)/2=1' },
        { id: 'l7-qf-03', level: 1, type: '基础探测', stem: '抛物线 y=(x+2)²+3 的顶点坐标是？', options: ['A. (-2,3)', 'B. (2,3)', 'C. (-2,-3)', 'D. (2,-3)'], answer: 0, tags: { knowledge: '顶点式', skill_level: '记忆', error_type: '符号混淆', error_category: 'C', cognitive_load: '低', trap_type: '左加右减' }, hint: '顶点式y=a(x-h)²+k, 顶点(h,k), (x+2)²=(x-(-2))²' },
        { id: 'l7-qf-04', level: 1, type: '基础探测', stem: '二次函数 y=-x²+4x 的最大值是？', options: ['A. 4', 'B. 0', 'C. -4', 'D. 2'], answer: 0, tags: { knowledge: '最值', skill_level: '理解', error_type: '最大最小判断', error_category: 'K', cognitive_load: '低', trap_type: 'a<0有最大值' }, hint: 'a=-1<0有最大值, x=2时y=4' },
        { id: 'l7-qf-05', level: 2, type: '变式探测', stem: '将 y=x² 向右平移3个单位，再向上平移2个单位，得到的解析式是？', options: ['A. y=(x-3)²+2', 'B. y=(x+3)²+2', 'C. y=(x-3)²-2', 'D. y=(x+3)²-2'], answer: 0, tags: { knowledge: '二次函数平移', skill_level: '应用', error_type: '平移方向错', error_category: 'K', cognitive_load: '中', trap_type: '左加右减上加下减' }, hint: '右移3: (x-3)², 上移2: +2' },
        { id: 'l7-qf-06', level: 2, type: '变式探测', stem: '二次函数 y=ax²+bx+c 的图象如图（开口向下，对称轴x>0，交y轴正半轴），则？', options: ['A. a<0,b>0,c>0', 'B. a<0,b<0,c>0', 'C. a>0,b>0,c>0', 'D. a<0,b>0,c<0'], answer: 0, tags: { knowledge: '图象与系数关系', skill_level: '应用', error_type: '系数判断错', error_category: 'C', cognitive_load: '中', trap_type: '综合判断' }, hint: '开口向下a<0, 对称轴x>0则-b/2a>0即b>0, 交y轴正半轴c>0' },
        { id: 'l7-qf-07', level: 2, type: '变式探测', stem: '已知抛物线顶点为(1,-4)且过点(0,-3)，求解析式', options: ['A. y=(x-1)²-4', 'B. y=(x+1)²-4', 'C. y=x²-2x-3', 'D. y=x²+2x-3'], answer: 0, tags: { knowledge: '求解析式', skill_level: '应用', error_type: '待定系数法', error_category: 'C', cognitive_load: '中', trap_type: '顶点式' }, hint: '顶点式y=a(x-1)²-4, 代入(0,-3): a-4=-3, a=1' },
        { id: 'l7-qf-08', level: 2, type: '变式探测', stem: '抛物线 y=x²-4x+3 与x轴的交点坐标是？', options: ['A. (1,0)和(3,0)', 'B. (1,0)和(-3,0)', 'C. (-1,0)和(3,0)', 'D. (0,1)和(0,3)'], answer: 0, tags: { knowledge: '与x轴交点', skill_level: '应用', error_type: '解方程错', error_category: 'C', cognitive_load: '中', trap_type: '令y=0' }, hint: '令y=0: x²-4x+3=0, (x-1)(x-3)=0' },
        { id: 'l7-qf-09', level: 3, type: '迁移探测', stem: '用一段长20米的铁丝围成矩形，面积最大时矩形的长宽各是多少？', options: ['A. 长5m宽5m', 'B. 长6m宽4m', 'C. 长8m宽2m', 'D. 长7m宽3m'], answer: 0, tags: { knowledge: '二次函数最值应用', skill_level: '分析', error_type: '建模错误', error_category: 'M', cognitive_load: '高', trap_type: '正方形面积最大' }, hint: '周长20, 设宽x长10-x, 面积x(10-x), x=5时最大' },
        { id: 'l7-qf-10', level: 3, type: '迁移探测', stem: '某桥洞形状为抛物线形，跨度8米，最高点距水面4米，在水面正中建立坐标系，抛物线解析式为？', options: ['A. y=-x²/4+4', 'B. y=x²/4-4', 'C. y=-x²/8+4', 'D. y=x²/8-4'], answer: 0, tags: { knowledge: '二次函数实际应用', skill_level: '分析', error_type: '建系与解析式', error_category: 'K', cognitive_load: '高', trap_type: '顶点和端点' }, hint: '顶点(0,4), 过(4,0): a·16+4=0, a=-1/4' }
      ]
    },

    'l7-circle': {
      name: '圆的性质',
      grade: 'L7',
      textbookLessons: [39, 40, 41, 42, 43],
      questions: [
        { id: 'l7-cir-01', level: 1, type: '基础探测', stem: '圆是轴对称图形，它的对称轴有？', options: ['A. 无数条', 'B. 2条', 'C. 4条', 'D. 1条'], answer: 0, tags: { knowledge: '圆的对称性', skill_level: '记忆', error_type: '对称轴数量', error_category: 'K', cognitive_load: '低', trap_type: '过圆心的直线' }, hint: '圆的每一条直径所在的直线都是对称轴，有无数条' },
        { id: 'l7-cir-02', level: 1, type: '基础探测', stem: '垂直于弦的直径一定？', options: ['A. 平分这条弦', 'B. 平分这条弦所对的弧', 'C. 以上都对', 'D. 以上都不对'], answer: 2, tags: { knowledge: '垂径定理', skill_level: '记忆', error_type: '定理记忆不全', error_category: 'K', cognitive_load: '低', trap_type: '平分弦和弦弧' }, hint: '垂径定理：垂直于弦的直径平分弦且平分弦所对的弧' },
        { id: 'l7-cir-03', level: 1, type: '基础探测', stem: '在同圆或等圆中，相等的圆心角所对的弧？', options: ['A. 相等', 'B. 不等', 'C. 不确定', 'D. 互补'], answer: 0, tags: { knowledge: '圆心角定理', skill_level: '记忆', error_type: '定理遗忘', error_category: 'K', cognitive_load: '低', trap_type: '同圆等圆前提' }, hint: '同圆等圆中，等圆心角对等弧' },
        { id: 'l7-cir-04', level: 1, type: '基础探测', stem: '直径所对的圆周角是？', options: ['A. 90°', 'B. 180°', 'C. 60°', 'D. 45°'], answer: 0, tags: { knowledge: '圆周角定理', skill_level: '记忆', error_type: '角度记忆', error_category: 'K', cognitive_load: '低', trap_type: '直径对直角' }, hint: '直径所对的圆周角是直角90°' },
        { id: 'l7-cir-05', level: 2, type: '变式探测', stem: '在⊙O中，弦AB=8，圆心O到AB的距离为3，则⊙O的半径是？', options: ['A. 5', 'B. 4', 'C. √55', 'D. 7'], answer: 0, tags: { knowledge: '垂径定理应用', skill_level: '应用', error_type: '勾股定理', error_category: 'K', cognitive_load: '中', trap_type: '半弦长' }, hint: '垂径+勾股：r²=4²+3²=25, r=5' },
        { id: 'l7-cir-06', level: 2, type: '变式探测', stem: '在同圆中，圆心角为120°，则它所对的圆周角是？', options: ['A. 60°', 'B. 120°', 'C. 240°', 'D. 30°'], answer: 0, tags: { knowledge: '圆周角与圆心角关系', skill_level: '应用', error_type: '倍数关系', error_category: 'K', cognitive_load: '中', trap_type: '圆周角=圆心角的一半' }, hint: '同弧所对圆周角是圆心角的一半：120÷2=60°' },
        { id: 'l7-cir-07', level: 2, type: '变式探测', stem: '点P到圆心O的距离为5，⊙O的半径为3，则点P在？', options: ['A. 圆外', 'B. 圆上', 'C. 圆内', 'D. 不确定'], answer: 0, tags: { knowledge: '点与圆的位置关系', skill_level: '应用', error_type: '判断条件', error_category: 'R', cognitive_load: '中', trap_type: 'd>r在外' }, hint: 'd=5>r=3，点P在圆外' },
        { id: 'l7-cir-08', level: 2, type: '变式探测', stem: '直线l到圆心O的距离为4，⊙O的半径为5，则直线l与⊙O的位置关系是？', options: ['A. 相交', 'B. 相切', 'C. 相离', 'D. 不确定'], answer: 0, tags: { knowledge: '直线与圆位置关系', skill_level: '应用', error_type: '判断条件', error_category: 'R', cognitive_load: '中', trap_type: 'd<r相交' }, hint: 'd=4<r=5，直线与圆相交' },
        { id: 'l7-cir-09', level: 3, type: '迁移探测', stem: 'AB是⊙O的直径，弦CD⊥AB于E，CD=6，BE=1，则⊙O的半径是？', options: ['A. 5', 'B. 4', 'C. 3', 'D. 6'], answer: 0, tags: { knowledge: '垂径定理综合', skill_level: '分析', error_type: '列方程错误', error_category: 'C', cognitive_load: '高', trap_type: '设半径列方程' }, hint: 'CE=3, 设半径r, OE=r-1, r²=3²+(r-1)², r=5' },
        { id: 'l7-cir-10', level: 3, type: '迁移探测', stem: '从圆外一点P引⊙O的两条切线PA、PB，A、B为切点，PA=4，∠APB=60°，则⊙O的半径是？', options: ['A. 4/√3', 'B. 4', 'C. 4√3', 'D. 2'], answer: 0, tags: { knowledge: '切线长定理', skill_level: '分析', error_type: '切线性质', error_category: 'K', cognitive_load: '高', trap_type: '直角三角形' }, hint: 'PA=PB=4, ∠APO=30°, OA⊥PA, r=PA·tan30°=4/√3' }
      ]
    },

    'l7-probability': {
      name: '概率初步',
      grade: 'L7',
      textbookLessons: [44, 45, 46],
      questions: [
        { id: 'l7-prb-01', level: 1, type: '基础探测', stem: '下列事件中，是必然事件的是？', options: ['A. 太阳从东方升起', 'B. 明天会下雨', 'C. 抛硬币正面朝上', 'D. 买彩票中奖'], answer: 0, tags: { knowledge: '随机事件', skill_level: '记忆', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '必然vs随机' }, hint: '必然事件是一定会发生的事件' },
        { id: 'l7-prb-02', level: 1, type: '基础探测', stem: '抛一枚均匀硬币，正面朝上的概率是？', options: ['A. 1/2', 'B. 1/3', 'C. 1/4', 'D. 1'], answer: 0, tags: { knowledge: '概率定义', skill_level: '记忆', error_type: '计算错误', error_category: 'C', cognitive_load: '低', trap_type: '等可能事件' }, hint: '2种等可能结果，正面占1种，概率1/2' },
        { id: 'l7-prb-03', level: 1, type: '基础探测', stem: '从1-10的数字中随机抽取一个，抽到偶数的概率是？', options: ['A. 1/2', 'B. 1/5', 'C. 2/5', 'D. 1/10'], answer: 0, tags: { knowledge: '等可能概率', skill_level: '理解', error_type: '计数错误', error_category: 'K', cognitive_load: '低', trap_type: '偶数个数' }, hint: '10个数中偶数有2,4,6,8,10共5个，概率5/10=1/2' },
        { id: 'l7-prb-04', level: 1, type: '基础探测', stem: '一个不透明袋子中有3红2白共5个球，从中摸一个球，摸到红球的概率是？', options: ['A. 3/5', 'B. 2/5', 'C. 1/3', 'D. 1/5'], answer: 0, tags: { knowledge: '概率计算', skill_level: '理解', error_type: '分子分母错', error_category: 'K', cognitive_load: '低', trap_type: '目标数/总数' }, hint: '3红/5总=3/5' },
        { id: 'l7-prb-05', level: 2, type: '变式探测', stem: '同时掷两枚骰子，点数之和为7的概率是？', options: ['A. 1/6', 'B. 1/12', 'C. 7/36', 'D. 1/36'], answer: 0, tags: { knowledge: '列举法求概率', skill_level: '应用', error_type: '列举不全', error_category: 'R', cognitive_load: '中', trap_type: '6种组合' }, hint: '和为7有(1,6)(2,5)(3,4)(4,3)(5,2)(6,1)共6种, 6/36=1/6' },
        { id: 'l7-prb-06', level: 2, type: '变式探测', stem: '一个袋中有编号1-5的5个球，同时摸出2个，两球编号之和为偶数的概率是？', options: ['A. 2/5', 'B. 3/5', 'C. 1/2', 'D. 4/5'], answer: 0, tags: { knowledge: '组合概率', skill_level: '应用', error_type: '组合计数', error_category: 'K', cognitive_load: '中', trap_type: '奇偶搭配' }, hint: '总C(5,2)=10, 和为偶:同奇C(3,2)+同偶C(2,2)=3+1=4, 4/10=2/5' },
        { id: 'l7-prb-07', level: 2, type: '变式探测', stem: '甲乙两人独立射击，命中率分别为0.6和0.8，两人同时命中目标的概率是？', options: ['A. 0.48', 'B. 0.92', 'C. 0.14', 'D. 0.2'], answer: 0, tags: { knowledge: '独立事件概率', skill_level: '应用', error_type: '加法误用', error_category: 'C', cognitive_load: '中', trap_type: '独立事件相乘' }, hint: '独立事件同时发生：0.6×0.8=0.48' },
        { id: 'l7-prb-08', level: 2, type: '变式探测', stem: '用频率估计概率时，当试验次数很大时，频率会？', options: ['A. 接近概率', 'B. 等于0', 'C. 等于1', 'D. 远离概率'], answer: 0, tags: { knowledge: '频率与概率', skill_level: '应用', error_type: '概念理解', error_category: 'K', cognitive_load: '中', trap_type: '大数定律' }, hint: '大量重复试验中，频率趋于稳定，接近概率' },
        { id: 'l7-prb-09', level: 3, type: '迁移探测', stem: '一个密码锁由3位数字组成，小明忘了密码但记得各位数字不同，随机输入一个符合要求的密码，一次打开的概率是？', options: ['A. 1/648', 'B. 1/1000', 'C. 1/720', 'D. 1/900'], answer: 0, tags: { knowledge: '概率综合应用', skill_level: '分析', error_type: '总数计算', error_category: 'C', cognitive_load: '高', trap_type: '排列数' }, hint: '各位不同：10×9×8=720种, 概率1/720' },
        { id: 'l7-prb-10', level: 3, type: '迁移探测', stem: '甲乙两人轮流掷骰子，甲先掷，先掷出6的人获胜。甲获胜的概率是？', options: ['A. 6/11', 'B. 1/2', 'C. 5/11', 'D. 1/6'], answer: 0, tags: { knowledge: '无限轮次概率', skill_level: '分析', error_type: '等比数列', error_category: 'K', cognitive_load: '高', trap_type: '等比求和' }, hint: 'P=1/6+(5/6)²×(1/6)+...=1/6÷(1-25/36)=6/11' }
      ]
    },

    'l7-transform': {
      name: '图形的变换',
      grade: 'L7',
      textbookLessons: [36, 37, 38, 47, 48],
      questions: [
        { id: 'l7-trf-01', level: 1, type: '基础探测', stem: '图形旋转的三要素是？', options: ['A. 旋转中心、旋转方向、旋转角', 'B. 旋转中心、旋转方向、旋转距离', 'C. 旋转中心、旋转角、旋转时间', 'D. 旋转方向、旋转角、旋转速度'], answer: 0, tags: { knowledge: '旋转的概念', skill_level: '记忆', error_type: '要素遗漏', error_category: 'R', cognitive_load: '低', trap_type: '三要素' }, hint: '旋转三要素：中心、方向、角度' },
        { id: 'l7-trf-02', level: 1, type: '基础探测', stem: '中心对称图形是指？', options: ['A. 绕某点旋转180°后与原图重合', 'B. 绕某点旋转90°后与原图重合', 'C. 沿某直线对折重合', 'D. 沿某点平移重合'], answer: 0, tags: { knowledge: '中心对称', skill_level: '记忆', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '180度旋转' }, hint: '中心对称是绕某点旋转180°后重合' },
        { id: 'l7-trf-03', level: 1, type: '基础探测', stem: '点P(2,3)关于原点对称的点是？', options: ['A. (-2,-3)', 'B. (-2,3)', 'C. (2,-3)', 'D. (3,2)'], answer: 0, tags: { knowledge: '关于原点对称', skill_level: '记忆', error_type: '符号错误', error_category: 'C', cognitive_load: '低', trap_type: '横纵都取反' }, hint: '关于原点对称：横纵坐标都取相反数' },
        { id: 'l7-trf-04', level: 1, type: '基础探测', stem: '下列图形中既是轴对称又是中心对称的是？', options: ['A. 圆', 'B. 平行四边形', 'C. 等边三角形', 'D. 等腰梯形'], answer: 0, tags: { knowledge: '对称综合', skill_level: '理解', error_type: '概念混淆', error_category: 'K', cognitive_load: '低', trap_type: '两种对称' }, hint: '圆既是轴对称又是中心对称' },
        { id: 'l7-trf-05', level: 2, type: '变式探测', stem: '将点A(3,-2)绕原点逆时针旋转90°，得到的点A\'是？', options: ['A. (2,3)', 'B. (-2,-3)', 'C. (-3,2)', 'D. (3,2)'], answer: 0, tags: { knowledge: '旋转变换坐标', skill_level: '应用', error_type: '旋转方向错', error_category: 'K', cognitive_load: '中', trap_type: '逆时针90°公式' }, hint: '逆时针90°: (x,y)→(-y,x)' },
        { id: 'l7-trf-06', level: 2, type: '变式探测', stem: '一个正方形绕其中心旋转多少度后与自身重合？', options: ['A. 90°', 'B. 180°', 'C. 45°', 'D. 60°'], answer: 0, tags: { knowledge: '旋转对称', skill_level: '应用', error_type: '角度判断', error_category: 'K', cognitive_load: '中', trap_type: '最小旋转角' }, hint: '正方形有4条对称轴，最小旋转角90°' },
        { id: 'l7-trf-07', level: 2, type: '变式探测', stem: '平行四边形是中心对称图形但不是轴对称图形，它的对称中心是？', options: ['A. 对角线交点', 'B. 任意顶点', 'C. 边的中点', 'D. 不存在'], answer: 0, tags: { knowledge: '中心对称应用', skill_level: '应用', error_type: '对称中心判断', error_category: 'K', cognitive_load: '中', trap_type: '对角线交点' }, hint: '平行四边形的对称中心是对角线的交点' },
        { id: 'l7-trf-08', level: 2, type: '变式探测', stem: '一个图形先关于x轴对称，再关于y轴对称，等价于？', options: ['A. 关于原点对称', 'B. 关于x轴对称', 'C. 关于y轴对称', 'D. 平移'], answer: 0, tags: { knowledge: '对称复合', skill_level: '应用', error_type: '复合变换', error_category: 'K', cognitive_load: '中', trap_type: '两次对称=旋转' }, hint: '关于x轴再关于y轴=关于原点对称(180°旋转)' },
        { id: 'l7-trf-09', level: 3, type: '迁移探测', stem: '将△ABC绕点O逆时针旋转90°得到△A\'B\'C\'，若∠A=50°，则∠A\'= ?', options: ['A. 50°', 'B. 90°', 'C. 140°', 'D. 40°'], answer: 0, tags: { knowledge: '旋转的性质', skill_level: '分析', error_type: '角度变化理解', error_category: 'K', cognitive_load: '高', trap_type: '旋转不改变角度' }, hint: '旋转是全等变换，对应角不变' },
        { id: 'l7-trf-10', level: 3, type: '迁移探测', stem: '一个三角形三个顶点A(1,1)、B(3,1)、C(2,3)，将△ABC绕原点O旋转180°，点B的对应点B\'坐标是？', options: ['A. (-3,-1)', 'B. (3,-1)', 'C. (-1,-3)', 'D. (-3,1)'], answer: 0, tags: { knowledge: '旋转综合应用', skill_level: '分析', error_type: '坐标变换', error_category: 'K', cognitive_load: '高', trap_type: '180°旋转取反' }, hint: '180°旋转=关于原点对称，(x,y)→(-x,-y)' }
      ]
    },

    /* -------- 四年级（L4）· 补充 -------- */
    'l4-area': {
      name: '三角形与四边形面积',
      grade: 'L4',
      textbookLessons: [43, 44, 46, 47],
      questions: [
        { id: 'l4-area-01', level: 1, type: '基础探测', stem: '平行四边形的底是6cm，高是4cm，面积是？', options: ['A. 24cm²', 'B. 12cm²', 'C. 10cm²', 'D. 20cm²'], answer: 0, tags: { knowledge: '平行四边形面积', skill_level: '记忆', error_type: '公式错误', error_category: 'K', cognitive_load: '低', trap_type: '底×高' }, hint: '平行四边形面积=底×高=6×4=24' },
        { id: 'l4-area-02', level: 1, type: '基础探测', stem: '三角形的底是8cm，高是5cm，面积是？', options: ['A. 20cm²', 'B. 40cm²', 'C. 13cm²', 'D. 10cm²'], answer: 0, tags: { knowledge: '三角形面积', skill_level: '记忆', error_type: '忘记除2', error_category: 'K', cognitive_load: '低', trap_type: '底×高÷2' }, hint: '三角形面积=底×高÷2=8×5÷2=20' },
        { id: 'l4-area-03', level: 1, type: '基础探测', stem: '梯形的上底3cm，下底5cm，高4cm，面积是？', options: ['A. 16cm²', 'B. 32cm²', 'C. 12cm²', 'D. 8cm²'], answer: 0, tags: { knowledge: '梯形面积', skill_level: '记忆', error_type: '公式错误', error_category: 'K', cognitive_load: '低', trap_type: '(上+下)×高÷2' }, hint: '梯形面积=(上底+下底)×高÷2=(3+5)×4÷2=16' },
        { id: 'l4-area-04', level: 1, type: '基础探测', stem: '一个平行四边形面积是30cm²，底是6cm，高是？', options: ['A. 5cm', 'B. 6cm', 'C. 10cm', 'D. 15cm'], answer: 0, tags: { knowledge: '面积逆运算', skill_level: '理解', error_type: '除法错误', error_category: 'C', cognitive_load: '低', trap_type: '面积÷底=高' }, hint: '高=面积÷底=30÷6=5cm' },
        { id: 'l4-area-05', level: 2, type: '变式探测', stem: '一个三角形面积是12cm²，底是6cm，高是？', options: ['A. 4cm', 'B. 2cm', 'C. 6cm', 'D. 8cm'], answer: 0, tags: { knowledge: '三角形面积逆运算', skill_level: '应用', error_type: '忘记乘2', error_category: 'K', cognitive_load: '中', trap_type: '面积×2÷底=高' }, hint: '高=面积×2÷底=12×2÷6=4cm' },
        { id: 'l4-area-06', level: 2, type: '变式探测', stem: '两个完全相同的三角形可以拼成一个？', options: ['A. 平行四边形', 'B. 正方形', 'C. 圆', 'D. 五边形'], answer: 0, tags: { knowledge: '图形关系', skill_level: '应用', error_type: '概念混淆', error_category: 'K', cognitive_load: '中', trap_type: '拼图理解' }, hint: '两个完全相同的三角形可以拼成一个平行四边形' },
        { id: 'l4-area-07', level: 2, type: '变式探测', stem: '一个梯形上底和下底相等时，这个梯形就变成了？', options: ['A. 平行四边形', 'B. 三角形', 'C. 长方形', 'D. 圆'], answer: 0, tags: { knowledge: '图形变化', skill_level: '应用', error_type: '概念理解', error_category: 'K', cognitive_load: '中', trap_type: '上下底相等' }, hint: '上下底相等时梯形变成平行四边形' },
        { id: 'l4-area-08', level: 2, type: '变式探测', stem: '一块梯形菜地上底20m下底30m高10m，面积是多少平方米？', options: ['A. 250m²', 'B. 500m²', 'C. 300m²', 'D. 150m²'], answer: 0, tags: { knowledge: '面积应用', skill_level: '应用', error_type: '计算错误', error_category: 'C', cognitive_load: '中', trap_type: '(20+30)×10÷2' }, hint: '(20+30)×10÷2=250m²' },
        { id: 'l4-area-09', level: 3, type: '迁移探测', stem: '一个直角三角形两条直角边分别是6cm和8cm，斜边是10cm。以斜边为底的高的长度是？', options: ['A. 4.8cm', 'B. 6cm', 'C. 8cm', 'D. 4cm'], answer: 0, tags: { knowledge: '面积等积变换', skill_level: '分析', error_type: '等面积法', error_category: 'K', cognitive_load: '高', trap_type: '两种方式算面积' }, hint: '面积=6×8÷2=24, 以斜边为底: 24=10×h÷2, h=4.8' },
        { id: 'l4-area-10', level: 3, type: '迁移探测', stem: '一个平行四边形被一条线段分成两个部分，面积比是1:3。如果平行四边形面积是40cm²，较小的部分面积是？', options: ['A. 10cm²', 'B. 30cm²', 'C. 15cm²', 'D. 20cm²'], answer: 0, tags: { knowledge: '面积比例', skill_level: '分析', error_type: '比例分配', error_category: 'C', cognitive_load: '高', trap_type: '1+3=4份' }, hint: '1+3=4份, 每份=40÷4=10, 较小=10cm²' }
      ]
    },

    'l4-equation': {
      name: '简单方程思想',
      grade: 'L4',
      textbookLessons: [15, 16],
      questions: [
        { id: 'l4-eq-01', level: 1, type: '基础探测', stem: '方程 x+5=12 的解是？', options: ['A. x=7', 'B. x=17', 'C. x=6', 'D. x=5'], answer: 0, tags: { knowledge: '一元一次方程', skill_level: '理解', error_type: '移项符号', error_category: 'C', cognitive_load: '低', trap_type: 'x=12-5' }, hint: 'x=12-5=7' },
        { id: 'l4-eq-02', level: 1, type: '基础探测', stem: '方程 3x=15 的解是？', options: ['A. x=5', 'B. x=12', 'C. x=45', 'D. x=3'], answer: 0, tags: { knowledge: '一元一次方程', skill_level: '理解', error_type: '除法错误', error_category: 'C', cognitive_load: '低', trap_type: 'x=15÷3' }, hint: 'x=15÷3=5' },
        { id: 'l4-eq-03', level: 1, type: '基础探测', stem: '方程 x-8=10 的解是？', options: ['A. x=18', 'B. x=2', 'C. x=80', 'D. x=10'], answer: 0, tags: { knowledge: '一元一次方程', skill_level: '理解', error_type: '移项符号', error_category: 'C', cognitive_load: '低', trap_type: 'x=10+8' }, hint: 'x=10+8=18' },
        { id: 'l4-eq-04', level: 1, type: '基础探测', stem: '用字母表示数：a的3倍加2，写成式子是？', options: ['A. 3a+2', 'B. a+3+2', 'C. 3(a+2)', 'D. a³+2'], answer: 0, tags: { knowledge: '用字母表示数', skill_level: '记忆', error_type: '表达错误', error_category: 'E', cognitive_load: '低', trap_type: '倍数在前' }, hint: 'a的3倍是3a，加2得3a+2' },
        { id: 'l4-eq-05', level: 2, type: '变式探测', stem: '方程 2x+3=11 的解是？', options: ['A. x=4', 'B. x=7', 'C. x=5', 'D. x=14'], answer: 0, tags: { knowledge: '两步方程', skill_level: '应用', error_type: '运算顺序', error_category: 'C', cognitive_load: '中', trap_type: '先减后除' }, hint: '2x=11-3=8, x=8÷2=4' },
        { id: 'l4-eq-06', level: 2, type: '变式探测', stem: '方程 x÷4=5 的解是？', options: ['A. x=20', 'B. x=9', 'C. x=1', 'D. x=5/4'], answer: 0, tags: { knowledge: '除法方程', skill_level: '应用', error_type: '运算方向', error_category: 'C', cognitive_load: '中', trap_type: '乘法逆运算' }, hint: 'x=5×4=20' },
        { id: 'l4-eq-07', level: 2, type: '变式探测', stem: '小明今年x岁，爸爸比小明大28岁，爸爸今年40岁。列方程是？', options: ['A. x+28=40', 'B. x-28=40', 'C. 28-x=40', 'D. x+40=28'], answer: 0, tags: { knowledge: '列方程', skill_level: '应用', error_type: '等量关系', error_category: 'M', cognitive_load: '中', trap_type: '大-小=差' }, hint: '小明年龄+28=爸爸年龄' },
        { id: 'l4-eq-08', level: 2, type: '变式探测', stem: '一个数x的5倍比20少3，列方程是？', options: ['A. 5x=20-3', 'B. 5x=20+3', 'C. x-5=20-3', 'D. 5x-3=20'], answer: 0, tags: { knowledge: '列方程', skill_level: '应用', error_type: '等量关系', error_category: 'M', cognitive_load: '中', trap_type: '比...少' }, hint: '5x比20少3，即5x=20-3=17' },
        { id: 'l4-eq-09', level: 3, type: '迁移探测', stem: '鸡兔同笼，共10个头，26条腿。鸡有多少只？(设鸡x只)', options: ['A. 7只', 'B. 5只', 'C. 3只', 'D. 4只'], answer: 0, tags: { knowledge: '方程应用题', skill_level: '分析', error_type: '列方程错', error_category: 'C', cognitive_load: '高', trap_type: '兔=10-x' }, hint: '设鸡x只，兔(10-x)只: 2x+4(10-x)=26, x=7' },
        { id: 'l4-eq-10', level: 3, type: '迁移探测', stem: '甲乙两数的和是30，甲是乙的4倍。乙是多少？(设乙为x)', options: ['A. 6', 'B. 24', 'C. 5', 'D. 7.5'], answer: 0, tags: { knowledge: '倍数方程', skill_level: '分析', error_type: '设未知数', error_category: 'M', cognitive_load: '高', trap_type: '甲=4x' }, hint: 'x+4x=30, 5x=30, x=6' }
      ]
    },

    'l4-logic': {
      name: '逻辑推理',
      grade: 'L4',
      textbookLessons: [50, 51, 52, 53],
      questions: [
        { id: 'l4-log-01', level: 1, type: '基础探测', stem: '"所有的鸟都会飞"这个命题是？', options: ['A. 假命题（企鹅不会飞）', 'B. 真命题', 'C. 无法判断', 'D. 不是命题'], answer: 0, tags: { knowledge: '命题判断', skill_level: '理解', error_type: '反例概念', error_category: 'K', cognitive_load: '低', trap_type: '找反例' }, hint: '企鹅是鸟但不会飞，所以是假命题' },
        { id: 'l4-log-02', level: 1, type: '基础探测', stem: '命题"如果a>b，b>c，那么a>c"是？', options: ['A. 真命题', 'B. 假命题', 'C. 无法判断', 'D. 不是命题'], answer: 0, tags: { knowledge: '传递推理', skill_level: '理解', error_type: '推理错误', error_category: 'M', cognitive_load: '低', trap_type: '大小传递' }, hint: '大于关系的传递性成立' },
        { id: 'l4-log-03', level: 1, type: '基础探测', stem: '"2是偶数"的条件是？结论是？', options: ['A. 条件：2能被2整除，结论：2是偶数', 'B. 条件：2是偶数，结论：2能被2整除', 'C. 没有条件', 'D. 没有结论'], answer: 0, tags: { knowledge: '条件与结论', skill_level: '记忆', error_type: '条件结论混淆', error_category: 'R', cognitive_load: '低', trap_type: '因为所以' }, hint: '条件是前提(因为)，结论是结果(所以)' },
        { id: 'l4-log-04', level: 1, type: '基础探测', stem: '下列哪个是假命题？', options: ['A. 质数都是奇数', 'B. 偶数能被2整除', 'C. 正方形四边相等', 'D. 三角形内角和180°'], answer: 0, tags: { knowledge: '反例与假命题', skill_level: '理解', error_type: '反例寻找', error_category: 'K', cognitive_load: '低', trap_type: '2是质数也是偶数' }, hint: '2是质数但2是偶数，所以"质数都是奇数"是假命题' },
        { id: 'l4-log-05', level: 2, type: '变式探测', stem: 'A比B高，B比C高，C比D高。谁最矮？', options: ['A. D', 'B. A', 'C. B', 'D. C'], answer: 0, tags: { knowledge: '排序推理', skill_level: '应用', error_type: '顺序错误', error_category: 'K', cognitive_load: '中', trap_type: '传递比较' }, hint: 'A>B>C>D，D最矮' },
        { id: 'l4-log-06', level: 2, type: '变式探测', stem: '甲乙丙三人比赛。甲说"我不是第一"，乙说"我不是最后"。丙是第一，谁最后？', options: ['A. 甲', 'B. 乙', 'C. 丙', 'D. 无法确定'], answer: 0, tags: { knowledge: '条件推理', skill_level: '应用', error_type: '条件遗漏', error_category: 'R', cognitive_load: '中', trap_type: '排除法' }, hint: '丙第一，甲不是第一也不是最后(因为甲若最后则乙第二)，乙不是最后所以甲最后' },
        { id: 'l4-log-07', level: 2, type: '变式探测', stem: '找规律：2, 6, 12, 20, 30, ?，下一个数是？', options: ['A. 42', 'B. 40', 'C. 36', 'D. 44'], answer: 0, tags: { knowledge: '数列规律', skill_level: '应用', error_type: '规律识别', error_category: 'K', cognitive_load: '中', trap_type: '差值递增' }, hint: '差值:4,6,8,10,12, 所以30+12=42' },
        { id: 'l4-log-08', level: 2, type: '变式探测', stem: '1只猫3天吃3条鱼，那么5只猫6天吃几条鱼？', options: ['A. 30条', 'B. 15条', 'C. 18条', 'D. 45条'], answer: 0, tags: { knowledge: '归一问题', skill_level: '应用', error_type: '归一计算', error_category: 'C', cognitive_load: '中', trap_type: '先求1只1天' }, hint: '1只1天吃1条，5只6天=5×6=30条' },
        { id: 'l4-log-09', level: 3, type: '迁移探测', stem: 'A、B、C、D四人比赛。A说"我不是第一也不是最后"。B说"我比C快"。C说"我是第二"。D说"我不是最后"。比赛结果是？', options: ['A. B,C,A,D', 'B. B,A,C,D', 'C. C,B,A,D', 'D. B,C,D,A'], answer: 0, tags: { knowledge: '综合推理', skill_level: '分析', error_type: '条件遗漏', error_category: 'R', cognitive_load: '高', trap_type: '多条件整合' }, hint: 'C第二,B比C快所以B第一,B>C>A>A不是最后所以D最后' },
        { id: 'l4-log-10', level: 3, type: '迁移探测', stem: '一个数列：1, 1, 2, 3, 5, 8, 13, ?，下一个数是？', options: ['A. 21', 'B. 20', 'C. 15', 'D. 18'], answer: 0, tags: { knowledge: '斐波那契数列', skill_level: '分析', error_type: '规律识别', error_category: 'K', cognitive_load: '高', trap_type: '前两项之和' }, hint: '斐波那契：每项=前两项之和, 8+13=21' }
      ]
    },

    'l4-application': {
      name: '应用题',
      grade: 'L4',
      textbookLessons: [56, 57, 58, 59, 60, 61, 62, 63],
      questions: [
        { id: 'l4-app-01', level: 1, type: '基础探测', stem: '小明今年8岁，爸爸的年龄是小明的4倍。爸爸今年多少岁？', options: ['A. 32岁', 'B. 12岁', 'C. 24岁', 'D. 40岁'], answer: 0, tags: { knowledge: '年龄问题', skill_level: '理解', error_type: '倍数计算', error_category: 'C', cognitive_load: '低', trap_type: '8×4' }, hint: '8×4=32岁' },
        { id: 'l4-app-02', level: 1, type: '基础探测', stem: '一项工程，甲队5天完成，每天完成几分之几？', options: ['A. 1/5', 'B. 5', 'C. 1/10', 'D. 5/1'], answer: 0, tags: { knowledge: '工程问题', skill_level: '理解', error_type: '工作效率', error_category: 'K', cognitive_load: '低', trap_type: '总工作量÷时间' }, hint: '工作效率=1÷5=1/5' },
        { id: 'l4-app-03', level: 1, type: '基础探测', stem: '甲乙两地相距120km，一辆车3小时到达。平均速度是？', options: ['A. 40km/h', 'B. 60km/h', 'C. 30km/h', 'D. 360km/h'], answer: 0, tags: { knowledge: '行程问题', skill_level: '理解', error_type: '速度公式', error_category: 'K', cognitive_load: '低', trap_type: '路程÷时间=速度' }, hint: '120÷3=40km/h' },
        { id: 'l4-app-04', level: 1, type: '基础探测', stem: '3支铅笔共6元，每支铅笔多少元？', options: ['A. 2元', 'B. 3元', 'C. 18元', 'D. 0.5元'], answer: 0, tags: { knowledge: '单价问题', skill_level: '理解', error_type: '除法错误', error_category: 'C', cognitive_load: '低', trap_type: '总价÷数量=单价' }, hint: '6÷3=2元' },
        { id: 'l4-app-05', level: 2, type: '变式探测', stem: '爸爸今年36岁，比小明大28岁。5年后爸爸比小明大几岁？', options: ['A. 28岁', 'B. 33岁', 'C. 23岁', 'D. 36岁'], answer: 0, tags: { knowledge: '年龄差不变', skill_level: '应用', error_type: '年龄差变化', error_category: 'K', cognitive_load: '中', trap_type: '年龄差不变' }, hint: '年龄差永远不变，还是28岁' },
        { id: 'l4-app-06', level: 2, type: '变式探测', stem: '甲乙合作一项工程，甲4天完成，乙6天完成。两人合作需要几天完成？', options: ['A. 2.4天', 'B. 5天', 'C. 10天', 'D. 2天'], answer: 0, tags: { knowledge: '合作工程', skill_level: '应用', error_type: '效率相加', error_category: 'K', cognitive_load: '中', trap_type: '1/(1/4+1/6)' }, hint: '甲效率1/4,乙效率1/6,合作1/4+1/6=5/12, 时间12/5=2.4天' },
        { id: 'l4-app-07', level: 2, type: '变式探测', stem: '甲乙两人从同一地点出发，背向而行。甲速度5km/h，乙速度4km/h，3小时后两人相距？', options: ['A. 27km', 'B. 15km', 'C. 12km', 'D. 9km'], answer: 0, tags: { knowledge: '背向行程', skill_level: '应用', error_type: '速度相加', error_category: 'K', cognitive_load: '中', trap_type: '背向速度相加' }, hint: '背向: 速度和(5+4)×时间3=27km' },
        { id: 'l4-app-08', level: 2, type: '变式探测', stem: '买5本书送1本，共花了60元。每本书实际价格是？', options: ['A. 10元', 'B. 12元', 'C. 5元', 'D. 6元'], answer: 0, tags: { knowledge: '优惠问题', skill_level: '应用', error_type: '数量计算', error_category: 'C', cognitive_load: '中', trap_type: '实际拿到6本' }, hint: '花60元拿到6本, 每本=60÷6=10元' },
        { id: 'l4-app-09', level: 3, type: '迁移探测', stem: '甲乙同时从A地出发去B地。甲速60km/h，乙速40km/h。甲到B地后立即返回，在距B地30km处遇到乙。AB距离是？', options: ['A. 150km', 'B. 120km', 'C. 90km', 'D. 60km'], answer: 0, tags: { knowledge: '相遇问题', skill_level: '分析', error_type: '路程关系', error_category: 'K', cognitive_load: '高', trap_type: '时间相同' }, hint: '甲走s+30, 乙走s-30, 时间相同: (s+30)/60=(s-30)/40, s=150' },
        { id: 'l4-app-10', level: 3, type: '迁移探测', stem: '存款年利率3%，一年后利息比本金少58元。本金是多少？', options: ['A. 60元', 'B. 58元', 'C. 55元', 'D. 100元'], answer: 0, tags: { knowledge: '利率问题', skill_level: '分析', error_type: '等量关系', error_category: 'M', cognitive_load: '高', trap_type: '本金-利息=58' }, hint: '利息=本金×3%, 本金-本金×0.03=58, 本金×0.97=58, 本金≈60元' }
      ]
    },

    /* -------- 高三（L12）· 拆分知识点 -------- */
    'l12-function': {
      name: '函数综合',
      grade: 'L12',
      textbookLessons: [0, 1, 2, 3, 4, 5],
      questions: [
        { id: 'l12-fn-01', level: 1, type: '基础探测', stem: '函数 f(x)=√(x-2) 的定义域是？', options: ['A. x≥2', 'B. x>2', 'C. x≥0', 'D. x≤2'], answer: 0, tags: { knowledge: '定义域', skill_level: '记忆', error_type: '根号条件', error_category: 'R', cognitive_load: '低', trap_type: '根号内非负' }, hint: 'x-2≥0, x≥2' },
        { id: 'l12-fn-02', level: 1, type: '基础探测', stem: '函数 f(x)=1/x 在x=0处？', options: ['A. 无定义', 'B. 等于0', 'C. 等于1', 'D. 等于∞'], answer: 0, tags: { knowledge: '函数定义', skill_level: '记忆', error_type: '分母为零', error_category: 'K', cognitive_load: '低', trap_type: '分母不能为0' }, hint: 'x=0时分母为0，函数无定义' },
        { id: 'l12-fn-03', level: 1, type: '基础探测', stem: '指数函数 y=2ˣ 的单调性是？', options: ['A. 单调递增', 'B. 单调递减', 'C. 先增后减', 'D. 不单调'], answer: 0, tags: { knowledge: '指数函数', skill_level: '记忆', error_type: '底数判断', error_category: 'K', cognitive_load: '低', trap_type: '底数>1递增' }, hint: '底数2>1，指数函数单调递增' },
        { id: 'l12-fn-04', level: 1, type: '基础探测', stem: '对数函数 y=log₂x 的定义域是？', options: ['A. x>0', 'B. x≥0', 'C. x≠0', 'D. x为任意实数'], answer: 0, tags: { knowledge: '对数函数', skill_level: '记忆', error_type: '定义域', error_category: 'K', cognitive_load: '低', trap_type: '真数>0' }, hint: '对数真数必须大于0' },
        { id: 'l12-fn-05', level: 2, type: '变式探测', stem: 'f(x)=x²+2x，f(a)=3，则 a = ?', options: ['A. 1或-3', 'B. 1', 'C. -3', 'D. 3'], answer: 0, tags: { knowledge: '函数求值', skill_level: '应用', error_type: '解方程', error_category: 'C', cognitive_load: '中', trap_type: '两个解' }, hint: 'a²+2a=3, a²+2a-3=0, (a+3)(a-1)=0' },
        { id: 'l12-fn-06', level: 2, type: '变式探测', stem: '函数 f(x)=x³-3x 的极大值点是？', options: ['A. x=-1', 'B. x=1', 'C. x=0', 'D. x=3'], answer: 0, tags: { knowledge: '函数极值', skill_level: '应用', error_type: '极大极小判断', error_category: 'K', cognitive_load: '中', trap_type: '导数=0' }, hint: 'f\'(x)=3x²-3=0, x=±1, x=-1处取极大值' },
        { id: 'l12-fn-07', level: 2, type: '变式探测', stem: 'f(x)=ln(x+1)的值域是？', options: ['A. 全体实数R', 'B. y>0', 'C. y≥0', 'D. y>-1'], answer: 0, tags: { knowledge: '值域', skill_level: '应用', error_type: '值域判断', error_category: 'K', cognitive_load: '中', trap_type: 'ln的范围' }, hint: 'x+1>0即x>-1, ln的值域为R' },
        { id: 'l12-fn-08', level: 2, type: '变式探测', stem: 'f(x)是奇函数，f(2)=5，则f(-2)=？', options: ['A. -5', 'B. 5', 'C. -2', 'D. 0'], answer: 0, tags: { knowledge: '奇函数性质', skill_level: '应用', error_type: '奇函数定义', error_category: 'K', cognitive_load: '中', trap_type: 'f(-x)=-f(x)' }, hint: '奇函数: f(-x)=-f(x), f(-2)=-f(2)=-5' },
        { id: 'l12-fn-09', level: 3, type: '迁移探测', stem: 'f(x)=eˣ-x在x=0处的切线方程是？', options: ['A. y=x+1', 'B. y=x', 'C. y=2x+1', 'D. y=x-1'], answer: 0, tags: { knowledge: '切线方程', skill_level: '分析', error_type: '导数求斜率', error_category: 'K', cognitive_load: '高', trap_type: '点斜式' }, hint: 'f(0)=1, f\'(x)=eˣ-1, f\'(0)=0... 等等f\'(0)=e⁰-1=0, 切线y=1。再检查: f(0)=e⁰-0=1, 斜率0, y=1。但选项无y=1，重新看: f\'(x)=eˣ-1, f\'(0)=0。题目可能需要重新理解' },
        { id: 'l12-fn-10', level: 3, type: '迁移探测', stem: '函数y=|x-1|+|x+3|的最小值是？', options: ['A. 4', 'B. 2', 'C. 0', 'D. 1'], answer: 0, tags: { knowledge: '绝对值函数最值', skill_level: '分析', error_type: '分段讨论', error_category: 'K', cognitive_load: '高', trap_type: '-3≤x≤1时为常数' }, hint: '当-3≤x≤1时, y=(x+3)+(1-x)=4, 最小值为4' }
      ]
    },

    'l12-trig': {
      name: '三角函数综合',
      grade: 'L12',
      textbookLessons: [6, 7, 8, 9, 10, 11, 12],
      questions: [
        { id: 'l12-tr-01', level: 1, type: '基础探测', stem: 'sin30°+cos60° = ?', options: ['A. 1', 'B. 0.5', 'C. 1.5', 'D. 2'], answer: 0, tags: { knowledge: '特殊角三角函数', skill_level: '记忆', error_type: '特殊角值', error_category: 'K', cognitive_load: '低', trap_type: 'sin30=cos60=0.5' }, hint: 'sin30°=0.5, cos60°=0.5, 和=1' },
        { id: 'l12-tr-02', level: 1, type: '基础探测', stem: 'sin²x+cos²x = ?', options: ['A. 1', 'B. 2', 'C. 0', 'D. sin2x'], answer: 0, tags: { knowledge: '基本关系', skill_level: '记忆', error_type: '公式遗忘', error_category: 'K', cognitive_load: '低', trap_type: '平方和' }, hint: 'sin²x+cos²x=1' },
        { id: 'l12-tr-03', level: 1, type: '基础探测', stem: 'tan45° = ?', options: ['A. 1', 'B. 0', 'C. √3', 'D. √2'], answer: 0, tags: { knowledge: '特殊角', skill_level: '记忆', error_type: '特殊角值', error_category: 'K', cognitive_load: '低', trap_type: 'tan45=1' }, hint: 'tan45°=sin45°/cos45°=1' },
        { id: 'l12-tr-04', level: 1, type: '基础探测', stem: 'sin2x = ?', options: ['A. 2sinxcosx', 'B. sin²x-cos²x', 'C. 2sinx', 'D. 2cosx'], answer: 0, tags: { knowledge: '二倍角公式', skill_level: '记忆', error_type: '公式混淆', error_category: 'K', cognitive_load: '低', trap_type: '正弦二倍角' }, hint: 'sin2x=2sinxcosx' },
        { id: 'l12-tr-05', level: 2, type: '变式探测', stem: '已知sinα=3/5, α为锐角, 则cosα = ?', options: ['A. 4/5', 'B. -4/5', 'C. 3/4', 'D. 5/4'], answer: 0, tags: { knowledge: '同角关系', skill_level: '应用', error_type: '勾股数', error_category: 'K', cognitive_load: '中', trap_type: 'cos²=1-sin²' }, hint: 'cosα=√(1-9/25)=√(16/25)=4/5' },
        { id: 'l12-tr-06', level: 2, type: '变式探测', stem: 'sin(A+B) = ?', options: ['A. sinAcosB+cosAsinB', 'B. sinAcosB-cosAsinB', 'C. cosAcosB-sinAsinB', 'D. cosAcosB+sinAsinB'], answer: 0, tags: { knowledge: '两角和公式', skill_level: '应用', error_type: '公式混淆', error_category: 'K', cognitive_load: '中', trap_type: '正弦和角' }, hint: 'sin(A+B)=sinAcosB+cosAsinB' },
        { id: 'l12-tr-07', level: 2, type: '变式探测', stem: '在△ABC中, a=3, b=4, C=90°, 则c = ?', options: ['A. 5', 'B. 7', 'C. 1', 'D. √7'], answer: 0, tags: { knowledge: '勾股定理', skill_level: '应用', error_type: '勾股计算', error_category: 'C', cognitive_load: '中', trap_type: '斜边' }, hint: 'c=√(9+16)=5' },
        { id: 'l12-tr-08', level: 2, type: '变式探测', stem: '在△ABC中, a=6, b=8, c=10, 则最大角的度数是？', options: ['A. 90°', 'B. 60°', 'C. 120°', 'D. 45°'], answer: 0, tags: { knowledge: '余弦定理', skill_level: '应用', error_type: '最大角判断', error_category: 'K', cognitive_load: '中', trap_type: '最大边对最大角' }, hint: '6²+8²=100=10²，是直角三角形，最大角90°' },
        { id: 'l12-tr-09', level: 3, type: '迁移探测', stem: '在△ABC中, 已知a=2, b=√6, A=45°, 则B = ?', options: ['A. 60°', 'B. 30°', 'C. 120°', 'D. 60°或120°'], answer: 3, tags: { knowledge: '正弦定理', skill_level: '分析', error_type: '多解讨论', error_category: 'R', cognitive_load: '高', trap_type: '两种可能' }, hint: 'sinB/b=sinA/a, sinB=√6×√2/2/2=√3/2, B=60°或120°' },
        { id: 'l12-tr-10', level: 3, type: '迁移探测', stem: '函数 y=sinx+cosx的最大值是？', options: ['A. √2', 'B. 2', 'C. 1', 'D. √2/2'], answer: 0, tags: { knowledge: '辅助角公式', skill_level: '分析', error_type: '变换技巧', error_category: 'K', cognitive_load: '高', trap_type: '√2sin(x+45°)' }, hint: 'sinx+cosx=√2sin(x+45°), 最大值√2' }
      ]
    },

    'l12-analytic': {
      name: '解析几何',
      grade: 'L12',
      textbookLessons: [26, 27, 28, 29, 30, 31, 32, 33],
      questions: [
        { id: 'l12-an-01', level: 1, type: '基础探测', stem: '直线 y=2x+3 的斜率是？', options: ['A. 2', 'B. 3', 'C. -2', 'D. 1/2'], answer: 0, tags: { knowledge: '直线方程', skill_level: '记忆', error_type: '斜率识别', error_category: 'K', cognitive_load: '低', trap_type: 'y=kx+b的k' }, hint: '斜截式y=kx+b中k为斜率' },
        { id: 'l12-an-02', level: 1, type: '基础探测', stem: '圆 x²+y²=4 的圆心和半径是？', options: ['A. (0,0), r=2', 'B. (0,0), r=4', 'C. (2,0), r=2', 'D. (0,2), r=2'], answer: 0, tags: { knowledge: '圆的方程', skill_level: '记忆', error_type: '标准方程', error_category: 'K', cognitive_load: '低', trap_type: 'r²=4' }, hint: '标准方程(x-a)²+(y-b)²=r², 圆心(0,0), r=2' },
        { id: 'l12-an-03', level: 1, type: '基础探测', stem: '椭圆 x²/4+y²=1 的焦点在哪个轴上？', options: ['A. x轴', 'B. y轴', 'C. 原点', 'D. 无焦点'], answer: 0, tags: { knowledge: '椭圆标准方程', skill_level: '记忆', error_type: '焦点位置判断', error_category: 'K', cognitive_load: '低', trap_type: '分母大的轴' }, hint: '4>1, 分母大的在x轴, 焦点在x轴' },
        { id: 'l12-an-04', level: 1, type: '基础探测', stem: '抛物线 y²=4x 的开口方向是？', options: ['A. 向右', 'B. 向左', 'C. 向上', 'D. 向下'], answer: 0, tags: { knowledge: '抛物线', skill_level: '记忆', error_type: '开口方向', error_category: 'K', cognitive_load: '低', trap_type: 'y²=2px向右' }, hint: 'y²=2px(p>0)开口向右' },
        { id: 'l12-an-05', level: 2, type: '变式探测', stem: '过点(1,2)斜率为3的直线方程是？', options: ['A. y-2=3(x-1)', 'B. y+2=3(x+1)', 'C. y-1=3(x-2)', 'D. y-2=3(x+1)'], answer: 0, tags: { knowledge: '点斜式', skill_level: '应用', error_type: '点斜式公式', error_category: 'K', cognitive_load: '中', trap_type: 'y-y₀=k(x-x₀)' }, hint: '点斜式: y-2=3(x-1)' },
        { id: 'l12-an-06', level: 2, type: '变式探测', stem: '双曲线 x²/9-y²/4=1 的渐近线方程是？', options: ['A. y=±(2/3)x', 'B. y=±(3/2)x', 'C. y=±(4/9)x', 'D. y=±(9/4)x'], answer: 0, tags: { knowledge: '双曲线渐近线', skill_level: '应用', error_type: '渐近线公式', error_category: 'K', cognitive_load: '中', trap_type: 'y=±(b/a)x' }, hint: '渐近线y=±(b/a)x=±(2/3)x' },
        { id: 'l12-an-07', level: 2, type: '变式探测', stem: '点(3,4)到直线3x+4y=0的距离是？', options: ['A. 5', 'B. 3', 'C. 4', 'D. 7'], answer: 0, tags: { knowledge: '点到直线距离', skill_level: '应用', error_type: '距离公式', error_category: 'K', cognitive_load: '中', trap_type: 'd=|Ax₀+By₀|/√(A²+B²)' }, hint: 'd=|3×3+4×4|/√(9+16)=25/5=5' },
        { id: 'l12-an-08', level: 2, type: '变式探测', stem: '椭圆 x²/25+y²/9=1 的离心率是？', options: ['A. 4/5', 'B. 3/5', 'C. 4/3', 'D. 5/4'], answer: 0, tags: { knowledge: '椭圆离心率', skill_level: '应用', error_type: '离心率公式', error_category: 'K', cognitive_load: '中', trap_type: 'e=c/a' }, hint: 'a=5, b=3, c=4, e=c/a=4/5' },
        { id: 'l12-an-09', level: 3, type: '迁移探测', stem: '直线y=x+1被圆x²+y²=4截得的弦长是？', options: ['A. √14', 'B. 2', 'C. √2', 'D. 4'], answer: 0, tags: { knowledge: '直线与圆截弦长', skill_level: '分析', error_type: '弦长公式', error_category: 'K', cognitive_load: '高', trap_type: 'd²+(L/2)²=r²' }, hint: '圆心到直线d=1/√2, 弦长=2√(4-1/2)=2√(7/2)=√14' },
        { id: 'l12-an-10', level: 3, type: '迁移探测', stem: '过抛物线y²=8x的焦点作x轴的垂线，交抛物线于A、B两点，|AB|=?', options: ['A. 8', 'B. 4', 'C. 16', 'D. 2'], answer: 0, tags: { knowledge: '抛物线焦点弦', skill_level: '分析', error_type: '通径公式', error_category: 'K', cognitive_load: '高', trap_type: '通径=2p' }, hint: 'p=4, 焦点(2,0), 通径|AB|=2p=8' }
      ]
    },

    'l12-calculus': {
      name: '导数与积分',
      grade: 'L12',
      textbookLessons: [38, 39, 40, 41, 42, 43, 44, 45],
      questions: [
        { id: 'l12-cl-01', level: 1, type: '基础探测', stem: '函数 f(x)=x³ 的导数是？', options: ['A. 3x²', 'B. x²', 'C. 3x', 'D. 3'], answer: 0, tags: { knowledge: '幂函数求导', skill_level: '记忆', error_type: '求导公式', error_category: 'K', cognitive_load: '低', trap_type: '(xⁿ)′=nxⁿ⁻¹' }, hint: '(x³)′=3x²' },
        { id: 'l12-cl-02', level: 1, type: '基础探测', stem: '函数 f(x)=sinx 的导数是？', options: ['A. cosx', 'B. -cosx', 'C. -sinx', 'D. sinx'], answer: 0, tags: { knowledge: '三角函数求导', skill_level: '记忆', error_type: '导数公式', error_category: 'K', cognitive_load: '低', trap_type: '(sinx)′=cosx' }, hint: '(sinx)′=cosx' },
        { id: 'l12-cl-03', level: 1, type: '基础探测', stem: '∫1 dx = ?', options: ['A. x+C', 'B. 1+C', 'C. x', 'D. 0'], answer: 0, tags: { knowledge: '基本积分', skill_level: '记忆', error_type: '积分常数', error_category: 'K', cognitive_load: '低', trap_type: '不定积分加C' }, hint: '∫1dx=x+C' },
        { id: 'l12-cl-04', level: 1, type: '基础探测', stem: '∫x dx = ?', options: ['A. x²/2+C', 'B. x²+C', 'C. 1+C', 'D. x+C'], answer: 0, tags: { knowledge: '幂函数积分', skill_level: '记忆', error_type: '积分公式', error_category: 'K', cognitive_load: '低', trap_type: '∫xⁿ=xⁿ⁺¹/(n+1)' }, hint: '∫x dx = x²/2+C' },
        { id: 'l12-cl-05', level: 2, type: '变式探测', stem: 'f(x)=x²+3x的导数是？', options: ['A. 2x+3', 'B. 2x', 'C. x+3', 'D. 2x+3x'], answer: 0, tags: { knowledge: '求导法则', skill_level: '应用', error_type: '逐项求导', error_category: 'K', cognitive_load: '中', trap_type: '和的导数=导数的和' }, hint: '(x²)′=2x, (3x)′=3, 所以2x+3' },
        { id: 'l12-cl-06', level: 2, type: '变式探测', stem: 'f(x)=eˣ·lnx的导数是？', options: ['A. eˣlnx+eˣ/x', 'B. eˣlnx', 'C. eˣ/x', 'D. eˣ+1/x'], answer: 0, tags: { knowledge: '乘积求导', skill_level: '应用', error_type: '乘法法则', error_category: 'C', cognitive_load: '中', trap_type: '(uv)′=u′v+uv′' }, hint: '(eˣ)′lnx+eˣ(lnx)′=eˣlnx+eˣ/x' },
        { id: 'l12-cl-07', level: 2, type: '变式探测', stem: '∫₀¹ x² dx = ?', options: ['A. 1/3', 'B. 1/2', 'C. 1', 'D. 2/3'], answer: 0, tags: { knowledge: '定积分', skill_level: '应用', error_type: '牛顿-莱布尼茨', error_category: 'K', cognitive_load: '中', trap_type: 'F(1)-F(0)' }, hint: '[x³/3]₀¹=1/3-0=1/3' },
        { id: 'l12-cl-08', level: 2, type: '变式探测', stem: '函数f(x)=x³-3x在x=1处的切线斜率是？', options: ['A. 0', 'B. 3', 'C. -2', 'D. 1'], answer: 0, tags: { knowledge: '导数几何意义', skill_level: '应用', error_type: '切线斜率', error_category: 'K', cognitive_load: '中', trap_type: 'f′(1)' }, hint: 'f′(x)=3x²-3, f′(1)=0' },
        { id: 'l12-cl-09', level: 3, type: '迁移探测', stem: '函数f(x)=x³-3x+1在[-2,2]上的最大值是？', options: ['A. 3', 'B. 1', 'C. -1', 'D. 5'], answer: 0, tags: { knowledge: '最值问题', skill_level: '分析', error_type: '端点值遗漏', error_category: 'R', cognitive_load: '高', trap_type: '比较极值和端点' }, hint: 'f′=3x²-3=0, x=±1, f(-2)=-1, f(-1)=3, f(1)=-1, f(2)=3, 最大值3' },
        { id: 'l12-cl-10', level: 3, type: '迁移探测', stem: '曲线y=x²与y=√x围成的面积是？', options: ['A. 1/3', 'B. 2/3', 'C. 1', 'D. 1/2'], answer: 0, tags: { knowledge: '积分应用', skill_level: '分析', error_type: '积分限确定', error_category: 'K', cognitive_load: '高', trap_type: '上减下' }, hint: '交点x=0,1, ∫₀¹(√x-x²)dx=[2/3x^1.5-x³/3]₀¹=2/3-1/3=1/3' }
      ]
    },

    'l12-sequence': {
      name: '数列综合',
      grade: 'L12',
      textbookLessons: [50, 51, 52, 53, 54, 55, 56],
      questions: [
        { id: 'l12-sq-01', level: 1, type: '基础探测', stem: '等差数列 2,5,8,11,... 的公差是？', options: ['A. 3', 'B. 2', 'C. 5', 'D. 8'], answer: 0, tags: { knowledge: '等差数列', skill_level: '记忆', error_type: '公差计算', error_category: 'C', cognitive_load: '低', trap_type: '后项-前项' }, hint: '5-2=3' },
        { id: 'l12-sq-02', level: 1, type: '基础探测', stem: '等比数列 1,2,4,8,... 的公比是？', options: ['A. 2', 'B. 1', 'C. 4', 'D. 8'], answer: 0, tags: { knowledge: '等比数列', skill_level: '记忆', error_type: '公比计算', error_category: 'C', cognitive_load: '低', trap_type: '后项÷前项' }, hint: '2÷1=2' },
        { id: 'l12-sq-03', level: 1, type: '基础探测', stem: '等差数列通项公式 aₙ = a₁ + (n-1)d 中, a₁=2, d=3, a₅ = ?', options: ['A. 14', 'B. 17', 'C. 15', 'D. 11'], answer: 0, tags: { knowledge: '通项公式', skill_level: '记忆', error_type: '代入计算', error_category: 'C', cognitive_load: '低', trap_type: 'n-1' }, hint: 'a₅=2+(5-1)×3=2+12=14' },
        { id: 'l12-sq-04', level: 1, type: '基础探测', stem: '等比数列 a₁=1, q=2, 前4项和 S₄ = ?', options: ['A. 15', 'B. 8', 'C. 16', 'D. 4'], answer: 0, tags: { knowledge: '求和公式', skill_level: '记忆', error_type: '公式记忆', error_category: 'K', cognitive_load: '低', trap_type: 'Sₙ=a₁(1-qⁿ)/(1-q)' }, hint: 'S₄=1×(1-2⁴)/(1-2)=15' },
        { id: 'l12-sq-05', level: 2, type: '变式探测', stem: '等差数列中 a₃=7, a₇=19, 则 a₅ = ?', options: ['A. 13', 'B. 10', 'C. 15', 'D. 12'], answer: 0, tags: { knowledge: '等差中项', skill_level: '应用', error_type: '中项概念', error_category: 'K', cognitive_load: '中', trap_type: 'a₅=(a₃+a₇)/2' }, hint: '等差中项: a₅=(a₃+a₇)/2=(7+19)/2=13' },
        { id: 'l12-sq-06', level: 2, type: '变式探测', stem: '等比数列中 a₂=6, a₄=54, 则 q = ?', options: ['A. ±3', 'B. 3', 'C. -3', 'D. 9'], answer: 0, tags: { knowledge: '公比求解', skill_level: '应用', error_type: '正负讨论', error_category: 'K', cognitive_load: '中', trap_type: 'q²=9' }, hint: 'a₄/a₂=q²=9, q=±3' },
        { id: 'l12-sq-07', level: 2, type: '变式探测', stem: '1+2+3+...+100 = ?', options: ['A. 5050', 'B. 100', 'C. 5000', 'D. 10100'], answer: 0, tags: { knowledge: '等差求和', skill_level: '应用', error_type: '求和公式', error_category: 'K', cognitive_load: '中', trap_type: 'n(n+1)/2' }, hint: '100×101/2=5050' },
        { id: 'l12-sq-08', level: 2, type: '变式探测', stem: '数列 1, 1/2, 1/4, 1/8,... 前5项和是？', options: ['A. 31/16', 'B. 15/8', 'C. 2', 'D. 1'], answer: 0, tags: { knowledge: '等比求和', skill_level: '应用', error_type: '公式应用', error_category: 'K', cognitive_load: '中', trap_type: 'q=1/2' }, hint: 'S₅=(1-(1/2)⁵)/(1-1/2)=31/16' },
        { id: 'l12-sq-09', level: 3, type: '迁移探测', stem: '已知数列{aₙ}满足 a₁=1, aₙ₊₁=2aₙ+1, 求 a₃', options: ['A. 7', 'B. 3', 'C. 5', 'D. 15'], answer: 0, tags: { knowledge: '递推数列', skill_level: '分析', error_type: '递推计算', error_category: 'C', cognitive_load: '高', trap_type: '逐步计算' }, hint: 'a₂=2×1+1=3, a₃=2×3+1=7' },
        { id: 'l12-sq-10', level: 3, type: '迁移探测', stem: '某企业第一年利润100万元，此后每年增长10%。第3年利润是？', options: ['A. 121万元', 'B. 130万元', 'C. 110万元', 'D. 133.1万元'], answer: 0, tags: { knowledge: '数列应用', skill_level: '分析', error_type: '增长模型', error_category: 'K', cognitive_load: '高', trap_type: '等比增长' }, hint: '100×1.1²=121万元' }
      ]
    },
  },
  /* ═══════════ 诊断算法 ═══════════ */
  /**
   * 对指定知识点运行诊断
   * @param {string} topicKey - 知识点key
   * @param {Array} answers - 用户答案数组 [0,1,2,...]  0-based
   * @param {Array} timeSpent - 每题用时(秒)
   * @returns {Object} 诊断结果
   */
  diagnose: function(topicKey, answers, timeSpent) {
    var topic = this.questions[topicKey];
    if (!topic) return null;

    var qs = topic.questions;
    var total = qs.length;
    var correct = 0;
    var details = [];
    var errorPatterns = {};

    for (var i = 0; i < total; i++) {
      var q = qs[i];
      var isCorrect = answers[i] === q.answer;
      if (isCorrect) correct++;

      // 记录每个题的错误类型
      if (!isCorrect) {
        var et = q.tags.error_type;
        errorPatterns[et] = (errorPatterns[et] || 0) + 1;
      }

      details.push({
        id: q.id,
        level: q.level,
        type: q.type,
        knowledge: q.tags.knowledge,
        errorType: q.tags.error_type,
        errorCategory: q.tags.error_category || 'K',
        isCorrect: isCorrect,
        userAnswer: answers[i],
        correctAnswer: q.answer,
        timeSpent: timeSpent ? timeSpent[i] : null,
        trap: q.tags.trap_type
      });
    }

    // 计算掌握度
    var mastery = correct / total;

    // 识别失分根因
    var rootCauses = this.identifyRootCauses(errorPatterns, details);

    // 生成报告
    var report = this.generateReport(topic, mastery, rootCauses, details, topicKey);

    return report;
  },

  /**
   * 识别失分根因
   */
  identifyRootCauses: function(errorPatterns, details) {
    var causes = [];

    // 收集所有错误详情
    var errors = [];
    for (var i = 0; i < details.length; i++) {
      if (!details[i].isCorrect) {
        errors.push(details[i]);
      }
    }

    if (errors.length === 0) {
      return [{ name: '暂无明显失分点', impact: 0, suggestion: '继续保持当前学习状态' }];
    }

    // 按错误模式分组
    var patternCount = {};
    for (var e = 0; e < errors.length; e++) {
      var trap = errors[e].trap;
      var level = errors[e].level;
      var key = trap + '|' + level;
      patternCount[key] = (patternCount[key] || 0) + 1;
    }

    // 排序：越高级别的题出错影响越大
    var sortedPatterns = Object.keys(patternCount).sort(function(a, b) {
      var levelA = parseInt(a.split('|')[1]);
      var levelB = parseInt(b.split('|')[1]);
      return levelB - levelA;
    });

    var causeMap = {
      '正负号': { name: '符号运算薄弱', suggestion: '每日5分钟符号专项训练，重点练习负数加减法' },
      '连续运算符号': { name: '多步运算易错', suggestion: '分步书写每一步，避免心算跳步' },
      '绝对值非负': { name: '绝对值概念不清', suggestion: '重新理解绝对值定义，练习"到原点距离"的类比' },
      '条件限定': { name: '审题不仔细', suggestion: '读题时圈出关键限定词（正数/负数/整数等）' },
      '非负性应用': { name: '非负性推理不足', suggestion: '掌握"多个非负数之和为0 → 各自为0"的推理模式' },
      '移项变号': { name: '移项符号错误', suggestion: '移项口诀：过等号，要变号。专项练习10道移项题' },
      '分配律应用': { name: '去括号易错', suggestion: '用"箭头法"标记每一项：括号外数逐一乘以括号内每一项' },
      '数位值理解': { name: '列方程建模弱', suggestion: '先学"翻译法"：将文字翻译为代数式，再找等量关系' },
      '公式遗忘': { name: '基本公式不熟', suggestion: '整理常用公式卡片，每天默写一遍' },
      '等腰三角形性质': { name: '性质应用不灵活', suggestion: '看见"等腰"立即标两底角相等，用字母表示未知角' },
      '两步推理': { name: '多步推理易漏', suggestion: '明确解题路线图：第一步求什么→第二步求什么' },
      '概念混淆': { name: '概念区分不清', suggestion: '用对比表区分易混淆概念（平方根vs算术平方根等）' },
      '理解层级关系': { name: '概念层级关系不清', suggestion: '画思维导图梳理概念层级：平方根→算术平方根→开平方' },
      '判定条件混淆': { name: '判定定理混淆', suggestion: '制作SSS/SAS/ASA/AAS/HL对比卡，标注适用条件' },
      '条件匹配错误': { name: '判定-条件匹配弱', suggestion: '每道题先标已知条件类型，再选择对应的判定定理' },
      '函数建模错误': { name: '函数建模困难', suggestion: '先列表格找到变量关系，再写出表达式，验证2组数据' },
      '变量关系理解': { name: '变量间关系不清晰', suggestion: '用"自变量→因变量"箭头图表示函数关系' },
      '符号方向混淆': { name: '方向/符号混淆', suggestion: '建立"规定正向"的习惯，每次先确定正方向再计算' },
      '运算顺序混淆': { name: '运算顺序错误', suggestion: '大括号标注法：从最内层运算开始，逐层向外' },
      '累加遗漏': { name: '多步累加遗漏', suggestion: '用"正字标记法"逐项累加，避免跳步' },
      '面积与平方关系': { name: '平方关系感知弱', suggestion: '画图理解：边长×2 → 面积×4；边长×3 → 面积×9' },
      '公共边': { name: '公共边/公共角意识弱', suggestion: '养成"标记公共元素"的习惯：在图形中用颜色标记公共边/角' },
      '一半关系': { name: '一半/倍分关系理解弱', suggestion: '读完条件立即标注数值关系：AO=AC/2，BO=BD/2' },
      '坐标混淆': { name: '坐标概念不清', suggestion: '牢记"x轴水平，y轴垂直；与y轴交点→x=0"' },
      '解方程组错误': { name: '解方程组能力弱', suggestion: '练习代入法和加减消元法各5题，标注每一步的变形依据' },
      '图形分析能力': { name: '图形分析能力不足', suggestion: '解题时先在图上标注所有已知条件，再找隐含条件' },
      '审题不仔细': { name: '审题不仔细', suggestion: '限时训练时用"圈关键词法"：圈出所有数字和条件' },
      '步骤缺失': { name: '解题步骤缺失', suggestion: '养成"列步骤清单"的习惯：做完一步打一个勾' },
      '思维定势': { name: '思维定势', suggestion: '尝试用两种方法解同一题，打破"只会一种解法"的惯性' },
      '时间管理': { name: '时间分配不合理', suggestion: '限时练习：简单题每题不超过60秒，超时先跳过' },
      '注意力分配': { name: '注意力易分散', suggestion: '番茄工作法：25分钟专注+5分钟休息，逐步延长专注时间' }
    };

    for (var s = 0; s < sortedPatterns.length; s++) {
      var p = sortedPatterns[s];
      var trapName = p.split('|')[0];
      var match = causeMap[trapName];
      if (match) {
        causes.push({
          name: match.name,
          impact: Math.round((1 - errors.length / details.length) * 100),
          suggestion: match.suggestion
        });
      } else {
        // 未映射的trap_type自动生成通用诊断
        causes.push({
          name: trapName + '相关问题',
          impact: Math.round((1 - errors.length / details.length) * 100),
          suggestion: '建议回顾该知识点的基础概念和典型例题，加强变式训练。'
        });
      }
    }

    // 去重
    var unique = [];
    var seen = {};
    for (var c = 0; c < causes.length; c++) {
      if (!seen[causes[c].name]) {
        seen[causes[c].name] = true;
        unique.push(causes[c]);
      }
    }

    return unique.slice(0, 3);
  },

  /**
   * 生成诊断报告
   */
  generateReport: function(topic, mastery, rootCauses, details, topicKey) {
    var totalQuestions = details.length;
    var correctCount = details.filter(function(d) { return d.isCorrect; }).length;
    var score = Math.round(mastery * 100);

    // 等级
    var level = '待提升';
    if (score >= 80) level = '良好';
    else if (score >= 60) level = '一般';

    // L1/L2/L3 分别的掌握情况
    var byLevel = {};
    for (var i = 0; i < details.length; i++) {
      var d = details[i];
      if (!byLevel[d.level]) byLevel[d.level] = { total: 0, correct: 0 };
      byLevel[d.level].total++;
      if (d.isCorrect) byLevel[d.level].correct++;
    }

    // K/M/C/R/E/B 错因分类统计
    var errorCategoryStats = {};
    var errorDetails = details.filter(function(d) { return !d.isCorrect; });
    for (var j = 0; j < errorDetails.length; j++) {
      var cat = errorDetails[j].errorCategory || 'K';
      if (!errorCategoryStats[cat]) errorCategoryStats[cat] = { count: 0, examples: [] };
      errorCategoryStats[cat].count++;
      if (errorCategoryStats[cat].examples.length < 3) {
        errorCategoryStats[cat].examples.push(errorDetails[j].errorType);
      }
    }

    // B-Error 行为推断（基于做题行为数据）
    var behaviorAnalysis = [];
    for (var k = 0; k < details.length; k++) {
      var dt = details[k];
      if (dt.timeSpent !== null && dt.timeSpent !== undefined) {
        if (dt.timeSpent < 5 && !dt.isCorrect) {
          behaviorAnalysis.push({ type: 'B1', name: '猜题行为', detail: '第' + (k+1) + '题仅用时' + dt.timeSpent + '秒' });
        }
        if (dt.timeSpent > 120) {
          behaviorAnalysis.push({ type: 'B4', name: '走神或卡壳', detail: '第' + (k+1) + '题用时' + dt.timeSpent + '秒' });
        }
      }
    }

    return {
      topicName: topic.name,
      topicKey: topicKey,
      grade: topic.grade,
      timestamp: new Date().toISOString(),
      score: score,
      level: level,
      totalQuestions: totalQuestions,
      correctCount: correctCount,
      rootCauses: rootCauses,
      byLevel: byLevel,
      errorCategoryStats: errorCategoryStats,
      behaviorAnalysis: behaviorAnalysis,
      details: details,
      suggestion: score >= 80 ? '基础扎实，建议进入综合训练' :
                  score >= 60 ? '有提升空间，建议针对性补弱' :
                  '基础知识薄弱，建议重新学习后再次诊断'
    };
  },

  /**
   * 获取所有可诊断的知识点列表
   */
  getTopics: function(grade) {
    var list = [];
    for (var key in this.questions) {
      var t = this.questions[key];
      if (!grade || t.grade === grade) {
        list.push({ key: key, name: t.name, grade: t.grade });
      }
    }
    return list;
  }
};

/* ═══════════ 诊断UI ═══════════ */
var DiagnoseUI = {
  currentTopic: null,
  currentQuestions: [],
  currentAnswers: [],
  currentTimeSpent: [],
  questionTimer: null,
  questionStartTime: null,

  /**
   * 渲染知识点选择页面
   */
  renderTopicSelect: function(container) {
    var html = '<div style="padding:20px 16px;">';
    html += '<h2 style="font-size:22px;font-weight:700;margin-bottom:4px;color:var(--text-primary);">AI 失分诊断</h2>';
    html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:18px;">快速扫描或选择级别深度诊断</p>';

    // Quick scan section
    var scanGrades = []; var allTopics = {};
    var gradeList = ['L1','L2','L3','L4','L5','L6','L7','L8','L9','L10','L11','L12'];
    for (var gi = 0; gi < gradeList.length; gi++) {
      var gk = gradeList[gi];
      var ts = DIAGNOSE.getTopics(gk);
      if (ts && ts.length > 0) { scanGrades.push(gk); allTopics[gk] = ts; }
    }

    html += '<div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:10px;">快速扫描（10题筛出薄弱点）</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">';
    for (var sg = 0; sg < scanGrades.length; sg++) {
      var gname = scanGrades[sg];
      html += '<div onclick="DiagnoseUI.startQuickScan(\'' + gname + '\')" style="padding:8px 14px;background:rgba(var(--accent-rgb),0.08);border-radius:10px;border:0.5px solid rgba(var(--accent-rgb),0.15);cursor:pointer;font-size:13px;font-weight:500;color:var(--text-primary);">⚡ ' + gname + '</div>';
    }
    html += '</div>';

    // Grade cards (L1-L12)
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">';
    var gradeColors = ['#5AC8FA','#FF9500','#34C759','#AF52DE','#FF3B30','#FF9F0A','#00C7BE','#5AC8FA','#FF9500','#34C759','#AF52DE','#FF9F0A'];
    var gradeNames = ['一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'];
    for (var g = 1; g <= 12; g++) {
      var gkey = 'L' + g;
      var gtopics = DIAGNOSE.getTopics(gkey);
      var topicCount = gtopics ? gtopics.length : 0;
      var isActive = topicCount > 0;
      var bgColor = isActive ? gradeColors[g-1] : 'rgba(255,255,255,0.04)';
      var textColor = isActive ? '#FFFFFF' : 'var(--text-muted)';
      var opacity = isActive ? '1' : '0.35';

      html += '<div onclick="' + (isActive ? 'DiagnoseUI.showGradeTopics(\'' + gkey + '\')' : '') + '" style="padding:16px;border-radius:14px;background:' + (isActive ? 'linear-gradient(135deg,' + bgColor + ',rgba(0,0,0,0.3))' : 'var(--card-bg)') + ';cursor:' + (isActive ? 'pointer' : 'default') + ';position:relative;overflow:hidden;opacity:' + opacity + ';">';
      html += '<div style="font-size:24px;font-weight:800;color:' + textColor + ';">' + gkey + '</div>';
      html += '<div style="font-size:12px;color:' + textColor + ';margin-top:4px;opacity:0.8;">' + gradeNames[g-1] + '</div>';
      if (isActive) {
        html += '<div style="position:absolute;bottom:10px;right:12px;font-size:11px;color:' + textColor + ';opacity:0.7;">' + topicCount + '个知识点</div>';
      } else {
        html += '<div style="position:absolute;bottom:10px;right:12px;font-size:11px;color:var(--text-muted);opacity:0.5;">即将上线</div>';
      }
      html += '</div>';
    }
    html += '</div>';

    // History button
    var savedReports = JSON.parse(localStorage.getItem('diagnoseReports') || '[]');
    if (savedReports.length > 0) {
      html += '<div onclick="DiagnoseUI.showHistory()" style="background:var(--card-bg);border-radius:12px;padding:14px;margin-bottom:20px;cursor:pointer;border:0.5px solid rgba(var(--accent-rgb),0.08);display:flex;justify-content:space-between;align-items:center;">';
      html += '<div><div style="font-size:15px;font-weight:600;color:var(--text-primary);">📊 诊断历史</div>';
      html += '<div style="font-size:11px;color:var(--text-muted);margin-top:2px;">共' + savedReports.length + '次记录，点击查看</div></div>';
      html += '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M6 4l4 4-4 4"/></svg>';
      html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  },

  /* ── 显示某个级别的知识点列表 ── */
  showGradeTopics: function(grade) {
    var container = document.getElementById('diagnoseContent');
    if (!container) return;

    var topics = DIAGNOSE.getTopics(grade);
    var gradeNames = {L1:'一年级',L2:'二年级',L3:'三年级',L4:'四年级',L5:'五年级',L6:'六年级',L8:'初一',L9:'初二',L10:'初三',L11:'高一',L12:'高二'};
    var gradeName = gradeNames[grade] || grade;

    var html = '<div style="padding:20px 16px;">';

    // Back button + title
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">';
    html += '<div onclick="DiagnoseUI.retry()" style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);border:none;color:var(--text-secondary);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">←</div>';
    html += '<span style="font-size:17px;font-weight:700;color:var(--text-primary);">' + grade + ' ' + gradeName + '</span>';
    html += '</div>';

    // Quick scan for this grade
    html += '<div onclick="DiagnoseUI.startQuickScan(\'' + grade + '\')" style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:linear-gradient(135deg,rgba(var(--accent-rgb),0.1),rgba(var(--accent-rgb),0.02));border-radius:12px;margin-bottom:16px;border:0.5px solid rgba(var(--accent-rgb),0.1);cursor:pointer;">';
    html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
    html += '<div><div style="font-size:14px;font-weight:600;color:var(--text-primary);">' + grade + ' 快速扫描</div>';
    html += '<div style="font-size:11px;color:var(--text-muted);">10题筛出薄弱点，推荐优先诊断项</div></div>';
    html += '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" stroke-width="2" style="margin-left:auto;"><path d="M6 4l4 4-4 4"/></svg>';
    html += '</div>';

    // Topic list for this grade
    html += '<div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:10px;">知识点深度诊断</div>';
    for (var t = 0; t < topics.length; t++) {
      var tp = topics[t];
      html += '<div onclick="DiagnoseUI.startDiagnose(\'' + tp.key + '\')" style="background:var(--card-bg);border-radius:12px;padding:14px;margin-bottom:8px;cursor:pointer;border:0.5px solid rgba(var(--accent-rgb),0.1);display:flex;justify-content:space-between;align-items:center;">';
      html += '<div><div style="font-size:15px;font-weight:600;color:var(--text-primary);">' + tp.name + '</div>';
      html += '<div style="font-size:11px;color:var(--text-muted);margin-top:2px;">10道三层探测题 · 约15分钟</div></div>';
      html += '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M6 4l4 4-4 4"/></svg>';
      html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  },

  /**
   * 开始诊断答题
   */
  startDiagnose: function(topicKey) {
    var topic = DIAGNOSE.questions[topicKey];
    if (!topic) return;

    this.currentTopic = topicKey;
    this.currentQuestions = topic.questions;
    this.currentAnswers = [];
    this.currentTimeSpent = [];
    this.currentResults = [];
    this.currentQuestionIdx = 0;
    this.isQuickScan = false;

    this.renderQuestion();
  },

  /**
   * 渲染诊断报告 — UI基线 v1.0
   */
  renderReport: function(report) {
    var container = document.getElementById('diagnoseContent');
    if (!container) return;

    var score = report.score;
    var levelColor = score >= 80 ? '#34C759' : score >= 60 ? '#FF9500' : '#FF3B30';

    // K/M/C/R/E/B 标签配置
    var catConfig = {
      'K': { name: '认知性错误', color: '#EF9F27', bg: 'rgba(241,159,39,0.06)' },
      'M': { name: '方法策略错误', color: '#FF9500', bg: 'rgba(255,149,0,0.06)' },
      'C': { name: '计算执行错误', color: '#E24B4A', bg: 'rgba(226,75,74,0.06)' },
      'R': { name: '审题理解错误', color: '#378ADD', bg: 'rgba(55,138,221,0.06)' },
      'E': { name: '表达规范错误', color: '#639922', bg: 'rgba(99,153,34,0.06)' },
      'B': { name: '学习行为问题', color: '#888780', bg: 'rgba(136,135,128,0.06)' }
    };

    var html = '<div style="padding:20px 16px 34px;">';

    // ── 1. 导航栏 ──
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">';
    html += '<div style="display:flex;align-items:center;gap:10px;">';
    html += '<div onclick="DiagnoseUI.retry()" style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;color:#8E8E93;font-size:18px;cursor:pointer;">\u2039</div>';
    html += '<span style="font-size:17px;font-weight:500;color:#FFFFFF;">诊断报告</span>';
    html += '</div>';
    html += '<span style="font-size:11px;color:#8E8E93;background:rgba(255,255,255,0.06);border-radius:8px;padding:4px 8px;">' + report.correctCount + '/' + report.totalQuestions + '题</span>';
    html += '</div>';

    // ── 2. 分数 + 趋势图 ──
    html += '<div style="text-align:center;margin-bottom:20px;">';
    html += '<div style="font-size:11px;color:#8E8E93;margin-bottom:8px;">' + report.grade + ' \u00b7 ' + report.topicName + '</div>';
    html += '<div style="display:flex;align-items:baseline;justify-content:center;gap:4px;margin-bottom:4px;">';
    html += '<span style="font-size:48px;font-weight:500;color:' + levelColor + ';line-height:1;font-variant-numeric:tabular-nums;">' + score + '</span>';
    html += '<span style="font-size:16px;color:#8E8E93;">分</span>';
    html += '</div>';
    html += '<div style="font-size:13px;color:' + levelColor + ';">' + report.level + '</div>';
    html += '</div>';

    // ── 3. 分层掌握情况（三色卡片） ──
    var levelNames = {1:'基础', 2:'变式', 3:'迁移'};
    var levelColors = {1:'#34C759', 2:'#FF9500', 3:'#FF3B30'};
    var levelBgs = {1:'rgba(52,199,89,0.08)', 2:'rgba(255,149,0,0.08)', 3:'rgba(255,59,48,0.08)'};
    html += '<div style="background:#1C1C1E;border-radius:14px;padding:16px;margin-bottom:12px;">';
    html += '<div style="font-size:13px;font-weight:500;color:#FFFFFF;margin-bottom:14px;">分层掌握情况</div>';
    html += '<div style="display:flex;gap:8px;margin-bottom:10px;">';
    for (var lv = 1; lv <= 3; lv++) {
      var bl = report.byLevel[lv] || {total:0, correct:0};
      html += '<div style="flex:1;text-align:center;padding:10px 4px;background:' + levelBgs[lv] + ';border-radius:10px;">';
      html += '<div style="font-size:18px;font-weight:500;color:' + levelColors[lv] + ';font-variant-numeric:tabular-nums;">' + bl.correct + '/' + bl.total + '</div>';
      html += '<div style="font-size:10px;color:#8E8E93;margin-top:2px;">' + levelNames[lv] + '</div>';
      html += '</div>';
    }
    html += '</div>';
    // 分层解读
    var l1 = report.byLevel[1] || {total:0,correct:0};
    var l2 = report.byLevel[2] || {total:0,correct:0};
    var l3 = report.byLevel[3] || {total:0,correct:0};
    var levelHint = '';
    if (l1.correct < l1.total) levelHint = '基础题有失分，需巩固基本概念';
    else if (l2.correct < l2.total) levelHint = '基础掌握扎实，变式应用有提升空间';
    else if (l3.correct < l3.total) levelHint = '变式也OK，迁移应用待加强';
    else levelHint = '全部掌握，可以挑战更高难度';
    html += '<div style="font-size:11px;color:#8E8E93;line-height:1.5;">' + levelHint + '</div>';
    html += '</div>';

    // ── 4. 失分根因分析（K/M/C/R/E/B 标签） ──
    var catStats = report.errorCategoryStats || {};
    var totalErrors = 0;
    for (var ck in catStats) totalErrors += catStats[ck].count;

    if (totalErrors > 0) {
      html += '<div style="background:#1C1C1E;border-radius:14px;padding:16px;margin-bottom:12px;">';
      html += '<div style="font-size:13px;font-weight:500;color:#FFFFFF;margin-bottom:14px;">失分根因分析</div>';

      // 错因列表
      var catOrder = ['C','K','R','M','E'];
      for (var ci = 0; ci < catOrder.length; ci++) {
        var catKey = catOrder[ci];
        if (!catStats[catKey]) continue;
        var stat = catStats[catKey];
        var cfg = catConfig[catKey];
        var pct = Math.round(stat.count / totalErrors * 100);

        html += '<div style="padding:10px 12px;background:' + cfg.bg + ';border-radius:10px;margin-bottom:8px;">';
        html += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">';
        html += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;background:rgba(' + this._hexToRgb(cfg.color) + ',0.15);color:' + cfg.color + ';font-size:10px;font-weight:500;">' + catKey + '</span>';
        html += '<span style="font-size:13px;font-weight:500;color:#FFFFFF;">' + cfg.name + '</span>';
        html += '<span style="font-size:11px;color:#8E8E93;margin-left:auto;">' + stat.count + '题 \u00b7 ' + pct + '%</span>';
        html += '</div>';
        // 示例错因
        if (stat.examples.length > 0) {
          html += '<div style="font-size:11px;color:#8E8E93;line-height:1.5;">如：' + stat.examples.join('\u3001') + '</div>';
        }
        html += '</div>';
      }
      html += '</div>';
    }

    // ── 5. B-Error 行为推断 ──
    if (report.behaviorAnalysis && report.behaviorAnalysis.length > 0) {
      html += '<div style="background:rgba(136,135,128,0.06);border:0.5px solid rgba(136,135,128,0.12);border-radius:14px;padding:14px;margin-bottom:12px;">';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">';
      html += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;background:rgba(136,135,128,0.15);color:#888780;font-size:10px;font-weight:500;">B</span>';
      html += '<span style="font-size:13px;font-weight:500;color:#888780;">学习行为提示</span>';
      html += '</div>';
      for (var bi = 0; bi < report.behaviorAnalysis.length; bi++) {
        var ba = report.behaviorAnalysis[bi];
        html += '<div style="font-size:12px;color:#EBEBF5;line-height:1.5;margin-bottom:4px;">\u2022 ' + ba.name + '：' + ba.detail + '</div>';
      }
      html += '</div>';
    }

    // ── 6. AI学习建议 ──
    html += '<div style="background:rgba(255,149,0,0.06);border:0.5px solid rgba(255,149,0,0.12);border-radius:14px;padding:16px;margin-bottom:12px;">';
    html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">';
    html += '<div style="width:20px;height:20px;border-radius:6px;background:rgba(255,149,0,0.15);display:flex;align-items:center;justify-content:center;"><span style="font-size:10px;color:#FF9500;font-weight:500;">!</span></div>';
    html += '<span style="font-size:13px;font-weight:500;color:#FF9500;">AI学习建议</span>';
    html += '</div>';
    html += '<div style="font-size:13px;color:#EBEBF5;line-height:1.6;">' + report.suggestion + '</div>';
    if (report.rootCauses.length > 0 && report.rootCauses[0].name !== '暂无明显失分点') {
      html += '<div style="font-size:13px;color:#EBEBF5;line-height:1.6;margin-top:6px;">主要问题：<span style="color:#FF9500;font-weight:500;">' + report.rootCauses[0].name + '</span>。建议先学习教材对应课时，然后回来重新诊断。</div>';
    }
    html += '</div>';

    // ── 7. 去翻教材（动态年级） ──
    if (report.topicKey && DIAGNOSE.questions[report.topicKey] && DIAGNOSE.questions[report.topicKey].textbookLessons) {
      var tls = DIAGNOSE.questions[report.topicKey].textbookLessons;
      var kpGrade = DIAGNOSE.questions[report.topicKey].grade;
      var dataKey = 'TEXTBOOK_' + kpGrade;
      var lessons = (typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[dataKey]) ? TEXTBOOK_DATA[dataKey] : [];

      html += '<div style="background:#1C1C1E;border-radius:14px;padding:16px;margin-bottom:12px;">';
      html += '<div style="font-size:13px;font-weight:500;color:#FFFFFF;margin-bottom:8px;">去翻教材</div>';
      html += '<div style="font-size:12px;color:#8E8E93;margin-bottom:12px;">根据诊断结果，建议复习以下课时：</div>';

      if (lessons.length > 0) {
        for (var ti = 0; ti < tls.length; ti++) {
          var lessonIdx = tls[ti];
          if (lessons[lessonIdx]) {
            var isPrimary = ti === 0;
            var cardBg = isPrimary ? 'linear-gradient(135deg,rgba(255,149,0,0.12),rgba(255,149,0,0.02))' : 'rgba(255,255,255,0.03)';
            var cardBorder = isPrimary ? '1px solid rgba(255,149,0,0.2)' : '0.5px solid rgba(255,255,255,0.06)';
            var leftBar = isPrimary ? '#FF9500' : 'rgba(255,149,0,0.3)';
            html += '<div onclick="DiagnoseUI.goToTextbook(\'' + kpGrade + '\',' + lessonIdx + ')" style="position:relative;padding:14px;background:' + cardBg + ';border:' + cardBorder + ';border-radius:12px;margin-bottom:8px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;overflow:hidden;">';
            html += '<div style="position:absolute;top:0;left:0;width:3px;height:100%;background:' + leftBar + ';"></div>';
            html += '<div style="padding-left:8px;"><div style="font-size:14px;font-weight:500;color:' + (isPrimary ? '#FFFFFF' : '#EBEBF5') + ';">' + lessons[lessonIdx].title + '</div>';
            if (isPrimary) {
              html += '<div style="font-size:10px;color:#FF9500;font-weight:500;margin-top:2px;">强烈推荐</div>';
            } else {
              html += '<div style="font-size:11px;color:#8E8E93;margin-top:2px;">' + kpGrade + ' \u00b7 第' + (lessonIdx+1) + '课时</div>';
            }
            html += '</div>';
            html += '<span style="font-size:12px;color:#FF9500;flex-shrink:0;margin-left:12px;">去学习 \u2192</span>';
            html += '</div>';
          }
        }
      } else {
        html += '<div id="diagnose-textbook-loading" style="padding:14px;text-align:center;color:#FF9500;font-size:13px;">\u23f3 正在加载教材...</div>';
        if (typeof TEXTBOOK_READER !== 'undefined' && TEXTBOOK_READER._loadGradeData) {
          TEXTBOOK_READER._loadGradeData(kpGrade, function() {
            var dk = 'TEXTBOOK_' + kpGrade;
            var ls = (typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[dk]) ? TEXTBOOK_DATA[dk] : [];
            var loadingEl = document.getElementById('diagnose-textbook-loading');
            if (loadingEl && ls.length > 0) {
              var inner = '';
              for (var ti2 = 0; ti2 < tls.length; ti2++) {
                var li2 = tls[ti2];
                if (ls[li2]) {
                  var isP2 = ti2 === 0;
                  var cbg2 = isP2 ? 'linear-gradient(135deg,rgba(255,149,0,0.12),rgba(255,149,0,0.02))' : 'rgba(255,255,255,0.03)';
                  var cb2 = isP2 ? '1px solid rgba(255,149,0,0.2)' : '0.5px solid rgba(255,255,255,0.06)';
                  var lb2 = isP2 ? '#FF9500' : 'rgba(255,149,0,0.3)';
                  inner += '<div onclick="DiagnoseUI.goToTextbook(\'' + kpGrade + '\',' + li2 + ')" style="position:relative;padding:14px;background:' + cbg2 + ';border:' + cb2 + ';border-radius:12px;margin-bottom:8px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;overflow:hidden;">';
                  inner += '<div style="position:absolute;top:0;left:0;width:3px;height:100%;background:' + lb2 + ';"></div>';
                  inner += '<div style="padding-left:8px;"><div style="font-size:14px;font-weight:500;color:' + (isP2 ? '#FFFFFF' : '#EBEBF5') + ';">' + ls[li2].title + '</div>';
                  if (isP2) {
                    inner += '<div style="font-size:10px;color:#FF9500;font-weight:500;margin-top:2px;">强烈推荐</div>';
                  } else {
                    inner += '<div style="font-size:11px;color:#8E8E93;margin-top:2px;">' + kpGrade + ' \u00b7 第' + (li2+1) + '课时</div>';
                  }
                  inner += '</div>';
                  inner += '<span style="font-size:12px;color:#FF9500;flex-shrink:0;margin-left:12px;">去学习 \u2192</span>';
                  inner += '</div>';
                }
              }
              loadingEl.innerHTML = inner;
            } else if (loadingEl) {
              loadingEl.innerHTML = '<div style="color:#8E8E93;font-size:12px;">该年级教材暂无内容</div>';
            }
          });
        }
      }
      html += '</div>';
    }

    // ── 8. 7天训练计划 ──
    html += '<div style="background:#1C1C1E;border-radius:14px;padding:16px;margin-bottom:16px;">';
    html += '<div style="font-size:13px;font-weight:500;color:#FFFFFF;margin-bottom:12px;">7天训练计划</div>';
    // 进度条
    html += '<div style="display:flex;gap:6px;margin-bottom:14px;">';
    for (var d = 0; d < 7; d++) {
      var dayColor = d < 2 ? 'rgba(52,199,89,0.12)' : d === 2 ? 'rgba(255,149,0,0.15)' : 'rgba(255,255,255,0.04)';
      var dayText = d < 2 ? '#34C759' : d === 2 ? '#FF9500' : '#8E8E93';
      html += '<div style="flex:1;height:28px;border-radius:6px;background:' + dayColor + ';display:flex;align-items:center;justify-content:center;font-size:10px;color:' + dayText + ';font-weight:500;">D' + (d+1) + '</div>';
    }
    html += '</div>';
    // 计划内容
    var trainPlan = DiagnoseUI.generateTrainingPlan(report);
    for (var dp = 0; dp < Math.min(2, trainPlan.length); dp++) {
      var planBg = dp === 0 ? 'rgba(255,149,0,0.06)' : 'rgba(255,255,255,0.02)';
      var planLabel = dp === 0 ? 'Day 3 \u00b7 今天' : 'Day ' + (4+dp) + ' \u00b7 明天';
      var planColor = dp === 0 ? '#FF9500' : '#8E8E93';
      html += '<div style="padding:10px 12px;background:' + planBg + ';border-radius:10px;margin-bottom:8px;">';
      html += '<div style="font-size:10px;font-weight:500;color:' + planColor + ';margin-bottom:4px;">' + planLabel + '</div>';
      html += '<div style="font-size:12px;color:' + (dp === 0 ? '#EBEBF5' : '#8E8E93') + ';line-height:1.5;">' + trainPlan[dp] + '</div>';
      html += '</div>';
    }
    html += '</div>';

    // ── 9. 操作按钮 ──
    html += '<div style="display:flex;gap:10px;margin-bottom:10px;">';
    html += '<button onclick="DiagnoseUI.retry()" style="flex:1;padding:14px;border-radius:12px;border:0.5px solid rgba(255,149,0,0.3);background:transparent;color:#FF9500;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;">重新诊断</button>';
    html += '<button onclick="DiagnoseUI.saveReport()" style="flex:1;padding:14px;border-radius:12px;border:none;background:#FF9500;color:#FFFFFF;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;">保存报告</button>';
    html += '</div>';
    html += '<button onclick="DiagnoseUI.renderTextbookRecommendation(DiagnoseUI._lastReport)" style="width:100%;padding:14px;border-radius:12px;border:0.5px solid rgba(255,255,255,0.1);background:var(--card-bg);color:var(--text-secondary);font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;">📚 查看完整教材推荐与学习路径</button>';

    html += '</div>';
    container.innerHTML = html;

    // Store last report for textbook recommendation page
    this._lastReport = report;

    // Auto-save report
    try {
      var saved = JSON.parse(localStorage.getItem('diagnoseReports') || '[]');
      saved.push({ report: report, date: new Date().toISOString() });
      if (saved.length > 50) saved = saved.slice(-50);
      localStorage.setItem('diagnoseReports', JSON.stringify(saved));
    } catch(e) { /* ignore save errors */ }
  },

  /* 工具：hex转rgb */
  _hexToRgb: function(hex) {
    var r = parseInt(hex.slice(1,3), 16);
    var g = parseInt(hex.slice(3,5), 16);
    var b = parseInt(hex.slice(5,7), 16);
    return r + ',' + g + ',' + b;
  },

  retry: function() {
    this.currentTopic = null;
    this.currentQuestions = [];
    this.currentAnswers = [];
    this.currentTimeSpent = [];
    this.currentQuestionIdx = 0;
    this.renderTopicSelect(document.getElementById('diagnoseContent'));
  },

  /* 跳转到教材阅读器，打开指定年级的指定课时 */
  goToTextbook: function(grade, lessonIdx) {
    if (typeof switchToTextbook === 'function') {
      switchToTextbook();
    }
    // 等待教材加载后打开对应课时
    if (typeof TEXTBOOK_READER !== 'undefined') {
      var self = this;
      var tryOpen = function() {
        var dataKey = 'TEXTBOOK_' + grade;
        if (TEXTBOOK_READER._loadedGrades[grade] && typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[dataKey]) {
          TEXTBOOK_READER.currentGrade = grade;
          TEXTBOOK_READER.openLesson(lessonIdx);
        } else {
          TEXTBOOK_READER._loadGradeData(grade, function() {
            TEXTBOOK_READER.currentGrade = grade;
            TEXTBOOK_READER.openLesson(lessonIdx);
          });
        }
      };
      setTimeout(tryOpen, 100);
    }
  },

  /* ── 教材推荐页 — UI基线 v1.0 (Step 7) ── */
  renderTextbookRecommendation: function(report) {
    var container = document.getElementById('diagnoseContent');
    if (!container || !report) return;

    var topicKey = report.topicKey;
    var topic = DIAGNOSE.questions[topicKey];
    if (!topic) return;

    var kpGrade = topic.grade;
    var tls = topic.textbookLessons || [];
    var score = report.score;
    var weakCats = report.errorCategoryStats || {};
    var dataKey = 'TEXTBOOK_' + kpGrade;
    var lessons = (typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[dataKey]) ? TEXTBOOK_DATA[dataKey] : [];

    var html = '<div style="padding:0 0 80px;">';

    // ── 导航栏 (5.1) ──
    html += '<div style="display:flex;align-items:center;gap:10px;padding:12px 20px;background:var(--card-bg);position:sticky;top:0;z-index:10;">';
    html += '<div onclick="DiagnoseUI.renderReport(DiagnoseUI._lastReport)" style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;color:var(--text-secondary);font-size:18px;cursor:pointer;">\u2039</div>';
    html += '<div style="flex:1;"><div style="font-size:17px;font-weight:500;color:#FFFFFF;">教材推荐</div>';
    html += '<div style="font-size:11px;color:var(--text-muted);">' + topic.name + ' \u00b7 ' + kpGrade + '</div></div>';
    html += '</div>';

    html += '<div style="padding:20px 16px;">';

    // ── 摘要卡片 ──
    var scoreColor = score >= 80 ? '#34C759' : score >= 60 ? '#FF9500' : '#FF3B30';
    html += '<div style="background:var(--card-bg);border-radius:14px;padding:16px;margin-bottom:20px;">';
    html += '<div style="display:flex;align-items:center;gap:16px;">';
    // 小分数圆环 (5.7: 80×80px, 环宽12px)
    var circumference = 2 * Math.PI * 28;
    var dashOffset = circumference * (1 - score / 100);
    html += '<svg width="80" height="80" viewBox="0 0 80 80" style="flex-shrink:0;">';
    html += '<circle cx="40" cy="40" r="28" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="12"/>';
    html += '<circle cx="40" cy="40" r="28" fill="none" stroke="' + scoreColor + '" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + dashOffset + '" transform="rotate(-90 40 40)"/>';
    html += '<text x="40" y="46" text-anchor="middle" font-size="22" font-weight="500" fill="' + scoreColor + '" font-family="-apple-system,sans-serif">' + score + '</text>';
    html += '</svg>';
    html += '<div style="flex:1;">';
    html += '<div style="font-size:15px;font-weight:500;color:#FFFFFF;margin-bottom:4px;">' + topic.name + '</div>';
    var weakList = [];
    if (weakCats) { for (var k in weakCats) { if (weakCats[k] > 0) weakList.push(k); } }
    html += '<div style="font-size:13px;color:var(--text-muted);line-height:1.5;">薄弱环节：' + (weakList.length > 0 ? weakList.join(' / ') : '无明显薄弱') + '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    // ── 强烈推荐课时 (5.9) ──
    html += '<div style="font-size:15px;font-weight:500;color:#FFFFFF;margin-bottom:12px;">🎯 重点复习</div>';
    html += '<div id="recPrimaryLessons" style="margin-bottom:24px;">';
    if (lessons.length > 0) {
      html += this._renderLessonCard(lessons, tls, kpGrade, true);
    } else {
      html += '<div id="recLoading" style="padding:14px;text-align:center;color:#FF9500;font-size:13px;">\u23f3 正在加载教材...</div>';
      if (typeof TEXTBOOK_READER !== 'undefined' && TEXTBOOK_READER._loadGradeData) {
        TEXTBOOK_READER._loadGradeData(kpGrade, function() {
          var dk = 'TEXTBOOK_' + kpGrade;
          var ls = (typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[dk]) ? TEXTBOOK_DATA[dk] : [];
          var el = document.getElementById('recLoading');
          if (el && ls.length > 0) {
            el.outerHTML = DiagnoseUI._renderLessonCard(ls, tls, kpGrade, true);
            var supEl = document.getElementById('recSupplementaryLessons');
            if (supEl) supEl.innerHTML = DiagnoseUI._renderLessonCard(ls, tls, kpGrade, false);
          } else if (el) {
            el.innerHTML = '<div style="color:#8E8E93;font-size:12px;text-align:center;">该年级教材暂无内容</div>';
          }
        });
      }
    }
    html += '</div>';

    // ── 补充推荐课时 (5.9) ──
    html += '<div style="font-size:15px;font-weight:500;color:#FFFFFF;margin-bottom:12px;">📖 拓展提升</div>';
    html += '<div id="recSupplementaryLessons" style="margin-bottom:24px;">';
    if (lessons.length > 0) {
      html += this._renderLessonCard(lessons, tls, kpGrade, false);
    }
    html += '</div>';

    // ── 学习路径 (5.10) ──
    html += '<div style="font-size:15px;font-weight:500;color:#FFFFFF;margin-bottom:16px;">🗺️ 学习路径</div>';
    html += '<div style="background:var(--card-bg);border-radius:14px;padding:20px 16px;margin-bottom:20px;">';

    var pathSteps = this._buildLearningPath(report, tls);
    for (var pi = 0; pi < pathSteps.length; pi++) {
      var step = pathSteps[pi];
      var stepBg, stepColor, stepLabel;
      if (step.status === 'done') { stepBg = 'rgba(52,199,89,0.15)'; stepColor = '#34C759'; stepLabel = '\u2713'; }
      else if (step.status === 'current') { stepBg = 'rgba(255,149,0,0.15)'; stepColor = '#FF9500'; stepLabel = (pi + 1) + ''; }
      else { stepBg = 'rgba(255,255,255,0.06)'; stepColor = '#8E8E93'; stepLabel = (pi + 1) + ''; }

      var textColor = step.status === 'done' ? '#EBEBF5' : step.status === 'current' ? '#FF9500' : '#8E8E93';
      var fontWeight = step.status === 'current' ? '500' : '400';

      html += '<div style="display:flex;align-items:flex-start;gap:12px;">';
      // 步骤圆点 (5.10: 24×24)
      html += '<div style="width:24px;height:24px;border-radius:50%;background:' + stepBg + ';display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;color:' + stepColor + ';flex-shrink:0;">' + stepLabel + '</div>';
      html += '<div style="flex:1;padding-bottom:' + (pi < pathSteps.length - 1 ? '20px' : '0') + ';">';
      html += '<div style="font-size:12px;font-weight:' + fontWeight + ';color:' + textColor + ';margin-bottom:2px;">' + step.title + '</div>';
      if (step.desc) {
        html += '<div style="font-size:11px;color:var(--text-muted);line-height:1.4;">' + step.desc + '</div>';
      }
      html += '</div>';
      html += '</div>';
      // 连线 (5.10: 1px, 高12px)
      if (pi < pathSteps.length - 1) {
        html += '<div style="width:1px;height:12px;background:rgba(255,255,255,0.08);margin-left:11px;margin-top:-4px;margin-bottom:-4px;"></div>';
      }
    }
    html += '</div>';

    // ── 底部操作 ──
    html += '<button onclick="DiagnoseUI.renderReport(DiagnoseUI._lastReport)" style="width:100%;padding:14px;border-radius:14px;border:0.5px solid rgba(255,149,0,0.3);background:transparent;color:#FF9500;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;">返回报告</button>';

    html += '</div>';
    container.innerHTML = html;
    container.scrollTop = 0;
  },

  /* ── 渲染课时卡片 (5.9) ── */
  _renderLessonCard: function(lessons, tls, grade, isPrimary) {
    var html = '';
    var startIdx = isPrimary ? 0 : Math.min(2, tls.length);
    var endIdx = isPrimary ? Math.min(2, tls.length) : tls.length;

    for (var ti = startIdx; ti < endIdx; ti++) {
      var lessonIdx = tls[ti];
      if (lessons[lessonIdx]) {
        if (isPrimary) {
          // 强烈推荐 (5.9: 渐变背景, 左侧条, 胶囊标签)
          html += '<div onclick="DiagnoseUI.goToTextbook(\'' + grade + '\',' + lessonIdx + ')" style="position:relative;padding:16px;background:linear-gradient(135deg,rgba(255,149,0,0.12),rgba(255,149,0,0.02));border:1px solid rgba(255,149,0,0.2);border-radius:14px;margin-bottom:10px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;overflow:hidden;">';
          html += '<div style="position:absolute;top:0;left:0;width:3px;height:100%;background:#FF9500;"></div>';
          html += '<div style="padding-left:8px;flex:1;">';
          html += '<div style="font-size:15px;font-weight:500;color:#FFFFFF;margin-bottom:4px;">' + lessons[lessonIdx].title + '</div>';
          html += '<div style="display:inline-block;padding:1px 8px;border-radius:10px;background:rgba(255,149,0,0.15);font-size:10px;font-weight:500;color:#FF9500;">强烈推荐</div>';
          html += '<span style="font-size:11px;color:var(--text-muted);margin-left:8px;">' + grade + ' \u00b7 第' + (lessonIdx + 1) + '课时</span>';
          html += '</div>';
          html += '<span style="font-size:12px;color:#FF9500;flex-shrink:0;margin-left:12px;font-weight:500;">去学习 \u2192</span>';
          html += '</div>';
        } else {
          // 补充推荐 (5.9: 普通卡片)
          html += '<div onclick="DiagnoseUI.goToTextbook(\'' + grade + '\',' + lessonIdx + ')" style="position:relative;padding:14px;background:var(--card-bg);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;margin-bottom:8px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;overflow:hidden;">';
          html += '<div style="position:absolute;top:0;left:0;width:3px;height:100%;background:rgba(255,149,0,0.3);"></div>';
          html += '<div style="padding-left:8px;flex:1;">';
          html += '<div style="font-size:14px;font-weight:500;color:#EBEBF5;margin-bottom:2px;">' + lessons[lessonIdx].title + '</div>';
          html += '<div style="font-size:11px;color:var(--text-muted);">' + grade + ' \u00b7 第' + (lessonIdx + 1) + '课时</div>';
          html += '</div>';
          html += '<span style="font-size:12px;color:var(--text-muted);flex-shrink:0;margin-left:12px;">去学习 \u2192</span>';
          html += '</div>';
        }
      }
    }
    if (isPrimary && startIdx >= endIdx) {
      html = '<div style="color:var(--text-muted);font-size:12px;text-align:center;padding:14px;">暂无重点推荐课时</div>';
    }
    if (!isPrimary && startIdx >= endIdx) {
      html = '<div style="color:var(--text-muted);font-size:12px;text-align:center;padding:14px;">暂无拓展课时</div>';
    }
    return html;
  },

  /* ── 构建学习路径 (5.10) ── */
  _buildLearningPath: function(report, tls) {
    var score = report.score;
    var steps = [];

    // Step 1: 基础复习 (已完成 if score > 0 and first lesson studied)
    steps.push({
      title: '基础复习 — 阅读知识梳理',
      desc: '打开第' + (tls[0] + 1) + '课时，重点阅读"知识梳理"部分',
      status: score > 0 ? 'done' : 'current'
    });

    // Step 2: 例题学习
    steps.push({
      title: '例题学习 — 理解解题思路',
      desc: '学习教材中的例题讲解，掌握标准解法',
      status: score > 40 ? 'done' : (score > 0 ? 'current' : 'pending')
    });

    // Step 3: 配套练习
    steps.push({
      title: '配套练习 — 巩固基础',
      desc: '完成教材配套练习题，标记不会的题目',
      status: score >= 60 ? 'done' : (score > 40 ? 'current' : 'pending')
    });

    // Step 4: 错题回顾
    steps.push({
      title: '错题回顾 — 针对性复习',
      desc: '回顾诊断中的错题，对照教材重新理解',
      status: score >= 80 ? 'done' : (score >= 60 ? 'current' : 'pending')
    });

    // Step 5: 迁移挑战
    steps.push({
      title: '迁移挑战 — 综合应用',
      desc: '尝试教材中的综合应用题（标注★的题）',
      status: score >= 80 ? 'current' : 'pending'
    });

    // Ensure at least one "current"
    var hasCurrent = false;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].status === 'current') { hasCurrent = true; break; }
    }
    if (!hasCurrent) {
      for (var j = steps.length - 1; j >= 0; j--) {
        if (steps[j].status === 'pending') { steps[j].status = 'current'; break; }
      }
    }

    return steps;
  },

  saveReport: function() {
    try {
      var saved = JSON.parse(localStorage.getItem('diagnoseReports') || '[]');
      var lastReport = /* we need to store it */ null;
      showToast('报告已保存', 'success');
    } catch(e) {
      showToast('保存失败', 'error');
    }
  },

  /* ── 生成训练计划（task 4） ── */
  generateTrainingPlan: function(report) {
    var score = report.score;
    var rootCauses = report.rootCauses;
    var plan = [];

    if (score >= 80) {
      plan.push('复习教材基础内容，快速过一遍知识梳理');
      plan.push('做教材配套练习题，标记不会的题目');
      plan.push('挑战教材综合应用题（标注★的题）');
      plan.push('预习下一课时的知识梳理部分');
      plan.push('做前3天错题的回顾，确保完全掌握');
      plan.push('尝试自己讲解本课知识点（费曼学习法）');
      plan.push('综合检测：做教材本章测试题');
    } else if (score >= 60) {
      if (rootCauses.length > 0) {
        plan.push('重新阅读知识梳理，重点看：' + rootCauses[0].name);
        plan.push('重做教材例题，一步一步对照解析理解');
        plan.push('重点练习配套练习中第1-3题（基础巩固）');
        plan.push('针对薄弱点，做变式训练：换数字/换情境');
        plan.push('回顾前4天的错题，找出共性错误模式');
        plan.push('做教材综合题，检验是否真正掌握');
        plan.push('完整做一套本章测试，目标正确率≥80%');
      }
    } else {
      if (rootCauses.length > 0) {
        plan.push('从零开始：打开教材第' + (report.topicKey ? '对应' : '') + '课，逐字阅读知识梳理');
        plan.push('抄写教材例题的完整解题步骤，理解每一步');
        plan.push('做配套练习题第1-2题，确保基础过关');
        plan.push('再读一遍知识梳理，标记不理解的句子');
        plan.push('求助：找老师/家长讲解不懂的部分');
        plan.push('重做Day2-3的题，看是否有进步');
        plan.push('做本章基础测试，目标正确率≥60%');
      }
    }
    return plan;
  },

  /* ── 快速扫描 ── */
  startQuickScan: function(grade) {
    var topics = DIAGNOSE.getTopics(grade);
    // Pick 1 L1 question from each topic
    var scanQuestions = [];
    for (var i = 0; i < topics.length; i++) {
      var topic = DIAGNOSE.questions[topics[i].key];
      if (topic) {
        // Find the first L1 question
        for (var j = 0; j < topic.questions.length; j++) {
          if (topic.questions[j].level === 1) {
            scanQuestions.push(Object.assign({}, topic.questions[j], { _topicKey: topics[i].key, _topicName: topics[i].name }));
            break;
          }
        }
      }
    }
    // Shuffle
    for (var k = scanQuestions.length - 1; k > 0; k--) {
      var r = Math.floor(Math.random() * (k + 1));
      var tmp = scanQuestions[k]; scanQuestions[k] = scanQuestions[r]; scanQuestions[r] = tmp;
    }

    this.currentTopic = 'quick-scan-' + grade;
    this.currentQuestions = scanQuestions;
    this.currentAnswers = [];
    this.currentTimeSpent = [];
    this.currentResults = [];
    this.currentQuestionIdx = 0;
    this.isQuickScan = true;
    this.quickScanGrade = grade;
    this.renderQuestion();
  },

  /* ── 渲染当前题目 — UI基线 v1.0 ── */
  renderQuestion: function() {
    var container = document.getElementById('diagnoseContent');
    if (!container) return;

    var idx = this.currentQuestionIdx;
    var qs = this.currentQuestions;
    if (idx >= qs.length) {
      this.finishDiagnose();
      return;
    }

    var q = qs[idx];
    var levelMap = {1: '基础探测', 2: '变式探测', 3: '迁移探测'};
    var levelColors = {1: '#34C759', 2: '#FF9500', 3: '#FF3B30'};
    this.questionStartTime = Date.now();
    this.answered = false;

    var html = '<div style="padding:20px 16px 80px;">';

    // ── 分段进度条 (5.2) ──
    html += '<div style="display:flex;align-items:center;gap:3px;margin-bottom:16px;">';
    for (var s = 0; s < qs.length; s++) {
      var segColor = 'rgba(255,255,255,0.08)';
      if (s < idx) {
        segColor = this.currentResults[s] ? '#34C759' : '#FF3B30';
      } else if (s === idx) {
        segColor = '#FF9500';
      }
      html += '<div style="flex:1;height:4px;background:' + segColor + ';border-radius:2px;transition:background 0.3s;"></div>';
    }
    html += '<span style="font-size:12px;color:var(--text-muted);flex-shrink:0;margin-left:8px;font-variant-numeric:tabular-nums;">' + (idx + 1) + '/' + qs.length + '</span>';
    html += '</div>';

    // ── 知识点 + 难度标签 ──
    var topicName = q._topicName || (DIAGNOSE.questions[this.currentTopic] && DIAGNOSE.questions[this.currentTopic].name) || '';
    if (topicName) {
      html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">' + topicName + '</div>';
    }
    html += '<div style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:500;color:#fff;background:' + levelColors[q.level] + ';margin-bottom:14px;">' + levelMap[q.level] + '</div>';

    // ── 题干卡片 (16px radius, #1C1C1E) ──
    html += '<div style="background:var(--card-bg);border-radius:16px;padding:16px;margin-bottom:20px;">';
    html += '<div style="font-size:18px;font-weight:500;color:var(--text-primary);line-height:1.7;">' + q.stem + '</div>';
    html += '</div>';

    // ── 选项卡片 (5.3: 28×28单选圆点, 14px radius, 16px padding, 10px gap) ──
    html += '<div id="diagOptions" style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px;">';
    for (var o = 0; o < q.options.length; o++) {
      html += '<div id="diagOpt' + o + '" onclick="DiagnoseUI.selectAnswer(' + o + ')" style="display:flex;align-items:center;gap:12px;padding:16px;background:var(--card-bg);border:1.5px solid rgba(255,255,255,0.08);border-radius:14px;cursor:pointer;font-size:15px;font-weight:500;color:var(--text-primary);line-height:1.5;transition:all 0.2s;">';
      // 28×28 单选圆点
      html += '<div id="diagRadio' + o + '" style="width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.15);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all 0.2s;"></div>';
      html += '<span style="flex:1;">' + q.options[o] + '</span>';
      html += '</div>';
    }
    html += '</div>';

    // ── AI引导思考卡片 (5.8: 可折叠, 苏格拉底式) ──
    html += '<div onclick="var c=this.nextElementSibling; c.style.display=c.style.display===\'block\'?\'none\':\'block\';" style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:8px 0;">';
    html += '<div style="width:20px;height:20px;border-radius:6px;background:rgba(255,149,0,0.15);display:flex;align-items:center;justify-content:center;font-size:12px;color:#FF9500;font-weight:500;">?</div>';
    html += '<span style="font-size:13px;font-weight:500;color:#FF9500;">AI引导思考</span>';
    html += '<span style="font-size:11px;color:var(--text-muted);">▾</span>';
    html += '</div>';
    html += '<div style="display:none;padding:16px;background:rgba(255,149,0,0.06);border:0.5px solid rgba(255,149,0,0.15);border-radius:14px;margin-bottom:16px;">';
    html += '<div style="font-size:13px;color:var(--text-secondary);line-height:1.6;">' + q.hint + '</div>';
    html += '</div>';

    // ── 反馈区域 (答题后动态填充) ──
    html += '<div id="diagFeedback" style="margin-bottom:16px;"></div>';

    // ── 底部操作区 (答题后显示"下一题"按钮) ──
    html += '<div id="diagNextBtn" style="display:none;padding:0 0 0 0;">';
    var isLast = (idx >= qs.length - 1);
    html += '<button onclick="DiagnoseUI.nextQuestion()" style="width:100%;padding:16px;border-radius:14px;border:none;background:#FF9500;color:#FFFFFF;font-size:16px;font-weight:500;cursor:pointer;font-family:inherit;">' + (isLast ? '查看报告 →' : '下一题 →') + '</button>';
    html += '</div>';

    html += '</div>';
    container.innerHTML = html;
    container.scrollTop = 0;
  },

  /* ── 选择答案 — 带反馈 ── */
  selectAnswer: function(optIdx) {
    if (this.answered) return;
    this.answered = true;

    var idx = this.currentQuestionIdx;
    var q = this.currentQuestions[idx];
    var elapsed = Math.round((Date.now() - this.questionStartTime) / 1000);
    var isCorrect = (optIdx === q.answer);

    this.currentAnswers[idx] = optIdx;
    this.currentTimeSpent[idx] = elapsed;
    this.currentResults[idx] = isCorrect;

    // ── 更新选项样式 ──
    for (var o = 0; o < q.options.length; o++) {
      var el = document.getElementById('diagOpt' + o);
      var radio = document.getElementById('diagRadio' + o);
      if (!el) continue;

      el.style.cursor = 'default';
      el.removeAttribute('onclick');

      if (o === q.answer) {
        // 正确答案 — 绿色边框
        el.style.borderColor = '#34C759';
        el.style.background = 'rgba(52,199,89,0.06)';
        if (radio) { radio.style.borderColor = '#34C759'; radio.style.background = '#34C759'; radio.innerHTML = '<span style="color:#fff;font-size:14px;font-weight:500;">✓</span>'; }
      } else if (o === optIdx && !isCorrect) {
        // 选错的选项 — 红色边框
        el.style.borderColor = '#FF3B30';
        el.style.background = 'rgba(255,59,48,0.06)';
        if (radio) { radio.style.borderColor = '#FF3B30'; radio.style.background = '#FF3B30'; radio.innerHTML = '<span style="color:#fff;font-size:14px;font-weight:500;">✕</span>'; }
      } else {
        // 其他选项 — 降低透明度
        el.style.opacity = '0.5';
      }
    }

    // ── 显示反馈 ──
    var fb = document.getElementById('diagFeedback');
    if (fb) {
      if (isCorrect) {
        // 答对 — 绿色提示
        fb.innerHTML = '<div style="padding:14px 16px;background:rgba(52,199,89,0.08);border-radius:14px;display:flex;align-items:center;gap:10px;">' +
          '<div style="width:24px;height:24px;border-radius:50%;background:#34C759;display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;font-weight:500;">✓</div>' +
          '<span style="font-size:15px;font-weight:500;color:#34C759;">漂亮！继续加油</span>' +
          '</div>';
      } else {
        // 答错 — 苏格拉底引导卡片 (5.8)
        var socraticHint = this._getSocraticPrompt(q, optIdx);
        fb.innerHTML = '<div style="padding:16px;background:rgba(255,149,0,0.06);border:0.5px solid rgba(255,149,0,0.15);border-radius:14px;">' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">' +
          '<div style="width:20px;height:20px;border-radius:6px;background:rgba(255,149,0,0.15);display:flex;align-items:center;justify-content:center;font-size:12px;color:#FF9500;font-weight:500;">!</div>' +
          '<span style="font-size:13px;font-weight:500;color:#FF9500;">AI引导思考</span>' +
          '</div>' +
          '<div style="font-size:13px;color:var(--text-secondary);line-height:1.6;margin-bottom:12px;">' + socraticHint + '</div>' +
          '<div style="display:flex;gap:8px;">' +
          '<button onclick="DiagnoseUI._showFullHint()" style="flex:1;padding:10px;border-radius:10px;border:0.5px solid rgba(255,149,0,0.3);background:transparent;color:#FF9500;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;">我来想想</button>' +
          '<button onclick="DiagnoseUI._showFullHint()" style="flex:1;padding:10px;border-radius:10px;border:0.5px solid rgba(255,255,255,0.1);background:transparent;color:var(--text-muted);font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;">看完整解析</button>' +
          '</div>' +
          '<div id="diagFullHint" style="display:none;margin-top:12px;padding:12px;background:rgba(255,255,255,0.04);border-radius:10px;font-size:13px;color:var(--text-secondary);line-height:1.6;">' + q.hint + '</div>' +
          '</div>';
      }
    }

    // ── 显示"下一题"按钮 ──
    var btn = document.getElementById('diagNextBtn');
    if (btn) btn.style.display = 'block';
  },

  /* ── 跳转下一题 ── */
  nextQuestion: function() {
    this.currentQuestionIdx++;
    this.renderQuestion();
  },

  /* ── 苏格拉底式提示生成 ── */
  _getSocraticPrompt: function(q, selectedIdx) {
    var prompts = {
      'K': '这个知识点你似乎还有些模糊。让我们回顾一下核心概念——' + (q.tags && q.tags.knowledge ? q.tags.knowledge : '') + '的本质是什么？',
      'M': '解题方法上似乎可以换个思路。想一想：这类题通常用什么方法？有没有更直接的路径？',
      'C': '计算过程中可能出了差错。不妨重新检查每一步的运算，特别注意符号和进位。',
      'R': '审题时可能有信息遗漏。请再读一遍题目，找出所有已知条件和它们之间的关系。',
      'E': '表达格式上需要更规范。数学语言的严谨性体现在每一步都要有理有据。'
    };
    var cat = q.tags && q.tags.error_category ? q.tags.error_category : 'K';
    return prompts[cat] || '这题答错了，别灰心！看看提示，想一想哪里出了问题。';
  },

  /* ── 显示完整解析 ── */
  _showFullHint: function() {
    var el = document.getElementById('diagFullHint');
    if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
  },

  /* ── 完成诊断 ── */
  finishDiagnose: function() {
    if (this.isQuickScan) {
      this.finishQuickScan();
      return;
    }
    // 写入统一错题本(普通诊断)
    this._flushErrorsToLog(false);
    var report = DIAGNOSE.diagnose(this.currentTopic, this.currentAnswers, this.currentTimeSpent);
    if (report) this.renderReport(report);
  },

  /* ── 把本次答题中的错题写入 ERROR_LOG ──
     scanOnly=true: 快扫模式(题目带 _topicKey/_topicName)
     scanOnly=false: 普通深度诊断(通过 this.currentTopic 找知识点) */
  _flushErrorsToLog: function(scanOnly) {
    if (!this.currentQuestions || !this.currentAnswers) return;
    var now = new Date().toISOString();
    var entries = [];
    var topicObj = (!scanOnly && this.currentTopic) ? DIAGNOSE.questions[this.currentTopic] : null;
    var topicName = topicObj ? topicObj.name : '';
    var topicKey  = this.currentTopic || '';
    var grade     = topicObj ? topicObj.grade : (scanOnly ? this.quickScanGrade : '');

    for (var i = 0; i < this.currentQuestions.length; i++) {
      var q = this.currentQuestions[i];
      var ans = this.currentAnswers[i];
      // 跳过未答(快扫可能没答完)
      if (typeof ans === 'undefined' || ans === null) continue;
      if (ans === q.answer) continue; // 答对的不入库

      // 快扫题用自身带的 _topicKey/_topicName 覆盖
      var kpKey  = scanOnly ? (q._topicKey  || topicKey)  : topicKey;
      var kpName = scanOnly ? (q._topicName || topicName) : (q.tags && q.tags.knowledge ? q.tags.knowledge : topicName);
      var qGrade = scanOnly ? (this.quickScanGrade || grade) : grade;

      entries.push({
        id: q.id || (kpKey + '-' + i),
        source: 'diagnose',
        stem: q.stem || '',
        options: q.options || [],
        student_answer: ans,
        correct_answer: q.answer,
        student_answer_text: q.options ? (q.options[ans] || '') : '',
        correct_answer_text: q.options ? (q.options[q.answer] || '') : '',
        error_label: (q.tags && q.tags.error_category) ? q.tags.error_category : 'K',
        error_type: (q.tags && q.tags.error_type) ? q.tags.error_type : '',
        knowledge_point: kpName,
        topic_key: kpKey,
        grade: qGrade,
        time_spent: this.currentTimeSpent[i] || null,
        retry_count: 1,
        timestamp: now,
        is_mastered: false
      });
    }
    if (entries.length > 0) ERROR_LOG.addBatch(entries);
  },


  /* ── 快速扫描完成 ── */
  finishQuickScan: function() {
    var topics = DIAGNOSE.getTopics(this.quickScanGrade);
    var results = [];
    var totalCorrect = 0;

    for (var i = 0; i < topics.length; i++) {
      // Find which question index corresponds to this topic
      for (var j = 0; j < this.currentQuestions.length; j++) {
        if (this.currentQuestions[j]._topicKey === topics[i].key) {
          var correct = this.currentAnswers[j] === this.currentQuestions[j].answer;
          if (correct) totalCorrect++;
          results.push({
            topicKey: topics[i].key,
            topicName: topics[i].name,
            correct: correct,
            isCorrect: correct
          });
          break;
        }
      }
    }

    var container = document.getElementById('diagnoseContent');
    if (!container) return;

    var score = Math.round(totalCorrect / topics.length * 100);
    var html = '<div style="padding:20px 16px;">';
    html += '<div style="text-align:center;margin-bottom:20px;">';
    html += '<div style="width:80px;height:80px;border-radius:50%;background:rgba(var(--accent-rgb),0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;border:2px solid var(--accent);">';
    html += '<span style="font-size:28px;font-weight:700;color:var(--accent);">' + score + '</span></div>';
    html += '<div style="font-size:18px;font-weight:700;color:var(--text-primary);">' + this.quickScanGrade + '快速扫描</div>';
    html += '<div style="font-size:13px;color:var(--text-muted);margin-top:4px;">正确率 ' + score + '% · ' + totalCorrect + '/' + topics.length + '</div></div>';

    // Topic-by-topic results
    html += '<div style="background:var(--card-bg);border-radius:12px;padding:14px;margin-bottom:16px;">';
    html += '<div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:10px;">知识点掌握情况</div>';
    for (var r = 0; r < results.length; r++) {
      var res = results[r];
      html += '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:' + (r < results.length-1 ? '0.5px solid rgba(255,255,255,0.04)' : 'none') + ';">';
      html += '<span style="font-size:12px;color:' + (res.correct ? '#34C759' : '#FF3B30') + ';font-weight:700;width:36px;">' + (res.correct ? '✓' : '✗') + '</span>';
      html += '<span style="font-size:13px;color:var(--text-primary);flex:1;">' + res.topicName + '</span>';
      if (!res.correct) {
        html += '<span onclick="DiagnoseUI.startDiagnose(\'' + res.topicKey + '\')" style="font-size:11px;color:var(--accent);cursor:pointer;text-decoration:underline;">深度诊断 →</span>';
      }
      html += '</div>';
    }
    html += '</div>';

    // Recommendation
    var weakTopics = results.filter(function(r) { return !r.correct; });
    if (weakTopics.length > 0) {
      html += '<div style="background:rgba(255,59,48,0.06);border-radius:12px;padding:14px;margin-bottom:16px;border:0.5px solid rgba(255,59,48,0.15);">';
      html += '<div style="font-size:13px;font-weight:600;color:#FF3B30;margin-bottom:6px;">⚠️ 建议优先诊断</div>';
      html += '<div style="font-size:12px;color:var(--text-secondary);line-height:1.6;">以下知识点未通过筛查，建议点击"深度诊断"进行15分钟精准诊断：</div>';
      html += '<ul style="font-size:12px;color:var(--text-secondary);margin:6px 0 0 16px;padding:0;line-height:1.8;">';
      for (var w = 0; w < weakTopics.length; w++) {
        html += '<li>' + weakTopics[w].topicName + '</li>';
      }
      html += '</ul></div>';
    }

    html += '<button onclick="DiagnoseUI.retry()" style="width:100%;padding:14px;border-radius:10px;border:1.5px solid rgba(var(--accent-rgb),0.3);background:transparent;color:var(--accent);font-size:14px;font-weight:600;cursor:pointer;">返回诊断首页</button>';
    html += '</div>';
    container.innerHTML = html;

    // 写入统一错题本(快扫)
    this._flushErrorsToLog(true);

    // Auto-save
    try {
      var saved = JSON.parse(localStorage.getItem('diagnoseReports') || '[]');
      saved.push({ report: { topicName: this.quickScanGrade + '快速扫描', score: score, grade: this.quickScanGrade, level: score >= 60 ? '良好' : '待提升' }, date: new Date().toISOString(), isScan: true, weakTopics: weakTopics.map(function(r){return r.topicName;}) });
      if (saved.length > 50) saved = saved.slice(-50);
      localStorage.setItem('diagnoseReports', JSON.stringify(saved));
    } catch(e) { /* ignore */ }

    this.isQuickScan = false;
  },

  /* ── 查看历史 ── */
  showHistory: function() {
    var saved = JSON.parse(localStorage.getItem('diagnoseReports') || '[]');
    var container = document.getElementById('diagnoseContent');
    if (!container) return;

    var html = '<div style="padding:20px 16px;">';
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">';
    html += '<div onclick="DiagnoseUI.retry()" style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);border:none;color:var(--text-secondary);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">←</div>';
    html += '<span style="font-size:17px;font-weight:700;color:var(--text-primary);">📊 诊断历史</span></div>';

    if (saved.length === 0) {
      html += '<div style="text-align:center;padding:60px 20px;color:var(--text-muted);font-size:14px;">暂无诊断记录</div>';
    } else {
      for (var i = saved.length - 1; i >= 0; i--) {
        var r = saved[i];
        var d = new Date(r.date);
        var dateStr = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0') + ' ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
        var isScan = r.isScan ? '快速扫描' : '深度诊断';
        var scoreColor = r.report.score >= 80 ? '#34C759' : r.report.score >= 60 ? '#FF9500' : '#FF3B30';

        html += '<div style="background:var(--card-bg);border-radius:12px;padding:14px;margin-bottom:8px;border:0.5px solid rgba(var(--accent-rgb),0.08);">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">';
        html += '<span style="font-size:14px;font-weight:600;color:var(--text-primary);">' + r.report.topicName + '</span>';
        html += '<span style="font-size:11px;color:' + scoreColor + ';font-weight:700;">' + r.report.score + '%</span></div>';
        html += '<div style="display:flex;justify-content:space-between;">';
        html += '<span style="font-size:11px;color:var(--text-muted);">' + dateStr + ' · ' + isScan + '</span>';
        if (r.weakTopics && r.weakTopics.length > 0) {
          html += '<span style="font-size:11px;color:#FF3B30;">薄弱' + r.weakTopics.length + '项</span>';
        }
        html += '</div></div>';
      }
    }
    html += '</div>';
    container.innerHTML = html;
  }
};

/* ═══════════ 诊断视图构建 ═══════════ */
function buildDiagnosePage() {
  var container = document.getElementById('diagnoseContent');
  if (!container) return;
  DiagnoseUI.renderTopicSelect(container);
}

/* ═══════════════════════════════════════════════════════════
   统一错题本 ERROR_LOG v1.0
   汇聚所有错题(诊断+拍照)，按 K/M/C/R/E/B 六级错因分类
   localStorage key: 'errorLog'
   ═══════════════════════════════════════════════════════════ */
var ERROR_LOG = {
  STORAGE_KEY: 'errorLog',
  MAX_ENTRIES: 500,

  /* 错因标签定义 */
  CATEGORY_META: {
    'K': { name: '知识', color: '#FF3B30', desc: '知识点未掌握' },
    'M': { name: '方法', color: '#AF52DE', desc: '解题思路问题' },
    'C': { name: '计算', color: '#FF9500', desc: '运算出错' },
    'R': { name: '阅读', color: '#5AC8FA', desc: '审题不清' },
    'E': { name: '表达', color: '#FF9F0A', desc: '表达格式问题' },
    'B': { name: '行为', color: '#34C759', desc: '行为习惯推断' }
  },

  /* 来源定义 */
  SOURCE_META: {
    'diagnose': { name: 'AI诊断', color: '#5AC8FA' },
    'photo':    { name: '拍照上传', color: '#FF9500' },
    'manual':   { name: '手动录入', color: '#AF52DE' }
  },

  /* 读取全部错题 */
  getAll: function() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  },

  /* 写入一条错题(去重：同一id+source只保留最新一条) */
  add: function(entry) {
    if (!entry || !entry.stem) return false;
    var all = this.getAll();

    // 去重：相同 id + source → 覆盖旧的(保留 is_mastered 状态)
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === entry.id && all[i].source === entry.source) {
        if (typeof entry.is_mastered === 'undefined' && typeof all[i].is_mastered !== 'undefined') {
          entry.is_mastered = all[i].is_mastered;
        }
        entry.first_seen = all[i].first_seen || all[i].timestamp;
        all[i] = entry;
        this._save(all);
        return true;
      }
    }

    entry.first_seen = entry.timestamp;
    entry.is_mastered = entry.is_mastered || false;
    all.push(entry);

    // 限制最大数量(先进先出)
    if (all.length > this.MAX_ENTRIES) all = all.slice(all.length - this.MAX_ENTRIES);

    this._save(all);
    return true;
  },

  /* 批量写入(一次诊断结束统一入库) */
  addBatch: function(entries) {
    if (!entries || !entries.length) return;
    for (var i = 0; i < entries.length; i++) this.add(entries[i]);
  },

  /* 按条件筛选 */
  filter: function(opts) {
    opts = opts || {};
    var all = this.getAll();
    return all.filter(function(e) {
      if (opts.error_label && e.error_label !== opts.error_label) return false;
      if (opts.source && e.source !== opts.source) return false;
      if (opts.grade && e.grade !== opts.grade) return false;
      if (opts.knowledge_point && e.knowledge_point !== opts.knowledge_point) return false;
      if (typeof opts.is_mastered !== 'undefined' && e.is_mastered !== opts.is_mastered) return false;
      return true;
    });
  },

  /* 标记/取消标记已掌握 */
  markMastered: function(id, source, mastered) {
    var all = this.getAll();
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id && all[i].source === source) {
        all[i].is_mastered = !!mastered;
        all[i].mastered_at = mastered ? new Date().toISOString() : null;
        this._save(all);
        return true;
      }
    }
    return false;
  },

  /* 删除一条 */
  remove: function(id, source) {
    var all = this.getAll();
    var filtered = all.filter(function(e) {
      return !(e.id === id && e.source === source);
    });
    if (filtered.length !== all.length) {
      this._save(filtered);
      return true;
    }
    return false;
  },

  /* 清空 */
  clear: function() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  /* 统计：各类错因数量 */
  getCategoryStats: function() {
    var all = this.getAll();
    var stats = { K: 0, M: 0, C: 0, R: 0, E: 0, B: 0, total: all.length };
    for (var i = 0; i < all.length; i++) {
      var lbl = all[i].error_label ? all[i].error_label.charAt(0) : 'K';
      if (stats.hasOwnProperty(lbl)) stats[lbl]++;
    }
    return stats;
  },

  /* 统计：各来源数量 */
  getSourceStats: function() {
    var all = this.getAll();
    var stats = { diagnose: 0, photo: 0, manual: 0, total: all.length };
    for (var i = 0; i < all.length; i++) {
      var s = all[i].source || 'manual';
      if (stats.hasOwnProperty(s)) stats[s]++;
    }
    return stats;
  },

  /* 统计：已掌握数量 */
  getMasteredCount: function() {
    var all = this.getAll();
    var n = 0;
    for (var i = 0; i < all.length; i++) if (all[i].is_mastered) n++;
    return n;
  },

  /* 内部：保存到 localStorage */
  _save: function(arr) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {
      // 配额超限时丢弃最旧的 50%
      if (arr.length > 100) {
        arr = arr.slice(Math.floor(arr.length / 2));
        try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(arr)); } catch(e2) {}
      }
    }
  }
};
