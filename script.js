const $ = id => document.getElementById(id);
const gate = $("gate"), world = $("world");
function enterWorld(name) {
  gate.classList.add("leaving");
  setTimeout(() => {
    gate.classList.add("hidden");
    world.classList.remove("hidden");
    if (name && name.trim()) $("hello").innerHTML = '<span class="live-dot"></span> WELCOME, ' + escapeHtml(name.trim().toUpperCase()) + ' · BCA FINAL-YEAR STUDENT';
    window.scrollTo({top:0,behavior:"instant"});
    initUniverse();
  }, 260);
}
function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
$("entryForm").addEventListener("submit", e => { e.preventDefault(); enterWorld($("visitor").value); });
$("guest").addEventListener("click", () => enterWorld(""));
$("year").textContent = new Date().getFullYear();

const projectData = {
 gitlyze:{kicker:"01 / DEVELOPER TOOL",title:"Gitlyze",description:"A full-stack GitHub repository analyzer that fetches public repository trees, runs lint checks, calculates code-quality scores, groups issues, and shows source-backed explanations.",tags:["Next.js","React","TypeScript","Supabase","ESLint","Exa API"]},
 pulmora:{kicker:"02 / EXPLAINABLE AI",title:"Pulmora AI",description:"An educational chest X-ray classifier for Normal vs Pneumonia with a live inference API, upload/results UI, model metrics view, and Grad-CAM heatmap explanations.",tags:["Next.js","FastAPI","PyTorch","Grad-CAM","Render","Vercel"]},
 copilot:{kicker:"03 / RESEARCH AGENT",title:"AI Roadmap & Project Research Copilot",description:"A research agent that searches current web sources, indexes evidence in a vector store, and generates citation-backed roadmaps, project ideas, and learning plans.",tags:["Python","Streamlit","ChromaDB","Exa API","Google API"]},
 jachacks:{kicker:"04 / HACKATHON BUILD",title:"JacHacks Agentic Simulation Project",description:"A demo-focused agentic world simulator with rule-based actions, event memory, visual storytelling, and LLM use only for key dialogue and strategy moments.",tags:["Jac","Python","Local-first AI simulation","Hackathon build"]}
};
document.querySelectorAll("[data-project]").forEach(btn => btn.addEventListener("click", () => {
 const p=projectData[btn.dataset.project]; if(!p)return;
 $("detailKicker").textContent=p.kicker;$("detailTitle").textContent=p.title;$("detailDescription").textContent=p.description;
 $("detailTags").replaceChildren(...p.tags.map(t=>{const s=document.createElement("span");s.textContent=t;return s;}));
 const panel=$("projectDetail");panel.classList.remove("hidden");panel.scrollIntoView({behavior:"smooth",block:"center"});
}));
$("detailClose").addEventListener("click", () => $("projectDetail").classList.add("hidden"));

const resumeModal=$("resumeModal");
$("resumeBtn").addEventListener("click",()=>{resumeModal.classList.remove("hidden");});
$("resumeClose").addEventListener("click",()=>resumeModal.classList.add("hidden"));
document.querySelector('[data-dismiss="resume"]').addEventListener("click",()=>resumeModal.classList.add("hidden"));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){resumeModal.classList.add("hidden");$("projectDetail").classList.add("hidden");}});

$("contactForm").addEventListener("submit",e=>{
 e.preventDefault();
 const name=$("contactName").value.trim(), email=$("contactEmail").value.trim(), message=$("contactMessage").value.trim();
 const subject=encodeURIComponent("Portfolio contact from "+name);
 const body=encodeURIComponent("Hi Snehashish,\n\n"+message+"\n\nFrom: "+name+"\nEmail: "+email);
 window.location.href="mailto:gangulysnehashish047@gmail.com?subject="+subject+"&body="+body;
});

// Three.js particle environment. If the CDN is unavailable, the rest of the site still works.
let renderer, scene, camera, points, rings=[], rafId, pointerX=0, pointerY=0;
function initUniverse(){
 const canvas=$("universe"); if(!canvas || canvas.dataset.ready==="yes")return;
 canvas.dataset.ready="yes";
 if(!window.THREE){drawCanvasFallback(canvas);return;}
 try {
  scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(60,1,.1,100);camera.position.z=7;
  renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  const count=1700, pos=new Float32Array(count*3), colors=new Float32Array(count*3);
  for(let i=0;i<count;i++){
    const radius=2.3+Math.random()*7, angle=Math.random()*Math.PI*2;
    pos[i*3]=Math.cos(angle)*radius*(.7+Math.random()*.5);
    pos[i*3+1]=(Math.random()-.5)*8;
    pos[i*3+2]=(Math.random()-.5)*8;
    const t=Math.random();colors[i*3]=.35+t*.35;colors[i*3+1]=.65+t*.28;colors[i*3+2]=.9+t*.1;
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.BufferAttribute(pos,3));geo.setAttribute("color",new THREE.BufferAttribute(colors,3));
  const mat=new THREE.PointsMaterial({size:.018,vertexColors:true,transparent:true,opacity:.82,depthWrite:false,blending:THREE.AdditiveBlending});
  points=new THREE.Points(geo,mat);scene.add(points);
  const group=new THREE.Group();scene.add(group);
  for(let i=0;i<4;i++){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.15+i*.48,.004,8,180),new THREE.MeshBasicMaterial({color:i%2?0xb8a0ff:0x86eaff,transparent:true,opacity:.48-i*.07}));
    ring.rotation.x=0.8+i*.27;ring.rotation.y=i*.6;group.add(ring);rings.push(ring);
  }
  const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(.82,2),new THREE.MeshBasicMaterial({color:0x9ceaff,wireframe:true,transparent:true,opacity:.55}));group.add(orb);
  const orb2=new THREE.Mesh(new THREE.IcosahedronGeometry(.58,1),new THREE.MeshBasicMaterial({color:0x9c86ff,wireframe:true,transparent:true,opacity:.22}));group.add(orb2);
  group.position.set(2.25,.05,-.5);group.userData.orb=orb;group.userData.orb2=orb2;scene.userData.group=group;
  const resize=()=>{const w=canvas.clientWidth||innerWidth,h=canvas.clientHeight||600;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
  resize();window.addEventListener("resize",resize);
  canvas.addEventListener("pointermove",e=>{const r=canvas.getBoundingClientRect();pointerX=((e.clientX-r.left)/r.width-.5)*2;pointerY=((e.clientY-r.top)/r.height-.5)*2;});
  const clock=new THREE.Clock();
  function animate(){
    rafId=requestAnimationFrame(animate);const t=clock.getElapsedTime();
    points.rotation.y=t*.012;points.rotation.x=Math.sin(t*.1)*.025;
    group.rotation.y=t*.14+pointerX*.12;group.rotation.x=Math.sin(t*.3)*.09+pointerY*.08;
    group.userData.orb.rotation.x=t*.12;group.userData.orb.rotation.y=t*.18;
    group.userData.orb2.rotation.x=-t*.16;group.userData.orb2.rotation.z=t*.1;
    rings.forEach((r,i)=>{r.rotation.z=t*(i%2?.05:-.04);});
    camera.position.x+=(pointerX*.22-camera.position.x)*.025;camera.position.y+=(-pointerY*.16-camera.position.y)*.025;camera.lookAt(0,0,0);
    renderer.render(scene,camera);
  }
  animate();
 }catch(err){drawCanvasFallback(canvas);}
}
function drawCanvasFallback(canvas){
 const ctx=canvas.getContext("2d");if(!ctx)return;let w,h,stars=[];
 function resize(){w=canvas.width=canvas.clientWidth*(devicePixelRatio||1);h=canvas.height=canvas.clientHeight*(devicePixelRatio||1);stars=Array.from({length:180},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+0.3,s:Math.random()*.35+.08}));}
 resize();window.addEventListener("resize",resize);
 function draw(){ctx.clearRect(0,0,w,h);for(const p of stars){p.y+=p.s;if(p.y>h)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(155,220,255,.7)";ctx.fill();}requestAnimationFrame(draw);}draw();
}
