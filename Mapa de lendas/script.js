// INICIALIZAÇÃO DO MAPA
const map = L.map('map', {
    center: [-15.7797, -47.9297], 
    zoom: 4,                      
    maxBounds: [                  // Limites globais para evitar que o mapa “fuja”
      [-90, -180], 
      [90, 180]
    ],
    maxBoundsViscosity: 1.0,      
    worldCopyJump: false          
  }).setView([-15.7797, -47.9297], 4); 
  

// CAMADA BASE DO MAPA
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap | Projeto por @Evelin Visoto', 
  }).addTo(map);
  

// CARREGAMENTO DAS LENDAS (JSON EXTERNO)  
  fetch('lendas.json')
    .then(response => response.json()) // Converte o arquivo para objeto JS
    .then(data => {
  
//  LOOP PARA CADA LENDA
      data.forEach(lenda => {
  
        // Cria o conteúdo do popup
        const popupContent = `
          <div style="text-align: left; max-width: 220px;">
            <h3 style="margin: 0; color: #2f4f4f;">${lenda.nome}</h3>
            <img src="${lenda.imagem}" alt="${lenda.nome}" class="lenda-img" onclick="expandirImagem(this)">
            <p style="margin: 4px 0; font-size: 0.9rem;"><strong>Origem:</strong> ${lenda.local}</p>
            <p style="font-size: 0.85rem;">${lenda.descricao}</p>
          </div>
        `;
  
        // Cria marcador com ícone personalizado
        L.marker([lenda.latitude, lenda.longitude], {
          icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
          })
        })
        .addTo(map)               
        .bindPopup(popupContent);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar as lendas:', error);
    });
  