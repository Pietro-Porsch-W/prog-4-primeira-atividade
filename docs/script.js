// Utilidades de tema (dark/light) com persistência
(function tema() {
    const root = document.documentElement;
    const btnTema = document.getElementById("btnTema");
    const KEY = "ppw-theme";

    // Se tiver preferência salva, aplica; senão inicia em dark (requisitado)
    const prefer = localStorage.getItem(KEY) || "dark";
    root.setAttribute("data-theme", prefer);
    btnTema.setAttribute("aria-pressed", String(prefer === "dark"));

    btnTema.addEventListener("click", () => {
        const atual = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", atual);
        btnTema.setAttribute("aria-pressed", String(atual === "dark"));
        localStorage.setItem(KEY, atual);
    });
})();

// Alerta de boas-vindas (ao clicar no botão)
(function alerta() {
    const btn = document.getElementById("btnAlerta");
    if (!btn) return;
    btn.addEventListener("click", function () {
        alert("Olá! Obrigado por visitar meu currículo.");
    });
})();

// Toggle da seção Projetos
(function toggleProjetos() {
    const btn = document.getElementById("btnToggleProjetos");
    const lista = document.getElementById("listaProjetos");
    if (!btn || !lista) return;

    function updateLabel(expanded) {
        btn.textContent = expanded ? "Ocultar projetos" : "Mostrar projetos";
        btn.setAttribute("aria-expanded", String(expanded));
        lista.style.display = expanded ? "grid" : "none";
    }

    let aberto = true;
    updateLabel(aberto);

    btn.addEventListener("click", () => {
        aberto = !aberto;
        updateLabel(aberto);
    });
})();

// Contador de visitas com localStorage
(function visitas() {
    const el = document.getElementById("visitas");
    const ano = document.getElementById("ano");
    const KEY = "ppw-visits";

    if (ano) ano.textContent = String(new Date().getFullYear());
    if (!el) return;

    let count = Number(localStorage.getItem(KEY) || "0");
    count += 1;
    localStorage.setItem(KEY, String(count));

    el.textContent = `Você já visitou esta página ${count} vez${count === 1 ? "" : "es"}.`;
})();

// Canvas: gráfico de barras (habilidades)
(function grafico() {
    const c = document.getElementById("graficoHabilidades");
    if (!c || !c.getContext) return;
    const ctx = c.getContext("2d");

    // Dados (0–100). Básico=40, Médio=70.
    const data = [
        { label: "Java", valor: 40 },
        { label: "JavaScript", valor: 70 },
        { label: "SQL", valor: 70 },
        { label: "Python", valor: 40 }
    ];

    // Dimensões e estilos
    const W = c.width, H = c.height;
    const padding = 40;
    const eixoX = H - padding;
    const larguraBarra = (W - padding * 2) / data.length * 0.6;
    const gap = ((W - padding * 2) - larguraBarra * data.length) / (data.length - 1);

    // Fundo
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--card") || "#12141b";
    ctx.fillRect(0, 0, W, H);

    // Eixo
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--border") || "#252a36";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, eixoX);
    ctx.lineTo(W - padding, eixoX);
    ctx.stroke();

    // Grade simples (25, 50, 75, 100)
    ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted") || "#a3a7b3";
    [25, 50, 75, 100].forEach(v => {
        const y = eixoX - (v / 100) * (H - padding * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(W - padding, y);
        ctx.stroke();
        ctx.fillText(String(v), 8, y + 4);
    });

    // Barras
    const corBarra = getComputedStyle(document.documentElement).getPropertyValue("--primary") || "#3b82f6";
    const corLabel = getComputedStyle(document.documentElement).getPropertyValue("--text") || "#e5e7eb";

    let x = padding;
    data.forEach((d) => {
        const altura = (d.valor / 100) * (H - padding * 2);
        const y = eixoX - altura;

        // Barra
        ctx.fillStyle = corBarra;
        ctx.fillRect(x, y, larguraBarra, altura);

        // Valor
        ctx.fillStyle = corLabel;
        ctx.fillText(String(d.valor), x + larguraBarra / 2 - 8, y - 6);

        // Rótulo
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted") || "#a3a7b3";
        ctx.fillText(d.label, x + 2, eixoX + 16);

        x += larguraBarra + gap;
    });

    // Redesenhar ao trocar tema
    const observer = new MutationObserver(() => grafico());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    function grafico() { 
        ctx.clearRect(0, 0, W, H); 
    }
})();

// Form demonstrativo (previne envio real)
(function formDemo() {
    const form = document.getElementById("formContato");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Formulário de demonstração!");
    });
})();
