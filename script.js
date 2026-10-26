const products=[
 {name:'Laptop Gamer RTX',category:'Gaming',description:'Rendimiento extremo para jugar, crear y conquistar.',price:'$6.499.900',image:'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=85'},
 {name:'Workstation Profesional',category:'Workstation',description:'Potencia certificada para flujos de trabajo exigentes.',price:'$9.899.900',image:'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=900&q=85'},
 {name:'Monitor Curvo 4K',category:'Monitores',description:'Inmersión total, color preciso y detalle extraordinario.',price:'$2.199.900',image:'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85'},
 {name:'Teclado Mecánico RGB',category:'Accesorios',description:'Respuesta ultrarrápida y personalización sin límites.',price:'$429.900',image:'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=85'},
 {name:'Mouse Gamer Pro',category:'Accesorios',description:'Precisión competitiva con ergonomía de alto nivel.',price:'$289.900',image:'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85'},
 {name:'Tarjeta Gráfica Premium',category:'Componentes',description:'Gráficos de nueva generación para experiencias épicas.',price:'$3.799.900',image:'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=85'}
];
const offers=[
 {name:'Laptop Gamer RTX',old:'$6.499.900',price:'$4.549.930',save:'30% ahorro',image:products[0].image},
 {name:'Monitor Curvo 4K',old:'$2.199.900',price:'$1.649.925',save:'25% ahorro',image:products[2].image},
 {name:'Kit Setup RGB',old:'$719.800',price:'$499.900',save:'2x1 seleccionado',image:products[3].image}
];
const testimonials=[
 ['Laura Méndez','Creadora de contenido','Excelente servicio y equipos de gran calidad. Mi flujo de edición cambió completamente.','https://randomuser.me/api/portraits/women/44.jpg'],
 ['Andrés Rojas','Desarrollador senior','La asesoría fue precisa, rápida y sin venderme cosas que no necesitaba.','https://randomuser.me/api/portraits/men/32.jpg'],
 ['Camila Torres','Diseñadora 3D','Mi workstation superó todas mis expectativas. El rendimiento es increíble.','https://randomuser.me/api/portraits/women/68.jpg'],
 ['Diego Salazar','Streamer profesional','El setup llegó impecable y la experiencia de compra fue premium de principio a fin.','https://randomuser.me/api/portraits/men/46.jpg'],
 ['Valentina Cruz','Gamer competitiva','Encontré todo lo que necesitaba para subir mi nivel. Recomendados al 100%.','https://randomuser.me/api/portraits/women/65.jpg'],
 ['Nicolás Pérez','Arquitecto','La atención personalizada marcó la diferencia. Ahora trabajo mucho más rápido.','https://randomuser.me/api/portraits/men/75.jpg']
];

const productGrid=document.querySelector('#productGrid');
productGrid.innerHTML=products.map((p,i)=>`<div class="col-md-6 col-xl-4 reveal"><article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="category">${p.category}</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.description}</p><div class="d-flex justify-content-between align-items-center"><span class="price">${p.price}</span><span class="text-warning small"><i class="fa-solid fa-star"></i> 4.9</span></div><div class="product-actions"><button class="btn btn-ghost details-btn" data-name="${p.name}">Ver más</button><button class="btn btn-primary buy-btn" data-name="${p.name}">Comprar</button></div></div></article></div>`).join('');

document.querySelector('#offerGrid').innerHTML=offers.map(o=>`<div class="col-lg-4 reveal"><article class="offer-card"><img src="${o.image}" alt="${o.name}" loading="lazy"><div><h3>${o.name}</h3><span class="old-price">${o.old}</span><div><span class="new-price">${o.price}</span><span class="save">${o.save}</span></div></div></article></div>`).join('');

document.querySelector('#testimonialItems').innerHTML=testimonials.map((t,i)=>`<div class="carousel-item ${i===0?'active':''}"><article class="testimonial-card"><div class="quote">“</div><blockquote>${t[2]}</blockquote><img class="avatar" src="${t[3]}" alt="${t[0]}" loading="lazy"><div class="stars">★★★★★</div><h4>${t[0]}</h4><small>${t[1]}</small></article></div>`).join('');
document.querySelector('#testimonialIndicators').innerHTML=testimonials.map((_,i)=>`<button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="${i}" class="${i===0?'active':''}" aria-label="Testimonio ${i+1}"></button>`).join('');

const nav=document.querySelector('#mainNav'),topBtn=document.querySelector('#toTop');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>45);topBtn.classList.toggle('visible',scrollY>500)});
topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

document.querySelectorAll('.nav-link').forEach(link=>link.addEventListener('click',()=>{const menu=document.querySelector('#navMenu');if(menu.classList.contains('show'))bootstrap.Collapse.getOrCreateInstance(menu).hide()}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

let cart=0;const toast=document.querySelector('#toast');function showToast(message){toast.querySelector('span').textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
document.addEventListener('click',e=>{if(e.target.closest('.buy-btn')){cart++;document.querySelector('#cartCount').textContent=cart;showToast(`${e.target.closest('.buy-btn').dataset.name} añadido al carrito`)}if(e.target.closest('.details-btn'))showToast(`Pronto podrás ver todos los detalles de ${e.target.closest('.details-btn').dataset.name}`)});

document.querySelector('#contactForm').addEventListener('submit',e=>{e.preventDefault();showToast('¡Gracias! Te contactaremos muy pronto.');e.target.reset()});

const end=Date.now()+1000*60*60*47+1000*60*32;function updateCountdown(){let diff=Math.max(0,end-Date.now());const d=Math.floor(diff/86400000);diff%=86400000;const h=Math.floor(diff/3600000);diff%=3600000;const m=Math.floor(diff/60000);const s=Math.floor((diff%60000)/1000);document.querySelector('#days').textContent=String(d).padStart(2,'0');document.querySelector('#hours').textContent=String(h).padStart(2,'0');document.querySelector('#minutes').textContent=String(m).padStart(2,'0');document.querySelector('#seconds').textContent=String(s).padStart(2,'0')}updateCountdown();setInterval(updateCountdown,1000);