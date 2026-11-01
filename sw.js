const C='phim-v4',F=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(new Promise(res=>{let done=0;
  const t=setTimeout(()=>{caches.match(e.request).then(m=>{if(m&&!done){done=1;res(m)}})},2500);
  fetch(e.request,{cache:'no-store'}).then(r=>{clearTimeout(t);if(!done){done=1;res(r)}const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))})
   .catch(()=>{clearTimeout(t);caches.match(e.request).then(m=>{if(!done){done=1;res(m||caches.match('./index.html'))}})})}))});
