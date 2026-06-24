/* ════════════════════════════════════════════
   435 教材阅读器 — Textbook Reader v1.1 (Lazy Load)
   ════════════════════════════════════════════ */

var TEXTBOOK_READER = {
  currentGrade: null,
  currentLesson: null,
  _loadedGrades: {},    // grade-key -> true after loaded
  _loadingQueue: {},    // grade-key -> [callbacks] during loading
  _pendingGrade: null,  // for click-then-load-then-render

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

  /* ── 加载单个年级数据 ── */
  _loadGradeData: function(grade, callback) {
    if (this._loadedGrades[grade]) {
      if (callback) callback();
      return;
    }
    // 已经在加载中，排队
    if (this._loadingQueue[grade]) {
      if (callback) this._loadingQueue[grade].push(callback);
      return;
    }
    this._loadingQueue[grade] = callback ? [callback] : [];

    var script = document.createElement('script');
    script.src = 'textbook/data-' + grade + '.js';
    script.onload = (function(self, g) {
      return function() {
        self._loadedGrades[g] = true;
        var q = self._loadingQueue[g] || [];
        delete self._loadingQueue[g];
        for (var i = 0; i < q.length; i++) q[i]();
        // 如果有待渲染的年级，加载后自动渲染
        if (self._pendingGrade === g) {
          self._pendingGrade = null;
          self._renderLessonListAfterLoad(g);
        }
      };
    })(this, grade);
    script.onerror = function() {
      // 加载失败，5秒后重试
      setTimeout(function() {
        delete TEXTBOOK_READER._loadedGrades[grade];
        TEXTBOOK_READER._loadGradeData(grade);
      }, 5000);
    };
    document.head.appendChild(script);
  },

  /* ── 检查年级是否有内容 ── */
  _hasData: function(grade) {
    var key = 'TEXTBOOK_' + grade;
    return this._loadedGrades[grade] && typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[key] && TEXTBOOK_DATA[key].length > 0;
  },

  /* ── 获取年级数据 ── */
  _getData: function(grade) {
    var key = 'TEXTBOOK_' + grade;
    if (typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[key]) return TEXTBOOK_DATA[key];
    return [];
  },

  /* ── 获取总课时数（仅已加载的） ── */
  _totalLessons: function(subjectKey) {
    var subj = this.subjects[subjectKey];
    var total = 0;
    for (var g = 0; g < subj.grades.length; g++) {
      var gk = subj.grades[g];
      if (this._loadedGrades[gk] && this._getData(gk).length > 0) {
        total += this._getData(gk).length;
      }
    }
    return total;
  },

  /* ── 主入口 ── */
  render: function(container) {
    this.container = container;
    this.renderSubjectSelect();
  },

  /* ── 科目选择页（书皮） ── */
  renderSubjectSelect: function() {
    if (!this.container) return;
    var html = '<div style="padding:24px 16px;">';
    html += '<h2 style="font-size:22px;font-weight:700;margin-bottom:4px;color:var(--text-primary);">📚 435 教材</h2>';
    html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:24px;">选择科目浏览课程内容</p>';

    for (var s in this.subjects) {
      var subj = this.subjects[s];
      html += '<div onclick="TEXTBOOK_READER.renderGradeSelect(\'' + s + '\')" style="background:' + subj.gradient + ';border-radius:16px;padding:28px 20px;margin-bottom:16px;cursor:pointer;position:relative;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.15);">';
      html += '<div style="position:absolute;top:0;left:0;right:0;height:4px;background:rgba(255,255,255,0.2);"></div>';
      html += '<div style="font-size:28px;font-weight:800;color:#fff;margin-bottom:4px;">' + subj.name + '</div>';
      html += '<div style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:20px;">435 教材系列</div>';
      html += '<div style="position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:64px;color:rgba(255,255,255,0.08);font-weight:800;">' + subj.icon + '</div>';

      // 年级标记
      var availableCount = 0;
      var totalCount = 0;
      for (var g = 0; g < subj.grades.length; g++) {
        var gk = subj.grades[g];
        if (this._loadedGrades[gk]) {
          var dk = 'TEXTBOOK_' + gk;
          if (typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA[dk] && TEXTBOOK_DATA[dk].length > 0) {
            availableCount++;
            totalCount += TEXTBOOK_DATA[dk].length;
          }
        }
      }
      html += '<div style="font-size:11px;color:rgba(255,255,255,0.6);">' + availableCount + '个年级 · ' + totalCount + '课时</div>';
      html += '</div>';
    }
    html += '</div>';
    this.container.innerHTML = html;
  },

  /* ── 年级选择页 ── */
  renderGradeSelect: function(subjectKey) {
    var subj = this.subjects[subjectKey];
    if (!subj) return;

    var html = '<div style="padding:20px 16px;">';
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">';
    html += '<div onclick="TEXTBOOK_READER.renderSubjectSelect()" style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);border:none;color:var(--text-secondary);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">←</div>';
    html += '<span style="font-size:17px;font-weight:700;color:var(--text-primary);">' + subj.name + '</span>';
    html += '</div>';

    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">';
    var gradeColors = ['#5AC8FA','#FF9500','#34C759','#AF52DE','#FF3B30','#FF9F0A','#00C7BE','#5AC8FA','#FF9500','#34C759','#AF52DE','#FF3B30'];
    var gradeNames = ['一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'];

    for (var g = 0; g < subj.grades.length; g++) {
      var gkey = subj.grades[g];
      var hasContent = this._loadedGrades[gkey] && this._getData(gkey).length > 0;
      var isLoading = !!this._loadingQueue[gkey];
      var gNum = parseInt(gkey.replace('L',''));
      var color = gradeColors[gNum-1] || '#5AC8FA';
      var gName = gradeNames[gNum-1] || gkey;

      if (isLoading) {
        // 加载中
        html += '<div style="background:var(--card-bg);border-radius:14px;padding:18px 16px;opacity:0.6;cursor:wait;">';
        html += '<div style="font-size:22px;font-weight:800;color:var(--text-muted);">' + gkey + '</div>';
        html += '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">' + gName + '</div>';
        html += '<div style="font-size:11px;color:var(--accent);margin-top:20px;">⏳ 加载中...</div>';
        html += '</div>';
      } else if (hasContent) {
        html += '<div onclick="TEXTBOOK_READER._onGradeClick(\'' + gkey + '\')" style="background:linear-gradient(135deg,' + color + ',rgba(0,0,0,0.4));border-radius:14px;padding:18px 16px;cursor:pointer;position:relative;overflow:hidden;">';
        html += '<div style="position:absolute;top:0;left:0;width:4px;height:100%;background:rgba(255,255,255,0.3);"></div>';
        html += '<div style="font-size:22px;font-weight:800;color:#fff;">' + gkey + '</div>';
        html += '<div style="font-size:12px;color:rgba(255,255,255,0.7);margin-top:4px;">' + gName + '</div>';
        html += '<div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:20px;">' + this._getData(gkey).length + '课时</div>';
        html += '</div>';
      } else {
        // 未加载或空数据：点击时触发加载
        html += '<div onclick="TEXTBOOK_READER._onGradeClick(\'' + gkey + '\')" style="background:var(--card-bg);border-radius:14px;padding:18px 16px;cursor:pointer;opacity:0.5;">';
        html += '<div style="font-size:22px;font-weight:800;color:var(--text-muted);">' + gkey + '</div>';
        html += '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">' + gName + '</div>';
        html += '<div style="font-size:11px;color:var(--text-muted);margin-top:20px;">点击加载</div>';
        html += '</div>';
      }
    }
    html += '</div></div>';

    this.container.innerHTML = html;
  },

  /* ── 点击年级 ── */
  _onGradeClick: function(grade) {
    if (this._loadedGrades[grade]) {
      this.renderLessonList(grade);
      return;
    }
    // 显示加载中状态
    this._pendingGrade = grade;
    this.renderGradeSelect('math');
    // 触发加载
    this._loadGradeData(grade);
  },

  /* ── 加载完成后渲染课时列表 ── */
  _renderLessonListAfterLoad: function(grade) {
    if (!this._hasData(grade)) {
      // 数据为空
      this._showNoContent(grade);
      return;
    }
    this.renderLessonList(grade);
  },

  _showNoContent: function(grade) {
    var gradeNum = parseInt(grade.replace('L',''));
    var gNames = ['','一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'];
    var gName = gNames[gradeNum] || grade;
    var html = '<div style="padding:40px 16px;text-align:center;">';
    html += '<div style="font-size:48px;margin-bottom:16px;opacity:0.3;">📚</div>';
    html += '<div style="font-size:17px;font-weight:600;color:var(--text-primary);margin-bottom:8px;">' + grade + ' ' + gName + '</div>';
    html += '<div style="font-size:13px;color:var(--text-muted);">该年级暂无教材内容</div>';
    html += '<div onclick="TEXTBOOK_READER.renderGradeSelect(\'math\')" style="margin-top:24px;display:inline-block;background:var(--accent);color:#fff;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;">返回</div>';
    html += '</div>';
    this.container.innerHTML = html;
  },

  /* ── 课时列表 ── */
  renderLessonList: function(grade) {
    this.currentGrade = grade;
    var lessons = this._getData(grade);
    var gradeNum = parseInt(grade.replace('L',''));
    var gNames = ['','一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'];
    var gName = gNames[gradeNum] || grade;

    var html = '<div style="padding:20px 16px;">';
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">';
    html += '<div onclick="TEXTBOOK_READER.renderGradeSelect(\'math\')" style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);border:none;color:var(--text-secondary);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">←</div>';
    html += '<span style="font-size:17px;font-weight:700;color:var(--text-primary);">' + grade + ' ' + gName + '</span>';
    html += '<span style="font-size:12px;color:var(--text-muted);margin-left:auto;">共' + lessons.length + '课时</span>';
    html += '</div>';

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
    var lessons = this._getData(this.currentGrade);
    if (!lessons || index >= lessons.length) return;
    var lesson = lessons[index];
    this.currentLesson = index;

    var html = '<div style="padding:20px 16px;">';
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">';
    html += '<div onclick="TEXTBOOK_READER.renderLessonList(TEXTBOOK_READER.currentGrade)" style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);border:none;color:var(--text-secondary);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">←</div>';
    html += '<span style="font-size:15px;font-weight:600;color:var(--text-primary);flex:1;">' + lesson.title + '</span>';
    if (lesson.lesson_time) {
      html += '<span style="font-size:11px;color:var(--text-muted);background:rgba(var(--accent-rgb),0.06);padding:4px 10px;border-radius:6px;">' + lesson.lesson_time + '</span>';
    }
    html += '</div>';

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

  /* ── 从诊断跳转 ── */
  jumpToLesson: function(gradeIndex, lessonIndex) {
    if (typeof switchToTextbook === 'function') {
      switchToTextbook(gradeIndex, lessonIndex);
    }
  }
};
