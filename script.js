// --- Kalitlar ---
const ADMIN_KEY = "12345";
const NEWS_KEY = "examtracker_news";
const EXAMS_KEY = "examtracker_exams";
const RESULTS_KEY = "examtracker_results";
const STUDENT_KEY = "examtracker_student";

// --- Yordamchi funksiyalar ---
function loadData(key){ return JSON.parse(localStorage.getItem(key) || "[]"); }
function saveData(key, data){ localStorage.setItem(key, JSON.stringify(data)); }

// --- ADMIN PANEL ---
if(location.pathname.includes("admin.html")){
  const params = new URLSearchParams(location.search);
  if(params.get("key") !== ADMIN_KEY){
    document.getElementById("locked").style.display="block";
  } else {
    document.getElementById("locked").style.display="none";
    document.getElementById("adminPanel").style.display="block";
    renderAll();
  }
}

function addNews(){
  const text = document.getElementById("newsText").value.trim();
  if(!text) return alert("Matn kiriting!");
  const list = loadData(NEWS_KEY);
  list.unshift({id:Date.now(), text});
  saveData(NEWS_KEY, list);
  document.getElementById("newsText").value="";
  renderNews();
}

function renderNews(){
  const list = loadData(NEWS_KEY);
  const el = document.getElementById("newsList");
  if(!el) return;
  el.innerHTML = list.length ?
    list.map(n=>`<div class='item'><span>${n.text}</span><button class='del' onclick='deleteItem("${NEWS_KEY}",${n.id})'>🗑️</button></div>`).join('') :
    "<div class='muted'>Hozircha yangilik yo‘q</div>";
}

function addExam(){
  const title = document.getElementById("examTitle").value.trim();
  const cls = document.getElementById("examClass").value;
  const date = document.getElementById("examDate").value;
  if(!title||!cls||!date) return alert("Barcha maydonlarni to‘ldiring!");
  const list = loadData(EXAMS_KEY);
  list.push({id:Date.now(), title, cls, date});
  saveData(EXAMS_KEY, list);
  renderExams();
}

function renderExams(){
  const list = loadData(EXAMS_KEY);
  const el = document.getElementById("examList");
  if(!el) return;
  el.innerHTML = list.length ?
    list.map(e=>`<div class='item'><span><b>${e.title}</b> — ${e.cls}-sinf (${e.date})</span><button class='del' onclick='deleteItem("${EXAMS_KEY}",${e.id})'>🗑️</button></div>`).join('') :
    "<div class='muted'>Imtihon yo‘q</div>";
}

function addResult(){
  const name = document.getElementById("studentName").value.trim();
  const cls = document.getElementById("studentClass").value;
  const score = document.getElementById("studentScore").value;
  const exam = document.getElementById("studentExam").value.trim();
  if(!name||!cls||!score||!exam) return alert("Barcha maydonlarni to‘ldiring!");
  const list = loadData(RESULTS_KEY);
  list.push({id:Date.now(), name, cls, score, exam});
  saveData(RESULTS_KEY, list);
  renderResults();
}

function renderResults(){
  const list = loadData(RESULTS_KEY);
  const el = document.getElementById("resultList");
  if(!el) return;
  el.innerHTML = list.length ?
    list.map(r=>`<div class='item'><span><b>${r.name}</b> (${r.cls}-sinf) — ${r.score} ball [${r.exam}]</span><button class='del' onclick='deleteItem("${RESULTS_KEY}",${r.id})'>🗑️</button></div>`).join('') :
    "<div class='muted'>Natijalar yo‘q</div>";
}

function deleteItem(key, id){
  const list = loadData(key).filter(i=>i.id!==id);
  saveData(key, list);
  renderAll();
}

function renderAll(){ renderNews(); renderExams(); renderResults(); }

// --- REGISTER ---
function registerStudent(){
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const cls = document.getElementById("classNum").value;
  if(!fname||!lname||!cls) return alert("Barcha maydonlarni to‘ldiring!");
  localStorage.setItem(STUDENT_KEY, JSON.stringify({fname, lname, cls}));
  location.href = "index.html";
}
