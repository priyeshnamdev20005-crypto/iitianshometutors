/* site-shell:v1 — menu, header, reveal, counters, FAQ, year */
(function(){
  var d=document, root=d.documentElement;
  var hd=d.getElementById('hd');
  if(hd){var st=function(){hd.classList.toggle('stuck',window.scrollY>6)};st();addEventListener('scroll',st,{passive:true});}
  var burger=d.querySelector('.burger'), nav=d.getElementById('site-menu');
  var desk=window.matchMedia('(min-width:1080px)'), hov=window.matchMedia('(hover:hover)');
  var dds=[].slice.call(d.querySelectorAll('.site-nav details.dd'));
  function setOpen(v){root.classList.toggle('nav-open',v);if(burger){burger.setAttribute('aria-expanded',v?'true':'false');burger.setAttribute('aria-label',v?'Close menu':'Open menu');}}
  if(burger){burger.addEventListener('click',function(){setOpen(!root.classList.contains('nav-open'));});}
  dds.forEach(function(x){
    x.addEventListener('toggle',function(){if(x.open&&desk.matches){dds.forEach(function(o){if(o!==x)o.open=false;});}});
    x.addEventListener('mouseenter',function(){if(desk.matches&&hov.matches)x.open=true;});
    x.addEventListener('mouseleave',function(){if(desk.matches&&hov.matches)x.open=false;});
    var s=x.querySelector('summary');
    if(s){s.addEventListener('click',function(e){if(desk.matches&&hov.matches&&e.detail>0&&x.open){e.preventDefault();}});}
  });
  d.addEventListener('click',function(e){if(!desk.matches)return;dds.forEach(function(o){if(o.open&&!o.contains(e.target))o.open=false;});});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'){dds.forEach(function(o){o.open=false;});if(root.classList.contains('nav-open')){setOpen(false);if(burger)burger.focus();}}});
  var reset=function(){setOpen(false);dds.forEach(function(o){o.open=false;});};
  if(desk.addEventListener)desk.addEventListener('change',reset);else if(desk.addListener)desk.addListener(reset);
  if(nav){nav.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('a'))setOpen(false);});}
  var yr=d.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el){
    var t=parseFloat(el.getAttribute('data-count')),dec=parseInt(el.getAttribute('data-dec')||'0',10),plain=el.getAttribute('data-plain')==='1';
    var fin=function(){el.textContent=plain?String(t):t.toFixed(dec);};
    if(rm||!window.requestAnimationFrame){fin();return;}
    var t0=null,dur=1100;
    function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3),v=t*e;el.textContent=plain?String(Math.round(v)):v.toFixed(dec);if(p<1)requestAnimationFrame(step);else fin();}
    requestAnimationFrame(step);
  }
  function show(el){el.classList.add('in');var c=el.querySelectorAll('[data-count]');for(var i=0;i<c.length;i++){if(!c[i].getAttribute('data-done')){c[i].setAttribute('data-done','1');countUp(c[i]);}}}
  var els=d.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){for(var i=0;i<els.length;i++)show(els[i]);}
  else{var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:.06});
    for(var j=0;j<els.length;j++)io.observe(els[j]);}
  var mk=d.getElementById('mk');if(mk)setTimeout(function(){mk.classList.add('in');},420);
  var fq=d.querySelectorAll('.faq details');
  [].forEach.call(fq,function(x){x.addEventListener('toggle',function(){if(x.open&&window.innerWidth<900){[].forEach.call(fq,function(o){if(o!==x)o.open=false;});}});});
})();
