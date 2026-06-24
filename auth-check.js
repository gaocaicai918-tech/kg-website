/**
 * 知识图谱 — 页面鉴权检查
 * 所有学科页面在 <head> 最顶部加载此文件。
 * 未登录（localStorage 无 authPhone）则立即跳回登录页。
 */
(function () {
  var authPhone = localStorage.getItem('authPhone');
  if (authPhone) return; // 已登录，直接放行

  // 计算登录页路径（兼容任意层级子目录）
  var path = window.location.pathname;
  var depth = (path.match(/\//g) || []).length - 1;
  if (depth < 1) depth = 1; // 防御性处理
  var prefix = '';
  for (var i = 0; i < depth; i++) prefix += '../';
  window.location.replace(prefix + 'index.html');
})();
