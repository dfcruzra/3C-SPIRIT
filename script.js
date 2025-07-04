let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(nombre, precio) {
  const index = carrito.findIndex(item => item.nombre === nombre);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${nombre} agregado al carrito`);
  actualizarNumCarrito();
}
function actualizarNumCarrito() {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById('numCarrito').textContent = totalItems;
}

// Llama la función al inicio
if(document.getElementById('numCarrito')) {
  actualizarNumCarrito();
}


function vaciarCarrito() {
  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload();
}

// Mostrar carrito en carrito.html
if (document.getElementById('lista-carrito')) {
  const lista = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total');
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad} 
      = $${item.precio * item.cantidad} 
      <button onclick="eliminarItem(${index})">❌</button>
    `;
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalSpan.textContent = total;
}

function eliminarItem(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload();
}

// Slider automático
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

if (slides.length) {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000);
}

// Efectos scroll reveal
ScrollReveal().reveal('.producto', {
  duration: 800,
  distance: '50px',
  origin: 'bottom',
  easing: 'ease-in-out',
  interval: 100
});

ScrollReveal().reveal('h1, h2', {
  duration: 800,
  origin: 'top',
  distance: '30px'
});

function filtrarProductos() {
  const filtro = document.getElementById('buscador').value.toLowerCase();
  const productos = document.querySelectorAll('.producto');

  productos.forEach(prod => {
    const texto = prod.innerText.toLowerCase();
    prod.style.display = texto.includes(filtro) ? '' : 'none';
  });
}

// Hacer botón de carrito movible
const btnCarrito = document.getElementById('btnCarrito');
let offsetX, offsetY, isDown = false;

btnCarrito.addEventListener('mousedown', e => {
  isDown = true;
  offsetX = btnCarrito.offsetLeft - e.clientX;
  offsetY = btnCarrito.offsetTop - e.clientY;
});

document.addEventListener('mouseup', () => isDown = false);

document.addEventListener('mousemove', e => {
  if (isDown) {
    e.preventDefault();
    btnCarrito.style.left = (e.clientX + offsetX) + 'px';
    btnCarrito.style.top = (e.clientY + offsetY) + 'px';
    btnCarrito.style.bottom = 'auto';
    btnCarrito.style.right = 'auto';
  }
});

function abrirModal(imagen, nombre, precio, descripcion) {
  document.getElementById('modalImg').src = imagen;
  document.getElementById('modalNombre').textContent = nombre;
  document.getElementById('modalPrecio').textContent = 'Precio: $' + precio;
  document.getElementById('modalDescripcion').textContent = descripcion;
  document.getElementById('modalBtn').onclick = function() {
    agregarAlCarrito(nombre, precio);
    cerrarModal();
  };
  document.getElementById('modalProducto').style.display = 'block';
}

function cerrarModal() {
  document.getElementById('modalProducto').style.display = 'none';
}

// Animación inicial con GSAP
gsap.from("header", { duration: 1, y: -50, opacity: 0, ease: "power2" });
gsap.from("main", { duration: 1.2, opacity: 0, delay: 0.5, ease: "power2" });
gsap.from("footer", { duration: 1, y: 50, opacity: 0, delay: 1, ease: "power2" });

function filtrarCategoria(categoria) {
  const productos = document.querySelectorAll('.producto');
  productos.forEach(prod => {
    if (categoria === 'todos') {
      prod.style.display = '';
    } else {
      prod.style.display = prod.classList.contains(categoria) ? '' : 'none';
    }
  });
}
// Animaciones de entrada
window.addEventListener('load', () => {
  gsap.from("header", { duration: 1, y: -50, opacity: 0, ease: "power2" });
  gsap.from("main", { duration: 1.2, opacity: 0, delay: 0.3, ease: "power2" });
  gsap.from("footer", { duration: 1, y: 50, opacity: 0, delay: 0.6, ease: "power2" });
});

function mostrarModalPago() {
  document.body.classList.add('modal-abierto'); // agrega blur
  const modal = document.getElementById('modal-pago');
  modal.style.display = 'flex';
  gsap.from('.modal-contenido', { opacity: 0, scale: 0.7, duration: 0.5, ease: 'back' });
}

function cerrarModalPago() {
  const modal = document.getElementById('modal-pago');
  gsap.to('.modal-contenido', {
    opacity: 0,
    scale: 0.7,
    duration: 0.3,
    ease: 'power1.in',
    onComplete: () => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-abierto'); // quita blur
      document.querySelector('.modal-contenido').style.opacity = ''; // reset
      document.querySelector('.modal-contenido').style.scale = '';
    }
  });
}

function pagarCon(metodo) {
  if (metodo === 'paypal') {
    window.open('https://www.paypal.com/paypalme/NEQUICOLOMBIA', '_blank');
  } else if (metodo === 'nequi') {
    // Para Nequi, podemos mandar al chat de WhatsApp para confirmar el pago
    window.open('https://wa.me/573142485540?text=Hola!+Quiero+realizar+el+pago+por+Nequi+a+este+numero+3142485540', '_blank');
  }
  cerrarModalPago();
}

function mostrarModalPago() {
  const modal = document.getElementById('modal-pago');
  modal.style.display = 'flex';
  gsap.from('.modal-contenido', { opacity: 0, scale: 0.7, duration: 0.5, ease: 'back' });
}

function cerrarModalPago() {
  const modal = document.getElementById('modal-pago');
  gsap.to('.modal-contenido', { opacity: 0, scale: 0.7, duration: 0.3, ease: 'power1.in', onComplete: () => {
    modal.style.display = 'none';
    document.querySelector('.modal-contenido').style.opacity = ''; // reset
    document.querySelector('.modal-contenido').style.scale = '';
  }});
}

function pagarConNequi() {
  cerrarModalPago();

  // ⚠ Importante: aquí NO existe un enlace oficial de PSE directo a Nequi personal.
  // Lo más cercano es redirigir al usuario a WhatsApp para que te contacte y le pases el link real.
  // O, si tienes un link oficial de pago Nequi (QR o URL de tu cuenta negocio), reemplázalo abajo:

  // Ejemplo: abre chat de WhatsApp con mensaje prellenado
  window.open('https://wa.me/573142485540?text=Hola!+Quiero+realizar+el+pago+por+Nequi+a+este+numero+3142485540', '_blank');
}

function abrirCheckout() {
  mostrarResumenPedido();
  document.body.classList.add('modal-abierto');
  const modal = document.getElementById('modal-checkout');
  modal.style.display = 'flex';
  gsap.from('.modal-contenido', { opacity:0, scale:0.8, duration:0.5, ease:'back' });
}

function cerrarCheckout() {
  const modal = document.getElementById('modal-checkout');
  gsap.to('.modal-contenido', {
    opacity:0, scale:0.7, duration:0.3, ease:'power1.in',
    onComplete: ()=>{
      modal.style.display = 'none';
      document.body.classList.remove('modal-abierto');
    }
  });
}

// Mostrar lista de productos + total
function mostrarResumenPedido() {
  const resumen = document.getElementById('resumen-pedido');
  let html = '<ul>';
carrito.forEach((item, index) => {
  const subtotal = item.precio * item.cantidad;
  total += subtotal;
  html += `<li class="fade-slide-item" style="animation-delay:${index * 0.1}s">
    ${item.nombre} - $${item.precio} x ${item.cantidad} = $${subtotal}
  </li>`;
});
html += '</ul>';
}

// Cuando usuario da click en "Realizar pago"
function realizarPago() {
  const metodo = document.getElementById('metodo-pago').value;
  const qr = document.getElementById('qr-container');
  const mensaje = document.getElementById('mensaje-pago');

  if (!document.getElementById('direccion-envio').value) {
    alert("Por favor escribe tu dirección de envío.");
    return;
  }

  if (metodo === 'nequi') {
    qr.style.display = 'block';

    // Simulamos que después de unos segundos, se detecta pago
    setTimeout(()=>{
      mensaje.style.display = 'block';
    }, 3000);
  } else {
    alert("Selecciona un método de pago.");
  }
}

window.addEventListener('load', () => {
  gsap.from('header', { y: -50, opacity: 0, duration: 0.8, ease: 'power2.out' });
  gsap.from('main', { opacity: 0, duration: 1, delay: 0.3 });
  gsap.from('footer', { y: 50, opacity: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' });
});

function realizarPago() {
  const metodo = document.getElementById('metodo-pago').value;
  const qr = document.getElementById('qr-container');
  const mensaje = document.getElementById('mensaje-pago');
  const animacion = document.getElementById('animacion-exito');
  const btnFactura = document.getElementById('btn-factura');
  const direccion = document.getElementById('direccion-envio').value;

  if (!direccion) {
    alert("Por favor escribe tu dirección de envío.");
    return;
  }

  if (metodo === 'nequi') {
    qr.style.display = 'block';

    // Simulamos pago: después de 3s aparece animación y factura
    setTimeout(()=>{
      mensaje.style.display = 'none';
      animacion.style.display = 'block';
      btnFactura.style.display = 'inline-block';

      // Animación con GSAP
      gsap.fromTo('#animacion-exito',
        { scale:0.5, opacity:0 },
        { scale:1.2, opacity:1, duration:0.5, ease:'back' });

function guardarPedido(direccion, metodo, correo) {
  const pedido = {
    direccion: direccion,
    metodoPago: metodo,
    correo: correo,
    carrito: carrito,
    fecha: new Date().toLocaleString()
  };
  localStorage.setItem('ultimoPedido', JSON.stringify(pedido));

  // Guardar en historial
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

    }, 3000);
  } else {
    alert("Selecciona un método de pago.");
  }
}

function guardarPedido(direccion, metodo) {
  const pedido = {
    direccion: direccion,
    metodoPago: metodo,
    carrito: carrito,
    fecha: new Date().toLocaleString()
  };
  localStorage.setItem('ultimoPedido', JSON.stringify(pedido));
}

async function descargarFactura() {
  const pedido = JSON.parse(localStorage.getItem('ultimoPedido'));
  if (!pedido) {
    alert("No hay pedido guardado.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Logo y QR en base64
  const logoBase64 = await getBase64FromImage('logo.png');
  const qrBase64 = await getBase64FromImage('qr-nequi.png');

  // Logo
  doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30);

  // Título
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text('Factura 3C SPIRIT', 50, 20);

  // Datos
  doc.setFontSize(12);
  doc.text(`Fecha: ${pedido.fecha}`, 10, 50);
  doc.text(`Dirección: ${pedido.direccion}`, 10, 60);
  doc.text(`Correo: ${pedido.correo}`, 10, 70);
  doc.text(`Método de pago: ${pedido.metodoPago}`, 10, 80);

  // Tabla de productos
  let startY = 90;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Producto", 10, startY);
  doc.text("Cantidad", 90, startY);
  doc.text("Subtotal", 140, startY);

  let total = 0;
  pedido.carrito.forEach((item, index) => {
    const y = startY + 10 + index * 10;
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    doc.text(item.nombre, 10, y);
    doc.text(`${item.cantidad}`, 95, y, null, null, 'right');
    doc.text(`$${subtotal}`, 140, y, null, null, 'right');
  });

  doc.setFontSize(14);
  doc.setTextColor(0, 102, 204);
  doc.text(`Total: $${total}`, 10, startY + 20 + pedido.carrito.length * 10);

  // QR
  doc.addImage(qrBase64, 'PNG', 130, 10, 60, 60);

  doc.save('factura.pdf');

  // También generar y descargar factura en formato .txt
  let contenido = `Factura 3C SPIRIT\n`;
  contenido += `Fecha: ${pedido.fecha}\n`;
  contenido += `Dirección: ${pedido.direccion}\n`;
  contenido += `Método de pago: ${pedido.metodoPago}\n`;
  contenido += `Productos:\n`;

  let totalTxt = 0;
  pedido.carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    totalTxt += subtotal;
    contenido += ` - ${item.nombre} x${item.cantidad}: $${subtotal}\n`;
  });
  contenido += `Total: $${totalTxt}\n`;

  // Crear archivo txt como factura (simple)
  const blob = new Blob([contenido], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'factura.txt';
  link.click();
}

// Convierte imagen a base64
function getBase64FromImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(this, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = url;
  });
}

function realizarPago() {
  const metodo = document.getElementById('metodo-pago').value;
  const qr = document.getElementById('qr-container');
  const animacion = document.getElementById('animacion-exito');
  const btnFactura = document.getElementById('btn-factura');
  const direccion = document.getElementById('direccion-envio').value;
  const correo = document.getElementById('correo-envio').value;

  if (!direccion || !correo) {
    alert("Por favor escribe dirección y correo.");
    return;
  }

  if (metodo === 'nequi') {
    qr.style.display = 'block';

    setTimeout(() => {
      animacion.style.display = 'block';
      btnFactura.style.display = 'inline-block';
      gsap.fromTo('#animacion-exito',
        { scale:0.5, opacity:0 },
        { scale:1.2, opacity:1, duration:0.5, ease:'back' });

      guardarPedido(direccion, metodo, correo);

      enviarComprobante(correo); // Simulado

    }, 3000);
  } else {
    alert("Selecciona un método de pago.");
  }
}

function enviarComprobante(correo) {
  // Simulación: mostramos mensaje
  setTimeout(() => {
    alert(`📩 Comprobante enviado a ${correo} (simulado)`);
  }, 1000);
}

function abrirFactura(){
  document.getElementById('factura-digital').style.display = 'block';
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let html = '<ul>';
  let total = 0;
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    html += `<li>${item.nombre} - $${item.precio} x ${item.cantidad} = $${subtotal}</li>`;
  });
  html += '</ul>';
  document.getElementById('detalle-productos').innerHTML = html;
  document.getElementById('total-final').innerText = total;
}

function mostrarQR(){
  document.getElementById('qr-nequi').style.display = 'block';
}

function cancelarPedido(){
  if(confirm('¿Cancelar pedido?')){
    localStorage.removeItem('carrito');
    location.reload();
  }
}

function vaciarCarrito(){
  localStorage.removeItem('carrito');
  location.reload();
}

function mostrarQR(){
  const qr = document.getElementById('qr-nequi');
  qr.style.display = 'block';
  qr.classList.add('qr-anim');

  // Guardar dirección
  const direccion = document.getElementById('direccion-envio').value;
  console.log("Dirección de envío:", direccion);

  // Mostrar modal de éxito tras 3 segundos
  setTimeout(() => {
    document.getElementById('modal-exito').style.display = 'flex';
    // Animar modal con GSAP
    gsap.to('.modal-exito-contenido', {scale:1, opacity:1, duration:0.6, ease:"back.out(1.7)"});
  }, 3000);
}

function cerrarModalExito(){
  gsap.to('.modal-exito-contenido', {scale:0.8, opacity:0, duration:0.4, onComplete: ()=>{
    document.getElementById('modal-exito').style.display = 'none';
  }});
}

document.querySelectorAll('.acciones-carrito button, #factura-digital button').forEach(button => {
  button.addEventListener('mousemove', e => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left; // pos dentro del botón
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offsetX = (x - centerX) / 10; 
    const offsetY = (y - centerY) / 10;
    button.style.boxShadow = `${-offsetX}px ${-offsetY}px 20px rgba(0,170,255,0.4)`;
  });
  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = '';
  });
});

document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10; // rango -5 a 5
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  document.querySelector('main').style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
});

document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20; // rango -10 a 10
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  // Fondo (particles)
  document.getElementById('particles-js').style.transform = `translate(${x/4}px, ${y/4}px)`;

  // Main
  document.querySelector('main').style.transform = `rotateX(${y/10}deg) rotateY(${-x/10}deg)`;

  // Botones
  document.querySelectorAll('.acciones-carrito button, #factura-digital button').forEach(btn => {
    btn.style.transform = `translateX(${x/20}px) translateY(${y/20}px)`;
  });

  // Títulos
  document.querySelectorAll('h1, h2, h3').forEach(title => {
    title.style.transform = `translateX(${x/30}px) translateY(${y/30}px)`;
  });
});
