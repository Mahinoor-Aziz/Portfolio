(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const STORAGE_KEY = "elora.tasks.v1";
  const today = new Date();
  const dateKey = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  const fromKey = key => { const [y,m,d] = key.split("-").map(Number); return new Date(y,m-1,d); };
  const pretty = (date, options={weekday:"long",month:"short",day:"numeric"}) => date.toLocaleDateString("en-US", options);
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const uid = () => (window.crypto?.randomUUID?.() || `task-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  let tasks = loadTasks();
  let selectedDate = dateKey(today);
  let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let taskFilter = "all";
  let view = "today";
  let categoryFilter = null;
  let editingId = null;
  let toastTimer;

  function loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) return saved;
    } catch (error) { console.warn("ELORA could not read saved tasks:", error); }
    return [
      {id:uid(),title:"Review the lecture notes",details:"Focus on the key concepts from this week.",date:dateKey(today),time:"10:30",category:"Study",priority:"high",completed:false},
      {id:uid(),title:"Take a proper lunch break",details:"Step away from the screen for a little while.",date:dateKey(today),time:"13:00",category:"Personal",priority:"low",completed:false},
      {id:uid(),title:"Finish the project outline",details:"Write down the next three practical steps.",date:dateKey(today),time:"16:00",category:"Work",priority:"normal",completed:false}
    ];
  }
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
    catch (error) { showToast("Couldn't save changes in this browser."); }
  }
  function showToast(message) {
    const toast = $("#toast"); toast.textContent = message; toast.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
  }
  function updateHeader() {
    $("#topDate").textContent = pretty(today,{month:"long",year:"numeric"}).toUpperCase() + " · YOUR PERSONAL SPACE";
    $("#welcomeEyebrow").textContent = pretty(today,{weekday:"long",month:"long",day:"numeric"}).toUpperCase();
    $("#monthTitle").textContent = pretty(visibleMonth,{month:"long",year:"numeric"});
  }
  function monthDates() {
    const start = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const mondayOffset = (start.getDay()+6)%7;
    const weekStart = new Date(start); weekStart.setDate(start.getDate()-mondayOffset);
    return Array.from({length:7},(_,i)=>{const d=new Date(weekStart);d.setDate(weekStart.getDate()+i);return d;});
  }
  function renderCalendar() {
    $("#monthTitle").textContent = pretty(visibleMonth,{month:"long",year:"numeric"});
    $("#dateStrip").innerHTML = monthDates().map(date => {
      const key=dateKey(date), classes=["date-cell"];
      if(key===selectedDate) classes.push("selected");
      if(key===dateKey(today)) classes.push("today");
      if(tasks.some(t=>t.date===key)) classes.push("has-tasks");
      return `<button class="${classes.join(" ")}" data-date="${key}" type="button" aria-pressed="${key===selectedDate}"><span class="day-name">${date.toLocaleDateString("en-US",{weekday:"short"}).toUpperCase()}</span><span class="day-number">${date.getDate()}</span><span class="date-dot"></span></button>`;
    }).join("");
    $$("#dateStrip [data-date]").forEach(button=>button.addEventListener("click",()=>{selectedDate=button.dataset.date;view="today";categoryFilter=null;syncNavigation();render();}));
  }
  function taskMatchesView(task) {
    if(categoryFilter && task.category!==categoryFilter) return false;
    if(view==="today") return task.date===selectedDate;
    if(view==="upcoming") return task.date>=dateKey(today);
    return true;
  }
  function getVisibleTasks() {
    return tasks.filter(taskMatchesView).filter(t=>taskFilter==="all" || (taskFilter==="active"&&!t.completed) || (taskFilter==="completed"&&t.completed)).sort((a,b)=>a.date.localeCompare(b.date)||(a.time||"").localeCompare(b.time||"")||a.title.localeCompare(b.title));
  }
  function renderTask(task) {
    const category=task.category.toLowerCase();
    return `<article class="task-row ${task.completed?"is-complete":""}" data-id="${escapeHTML(task.id)}">
      <button class="task-check" data-action="toggle" type="button" aria-label="${task.completed?"Mark incomplete":"Mark complete"}">${task.completed?"✓":""}</button>
      <div class="task-copy"><div class="task-name">${escapeHTML(task.title)}</div>${task.details?`<div class="task-details">${escapeHTML(task.details)}</div>`:""}
      <div class="task-meta"><span class="task-tag ${category}">${escapeHTML(task.category)}</span>${task.time?`<span class="task-time">${escapeHTML(formatTime(task.time))}</span>`:""}${task.priority==="high"?'<span class="priority-mark">✦ Important</span>':""}</div></div>
      <div class="task-actions"><button class="task-action" data-action="edit" type="button" aria-label="Edit task">↗</button><button class="task-action" data-action="delete" type="button" aria-label="Delete task">×</button></div>
    </article>`;
  }
  function formatTime(value) { const [h,m]=value.split(":").map(Number); return new Date(2000,0,1,h,m).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}); }
  function renderMissed() {
    const overdue=tasks.filter(t=>!t.completed&&t.date<dateKey(today)).sort((a,b)=>a.date.localeCompare(b.date));
    $("#missedCount").textContent=overdue.length;
    $("#missedSummary").textContent=overdue.length?`${overdue.length} ${overdue.length===1?"task needs":"tasks need"} a little attention`:"Nothing waiting here";
    $("#missedList").innerHTML=overdue.map(renderTask).join("");
    $("#missedList").hidden=!$("#missedToggle").getAttribute("aria-expanded").includes("true");
  }
  function renderProgress() {
    const total=tasks.length, done=tasks.filter(t=>t.completed).length, percent=total?Math.round(done/total*100):0;
    $("#progressPercent").textContent=`${percent}%`; $("#progressFraction").textContent=`${done} / ${total}`;
    $("#progressRing").style.background=`conic-gradient(#78998b ${percent*3.6}deg,#d8e4de 0deg)`;
    $("#progressBar").style.width=`${percent}%`;
    $("#tabAllCount").textContent=tasks.filter(taskMatchesView).length;
    $("#tabActiveCount").textContent=tasks.filter(t=>taskMatchesView(t)&&!t.completed).length;
    $("#tabDoneCount").textContent=tasks.filter(t=>taskMatchesView(t)&&t.completed).length;
  }
  function render() {
    updateHeader(); renderCalendar(); renderMissed();
    const visible=getVisibleTasks();
    $("#taskList").innerHTML=visible.map(renderTask).join("");
    $("#emptyState").classList.toggle("visible",visible.length===0);
    $("#taskList").style.display=visible.length?"grid":"none";
    $("#taskTitle").textContent=categoryFilter?`${categoryFilter} tasks`:view==="upcoming"?"Coming up":view==="all"?"All your tasks":"Today's focus";
    $("#taskEyebrow").textContent=view==="upcoming"?"LOOKING AHEAD":view==="all"?"YOUR WHOLE PICTURE":"YOUR DAY";
    $("#selectedDateLabel").textContent=view==="today"?pretty(fromKey(selectedDate),{weekday:"short",month:"short",day:"numeric"}).toUpperCase():view.toUpperCase();
    $$(".tab-button").forEach(b=>b.classList.toggle("selected",b.dataset.taskFilter===taskFilter));
    renderProgress(); bindTaskActions($("#taskList")); bindTaskActions($("#missedList"));
    $$(".nav-link[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
    $$(".filter-link").forEach(b=>b.classList.toggle("active",b.dataset.filter===categoryFilter));
  }
  function bindTaskActions(root) {
    $$("[data-action]",root).forEach(button=>button.addEventListener("click",()=>{
      const row=button.closest("[data-id]"), task=tasks.find(t=>t.id===row?.dataset.id); if(!task)return;
      const action=button.dataset.action;
      if(action==="toggle"){task.completed=!task.completed;persist();render();showToast(task.completed?"A small win. Task completed.":"Task moved back to your list.");}
      if(action==="delete"){tasks=tasks.filter(t=>t.id!==task.id);persist();render();showToast("Task removed.");}
      if(action==="edit") openModal(task);
    }));
  }
  function syncNavigation(){ $$(".nav-link[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===view)); }
  function openModal(task=null) {
    editingId=task?.id||null; $("#taskForm").reset(); $("#formError").textContent="";
    $("#modalTitle").textContent=task?"Edit task":"Add a task";
    $("#saveTask").innerHTML=task?"Save changes <span>→</span>":"Save task <span>→</span>";
    $("#taskName").value=task?.title||""; $("#taskDetails").value=task?.details||"";
    $("#taskDate").value=task?.date||selectedDate; $("#taskCategory").value=task?.category||"Personal";
    $("#taskPriority").value=task?.priority||"normal"; $("#taskTime").value=task?.time||"";
    $("#modalBackdrop").hidden=false; document.body.style.overflow="hidden"; $("#taskName").focus();
  }
  function closeModal() { $("#modalBackdrop").hidden=true;document.body.style.overflow="";editingId=null; }
  $("#openTaskModal").addEventListener("click",()=>openModal());
  $("#emptyAdd").addEventListener("click",()=>openModal());
  $("#closeModal").addEventListener("click",closeModal);$("#cancelModal").addEventListener("click",closeModal);
  $("#modalBackdrop").addEventListener("click",e=>{if(e.target===$("#modalBackdrop"))closeModal();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#modalBackdrop").hidden)closeModal();});
  $("#taskForm").addEventListener("submit",e=>{
    e.preventDefault(); const title=$("#taskName").value.trim();
    if(!title){$("#formError").textContent="Please give your task a name.";$("#taskName").focus();return;}
    const data={title,details:$("#taskDetails").value.trim(),date:$("#taskDate").value,category:$("#taskCategory").value,priority:$("#taskPriority").value,time:$("#taskTime").value};
    if(!data.date){$("#formError").textContent="Please choose a date.";return;}
    if(editingId){const existing=tasks.find(t=>t.id===editingId);if(existing)Object.assign(existing,data);showToast("Your task has been updated.");}
    else{tasks.push({id:uid(),...data,completed:false});showToast("Task added. One step at a time.");}
    selectedDate=data.date;visibleMonth=new Date(fromKey(data.date).getFullYear(),fromKey(data.date).getMonth(),1);view="today";categoryFilter=null;taskFilter="all";
    persist();closeModal();render();
  });
  $("#prevMonth").addEventListener("click",()=>{visibleMonth.setMonth(visibleMonth.getMonth()-1);const d=fromKey(selectedDate);d.setMonth(visibleMonth.getMonth());d.setFullYear(visibleMonth.getFullYear());selectedDate=dateKey(d);render();});
  $("#nextMonth").addEventListener("click",()=>{visibleMonth.setMonth(visibleMonth.getMonth()+1);const d=fromKey(selectedDate);d.setMonth(visibleMonth.getMonth());d.setFullYear(visibleMonth.getFullYear());selectedDate=dateKey(d);render();});
  $("#goToday").addEventListener("click",()=>{selectedDate=dateKey(today);visibleMonth=new Date(today.getFullYear(),today.getMonth(),1);view="today";categoryFilter=null;render();});
  $("#missedToggle").addEventListener("click",()=>{const expanded=$("#missedToggle").getAttribute("aria-expanded")==="true";$("#missedToggle").setAttribute("aria-expanded",String(!expanded));$("#missedList").hidden=expanded;});
  $$(".tab-button").forEach(button=>button.addEventListener("click",()=>{taskFilter=button.dataset.taskFilter;render();}));
  $$(".nav-link[data-view]").forEach(button=>button.addEventListener("click",()=>{view=button.dataset.view;categoryFilter=null;taskFilter="all";if(view==="today")selectedDate=dateKey(today);render();}));
  $$(".filter-link").forEach(button=>button.addEventListener("click",()=>{categoryFilter=categoryFilter===button.dataset.filter?null:button.dataset.filter;view="all";taskFilter="all";render();}));
  $("#taskDate").value=dateKey(today);
  render();
})();