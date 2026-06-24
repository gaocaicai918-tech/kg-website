/* ════════════════════════════════════════════
   435 教材阅读器 — Textbook Reader v1.0
   ════════════════════════════════════════════ */

var TEXTBOOK_READER = {
  currentGrade: null,
  currentLesson: null,

  /* ── 学科配置 ── */
  subjects: {
    math: {
      name: '数学',
      icon: '∑',
      color: '#5AC8FA',
      gradient: 'linear-gradient(135deg,#5AC8FA,#007AFF)',
      grades: ['L1','L2','L3','L4','L5','L6','L7','L8','L9','L10','L11','L12']
    }
  },

  /* ── 主入口：书皮封面页 ── */
  render: function(container) {
    this.container = container;
    this.renderSubjectSelect();
  },

  /* ── 科目选择页（书皮样式） ── */
  renderSubjectSelect: function() {
    if (!this.container) return;
    var html = '<div style="padding:24px 16px;">';
    html += '<h2 style="font-size:22px;font-weight:700;margin-bottom:4px;color:var(--text-primary);">📚 435 教材</h2>';
    html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:24px;">选择科目浏览课程内容</p>';

    var self = this;
    for (var s in this.subjects) {
      var subj = this.subjects[s];

      // 书皮卡片
      html += '<div onclick="TEXTBOOK_READER.renderGradeSelect(\'' + s + '\')" style="background:' + subj.gradient + ';border-radius:16px;padding:28px 20px;margin-bottom:16px;cursor:pointer;position:relative;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.15);">';

      // 装饰线条
      html += '<div style="position:absolute;top:0;left:0;right:0;height:4px;background:rgba(255,255,255,0.2);"></div>';

      // 书名
      html += '<div style="font-size:28px;font-weight:800;color:#fff;margin-bottom:4px;">' + subj.name + '</div>';
      html += '<div style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:20px;">435 教材系列</div>';

      // 装饰图标
      html += '<div style="position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:64px;color:rgba(255,255,255,0.08);font-weight:800;">' + subj.icon + '</div>';

      // 年级标记
      var availableCount = 0;
      for (var g = 0; g < subj.grades.length; g++) {
        var gkey = 'TEXTBOOK_' + subj.grades[g];
        if (typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[gkey] && TEXTBOOK_DATA[gkey].length > 0) {
          availableCount++;
        }
      }
      html += '<div style="font-size:11px;color:rgba(255,255,255,0.6);">' + availableCount + '个年级 · ' + this._totalLessons(s) + '课时</div>';

      html += '</div>';
    }

    html += '</div>';
    this.container.innerHTML = html;
  },

  /* ── 年级选择页（书本排列） ── */
  renderGradeSelect: function(subjectKey) {
    var subj = this.subjects[subjectKey];
    if (!subj) return;

    var html = '<div style="padding:20px 16px;">';

    // 返回按钮
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">';
    html += '<div onclick="TEXTBOOK_READER.renderSubjectSelect()" style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);border:none;color:var(--text-secondary);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">←</div>';
    html += '<span style="font-size:17px;font-weight:700;color:var(--text-primary);">' + subj.name + '</span>';
    html += '</div>';

    // 书籍网格
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">';
    var gradeColors = ['#5AC8FA','#FF9500','#34C759','#AF52DE','#FF3B30','#FF9F0A','#00C7BE','#5AC8FA','#FF9500','#34C759','#AF52DE','#FF3B30'];
    var gradeNames = ['一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'];
    var self = this;

    for (var g = 0; g < subj.grades.length; g++) {
      var gkey = subj.grades[g];
      var dataKey = 'TEXTBOOK_' + gkey;
      var lessons = (typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[dataKey]) ? TEXTBOOK_DATA[dataKey] : [];
      var hasContent = lessons.length > 0;
      var gNum = parseInt(gkey.replace('L',''));
      var color = gradeColors[gNum-1] || '#5AC8FA';
      var gName = gradeNames[gNum-1] || gkey;

      if (hasContent) {
        html += '<div onclick="TEXTBOOK_READER.renderLessonList(\'' + gkey + '\')" style="background:linear-gradient(135deg,' + color + ',rgba(0,0,0,0.4));border-radius:14px;padding:18px 16px;cursor:pointer;position:relative;overflow:hidden;">';
        html += '<div style="position:absolute;top:0;left:0;width:4px;height:100%;background:rgba(255,255,255,0.3);"></div>';
        html += '<div style="font-size:22px;font-weight:800;color:#fff;">' + gkey + '</div>';
        html += '<div style="font-size:12px;color:rgba(255,255,255,0.7);margin-top:4px;">' + gName + '</div>';
        html += '<div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:20px;">' + lessons.length + '课时</div>';
        html += '</div>';
      } else {
        html += '<div style="background:var(--card-bg);border-radius:14px;padding:18px 16px;opacity:0.35;">';
        html += '<div style="font-size:22px;font-weight:800;color:var(--text-muted);">' + gkey + '</div>';
        html += '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">' + gName + '</div>';
        html += '<div style="font-size:11px;color:var(--text-muted);margin-top:20px;">即将上线</div>';
        html += '</div>';
      }
    }
    html += '</div></div>';

    this.container.innerHTML = html;
  },

  /* ── 课时列表 ── */
  renderLessonList: function(grade) {
    this.currentGrade = grade;
    var dataKey = 'TEXTBOOK_' + grade;
    var lessons = (typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[dataKey]) ? TEXTBOOK_DATA[dataKey] : [];
    var gradeNum = parseInt(grade.replace('L',''));
    var gradeNames = ['','一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'];
    var gName = gradeNames[gradeNum] || grade;

    var html = '<div style="padding:20px 16px;">';

    // 返回
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">';
    html += '<div onclick="TEXTBOOK_READER.renderGradeSelect(\'math\')" style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);border:none;color:var(--text-secondary);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">←</div>';
    html += '<span style="font-size:17px;font-weight:700;color:var(--text-primary);">' + grade + ' ' + gName + '</span>';
    html += '<span style="font-size:12px;color:var(--text-muted);margin-left:auto;">共' + lessons.length + '课时</span>';
    html += '</div>';

    // 课时列表
    for (var i = 0; i < lessons.length; i++) {
      var l = lessons[i];
      html += '<div onclick="TEXTBOOK_READER.openLesson(' + i + ')" style="background:var(--card-bg);border-radius:12px;padding:14px 16px;margin-bottom:8px;cursor:pointer;border:0.5px solid rgba(var(--accent-rgb),0.08);display:flex;justify-content:space-between;align-items:center;">';
      html += '<div><div style="font-size:14px;font-weight:600;color:var(--text-primary);">' + l.title + '</div>';
      var kc = l.knowledge ? l.knowledge.length : 0;
      var ec = l.examples ? l.examples.length : 0;
      var pc = l.exercises ? l.exercises.length : 0;
      html += '<div style="font-size:11px;color:var(--text-muted);margin-top:3px;">📖 ' + kc + '条 · ✏️ ' + ec + '题 · 📝 ' + pc + '题</div></div>';
      html += '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M6 4l4 4-4 4"/></svg>';
      html += '</div>';
    }

    html += '</div>';
    this.container.innerHTML = html;
  },

  /* ── 课时内容 ── */
  openLesson: function(index) {
    var dataKey = 'TEXTBOOK_' + this.currentGrade;
    var lessons = TEXTBOOK_DATA[dataKey];
    if (!lessons || index >= lessons.length) return;
    var lesson = lessons[index];
    this.currentLesson = index;

    var html = '<div style="padding:20px 16px;">';

    // 返回
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">';
    html += '<div onclick="TEXTBOOK_READER.renderLessonList(TEXTBOOK_READER.currentGrade)" style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);border:none;color:var(--text-secondary);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">←</div>';
    html += '<span style="font-size:15px;font-weight:600;color:var(--text-primary);flex:1;">' + lesson.title + '</span>';
    if (lesson.lesson_time) {
      html += '<span style="font-size:11px;color:var(--text-muted);background:rgba(var(--accent-rgb),0.06);padding:4px 10px;border-radius:6px;">' + lesson.lesson_time + '</span>';
    }
    html += '</div>';

    // 内容区块
    if (lesson.knowledge && lesson.knowledge.length > 0) {
      html += this._renderSection('📖 知识梳理', lesson.knowledge, 'var(--accent)');
    }
    if (lesson.examples && lesson.examples.length > 0) {
      html += this._renderSection('✏️ 例题讲解', lesson.examples, '#34C759');
    }
    if (lesson.exercises && lesson.exercises.length > 0) {
      html += this._renderSection('📝 配套练习', lesson.exercises, '#FF9500');
    }
    if (lesson.reading && lesson.reading.length > 0) {
      html += this._renderSection('📚 延伸阅读', lesson.reading, '#AF52DE');
    }

    html += '</div>';
    this.container.innerHTML = html;
  },

  /* ── 渲染区块 ── */
  _renderSection: function(title, items, accent) {
    var html = '<div style="background:var(--card-bg);border-radius:12px;padding:14px;margin-bottom:12px;border-left:3px solid ' + accent + ';">';
    html += '<div style="font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:10px;">' + title + '</div>';
    for (var i = 0; i < items.length; i++) {
      var text = items[i];
      if (!text) continue;
      if (text.match(/^例\d/) || text.match(/^\d+[.、]/)) {
        html += '<div style="font-size:14px;font-weight:500;color:var(--text-primary);padding:4px 0;line-height:1.6;">' + text + '</div>';
      } else if (text.match(/^答案[:：]/) || text.match(/^解析[:：]/)) {
        html += '<div style="font-size:13px;color:#34C759;padding:4px 0 4px 8px;line-height:1.6;background:rgba(52,199,89,0.04);border-radius:6px;margin:2px 0;">' + text + '</div>';
      } else if (text.match(/^[A-D]\./)) {
        html += '<span style="font-size:13px;color:var(--text-secondary);line-height:1.8;display:inline-block;margin-right:10px;">' + text + '</span>';
      } else {
        html += '<div style="font-size:13px;color:var(--text-secondary);line-height:1.7;padding:2px 0;">' + text + '</div>';
      }
    }
    html += '</div>';
    return html;
  },

  /* ── 工具：总课时数 ── */
  _totalLessons: function(subjectKey) {
    var subj = this.subjects[subjectKey];
    var total = 0;
    for (var g = 0; g < subj.grades.length; g++) {
      var key = 'TEXTBOOK_' + subj.grades[g];
      if (TEXTBOOK_DATA[key]) total += TEXTBOOK_DATA[key].length;
    }
    return total;
  },

  /* ── 从诊断跳转 ── */
  jumpToLesson: function(gradeIndex, lessonIndex) {
    if (typeof switchToTextbook === 'function') {
      switchToTextbook(gradeIndex, lessonIndex);
    }
  }
};
