/* SETTINGS: fill these in before hosting. */
var CONFIG={
  email:"",            /* shown on the contact page */
  privacyEmail:"",     /* where people send privacy requests and complaints; falls back to email */
  phone:"",            /* shown on the contact page */
  city:"Pune, India",
  formEndpoint:""      /* a form-collection URL (for example from Formspree) that receives enquiries */
};
/* REVIEWS: replace with real, permissioned feedback and set demo to false. */
var REVIEWS=[
  {demo:true,quote:"The diagnostic gave us a plan our finance team could read and a quote we could say yes or no to.",name:"Client name",role:"Designation, Company"},
  {demo:true,quote:"They told us plainly what an approved auditor had to sign, and prepared everything else.",name:"Client name",role:"Designation, Company"},
  {demo:true,quote:"One named owner, a weekly note and no surprises on delivery.",name:"Client name",role:"Designation, Company"},
  {demo:true,quote:"The assistant went live with a test set behind it, so we knew how often it was right before customers saw it.",name:"Client name",role:"Designation, Company"}
];
/* TOOLS: list only what the team actually uses. */
var TOOLS=[
  ["Python","Data and AI"],["SQL","Data and AI"],["Apache Spark","Data and AI"],["Databricks","Data and AI"],["dbt","Data and AI"],["Apache Airflow","Data and AI"],["PostgreSQL","Data and AI"],["Large language model APIs","Data and AI"],["Vector search","Data and AI"],
  ["Amazon Web Services","Cloud and DevOps"],["Microsoft Azure","Cloud and DevOps"],["Google Cloud","Cloud and DevOps"],["Docker","Cloud and DevOps"],["Kubernetes","Cloud and DevOps"],["Terraform","Cloud and DevOps"],["GitHub Actions","Cloud and DevOps"],
  ["FastAPI","Apps"],["Node.js","Apps"],["React","Apps"],["Supabase","Apps"],
  ["n8n","Automation"],["Power Automate","Automation"],["Make","Automation"],["Zapier","Automation"],
  ["Power BI","Analytics"],["Metabase","Analytics"],["Looker Studio","Analytics"],
  ["Wazuh","Security"],["OWASP ZAP","Security"],["Nmap","Security"],["Burp Suite","Security"]
];
var LEVELS=[
  {h:"Rules only",p:"The steps never change, so plain automation is cheaper and more reliable than AI.",e:"Payment reminders go out on day 30, 40 and 45. Finance gets an alert when an invoice passes 45 days."},
  {h:"Rules with AI reading",p:"AI reads documents that arrive in many formats. Fixed rules decide what happens next.",e:"AI pulls the fields from purchase orders in any layout. Rules check them against the ERP and flag mismatches."},
  {h:"AI drafts, a person approves",p:"AI prepares the work. A person approves it before anything leaves the building.",e:"An assistant drafts replies to customer questions. Staff approve refunds, complaints and anything unusual."},
  {h:"Agent with guardrails",p:"An agent takes several steps on its own, inside set limits. Every action is logged and reviewed.",e:"An agent sorts security alerts, opens tickets for known issues and passes anything new to an analyst."}
];
var DEADLINES=[
  {d:"2026-01-01",h:"EU carbon border rules"},{d:"2026-04-10",h:"Co-operative bank cyber rules"},
  {d:"2026-11-13",h:"Consent Managers begin"},{d:"2027-05-13",h:"Full data-protection compliance"}
];

(function(){
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var root=document.documentElement, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var today=new Date(); today.setHours(0,0,0,0);
  var days=function(iso){return Math.round((new Date(iso+'T00:00:00')-today)/864e5)};
  if(!reduce&&'IntersectionObserver' in window)root.classList.add('anim');
  $$('.yr').forEach(function(e){e.textContent=today.getFullYear()});

  /* page curtain: finish the arrival, and run it on the way out */
  try{sessionStorage.removeItem('gbT')}catch(e){}
  if(root.classList.contains('arriving')){requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.remove('pre')})});setTimeout(function(){root.classList.remove('arriving')},900)}
  if(!reduce){
    document.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('a[href]');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||a.target)return;
      var href=a.getAttribute('href');if(!/^[\w\-./]+\.html(\?[^#]*)?(#.*)?$/.test(href))return;
      e.preventDefault();try{sessionStorage.setItem('gbT','1')}catch(x){}root.classList.remove('arriving','pre');root.classList.add('leaving');setTimeout(function(){location.href=href},470);
    });
    addEventListener('pageshow',function(ev){if(ev.persisted)root.classList.remove('leaving','arriving','pre')});
  }

  /* nav: hide on the way down, show on the way up */
  var nav=$('#nav'),burger=$('#burger'),menu=$('#menu'),lastY=0;
  if(burger)burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu')});
  addEventListener('scroll',function(){var y=scrollY;if(nav&&!menu.classList.contains('open'))nav.classList.toggle('hide',y>lastY&&y>400);lastY=y},{passive:true});

  /* split headings into words that rise from a mask */
  $$('[data-words]').forEach(function(h){
    var i=0,walk=function(node){Array.prototype.slice.call(node.childNodes).forEach(function(n){
      if(n.nodeType===3){var frag=document.createDocumentFragment();n.nodeValue.split(/(\s+)/).forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){frag.appendChild(document.createTextNode(' '));return}
        var w=document.createElement('span');w.className='w';var s=document.createElement('span');s.style.setProperty('--i',i++);s.textContent=p;w.appendChild(s);frag.appendChild(w)});node.replaceChild(frag,n)}
      else if(n.nodeType===1)walk(n)})};
    h.setAttribute('aria-label',h.textContent.trim());walk(h);
  });

  /* reveal, counters */
  function countUp(el){if(el.__c)return;el.__c=1;var to=+el.getAttribute('data-count');if(reduce){el.textContent=to;return}var t0=null;
    (function st(ts){if(!ts){requestAnimationFrame(st);return}if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/1500),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(st)})()}
  var io=root.classList.contains('anim')?new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;t.classList.add('in');io.unobserve(t);$$('[data-count]',t).forEach(countUp);if(t.hasAttribute('data-count'))countUp(t)})},{threshold:.15,rootMargin:'0px 0px -6% 0px'}):null;
  function watch(scope){
    if(!io){$$('[data-count]',scope).forEach(countUp);return}
    $$('[data-words],.bar,.tl,.hl',scope).forEach(function(el){io.observe(el)});
    $$('.eye,.lede,.cta,.row,.scard,.dcard,.q,.cpanel,.case,.check li,.sstep,.tr2,.slider,.filters,.side,.info,form,.faq details,.fine,.src,.stage-info > *',scope).forEach(function(el){if(el.classList.contains('rv')||el.closest('.nav'))return;el.classList.add('rv');var i=Array.prototype.indexOf.call(el.parentNode.children,el);el.style.setProperty('--d',Math.min(i,7)*80+'ms');io.observe(el)});
  }

  /* cursor dot + magnetic buttons */
  if(matchMedia('(hover:hover)').matches&&!reduce){
    var cur=document.createElement('div');cur.className='cur';cur.setAttribute('aria-hidden','true');document.body.appendChild(cur);
    addEventListener('pointermove',function(e){cur.style.setProperty('--x',e.clientX+'px');cur.style.setProperty('--y',e.clientY+'px');cur.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,summary,input[type=range],.rail')))},{passive:true});
    $$('.btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.3).toFixed(1)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})});
  }

  /* tickers */
  $$('.tick .tr').forEach(function(tr){var html=tr.innerHTML;tr.innerHTML=html+html.replace(/<span/g,'<span aria-hidden="true"')});

  /* deadlines */
  $$('[data-date]').forEach(function(el){var st=$('.st',el);if(!st)return;var n=days(el.getAttribute('data-date'));if(n>=0){st.textContent=n===0?'Today':n+' days to go';st.classList.add('up')}else st.textContent='In force'});
  var tl=$('#tl');
  if(tl){var a=new Date('2025-11-15T00:00:00'),b=new Date('2027-07-01T00:00:00'),pos=function(d){return Math.max(0,Math.min(100,(d-a)/(b-a)*100))};
    $$('.pt',tl).forEach(function(p){var d=new Date(p.getAttribute('data-d')+'T00:00:00');p.style.left=pos(d)+'%';if(d>=today)p.classList.add('fut')});tl.style.setProperty('--now',pos(today)+'%')}
  var nx=$('#nx-n');
  if(nx){var up=DEADLINES.filter(function(x){return days(x.d)>=0})[0];
    if(up){nx.textContent=days(up.d);nx.setAttribute('data-count',days(up.d));$('#nx-h').textContent=up.h;$('#nx-u').textContent=days(up.d)===0?'DUE TODAY':'DAYS TO THE NEXT COMPLIANCE DATE'}
    else{nx.textContent='0';$('#nx-h').textContent='All listed dates are in force'}}

  /* AI level slider */
  var lv=$('#lv');
  if(lv){var marks=$$('#marks button'),setLv=function(i){lv.value=i;lv.style.setProperty('--p',(i/3*100)+'%');var L=LEVELS[i];$('#lv-h').textContent=L.h;$('#lv-p').textContent=L.p;$('#lv-e').textContent=L.e;lv.setAttribute('aria-valuetext',L.h);
      marks.forEach(function(m,j){m.setAttribute('aria-pressed',i===j)});['lv-a','lv-b'].forEach(function(id){var el=$('#'+id);el.classList.remove('swap');void el.offsetWidth;el.classList.add('swap')})};
    lv.addEventListener('input',function(){setLv(+lv.value)});marks.forEach(function(m,j){m.addEventListener('click',function(){setLv(j)})});setLv(0)}

  /* tool chips */
  var tw=$('#tools');
  if(tw){var drawT=function(f){tw.innerHTML='';var i=0;TOOLS.forEach(function(t){if(f!=='all'&&t[1]!==f)return;var d=document.createElement('span');d.className='tool';d.style.animationDelay=(i++*18)+'ms';d.textContent=t[0];tw.appendChild(d)})};
    drawT('all');$$('#filters .fb').forEach(function(b){b.addEventListener('click',function(){$$('#filters .fb').forEach(function(x){x.setAttribute('aria-pressed',x===b)});drawT(b.getAttribute('data-f'))})})}

  /* reviews rail (drag to scroll) */
  var rv=$('#revs');
  if(rv){var anyDemo=false;REVIEWS.forEach(function(r){if(r.demo)anyDemo=true;var q=document.createElement('figure');q.className='q';
      if(r.demo){var bd=document.createElement('span');bd.className='demo';bd.textContent='DEMO CONTENT';bd.style.alignSelf='flex-start';q.appendChild(bd)}
      var bq=document.createElement('blockquote');bq.textContent='“'+r.quote+'”';q.appendChild(bq);
      var fc=document.createElement('figcaption'),av=document.createElement('div');av.className='av';av.textContent=(r.name||'?').split(' ').map(function(w){return w[0]}).join('').slice(0,2).toUpperCase();
      var t=document.createElement('div'),nm=document.createElement('b');nm.textContent=r.name;var rl=document.createElement('small');rl.textContent=r.role;t.appendChild(nm);t.appendChild(rl);fc.appendChild(av);fc.appendChild(t);q.appendChild(fc);rv.appendChild(q)});
    if(anyDemo)$$('.demo-flag,.demo-note').forEach(function(e){e.hidden=false});
    var down=false,sx0=0,sl=0;rv.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;sx0=e.clientX;sl=rv.scrollLeft;rv.classList.add('drag')});
    addEventListener('pointermove',function(e){if(down)rv.scrollLeft=sl-(e.clientX-sx0)});addEventListener('pointerup',function(){down=false;rv.classList.remove('drag')})}

  /* contact */
  var cl=$('#cl');
  if(cl){var sel=function(el){try{var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r)}catch(e){}};
    var line=function(label,val,copy){if(!val)return;var li=document.createElement('li'),s=document.createElement('small');s.textContent=label;var v=document.createElement('span');v.textContent=val;li.appendChild(s);li.appendChild(v);
      if(copy){var b=document.createElement('button');b.type='button';b.className='cbtn';b.textContent='Copy';b.addEventListener('click',function(){var ok=function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy'},1600)};try{navigator.clipboard.writeText(val).then(ok,function(){sel(v)})}catch(e){sel(v)}});li.appendChild(b)}cl.appendChild(li)};
    line('EMAIL',CONFIG.email,true);line('PHONE',CONFIG.phone,true);line('OFFICE',CONFIG.city,false);line('COORDINATES','18.52° N, 73.86° E',false);line('REPLY TIME','Within two working days',false)}
  var form=$('#form');
  if(form){var status=$('#status'),fi=$('#f-int');
    try{var m=/[?&]svc=([a-z]+)/.exec(location.search);if(m&&fi.querySelector('option[value="'+m[1]+'"]'))fi.value=m[1]}catch(e){}
    var err=function(id,msg){$('#'+id).textContent=msg||''};
    form.addEventListener('submit',function(e){e.preventDefault();
      var f=new FormData(form),ok=true,name=(f.get('name')||'').trim(),mail=(f.get('email')||'').trim(),msg=(f.get('message')||'').trim();
      err('e-name',name?'':'Enter your name.');if(!name)ok=false;
      var good=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);err('e-mail',good?'':'Enter a valid work email, like name@company.com.');if(!good)ok=false;
      err('e-msg',msg?'':'Describe the problem in a sentence or two.');if(!msg)ok=false;
      var agreed=$('#f-ok').checked;err('e-ok',agreed?'':'Tick the box to let us use these details to reply.');if(!agreed)ok=false;
      f.set('consent','yes');f.set('consent_time',new Date().toISOString());f.set('consent_text',$('label[for="f-ok"]').textContent.trim());
      if(!ok){status.textContent='';return}
      var text='Name: '+name+'\nCompany: '+(f.get('company')||'')+'\nEmail: '+mail+'\nPhone: '+(f.get('phone')||'')+'\nInterest: '+fi.options[fi.selectedIndex].text+'\n\n'+msg;
      if(CONFIG.formEndpoint){status.textContent='Sending...';
        fetch(CONFIG.formEndpoint,{method:'POST',body:f,headers:{'Accept':'application/json'}}).then(function(r){if(!r.ok)throw 0;status.innerHTML='';var p=document.createElement('p');p.className='ok';p.textContent='Enquiry sent. We reply within two working days.';status.appendChild(p);form.reset()}).catch(function(){status.textContent='The enquiry did not send. Check your connection and try again.'});return}
      status.innerHTML='';var p=document.createElement('p');p.textContent=CONFIG.email?'Copy this message and email it to '+CONFIG.email+'.':'Preview mode: this form is not connected yet. Add a form address in main.js to receive enquiries.';
      var ta=document.createElement('textarea');ta.readOnly=true;ta.value=text;ta.setAttribute('aria-label','Your enquiry text');status.appendChild(p);status.appendChild(ta)})}

  /* privacy contact on the notice page */
  var pe=CONFIG.privacyEmail||CONFIG.email;$$('.cfg-pmail').forEach(function(e){e.textContent=pe||'[privacy contact email to be added]'});

  watch(document);

  /* stars inside the dark stage */
  var sc=$('#stars'),sx=sc&&sc.getContext&&sc.getContext('2d');
  if(sx){var stars=[],SW=0,SH=0,sd=Math.min(2,devicePixelRatio||1);
    var sInit=function(){SW=sc.clientWidth;SH=sc.clientHeight;sc.width=SW*sd;sc.height=SH*sd;sx.setTransform(sd,0,0,sd,0,0);stars=[];for(var i=0;i<150;i++)stars.push({x:Math.random()*SW,y:Math.random()*SH,r:Math.random()*1.1+.3,p:Math.random()*6.28})};
    var sDraw=function(tt){sx.clearRect(0,0,SW,SH);stars.forEach(function(s){var a=.2+.6*(.5+.5*Math.sin(tt*.0016+s.p));sx.fillStyle='rgba(240,250,244,'+a.toFixed(2)+')';sx.beginPath();sx.arc(s.x,s.y,s.r,0,7);sx.fill()})};
    sInit();sDraw(0);addEventListener('resize',function(){sInit();sDraw(0)});
    if(!reduce)setInterval(function(){if(!document.hidden)sDraw(performance.now())},90);
  }

  /* globe: the Earth with real continents, lit from the upper left, centred on Pune; drag to spin */
  var cv=$('#globe'),ctx=cv&&cv.getContext&&cv.getContext('2d');
  if(ctx){
    var LAND="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAfAP8HAAAAAAAAAAAAAAAAAAAAAADo//z//wcAAAAAAAACAAAAAAAAAAAAhvvw//8PAPABAAAAwAMAAAAAAAAAwADkw////wEABAAAAABgAAAAAAAAAADAUT8A/v8PAAAAAAwA/j8AuAEAAAAAcBHtDcD/fwAAAAAwAPz/fwMAABCAAQD5w/wD8P8FAAAcAIL7//9//xOAAP/ff0668QD/HwAA+A8At///////v3/w/////x8++B8AAOD/1//7////////jP////+/+AE/gAcAn9f//////////w/w/////wEs4AEAAHz+////////////gL////8HeAAcAADg5///////////9ADgAf7/f4AnAAAAAH78////////H0QAAAiA//8f8AcAAIBB4////////38ADwAQAOD//5//AQAAHAT/////////A3AAAAAA/v//+T8AAGDz//////////8DAQAAAMD/////AwAAsP//////////LwAAAAAA6P///2IAAAD+//////////8CAAAAAAD///8/CAAA4P//////////JwAAAAAA8P///wYAAAD+/unz/////z8AAAAAAAD///8HAAAA/pgPPP//////MQAAAAAA8P//PwAAAMBD9v7n/////wcBAAAAAAD///8AAAAAPkD7f/7///8hEAAAAAAA4P//DwAAAIDhAv/n////f8YAAAAAAAD8//8AAAAA+AdE//////8jDwAAAAAAgP//AwAAAMD/APD/////PxgAAAAAAADw/x8AAAAA/n/v//////8HAAAAAAAAAPwDAgAAAOD////7////fwAAAAAAAACgHyAAAACA//9/f/7///8DAAAAAAAAAPQBAAAAAPj//+cv+P//PwAAAAAAAAAAHjAAAADA/////g/+//8EAAAAAAAAAOBhCAAAAP7//99/4D//AAAAAAAAAAAAPAMEAADA////+Qf84BcAAAAAAAAAAAA/AAAAAPz//58fgAf+QAAAAAAAAAAAAA8AAADg////ewA4gA8EAAAAAAAAAADAAAAAAPz//38BgAP4QQAAAAAAAAAAAAgPAADA////zwAwgAwQAAAAAAAAAAAA9Q8AAPj///8HAAVIAAAAAAAAAAAAAID/AQAA////fwBAAAAQAAAAAAAAAAAA+P8AAGDh//8DAAA0GAAAAAAAAAAAAID/HwAAAPj/HwAAgMIBAAAAAAAAAAAA/P8BAACA//8AAAAYXgAAAAAAAAAAAMD/fwAAAPz/BwAAAOOBAQAAAAAAAAAA/P8/AACA/z8AAABgbtQBAAAAAAAAAOD//w8AAPD/AwAAAAQIeAAAAAAAAAAA/P//AQAA/z8AAACAA4APAQAAAAAAAID//w8AAPD/AwAAAAARsEAAAAAAAAAA+P9/AAAA/j8AAAAAAAAAAAAAAAAAAAD//wcAAPD/QwAAAACAIwAAAAAAAAAA8P9/AAAA/z8EAAAAAD8GIAAAAAAAAAD8/wMAAPD/cQAAAAD4ZwAAAAAAAAAAgP8/AAAA/w8HAAAAgP8HAAAAAAAAAAD4/wMAAOD/MAAAAAD//wEBAAAAAAAAgP8PAAAA/g8DAAAA+P8fAAAAAAAAAAD4PwAAAOB/EAAAAID//wMAAAAAAAAAgP8DAAAA/AMAAAAA+P9/AAAAAAAAAAD8HwAAAMA/AAAAAID//wcAAAAAAAAAwP8BAAAA+AEAAAAA8P9/AAAAAAAAAAD8DwAAAIAPAAAAAAAP/gMAAAAAAAAAwB8AAAAAAAAAAAAAEIAfAAEAAAAAAAD+AwAAAAAAAAAAAAAA8AEgAAAAAAAA4AcAAAAAAAAAAAAAAAAAAAYAAAAAAABeAAAAAAAAAAAAAAAAwAAwAAAAAAAAwAMAAAAAAAAAAAAAAAAIgAEAAAAAAAAeAAAAAAAAAAAAAAAAAAAMAAAAAAAA4AEAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAABAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAB4AEDwn/8HAAAAAAAAAAAwAAAAAACA/P/h/////w8AAAAAAAAAwAcAAAD4////z///////PwAAAAAAHALwAACA//////////////8HAADw/y///wMAAP7/////////////HwAA+P///38AAID///////////////8AAPL/////BwAO////////////////DwAA8P////8HEPD//////////////z8AAOD/////////////////////////H/AfwP//////////////////////////////////////////////////////////////////////////////////////";
    var S=0,dpr=Math.min(innerWidth<780?1.5:2,devicePixelRatio||1),t=2,run=true,mxr=0,myr=0,tmx=0,tmy=0,ua=0,uv=0,drag=false,lx=0;
    var R=function(d){return d*Math.PI/180};
    var vec=function(lat,lon){var a=R(lat),b=R(lon);return [Math.cos(a)*Math.sin(b),Math.sin(a),Math.cos(a)*Math.cos(b)]};
    var bits=atob(LAND),MW=180,MH=90;
    var isLand=function(lat,lon){var x=Math.floor(((lon+180)%360+360)%360/2)%MW,y=Math.min(MH-1,Math.max(0,Math.floor((90-lat)/2))),i=y*MW+x;return (bits.charCodeAt(i>>3)>>(i&7))&1};
    var landPts=[],seaPts=[],N=innerWidth<780?9000:17000;
    for(var i=0;i<N;i++){var y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),th=i*2.399963,v=[Math.cos(th)*r,y,Math.sin(th)*r];
      if(isLand(Math.asin(y)*180/Math.PI,Math.atan2(v[0],v[2])*180/Math.PI))landPts.push(v);else if(i%8===0)seaPts.push(v)}
    var PUNE=vec(18.52,73.86),CITIES=[[51.5,-0.1],[40.7,-74],[25.2,55.3],[1.35,103.8],[50.1,8.7],[-33.9,151.2],[35.7,139.7]].map(function(c){return vec(c[0],c[1])});
    var rot=function(v,ay,ax){var x=v[0]*Math.cos(ay)-v[2]*Math.sin(ay),z=v[0]*Math.sin(ay)+v[2]*Math.cos(ay),y=v[1];return [x,y*Math.cos(ax)-z*Math.sin(ax),y*Math.sin(ax)+z*Math.cos(ax)]};
    var slerp=function(a,b,u){var d=Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2])),o=Math.acos(d),s=Math.sin(o)||1,k1=Math.sin((1-u)*o)/s,k2=Math.sin(u*o)/s;return [a[0]*k1+b[0]*k2,a[1]*k1+b[1]*k2,a[2]*k1+b[2]*k2]};
    var size=function(){S=cv.clientWidth;cv.width=S*dpr;cv.height=S*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
    var LX=-.45,LY=.55,LZ=.7;
    var draw=function(){
      ctx.clearRect(0,0,S,S);mxr+=(tmx-mxr)*.05;myr+=(tmy-myr)*.05;if(!drag){ua+=uv;uv*=.94}
      var ay=R(73.86)+Math.sin(t*.16)*.45+mxr*.5+ua,ax=R(8)+myr*.3,c=S/2,rad=S*.36,g,i,q;
      var P=function(v,k){var q=rot(v,ay,ax);k=k||1;return [c+q[0]*rad*k,c-q[1]*rad*k,q[2]]};
      var seen=function(q){return q[2]>0||Math.hypot(q[0]-c,q[1]-c)>rad*1.01};
      /* atmosphere */
      g=ctx.createRadialGradient(c,c,rad*.92,c,c,rad*1.36);g.addColorStop(0,'rgba(16,185,129,0)');g.addColorStop(.16,'rgba(16,185,129,.42)');g.addColorStop(.42,'rgba(163,230,53,.10)');g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(c,c,rad*1.36,0,7);ctx.fill();
      /* ocean */
      g=ctx.createRadialGradient(c-rad*.4,c-rad*.45,rad*.08,c,c,rad);g.addColorStop(0,'#17483A');g.addColorStop(.55,'#0A231C');g.addColorStop(1,'#040E0B');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(c,c,rad,0,7);ctx.fill();
      for(i=0;i<seaPts.length;i++){q=rot(seaPts[i],ay,ax);if(q[2]<=0)continue;ctx.fillStyle='rgba(120,170,145,'+(.08+.14*q[2]).toFixed(2)+')';ctx.fillRect(c+q[0]*rad,c-q[1]*rad,1,1)}
      /* continents */
      for(i=0;i<landPts.length;i++){q=rot(landPts[i],ay,ax);if(q[2]<=0)continue;var lit=Math.max(0,q[0]*LX+q[1]*LY+q[2]*LZ),a=(.42+.58*lit).toFixed(2),s=1.3+q[2]*1.2;
        ctx.fillStyle=lit>.78?'rgba(253,240,170,'+a+')':'rgba(170,235,120,'+a+')';ctx.fillRect(c+q[0]*rad-s/2,c-q[1]*rad-s/2,s,s)}
      /* night side */
      g=ctx.createRadialGradient(c-rad*.45,c-rad*.5,rad*.75,c,c,rad*1.02);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(2,7,5,.6)');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(c,c,rad,0,7);ctx.fill();
      /* rim light */
      g=ctx.createLinearGradient(c-rad,c-rad,c+rad*.4,c+rad*.4);g.addColorStop(0,'rgba(253,230,138,.95)');g.addColorStop(.5,'rgba(163,230,53,.35)');g.addColorStop(1,'rgba(16,185,129,0)');
      ctx.strokeStyle=g;ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(c,c,rad,0,7);ctx.stroke();
      /* orbit ring and satellite */
      var orb=function(s){var v=[Math.cos(s),Math.sin(s)*.42,Math.sin(s)*.9];return [c+v[0]*rad*1.3,c-v[1]*rad*1.3,v[2]]};
      for(i=0;i<140;i++){q=orb(i/140*6.283);if(!seen(q))continue;ctx.fillStyle='rgba(160,220,190,'+(q[2]>0?.34:.14)+')';ctx.fillRect(q[0],q[1],1.2,1.2)}
      for(i=14;i>=0;i--){q=orb(t*.45-i*.035);if(!seen(q))continue;ctx.fillStyle='rgba(253,230,138,'+((1-i/15)*.95).toFixed(2)+')';ctx.beginPath();ctx.arc(q[0],q[1],i?1.4:3.4,0,7);if(!i){ctx.shadowColor='#FDE68A';ctx.shadowBlur=16}ctx.fill();ctx.shadowBlur=0}
      /* arcs from Pune */
      CITIES.forEach(function(ct,ci){
        ctx.beginPath();var first=true,vis=false;
        for(var u=0;u<=1.001;u+=.025){var q=P(slerp(PUNE,ct,u),1+.3*Math.sin(Math.PI*u));if(!seen(q)){first=true;continue}vis=true;first?ctx.moveTo(q[0],q[1]):ctx.lineTo(q[0],q[1]);first=false}
        if(!vis)return;var gg=ctx.createLinearGradient(0,0,S,S);gg.addColorStop(0,'rgba(253,230,138,.85)');gg.addColorStop(1,'rgba(16,185,129,.85)');ctx.strokeStyle=gg;ctx.lineWidth=1.4;ctx.stroke();
        var u2=((t*.22+ci*.17)%1),qq=P(slerp(PUNE,ct,u2),1+.3*Math.sin(Math.PI*u2));if(seen(qq)){ctx.fillStyle='#fff';ctx.shadowColor='#A3E635';ctx.shadowBlur=14;ctx.beginPath();ctx.arc(qq[0],qq[1],2.6,0,7);ctx.fill();ctx.shadowBlur=0}
        var e=P(ct);if(e[2]>0){ctx.fillStyle='#fff';ctx.shadowColor='#10B981';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(e[0],e[1],2.8,0,7);ctx.fill();ctx.shadowBlur=0}
      });
      var h=P(PUNE);if(h[2]>0){var pr=(t*.7%1);ctx.strokeStyle='rgba(253,230,138,'+(1-pr).toFixed(2)+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(h[0],h[1],6+pr*28,0,7);ctx.stroke();
        ctx.fillStyle='#FDE68A';ctx.shadowColor='#FDE68A';ctx.shadowBlur=22;ctx.beginPath();ctx.arc(h[0],h[1],5.5,0,7);ctx.fill();ctx.shadowBlur=0;
        ctx.font='600 12px JetBrains Mono, monospace';ctx.fillStyle='#F0FAF4';ctx.fillText('PUNE',h[0]+14,h[1]+4)}
    };
    var loop=function(){if(run){t+=.016;draw()}requestAnimationFrame(loop)};
    size();draw();addEventListener('resize',function(){size();draw()});
    addEventListener('pointermove',function(e){tmx=e.clientX/innerWidth-.5;tmy=e.clientY/innerHeight-.5;if(drag){uv=(e.clientX-lx)*.006;ua+=uv;lx=e.clientX;if(reduce)draw()}},{passive:true});
    cv.style.touchAction='pan-y';cv.style.cursor='grab';
    cv.addEventListener('pointerdown',function(e){drag=true;lx=e.clientX;uv=0;cv.style.cursor='grabbing';try{cv.setPointerCapture(e.pointerId)}catch(x){}});
    var up=function(){drag=false;cv.style.cursor='grab'};addEventListener('pointerup',up);addEventListener('pointercancel',up);
    if(!reduce){if('IntersectionObserver' in window)new IntersectionObserver(function(es){run=es[0].isIntersecting}).observe(cv);requestAnimationFrame(loop)}
  }
})();
