(function () {
  var valid = { beige: true, dark: true };
  var theme = "beige";
  try { theme = valid[localStorage.getItem("child-theme")] ? localStorage.getItem("child-theme") : theme; } catch (e) {}
  try { var m = /[?&]theme=(beige|dark)/.exec(location.search); if (m) theme = m[1]; } catch (e) {}
  function setTheme(t) {
    if (!valid[t]) return;
    theme = t; document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("child-theme", t); } catch (e) {}
    document.querySelectorAll(".theme-toggle button").forEach(function (b) { b.classList.toggle("active", b.dataset.value === t); });
  }
  document.documentElement.setAttribute("data-theme", theme);
  document.addEventListener("click", function (e) {
    var themeButton = e.target.closest(".theme-toggle button");
    if (themeButton) setTheme(themeButton.dataset.value);
    var ageButton = e.target.closest(".age-tabs button");
    if (ageButton) {
      var age = ageButton.dataset.age;
      document.querySelectorAll(".age-tabs button").forEach(function (b) { b.classList.toggle("active", b === ageButton); });
      document.querySelectorAll(".guide-panel").forEach(function (p) { p.classList.toggle("active", p.dataset.age === age); });
      history.replaceState(null, "", "#age-" + age);
    }
  });
  window.addEventListener("message", function (e) { if (e.data && e.data.type === "child-theme") setTheme(e.data.theme); });
  document.addEventListener("DOMContentLoaded", function () {
    setTheme(theme);
    var wanted = location.hash.replace("#age-", "");
    var button = document.querySelector('.age-tabs button[data-age="' + wanted + '"]') || document.querySelector(".age-tabs button");
    if (button) button.click();
  });
})();
