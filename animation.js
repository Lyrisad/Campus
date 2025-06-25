import {
    Document,
    Packer,
    Paragraph,
    Table,
    TableRow,
    TableCell,
  } from "https://cdn.jsdelivr.net/npm/docx@9.2.0/+esm";
  
  // URL de votre Web App Google Apps Script
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyUYWtAq_lVY3QdDfhbz6JIhahOhi-zuiPI9lQgS0P5_X6TN2-6Bvy2NqmikLQtwY2qtg/exec";
  
  // ---------------------- Fonctions Utilitaires Globales ----------------------
  
  // Fonction pour obtenir l'adresse IP utilisateur
  async function getUserIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('Impossible d\'obtenir l\'IP utilisateur:', error);
      return 'IP non disponible';
    }
  }
  
  // Fonction utilitaire pour enregistrer un log
  async function recordLog(action) {
    try {
      const userIp = await getUserIP();
      const logResponse = await fetch(`${SCRIPT_URL}?action=addLog&logAction=${encodeURIComponent(action)}&userIp=${encodeURIComponent(userIp)}`);
      const logResult = await logResponse.json();
      if (!logResult.success) {
        console.warn('Erreur lors de l\'enregistrement du log:', logResult.error);
      }
    } catch (error) {
      console.warn('Erreur lors de l\'enregistrement du log:', error);
    }
  }
  
  // Fonction de synchronisation complète des données
  async function syncAllData() {
    try {
      showNotification("Synchronisation des données en cours...");
      
      // 1. Synchroniser les formations passées vers le tableau de clôture
      const moveResponse = await fetch(`${SCRIPT_URL}?action=moveToPendingClosure`);
      const moveResult = await moveResponse.json();
      if (!moveResult.success) {
        console.warn("Erreur lors du déplacement des formations passées:", moveResult.error);
      }
      
      // 2. Recharger les données des formations
      if (window.fetchFormations) {
        await window.fetchFormations();
      }
      
      // 3. Recharger les formations en attente de clôture
      if (window.fetchPendingClosure) {
        await window.fetchPendingClosure();
      }
      
      // 4. Marquer les dates validées
      await markAllValidatedDates();
      
      showNotification("Synchronisation terminée avec succès !");
      return true;
    } catch (error) {
      console.error("Erreur lors de la synchronisation:", error);
      showNotification("Erreur lors de la synchronisation des données");
      return false;
    }
  }
  
  // Variable globale pour l'audio
  let globalAudio = null;
  let isMuted = false;
  
  window.onload = function() {
    // Define an array with all your music file paths
    var tracks = [
      '/music/REGGAE.mp3',
      '/music/POPUNK.mp3',
      '/music/POPUNK2.mp3',
      '/music/COUNTRY.mp3'
    ];
    
    // Choose a random track from the array
    var randomIndex = Math.floor(Math.random() * tracks.length);
    var randomTrack = tracks[randomIndex];
    
    // Create a new Audio object using the randomly selected track
    globalAudio = new Audio(randomTrack);
    
    // Set the audio to loop continuously
    globalAudio.loop = true;
    
    // Optional: Set the volume (range is 0.0 to 1.0)
    globalAudio.volume = 0.5;
    
    // Attempt to play the audio
    globalAudio.play().then(() => {
      // Musique démarrée avec succès
      updateMusicButtonState();
    }).catch(function(error) {
      console.error('Playback failed due to browser restrictions or other issues:', error);
    });

    // Initialiser le bouton de contrôle audio
    initMusicControl();
  };

  // Fonction pour initialiser le contrôle audio
  function initMusicControl() {
    const musicBtn = document.getElementById('musicControlBtn');
    if (!musicBtn) return;
    
    // Set initial tooltip
    musicBtn.title = "Reprendre la musique";
    
    musicBtn.addEventListener('click', () => {
      if (!globalAudio) return;
      
      if (globalAudio.paused) {
        globalAudio.play().catch(console.error);
        isMuted = false;
      } else {
        globalAudio.pause();
        isMuted = true;
      }
      
      updateMusicButtonState();
    });
  }

  // Fonction pour mettre à jour l'état visuel du bouton
  function updateMusicButtonState() {
    const musicBtn = document.getElementById('musicControlBtn');
    if (!musicBtn || !globalAudio) return;
    
    if (isMuted || globalAudio.paused) {
      musicBtn.classList.add('muted');
      musicBtn.classList.remove('playing');
      musicBtn.title = "Reprendre la musique"; // Tooltip when music is paused/muted
    } else {
      musicBtn.classList.add('playing');
      musicBtn.classList.remove('muted');
      musicBtn.title = "Arrêter la musique"; // Tooltip when music is playing
    }
  }
  
  // Convertit une chaîne "dd/mm/yyyy" en objet Date
  function parseDDMMYYYY(dateStr) {
    if (!dateStr) return new Date(NaN); // Retourner une date invalide si la chaîne est vide
    
    // Si déjà au format dd/mm/yyyy
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const parts = dateStr.split("/");
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    
    // Essayer de parser comme une date normale
    const normalDate = new Date(dateStr);
    if (!isNaN(normalDate.getTime())) {
      return normalDate;
    }
    
    // Dernier recours: essayer de trouver un motif de date dans la chaîne
    const datePattern = /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/;
    const match = dateStr.match(datePattern);
    if (match) {
      const day = parseInt(match[1]);
      const month = parseInt(match[2]) - 1;
      let year = parseInt(match[3]);
      if (year < 100) year += 2000; // Supposer que 2 chiffres sont 20xx
      return new Date(year, month, day);
    }
    
    return new Date(NaN); // Si aucun format ne correspond, retourner une date invalide
  }
  
  // Compare deux dates (objets Date) sur l'année, le mois et le jour uniquement
  function isSameDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  
  // Convertit une date "dd/mm/yyyy" en sa représentation complète attendue par le Sheet
  function convertDDMMYYYYToFull(dateStr) {
    const d = parseDDMMYYYY(dateStr);
    return d.toString();
  }
  
  // - Otherwise, if it contains a "T" (ISO format), parse accordingly.
  function formatDateToDDMMYYYY(dateInput) {
    // Si c'est déjà un objet Date, le formater directement
    if (dateInput instanceof Date) {
      if (isNaN(dateInput.getTime())) return ""; // Date invalide
      const dd = dateInput.getDate().toString().padStart(2, "0");
      const mm = (dateInput.getMonth() + 1).toString().padStart(2, "0");
      const yyyy = dateInput.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
    
    // Si c'est une chaîne vide ou non définie
    if (!dateInput) return "";
    
    // Si ce n'est pas une chaîne, essayer de convertir en chaîne
    const dateStr = String(dateInput);
    
    // If already in dd/mm/yyyy format, return as is.
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      return dateStr;
    }
    
    // If it appears to be an ISO date or similar (contains "T"), parse it:
    if (dateStr.indexOf("T") !== -1) {
      const d = new Date(dateStr);
      if (isNaN(d)) return dateStr;
      const dd = d.getDate().toString().padStart(2, "0");
      const mm = (d.getMonth() + 1).toString().padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
    
    // Otherwise, try to parse assuming it's in dd/mm/yyyy but maybe not well formatted.
    const d = parseDDMMYYYY(dateStr);
    if (isNaN(d)) return dateStr;
    const dd = d.getDate().toString().padStart(2, "0");
    const mm = (d.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
  
  // Retourne un tableau d'objets représentant chaque bloc de participants
  function getBlocks(participantsStr) {
    const regex = /(\[.*?\])\s*\((.*?)\)/g;
    let blocks = [];
    let match;
    while ((match = regex.exec(participantsStr)) !== null) {
      blocks.push({
        json: match[1],
        date: match[2],
        fullBlock: match[0],
      });
    }
    return blocks;
  }
  
  const contactItems = document.querySelectorAll(".contact-item");
  const notificationPopup = document.getElementById("notificationPopup");
  
  const showNotification = (message) => {
    const notifText = notificationPopup.querySelector("p");
    if (notifText) notifText.textContent = message;
    notificationPopup.classList.add("show");
    notificationPopup.classList.remove("hidden");
    setTimeout(() => {
      notificationPopup.classList.add("hidden");
      notificationPopup.classList.remove("show");
    }, 3000);
  };
  
  // Compte le nombre total de participants pour une formation à une date donnée
  function getParticipantsCount(formation, date) {
    let count = 0;
    if (formation.participants) {
      const regex = /(\[.*?\])\s*\((.*?)\)/g;
      let match;
      const targetDate = parseDDMMYYYY(date);
      while ((match = regex.exec(formation.participants)) !== null) {
        try {
          let storedDate = new Date(match[2]);
          if (isSameDate(storedDate, targetDate)) {
            const empData = JSON.parse(match[1]);
            // Chaque bloc contient un tableau d'un objet
            let empArray = Array.isArray(empData) ? empData : [empData];
            count += empArray.length;
          }
        } catch (e) {
          console.error("Erreur lors du parsing des participants:", e);
        }
      }
    }
    return count;
  }
  
  // ---------------------- Début du Script ----------------------
  document.addEventListener("DOMContentLoaded", () => {
    const notify = initNotifications();
    
    // ============ AFFICHER LE MESSAGE POST-REFRESH ============
    // Vérifier s'il y a un message à afficher après le refresh
    const postRefreshMessage = sessionStorage.getItem('postRefreshMessage');
    if (postRefreshMessage) {
      // Nettoyer le sessionStorage
      sessionStorage.removeItem('postRefreshMessage');
      // Afficher le message avec un petit délai pour que l'interface soit bien chargée
      setTimeout(() => {
        showNotification(postRefreshMessage);
      }, 500);
    }
    // ============================================================
    
    initNavigation();
    initAdminPanel();
    initAppointmentForm(notify);
    initEmployeeTable();
    // Launch the archive process when the DOM is loaded
    runArchiveProcess();
    // Then refresh the Historique panel
    fetchArchives();
    // Fetch pending closures
    fetchPendingClosure();
    fetchTasks();
    fetchTasksHistory();
    
    // Vérifier si on doit rouvrir le modal de participants après un refresh
    const reopenData = sessionStorage.getItem('reopenParticipantsModal');
    if (reopenData) {
      try {
        const { formationId, formationName, date } = JSON.parse(reopenData);
        // Nettoyer le sessionStorage
        sessionStorage.removeItem('reopenParticipantsModal');
        
        // Attendre que les données soient chargées puis rouvrir le modal
        setTimeout(async () => {
          // S'assurer que l'admin panel est visible
          if (getCookie("adminAuth") === "true") {
            document.getElementById("adminPanel").style.display = "flex";
            document.getElementById("adminLogin").style.display = "none";
            document.getElementById("homePage").style.display = "none";
            document.getElementById("appointment-section").style.display = "none";
            
            // Attendre que les formations soient chargées
            if (typeof window.fetchFormations === "function") {
              await window.fetchFormations();
            }
            
            // Trouver la formation mise à jour
            const formation = window.formationsData.find(f => f.id == formationId);
            if (formation) {
              // Rouvrir le modal avec les données à jour
              showParticipantsModal(formation, date);
            }
          }
        }, 500);
      } catch (error) {
        console.error("Erreur lors de la réouverture du modal:", error);
        sessionStorage.removeItem('reopenParticipantsModal');
      }
    }
    
    // Gestionnaires pour le modal de clôture
    const closureModal = document.getElementById("closureModal");
    const closeClosureModal = document.getElementById("closeClosureModal");
    const finalizeClosureBtn = document.getElementById("finalizeClosureBtn");
    
    // Fermer le modal quand on clique sur la croix
    closeClosureModal.addEventListener("click", () => {
      closureModal.style.display = "none";
    });
    
    // Fermer le modal quand on clique en dehors
    window.addEventListener("click", (event) => {
      if (event.target === closureModal) {
        closureModal.style.display = "none";
      }
    });
    
    // Finaliser la clôture quand on clique sur le bouton
    finalizeClosureBtn.addEventListener("click", () => {
      const formationId = finalizeClosureBtn.dataset.formationId;
      const formationName = finalizeClosureBtn.dataset.formationName;
      const formationDate = finalizeClosureBtn.dataset.formationDate;
      const participantsData = finalizeClosureBtn.participantsData;
      
      finalizeClosureProcess(formationId, formationName, formationDate, participantsData);
    });
  
    // Nouvel appel pour charger les statistiques
    loadStatistics();
    
    // Démarrer le système de notification automatique pour l'admin
    startNotificationSystem();
  });
  
  /* =================== Navigation =================== */
  function initNavigation() {
    const serviceItems = document.querySelectorAll(".service-item");
    const homePage = document.querySelector("#homePage");
    const formations = document.querySelectorAll(".formation-container");
    const appointmentSection = document.getElementById("appointment-section");
    const adminLogin = document.getElementById("adminLogin");
    const menuAdmin = document.getElementById("menuAdmin");
    const backButtons = document.querySelectorAll(".back-button");
    const menuItems = document.querySelectorAll(".menu-item");
    const appointmentButtons = document.querySelectorAll(".goToForm");
    const adminPanel = document.getElementById("adminPanel");
    const rgpdPage = document.getElementById("rgpdPage");
    const footerLinks = document.querySelectorAll(".footer-link");
  
    const hideAllFormations = () => {
      formations.forEach((formation) => {
        formation.style.display = "none";
      });
    };

    const hideAllPages = () => {
      homePage.style.display = "none";
      appointmentSection.style.display = "none";
      adminLogin.style.display = "none";
      adminPanel.style.display = "none";
      if (rgpdPage) rgpdPage.style.display = "none";
      hideAllFormations();
    };
  
    serviceItems.forEach((item) => {
      item.addEventListener("click", () => {
        const targetId = item.id.replace("item-", "");
        const targetFormation = document.querySelector(`#${targetId}`);
        if (targetFormation) {
          hideAllPages();
          targetFormation.style.display = "flex";
          
          // Scroll vers le haut de la page pour voir le début de la formation
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }, 100);
        }
      });
    });
  
    backButtons.forEach((button) => {
      button.addEventListener("click", () => {
        homePage.style.display = "flex";
        adminLogin.style.display = "none";
        appointmentSection.style.display = "none";
        adminPanel.style.display = "none";
        if (rgpdPage) rgpdPage.style.display = "none";
        hideAllFormations();
        
        // Si on revient depuis la page RGPD, aller au début de la page
        if (button.closest('#rgpdPage')) {
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }, 100);
        } else {
          // Sinon, comportement normal pour les formations
          const targetSection = document.getElementById("servicesSection");
          if (targetSection) {
            const sectionPosition =
              targetSection.getBoundingClientRect().top + window.scrollY;
            const offset = window.innerHeight / 10;
            window.scrollTo({
              top: sectionPosition - offset,
              behavior: "smooth",
            });
          }
        }
      });
    });
  
    menuItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = item.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          homePage.style.display = "flex";
          appointmentSection.style.display = "none";
          hideAllFormations();
          adminLogin.style.display = "none";
          adminPanel.style.display = "none";
          if (rgpdPage) rgpdPage.style.display = "none";
          setTimeout(() => {
            const sectionPosition =
              targetSection.getBoundingClientRect().top + window.scrollY;
            const offset = window.innerHeight / 10;
            window.scrollTo({
              top: sectionPosition - offset,
              behavior: "smooth",
            });
          }, 100);
        }
      });
    });
  
    appointmentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        appointmentSection.style.display = "flex";
        hideAllFormations();
        homePage.style.display = "none";
        adminLogin.style.display = "none";
        adminPanel.style.display = "none";
        if (rgpdPage) rgpdPage.style.display = "none";
      });
    });
  
    menuAdmin.addEventListener("click", () => {
      if (getCookie("adminAuth") === "true") {
        document.getElementById("adminPanel").style.display = "flex";
        document.getElementById("adminLogin").style.display = "none";
      } else {
        document.getElementById("adminLogin").style.display = "flex";
        document.getElementById("adminPanel").style.display = "none";
      }
      hideAllFormations();
      homePage.style.display = "none";
      appointmentSection.style.display = "none";
      if (rgpdPage) rgpdPage.style.display = "none";
    });

    // Gestion des liens du footer
    footerLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        
        if (targetId === "rgpdPage" && rgpdPage) {
          hideAllPages();
          rgpdPage.style.display = "flex";
          
          // Scroll vers le haut de la page
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }, 100);
        }
      });
    });
  }
  
  /* =================== Notifications =================== */
  function initNotifications() {
    const contactItems = document.querySelectorAll(".contact-item");
    const notificationPopup = document.getElementById("notificationPopup");
  
    const showNotification = (message) => {
      const notifText = notificationPopup.querySelector("p");
      if (notifText) notifText.textContent = message;
      notificationPopup.classList.add("show");
      notificationPopup.classList.remove("hidden");
      setTimeout(() => {
        notificationPopup.classList.add("hidden");
        notificationPopup.classList.remove("show");
      }, 3000);
    };
  
    contactItems.forEach((item) => {
      item.addEventListener("click", () => {
        const email = item.getAttribute("data-email");
        if (email) {
          navigator.clipboard
            .writeText(email)
            .then(() => showNotification(`Adresse mail copiée (${email})`))
            .catch((err) =>
              console.error("Erreur lors de la copie de l'email : ", err)
            );
        }
      });
    });
  
    return showNotification;
  }
  
  /* =================== Admin Panel =================== */
  function initAdminPanel() {
    const adminPanel = document.getElementById("adminPanel");
    const adminLogin = document.getElementById("adminLogin");
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const submitLogin = document.getElementById("submitLogin");
    const errorMessage = document.getElementById("errorMessage");
    const logoutButton = document.getElementById("logoutButton");
    const addFormationButton = document.getElementById("addFormationButton");
    const formationsTable = document
      .getElementById("formationsTable")
      .querySelector("tbody");
    const formationModal = document.getElementById("formationModal");
    const modalTitle = document.getElementById("modalTitle");
    const formationNameInput = document.getElementById("formationName");
    const formationDatesInput = document.getElementById("formationDates");
    const closeModalButton = document.getElementById("closeModal");
  
    const validUsername = "CampusCandor";
    const validPassword = "CC1234!";
  
        let formationsData = [];
    let pendingRequests = [];
    let logsData = [];

    // --- Gestion des logs ---
    const fetchLogs = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?action=readLogs`);
        const responseJson = await response.json();
        if (!responseJson || !responseJson.values) {
          logsData = [];
          renderLogs();
          return;
        }
        logsData = responseJson.values.map((row) => ({
          id: row.id,
          date: row.date,
          heure: row.heure,
          action: row.action,
          ip: row.ip
        }));
        
        // Trier les logs par ID décroissant (plus récent en premier)
        logsData.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        
        renderLogs();
      } catch (error) {
        console.error("Erreur lors de la récupération des logs :", error.message);
      }
    };

    const renderLogs = () => {
      const logsTableBody = document.querySelector("#logsTable tbody");
      if (!logsTableBody) return;
      
      logsTableBody.innerHTML = "";
      
      logsData.forEach((log) => {
        const row = document.createElement("tr");
        
        // Déterminer la classe CSS pour l'action
        let actionClass = "log-action";
        if (log.action.toLowerCase().includes("création") || log.action.toLowerCase().includes("ajout")) {
          actionClass += " creation";
        } else if (log.action.toLowerCase().includes("modification") || log.action.toLowerCase().includes("mise à jour")) {
          actionClass += " modification";
        } else if (log.action.toLowerCase().includes("suppression") || log.action.toLowerCase().includes("supprimé")) {
          actionClass += " suppression";
        } else if (log.action.toLowerCase().includes("connexion") || log.action.toLowerCase().includes("login")) {
          actionClass += " connexion";
        }
        
        // Formater la date et l'heure
        const formattedDate = formatLogDate(log.date);
        const formattedTime = formatLogTime(log.heure);
        
        row.innerHTML = `
          <td data-label="ID" class="log-id">${log.id}</td>
          <td data-label="Date" class="log-date">${formattedDate}</td>
          <td data-label="Heure" class="log-time">${formattedTime}</td>
          <td data-label="Action" class="${actionClass}">${log.action}</td>
          <td data-label="IP" class="log-ip">${log.ip}</td>
        `;
        logsTableBody.appendChild(row);
      });
    };

    const clearLogs = async () => {
      try {
        const confirmed = await customConfirm("Êtes-vous sûr de vouloir vider tous les logs ? Cette action est irréversible.");
        if (confirmed) {
          const response = await fetch(`${SCRIPT_URL}?action=clearLogs`);
          const result = await response.json();
          if (result.success) {
            await fetchLogs();
            showNotificationWithIcon("Logs vidés avec succès", "success");
          } else {
            showNotificationWithIcon("Erreur lors du vidage des logs", "error");
          }
        }
      } catch (error) {
        console.error("Erreur lors du vidage des logs :", error.message);
        showNotificationWithIcon("Erreur lors du vidage des logs", "error");
      }
    };

    // Initialisation des boutons de logs
    const refreshLogsBtn = document.getElementById("refreshLogsBtn");
    const clearLogsBtn = document.getElementById("clearLogsBtn");
    const toggleLogsTableBtn = document.getElementById("toggleLogsTableBtn");
    const logsTableContainer = document.getElementById("logsTableContainer");

    if (refreshLogsBtn) {
      refreshLogsBtn.addEventListener("click", fetchLogs);
    }

    if (clearLogsBtn) {
      clearLogsBtn.addEventListener("click", clearLogs);
    }

    if (toggleLogsTableBtn && logsTableContainer) {
      toggleLogsTableBtn.addEventListener("click", () => {
        const isVisible = logsTableContainer.style.display !== "none";
        logsTableContainer.style.display = isVisible ? "none" : "block";
        toggleLogsTableBtn.textContent = isVisible ? "🔽 Afficher les logs" : "🔼 Masquer les logs";
      });
    }

    const showError = (message) => {
      errorMessage.textContent = message;
      errorMessage.style.color = "red";
    };
  
    const clearError = () => {
      errorMessage.textContent = "";
    };
  
    // --- Gestion des formations ---
    const fetchFormations = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?action=read`);
        const responseJson = await response.json();
        if (!responseJson || !responseJson.values) {
          formationsData = [];
          renderFormations();
          return;
        }
        formationsData = responseJson.values.map((row) => ({
          id: parseInt(row.id),
          name: row.name,
          availableDates: row.availableDates,
          participants: row.participants,
        }));
        
        // Trier les formations en fonction de leur date la plus proche
        formationsData = sortFormationsByNextDate(formationsData);
        
        window.formationsData = formationsData;
        renderFormations();
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des formations :",
          error.message
        );
      }
      markAllValidatedDates();
    };
    window.fetchFormations = fetchFormations;
  
    // Fonction pour trier les formations par date la plus proche
    function sortFormationsByNextDate(formations) {
      return formations.sort((formationA, formationB) => {
        const nextDateA = getNextDate(formationA.availableDates);
        const nextDateB = getNextDate(formationB.availableDates);
        
        // Si aucune date n'est disponible, placer en dernier
        if (!nextDateA && !nextDateB) return 0;
        if (!nextDateA) return 1; // Formation A n'a pas de date valide, la placer après B
        if (!nextDateB) return -1; // Formation B n'a pas de date valide, la placer après A
        
        // Comparer les dates
        return nextDateA - nextDateB;
      });
    }
    
    function getNextDate(datesStr) {
      if (!datesStr) return null;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Cas spécial: si c'est une seule date sans virgule
      if (!datesStr.includes(',')) {
        const dateObj = tryParseDate(datesStr.trim());
        if (dateObj && !isNaN(dateObj)) {
          return dateObj >= today ? dateObj : null;
        }
        return null;
      }
      
      const dates = datesStr.split(',')
        .map(d => {
          const trimmed = d.trim();
          const dateObj = tryParseDate(trimmed);
          return dateObj;
        })
        .filter(d => d !== null && !isNaN(d) && d >= today)
        .sort((a, b) => a - b);
      
      return dates.length > 0 ? dates[0] : null;
    }
  
    const addFormationToSheet = async (name, dates) => {
      const newId =
        formationsData.length > 0
          ? Math.max(...formationsData.map((f) => f.id)) + 1
          : 1;
      try {
        const url = `${SCRIPT_URL}?action=add&id=${newId}&name=${encodeURIComponent(
          name
        )}&dates=${encodeURIComponent(dates.join(","))}`;
        const response = await fetch(url);
        const result = await response.json();
        await fetchFormations();
        
        // Enregistrer le log
        await recordLog(`Création de la formation "${name}" (ID: ${newId})`);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la formation :", error.message);
      }
    };
  
    const updateFormationInSheet = async (id, name, dates) => {
      try {
        const url = `${SCRIPT_URL}?action=update&id=${id}&name=${encodeURIComponent(
          name
        )}&dates=${encodeURIComponent(dates.join(","))}`;
        const response = await fetch(url);
        const result = await response.json();
        await fetchFormations();
        
        // Enregistrer le log
        await recordLog(`Modification de la formation "${name}" (ID: ${id})`);
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de la formation :",
          error.message
        );
      }
    };
  
    const deleteFormationFromSheet = async (id) => {
      try {
        // Récupérer le nom de la formation avant suppression
        const formation = formationsData.find(f => f.id === id);
        const formationName = formation ? formation.name : `ID ${id}`;
        
        const url = `${SCRIPT_URL}?action=delete&id=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        await fetchFormations();
        
        // Enregistrer le log
        await recordLog(`Suppression de la formation "${formationName}" (ID: ${id})`);
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de la formation :",
          error.message
        );
      }
    };
  
    // --- Affichage des formations ---
    const renderFormations = () => {
      formationsTable.innerHTML = "";
      formationsData.forEach((formation) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${formation.id}</td>
          <td class="data-formation">${formation.name}</td>
          <td>${
            formation.availableDates
              ? renderAvailableDates(formation.availableDates, formation)
              : ""
          }</td>
          <td>
            <button class="edit-formation" data-id="${
              formation.id
            }">✏️ Modifier</button>
            <button class="delete-formation" data-id="${
              formation.id
            }">🗑️ Supprimer</button>
          </td>
        `;
        formationsTable.appendChild(row);
      });
      // Attacher l'événement sur les dates cliquables
      document.querySelectorAll(".clickable-date").forEach((span) => {
        span.addEventListener("click", () => {
          const formationId = span.getAttribute("data-formation-id");
          const dateClicked = span.getAttribute("data-date");
          const formation = formationsData.find(
            (f) => f.id === parseInt(formationId)
          );
          if (formation) {
            showParticipantsModal(formation, dateClicked);
          }
        });
      });
    };
    window.formationsData = formationsData;
  
    function renderAvailableDates(datesStr, formation) {
      if (!datesStr) return "";
      
      // Convertir les dates en objets Date pour le tri
      let dates = [];
      
      // Cas spécial: si c'est une seule date sans virgule
      if (!datesStr.includes(',')) {
        const trimmed = datesStr.trim();
        // Vérifier si c'est une date valide
        const dateObj = tryParseDate(trimmed);
        const isValidDate = dateObj && !isNaN(dateObj);
        let formattedDate = isValidDate ? formatDateToDDMMYYYY(dateObj) : trimmed;
        
        // Ajouter cette date unique à notre tableau
        dates.push({
          original: trimmed,
          formatted: formattedDate,
          date: dateObj,
          isValidDate: isValidDate
        });
      } else {
        // Traiter plusieurs dates séparées par des virgules
        dates = datesStr.split(",").map(d => {
          const trimmed = d.trim();
          // Essayer de parser la date de différentes façons
          const dateObj = tryParseDate(trimmed);
          const isValidDate = dateObj && !isNaN(dateObj);
          let formattedDate = isValidDate ? formatDateToDDMMYYYY(dateObj) : trimmed;
          
          return {
            original: trimmed,
            formatted: formattedDate,
            date: dateObj,
            isValidDate: isValidDate
          };
        });
      }
      
      // Trier les dates par ordre chronologique
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      dates.sort((a, b) => {
        // Si l'un des deux n'est pas une date valide
        if (!a.isValidDate && !b.isValidDate) return 0;
        if (!a.isValidDate) return 1; // a n'est pas une date, le placer après b
        if (!b.isValidDate) return -1; // b n'est pas une date, le placer après a
        
        // Priorité aux dates futures
        const aIsFuture = a.date >= today;
        const bIsFuture = b.date >= today;
        
        if (aIsFuture && !bIsFuture) return -1;
        if (!aIsFuture && bIsFuture) return 1;
        
        // Ensuite, tri chronologique
        return a.date - b.date;
      });
      
      // Créer un conteneur flex pour les dates
      let html = `<div class="dates-container">`;
      
      // Ajouter chaque date au conteneur
      dates.forEach(d => {
        let count = 0;
        if (d.isValidDate) {
          count = formation ? getParticipantsCount(formation, d.formatted) : 0;
        }
        
        // Check if this date is validated
        let isValidated = formation && formation.validatedDates && 
                        formation.validatedDates.split(',').map(date => date.trim()).includes(d.formatted);
        
        let className = "clickable-date";
        let style = "";
        
        if (isValidated) {
          // For validated dates, just add the class and let CSS handle it
          className += " validated-date";
        } else if (d.isValidDate) {
          // For non-validated dates, set the style based on count
          if (count === 0) {
            style = "background: linear-gradient(to right, #f7f7f7, #efefef); color: #555;";
          } else if (count > 0 && count < 6) {
            style = "background: linear-gradient(to right, #fff3e0, #ffe0b2); color: #e67700;";
          } else if (count >= 6) {
            style = "background: linear-gradient(to right, #e8f5e9, #c8e6c9); color: #2e7d32;";
          }
        } else {
          // Pour les valeurs qui ne sont pas des dates
          style = "background: linear-gradient(to right, #f5f5f5, #e0e0e0); color: #757575; font-style: italic;";
        }
        
        // Afficher le nombre de participants seulement pour les dates valides
        const displayText = d.isValidDate ? `${d.formatted} (${count}/12)` : d.formatted;
        
        html += `<span class="${className}" data-formation-id="${formation.id}" data-date="${d.formatted}" 
                style="${style}">
                ${displayText}</span>`;
      });
      
      // Fermer le conteneur
      html += `</div>`;
      
      return html;
    }
  
    // --- Gestion des demandes en attente ---
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?action=readPending`);
        const responseJson = await response.json();
        if (!responseJson || !responseJson.values) {
          pendingRequests = [];
          renderPendingRequests();
          return;
        }
        pendingRequests = responseJson.values;
        renderPendingRequests();
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des demandes en attente :",
          error.message
        );
      }
    };
  
    const renderPendingRequests = () => {
      const container = document.getElementById("pendingRequests");
      if (!pendingRequests || pendingRequests.length === 0) {
        container.innerHTML =
          `<h3 class="section-title title-requests"><span class="emoji">🔔</span>Demandes en attente</h3><p>Aucune demande de formation en attente.. :(</p>`;
      } else {
        container.innerHTML = `
          <h3 class="section-title title-requests"><span class="emoji">🔔</span>Demandes en attente</h3>
          <table id="pendingRequestsTable" border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Manager</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Formation</th>
                <th>Date</th>
                <th>Message</th>
                <th>Employees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        `;
        const pendingRequestsTable = document.getElementById(
          "pendingRequestsTable"
        );
        const tbody = pendingRequestsTable.querySelector("tbody");
  
        pendingRequests.forEach((req) => {
          let formattedDate = req.date;
          if (req.date) {
            let d = new Date(req.date);
            if (!isNaN(d)) {
              let dd = d.getDate().toString().padStart(2, "0");
              let mm = (d.getMonth() + 1).toString().padStart(2, "0");
              let yyyy = d.getFullYear();
              formattedDate = `${dd}/${mm}/${yyyy}`;
            }
          }
          let employeesFormatted = "";
          try {
            const empArray = JSON.parse(req.employees);
            if (Array.isArray(empArray)) {
              employeesFormatted = empArray
                .map(
                  (emp) =>
                    `${emp.matricule} - ${emp.nameEmployee} (${emp.entity})`
                )
                .join("<br>");
            } else {
              employeesFormatted = req.employees;
            }
          } catch (e) {
            employeesFormatted = req.employees;
          }
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${req.id}</td>
            <td>${req.manager}</td>
            <td>${req.email}</td>
            <td>${req.telephone}</td>
            <td>${req.formation}</td>
            <td>${formattedDate}</td>
            <td>${req.message}</td>
            <td class="employeesList">${employeesFormatted}</td>
            <td>
              <button class="btn-accept" data-id="${req.id}">✅ Accepter</button>
              <button class="btn-refuse" data-id="${req.id}">❌ Refuser</button>
            </td>
          `;
          tbody.appendChild(row);
        });
        
        // Ajouter un seul event listener sur le tbody
        tbody.addEventListener("click", (e) => {
          const target = e.target;
          const id = parseInt(target.getAttribute("data-id"));
          if (target.classList.contains("btn-accept")) {
            acceptRequest(id);
          }
          if (target.classList.contains("btn-refuse")) {
            rejectRequest(id);
          }
        });
      }
    };
  
    const acceptRequest = async (id) => {
      try {
        showNotification("Acceptation en cours...");
        
        const url = `${SCRIPT_URL}?action=accept&id=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success) {
          await fetchPendingRequests();
          await fetchFormations();
          showNotification("✅ Vous venez d'accepter la demande");
          
          // Enregistrer le log
          await recordLog(`Acceptation de la demande de formation (ID: ${id})`);
        } else {
          throw new Error(result.error || "Erreur lors de l'acceptation");
        }
      } catch (error) {
        console.error("Erreur lors de l'acceptation de la demande :", error.message);
        showNotification(`❌ Erreur : ${error.message}`);
      }
    };
  
    const rejectRequest = async (id) => {
      try {
        showNotification("Rejet en cours...");
        
        const url = `${SCRIPT_URL}?action=deletePending&id=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success) {
          await fetchPendingRequests();
          showNotification("🗑️ Vous avez rejeté la demande");
          
          // Enregistrer le log
          await recordLog(`Refus de la demande de formation (ID: ${id})`);
        } else {
          throw new Error(result.error || "Erreur lors du refus");
        }
      } catch (error) {
        console.error("Erreur lors du refus de la demande :", error.message);
        showNotification(`❌ Erreur : ${error.message}`);
      }
    };
  
    /* --- Modal Formation --- */
    let isEditing = false;
    let editingFormationId = null;
    const showModal = (title, formation = null) => {
      modalTitle.textContent = title;
      formationNameInput.value = formation ? formation.name : "";
      if (formation && formation.availableDates) {
        // Split the availableDates string by comma, trim each one, then format.
        formationDatesInput.value = formation.availableDates
          .split(",")
          .map((date) => formatDateToDDMMYYYY(date.trim()))
          .join(", ");
      } else {
        formationDatesInput.value = "";
      }
      isEditing = !!formation;
      editingFormationId = formation ? formation.id : null;
      formationModal.style.display = "flex";
    };
  
    const hideModal = () => {
      formationModal.style.display = "none";
      formationForm.reset();
    };
  
    if (getCookie("adminAuth") === "true") {
      fetchFormations();
      fetchPendingRequests();
      fetchLogs();
      // Enregistrer un log de connexion automatique
      recordLog("Connexion administrateur automatique (cookie)");
    }
  
    submitLogin.addEventListener("click", () => {
      const username = usernameField.value.trim();
      const password = passwordField.value;
      if (username === validUsername && password === validPassword) {
        clearError();
        setCookie("adminAuth", "true", 7);
        adminLogin.style.display = "none";
        document.getElementById("adminPanel").style.display = "flex";
        fetchFormations();
        fetchPendingRequests();
        fetchLogs();
        // Enregistrer un log de connexion manuelle
        recordLog(`Connexion administrateur manuelle (utilisateur: ${username})`);
      } else {
        showError("Identifiant ou mot de passe incorrect.");
      }
    });
  
    logoutButton.addEventListener("click", () => {
      document.getElementById("adminPanel").style.display = "none";
      adminLogin.style.display = "flex";
      usernameField.value = "";
      passwordField.value = "";
      clearError();
      eraseCookie("adminAuth");
    });
  
    addFormationButton.addEventListener("click", () => {
      showModal("Ajouter une Formation");
    });
  
    // On submit, we assume the user's input is in "dd/mm/yyyy" format
    formationForm.addEventListener("submit", async (e) => {
      showNotification("Enregistrement en cours, veuillez patienter..");
      setTimeout(() => {
        showNotification("Formation enregistrée avec succès !");
      }, 4000);
      e.preventDefault();
      const name = formationNameInput.value.trim();
      // Here, we assume the availableDates should be stored in dd/mm/yyyy format.
      const dates = formationDatesInput.value.split(",").map((d) => d.trim());
      if (isEditing) {
        await updateFormationInSheet(editingFormationId, name, dates);
      } else {
        await addFormationToSheet(name, dates);
      }
      hideModal();
    });
  
    closeModalButton.addEventListener("click", hideModal);
  
    formationsTable.addEventListener("click", async (e) => {
      const target = e.target;
      const id = parseInt(target.getAttribute("data-id"));
      if (target.classList.contains("edit-formation")) {
        const formation = formationsData.find((f) => f.id === id);
        showModal("Modifier une Formation", formation);
      } else if (target.classList.contains("delete-formation")) {
        const ok = await customConfirm(
          "Êtes-vous sûr de vouloir supprimer cette formation ?"
        );
        if (ok) {
          showNotification("Suppression en cours, veuillez patienter..");
          setTimeout(() => {
            showNotification("Formation supprimée avec succès !");
          }, 4000);
          await deleteFormationFromSheet(id);
        }
      }
    });
  
    // Gestion du bouton toggle pour le tableau des formations
    const toggleFormationsTableBtn = document.getElementById('toggleFormationsTableBtn');
    const formationsTableContainer = document.getElementById('formationsTableContainer');
    
    // Variable pour suivre l'état du tableau (visible par défaut)
    let isTableVisible = true;
    
    if (toggleFormationsTableBtn && formationsTableContainer) {
      toggleFormationsTableBtn.addEventListener('click', () => {
        // Inverser l'état de visibilité
        isTableVisible = !isTableVisible;
        
        if (isTableVisible) {
          // Afficher le tableau - réinitialiser toutes les propriétés CSS
          formationsTableContainer.style.display = 'block';
          formationsTableContainer.style.maxHeight = 'none';
          formationsTableContainer.style.opacity = '1';
          formationsTableContainer.style.marginTop = '';
          formationsTableContainer.style.marginBottom = '';
          formationsTableContainer.style.padding = '';
          formationsTableContainer.style.border = '';
          formationsTableContainer.style.visibility = 'visible';
          formationsTableContainer.style.overflow = '';
          formationsTableContainer.style.height = '';
          toggleFormationsTableBtn.textContent = '🔽 Masquer le tableau';
          toggleFormationsTableBtn.classList.remove('collapsed');
        } else {
          // Masquer le tableau
          formationsTableContainer.style.maxHeight = '0';
          formationsTableContainer.style.opacity = '0';
          formationsTableContainer.style.marginTop = '0';
          formationsTableContainer.style.marginBottom = '0';
          formationsTableContainer.style.padding = '0';
          formationsTableContainer.style.border = 'none';
          formationsTableContainer.style.visibility = 'hidden';
          formationsTableContainer.style.overflow = 'hidden';
          
          // Après la transition, masquer complètement l'élément
          setTimeout(() => {
            if (!isTableVisible) {
              formationsTableContainer.style.display = 'none';
            }
          }, 500); // Correspond à la durée de la transition CSS
          
          toggleFormationsTableBtn.textContent = '🔼 Afficher le tableau';
          toggleFormationsTableBtn.classList.add('collapsed');
        }
      });
    }
  }
  
  function customConfirm(message) {
    return new Promise((resolve) => {
      const modal = document.getElementById("confirmModal2");
      const confirmMessage = document.getElementById("confirmMessage2");
      const btnYes = document.getElementById("confirmYes2");
      const btnNo = document.getElementById("confirmNo2");
  
      confirmMessage.textContent = message;
      modal.style.display = "block";
  
      function cleanUp() {
        modal.style.display = "none";
        btnYes.removeEventListener("click", onYes);
        btnNo.removeEventListener("click", onNo);
      }
  
      function onYes() {
        cleanUp();
        resolve(true);
      }
      function onNo() {
        cleanUp();
        resolve(false);
      }
  
      btnYes.addEventListener("click", onYes);
      btnNo.addEventListener("click", onNo);
    });
  }
  
  /* =================== Modal Participants =================== */
  function showParticipantsModal(formation, date) {
    const modal = document.getElementById("participantsModal");
    const modalDate = document.getElementById("modalDate");
    const modalTitle = document.getElementById("formation-name-modal");
    const participantsList = document.getElementById("participantsList");
    modalDate.textContent = date;
    modalTitle.textContent = formation.name;
  
    // ============ FIX BUG: Nettoyer les anciens event listeners ============
    // Méthode fiable pour supprimer tous les event listeners : cloner les éléments
    const validerBtn = document.getElementById("validerFormation");
    const generateBtn = document.getElementById("generateDocs");
    
    // Cloner les boutons pour supprimer tous les event listeners
    const newValiderBtn = validerBtn.cloneNode(true);
    const newGenerateBtn = generateBtn.cloneNode(true);
    
    // Remplacer les anciens boutons par les nouveaux
    validerBtn.parentNode.replaceChild(newValiderBtn, validerBtn);
    generateBtn.parentNode.replaceChild(newGenerateBtn, generateBtn);
    // ========================================================================
  
    // Fonction pour recharger la formation depuis le serveur
    const refreshFormationData = async () => {
      try {
        // Recharger toutes les formations depuis le serveur
        await window.fetchFormations();
        // Trouver la formation mise à jour par ID
        const updatedFormation = window.formationsData.find(f => f.id === formation.id);
        if (updatedFormation) {
          // Mettre à jour la variable formation avec les nouvelles données
          formation = updatedFormation;
          return formation;
        }
      } catch (error) {
        console.error("Erreur lors du rechargement de la formation:", error);
      }
      return formation;
    };
  
    // Extraction de tous les blocs pour la date concernée
    const regex = /(\[.*?\])\s*\((.*?)\)/g;
    let blocks = [];
    let match;
    const targetDate = parseDDMMYYYY(date);
    while ((match = regex.exec(formation.participants)) !== null) {
      try {
        let storedDate = new Date(match[2]);
        if (isSameDate(storedDate, targetDate)) {
          blocks.push(match[0]);
        }
      } catch (e) {
        console.error("Erreur lors du parsing des blocs :", e);
      }
    }
  
    // Pour l'affichage, on reconstitue la liste des employés à partir de chaque bloc
    let participants = [];
    blocks.forEach((block) => {
      const m = block.match(/(\[.*?\])\s*\((.*?)\)/);
      if (m && m[1]) {
        try {
          const empData = JSON.parse(m[1]);
          let empArray = Array.isArray(empData) ? empData : [empData];
          participants = participants.concat(empArray);
        } catch (e) {
          console.error("Erreur lors du parsing d'un bloc :", e);
        }
      }
    });
  
    let htmlContent = "";
    if (participants.length === 0) {
      htmlContent += "<p>Aucun participant pour cette date.</p>";
    } else {
      htmlContent += `
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background-color:#f9f9f9;">
              <th style="padding:8px; border:1px solid #ddd;">N°</th>
              <th style="padding:8px; border:1px solid #ddd;">Matricule</th>
              <th style="padding:8px; border:1px solid #ddd;">Nom/Prenom</th>
              <th style="padding:8px; border:1px solid #ddd;">Entité</th>
              <th style="padding:8px; border:1px solid #ddd;">Action</th>
            </tr>
          </thead>
          <tbody>
      `;
      // Affichage dans l'ordre des blocs (chaque bloc correspond à un ajout)
      let blockList = getBlocks(formation.participants).filter((b) => {
        let d = new Date(b.date);
        return isSameDate(d, targetDate);
      });
      blockList.forEach((block, index) => {
        try {
          const empData = JSON.parse(block.json);
          // Chaque bloc est un tableau contenant un seul objet
          const emp = Array.isArray(empData) ? empData[0] : empData;
          htmlContent += `
            <tr>
              <td style="padding:8px; border:1px solid #ddd;">${index + 1}</td>
              <td style="padding:8px; border:1px solid #ddd;">${
                emp.matricule
              }</td>
              <td style="padding:8px; border:1px solid #ddd;">${
                emp.nameEmployee
              }</td>
              <td style="padding:8px; border:1px solid #ddd;">${emp.entity}</td>
              <td style="padding:8px; border:1px solid #ddd;">
                <button class="btn-remove-participant" data-index="${index}">Retirer</button>
              </td>
            </tr>
          `;
        } catch (e) {
          console.error("Erreur lors de l'affichage d'un bloc :", e);
        }
      });
      htmlContent += `
          </tbody>
        </table>
      `;
    }
  
    // Section d'ajout manuel d'un participant
    htmlContent += `
      <div id="addParticipantSection" style="margin-top:15px;">
        <h4>Ajouter un participant</h4>
        <input type="text" id="newMatricule" placeholder="Matricule" style="margin-right:5px;" />
        <input type="text" id="newName" placeholder="Nom/Prénom" style="margin-right:5px;" />
        <input type="text" id="newEntity" placeholder="Entité" style="margin-right:5px;" />
        <button id="btnAddParticipant">Ajouter participant(e)</button>
      </div>
    `;
  
    participantsList.innerHTML = htmlContent;
    modal.style.display = "flex";
  
    // Gestion de l'ajout d'un participant
    document.getElementById("btnAddParticipant").addEventListener("click", () => {
      document.getElementById("btnAddParticipant").disabled = true;
      const matricule = document.getElementById("newMatricule").value.trim();
      const nameEmployee = document.getElementById("newName").value.trim();
      const entity = document.getElementById("newEntity").value.trim();
      if (!matricule || !nameEmployee || !entity) {
        document.getElementById("btnAddParticipant").disabled = false;
        showNotification("Veuillez remplir tous les champs.");
        return;
      }
      showNotification("Ajout en cours, veuillez patienter..");
      
      // Stocker les informations pour réouvrir le modal après le refresh
      sessionStorage.setItem('reopenParticipantsModal', JSON.stringify({
        formationId: formation.id,
        formationName: formation.name,
        date: date
      }));
      
      const newParticipant = { matricule, nameEmployee, entity };
      addParticipantToFormation(formation, date, newParticipant);

      setTimeout(() => {
        smoothRefresh("Participant ajouté avec succès !");
      }, 2500);
    });
  
    // Gestion de la suppression d'un participant
    document.querySelectorAll(".btn-remove-participant").forEach((btn) => {
      btn.addEventListener("click", () => {
        // Désactiver le bouton pour éviter les double-clics
        btn.disabled = true;
        showNotification("Suppression en cours, veuillez patienter..");
        
        // Stocker les informations pour réouvrir le modal après le refresh
        sessionStorage.setItem('reopenParticipantsModal', JSON.stringify({
          formationId: formation.id,
          formationName: formation.name,
          date: date
        }));
        
        const index = parseInt(btn.getAttribute("data-index"));
        removeParticipantFromFormation(formation, date, index);
        
        setTimeout(() => {
          smoothRefresh("Participant supprimé avec succès !");
        }, 2500);
      });
    });
  
    // ============ NOUVEAUX EVENT LISTENERS (appliqués aux nouveaux boutons) ============
    document.getElementById("validerFormation").addEventListener("click", () => {
      document.getElementById("trainerModal").style.display = "flex";
    });

    document.getElementById("generateDocs").addEventListener("click", async () => {
      if (!formation || !date) {
        showNotification("Veuillez sélectionner une formation et une date");
        return;
      }

      // Synchroniser toutes les données avant la génération
      const syncSuccess = await syncAllData();
      if (!syncSuccess) {
        showNotification("Erreur lors de la synchronisation. Génération annulée.");
        return;
      }
      
      // Recharger les données de la formation après synchronisation
      const freshFormation = await refreshFormationData();
      
      // Attendre un peu pour s'assurer que les données sont bien synchronisées
      await new Promise(resolve => setTimeout(resolve, 1000));

      await downloadAllQCMs(freshFormation, date);
      await downloadAllEval(freshFormation, date);
      showNotification("Documents genérés avec succès !");
    });
    // ================================================================================

    document.getElementById("closeTrainerModal").addEventListener("click", () => {
      document.getElementById("trainerModal").style.display = "none";
    });
  
    // ============ FIX BUG: Nettoyer les event listeners du modal formateur ============
    // Supprimer tous les anciens event listeners des éléments du modal formateur
    const morningStart = document.getElementById("morningStart");
    const morningEnd = document.getElementById("morningEnd");
    const afternoonStart = document.getElementById("afternoonStart");
    const afternoonEnd = document.getElementById("afternoonEnd");
    const clearMorning = document.getElementById("clearMorning");
    const clearAfternoon = document.getElementById("clearAfternoon");
    const downloadGENEMARBtn = document.getElementById("downloadGENEMARBtn");
    const addEventBtn = document.getElementById("addEvent");

    // Cloner les éléments pour supprimer tous les event listeners
    const newMorningStart = morningStart.cloneNode(true);
    const newAfternoonStart = afternoonStart.cloneNode(true);
    const newClearMorning = clearMorning.cloneNode(true);
    const newClearAfternoon = clearAfternoon.cloneNode(true);
    const newDownloadGENEMARBtn = downloadGENEMARBtn.cloneNode(true);
    const newAddEventBtn = addEventBtn.cloneNode(true);

    // Remplacer les anciens éléments par les nouveaux
    morningStart.parentNode.replaceChild(newMorningStart, morningStart);
    afternoonStart.parentNode.replaceChild(newAfternoonStart, afternoonStart);
    clearMorning.parentNode.replaceChild(newClearMorning, clearMorning);
    clearAfternoon.parentNode.replaceChild(newClearAfternoon, clearAfternoon);
    downloadGENEMARBtn.parentNode.replaceChild(newDownloadGENEMARBtn, downloadGENEMARBtn);
    addEventBtn.parentNode.replaceChild(newAddEventBtn, addEventBtn);
    // ================================================================================

    // Mettre à jour automatiquement l'heure de fin du matin en ajoutant 3h30 au début
    document
      .getElementById("morningStart")
      .addEventListener("change", function () {
        const start = this.value; // Exemple : "09:00"
        if (start) {
          const [hour, minute] = start.split(":").map(Number);
          let endHour = hour;
          let endMinute = minute + 30; // ajout de 30 minutes
          if (endMinute >= 60) {
            endMinute -= 60;
            endHour += 1;
          }
          endHour += 3; // ajout de 3 heures supplémentaires
          // Formater l'heure en HH:MM
          const formattedEnd = `${endHour.toString().padStart(2, "0")}:${endMinute
            .toString()
            .padStart(2, "0")}`;
          document.getElementById("morningEnd").value = formattedEnd;
        }
      });
  
    document
      .getElementById("afternoonStart")
      .addEventListener("change", function () {
        const start = this.value; // Exemple : "14:00"
        if (start) {
          const [hour, minute] = start.split(":").map(Number);
          let endHour = hour;
          let endMinute = minute + 30; // ajout de 30 minutes
          if (endMinute >= 60) {
            endMinute -= 60;
            endHour += 1;
          }
          endHour += 3; // ajout de 3 heures supplémentaires
          // Formater l'heure en HH:MM
          const formattedEnd = `${endHour.toString().padStart(2, "0")}:${endMinute
            .toString()
            .padStart(2, "0")}`;
          document.getElementById("afternoonEnd").value = formattedEnd;
        }
      });
  
    // Bouton pour effacer la plage horaire du matin
    document
      .getElementById("clearMorning")
      .addEventListener("click", function () {
        document.getElementById("morningStart").value = "";
        document.getElementById("morningEnd").value = "";
      });
  
    // Bouton pour effacer la plage horaire de l'après-midi
    document
      .getElementById("clearAfternoon")
      .addEventListener("click", function () {
        document.getElementById("afternoonStart").value = "";
        document.getElementById("afternoonEnd").value = "";
      });
  
    document
      .getElementById("downloadGENEMARBtn")
      .addEventListener("click", async () => {
        let trainerType = document.getElementById("trainerType").value;
        let trainerName = document.getElementById("trainerName").value;
        let trainerAdress = document.getElementById("trainerAdress").value;
        let distanceInput = document.getElementById("distanceInput").value;
        let tarifSalle = document.getElementById("tarifSalle").value;
        let tarifRepas = document.querySelector('input[name="repas"]:checked')?.value || "Non";
        let morningStart = document.getElementById("morningStart").value;
        let morningEnd = document.getElementById("morningEnd").value;
        let afternoonStart = document.getElementById("afternoonStart").value;
        let afternoonEnd = document.getElementById("afternoonEnd").value;
  
        // Synchroniser toutes les données avant la génération
        const syncSuccess = await syncAllData();
        if (!syncSuccess) {
          showNotification("Erreur lors de la synchronisation. Génération annulée.");
          return;
        }
        
        // Recharger les données de la formation après synchronisation
        const freshFormation = await refreshFormationData();
        
        // Attendre un peu pour s'assurer que les données sont bien synchronisées
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        downloadGENEMARDoc(
          freshFormation,
          {
            type: trainerType,
            name: trainerName,
            adress: trainerAdress,
            morningStart,
            morningEnd,
            afternoonStart,
            afternoonEnd,
          },
          date
        );
        showNotification("Document GEN-EMAR généré avec succès !");
        downloadAttendanceListWord(freshFormation, date);
        downloadAllConvocations(
          freshFormation,
          {
            type: trainerType,
            name: trainerName,
            adress: trainerAdress,
            morningStart,
            morningEnd,
            afternoonStart,
            afternoonEnd,
            distanceInput,
            tarifSalle,
            tarifRepas,
          },
          date
        );
        const uniqueEntities = getUniqueEntitiesForDate(freshFormation, date);
        for (const entity of uniqueEntities) {
          downloadConventionDocForEntity(
            freshFormation,
            {
              type: trainerType,
              name: trainerName,
              adress: trainerAdress,
              morningStart,
              morningEnd,
              afternoonStart,
              afternoonEnd,
              distanceInput,
              tarifSalle,
              tarifRepas,
            },
            date,
            entity
          );
        }
      });
  
    document.getElementById("addEvent").addEventListener("click", () => {
      let trainerName = document.getElementById("trainerName").value;
      let trainerAdress = document.getElementById("trainerAdress").value;
      let morningStart = document.getElementById("morningStart").value;
      let morningEnd = document.getElementById("morningEnd").value;
      let afternoonStart = document.getElementById("afternoonStart").value;
      let afternoonEnd = document.getElementById("afternoonEnd").value;
      generateOutlookEvent(
      formation.name,
      {
        startTime: morningStart || afternoonStart,
        endTime: afternoonEnd || morningEnd,
        date: date, // format DD/MM/YYYY
        trainerName,
        address: trainerAdress
      },
      formation
    );
  });
  document
    .getElementById("generateDocs")
    .addEventListener("click", async () => {
      if (!formation || !date) {
        showNotification("Veuillez sélectionner une formation et une date");
        return;
      }
  
      // Synchroniser toutes les données avant la génération
      const syncSuccess = await syncAllData();
      if (!syncSuccess) {
        showNotification("Erreur lors de la synchronisation. Génération annulée.");
        return;
      }
      
      // Recharger les données de la formation après synchronisation
      const freshFormation = await refreshFormationData();
      
      // Attendre un peu pour s'assurer que les données sont bien synchronisées
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      await downloadAllQCMs(freshFormation, date);
      await downloadAllEval(freshFormation, date);
      showNotification("Documents genérés avec succès !");
    });
  
  }
  async function markAllValidatedDates() {
    const url = `${SCRIPT_URL}?action=readRefConventions`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      
      if (!data || !data.values || data.values.length === 0) {
        console.warn("No validated conventions records found.");
        return;
      }
      
      // Iterate over each record from the Ref_conventions sheet
      data.values.forEach(record => {
        // Normalize formation name and date from the sheet
        const recordFormation = (record.FORMATION || "").trim().toLowerCase();
        const recordDate = formatDateToDDMMYYYY(record.DATE || "");
        
        // Ensure that window.formationsData is loaded
        if (window.formationsData && Array.isArray(window.formationsData)) {
          window.formationsData.forEach(formation => {
            // Normalize the formation name by removing any trailing " (Validée)" (case-insensitive)
            let normalizedFormationName = formation.name
              ? formation.name.trim().toLowerCase().replace(/\s*\(validée\)$/i, '')
              : "";
            
            if (normalizedFormationName === recordFormation) {
              // Build the selector based on formation id and the validated date
              const selector = `.clickable-date[data-formation-id="${formation.id}"][data-date="${recordDate}"]`;
              const dateElements = document.querySelectorAll(selector);
              
              // Add the CSS class if matching elements are found
              dateElements.forEach(elem => {
                elem.classList.add("validated-date");
              });
            }
          });
        } else {
          console.warn("window.formationsData is not available or not an array.");
        }
      });
    } catch (error) {
      console.error("Error marking validated dates globally:", error);
    }
  }
  
  
  function generateOutlookEvent(formationName, { startTime, endTime, date, trainerName, address }, formation) {
    const targetDate = parseDDMMYYYY(date);
    // Filtrer par date
    const participantsBlocks = getBlocks(formation.participants).filter((b) => {
      const d = new Date(b.date);
      return isSameDate(d, targetDate);
    });
  
    const participants = participantsBlocks.map((block) => {
      try {
        const empData = JSON.parse(block.json);
        return Array.isArray(empData) ? empData[0] : empData;
      } catch (e) {
        console.error("Erreur lors du parsing d'un bloc :", e);
        return null;
      }
    });
  
    // Construire la liste des participants
  
    let participantsList = participants
      .map((emp, index) => `${index + 1}. ${emp.matricule} - ${emp.nameEmployee} - ${emp.entity}`)
      .filter((emp) => emp !== null)
      .join('\\n');
  
    console.log('Participants list:', participantsList);
      
  
    // Convertir la date au format ISO (YYYY-MM-DD)
    const [dd, mm, yyyy] = date.split('/');
    const isoDate = `${yyyy}-${mm}-${dd}`;
    
    // Formater les heures
    const formatTime = (time) => time ? time.replace(':', '') + '00' : '090000';
    
    // Créer le lien universel Outlook
    const outlookLink = `https://outlook.live.com/calendar/0/deeplink/compose?` +
      `allday=false&` +
      `path=/calendar/action/compose&` +
      `startdt=${isoDate}T${formatTime(startTime)}&` +
      `enddt=${isoDate}T${formatTime(endTime)}&` +
      `subject=${encodeURIComponent(`Formation ${formationName}`)}&` +
      `body=${encodeURIComponent(`Formateur: ${trainerName}\nAdresse: ${address}\nParticipants:\n ${participantsList}\n`)}&` +
      `location=${encodeURIComponent(address)}`;
  
  
    // Générer un .ics de secours
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${isoDate}T${formatTime(startTime)}`,
      `DTEND:${isoDate}T${formatTime(endTime)}`,
      `SUMMARY:Formation ${formationName}`,
      `DESCRIPTION:Formateur: ${trainerName}\\nAdresse: ${address}\\nParticipants:\\n ${participantsList}\\n`,
      `LOCATION:${address}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  
    // Téléchargement automatique du .ics
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Evenement-${formationName}.ics`;
    a.click();
  }
  
  function downloadAttendanceListWord(formation, date) {
    // Convert the date (format DD/MM/YYYY) to a Date object
    const targetDate = parseDDMMYYYY(date);
  
    // Filter the participant blocks for the target date
    const blocks = getBlocks(formation.participants).filter((b) => {
      const d = new Date(b.date);
      return isSameDate(d, targetDate);
    });
  
    // Build table header row
    const headerRow = new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ text: "N°", bold: true })] }),
        new TableCell({
          children: [new Paragraph({ text: "Matricule", bold: true })],
        }),
        new TableCell({
          children: [new Paragraph({ text: "Nom / Prénom", bold: true })],
        }),
        new TableCell({
          children: [new Paragraph({ text: "Entité", bold: true })],
        }),
      ],
    });
  
    // Build table rows for each participant
    const rows = blocks
      .map((block, index) => {
        try {
          const empData = JSON.parse(block.json);
          const emp = Array.isArray(empData) ? empData[0] : empData;
          return new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(String(index + 1))] }),
              new TableCell({ children: [new Paragraph(emp.matricule)] }),
              new TableCell({ children: [new Paragraph(emp.nameEmployee)] }),
              new TableCell({ children: [new Paragraph(emp.entity)] }),
            ],
          });
        } catch (e) {
          console.error("Erreur lors du parsing d'un bloc :", e);
          return null;
        }
      })
      .filter((row) => row !== null);
  
    const table = new Table({
      rows: [headerRow, ...rows],
      width: { size: 100, type: "pct" },
    });
  
    // Create the document with a header, date, table and signature
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: formation.name,
              heading: "Heading1",
              spacing: { after: 300 },
            }),
            new Paragraph({ text: `Date : ${date}`, spacing: { after: 300 } }),
            new Paragraph({
              text: "Liste d'appel :",
              heading: "Heading2",
              spacing: { after: 200 },
            }),
            table,
          ],
        },
      ],
    });
  
    // Generate the document and trigger download
    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formation.name}_${date}_liste_appel.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
  
  function prepareTableauData(formation, date) {
    const targetDate = parseDDMMYYYY(date);
    const blocks = getBlocks(formation.participants).filter((b) => {
      const d = new Date(b.date);
      return isSameDate(d, targetDate);
    });
  
    // Construire la liste des participants
    let tableauData = blocks
      .map((b, index) => {
        try {
          const empData = JSON.parse(b.json);
          const emp = Array.isArray(empData) ? empData[0] : empData;
          return {
            NOM_PRENOM: emp.nameEmployee,
            MATRICULE: emp.matricule,
            ENTITE: emp.entity,
            MATIN: "", // champ vide pour l'instant
            APRES_MIDI: "", // idem
          };
        } catch (e) {
          console.error("Erreur lors du parsing d'un bloc :", e);
          return null;
        }
      })
      .filter((item) => item !== null);
  
    // Si on a moins de 12 participants, on complète avec des lignes vides
    while (tableauData.length < 12) {
      tableauData.push({
        NOM_PRENOM: "",
        MATRICULE: "",
        ENTITE: "",
        MATIN: "",
        APRES_MIDI: "",
      });
    }
  
    return tableauData;
  }
  
  function prepareTableauDataForEntity(formation, date, entity) {
    const targetDate = parseDDMMYYYY(date);
    // Filtrer par date
    const blocks = getBlocks(formation.participants).filter((b) => {
      const d = new Date(b.date);
      return isSameDate(d, targetDate);
    });
  
    // Construire la liste des participants de l'entité demandée
    let tableauData = blocks
      .map((b) => {
        try {
          const empData = JSON.parse(b.json);
          const emp = Array.isArray(empData) ? empData[0] : empData;
          // Vérifier que l'entité du stagiaire correspond à `entity`
          if (emp.entity.trim().toLowerCase() === entity.trim().toLowerCase()) {
            return {
              NOM_PRENOM: emp.nameEmployee,
              MATRICULE: emp.matricule,
              ENTITE: emp.entity,
              MATIN: "",
              APRES_MIDI: "",
            };
          } else {
            return null;
          }
        } catch (e) {
          console.error("Erreur lors du parsing d'un bloc :", e);
          return null;
        }
      })
      .filter((item) => item !== null);
  
    // Compléter jusqu'à 12 lignes si vous le souhaitez
    while (tableauData.length < 12) {
      tableauData.push({
        NOM_PRENOM: "",
        MATRICULE: "",
        ENTITE: "",
        MATIN: "",
        APRES_MIDI: "",
      });
    }
  
    return tableauData;
  }
  
  // Fonction pour déterminer la durée en fonction du nom de la formation
  function getHeures(formationName) {
    const nameLower = formationName.toLowerCase();
    if (
      nameLower.includes("jtf") ||
      nameLower.includes("for06") ||
      nameLower.includes("for006") ||
      nameLower.includes("for07") ||
      nameLower.includes("for007") ||
      nameLower.includes("for09") ||
      nameLower.includes("for009") ||
      nameLower.includes("for010") ||
      nameLower.includes("for10")
    ) {
      return "7";
    } else if (
      nameLower.includes("for001") ||
      nameLower.includes("for02") ||
      nameLower.includes("for002") ||
      nameLower.includes("for04") ||
      nameLower.includes("for004") ||
      nameLower.includes("for011") ||
      nameLower.includes("for11") ||
      nameLower.includes("for012") ||
      nameLower.includes("for12") ||
      nameLower.includes("for016") ||
      nameLower.includes("for16") ||
      nameLower.includes("for018") ||
      nameLower.includes("for18")
    ) {
      return "3.5";
    }
    return "";
  }
  
  function getFormationCode(formationName) {
    const nameLower = formationName.toLowerCase();
    if (nameLower.includes("for001")) {
      return "FOR001";
    } else if (nameLower.includes("for02") || nameLower.includes("for002")) {
      return "FOR002";
    } else if (nameLower.includes("for03") || nameLower.includes("for003")) {
      return "FOR003";
    } else if (nameLower.includes("for04") || nameLower.includes("for004")) {
      return "FOR004";
    } else if (nameLower.includes("for06") || nameLower.includes("for006")) {
      return "FOR006";
    } else if (nameLower.includes("for07") || nameLower.includes("for007")) {
      return "FOR007";
    } else if (nameLower.includes("for09") || nameLower.includes("for009")) {
      return "FOR009";
    } else if (nameLower.includes("for010") || nameLower.includes("for10")) {
      return "FOR010";
    } else if (nameLower.includes("for011") || nameLower.includes("for11")) {
      return "FOR011";
    } else if (nameLower.includes("for012") || nameLower.includes("for12")) {
      return "FOR012";
    } else if (nameLower.includes("for016") || nameLower.includes("for16")) {
      return "FOR016";
    } else if (nameLower.includes("for018") || nameLower.includes("for18")) {
      return "FOR018";
    } else if (nameLower.includes("jtf")) {
      return "JTF";
    }
    return "";
  }
  
  /**
   * Retourne le titre complet de la formation (FOR001 - Les bases, etc.)
   * en fonction du nom de la formation (for01, for001, etc.)
   */
  function getTitreFormation(formationName) {
    console.log("getTitreFormation", formationName);
    // Normaliser en minuscule pour ignorer la casse
    const nameLower = formationName.toLowerCase();
  
    if (nameLower.includes("for001")) {
      return "FOR001 - Les bases de l'agent de service";
    } else if (nameLower.includes("for02") || nameLower.includes("for002")) {
      return "FOR002 - Les règles d'hygiène et de sécurité";
    } else if (nameLower.includes("for03") || nameLower.includes("for003")) {
      return "FOR003 - Adopter les bonnes attitudes de services";
    } else if (nameLower.includes("for04") || nameLower.includes("for004")) {
      return "FOR004 - Réaliser l'entretien d'un bureau et d'un sanitaire";
    } else if (nameLower.includes("for06") || nameLower.includes("for006")) {
      return "FOR006 - Réaliser un lustrage et un spray méthode";
    } else if (nameLower.includes("for07") || nameLower.includes("for007")) {
      return "FOR007 - Réaliser un décapage suivi d'une pose d'émulsion";
    } else if (nameLower.includes("for09") || nameLower.includes("for009")) {
      return "FOR009 - Réaliser un récurage à la monobrosse";
    } else if (nameLower.includes("for010")) {
      return "FOR010 - Réaliser un shampooing moquette suivi d'une injection-extraction";
    } else if (nameLower.includes("for011"))  {
      return "FOR011 - Habilitation à la monobrosse";
    } else if (nameLower.includes("for012")) {
      return "FOR012 - Habilitation à l'autolaveuse";
    } else if (nameLower.includes("for016")) {
      return "FOR016 - Le bionettoyage en secteur hospitalier";
    } else if (nameLower.includes("for018")) {
      return "FOR018 - Intervention en salle propre";
    } else if (nameLower.includes("jtf")) {
      return "JTF - Journée thématique de formation (001 + 002)";
    }
  
  
  
    // Si aucun cas ne correspond, on renvoie le nom de formation original
    return formationName;
  }
  
  function getObjectifFormation(formationName) {
    // Normaliser en minuscule pour ignorer la casse
    const nameLower = formationName.toLowerCase();
  
    if (nameLower.includes("for001")) {
      return "- Organiser son travail en fonction de la prestation à réaliser\n- Réaliser les techniques d'entretien en respectant les règles d'hygiène et de sécurité\n- De savoir identifier les différents matériels\n- Savoir communiquer en utilisant les termes professionnelle";
    } else if (nameLower.includes("for02") || nameLower.includes("for002")) {
      return "- Comprendre les risques liés à son activité professionnelle\n- Adopter les bonnes protections\n- Connaitre les différentes signalisations de sécurité et de santé\n- Mettre en pratique les écogestes.";
    } else if (nameLower.includes("for03") || nameLower.includes("for003")) {
      return "- Garantir une tenue de travail et une présentation soignée\n- Réaliser ses prestations en respectant le confort du client\n- Communiquer de manière professionnelle avec le client, le responsable et l'équipe\n- Transmettre et traiter efficacement les plaintes et les réclamations";
    } else if (nameLower.includes("for04") || nameLower.includes("for004")) {
      return "- Organiser son travail en fonction de la prestation à réaliser\n- Appliquer les protocoles de nettoyage d'un bureau et d'un bloc sanitaire\n- Appliquer les règles d'hygiène et de sécurité vis-à-vis des usagers\n- Contrôler sa prestation";
    } else if (nameLower.includes("for06") || nameLower.includes("for006")) {
      return "- Connaître les différents revêtements de sols souples\n- Utiliser une monobrosse haute-vitesse en sécurité\n- Entretenir et vérifier la machine et connaitre ses accessoires / Appliquer les produits de nettoyage adéquats\n- Maitriser les techniques de spray Méthode et de lustrage";
    } else if (nameLower.includes("for07") || nameLower.includes("for007")) {
      return "- Connaître les différents revêtements de sols souples\n- Utiliser une monobrosse basse-vitesse en sécurité\n- Entretenir et vérifier la machine et connaitre ses accessoires / Appliquer les produits de nettoyage adéquats\n- Maitriser les techniques de décapage au mouillé";
    } else if (nameLower.includes("for09") || nameLower.includes("for009")) {
      return "- Connaître les différents revêtements céramiques\n- Utiliser une monobrosse basse-vitesse en sécurité\n- Entretenir et vérifier la machine et connaitre ses accessoires / Appliquer les produits de nettoyage adéquats\n- Maitriser les techniques du récurage sur un sol carrelé";
    } else if (nameLower.includes("for010")) {
      return "- Connaître les différents revêtements textiles\n- Utiliser une monobrosse basse-vitesse en sécurité\n- Entretenir et vérifier la machine et connaitre ses accessoires / Appliquer les produits de nettoyage adéquats\n- Maitriser les techniques du shampoing moquette";
    } else if (nameLower.includes("for011")) {
      return "- Comprendre le fonctionnement de la monobrosse\n- Utiliser les différents types de brosses/disques et de produits de nettoyage\n- Appliquer les techniques de nettoyage adaptées à chaque type de sol\n- Entretenir et assurer la maintenance de la monobrosse";
    } else if (nameLower.includes("for012")) {
      return "- Comprendre le fonctionnement de l'autolaveuse\n- Utiliser les différents types de brosses/disques et de produits de nettoyage\n- Appliquer les techniques de nettoyage adaptées à chaque type de sol\n- Entretenir et assurer la maintenance de l'autolaveuse";
    } else if (nameLower.includes("for016")) {
      return "- Comprendre les objectifs du bionettoyage et identifier les biocontaminations et les micro-organismes\n- Identifier les différentes zones d'intervention en secteur hospitalier\n- D'utiliser les produits adaptés et d'entretenir le matériel après chaque prestation\n- Mettre en pratique les protocoles de bionettoyage des blocs opératoires";
    } else if (nameLower.includes("for018")) {
      return "- Identifier les caractéristiques des salles propres et les différents contaminants\n- Adopter les bons comportements et attitudes en salle propre\n- Appliquer les protocoles de nettoyage en salle propre\n- Connaitre et renseigner les éléments de traçabilité";
    } else if (nameLower.includes("jtf")) {
      return "-D'organiser son travail en fonction de la prestation à réaliser en adoptant les bonnes protections\n- De réaliser les techniques d'entretien en respectant les règles d'hygiène et de sécurité tout en identifiant les risques liés à son activité professionnelle\n- De savoir identifier les différents matériels de savoir communiquer en utilisant les termes professionnels\n Connaitre les différentes signalisations de sécurité et de santé et mettre en pratique les écogestes";
    }
  
    // Si aucun cas ne correspond, on renvoie le nom de formation original
    return "Objectifs non définis";
  }
  
  function computeIntraInter(formation, date) {
    const targetDate = parseDDMMYYYY(date);
    // Récupérer et filtrer les blocs correspondant à la date
    const blocks = getBlocks(formation.participants).filter((b) => {
      const d = new Date(b.date);
      return isSameDate(d, targetDate);
    });
  
    // Extraire les entités
    const entities = blocks
      .map((block) => {
        try {
          const empData = JSON.parse(block.json);
          const emp = Array.isArray(empData) ? empData[0] : empData;
          return emp.entity.trim().toLowerCase();
        } catch (e) {
          console.error("Erreur de parsing dans computeIntraInter :", e);
          return null;
        }
      })
      .filter((ent) => ent !== null);
  
    if (entities.length === 0) return "";
    const first = entities[0];
    // Si tous les participants ont la même entité, c'est INTRA, sinon INTER
    const allSame = entities.every((ent) => ent === first);
    return allSame ? "INTRA" : "INTER";
  }
  
  // Exemple de fonction pour générer et télécharger le document Word basé sur le template GEN-EMAR.docx
  async function downloadGENEMARDoc(formation, trainer, date) {
    // Charger le template depuis le dossier Model
    const response = await fetch("Model/GEN-EMAR.docx");
    if (!response.ok) {
      alert("Erreur lors du chargement du template");
      return;
    }
    const arrayBuffer = await response.arrayBuffer();
  
    // Utiliser PizZip pour décompresser le document
    const zip = new PizZip(arrayBuffer);
  
    // Créer une instance de docxtemplater en précisant les délimiteurs pour vos balises
    const doc = new window.docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "[", end: "]" },
    });
  
    // Déterminer les heures en fonction du nom de la formation
    const heures = getHeures(formation.name);
    console.log("Heures de formation :", heures);
  
    // Calculer le mode INTRA / INTER en parcourant les entités des participants
    const intraInter = computeIntraInter(formation, date);
  
    const morningSchedule =
      trainer.morningStart && trainer.morningEnd
        ? `${trainer.morningStart} à ${trainer.morningEnd}`
        : "Ø";
    const afternoonSchedule =
      trainer.afternoonStart && trainer.afternoonEnd
        ? `${trainer.afternoonStart} à ${trainer.afternoonEnd}`
        : "Ø";
  
    const tableauData = prepareTableauData(formation, date);
  
    // Remplacer les variables dans le template
    doc.render({
      "NOM FORMATION": formation.name,
      "TYPE DE FORMATION": trainer.type,
      "NOM DU FORMATEUR": trainer.name,
      ADRESSE: trainer.adress, // Assurez-vous que trainer.adress existe
      HEURES: heures,
      "INTRA / INTER": intraInter,
      "HORAIRES MATIN": morningSchedule,
      "HORAIRES APRES-MIDI": afternoonSchedule,
      DATE: date,
      TABLEAU: tableauData,
    });
  
    // Générer le document final en Blob et déclencher le téléchargement
    const out = doc.getZip().generate({ type: "blob" });
    const url = URL.createObjectURL(out);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formation.name}_EMARGEMENT_DU_${date}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Enregistrer le log
    await recordLog(`Génération du document d'émargement pour "${formation.name}" du ${date}`);
  }
  
  function getUniqueEntitiesForDate(formation, date) {
    const targetDate = parseDDMMYYYY(date);
    // Récupérer tous les blocs participants de la formation
    const blocks = getBlocks(formation.participants).filter((b) => {
      const d = new Date(b.date);
      return isSameDate(d, targetDate);
    });
  
    // Extraire l'entité de chaque participant
    const entities = blocks
      .map((block) => {
        try {
          const empData = JSON.parse(block.json);
          const emp = Array.isArray(empData) ? empData[0] : empData;
          return emp.entity.trim(); // ou .toLowerCase() si vous voulez uniformiser
        } catch (e) {
          console.error("Erreur de parsing d'un bloc :", e);
          return null;
        }
      })
      .filter((ent) => ent !== null);
  
    // Renvoyer un tableau sans doublons
    const uniqueEntities = [...new Set(entities)];
    return uniqueEntities;
  }
  
  async function generateConventionRef(formation, date, entity) {
    // Suppose que formation.name, date et entity sont des chaînes
    // SCRIPT_URL est l'URL de votre Apps Script
    console.log("Génération de la référence de convention pour", formation.name, date, entity);
  
    const url =
      SCRIPT_URL +
      "?action=addRefConvention" +
      "&entite=" +
      encodeURIComponent(entity) +
      "&formation=" +
      encodeURIComponent(formation.name) +
      "&date=" +
      encodeURIComponent(date);
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        return data.vref; // ex: vcvt003_ternett"
      } else {
        console.error("Erreur addRefConvention:", data.error);
        return "";
      }
    } catch (err) {
      console.error("Erreur fetch addRefConvention:", err);
      return "";
    }
  }
  
  async function downloadConventionDocForEntity(
    formation,
    trainer,
    date,
    entity
  ) {
    console.log(entity);
  
    const vref = await generateConventionRef(formation, date, entity);
    // Charger le template depuis le dossier Model
    const response = await fetch("Model/CONVENTION.docx");
    if (!response.ok) {
      alert("Erreur lors du chargement du template CONVENTION.docx");
      return;
    }
    const arrayBuffer = await response.arrayBuffer();
  
    // Décompresser avec PizZip
    const zip = new PizZip(arrayBuffer);
  
    // Créer docxtemplater (en utilisant les crochets [ ... ])
    const doc = new window.docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "[", end: "]" },
    });
  
    // Calculer la durée en heures (ex : 3.5 ou 7)
    const heures = getHeures(formation.name);
  
    // Déterminer les horaires
    const morningSchedule =
      trainer.morningStart && trainer.morningEnd
        ? `${trainer.morningStart} à ${trainer.morningEnd}`
        : "Ø";
    const afternoonSchedule =
      trainer.afternoonStart && trainer.afternoonEnd
        ? `${trainer.afternoonStart} à ${trainer.afternoonEnd}`
        : "Ø";
  
    // Calcul du "jour" (exemple ½ si 3.5h, sinon 1)
    let jour;
    if (heures === "3.5") {
      jour = "½";
    } else {
      jour = "1";
    }
  
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const dateOfToday = dd + "/" + mm + "/" + yyyy;
  
    //Créer une variable expirationDate qui prends la date de formation et enlève 10 jours
    // On suppose que "date" est une chaîne au format "dd/mm/yyyy"
    const [day, month, year] = date.split("/").map(Number);
    // Crée l'objet Date en JS (le mois commence à 0)
    const dateFormation = new Date(year, month - 1, day);
  
    // Soustrait 10 jours
    dateFormation.setDate(dateFormation.getDate() - 10);
  
    // Reformate la date en "dd/mm/yyyy"
    const ddExp = String(dateFormation.getDate()).padStart(2, "0");
    const mmExp = String(dateFormation.getMonth() + 1).padStart(2, "0");
    const yyyyExp = dateFormation.getFullYear();
  
    const expirationDateStr = `${ddExp}/${mmExp}/${yyyyExp}`;
  
    console.log("Date formation :", date);
    console.log("Date expiration (10 jours avant) :", expirationDateStr);
  
    // Obtenir le Titre de formation
    const titreFormation = getTitreFormation(formation.name);
    console.log("Titre de formation :", titreFormation);
    let siretNb;
  
    if (entity.toLowerCase() == "ternett" || entity.toLowerCase() == "ternet") {
      siretNb = "324 465 921 000 82";
    } else if (
      entity.toLowerCase() == "ernett" ||
      entity.toLowerCase() == "ernet"
    ) {
      siretNb = "398 715 904 000 49";
    } else if (
      entity.toLowerCase() == "eclanet" ||
      entity.toLowerCase() == "eclanett"
    ) {
      siretNb = "322 032 491 000 27";
    } else if (entity.toLowerCase() == "rie") {
      siretNb = "403 384 035 000 16";
    } else if (
      entity.toLowerCase() == "pratis" ||
      entity.toLowerCase() == "practis"
    ) {
      siretNb = "88 004 978 800 024";
    } else if (entity.toLowerCase() == "creabat") {
      siretNb = "538 452 673 000 48";
    } else if (
      entity.toLowerCase() == "groupe candor" ||
      entity.toLowerCase() == "candor"
    ) {
      siretNb = "538 441 833 000 26";
    } else if (
      entity.toLowerCase() == "alpha" ||
      entity.toLowerCase() == "candor alpha" ||
      entity.toLowerCase() == "candor-alpha" ||
      entity.toLowerCase() == "alpha candor"
    ) {
      siretNb = "89 241 544 900 016";
    } else if (entity.toLowerCase() == "dakin") {
      siretNb = "34 771 182 200 085";
    } else if (
      entity.toLowerCase() == "gamma" ||
      entity.toLowerCase() == "candor gamma"
    ) {
      siretNb = "352 00672 0000 36";
    }
  
    const tableau = prepareTableauDataForEntity(formation, date, entity);
  
    const objectifs = getObjectifFormation(formation.name);
  
    // 1) Nombre de stagiaires (lignes non vides)
    const nbStagiaires = tableau.filter(
      (item) => item.NOM_PRENOM.trim() !== ""
    ).length;
  
  // 2) Récupérer distance (en km) et tarif salle
  const distanceTrajet = parseFloat(trainer.distanceInput) || 0;
  const tarifSalleInitial = parseFloat(trainer.tarifSalle) || 0;
  
  // 3) Définir les coûts unitaires
  const formationHeures = getHeures(formation.name);
  const costParParticipant = formationHeures === "7" ? 210.0 : 105.0;
  const costParRepas = 20.0;          // 20€ par repas
  const costParKm = 0.6;              // 0.60€ par km
  const trainerMeal = 1;              // 1 repas pour le formateur
  
  // 4) Calculs partiels
  // Coût de formation par participant
  const totalNbs = nbStagiaires * costParParticipant;
  
  // Coût total de trajet (distance * coût/km)
  const totalTrajet = distanceTrajet * costParKm;
  
  let totalRepas = 0;
  let nombreDeRepasStagiaire = 0;
  let totalRepasFormateur = 0;
  
  let repasOuiOuNon = document.querySelector('input[name="repas"]:checked').value;
  console.log("Repas oui/non :", repasOuiOuNon);
  if (repasOuiOuNon === "oui") {
    totalRepas = nbStagiaires * costParRepas;
    totalRepasFormateur = trainerMeal * costParRepas;
    nombreDeRepasStagiaire = nbStagiaires;
  } else {
    totalRepas = 0;
    totalRepasFormateur = 0;
    nombreDeRepasStagiaire = 0;
  }
  
  // --- Répartition du tarif de salle par entité (déjà en place) ---
  let tarifSalleConvention = tarifSalleInitial;
  // Récupérer tous les participants pour la formation et la date
  const allParticipants = getParticipantsForDate(formation, date);
  const totalParticipants = allParticipants.length;
  // Liste des entités uniques pour cette formation/date
  const uniqueEntities = getUniqueEntitiesForDate(formation, date);
  
  if (uniqueEntities.length > 1 && totalParticipants > 0) {
    // Nombre de participants dans l'entité courante (en normalisant)
    const entityParticipants = allParticipants.filter(p =>
      p.entity.trim().toLowerCase() === entity.trim().toLowerCase()
    );
    const countEntity = entityParticipants.length;
    tarifSalleConvention = (tarifSalleInitial * countEntity) / totalParticipants;
    console.log("Répartition tarifSalle :", {
      tarifSalleInitial,
      totalParticipants,
      countEntity,
      tarifSalleConvention
    });
  } else {
    console.log("Une seule entité, tarifSalle complet utilisé :", tarifSalleInitial);
  }
  
  // --- Répartition du coût de trajet par entité ---
  // Par défaut, si une seule entité, on prend le coût total
  let tarifTrajetConvention = totalTrajet;
  if (uniqueEntities.length > 1 && totalParticipants > 0) {
    const entityParticipants = allParticipants.filter(p =>
      p.entity.trim().toLowerCase() === entity.trim().toLowerCase()
    );
    const countEntity = entityParticipants.length;
    tarifTrajetConvention = (totalTrajet * countEntity) / totalParticipants;
    console.log("Répartition tarifTrajet :", {
      totalTrajet,
      totalParticipants,
      countEntity,
      tarifTrajetConvention
    });
  } else {
    console.log("Une seule entité, coût de trajet complet utilisé :", totalTrajet);
  }
  
  // --- Répartition du repas du formateur par entité ---
  // Par défaut, le coût complet
  let tarifRepasFormateurConvention = totalRepasFormateur;
  if (uniqueEntities.length > 1) {
    tarifRepasFormateurConvention = totalRepasFormateur / uniqueEntities.length;
    console.log("Répartition repas formateur :", {
      totalRepasFormateur,
      uniqueEntitiesCount: uniqueEntities.length,
      tarifRepasFormateurConvention
    });
  } else {
    console.log("Une seule entité, repas formateur complet utilisé :", totalRepasFormateur);
  }
  
  // 5) Calcul du total HT : somme de tous les éléments
  // On utilise la part répartie pour le trajet et le repas du formateur
  const totalHT = totalNbs + tarifTrajetConvention + totalRepas + tarifRepasFormateurConvention + tarifSalleConvention;
  
  // 6) Calcul de la TVA (20%)
  const TVA = totalHT * 0.2;
  
  // 7) Calcul du total TTC
  const totalTTC = totalHT + TVA;
  
  // Remplacer les variables dans le document (les libellés peuvent être ajustés)
  doc.render({
    VREF: vref,
    "NOM DE FORMATION": titreFormation,
    "TITRE DE FORMATION": titreFormation,
    ENTITE: entity,
    "HORAIRES MATIN": morningSchedule,
    "HORAIRES APRES-MIDI": afternoonSchedule,
    ADRESSE: trainer.adress,
    HEURES: heures,
    DATE: date,
    JOUR: jour,
    "DATE DU JOUR": dateOfToday,
    "CPP": costParParticipant.toFixed(2) + "€",
    EXPIRATION: expirationDateStr,
    SIREN: siretNb,
    OBJECTIFS: objectifs,
    TABLEAU: tableau,
    NBS: nbStagiaires,
    NBT: distanceTrajet,
    NBRS: nombreDeRepasStagiaire,
    NBRF: trainerMeal,
    // Afficher les parts réparties
    "TARIF SALLE": tarifSalleConvention.toFixed(2) + "€",
    "TARIF TRAJET": tarifTrajetConvention.toFixed(2) + "€",
    "REPAIS STAGIAIRES": totalRepas + "€",
    "REPAIS FORMATEUR": tarifRepasFormateurConvention.toFixed(2) + "€",
    "TOTAL NBS": totalNbs + "€",
    "TOTAL NBRS": totalRepas + "€",
    "TOTAL NBT": tarifTrajetConvention.toFixed(2) + "€",
    "TOTAL NBRF": tarifRepasFormateurConvention.toFixed(2) + "€",
    "TOTAL HT": totalHT.toFixed(2) + "€",
    TVA: TVA.toFixed(2) + "€",
    "TOTAL TTC": totalTTC.toFixed(2) + "€",
  });
  
    // Générer le document final en Blob
    const out = doc.getZip().generate({ type: "blob" });
    const url = URL.createObjectURL(out);
    const a = document.createElement("a");
    a.href = url;
    // Nom du fichier : formation + entité + date
    a.download = `${formation.name}_${entity}_${date}_CONVENTION.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  function getParticipantsForDate(formation, date) {
    const targetDate = parseDDMMYYYY(date);
    const blocks = getBlocks(formation.participants).filter((b) => {
      const d = new Date(b.date);
      return isSameDate(d, targetDate);
    });
  
    // On mappe chaque bloc vers un objet participant
    const participants = blocks
      .map((block) => {
        try {
          const empData = JSON.parse(block.json);
          const emp = Array.isArray(empData) ? empData[0] : empData;
          return {
            nameEmployee: emp.nameEmployee,
            matricule: emp.matricule,
            entity: emp.entity,
          };
        } catch (e) {
          console.error("Erreur parsing bloc participant:", e);
          return null;
        }
      })
      .filter((p) => p !== null);
  
    return participants;
  }
  
  async function generateConvocationRef(entite, formationName, date, stagiaire) {
    // On construit l'URL vers votre Apps Script
    const url =
      SCRIPT_URL +
      "?action=addRefConvocation" +
      "&entite=" +
      encodeURIComponent(entite) +
      "&formation=" +
      encodeURIComponent(formationName) +
      "&date=" +
      encodeURIComponent(date) +
      "&stagiaire=" +
      encodeURIComponent(stagiaire);
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        return data.vref; // ex. "vcvn001_ternett"
      } else {
        console.error("Erreur addRefConvocation:", data.error);
        return "";
      }
    } catch (err) {
      console.error("Erreur fetch addRefConvocation:", err);
      return "";
    }
  }
  
  async function generateConvocationDoc(formation, trainer, date, participant) {
    const vref = await generateConvocationRef(
      participant.entity, // entite
      formation.name, // formationName
      date, // date
      participant.nameEmployee // stagiaire
    );
  
    // Charger le template "CONVOCATION.docx"
    const response = await fetch("Model/CONVOCATION.docx");
    if (!response.ok) {
      throw new Error("Erreur chargement CONVOCATION.docx");
    }
    const arrayBuffer = await response.arrayBuffer();
  
    // Décompresser via PizZip
    const zip = new PizZip(arrayBuffer);
  
    // Créer docxtemplater
    const doc = new window.docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "[", end: "]" },
    });
  
    // Heures (3.5 ou 7, etc.)
    const heures = getHeures(formation.name);
  
    // Horaires matin / après-midi
    const morningSchedule =
      trainer.morningStart && trainer.morningEnd
        ? `${trainer.morningStart} à ${trainer.morningEnd}`
        : "Ø";
    const afternoonSchedule =
      trainer.afternoonStart && trainer.afternoonEnd
        ? `${trainer.afternoonStart} à ${trainer.afternoonEnd}`
        : "Ø";
  
    // Objectifs
    const objectifs = getObjectifFormation(formation.name);
  
    // Titre de formation, si besoin
    const titreFormation = getTitreFormation(formation.name);
  
    // Renseigner les champs
    doc.render({
      "NOM/PRENOM": participant.nameEmployee,
      DATE: date,
      FORMATION: titreFormation, // ou formation.name
      "ADRESSE DE FORMATION": trainer.adress,
      OBJECTIFS: objectifs,
      "HORAIRES MATIN": morningSchedule,
      "HORAIRES APRES-MIDI": afternoonSchedule,
      HEURE: heures,
      VREF: vref,
    });
  
    // Générer un Blob
    const out = doc.getZip().generate({ type: "blob" });
    return out;
  }
  
  async function downloadAllConvocations(formation, trainer, date) {
    // Récupérer la liste des participants pour la date
    const participants = getParticipantsForDate(formation, date);
  
    if (participants.length === 0) {
      alert("Aucun stagiaire pour cette date.");
      return;
    }
  
    for (const participant of participants) {
      try {
        const blob = await generateConvocationDoc(
          formation,
          trainer,
          date,
          participant
        );
        // Nom du fichier : "Convocation_NomPrenom_date.docx"
        const fileName = `Convocation_${participant.nameEmployee}_${date}.docx`;
  
        // Déclencher le téléchargement
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Erreur génération convocation:", err);
      }
    }
    
    // Enregistrer le log
    await recordLog(`Génération de ${participants.length} convocation(s) pour "${formation.name}" du ${date}`);
  }
  
  async function downloadAllEval(formation, date) {
    // Récupérer tous les participants pour la formation et la date donnée
    const participants = getParticipantsForDate(formation, date);
  
    if (participants.length === 0) {
      showNotification("Aucun participant trouvé pour cette date.");
      return;
    }
  
    // Chemin du template d'évaluation (ajustez ce chemin si besoin)
    const evalTemplatePath = "Model/Evaluations/EVALC.docx";
  
    // Obtenir le titre long de la formation via la fonction existante
    const titreFormationLong = getTitreFormation(formation.name);
  
    // Pour chaque participant, générer le document d'évaluation
    for (const participant of participants) {
      try {
        // Charger le template
        const response = await fetch(evalTemplatePath);
        if (!response.ok) throw new Error("Fichier d'évaluation introuvable");
  
        const arrayBuffer = await response.arrayBuffer();
        const zip = new PizZip(arrayBuffer);
  
        // Configurer docxtemplater
        const doc = new window.docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          delimiters: { start: "[", end: "]" },
        });
  
        // Remplacer les champs dans le template
        doc.render({
          "FORMATION": titreFormationLong,
          "DATE": date,
          "NOM/PRENOM": participant.nameEmployee,
          "ENTITE": participant.entity,
        });
  
        // Générer le document final et déclencher le téléchargement
        const blob = doc.getZip().generate({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `EVAL_${participant.nameEmployee}_${date}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error(`Erreur pour ${participant.nameEmployee} dans l'évaluation:`, error);
        showNotification(`Erreur avec ${participant.nameEmployee} : ${error.message}`);
      }
    }
    
    // Enregistrer le log
    await recordLog(`Génération de ${participants.length} évaluation(s) pour "${formation.name}" du ${date}`);
  }
  
  
  // Fonction principale pour télécharger les QCM
  async function downloadAllQCMs(formation, date) {
    const participants = getParticipantsForDate(formation, date);
  
    if (participants.length === 0) {
      showNotification("Aucun participant trouvé pour cette date.");
      return;
    }
  
    // Déterminer le code de formation (ex: FOR001)
    const formationCode = getFormationCode(formation.name);
    if (!formationCode) {
      showNotification("Aucun questionnaire disponible pour cette formation.");
      return;
    }
  
    // Chemin du template QCM
    const qcmTemplatePath = `Model/Questionnaires/${formationCode}-QCM.docx`;
  
    for (const participant of participants) {
      try {
        // Charger le template
        const response = await fetch(qcmTemplatePath);
        if (!response.ok) throw new Error("Fichier QCM introuvable");
  
        const arrayBuffer = await response.arrayBuffer();
        const zip = new PizZip(arrayBuffer);
  
        // Configurer docxtemplater
        const doc = new window.docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          delimiters: { start: "[", end: "]" },
        });
  
        // Remplacer les variables dans le template
        doc.render({
          "NOM/PRENOM": participant.nameEmployee,
          ENTITE: participant.entity,
          DATE: date,
        });
  
        // Générer et télécharger
        const blob = doc.getZip().generate({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${formationCode}-QCM_${participant.nameEmployee}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error(`Erreur pour ${participant.nameEmployee}:`, error);
        showNotification(
          `Erreur avec ${participant.nameEmployee} : ${error.message}`
        );
      }
    }
    
    // Enregistrer le log
    await recordLog(`Génération de ${participants.length} QCM pour "${formation.name}" du ${date}`);
  }
  
  document
    .getElementById("closeParticipantsModal")
    .addEventListener("click", () => {
      document.getElementById("participantsModal").style.display = "none";
    });
  
  /* ---------------------- Ajout / Suppression de Participant ---------------------- */
  
  // Lorsqu'on ajoute un participant, on crée un nouveau bloc au format souhaité
  async function addParticipantToFormation(formation, date, newParticipant) {
    const fullDateStr = convertDDMMYYYYToFull(date);
    const newBlock = JSON.stringify([newParticipant]) + " (" + fullDateStr + ")";
    if (formation.participants && formation.participants.trim().length > 0) {
      formation.participants = formation.participants.trim() + ", " + newBlock;
    } else {
      formation.participants = newBlock;
    }
    await updateFormationParticipantsInSheet(
      formation.id,
      formation.participants
    );
  
    // Refresh formations. Use the global function if available; otherwise, use the local one.
    if (typeof window.fetchFormations === "function") {
      await window.fetchFormations();
    } else if (typeof fetchFormations === "function") {
      await fetchFormations();
    } else {
      console.error("fetchFormations function is not available.");
    }
  
    // Ne plus rouvrir automatiquement le modal ici car on va refresh la page
    // const updatedFormation = window.formationsData.find(
    //   (f) => f.id === formation.id
    // );
    // showParticipantsModal(updatedFormation, date);
  }
  
  // Lorsqu'on supprime, on reconstruit la chaîne en supprimant le bloc ciblé
  async function removeParticipantFromFormation(formation, date, index) {
    // Extraire tous les blocs existants
    let blocks = getBlocks(formation.participants);
    let newBlocks = [];
    let currentDateIndex = 0;
    const targetDate = parseDDMMYYYY(date);
  
    // Fonction utilitaire pour s'assurer qu'un bloc se termine par ")"
    function fixBlock(blockStr) {
      blockStr = blockStr.trim();
      return blockStr.endsWith("))") ? blockStr : blockStr + ")";
    }
  
    // Parcourir tous les blocs
    for (let i = 0; i < blocks.length; i++) {
      let block = blocks[i];
      let blockDate = new Date(block.date);
      if (isSameDate(blockDate, targetDate)) {
        // Pour les blocs de la date cible, on ne garde que ceux qui ne correspondent pas à l'index à supprimer
        if (currentDateIndex !== index) {
          newBlocks.push(fixBlock(block.fullBlock));
        }
        currentDateIndex++;
      } else {
        // Les blocs d'autres dates restent inchangés (mais corrigés au besoin)
        newBlocks.push(fixBlock(block.fullBlock));
      }
    }
  
    // Reconstruire la chaîne à partir des blocs filtrés
    formation.participants = newBlocks.join(", ").trim();
  
    await updateFormationParticipantsInSheet(
      formation.id,
      formation.participants
    );
    
    // Ne plus rouvrir automatiquement le modal ici car on va refresh la page
    // showParticipantsModal(formation, date);
  }
  
  // Fonction d'échappement pour utiliser une chaîne dans une regex
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  
  /* ---------------------- Mise à Jour dans le Sheet ---------------------- */
  async function updateFormationParticipantsInSheet(id, participantsStr) {
    try {
      const url = `${SCRIPT_URL}?action=updateParticipants&id=${id}&participants=${encodeURIComponent(
        participantsStr
      )}`;
      const response = await fetch(url);
      const result = await response.json();
      if (typeof window.fetchFormations === "function") {
        await window.fetchFormations();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des participants :",
        error.message
      );
    }
  }
  
  /* =================== Formulaire de Rendez-vous =================== */
  function initAppointmentForm(showNotification) {
    emailjs.init("4sYz-WzrDCXInmUCl");
    populateAppointmentFormFormations();
    const form = document.getElementById("appointmentForm");
    const submitButton = document.getElementById("submitForm");
    
    let isSubmitting = false; // Protection contre les multiples envois
    
    submitButton.addEventListener("click", async (e) => {
      e.preventDefault();
      
      // Empêcher les multiples soumissions
      if (isSubmitting) {
        showNotification("Demande en cours d'envoi, veuillez patienter...");
        return;
      }
      
      isSubmitting = true;
      submitButton.disabled = true;
      submitButton.textContent = "Envoi en cours...";
      
      try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const formationSelect = document.getElementById("formationSelect");
        const dateSelect = document.getElementById("dateSelect");
        const selectedOption =
          formationSelect.options[formationSelect.selectedIndex];
        const formationName = selectedOption ? selectedOption.text : "";
        const date = dateSelect.value;
        const message = document.getElementById("message").value;
  
        // Récupérer les données du tableau des employés
        const employees = [];
        const rows = document.querySelectorAll("#employeeTable tbody tr");
        rows.forEach((row) => {
          const matricule = row
            .querySelector('input[name="matricule[]"]')
            .value.trim();
          const nameEmployee = row
            .querySelector('input[name="nameEmployee[]"]')
            .value.trim();
          const entity = row.querySelector('input[name="entity[]"]').value.trim();
          if (matricule && nameEmployee && entity) {
            employees.push({ matricule, nameEmployee, entity });
          }
        });
  
        // Vérifier la limite de participants
        const formationData = window.currentFormationsData.find(
          (f) => parseInt(f.id) === parseInt(formationSelect.value)
        );
        let currentCount = formationData
          ? getParticipantsCount(formationData, date)
          : 0;
        if (currentCount + employees.length > 12) {
          showNotification(
            "La limite de participants pour une formation est de 12, merci de retirer des participants ou de reserver une autre date."
          );
          return;
        }
        
        // Si le message est vide, on le remplace par "Aucun message"
        const messageText = message.trim() === "" ? "Aucun message" : message;
  
        // D'abord, essayer d'ajouter la demande au Google Sheet
        const addResult = await addPendingRequest({
          manager: name,
          email: email,
          telephone: phone,
          formation: formationName,
          date: date,
          message: messageText,
          employees: JSON.stringify(employees),
        });
  
        if (!addResult.success) {
          throw new Error(addResult.error || "Erreur lors de l'ajout de la demande");
        }
  
        // Si l'ajout au Google Sheet réussit, envoyer l'email
        const employeesList = employees
          .map((emp) => `${emp.matricule} - ${emp.nameEmployee} (${emp.entity})`)
          .join("\n");
  
        const formData = {
          name,
          email,
          phone,
          formation: formationName,
          date,
          message: messageText,
          employees: employeesList,
        };
  
        await emailjs.send("service_x5g594z", "template_mhmywm3", formData);
        
        showNotification("Merci, votre demande a été envoyée avec succès !");
        form.reset();
        
      } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        showNotification(`Erreur : ${error.message || "Une erreur s'est produite, veuillez réessayer."}`);
      } finally {
        isSubmitting = false;
        submitButton.disabled = false;
        submitButton.textContent = "Envoyer";
      }
    });
  }
  
  async function addPendingRequest(params) {
    const url =
      SCRIPT_URL +
      "?action=addPending" +
      "&manager=" +
      encodeURIComponent(params.manager) +
      "&email=" +
      encodeURIComponent(params.email) +
      "&telephone=" +
      encodeURIComponent(params.telephone) +
      "&formation=" +
      encodeURIComponent(params.formation) +
      "&date=" +
      encodeURIComponent(params.date) +
      "&message=" +
      encodeURIComponent(params.message) +
      "&employees=" +
      encodeURIComponent(params.employees);
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        console.log("Demande ajoutée avec succès :", data);
        return { success: true, id: data.id };
      } else {
        console.error("Erreur lors de l'ajout de la demande :", data.error);
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error("Erreur réseau lors de l'ajout de la demande :", err);
      return { success: false, error: "Erreur de connexion. Veuillez réessayer." };
    }
  }
  
  function populateAppointmentFormFormations() {
    window.handleFormationsData = function (data) {
      let formationsData = [];
      if (data && data.values) {
        formationsData = data.values;
      }
      window.currentFormationsData = formationsData;
      const formationSelect = document.getElementById("formationSelect");
      formationSelect.innerHTML = "";
      formationsData.forEach((formation) => {
        const option = document.createElement("option");
        option.value = formation.id;
        option.text = `${formation.name}`;
        formationSelect.appendChild(option);
      });
      formationSelect.addEventListener("change", () => {
        updateDateSelect(formationSelect, window.currentFormationsData);
      });
      updateDateSelect(formationSelect, window.currentFormationsData);
    };
  
    const script = document.createElement("script");
    script.src = SCRIPT_URL + "?action=read&callback=handleFormationsData";
    document.body.appendChild(script);
  }
  
  function updateDateSelect(formationSelect, formationsData) {
    const dateSelect = document.getElementById("dateSelect");
    dateSelect.innerHTML = "";
    const selectedId = parseInt(formationSelect.value);
    const formation = formationsData.find((f) => parseInt(f.id) === selectedId);
    if (formation && formation.availableDates) {
      let dates = formation.availableDates;
      if (typeof dates === "string") {
        dates = dates.split(",");
      }
      if (dates.length > 0) {
        dates.forEach((d) => {
          // Save the original date string as stored in the formation
          let originalDate = d.trim();
          // Display the date in dd/mm/yyyy format
          let formatted = formatDateToDDMMYYYY(originalDate);
          // getParticipantsCount expects the displayed format
          let count = formation ? getParticipantsCount(formation, formatted) : 0;
          const option = document.createElement("option");
          // Keep the original format for the value so that it is sent to the sheet
          option.value = originalDate;
          option.text = `${formatted} (${count}/12)`;
          dateSelect.appendChild(option);
        });
      } else {
        const option = document.createElement("option");
        option.value = "";
        option.text = "Aucune date disponible";
        dateSelect.appendChild(option);
      }
    } else {
      const option = document.createElement("option");
      option.value = "";
      option.text = "Aucune date disponible";
      dateSelect.appendChild(option);
    }
  }
  
  /* =================== Gestion des Cookies =================== */
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  }
  
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }
  
  /* =================== Tableau Dynamique Employés =================== */
  function initEmployeeTable() {
    const employeeTable = document.getElementById("employeeTable");
    const tbody = employeeTable.querySelector("tbody");
    const MAX_ROWS = 12;
    const MIN_ROWS = 1;
  
    function updateButtons() {
      const rows = tbody.querySelectorAll("tr");
      rows.forEach((row) => {
        const btnRemove = row.querySelector(".btn-remove");
        btnRemove.disabled = rows.length <= MIN_ROWS;
      });
      const addButtons = tbody.querySelectorAll(".btn-add");
      addButtons.forEach((btn) => {
        btn.disabled = tbody.querySelectorAll("tr").length >= MAX_ROWS;
      });
    }
  
    function addRow() {
      const currentRows = tbody.querySelectorAll("tr").length;
      if (currentRows < MAX_ROWS) {
        const newRow = tbody.querySelector("tr").cloneNode(true);
        newRow.querySelectorAll("input").forEach((input) => {
          input.value = "";
        });
        tbody.appendChild(newRow);
        updateButtons();
      }
    }
  
    function removeRow(row) {
      const currentRows = tbody.querySelectorAll("tr").length;
      if (currentRows > MIN_ROWS) {
        row.remove();
        updateButtons();
      }
    }
  
    tbody.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-add")) {
        addRow();
      }
      if (e.target.classList.contains("btn-remove")) {
        const row = e.target.closest("tr");
        removeRow(row);
      }
    });
  
    updateButtons();
  }
  // Fonction de formatage côté client : si la chaîne n'est pas déjà au format JJ/MM/AAAA, on la reformate.
  function formatDateClient(dateStr) {
    // Si la chaîne contient "/" et fait exactement 10 caractères, on suppose qu'elle est déjà au bon format (ex: "31/12/2025")
    if (dateStr && dateStr.includes("/") && dateStr.length === 10) {
      return dateStr;
    }
    // Sinon, essayer de créer un objet Date
    const d = new Date(dateStr);
    if (!isNaN(d)) {
      const day = ("0" + d.getDate()).slice(-2);
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  }
  
  /* =================== ARCHIVES =================== */
  
  async function runArchiveProcess() {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=moveToPendingClosure`);
      const result = await response.json();
      if (result.success) {
        console.log("Moving to pending closure completed successfully.");
      } else {
        console.error("Moving to pending closure error:", result.error);
      }
    } catch (error) {
      console.error("Error calling moveToPendingClosure action:", error);
    }
  }
  
  // Fonction pour récupérer les formations à clôturer
  async function fetchPendingClosure() {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=readPendingClosure`);
      const responseJson = await response.json();
      const tbody = document
        .getElementById("pendingClosureTable")
        .querySelector("tbody");
  
      if (
        !responseJson ||
        !responseJson.values ||
        responseJson.values.length === 0
      ) {
        tbody.innerHTML =
          "<tr><td colspan='5'>Aucune formation à clôturer</td></tr>";
        return;
      }
  
      tbody.innerHTML = "";
      responseJson.values.forEach((entry) => {
        // Formatage explicite de la date côté client
        const formattedDate = formatDateClient(entry.date);
  
        // Pour les participants : découper la chaîne avec "|||"
        let participantsHTML = "";
        if (entry.participants) {
          const blocks = entry.participants.split("|||");
          blocks.forEach((block) => {
            block = block.trim();
            if (block) {
              try {
                // Extraction plus robuste du JSON
                // Rechercher la partie entre crochets [...]
                const jsonMatch = block.match(/\[(.*?)\]/);
                if (!jsonMatch) {
                  participantsHTML += `<div>Format non reconnu</div>`;
                  return;
                }
                
                const jsonStr = '[' + jsonMatch[1] + ']';
                
                // Essayer de parser le JSON extrait
                let arr;
                try {
                  arr = JSON.parse(jsonStr);
                } catch (parseError) {
                  // Si le parsing échoue, afficher l'erreur mais continuer
                  console.warn("Erreur de parsing JSON:", parseError);
                  participantsHTML += `<div>Données mal formatées</div>`;
                  return;
                }
                
                if (Array.isArray(arr) && arr.length > 0) {
                  arr.forEach(p => {
                    if (p && typeof p === 'object') {
                      participantsHTML += `<div>${p.matricule || 'N/A'} - ${p.nameEmployee || 'N/A'} - ${p.entity || 'N/A'}</div>`;
                    }
                  });
                }
              } catch (e) {
                console.error("Erreur lors du traitement d'un bloc de participants:", e);
                participantsHTML += `<div>Erreur de format</div>`;
              }
            }
          });
        }
  
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.id}</td>
          <td>${entry.formation}</td>
          <td>${formattedDate}</td>
          <td>${participantsHTML || 'Aucun participant'}</td>
          <td>
            <button class="btn-edit-participants" data-id="${entry.id}" data-date="${formattedDate}" data-formation="${entry.formation}">✏️ Modifier</button>
            <button class="btn-reschedule-formation" data-id="${entry.id}" data-date="${formattedDate}" data-formation="${entry.formation}">📅 Replanifier</button>
            <button class="btn-close-formation" data-id="${entry.id}" data-date="${formattedDate}">✅ Clôturer</button>
            <button class="btn-delete-formation" data-id="${entry.id}" data-date="${formattedDate}">🗑️ Supprimer</button>
          </td>
        `;
        tbody.appendChild(row);
      });
  
      // Ajouter les écouteurs d'événements pour les boutons "Clôturer"
      document.querySelectorAll(".btn-close-formation").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          showNotification("Clôturation en cours...");
          const id = e.target.getAttribute("data-id");
          const date = e.target.getAttribute("data-date");
          await closeFormation(id, date);
        });
      });
  
      // Ajouter les écouteurs d'événements pour les boutons "Supprimer"
      document.querySelectorAll(".btn-delete-formation").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.target.getAttribute("data-id");
          const date = e.target.getAttribute("data-date");
          const formationName = e.target.closest('tr').querySelector('td:nth-child(2)').textContent;
          
          // Utiliser un modal personnalisé au lieu de confirm()
          const result = await customConfirmDelete(`Êtes-vous sûr de vouloir supprimer la formation "${formationName}" du ${date} de la liste des clôtures en attente ?`);
          
          if (result) {
            showNotification("Suppression en cours...");
            await deleteFromPendingClosure(id, date);
          }
        });
      });

      // Ajouter les écouteurs d'événements pour les boutons "Modifier"
      document.querySelectorAll(".btn-edit-participants").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.target.getAttribute("data-id");
          const date = e.target.getAttribute("data-date");
          const formationName = e.target.getAttribute("data-formation");
          await openEditParticipantsModal(id, formationName, date);
        });
      });

      // Ajouter les écouteurs d'événements pour les boutons "Replanifier"
      document.querySelectorAll(".btn-reschedule-formation").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.target.getAttribute("data-id");
          const date = e.target.getAttribute("data-date");
          const formationName = e.target.getAttribute("data-formation");
          await openRescheduleModal(id, formationName, date);
        });
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des formations à clôturer:", error);
    }
  }
  
  // Fonction pour clôturer une formation (la déplacer vers l'historique)
  async function closeFormation(id, date) {
    try {
      // Récupérer les détails de la formation à clôturer
      const response = await fetch(`${SCRIPT_URL}?action=readPendingClosure`);
      const result = await response.json();
      
      if (!result.success || !result.values) {
        showNotification("Erreur lors de la récupération des formations à clôturer");
        return;
      }
      
      // Convertir l'ID en chaîne pour s'assurer que la comparaison fonctionne
      const formationId = String(id);
      const formationDate = date;
      
      console.log("ID recherché:", formationId, "Date recherchée:", formationDate);
      
      // Trouver la formation avec l'ID ET la date correspondants
      const formation = result.values.find(f => 
        String(f.id) === formationId && 
        formatDateClient(f.date) === formationDate
      );
      
      if (!formation) {
        showNotification("Formation non trouvée");
        return;
      }
      
      // Ouvrir le modal de clôture
      openClosureModal(formation);
      
    } catch (error) {
      console.error("Erreur lors de la clôture de la formation:", error);
      showNotification("Erreur lors de la clôture de la formation");
    }
  }
  
  // Fonction pour ouvrir le modal de clôture
  function openClosureModal(formation) {
    const modal = document.getElementById("closureModal");
    const formationNameSpan = document.getElementById("closureFormationName");
    const formationDateSpan = document.getElementById("closureFormationDate");
    const participantsTable = document.getElementById("closureParticipantsTable").querySelector("tbody");
    const finalizeBtn = document.getElementById("finalizeClosureBtn");
    const startTimeInput = document.getElementById("closureStartTime");
    const endTimeInput = document.getElementById("closureEndTime");
    
    // Remplir les détails de la formation
    formationNameSpan.textContent = formation.formation;
    formationDateSpan.textContent = formatDateClient(formation.date);
    
    // Définir les horaires par défaut en fonction du nom de la formation
    const halfDayFormations = ["FOR001", "FOR002", "FOR011", "FOR012", "FOR016", "FOR018"];
    const isHalfDay = halfDayFormations.some(code => formation.formation.includes(code));
    
    startTimeInput.value = "09:00";
    endTimeInput.value = isHalfDay ? "12:30" : "17:00";
    
    // Vider le tableau des participants
    participantsTable.innerHTML = "";
    
    // Extraire et afficher les participants
    const blocks = formation.participants.split("|||");
    let participantsData = [];
    
    blocks.forEach((block, blockIndex) => {
      if (!block.trim()) return;
      
      try {
        // Extraire le JSON entre crochets
        const jsonMatch = block.match(/\[(.*?)\]/);
        if (!jsonMatch) return;
        
        // Extraire la date entre parenthèses
        const dateMatch = block.match(/\((.*?)\)/);
        const dateStr = dateMatch ? dateMatch[1] : "";
        
        const jsonStr = '[' + jsonMatch[1] + ']';
        const participants = JSON.parse(jsonStr);
        
        if (Array.isArray(participants) && participants.length > 0) {
          participants.forEach((participant, participantIndex) => {
            const row = document.createElement("tr");
            row.setAttribute("data-block-index", blockIndex);
            row.setAttribute("data-participant-index", participantIndex);
            
            row.innerHTML = `
              <td>${participant.matricule || 'N/A'}</td>
              <td>${participant.nameEmployee || 'N/A'}</td>
              <td>${participant.entity || 'N/A'}</td>
              <td class="presence-toggle">
                <input type="radio" name="presence_${blockIndex}_${participantIndex}" id="present_${blockIndex}_${participantIndex}" value="present" checked>
                <label for="present_${blockIndex}_${participantIndex}">Présent</label>
                <input type="radio" name="presence_${blockIndex}_${participantIndex}" id="absent_${blockIndex}_${participantIndex}" value="absent">
                <label for="absent_${blockIndex}_${participantIndex}">Absent</label>
              </td>
            `;
            
            participantsTable.appendChild(row);
            
            // Stocker les données du participant pour une utilisation ultérieure
            participantsData.push({
              blockIndex,
              participantIndex,
              data: participant,
              dateStr: dateStr // Utiliser la date extraite
            });
          });
        }
      } catch (e) {
        console.error("Erreur lors du traitement d'un bloc de participants:", e, block);
      }
    });
    
    // Stocker les données de la formation et des participants dans le bouton pour y accéder lors de la finalisation
    finalizeBtn.dataset.formationId = formation.id;
    finalizeBtn.dataset.formationName = formation.formation;
    finalizeBtn.dataset.formationDate = formatDateClient(formation.date);
    finalizeBtn.participantsData = participantsData;
    
    // Afficher le modal
    modal.style.display = "flex";
  }
  
  // Fonction pour finaliser la clôture et générer les attestations
  async function finalizeClosureProcess(formationId, formationName, formationDate, participantsData) {
    try {
      showNotification("Clôture en cours...");
      
      // Récupérer les heures de début et de fin
      const heureDebut = document.getElementById("closureStartTime").value;
      const heureFin = document.getElementById("closureEndTime").value;
      
      // Collecter les participants présents et absents
      const presentParticipants = [];
      const absentParticipants = [];
      
      participantsData.forEach(participant => {
        const { blockIndex, participantIndex, data } = participant;
        const isPresent = document.getElementById(`present_${blockIndex}_${participantIndex}`).checked;
        
        if (isPresent) {
          presentParticipants.push(data);
        } else {
          absentParticipants.push(data);
        }
      });
      
      // Générer les attestations pour les participants présents
      if (presentParticipants.length > 0) {
        await generateAttestations(formationName, formationDate, presentParticipants, heureDebut, heureFin);
      }
      
      // Préparer les données pour l'archivage
      const presentData = presentParticipants.map(p => ({
        ...p,
        status: 'present'
      }));
      
      const absentData = absentParticipants.map(p => ({
        ...p,
        status: 'absent'
      }));
      
      // Combiner les participants présents et absents
      const allParticipants = [...presentData, ...absentData];
      
      // Appeler l'API pour finaliser la clôture avec les statuts de présence
      const url = `${SCRIPT_URL}?action=closeFormation&id=${formationId}&date=${encodeURIComponent(formationDate)}&participants=${encodeURIComponent(JSON.stringify(allParticipants))}&heureDebut=${encodeURIComponent(heureDebut)}&heureFin=${encodeURIComponent(heureFin)}`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        showNotification("Formation clôturée avec succès!");
        
        // Enregistrer le log
        await recordLog(`Clôture de la formation "${formationName}" du ${formationDate} (${presentParticipants.length} présents, ${absentParticipants.length} absents)`);
        
        // Fermer le modal
        document.getElementById("closureModal").style.display = "none";
        
        // Rafraîchir les tableaux
        await fetchPendingClosure();
        await fetchArchives();
      } else {
        showNotification("Erreur lors de la clôture: " + result.error);
      }
    } catch (error) {
      console.error("Erreur lors de la finalisation de la clôture:", error);
      showNotification("Erreur lors de la clôture de la formation");
    }
  }
  
  // Fonction pour générer et enregistrer une référence d'attestation
  async function generateAttestationRef(formationName, date, stagiaire, entite) {
    try {
      // Récupérer le code de la formation (ex: FOR001 -> 001)
      const formationCode = getFormationCode(formationName);
      const numericCode = formationCode.replace(/[^0-9]/g, ""); // Extraire seulement les chiffres
      
      // Nettoyer l'entité pour qu'elle soit utilisable dans une référence
      const cleanEntite = entite.toLowerCase().replace(/[^a-z0-9]/g, "");
      
      // Appeler l'API pour obtenir la prochaine référence et l'enregistrer
      const url = `${SCRIPT_URL}?action=addRefAttestation&entite=${encodeURIComponent(cleanEntite)}&formation=${encodeURIComponent(formationCode)}&date=${encodeURIComponent(date)}&stagiaire=${encodeURIComponent(stagiaire)}`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        return result.vref; // Retourne la référence générée (ex: vatt001_ternett)
      } else {
        console.error("Erreur lors de la génération de la référence d'attestation:", result.error);
        return `vatt${numericCode}_${cleanEntite}`; // Référence de secours en cas d'échec
      }
    } catch (error) {
      console.error("Erreur lors de la génération de la référence d'attestation:", error);
      // Extraire le code numérique de la formation en cas d'erreur
      let numericCode = "";
      try {
        const formationCode = getFormationCode(formationName);
        numericCode = formationCode.replace(/[^0-9]/g, "");
      } catch (e) {
        numericCode = "000";
      }
      return `vatt${numericCode}_${entite.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
    }
  }
  
  // Fonction pour générer les attestations
  async function generateAttestations(formationName, formationDate, participants, heureDebut, heureFin) {
    try {
      // Charger le template depuis le dossier Model
      const response = await fetch("Model/Attestations/ATTESTATION.docx");
      if (!response.ok) {
        showNotification("Erreur lors du chargement du template d'attestation");
        return;
      }
      
      const arrayBuffer = await response.arrayBuffer();
      
      // Déterminer les heures en fonction du nom de la formation
      const heures = getHeures(formationName);
      
      // Obtenir le titre complet de la formation
      const titreFormation = getTitreFormation(formationName);
      
      // Obtenir la date d'aujourd'hui au format dd/mm/yyyy
      const today = new Date();
      // Format français avec le jour en lettres
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateEnFrancais = today.toLocaleDateString('fr-FR', options);
      // Format standard dd/mm/yyyy
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const todayFormatted = `${dd}/${mm}/${yyyy}`;
      
      // Calculer le nombre de jours
      let jour;
      if (heures === "3.5") {
        jour = "½";
      } else {
        jour = "1";
      }
      
      // Adresse par défaut pour le groupe Candor (utilisée pour toutes les entités)
      const candorAddress = "[ADRESSE A REMPLIR]";
      const candorCpVille = "[CP VILLE A REMPLIR]";
      
      // Générer une attestation pour chaque participant présent
      for (const participant of participants) {
        // Générer la référence d'attestation
        const attestationRef = await generateAttestationRef(formationName, formationDate, participant.nameEmployee, participant.entity);
        
        // Décompresser avec PizZip
        const zip = new PizZip(arrayBuffer);
        
        // Créer docxtemplater
        const doc = new window.docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          delimiters: { start: "[", end: "]" },
        });
        
        // Remplacer les variables dans le document
        // Essayer différentes variations possibles du nom du champ
        const templateData = {
          "NOM DE FORMATION": titreFormation,
          "JOUR": jour,
          "HEURES": heures,
          "DATE": formationDate,
          "AUJOURD'HUI": todayFormatted,
          "AUJOURD'HUI": todayFormatted,
          "AUJOURD HUI": todayFormatted,
          "DATE DU JOUR": todayFormatted,
          "DATE_DU_JOUR": todayFormatted,
          "DATE JOUR": todayFormatted,
          "DATE_JOUR": todayFormatted,
          "DATE FRANCAISE": dateEnFrancais,
          "DATE_FRANCAISE": dateEnFrancais,
          "NOM_PRENOM": participant.nameEmployee,
          "ENTITE": participant.entity,
          "ADRESSE": candorAddress,
          "CP VILLE": candorCpVille,
          "HEURE DEBUT": heureDebut,
          "HEURE FIN": heureFin,
          "VREF": attestationRef
        };
        
        console.log("Données pour le rendu:", templateData);
        
        // Rendre le document avec toutes les variations possibles des champs
        doc.render(templateData);
        
        // Générer le document final en Blob
        const out = doc.getZip().generate({ type: "blob" });
        const url = URL.createObjectURL(out);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Attestation_${participant.nameEmployee.replace(/\s+/g, '_')}_${formationDate.replace(/\//g, '-')}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      
      showNotification(`${participants.length} attestation(s) générée(s) avec succès!`);
      
      // Enregistrer le log
      await recordLog(`Génération de ${participants.length} attestation(s) pour la formation "${formationName}" du ${formationDate}`);
    } catch (error) {
      console.error("Erreur lors de la génération des attestations:", error);
      showNotification("Erreur lors de la génération des attestations");
    }
  }
  
  // Fonction fetchArchives mise à jour pour formater la date côté client
  async function fetchArchives() {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=readArchives`);
      const responseJson = await response.json();
      const archivesContainer = document.getElementById("historiquePanel");
  
      if (!responseJson || !responseJson.values || responseJson.values.length === 0) {
        archivesContainer.innerHTML = `
          <h3 class="section-title title-history"><span class="emoji">📚</span>Historique des formations passées</h3>
          <div class="filter-container">
            <input type="text" id="archiveSearch" placeholder="Rechercher une formation ou un participant...">
            <select id="archiveDateFilter">
              <option value="">Toutes les dates</option>
            </select>
          </div>
          <p>Aucun historique disponible</p>
        `;
        return;
      }
  
      // Trier les formations par date (plus récentes en premier)
      const archives = responseJson.values.map(entry => {
        // Convertir la date en objet Date pour le tri
        const dateParts = formatDateClient(entry.date).split('/');
        const dateObj = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        return {
          ...entry,
          dateObj,
          formattedDate: formatDateClient(entry.date)
        };
      }).sort((a, b) => b.dateObj - a.dateObj); // Tri décroissant par date
  
      // Extraire les années uniques pour les onglets
      const years = [...new Set(archives.map(entry => entry.dateObj.getFullYear()))].sort((a, b) => b - a);
      
      // Préparer le HTML pour les onglets d'années
      let yearsTabsHtml = '<div class="year-tabs">';
      years.forEach((year, index) => {
        yearsTabsHtml += `<div class="year-tab ${index === 0 ? 'active' : ''}" data-year="${year}">${year}</div>`;
      });
      yearsTabsHtml += '</div>';
  
      // Préparer le HTML pour le conteneur des filtres
      const filtersHtml = `
        <div class="filter-container">
          <input type="text" id="archiveSearch" placeholder="Rechercher une formation ou un participant...">
          <div class="filter-group">
            <span class="filter-label">Filtrer par date:</span>
            <select id="archiveDateFilter">
              <option value="">Toutes les dates</option>
            </select>
          </div>
        </div>
      `;
  
      // Initialiser le HTML pour le tableau
      let tableHtml = `
        <table id="archivesTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Formation</th>
              <th>Date</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      // Générer le contenu du tableau pour chaque année
      const tableContentByYear = {};
      years.forEach(year => {
        tableContentByYear[year] = '';
        
        // Filtrer les archives pour cette année
        const archivesForYear = archives.filter(entry => entry.dateObj.getFullYear() === year);
        
        // Grouper par mois
        const monthGroups = {};
        archivesForYear.forEach(entry => {
          const month = entry.dateObj.getMonth();
          if (!monthGroups[month]) {
            monthGroups[month] = [];
          }
          monthGroups[month].push(entry);
        });
        
        // Générer les lignes pour chaque mois
        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        
        // Parcourir les mois dans l'ordre décroissant (du plus récent au plus ancien)
        for (let month = 11; month >= 0; month--) {
          if (monthGroups[month] && monthGroups[month].length > 0) {
            // Ajouter l'en-tête du mois
            tableContentByYear[year] += `
              <tr class="month-group" data-year="${year}" data-month="${month}">
                <td colspan="4">${monthNames[month]} ${year}</td>
              </tr>
            `;
            
            // Ajouter les formations du mois
            tableContentByYear[year] += `<tr class="month-content" data-year="${year}" data-month="${month}"><td colspan="4">
              <table style="width:100%">
            `;
            
            monthGroups[month].forEach(entry => {
              // Traiter les participants
              let participantsHTML = '<div class="participants-list">';
              
              try {
                // Vérifier si les participants contiennent des informations de statut
                if (entry.participants.includes('"status"')) {
                  // Format JSON avec statut
                  const participants = JSON.parse(entry.participants);
                  participants.forEach(p => {
                    const statusClass = p.status === 'present' ? 'status-present' : 'status-absent';
                    participantsHTML += `
                      <div class="participant-item">
                        <div class="participant-status ${statusClass}"></div>
                        <div class="participant-info">
                          <div class="participant-name">${p.nameEmployee || 'N/A'}</div>
                          <div class="participant-details">
                            <span class="participant-matricule">${p.matricule || 'N/A'}</span>
                            <span class="participant-entity">${p.entity || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    `;
                  });
                } else {
                  // Format ancien avec séparateur |||
                  const blocks = entry.participants.split("|||");
                  blocks.forEach((block) => {
                    block = block.trim();
                    if (block) {
                      try {
                        const arr = JSON.parse(block);
                        if (Array.isArray(arr) && arr.length > 0) {
                          const p = arr[0];
                          participantsHTML += `
                            <div class="participant-item">
                              <div class="participant-info">
                                <div class="participant-name">${p.nameEmployee || 'N/A'}</div>
                                <div class="participant-details">
                                  <span class="participant-matricule">${p.matricule || 'N/A'}</span>
                                  <span class="participant-entity">${p.entity || 'N/A'}</span>
                                </div>
                              </div>
                            </div>
                          `;
                        }
                      } catch (e) {
                        console.error("Erreur de parsing du participant:", e);
                      }
                    }
                  });
                }
              } catch (e) {
                console.error("Erreur lors du traitement des participants:", e);
                participantsHTML += "<div>Erreur de format</div>";
              }
              
              participantsHTML += '</div>';
              
              // Ajouter la ligne pour cette formation
              tableContentByYear[year] += `
                <tr data-date="${entry.formattedDate}">
                  <td>${entry.id}</td>
                  <td>${entry.formation}</td>
                  <td>${entry.formattedDate}</td>
                  <td>${participantsHTML || 'Aucun participant'}</td>
                </tr>
              `;
            });
            
            tableContentByYear[year] += `</table></td></tr>`;
          }
        }
      });
      
      // Compléter le HTML du tableau
      tableHtml += `</tbody></table>`;
      
      // Assembler le HTML complet
      archivesContainer.innerHTML = `
        <h3 class="section-title title-history"><span class="emoji">📚</span>Historique des formations passées</h3>
        ${yearsTabsHtml}
        ${filtersHtml}
        <div id="archivesTableContainer"></div>
      `;
      
      // Insérer le tableau pour l'année active (la première par défaut)
      const activeYear = years[0];
      document.getElementById('archivesTableContainer').innerHTML = `
        <table id="archivesTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Formation</th>
              <th>Date</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
            ${tableContentByYear[activeYear]}
          </tbody>
        </table>
      `;
      
      // Ajouter les écouteurs d'événements pour les onglets d'années
      document.querySelectorAll('.year-tab').forEach(tab => {
        tab.addEventListener('click', function() {
          // Mettre à jour l'onglet actif
          document.querySelectorAll('.year-tab').forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          
          // Mettre à jour le contenu du tableau
          const year = parseInt(this.getAttribute('data-year'));
          document.querySelector('#archivesTable tbody').innerHTML = tableContentByYear[year];
          
          // Réattacher les écouteurs pour les groupes de mois
          attachMonthGroupListeners();
          
          // Réappliquer le filtre actuel
          filterArchives();
        });
      });
      
      // Ajouter les écouteurs d'événements pour les groupes de mois
      function attachMonthGroupListeners() {
        // Supprimer les écouteurs existants pour éviter les doublons
        document.querySelectorAll('.month-group').forEach(group => {
          const clone = group.cloneNode(true);
          group.parentNode.replaceChild(clone, group);
        });
        
        // Ajouter les nouveaux écouteurs
        document.querySelectorAll('.month-group').forEach(group => {
          group.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            const month = this.getAttribute('data-month');
            const content = document.querySelector(`.month-content[data-year="${year}"][data-month="${month}"]`);
            
            // Basculer la classe 'collapsed' sur l'en-tête
            this.classList.toggle('collapsed');
            
            // Si le contenu existe, basculer son affichage
            if (content) {
              content.classList.toggle('collapsed');
            }
          });
        });
        
        // Initialiser tous les groupes comme fermés par défaut
        document.querySelectorAll('.month-content').forEach(content => {
          content.classList.add('collapsed');
        });
        
        document.querySelectorAll('.month-group').forEach(group => {
          group.classList.add('collapsed');
        });
      }
      
      attachMonthGroupListeners();
      
      // Peupler le filtre de dates
      populateArchiveDateFilter();
      
      // Ajouter les écouteurs pour les filtres
      document.getElementById('archiveSearch').addEventListener('input', filterArchives);
      document.getElementById('archiveDateFilter').addEventListener('change', filterArchives);
      
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique:", error);
    }
  }
  
  // Fonction de filtrage améliorée
  function filterArchives() {
    const searchTerm = document.getElementById("archiveSearch").value.trim().toLowerCase();
    const selectedDate = document.getElementById("archiveDateFilter").value;
    
    // Sélectionner toutes les lignes de formations (pas les groupes de mois)
    const rows = document.querySelectorAll("#archivesTable tbody tr:not(.month-group):not(.month-content)");
    
    // Compter les formations visibles par mois
    const visibleByMonth = {};
    
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 3) return; // Ignorer les lignes qui ne sont pas des formations
      
      const formationText = cells[1].textContent.toLowerCase();
      const dateText = cells[2].textContent.trim();
      const participantsText = cells[3].textContent.toLowerCase();
      
      const matchesSearch = formationText.includes(searchTerm) || participantsText.includes(searchTerm);
      const matchesDate = selectedDate === "" || dateText === selectedDate;
      
      const isVisible = matchesSearch && matchesDate;
      row.style.display = isVisible ? "" : "none";
      
      // Si la ligne est visible, incrémenter le compteur pour son groupe de mois
      if (isVisible) {
        const monthGroup = row.closest('.month-content');
        if (monthGroup) {
          const year = monthGroup.getAttribute('data-year');
          const month = monthGroup.getAttribute('data-month');
          const key = `${year}-${month}`;
          visibleByMonth[key] = (visibleByMonth[key] || 0) + 1;
        }
      }
    });
    
    // Masquer les groupes de mois qui n'ont pas de formations visibles
    document.querySelectorAll('.month-group').forEach(group => {
      const year = group.getAttribute('data-year');
      const month = group.getAttribute('data-month');
      const key = `${year}-${month}`;
      const content = document.querySelector(`.month-content[data-year="${year}"][data-month="${month}"]`);
      
      const hasVisibleFormations = visibleByMonth[key] > 0;
      group.style.display = hasVisibleFormations ? "" : "none";
      if (content) content.style.display = hasVisibleFormations ? "" : "none";
    });
  }
  
  // Fonction pour peupler le filtre par date sans doublons
  function populateArchiveDateFilter() {
    const rows = document.querySelectorAll("#archivesTable tbody tr:not(.month-group):not(.month-content)");
    const datesSet = new Set();
  
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length >= 3) {
        const date = cells[2].textContent.trim();
        if (date !== "") {
          datesSet.add(date);
        }
      }
    });
    
    const dateFilter = document.getElementById("archiveDateFilter");
    dateFilter.innerHTML = `<option value="">Toutes les dates</option>`;
    
    // Trier les dates du plus récent au plus ancien
    Array.from(datesSet)
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.split('/').map(Number);
        const [dayB, monthB, yearB] = b.split('/').map(Number);
        
        if (yearA !== yearB) return yearB - yearA;
        if (monthA !== monthB) return monthB - monthA;
        return dayB - dayA;
      })
      .forEach(date => {
        const option = document.createElement("option");
        option.value = date;
        option.textContent = date;
        dateFilter.appendChild(option);
      });
  }
  
  // Fonction pour convertir une date au format DD/MM/YYYY en format ISO (YYYY-MM-DD)
  function convertDMYToISO(dateStr) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0");
      const month = parts[1].padStart(2, "0");
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
    return dateStr;
  }
  
  // Fonction pour extraire les événements à partir du tableau des formations
  function getEventsFromFormations() {
    // Sélectionne toutes les lignes du tableau de formations
    const formationRows = document.querySelectorAll("#formationsTable tbody tr");
    const eventsMap = new Map(); // Pour éviter les doublons
  
    formationRows.forEach((row) => {
      // Récupérer l'ID de la formation depuis la première cellule
      const idCell = row.querySelector("td");
      if (!idCell) return;
      const formationId = idCell.textContent.trim();
  
      // Récupérer le nom de la formation depuis la cellule avec la classe "data-formation"
      const formationNameCell = row.querySelector(".data-formation");
      if (!formationNameCell) return;
      const formationName = formationNameCell.textContent.trim();
  
      // Récupérer l'objet formation complet à partir de window.formationsData
      const formationObj = window.formationsData
        ? window.formationsData.find((f) => f.id.toString() === formationId)
        : null;
  
      // Récupérer toutes les dates cliquables dans cette ligne
      const clickableDates = row.querySelectorAll(".clickable-date");
      clickableDates.forEach((span) => {
        const dateStr = span.getAttribute("data-date");
        if (!dateStr) return;
        const isoDate = convertDMYToISO(dateStr);
  
        // Calculer le nombre de participants pour cette formation et cette date
        let count = 0;
        if (formationObj) {
          count = getParticipantsCount(formationObj, dateStr);
        } else {
          // Si formationObj n'est pas disponible, on tente d'extraire le compte depuis le texte du span (format "DD/MM/YYYY (X/12)")
          let countMatch = span.textContent.match(/\((\d+)\/12\)/);
          if (countMatch && countMatch[1]) {
            count = parseInt(countMatch[1], 10);
          }
        }
  
        // Déterminer la couleur de fond selon le nombre de participants
        let bgColor = "grey";
        if (count >= 1 && count <= 5) {
          bgColor = "#f49f42";
        } else if (count >= 6) {
          bgColor = "#37ec5f";
        }
  
        // Construire le titre de l'événement au format "Formation Name (X/12)"
        const eventTitle = `${formationName} (${count}/12)`;
  
        // Créer une clé unique pour éviter les doublons
        const key = isoDate + "|" + formationName;
        if (!eventsMap.has(key)) {
          eventsMap.set(key, {
            title: eventTitle,
            start: isoDate,
            backgroundColor: bgColor,
            borderColor: bgColor,
            extendedProps: { formationId: formationId, count: count },
          });
        }
      });
    });
  
    return Array.from(eventsMap.values());
  }
  
  function initCalendarFromFormations() {
    const events = getEventsFromFormations();
    const calendarEl = document.getElementById("calendar");
  
    const calendar = new FullCalendar.Calendar(calendarEl, {
      locale: "fr",
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "",
      },
      events: events,
      eventClick: function (info) {
        // Convertir la date de l'événement en format DD/MM/YYYY
        const d = info.event.start;
        const day = ("0" + d.getDate()).slice(-2);
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
  
        // Récupérer formationId depuis extendedProps
        const formationId = info.event.extendedProps.formationId;
  
        // Chercher la formation dans la variable globale formationsData
        const formation = window.formationsData.find(
          (f) => f.id.toString() === formationId
        );
        if (formation) {
          showParticipantsModal(formation, formattedDate);
        } else {
          alert("Formation not found for ID: " + formationId);
        }
      },
    });
    calendar.render();
  }
  
  // Gestion du modal calendrier
  const openCalendarBtn = document.getElementById("openCalendarBtn");
  const calendarModal = document.getElementById("calendarModal");
  const closeCalendar = document.getElementById("closeCalendar");
  
  openCalendarBtn.addEventListener("click", () => {
    calendarModal.style.display = "block";
    initCalendarFromFormations();
  });
  
  closeCalendar.addEventListener("click", () => {
    calendarModal.style.display = "none";
  });
  
  window.addEventListener("click", (event) => {
    if (event.target === calendarModal) {
      calendarModal.style.display = "none";
    }
  });
  
  /* =================== TÂCHES MODULE =================== */
  
  // Task Form submission: l'état est forcé à "Due"
  document.getElementById("taskForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const concerne = document.getElementById("taskConcerne").value;
    const description = document.getElementById("taskDescription").value;
    const importance = document.getElementById("taskImportance").value;
  
    if (!concerne || !description || !importance) {
      showNotification("Veuillez remplir tous les champs du formulaire.");
      return;
    }
  
    try {
      // Afficher une notification de chargement
      showNotification("Enregistrement de la tâche en cours...");
      
      // Faire la requête d'ajout
      const response = await fetch(
        `${SCRIPT_URL}?action=addTask&concerne=${encodeURIComponent(
          concerne
        )}&tache=${encodeURIComponent(description)}&importance=${encodeURIComponent(
          importance
        )}`
      );
      
      const result = await response.json();
      
      if (result.success) {
        // Réinitialiser le formulaire
        document.getElementById("taskForm").reset();
        
        // Rafraîchir la liste des tâches
        await fetchTasks();
        
        // Afficher une notification de succès avec une petite animation
        const taskCard = document.querySelector(".task-card");
        if (taskCard) {
          taskCard.style.animation = "none";
          setTimeout(() => {
            taskCard.style.animation = "fadeInTask 0.8s ease forwards";
          }, 10);
        }
        
        showNotification("Tâche ajoutée avec succès !");
      } else {
        showNotification("Erreur lors de l'ajout de la tâche: " + result.error);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
      showNotification("Erreur lors de l'ajout de la tâche.");
    }
  });
  
  // Function to fetch active tasks (state "Due")
  async function fetchTasks() {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=readTasks`);
      const data = await response.json();
      const container = document.getElementById("activeTasksContainer");
      if (!data || !data.values || data.values.length === 0) {
        container.innerHTML = `<div class="no-tasks-message">Aucune tâche active pour le moment</div>`;
        return;
      }
      
      let html = '';
      data.values.forEach((task) => {
        html += `
          <div class="task-card importance-${task.importance.toLowerCase()}">
            <div class="task-header">
              <h4 class="task-title">${task.concerne}</h4>
              <span class="task-badge badge-${task.importance.toLowerCase()}">${task.importance}</span>
            </div>
            <p class="task-description">${task.tache}</p>
            <div class="task-actions">
              <button class="btn-complete-task" data-id="${task.id}">✅ Terminer</button>
              <button class="btn-delete-task" data-id="${task.id}">🗑️ Supprimer</button>
            </div>
          </div>
        `;
      });
      
      container.innerHTML = html;
  
      // Attach event listeners for "Accompli" button
      document.querySelectorAll(".btn-complete-task").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.target.getAttribute("data-id");
          try {
            const response = await fetch(
              `${SCRIPT_URL}?action=updateTaskState&id=${id}&etat=Accomplie`
            );
            const result = await response.json();
            if (!result.success) {
              alert(
                "Erreur lors de la mise à jour de l'état de la tâche: " +
                  result.error
              );
            }
            await fetchTasks();
            await fetchTasksHistory();
          } catch (error) {
            console.error("Erreur updateTaskState:", error);
          }
        });
      });
  
      // Attach event listeners for "Supprimer" button
      document.querySelectorAll(".btn-delete-task").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          showNotification("Veuillez patienter.. Suppression de tâche en cours.");
          const id = e.target.getAttribute("data-id");
          await deleteTask(id);
          await fetchTasks();
          setTimeout(() => {
            showNotification("Tâche supprimée avec succès !");
          }, 1000);
        });
      });
    } catch (error) {
      showNotification("Erreur lors de la récupération des tâches actives.");
    }
  }
  
  // Function to fetch tasks history (state "Accomplie")
  async function fetchTasksHistory() {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=readTasksHistory`);
      const data = await response.json();
      const container = document.getElementById("tasksHistoryContainer");
      if (!data || !data.values || data.values.length === 0) {
        container.innerHTML = `<div class="no-tasks-message">Aucune tâche accomplie pour le moment</div>`;
        return;
      }
      
      let html = '';
      data.values.forEach((task) => {
        html += `
          <div class="task-card history-task importance-${task.importance.toLowerCase()}">
            <div class="task-header">
              <h4 class="task-title">${task.concerne}</h4>
              <span class="task-badge badge-${task.importance.toLowerCase()}">${task.importance}</span>
            </div>
            <p class="task-description">${task.tache}</p>
            <div class="task-actions">
              <button class="btn-delete-task" data-id="${task.id}">🗑️ Supprimer</button>
            </div>
          </div>
        `;
      });
      
      container.innerHTML = html;
  
      // Attach event listeners for "Supprimer" button in history
      document
        .querySelectorAll("#tasksHistoryContainer .btn-delete-task")
        .forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            const id = e.target.getAttribute("data-id");
            await deleteTask(id);
            await fetchTasksHistory();
          });
        });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'historique des tâches :",
        error
      );
    }
  }
  
  // Function to delete a task by ID
  async function deleteTask(id) {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=deleteTask&id=${id}`);
      const result = await response.json();
      if (!result.success) {
        console.log("Erreur lors de la suppression de la tâche: " + result.error);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
    }
  }
  
  // Listener for "Effacer l'historique" button
  document.getElementById("clearHistoryBtn").addEventListener("click", async () => {
    // Utiliser notre modal de confirmation personnalisé au lieu du confirm natif
    const result = await customConfirmDelete("Voulez-vous vraiment effacer l'historique des tâches accomplies ?");
    
    if (result) {
      try {
        showNotification("Effacement de l'historique en cours...");
        const response = await fetch(`${SCRIPT_URL}?action=clearTasksHistory`);
        const result = await response.json();
        
        if (result.success) {
          await fetchTasksHistory();
          showNotification("L'historique des tâches a été effacé avec succès.");
        } else {
          showNotification("Erreur lors de l'effacement de l'historique: " + result.error);
        }
      } catch (error) {
        console.error("Erreur lors de l'effacement de l'historique:", error);
        showNotification("Erreur lors de l'effacement de l'historique.");
      }
    }
  });
  
  // Fonction pour diagnostiquer la structure de la feuille "Formations"
  async function diagFormationsSheet() {
    try {
      showNotification("Diagnostic en cours...");
      const response = await fetch(`${SCRIPT_URL}?action=diagFormations`);
      const result = await response.json();
      
      if (!result.success) {
        showNotification("Erreur lors du diagnostic: " + result.error);
        console.error("Erreur de diagnostic:", result.error);
        return;
      }
      
      console.log("=== DIAGNOSTIC DE LA FEUILLE FORMATIONS ===");
      console.log("Informations sur la feuille:", result.sheetInfo);
      console.log("En-têtes trouvés:", result.headers);
      console.log("Colonnes requises:", result.requiredColumns);
      console.log("Exemple de données:", result.sampleRow);
      
      // Afficher un résumé dans une notification
      let message = "Diagnostic terminé. ";
      if (result.requiredColumns.id && result.requiredColumns.name && 
          result.requiredColumns.dates && result.requiredColumns.participants) {
        message += "Toutes les colonnes requises sont présentes.";
      } else {
        message += "Colonnes manquantes: ";
        if (!result.requiredColumns.id) message += "id, ";
        if (!result.requiredColumns.name) message += "name, ";
        if (!result.requiredColumns.dates) message += "dates, ";
        if (!result.requiredColumns.participants) message += "participants, ";
        message = message.slice(0, -2); // Enlever la dernière virgule et espace
      }
      
      showNotification(message);
      return result;
    } catch (error) {
      console.error("Erreur lors du diagnostic:", error);
      showNotification("Erreur lors du diagnostic");
    }
  }
  
  // Fonction pour supprimer une formation de la liste des clôtures en attente
  async function deleteFromPendingClosure(id, date) {
    try {
      // Ajouter une animation de fondu sur la ligne à supprimer
      const row = document.querySelector(`.btn-delete-formation[data-id="${id}"][data-date="${date}"]`).closest('tr');
      
      // Animation de fondu et déplacement vers le haut
      row.style.transition = 'all 0.5s ease';
      row.style.opacity = '0';
      row.style.transform = 'translateY(-20px)';
      
      // Attendre un peu pour que l'animation soit visible
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Appeler l'API pour supprimer la formation
      const response = await fetch(`${SCRIPT_URL}?action=deleteFromPendingClosure&id=${id}&date=${date}`);
      const result = await response.json();
      
      if (result.success) {
        // Attendre la fin de l'animation avant de rafraîchir
        setTimeout(async () => {
          showNotification("Formation supprimée avec succès");
          // Rafraîchir la liste des formations à clôturer
          await fetchPendingClosure();
        }, 200);
      } else {
        // En cas d'erreur, restaurer la ligne
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
        showNotification("Erreur lors de la suppression de la formation");
        console.error("Erreur:", result.error);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la formation:", error);
      showNotification("Erreur lors de la suppression de la formation");
      // Rafraîchir en cas d'erreur pour rétablir l'état
      await fetchPendingClosure();
    }
  }
  
  function customConfirmDelete(message) {
    return new Promise((resolve) => {
      const modal = document.getElementById("confirmModal2");
      const confirmMessage = document.getElementById("confirmMessage2");
      const btnYes = document.getElementById("confirmYes2");
      const btnNo = document.getElementById("confirmNo2");
  
      confirmMessage.textContent = message;
      modal.style.display = "block";
  
      function cleanUp() {
        modal.style.display = "none";
        btnYes.removeEventListener("click", onYes);
        btnNo.removeEventListener("click", onNo);
      }
  
      function onYes() {
        cleanUp();
        resolve(true);
      }
      function onNo() {
        cleanUp();
        resolve(false);
      }
  
      btnYes.addEventListener("click", onYes);
      btnNo.addEventListener("click", onNo);
    });
  }
  
  // Fonction utilitaire pour essayer de parser une date de plusieurs façons
  function tryParseDate(dateStr) {
    if (!dateStr) return null;
    
    // Vérifier si c'est déjà au format dd/mm/yyyy
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const parts = dateStr.split("/");
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    
    // Essayer de parser comme une date standard
    const normalDate = new Date(dateStr);
    if (!isNaN(normalDate.getTime())) {
      return normalDate;
    }
    
    // Rechercher un motif de date dans la chaîne
    const datePattern = /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/;
    const match = dateStr.match(datePattern);
    if (match) {
      const day = parseInt(match[1]);
      const month = parseInt(match[2]) - 1;
      let year = parseInt(match[3]);
      if (year < 100) year += 2000; // Supposer que 2 chiffres sont 20xx
      return new Date(year, month, day);
    }
    
    return null; // Si aucun format ne correspond
  }
  
  // Fonction pour calculer les heures de formation en fonction du nom de la formation
  function calculateTrainingHours(formationName) {
    // Extraire le code de formation (ex: FOR001)
    const formationCode = getFormationCode(formationName);
    
    // Durées en heures selon le code de formation
    const hoursByFormation = {
      'FOR001': 3.5,
      'FOR002': 3.5,
      'FOR004': 7,  // Peut être 3.5 ou 7, on prend 7 par défaut
      'FOR006': 7,
      'FOR007': 7,
      'FOR009': 7,
      'FOR010': 7,
      'FOR011': 3.5,
      'FOR012': 3.5,
      'FOR016': 3.5,
      'FOR018': 3.5,
      'JTF': 7      // Généralement FOR001 + FOR002
    };
    
    // Retourner la durée correspondante ou 3.5 par défaut
    return hoursByFormation[formationCode] || 3.5;
  }
  
  // Fonction pour calculer et afficher les statistiques
  async function loadStatistics() {
    try {
      // Vérifier si les éléments HTML existent
      const totalTraineesElement = document.getElementById('totalTrainees');
      const traineesPerMonthElement = document.getElementById('traineesPerMonth');
      const totalHoursElement = document.getElementById('totalHours');
      const hoursPerMonthElement = document.getElementById('hoursPerMonth');
      const totalSessionsElement = document.getElementById('totalSessions');
      const sessionsPerMonthElement = document.getElementById('sessionsPerMonth');
      const formationsPodiumElement = document.getElementById('formationsPodium');
      
      // Si les éléments n'existent pas, sortir de la fonction
      if (!totalTraineesElement) return;
      
      // Récupérer les archives de formation
      const response = await fetch(`${SCRIPT_URL}?action=readArchives`);
      const result = await response.json();
      
      if (!result || !result.values || result.values.length === 0) {
        console.error("Erreur lors de la récupération des archives");
        displayErrorStats();
        return;
      }
      
      const archives = result.values;
      
      // Date de début pour les statistiques (23 mars 2023)
      const startDate = new Date(2023, 2, 23); // Mois commence à 0 en JS
      
      // Filtrer les archives après la date de début
      const validArchives = archives.filter(archive => {
        try {
          const archiveDate = parseDDMMYYYY(archive.date);
          return archiveDate >= startDate;
        } catch (e) {
          console.error("Erreur lors du parsing de la date:", archive.date, e);
          return false;
        }
      });
      
      // Calculer le nombre total de stagiaires et d'heures
      let totalTrainees = 0;
      let totalHours = 0;
      const formationCounts = {};
      const formationTrainees = {};
      
      validArchives.forEach(archive => {
        // Récupérer le nom de la formation (peut être dans archive.name ou archive.formation)
        const formationName = archive.name || archive.formation;
        
        // Récupérer la durée de la formation en heures (convertir en nombre)
        const formationHours = parseFloat(getHeures(formationName)) || 3.5; // Par défaut 3.5h si non trouvé
        
        // Compter les participants présents
        let presentParticipants = [];
        
        try {
          if (archive.participants) {
            // Analyser le format des participants
            if (archive.participants.includes('"status"')) {
              // Format JSON avec statut
              try {
                const participants = JSON.parse(archive.participants);
                // Filtrer uniquement les participants présents
                presentParticipants = participants.filter(p => p.status !== 'absent' && p.present !== false);
              } catch (e) {
                console.error("Erreur lors du parsing JSON des participants:", e);
              }
            } else if (archive.participants.includes('|||')) {
              // Format ancien avec séparateur |||
              const blocks = archive.participants.split("|||");
              blocks.forEach(block => {
                block = block.trim();
                if (block) {
                  try {
                    const arr = JSON.parse(block);
                    if (Array.isArray(arr)) {
                      // Ajouter tous les participants (pas de notion d'absence dans l'ancien format)
                      presentParticipants = presentParticipants.concat(arr);
                    }
                  } catch (e) {
                    console.error("Erreur lors du parsing d'un bloc de participants:", e);
                  }
                }
              });
            } else {
              // Format avec getBlocks
              const blocks = getBlocks(archive.participants);
              blocks.forEach(block => {
                try {
                  const blockDate = new Date(block.date);
                  const archiveDate = parseDDMMYYYY(archive.date);
                  
                  if (isSameDate(blockDate, archiveDate)) {
                    const participantsData = JSON.parse(block.json);
                    const participantsArray = Array.isArray(participantsData) ? participantsData : [participantsData];
                    
                    // Filtrer uniquement les participants présents
                    const presentInBlock = participantsArray.filter(p => p.present !== false && p.status !== 'absent');
                    presentParticipants = presentParticipants.concat(presentInBlock);
                  }
                } catch (e) {
                  console.error("Erreur lors du parsing d'un bloc de participants:", e);
                }
              });
            }
          }
        } catch (e) {
          console.error("Erreur lors du traitement des participants:", e);
        }
        
        // Nombre de participants présents pour cette formation
        const presentCount = presentParticipants.length;
        totalTrainees += presentCount;
        
        // Calculer les heures de formation pour cette session
        // (durée de la formation × nombre de participants présents)
        const sessionHours = formationHours * presentCount;
        totalHours += sessionHours;
        
        // Compter les occurrences de chaque formation et les stagiaires par formation
        const formationCode = getFormationCode(formationName);
        if (formationCode) {
          formationCounts[formationCode] = (formationCounts[formationCode] || 0) + 1;
          formationTrainees[formationCode] = (formationTrainees[formationCode] || 0) + presentCount;
        }
      });
      
      // Nombre total de sessions de formation
      const totalSessions = validArchives.length;
      
      // Calculer les moyennes mensuelles
      const now = new Date();
      const monthsDiff = (now.getFullYear() - startDate.getFullYear()) * 12 + now.getMonth() - startDate.getMonth();
  
      // Au lieu d'utiliser tous les mois depuis mars 2023, comptons uniquement les mois actifs
      // où il y a eu au moins une formation
      const uniqueMonths = new Set();
      validArchives.forEach(archive => {
        try {
          const date = parseDDMMYYYY(archive.date);
          const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
          uniqueMonths.add(monthKey);
        } catch (e) {
          console.error("Erreur lors du parsing de la date pour les mois actifs:", archive.date, e);
        }
      });
  
      // Nombre de mois où il y a eu au moins une formation
      const activeMonths = Math.max(1, uniqueMonths.size); // Au moins 1 mois pour éviter division par zéro
  
      // Calculer les moyennes basées sur les mois actifs uniquement
      const traineesPerMonth = Math.round(totalTrainees / activeMonths);
      const hoursPerMonth = Math.round(totalHours / activeMonths);
      const sessionsPerMonth = Math.round(totalSessions / activeMonths);
      
      // Trouver les formations les plus populaires (par nombre de stagiaires)
      const popularFormations = Object.entries(formationTrainees)
        .map(([code, count]) => ({ code, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
      
      // Afficher les résultats avec une animation de compteur
      animateCounter(totalTraineesElement, totalTrainees);
      traineesPerMonthElement.textContent = `${traineesPerMonth} stagiaires / mois en moyenne`;
      
      animateCounter(totalHoursElement, totalHours);
      hoursPerMonthElement.textContent = `${hoursPerMonth} heures / mois en moyenne`;
      
      animateCounter(totalSessionsElement, totalSessions);
      sessionsPerMonthElement.textContent = `${sessionsPerMonth} sessions / mois en moyenne`;
      
      // Générer le podium des formations les plus populaires
      generatePodium(formationsPodiumElement, popularFormations);
      
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
      displayErrorStats();
    }
  }
  
  // Fonction pour animer un compteur
  function animateCounter(element, targetValue) {
    if (!element) return;
    
    // Supprimer le loader
    element.innerHTML = '0';
    
    const duration = 2000; // durée de l'animation en ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentValue = Math.round(easeOutQuad(progress) * targetValue);
      
      element.textContent = currentValue.toLocaleString();
      
      if (frame === totalFrames) {
        clearInterval(counter);
        element.textContent = targetValue.toLocaleString();
      }
    }, frameDuration);
  }
  
  // Fonction d'easing pour l'animation
  function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }
  
  // Fonction pour générer le podium des formations
  function generatePodium(element, popularFormations) {
    if (!element) return;
    
    // Supprimer le loader
    element.innerHTML = '';
    
    if (popularFormations.length === 0) {
      element.innerHTML = '<p>Aucune donnée disponible</p>';
      return;
    }
    
    // Réorganiser le podium pour avoir la 1ère place au milieu
    // Ordre d'affichage: 2e place, 1ère place, 3e place
    const podiumOrder = popularFormations.length >= 3 
      ? [popularFormations[1], popularFormations[0], popularFormations[2]] 
      : popularFormations;
    
    // Créer le podium
    podiumOrder.forEach((formation, index) => {
      // Déterminer la vraie position (2, 1, 3) au lieu de l'index (0, 1, 2)
      let position;
      if (index === 0) position = 2;
      else if (index === 1) position = 1;
      else position = 3;
      
      const podiumItem = document.createElement('div');
      podiumItem.className = `podium-item podium-${position}`;
      
      const podiumBar = document.createElement('div');
      podiumBar.className = 'podium-bar';
      podiumBar.style.position = 'relative';
      
      const podiumPosition = document.createElement('div');
      podiumPosition.className = 'podium-position';
      podiumPosition.textContent = position;
      podiumBar.appendChild(podiumPosition);
      
      const podiumContent = document.createElement('div');
      podiumContent.className = 'podium-content';
      
      const podiumName = document.createElement('div');
      podiumName.className = 'podium-name';
      // Utiliser uniquement le code de la formation
      podiumName.textContent = formation.code;
      
      const podiumValue = document.createElement('div');
      podiumValue.className = 'podium-value';
      podiumValue.textContent = `${formation.count} stagiaires`;
      
      podiumContent.appendChild(podiumName);
      podiumContent.appendChild(podiumValue);
      
      podiumItem.appendChild(podiumBar);
      podiumItem.appendChild(podiumContent);
      
      element.appendChild(podiumItem);
    });
  }
  
  // Fonction pour obtenir le nom complet d'une formation à partir de son code
  function getFormationName(code) {
    const formationNames = {
      'FOR001': 'Les bases de l\'agent de Service',
      'FOR002': 'Les règles d\'hygiène et de sécurité',
      'FOR004': 'Entretien des bureaux et des sanitaires',
      'FOR006': 'Lustrage et spray méthode',
      'FOR007': 'Décapage et pose d\'émulsion',
      'FOR009': 'Récurage à la monobrosse',
      'FOR010': 'Shampoing moquette et injection-extraction',
      'FOR011': 'Habilitation à la monobrosse',
      'FOR012': 'Habilitation à l\'autolaveuse',
      'FOR016': 'Bionettoyage en secteur hospitalier',
      'FOR018': 'Intervention en salle propre',
      'JTF': 'Journée thématique de formation'
    };
    
    return formationNames[code] || code;
  }
  
  // Afficher un message d'erreur dans les statistiques
  function displayErrorStats() {
    const elements = [
      'totalTrainees', 'traineesPerMonth', 
      'totalHours', 'hoursPerMonth', 
      'totalSessions', 'sessionsPerMonth'
    ];
    
    elements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        if (element.classList.contains('stats-number')) {
          element.innerHTML = '<span style="color:#f44336">--</span>';
        } else {
          element.innerHTML = '<span style="color:#f44336">Données non disponibles</span>';
        }
      }
    });
    
    const podiumElement = document.getElementById('formationsPodium');
    if (podiumElement) {
      podiumElement.innerHTML = '<p style="text-align:center;color:#f44336">Impossible de charger les données</p>';
    }
  }
  
  // Exposer fetchPendingClosure dans le scope global
  window.fetchPendingClosure = fetchPendingClosure;
  
  // Exposer syncAllData dans le scope global pour utilisation manuelle
  // Utilisation: window.syncAllData() ou syncAllData() dans la console
  window.syncAllData = syncAllData;
  
  /* =================== Utilitaires =================== */
  
  // Fonction pour créer un effet de fade out fluide avant le refresh
  function smoothRefresh(postRefreshMessage = null) {
    // Si un message est fourni, le stocker dans sessionStorage pour l'afficher après le refresh
    if (postRefreshMessage) {
      sessionStorage.setItem('postRefreshMessage', postRefreshMessage);
    }

    // Créer un overlay de transition
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    overlay.style.zIndex = '9999';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.innerHTML = '<div style="font-size: 18px; color: #333;">Mise à jour...</div>';
    
    document.body.appendChild(overlay);
    
    // Faire apparaître l'overlay
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 50);
    
    // Refresh après l'animation
    setTimeout(() => {
      window.location.reload();
    }, 400);
  }
  
  /* =================== Configuration =================== */
  
  // Système de notification automatique pour l'admin
  let notificationState = {
    lastPendingRequestsCount: 0,
    lastPendingClosureCount: 0,
    initialized: false
  };

  // Fonction pour vérifier et afficher les notifications
  async function checkForNotifications() {
    // Vérifier si l'admin est connecté
    if (getCookie("adminAuth") !== "true") {
      console.log("🔍 [NOTIF] Admin non connecté, arrêt des notifications");
      return;
    }

    console.log("🔍 [NOTIF] Vérification des notifications...");

    try {
      // Récupérer les demandes en attente
      const pendingResponse = await fetch(`${SCRIPT_URL}?action=readPending&t=${Date.now()}`);
      const pendingData = await pendingResponse.json();
      const currentPendingCount = pendingData.values ? pendingData.values.length : 0;

      // Récupérer les formations à clôturer
      const closureResponse = await fetch(`${SCRIPT_URL}?action=readPendingClosure&t=${Date.now()}`);
      const closureData = await closureResponse.json();
      const currentClosureCount = closureData.values ? closureData.values.length : 0;

      console.log(`🔍 [NOTIF] Demandes en attente: ${currentPendingCount}, Formations à clôturer: ${currentClosureCount}`);
      console.log(`🔍 [NOTIF] Précédents - Demandes: ${notificationState.lastPendingRequestsCount}, Clôtures: ${notificationState.lastPendingClosureCount}`);

      // Si c'est la première vérification, initialiser les compteurs
      if (!notificationState.initialized) {
        notificationState.lastPendingRequestsCount = currentPendingCount;
        notificationState.lastPendingClosureCount = currentClosureCount;
        notificationState.initialized = true;
        console.log("🔍 [NOTIF] Système initialisé avec les compteurs actuels");
        
        // Notifications avec délais progressifs pour éviter la superposition
        let delay = 0;
        
        // 1. Notification système (immédiate)
        showNotificationWithIcon("🔔 Système de notifications activé !", 'success', 3000);
        delay += 1000; // 1 seconde de délai
        
        // 2. Notification demandes en attente (après 1s)
        if (currentPendingCount > 0) {
          setTimeout(() => {
            showNotificationWithIcon(
              `🔔 ${currentPendingCount} demande${currentPendingCount > 1 ? 's' : ''} en attente !`,
              'info',
              5000,
              () => {
                // Fonction pour naviguer vers la section
                const goToPendingRequests = () => {
                  const pendingSection = document.getElementById('pendingRequests');
                  if (pendingSection) {
                    pendingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Effet de surbrillance temporaire
                    pendingSection.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                    setTimeout(() => {
                      pendingSection.style.backgroundColor = '';
                    }, 2000);
                  }
                };

                // Vérifier si on est sur la page admin
                const adminPanel = document.getElementById('adminPanel');
                if (adminPanel && adminPanel.style.display !== 'none') {
                  // Déjà sur la page admin, faire le scroll directement
                  goToPendingRequests();
                } else {
                  // Pas sur la page admin, naviguer d'abord
                  const menuAdmin = document.getElementById('menuAdmin');
                  if (menuAdmin) {
                    menuAdmin.click(); // Aller à la page admin
                    // Attendre que la page admin se charge puis faire le scroll
                    setTimeout(goToPendingRequests, 500);
                  }
                }
              }
            );
          }, delay);
          delay += 1000; // +1 seconde pour la suivante
        }
        
        // 3. Notification formations à clôturer (après 2s)
        if (currentClosureCount > 0) {
          setTimeout(() => {
            showNotificationWithIcon(
              `✅ ${currentClosureCount} formation${currentClosureCount > 1 ? 's' : ''} à clôturer !`,
              'warning',
              5000,
              () => {
                // Fonction pour naviguer vers la section
                const goToClosureSection = () => {
                  const closureSection = document.getElementById('pendingClosurePanel');
                  if (closureSection) {
                    closureSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Effet de surbrillance temporaire
                    closureSection.style.backgroundColor = 'rgba(243, 156, 18, 0.1)';
                    setTimeout(() => {
                      closureSection.style.backgroundColor = '';
                    }, 2000);
                  }
                };

                // Vérifier si on est sur la page admin
                const adminPanel = document.getElementById('adminPanel');
                if (adminPanel && adminPanel.style.display !== 'none') {
                  // Déjà sur la page admin, faire le scroll directement
                  goToClosureSection();
                } else {
                  // Pas sur la page admin, naviguer d'abord
                  const menuAdmin = document.getElementById('menuAdmin');
                  if (menuAdmin) {
                    menuAdmin.click(); // Aller à la page admin
                    // Attendre que la page admin se charge puis faire le scroll
                    setTimeout(goToClosureSection, 500);
                  }
                }
              }
            );
          }, delay);
        }
        
        return;
      }

      // Vérifier s'il y a de nouvelles demandes en attente
      if (currentPendingCount > notificationState.lastPendingRequestsCount) {
        const newRequests = currentPendingCount - notificationState.lastPendingRequestsCount;
        console.log(`🔍 [NOTIF] ${newRequests} nouvelle(s) demande(s) détectée(s)`);
        showNotificationWithIcon(
          `🔔 ${newRequests} nouvelle${newRequests > 1 ? 's' : ''} demande${newRequests > 1 ? 's' : ''} en attente !`,
          'info',
          5000,
          () => {
            // Fonction pour naviguer vers la section
            const goToPendingRequests = () => {
              const pendingSection = document.getElementById('pendingRequests');
              if (pendingSection) {
                pendingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Effet de surbrillance temporaire
                pendingSection.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                setTimeout(() => {
                  pendingSection.style.backgroundColor = '';
                }, 2000);
              }
            };

            // Vérifier si on est sur la page admin
            const adminPanel = document.getElementById('adminPanel');
            if (adminPanel && adminPanel.style.display !== 'none') {
              // Déjà sur la page admin, faire le scroll directement
              goToPendingRequests();
            } else {
              // Pas sur la page admin, naviguer d'abord
              const menuAdmin = document.getElementById('menuAdmin');
              if (menuAdmin) {
                menuAdmin.click(); // Aller à la page admin
                // Attendre que la page admin se charge puis faire le scroll
                setTimeout(goToPendingRequests, 500);
              }
            }
          }
        );
      }

      // Vérifier s'il y a de nouvelles formations à clôturer
      if (currentClosureCount > notificationState.lastPendingClosureCount) {
        const newClosures = currentClosureCount - notificationState.lastPendingClosureCount;
        console.log(`🔍 [NOTIF] ${newClosures} nouvelle(s) formation(s) à clôturer détectée(s)`);
        showNotificationWithIcon(
          `✅ ${newClosures} nouvelle${newClosures > 1 ? 's' : ''} formation${newClosures > 1 ? 's' : ''} à clôturer !`,
          'warning',
          5000,
          () => {
            // Fonction pour naviguer vers la section
            const goToClosureSection = () => {
              const closureSection = document.getElementById('pendingClosurePanel');
              if (closureSection) {
                closureSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Effet de surbrillance temporaire
                closureSection.style.backgroundColor = 'rgba(243, 156, 18, 0.1)';
                setTimeout(() => {
                  closureSection.style.backgroundColor = '';
                }, 2000);
              }
            };

            // Vérifier si on est sur la page admin
            const adminPanel = document.getElementById('adminPanel');
            if (adminPanel && adminPanel.style.display !== 'none') {
              // Déjà sur la page admin, faire le scroll directement
              goToClosureSection();
            } else {
              // Pas sur la page admin, naviguer d'abord
              const menuAdmin = document.getElementById('menuAdmin');
              if (menuAdmin) {
                menuAdmin.click(); // Aller à la page admin
                // Attendre que la page admin se charge puis faire le scroll
                setTimeout(goToClosureSection, 500);
              }
            }
          }
        );
      }

      // Mettre à jour les compteurs
      notificationState.lastPendingRequestsCount = currentPendingCount;
      notificationState.lastPendingClosureCount = currentClosureCount;

    } catch (error) {
      console.error('Erreur lors de la vérification des notifications:', error);
    }
  }

  // Fonction pour afficher une notification avec icône et type
  function showNotificationWithIcon(message, type = 'info', duration = 3000, clickAction = null) {
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.innerHTML = message;
    
    // Calculer la position en fonction des notifications existantes
    const existingNotifications = document.querySelectorAll('.admin-notification');
    let topPosition = 20; // Position de base
    
    // Empiler les notifications en dessous des existantes
    existingNotifications.forEach(notif => {
      const rect = notif.getBoundingClientRect();
      topPosition += rect.height + 10; // Hauteur + espacement
    });
    
    // Styles pour les différents types de notifications
    const styles = {
      position: 'fixed',
      top: `${topPosition}px`,
      right: '20px',
      padding: '15px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: '10000',
      fontSize: '14px',
      fontWeight: '500',
      color: 'white',
      minWidth: '300px',
      maxWidth: '400px',
      animation: 'slideInRight 0.3s ease-out',
      cursor: clickAction ? 'pointer' : 'default',
      transition: 'transform 0.2s ease'
    };

    // Couleurs selon le type
    const typeColors = {
      info: '#3498db',
      warning: '#f39c12',
      success: '#27ae60',
      error: '#e74c3c'
    };

    Object.assign(notification.style, styles);
    notification.style.backgroundColor = typeColors[type] || typeColors.info;

    // Effet hover si cliquable
    if (clickAction) {
      notification.addEventListener('mouseenter', () => {
        notification.style.transform = 'scale(1.02)';
      });
      notification.addEventListener('mouseleave', () => {
        notification.style.transform = 'scale(1)';
      });
    }

    // Ajouter les styles d'animation si pas déjà présents
    if (!document.querySelector('#admin-notification-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'admin-notification-styles';
      styleSheet.textContent = `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        .admin-notification:hover {
          opacity: 0.9;
        }
      `;
      document.head.appendChild(styleSheet);
    }

    document.body.appendChild(notification);

    // Gérer le clic
    notification.addEventListener('click', () => {
      if (clickAction) {
        clickAction(); // Exécuter l'action de clic
      }
      
      // Fermer la notification
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
          // Réorganiser les autres notifications
          reorganizeNotifications();
        }
      }, 300);
    });

    // Auto-fermeture après la durée spécifiée
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
            reorganizeNotifications();
          }
        }, 300);
      }
    }, duration);
  }

  // Fonction pour réorganiser les notifications après suppression
  function reorganizeNotifications() {
    const notifications = document.querySelectorAll('.admin-notification');
    let topPosition = 20;
    
    notifications.forEach(notif => {
      notif.style.top = `${topPosition}px`;
      const rect = notif.getBoundingClientRect();
      topPosition += rect.height + 10;
    });
  }

  // Démarrer la surveillance des notifications
  function startNotificationSystem() {
    // Vérification initiale après un court délai
    setTimeout(checkForNotifications, 2000);
    
    // Puis vérification toutes les 30 secondes
    setInterval(checkForNotifications, 30000);
  }

  // Fonction de test pour déclencher une notification manuellement (pour debug)
  window.testNotification = function() {
    console.log("🧪 Test de notification déclenché");
    showNotificationWithIcon("🧪 Test de notification - Le système fonctionne !", 'info', 5000);
  };
  
  // Ajouter les écouteurs d'événements pour les boutons "Modifier"
  document.querySelectorAll(".btn-edit-participants").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");
      const date = e.target.getAttribute("data-date");
      const formationName = e.target.getAttribute("data-formation");
      await openEditParticipantsModal(id, formationName, date);
    });
  });
  
  // Fonction pour ouvrir le modal de modification des participants
  async function openEditParticipantsModal(id, formationName, date) {
    try {
      showNotification("Ouverture du modal de modification...");
      
      // Récupérer les détails de la formation depuis PendingClosure
      const response = await fetch(`${SCRIPT_URL}?action=readPendingClosure`);
      const result = await response.json();
      
      if (!result.success || !result.values) {
        showNotification("Erreur lors de la récupération des formations");
        return;
      }
      
      // Trouver la formation correspondante
      const formation = result.values.find(f => 
        String(f.id) === String(id) && 
        formatDateClient(f.date) === date
      );
      
      if (!formation) {
        showNotification("Formation non trouvée");
        return;
      }
      
      // Appeler la fonction pour afficher le modal avec les données complètes
      showEditParticipantsModal(formation, date);
      
    } catch (error) {
      console.error("Erreur lors de l'ouverture du modal d'édition:", error);
      showNotification("Erreur lors de l'ouverture du modal");
    }
  }

  // Fonction pour afficher le modal de modification des participants
  function showEditParticipantsModal(formation, date) {
    // Créer le modal s'il n'existe pas
    let modal = document.getElementById("editParticipantsModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "editParticipantsModal";
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close" id="closeEditParticipantsModal">&times;</span>
          <h3>Modifier les participants</h3>
          <div id="editFormationDetails">
            <p><strong>Formation :</strong> <span id="editFormationName"></span></p>
            <p><strong>Date :</strong> <span id="editFormationDate"></span></p>
          </div>
          <div class="participants-table-container">
            <h4>Liste des participants</h4>
            <table id="editParticipantsTable">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Nom / Prénom</th>
                  <th>Entité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Les participants seront ajoutés dynamiquement ici -->
              </tbody>
            </table>
          </div>
          <div id="addParticipantSection" style="margin-top:15px;">
            <h4>Ajouter un participant</h4>
            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
              <input type="text" id="editNewMatricule" placeholder="Matricule" />
              <input type="text" id="editNewName" placeholder="Nom/Prénom" />
              <input type="text" id="editNewEntity" placeholder="Entité" />
              <button id="editBtnAddParticipant">Ajouter</button>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <button id="saveParticipantsChanges" class="submit-button">Sauvegarder les modifications</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Ajouter les gestionnaires d'événements
      document.getElementById("closeEditParticipantsModal").addEventListener("click", () => {
        modal.style.display = "none";
      });
      
      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    }
    
    // Remplir les détails de la formation
    document.getElementById("editFormationName").textContent = formation.formation;
    document.getElementById("editFormationDate").textContent = formatDateClient(formation.date);
    
    // Remplir le tableau des participants
    const participantsTable = document.getElementById("editParticipantsTable").querySelector("tbody");
    participantsTable.innerHTML = "";
    
    // Extraire et afficher les participants pour la date spécifiée
    const targetDate = parseDDMMYYYY(date);
    let participantsForDate = [];
    
    // Traiter les participants depuis PendingClosure (format avec séparateurs "|||")
    if (formation.participants) {
      const blocks = formation.participants.split("|||");
      
      blocks.forEach((block) => {
        if (!block.trim()) return;
        
        try {
          // Extraire le JSON entre crochets
          const jsonMatch = block.match(/\[(.*?)\]/);
          if (!jsonMatch) return;
          
          // Extraire la date entre parenthèses
          const dateMatch = block.match(/\((.*?)\)/);
          if (!dateMatch) return;
          
          const blockDate = new Date(dateMatch[1]);
          if (isSameDate(blockDate, targetDate)) {
            // Parser le JSON des participants
            const jsonStr = '[' + jsonMatch[1] + ']';
            const participants = JSON.parse(jsonStr);
            
            // Chaque bloc contient un tableau de participants
            if (Array.isArray(participants)) {
              participantsForDate.push(...participants);
            } else {
              participantsForDate.push(participants);
            }
          }
        } catch (error) {
          console.error("Erreur lors du parsing des participants:", error);
        }
      });
    }
    
    // Afficher les participants
    if (participantsForDate.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td colspan="4" style="text-align: center; color: #666; font-style: italic;">
          Aucun participant trouvé pour cette date.
        </td>
      `;
      participantsTable.appendChild(row);
    } else {
      participantsForDate.forEach((participant, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>
            <input type="text" value="${participant && participant.matricule ? participant.matricule : ''}" 
                   data-field="matricule" data-index="${index}" 
                   class="participant-field" />
          </td>
          <td>
            <input type="text" value="${participant && participant.nameEmployee ? participant.nameEmployee : ''}" 
                   data-field="nameEmployee" data-index="${index}" 
                   class="participant-field" />
          </td>
          <td>
            <input type="text" value="${participant && participant.entity ? participant.entity : ''}" 
                   data-field="entity" data-index="${index}" 
                   class="participant-field" />
          </td>
          <td>
            <button class="btn-remove-edit-participant" data-index="${index}">🗑️ Supprimer</button>
          </td>
        `;
        participantsTable.appendChild(row);
      });
    }
    
    // Gestionnaire pour ajouter un participant
    document.getElementById("editBtnAddParticipant").onclick = () => {
      const matricule = document.getElementById("editNewMatricule").value.trim();
      const nameEmployee = document.getElementById("editNewName").value.trim();
      const entity = document.getElementById("editNewEntity").value.trim();
      
      if (!matricule || !nameEmployee || !entity) {
        showNotification("Veuillez remplir tous les champs.");
        return;
      }
      
      // Ajouter une nouvelle ligne au tableau
      const newIndex = participantsForDate.length;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <input type="text" value="${matricule}" 
                 data-field="matricule" data-index="${newIndex}" 
                 class="participant-field" />
        </td>
        <td>
          <input type="text" value="${nameEmployee}" 
                 data-field="nameEmployee" data-index="${newIndex}" 
                 class="participant-field" />
        </td>
        <td>
          <input type="text" value="${entity}" 
                 data-field="entity" data-index="${newIndex}" 
                 class="participant-field" />
        </td>
        <td>
          <button class="btn-remove-edit-participant" data-index="${newIndex}">🗑️ Supprimer</button>
        </td>
      `;
      participantsTable.appendChild(row);
      
      // Ajouter le participant aux données
      participantsForDate.push({ matricule, nameEmployee, entity });
      
      // Vider les champs
      document.getElementById("editNewMatricule").value = "";
      document.getElementById("editNewName").value = "";
      document.getElementById("editNewEntity").value = "";
    };
    
    // Gestionnaire pour supprimer un participant
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-remove-edit-participant")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        e.target.closest("tr").remove();
        participantsForDate.splice(index, 1);
        // Réindexer les boutons restants
        document.querySelectorAll(".btn-remove-edit-participant").forEach((btn, newIndex) => {
          btn.setAttribute("data-index", newIndex);
        });
        document.querySelectorAll(".participant-field").forEach((field, fieldIndex) => {
          const rowIndex = Math.floor(fieldIndex / 3);
          field.setAttribute("data-index", rowIndex);
        });
      }
    });
    
    // Gestionnaire pour sauvegarder les modifications
    document.getElementById("saveParticipantsChanges").onclick = async () => {
      try {
        showNotification("Sauvegarde en cours...");
        
        // Collecter les données modifiées
        const updatedParticipants = [];
        const rows = participantsTable.querySelectorAll("tr");
        
        rows.forEach((row) => {
          const matricule = row.querySelector('[data-field="matricule"]').value.trim();
          const nameEmployee = row.querySelector('[data-field="nameEmployee"]').value.trim();
          const entity = row.querySelector('[data-field="entity"]').value.trim();
          
          if (matricule && nameEmployee && entity) {
            updatedParticipants.push({ matricule, nameEmployee, entity });
          }
        });
        
        // Reconstruire la chaîne de participants
        await updateParticipantsForDate(formation, date, updatedParticipants);
        
        // Fermer le modal
        modal.style.display = "none";
        
        // Rafraîchir les données
        await fetchPendingClosure();
        
        showNotification("Participants modifiés avec succès!");
        
      } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
        showNotification("Erreur lors de la sauvegarde des modifications");
      }
    };
    
    // Afficher le modal
    modal.style.display = "flex";
  }

  // Fonction pour mettre à jour les participants pour une date spécifique
  async function updateParticipantsForDate(formation, targetDate, newParticipants) {
    try {
      const targetDateObj = parseDDMMYYYY(targetDate);
      let newBlocks = [];
      
      // Traiter les blocs de participants existants (format PendingClosure avec "|||")
      if (formation.participants) {
        const blocks = formation.participants.split("|||");
        
        // Conserver tous les blocs qui ne sont pas de la date cible
        blocks.forEach((block) => {
          if (!block.trim()) return;
          
          try {
            // Extraire la date entre parenthèses
            const dateMatch = block.match(/\((.*?)\)/);
            if (!dateMatch) return;
            
            const blockDate = new Date(dateMatch[1]);
            if (!isSameDate(blockDate, targetDateObj)) {
              newBlocks.push(block.trim());
            }
          } catch (error) {
            console.error("Erreur lors du traitement d'un bloc:", error);
          }
        });
      }
      
      // Ajouter les nouveaux participants pour la date cible
      if (newParticipants.length > 0) {
        const fullDateStr = convertDDMMYYYYToFull(targetDate);
        const newBlock = JSON.stringify(newParticipants) + " (" + fullDateStr + ")";
        newBlocks.push(newBlock);
      }
      
      // Reconstruire la chaîne de participants avec des séparateurs "|||" pour PendingClosure
      const updatedParticipantsStr = newBlocks.join("|||");
      
      // Mettre à jour dans la feuille PendingClosure au lieu de Formations
      await updatePendingClosureParticipantsInSheet(formation.id, targetDate, updatedParticipantsStr);
      
    } catch (error) {
      console.error("Erreur lors de la mise à jour des participants:", error);
      throw error;
    }
  }

  // Fonction pour mettre à jour les participants dans PendingClosure
  async function updatePendingClosureParticipantsInSheet(id, date, participantsStr) {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=updatePendingClosureParticipants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          id: id,
          date: date,
          participants: participantsStr
        })
      });

      const result = await response.json();
      
      if (result.success) {
        showNotification("Participants mis à jour avec succès!");
        await fetchPendingClosure(); // Rafraîchir le tableau
      } else {
        showNotification("Erreur lors de la mise à jour: " + result.error);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des participants:", error);
      showNotification("Erreur lors de la mise à jour des participants");
    }
  }
  
  // Fonction pour ouvrir le modal de replanification
  function openRescheduleModal(id, formationName, currentDate) {
    // Créer le modal s'il n'existe pas
    let modal = document.getElementById("rescheduleModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "rescheduleModal";
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close" id="closeRescheduleModal">&times;</span>
          <h3>Replanifier la formation</h3>
          <div class="reschedule-details">
            <p><strong>Formation :</strong> <span id="rescheduleFormationName"></span></p>
            <p><strong>Date actuelle :</strong> <span id="rescheduleCurrentDate"></span></p>
          </div>
          <div class="form-group">
            <label for="newDateInput">Nouvelle date :</label>
            <input type="date" id="newDateInput" required>
          </div>
          <div class="modal-actions">
            <button id="confirmRescheduleBtn" class="submit-button">Confirmer la replanification</button>
            <button id="cancelRescheduleBtn" class="cancel-button">Annuler</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Ajouter les écouteurs d'événements pour fermer le modal
      document.getElementById("closeRescheduleModal").addEventListener("click", () => {
        modal.style.display = "none";
      });
      
      document.getElementById("cancelRescheduleBtn").addEventListener("click", () => {
        modal.style.display = "none";
      });
      
      // Fermer le modal en cliquant à l'extérieur
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
      
      // Gestionnaire pour le bouton de confirmation
      document.getElementById("confirmRescheduleBtn").addEventListener("click", async () => {
        const newDateInput = document.getElementById("newDateInput");
        const newDate = newDateInput.value;
        
        if (!newDate) {
          showNotification("Veuillez sélectionner une nouvelle date");
          return;
        }
        
        // Convertir la date au format dd/mm/yyyy
        const dateObj = new Date(newDate);
        const formattedNewDate = formatDateToDDMMYYYY(dateObj);
        
        await rescheduleFormation(id, currentDate, formattedNewDate);
      });
    }
    
    // Remplir les informations de la formation
    document.getElementById("rescheduleFormationName").textContent = formationName;
    document.getElementById("rescheduleCurrentDate").textContent = currentDate;
    
    // Définir la date minimale à aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("newDateInput").min = today;
    
    // Afficher le modal
    modal.style.display = "flex";
  }

  // Fonction pour replanifier une formation
  async function rescheduleFormation(id, oldDate, newDate) {
    try {
      showNotification("Replanification en cours...");
      
      const url = `${SCRIPT_URL}?action=rescheduleFormation&id=${encodeURIComponent(id)}&oldDate=${encodeURIComponent(oldDate)}&newDate=${encodeURIComponent(newDate)}`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        showNotification(result.message);
        
        // Enregistrer le log
        await recordLog(`Replanification de formation de ${oldDate} vers ${newDate} (ID: ${id})`);
        
        // Fermer le modal
        document.getElementById("rescheduleModal").style.display = "none";
        
        // Rafraîchir les tableaux
        await fetchPendingClosure();
        await fetchFormations(); // Rafraîchir aussi le tableau des formations
      } else {
        showNotification("Erreur lors de la replanification: " + result.error);
      }
    } catch (error) {
      console.error("Erreur lors de la replanification:", error);
      showNotification("Erreur lors de la replanification");
    }
  }
  
  // ---------------------- Fonctions Utilitaires Globales ----------------------
  
  // Fonction pour formater une date en dd/MM/yyyy
  function formatLogDate(dateValue) {
    try {
      // Si c'est déjà au bon format, on le retourne tel quel
      if (typeof dateValue === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)) {
        return dateValue;
      }
      
      // Sinon, essayer de parser et reformater
      let date;
      if (dateValue instanceof Date) {
        date = dateValue;
      } else {
        date = new Date(dateValue);
      }
      
      if (isNaN(date.getTime())) {
        return dateValue; // Retourner la valeur originale si ce n'est pas une date valide
      }
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.warn('Erreur lors du formatage de la date:', error);
      return dateValue;
    }
  }
  
  // Fonction pour formater une heure en HHhMMmSSs
  function formatLogTime(timeValue) {
    try {
      // Si c'est déjà au bon format (contient 'h', 'm', 's'), on le retourne tel quel
      if (typeof timeValue === 'string' && timeValue.includes('h') && timeValue.includes('m') && timeValue.includes('s')) {
        return timeValue;
      }
      
      // Si c'est au format HH:mm:ss
      if (typeof timeValue === 'string' && /^\d{2}:\d{2}:\d{2}$/.test(timeValue)) {
        const parts = timeValue.split(':');
        return `${parts[0]}h${parts[1]}m${parts[2]}s`;
      }
      
      // Si c'est un objet Date
      let date;
      if (timeValue instanceof Date) {
        date = timeValue;
      } else {
        date = new Date(timeValue);
      }
      
      if (isNaN(date.getTime())) {
        return timeValue; // Retourner la valeur originale si ce n'est pas une date valide
      }
      
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      return `${hours}h${minutes}m${seconds}s`;
    } catch (error) {
      console.warn('Erreur lors du formatage de l\'heure:', error);
      return timeValue;
    }
  }
  
  