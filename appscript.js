function doGet(e) {
    var action = e.parameter.action;
    var result = {};
  
    try {
      // Ouvrir la feuille de calcul
      var ss = SpreadsheetApp.openById(
        "1J7s8dl-eEn_An1VY5K3cVKYdF3dOWZRSsYtRWbQ4Z_w"
      );
  
      if (action == "read") {
        // Lecture de l'onglet "Formations"
        var sheet = ss.getSheetByName("Formations");
        var data = sheet.getDataRange().getValues();
        // La première ligne est l'en-tête
        result.values = data.slice(1).map(function (row) {
          return {
            id: row[0],
            name: row[1],
            availableDates: row[2],
            participants: row[3],
          };
        });
      } else if (action == "add") {
        // Ajout d'une formation dans "Formations"
        var sheet = ss.getSheetByName("Formations");
        var id = e.parameter.id;
        var name = e.parameter.name;
        var dates = e.parameter.dates;
        // La colonne Participants est initialisée vide
        sheet.appendRow([id, name, dates, ""]);
        result.success = true;
      } else if (action == "update") {
        // Mise à jour d'une formation dans "Formations"
        var sheet = ss.getSheetByName("Formations");
        var id = parseInt(e.parameter.id);
        var name = e.parameter.name;
        var dates = e.parameter.dates;
        var data = sheet.getDataRange().getValues();
        var found = false;
        for (var i = 1; i < data.length; i++) {
          if (parseInt(data[i][0]) === id) {
            sheet.getRange(i + 1, 2).setValue(name);
            sheet.getRange(i + 1, 3).setValue(dates);
            found = true;
            break;
          }
        }
        result.success = found;
        if (!found) result.error = "Formation non trouvée";
      } else if (action == "delete") {
        // Suppression d'une formation dans "Formations"
        var sheet = ss.getSheetByName("Formations");
        var id = parseInt(e.parameter.id);
        var data = sheet.getDataRange().getValues();
        var found = false;
        for (var i = 1; i < data.length; i++) {
          if (parseInt(data[i][0]) === id) {
            sheet.deleteRow(i + 1);
            found = true;
            break;
          }
        }
        result.success = found;
        if (!found) result.error = "Formation non trouvée";
      } else if (action == "readPending") {
        // Lecture des demandes en attente dans "Demandes"
        var sheet = ss.getSheetByName("Demandes");
        var data = sheet.getDataRange().getValues();
        // En-tête: ID, MANAGEUR, EMAIL, TELEPHONE, FORMATION, DATE, MESSAGE, EMPLOYEES
        result.values = data.slice(1).map(function (row) {
          return {
            id: row[0],
            manager: row[1],
            email: row[2],
            telephone: row[3],
            formation: row[4],
            date: row[5],
            message: row[6],
            employees: row[7],
          };
        });
      } else if (action == "addPending") {
        // Ajout d'une demande dans "Demandes" avec vérification des doublons
        var sheet = ss.getSheetByName("Demandes");
        var data = sheet.getDataRange().getValues();
        
        var manager = e.parameter.manager;
        var email = e.parameter.email;
        var telephone = e.parameter.telephone;
        var formation = e.parameter.formation;
        var date = e.parameter.date;
        var message = e.parameter.message;
        var employees = e.parameter.employees;
        
        // Vérifier les doublons : même email, formation et date
        var isDuplicate = false;
        for (var i = 1; i < data.length; i++) {
          if (data[i][2] === email && data[i][4] === formation && data[i][5] === date) {
            isDuplicate = true;
            break;
          }
        }
        
        if (isDuplicate) {
          result.success = false;
          result.error = "Une demande identique existe déjà pour cette formation et cette date";
        } else {
          var newId = 1;
          if (data.length > 1) {
            var ids = data.slice(1).map(function (row) {
              return parseInt(row[0]);
            });
            newId = Math.max.apply(null, ids) + 1;
          }
          
          sheet.appendRow([
            newId,
            manager,
            email,
            telephone,
            formation,
            date,
            message,
            employees,
          ]);
          result.success = true;
          result.id = newId;
        }
      } else if (action == "deletePending") {
        // Suppression d'une demande dans "Demandes"
        var sheet = ss.getSheetByName("Demandes");
        var id = parseInt(e.parameter.id);
        var data = sheet.getDataRange().getValues();
        var found = false;
        for (var i = 1; i < data.length; i++) {
          if (parseInt(data[i][0]) === id) {
            sheet.deleteRow(i + 1);
            found = true;
            break;
          }
        }
        result.success = found;
        if (!found) result.error = "Demande non trouvée";
      } else if (action == "accept") {
        // Acceptation d'une demande : lire la demande dans "Demandes" et mettre à jour "Formations"
        var demandesSheet = ss.getSheetByName("Demandes");
        var formationsSheet = ss.getSheetByName("Formations");
        var id = parseInt(e.parameter.id);
        var dataD = demandesSheet.getDataRange().getValues();
        var request = null;
        var rowIndex = null;
        for (var i = 1; i < dataD.length; i++) {
          if (parseInt(dataD[i][0]) === id) {
            request = {
              id: dataD[i][0],
              manager: dataD[i][1],
              email: dataD[i][2],
              telephone: dataD[i][3],
              formation: dataD[i][4],
              date: dataD[i][5],
              message: dataD[i][6],
              employees: dataD[i][7],
            };
            rowIndex = i + 1;
            break;
          }
        }
        if (request == null) {
          result.error = "Demande non trouvée";
        } else {
          // Recherche de la formation correspondante dans "Formations" par le nom (colonne B)
          var dataF = formationsSheet.getDataRange().getValues();
          var found = false;
          for (var j = 1; j < dataF.length; j++) {
            if (dataF[j][1] == request.formation) {
              // Récupérer la colonne Participants (colonne D)
              var existing = dataF[j][3];
              // --- Modification ici ---
              // Parse des données employés de la demande.
              var empData = JSON.parse(request.employees);
              var blocksToAdd = [];
              if (Array.isArray(empData)) {
                // Pour chaque employé, créer un bloc avec la date
                for (var k = 0; k < empData.length; k++) {
                  blocksToAdd.push(
                    JSON.stringify([empData[k]]) + " (" + request.date + ")"
                  );
                }
              } else {
                blocksToAdd.push(
                  JSON.stringify([empData]) + " (" + request.date + ")"
                );
              }
              // Concaténer les nouveaux blocs avec une virgule.
              var newParticipant = blocksToAdd.join(", ");
              var updated = existing
                ? existing + ", " + newParticipant
                : newParticipant;
              formationsSheet.getRange(j + 1, 4).setValue(updated);
              found = true;
              break;
            }
          }
          if (found) {
            // Supprimer la demande acceptée
            demandesSheet.deleteRow(rowIndex);
            result.success = true;
          } else {
            result.error = "Formation non trouvée pour la demande";
          }
        }
      } else if (action == "updateParticipants") {
        // Mise à jour des participants dans la formation
        var sheet = ss.getSheetByName("Formations");
        var id = parseInt(e.parameter.id);
        var newParticipants = e.parameter.participants;
        var data = sheet.getDataRange().getValues();
        var found = false;
        for (var i = 1; i < data.length; i++) {
          if (parseInt(data[i][0]) === id) {
            // Mise à jour de la colonne Participants (colonne D)
            sheet.getRange(i + 1, 4).setValue(newParticipants);
            found = true;
            break;
          }
        }
        result.success = found;
        if (!found)
          result.error =
            "Formation non trouvée pour la mise à jour des participants";
      } else if (action == "archive") {
        var sheetFormations = ss.getSheetByName("Formations");
        var sheetClotures = ss.getSheetByName("Clotures");
        // Récupérer toutes les lignes (en-tête en ligne 1)
        var dataRange = sheetFormations.getDataRange();
        var data = dataRange.getValues();
        var today = new Date();
        var rowsToDelete = [];
  
        // Traiter chaque ligne de formation (à partir de la ligne 2)
        for (var i = 1; i < data.length; i++) {
          var row = data[i];
          var formationId = row[0];
          var formationName = row[1];
          var availableDates = "";
          if (row[2]) {
            if (Object.prototype.toString.call(row[2]) === "[object Date]") {
              availableDates = Utilities.formatDate(
                row[2],
                Session.getScriptTimeZone(),
                "dd/MM/yyyy"
              );
            } else {
              availableDates = row[2].toString().trim();
            }
          }
          var participants = row[3] ? row[3].toString().trim() : "";
  
          // Découper availableDates par virgule
          var datesArray = availableDates
            ? availableDates.split(",").map(function (s) {
                return s.trim();
              })
            : [];
  
          var datesToKeep = [];
          var datesToCloture = [];
  
          // Vérifier chaque date (format supposé : dd/MM/yyyy)
          for (var j = 0; j < datesArray.length; j++) {
            var dateStr = datesArray[j];
            var parts = dateStr.split("/");
            if (parts.length === 3) {
              var d = new Date(
                parseInt(parts[2]),
                parseInt(parts[1]) - 1,
                parseInt(parts[0])
              );
              // Si la date est passée ou égale à aujourd'hui, la marquer pour déplacement
              if (d <= today) {
                datesToCloture.push(dateStr);
              } else {
                datesToKeep.push(dateStr);
              }
            } else {
              datesToKeep.push(dateStr);
            }
          }
  
          if (datesToCloture.length > 0) {
            // Traitement de la colonne Participants.
            var regex = /(\[.*?\])\s*\((.*?)\)/g;
            var match;
            var remainingBlocks = [];
            var clotureEntries = [];
  
            while ((match = regex.exec(participants)) !== null) {
              var blockJson = match[1];
              var blockDateRaw = match[2].trim();
              var blockDateFormatted = "";
              if (blockDateRaw.indexOf("/") !== -1) {
                blockDateFormatted = blockDateRaw;
              } else {
                var blockDateObj = new Date(blockDateRaw);
                if (!isNaN(blockDateObj)) {
                  blockDateFormatted = Utilities.formatDate(
                    blockDateObj,
                    Session.getScriptTimeZone(),
                    "dd/MM/yyyy"
                  );
                } else {
                  blockDateFormatted = blockDateRaw;
                }
              }
              if (datesToCloture.indexOf(blockDateFormatted) !== -1) {
                clotureEntries.push({
                  date: blockDateFormatted,
                  block: blockJson,
                });
              } else {
                remainingBlocks.push(match[0]);
              }
            }
  
            // Grouper les blocs par date
            var grouped = {};
            for (var k = 0; k < clotureEntries.length; k++) {
              var dt = clotureEntries[k].date;
              if (!grouped[dt]) {
                grouped[dt] = [];
              }
              grouped[dt].push(clotureEntries[k].block);
            }
  
            // Pour chaque date passée, ajouter une ligne dans Clotures
            for (var dt in grouped) {
              var clotureParticipants = grouped[dt].join("|||");
              sheetClotures.appendRow([
                formationId,
                formationName,
                dt,
                clotureParticipants,
                "En attente" // État initial
              ]);
            }
  
            // Mise à jour de la ligne de formation avec les dates futures
            var newAvailableDates = datesToKeep.join(", ");
            var newParticipants = remainingBlocks.join(", ");
            sheetFormations.getRange(i + 1, 3).setValue(newAvailableDates);
            sheetFormations.getRange(i + 1, 4).setValue(newParticipants);
  
            if (!newAvailableDates) {
              rowsToDelete.push(i + 1);
            }
          }
        }
  
        // Suppression des lignes en ordre décroissant
        rowsToDelete.sort(function (a, b) {
          return b - a;
        });
        for (var d = 0; d < rowsToDelete.length; d++) {
          sheetFormations.deleteRow(rowsToDelete[d]);
        }
  
        result.success = true;
      } else if (action == "readClotures") {
        var sheet = ss.getSheetByName("Clotures");
        var data = sheet.getDataRange().getValues();
        result.values = data.slice(1).map(function (row) {
          return {
            id: row[0],
            formation: row[1],
            date: row[2],
            participants: row[3],
            etat: row[4]
          };
        });
      } else if (action == "updateCloture") {
        var sheet = ss.getSheetByName("Clotures");
        var id = parseInt(e.parameter.id);
        var date = e.parameter.date;
        var participants = e.parameter.participants;
        var etat = e.parameter.etat;
        
        var data = sheet.getDataRange().getValues();
        var found = false;
        
        for (var i = 1; i < data.length; i++) {
          if (parseInt(data[i][0]) === id && data[i][2] === date) {
            sheet.getRange(i + 1, 4).setValue(participants);
            sheet.getRange(i + 1, 5).setValue(etat);
            found = true;
            break;
          }
        }
        
        result.success = found;
        if (!found) result.error = "Clôture non trouvée";
      } else if (action == "finalizeCloture") {
        var sheetClotures = ss.getSheetByName("Clotures");
        var sheetArchives = ss.getSheetByName("Archives");
        var id = parseInt(e.parameter.id);
        var date = e.parameter.date;
        
        var data = sheetClotures.getDataRange().getValues();
        var found = false;
        
        for (var i = 1; i < data.length; i++) {
          if (parseInt(data[i][0]) === id && data[i][2] === date) {
            // Ajouter à l'archive
            sheetArchives.appendRow([
              data[i][0], // id
              data[i][1], // formation
              data[i][2], // date
              data[i][3]  // participants
            ]);
            
            // Supprimer de la clôture
            sheetClotures.deleteRow(i + 1);
            found = true;
            break;
          }
        }
        
        result.success = found;
        if (!found) result.error = "Clôture non trouvée";
      } else if (action == "readArchives") {
        var sheet = ss.getSheetByName("Archives");
        var data = sheet.getDataRange().getValues();
        // En supposant que la première ligne est l'en-tête
        result.values = data.slice(1).map(function (row) {
          return {
            id: row[0],
            formation: row[1],
            date: typeof row[2] === 'object' && row[2] instanceof Date ? formatDateToDDMMYYYY(row[2]) : row[2],
            participants: row[3],
          };
        });
      } else if (action == "moveToPendingClosure") {
        return moveToPendingClosure(e);
      } else if (action == "readPendingClosure") {
        return readPendingClosure(e);
      } else if (action == "closeFormation") {
        return closeFormation(e);
      } else if (action == "deleteFromPendingClosure") {
        return deleteFromPendingClosure(e);
      } else if (action == "addTask") {
        var sheet = ss.getSheetByName("Taches");
        var data = sheet.getDataRange().getValues();
        var newId = 1;
        if (data.length > 1) {
          var ids = data.slice(1).map(function (row) {
            return parseInt(row[0]);
          });
          newId = Math.max.apply(null, ids) + 1;
        }
        var concerne = e.parameter.concerne;
        var tache = e.parameter.tache;
        var importance = e.parameter.importance;
        // Forcer l'état à "Due" lors de la création
        var etat = "Due";
        sheet.appendRow([newId, concerne, tache, importance, etat]);
        result.success = true;
      } else if (action == "readTasks") {
        var sheet = ss.getSheetByName("Taches");
        var data = sheet.getDataRange().getValues();
        // Filtrer les lignes dont l'état est "Due"
        result.values = data
          .slice(1)
          .filter(function (row) {
            return row[4] === "Due";
          })
          .map(function (row) {
            return {
              id: row[0],
              concerne: row[1],
              tache: row[2],
              importance: row[3],
              etat: row[4],
            };
          });
      } else if (action == "readTasksHistory") {
        var sheet = ss.getSheetByName("Taches");
        var data = sheet.getDataRange().getValues();
        // Filtrer les lignes dont l'état est "Accomplie"
        result.values = data
          .slice(1)
          .filter(function (row) {
            return row[4] === "Accomplie";
          })
          .map(function (row) {
            return {
              id: row[0],
              concerne: row[1],
              tache: row[2],
              importance: row[3],
              etat: row[4],
            };
          });
      } else if (action == "deleteTask") {
        var sheet = ss.getSheetByName("Taches");
        var id = parseInt(e.parameter.id);
        var data = sheet.getDataRange().getValues();
        var found = false;
        for (var i = 1; i < data.length; i++) {
          if (parseInt(data[i][0]) === id) {
            sheet.deleteRow(i + 1);
            found = true;
            break;
          }
        }
        result.success = found;
        if (!found) result.error = "Tâche non trouvée";
      } else if (action == "updateTaskState") {
        // Mise à jour de l'état d'une tâche (passer de "Due" à "Accomplie", par exemple)
        var sheet = ss.getSheetByName("Taches");
        var id = parseInt(e.parameter.id);
        var newEtat = e.parameter.etat; // Attendu "Accomplie" ou autre valeur si besoin
        var data = sheet.getDataRange().getValues();
        var found = false;
        for (var i = 1; i < data.length; i++) {
          if (parseInt(data[i][0]) === id) {
            sheet.getRange(i + 1, 5).setValue(newEtat);
            found = true;
            break;
          }
        }
        result.success = found;
        if (!found) result.error = "Tâche non trouvée pour mise à jour de l'état";
      } else if (action == "clearTasksHistory") {
        var sheet = ss.getSheetByName("Taches");
        var data = sheet.getDataRange().getValues();
        var rowsToDelete = [];
        // Identifier les lignes dont l'état est "Accomplie"
        for (var i = 1; i < data.length; i++) {
          if (data[i][4] === "Accomplie") {
            rowsToDelete.push(i + 1);
          }
        }
        // Supprimer les lignes en ordre décroissant
        rowsToDelete.sort(function (a, b) {
          return b - a;
        });
        for (var j = 0; j < rowsToDelete.length; j++) {
          sheet.deleteRow(rowsToDelete[j]);
        }
        result.success = true;
      } else if (action === "addRefConvention") {
        return addRefConvention(e);
      } else if (action === "readRefConventions") {
        return readRefConventions(e);
      } else if (action === "addRefConvocation") {
        return addRefConvocation(e);
      } else if (action === "addRefAttestation") {
        return addRefAttestation(e);
      } else if (action === "readRefAttestations") {
        return readRefAttestations(e);
      } else if (action == "diagFormations") {
        return diagFormations();
      } else if (action == "updatePendingClosureParticipants") {
        return updatePendingClosureParticipants(e);
      } else if (action == "rescheduleFormation") {
        return rescheduleFormation(e);
      } else if (action == "readLogs") {
        return readLogs();
      } else if (action == "addLog") {
        return addLog(e);
      } else if (action == "clearLogs") {
        return clearLogs();
      } else {
        result.error = "Action non reconnue";
      }
    } catch (err) {
      result.error = err.toString();
    }
  
    var output = JSON.stringify(result);
    if (e.parameter.callback) {
      output = e.parameter.callback + "(" + output + ")";
      return ContentService.createTextOutput(output).setMimeType(
        ContentService.MimeType.JAVASCRIPT
      );
    }
    return ContentService.createTextOutput(output).setMimeType(
      ContentService.MimeType.JSON
    );
  }
  
  function readRefConventions() {
  try {
    // If you have a specific spreadsheet ID, replace getActiveSpreadsheet() with openById(...)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Ref_Conventions");
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Sheet 'Ref_Conventions' not found." }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Assuming the first row contains headers
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var records = [];
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var record = {};
      for (var j = 0; j < headers.length; j++) {
        record[headers[j]] = row[j];
      }
      records.push(record);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, values: records }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  }
  
  // Fonction utilitaire pour convertir une chaîne "dd/mm/yyyy" en objet Date
  function parseDDMMYYYY(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return new Date(NaN);
  const parts = dateStr.split("/");
  if (parts.length !== 3) return new Date(NaN);
  return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  
  // Fonction pour déplacer les formations passées vers le tableau 'à clôturer'
  function moveToPendingClosure(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const formationsSheet = ss.getSheetByName('Formations');
    const pendingClosureSheet = ss.getSheetByName('PendingClosure');
    
    // Créer la feuille PendingClosure si elle n'existe pas
    if (!pendingClosureSheet) {
      ss.insertSheet('PendingClosure');
      const newSheet = ss.getSheetByName('PendingClosure');
      newSheet.appendRow(['id', 'formation', 'date', 'participants']);
    }
    
    if (!formationsSheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Feuille Formations introuvable'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = formationsSheet.getDataRange().getValues();
    const headers = data[0];
    
    // Afficher les en-têtes pour le débogage
    Logger.log("En-têtes de la feuille Formations: " + headers.join(", "));
    
    // Recherche des indices de colonnes (insensible à la casse)
    let idIndex = -1;
    let nameIndex = -1;
    let datesIndex = -1;
    let participantsIndex = -1;
    
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i].toString().toLowerCase();
      if (header === 'id') idIndex = i;
      else if (header === 'name') nameIndex = i;
      else if (header.includes('date')) datesIndex = i; // Plus tolérant pour trouver la colonne de dates
      else if (header.includes('participant')) participantsIndex = i; // Plus tolérant pour trouver la colonne de participants
    }
    
    Logger.log("Indices trouvés - id: " + idIndex + ", name: " + nameIndex + 
               ", dates: " + datesIndex + ", participants: " + participantsIndex);
    
    if (idIndex === -1 || nameIndex === -1 || datesIndex === -1 || participantsIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Colonnes requises introuvables. En-têtes trouvés: ' + headers.join(", ")
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Pour stocker les mises à jour à effectuer
    const updates = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const formationId = row[idIndex];
      const formationName = row[nameIndex];
      const availableDates = row[datesIndex];
      const participants = row[participantsIndex];
      
      // Vérifier que participants existe et n'est pas vide
      if (!participants) continue;
      
      // Log pour le débogage
      Logger.log("Traitement de la formation: " + formationId + " - " + formationName);
      Logger.log("Dates disponibles: " + availableDates);
      Logger.log("Participants: " + participants);
      
      // Analyser les blocs de participants
      const participantBlocks = getBlocks(participants);
      
      Logger.log("Nombre de blocs de participants trouvés: " + participantBlocks.length);
      
      // Filtrer les blocs pour trouver ceux avec des dates passées
      const passedBlocks = [];
      const remainingBlocks = [];
      
      for (const block of participantBlocks) {
        try {
          const blockDate = new Date(block.date);
          blockDate.setHours(0, 0, 0, 0);
          
          // Vérifier si la date est valide
          if (isNaN(blockDate.getTime())) {
            Logger.log("Date invalide ignorée: " + block.date);
            remainingBlocks.push(block); // Conserver les blocs avec dates invalides
            continue;
          }
          
          Logger.log("Date du bloc: " + blockDate + " (comparée à aujourd'hui: " + today + ")");
          
          // Si la date est passée ou égale à aujourd'hui, la marquer pour déplacement
          if (blockDate <= today) {
            Logger.log("Date passée détectée: " + blockDate);
            passedBlocks.push(block);
          } else {
            // Sinon, la conserver
            remainingBlocks.push(block);
          }
        } catch (e) {
          Logger.log('Erreur lors du traitement d\'un bloc: ' + e + '\nBloc: ' + JSON.stringify(block));
          remainingBlocks.push(block); // En cas d'erreur, conserver le bloc
        }
      }
      
      // S'il y a des blocs passés, les traiter
      if (passedBlocks.length > 0) {
        for (const block of passedBlocks) {
          try {
            const blockDate = new Date(block.date);
            blockDate.setHours(0, 0, 0, 0);
            
            // Vérifier si cette entrée existe déjà dans PendingClosure
            const pendingClosureData = pendingClosureSheet.getDataRange().getValues();
            let exists = false;
            
            for (let j = 1; j < pendingClosureData.length; j++) {
              const pcRow = pendingClosureData[j];
              if (pcRow[0] == formationId && 
                  formatDateToDDMMYYYY(new Date(pcRow[2])) === formatDateToDDMMYYYY(blockDate) &&
                  pcRow[1] === formationName) {
                exists = true;
                break;
              }
            }
            
            if (!exists) {
              // Créer une entrée dans PendingClosure avec ce bloc spécifique
              const participantsForDate = passedBlocks
                .filter(b => {
                  try {
                    const d = new Date(b.date);
                    if (isNaN(d.getTime())) return false; // Ignorer les dates invalides
                    d.setHours(0, 0, 0, 0);
                    return d.getTime() === blockDate.getTime();
                  } catch (e) {
                    Logger.log("Erreur lors de la comparaison des dates: " + e);
                    return false;
                  }
                })
                .map(b => {
                  // Nettoyer le JSON pour éviter les problèmes de parsing
                  try {
                    // Vérifier si le JSON est valide
                    JSON.parse(b.json);
                    return b.json + ' (' + b.date + ')';
                  } catch (e) {
                    // Si le parsing échoue, essayer de nettoyer le JSON
                    Logger.log("Erreur de parsing JSON, tentative de nettoyage: " + e);
                    const cleanedJson = b.json.replace(/([^\\])\\([^"\\])/g, '$1\\\\$2');
                    return cleanedJson + ' (' + b.date + ')';
                  }
                })
                .join('|||');
              
              // Formater la date en dd/mm/yyyy avant de l'ajouter
              const formattedDate = formatDateToDDMMYYYY(blockDate);
              Logger.log("Ajout à PendingClosure: " + formationId + ", " + formationName + ", " + formattedDate);
              pendingClosureSheet.appendRow([formationId, formationName, formattedDate, participantsForDate]);
            }
          } catch (e) {
            Logger.log('Erreur lors du traitement d\'un bloc passé: ' + e + '\nBloc: ' + JSON.stringify(block));
          }
        }
        
        // Mettre à jour le tableau Formations avec seulement les blocs restants
        if (remainingBlocks.length > 0) {
          // Reconstruire la chaîne de participants
          const newParticipants = remainingBlocks.map(b => b.fullBlock).join(", ");
          
          // Mettre à jour les dates disponibles si nécessaire
          let newDates = availableDates;
          if (typeof availableDates === 'string' && availableDates.trim() !== '') {
            // Filtrer les dates passées de la liste des dates disponibles
            const datesArray = availableDates.split(',').map(d => d.trim());
            const remainingDates = datesArray.filter(dateStr => {
              try {
                // Vérifier si la date est au format dd/mm/yyyy
                if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
                  return true; // Conserver les entrées non conformes
                }
                
                const date = parseDDMMYYYY(dateStr);
                if (isNaN(date.getTime())) return true; // Conserver les entrées non-date
                
                // Comparer la date avec aujourd'hui
                date.setHours(0, 0, 0, 0);
                return date >= today; // Conserver uniquement les dates futures
              } catch (e) {
                Logger.log("Erreur lors du filtrage des dates: " + e + " pour " + dateStr);
                return true; // En cas d'erreur, conserver la date
              }
            });
            newDates = remainingDates.join(', ');
          }
          
          // Ajouter à la liste des mises à jour
          updates.push({
            row: i + 1, // +1 car les indices de feuille commencent à 1
            participants: newParticipants,
            dates: newDates
          });
        } else {
          // Si tous les blocs de participants ont été déplacés, 
          // conserver les dates futures mais vider les participants
          let newDates = availableDates;
          if (typeof availableDates === 'string' && availableDates.trim() !== '') {
            // Filtrer les dates passées de la liste des dates disponibles
            const datesArray = availableDates.split(',').map(d => d.trim());
            const remainingDates = datesArray.filter(dateStr => {
              try {
                // Vérifier si la date est au format dd/mm/yyyy
                if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
                  return true; // Conserver les entrées non conformes
                }
                
                const date = parseDDMMYYYY(dateStr);
                if (isNaN(date.getTime())) return true; // Conserver les entrées non-date
                
                // Comparer la date avec aujourd'hui
                date.setHours(0, 0, 0, 0);
                return date >= today; // Conserver uniquement les dates futures
              } catch (e) {
                Logger.log("Erreur lors du filtrage des dates: " + e + " pour " + dateStr);
                return true; // En cas d'erreur, conserver la date
              }
            });
            newDates = remainingDates.join(', ');
          }
          
          // Ne vider la ligne que si il n'y a plus de dates futures
          if (newDates && newDates.trim() !== '') {
            updates.push({
              row: i + 1,
              participants: "", // Vider les participants
              dates: newDates // Conserver les dates futures
            });
          } else {
            // Seulement si il n'y a plus de dates futures, marquer pour suppression
            updates.push({
              row: i + 1,
              participants: "",
              dates: ""
            });
          }
        }
      }
    }
    
    // Appliquer toutes les mises à jour
    updates.forEach(update => {
      formationsSheet.getRange(update.row, participantsIndex + 1).setValue(update.participants);
      formationsSheet.getRange(update.row, datesIndex + 1).setValue(update.dates);
    });
    
    // Identifier et supprimer les lignes vides (sans participants et sans dates)
    const rowsToDelete = [];
    updates.forEach(update => {
      if (update.participants === "" && update.dates === "") {
        rowsToDelete.push(update.row);
      }
    });
    
    // Supprimer les lignes en ordre décroissant pour éviter les problèmes d'indexation
    rowsToDelete.sort((a, b) => b - a);
    rowsToDelete.forEach(rowIndex => {
      formationsSheet.deleteRow(rowIndex);
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      updatedRows: updates.length
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    Logger.log('Erreur dans moveToPendingClosure: ' + e.stack);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  }
  
  // Fonction pour lire les formations en attente de clôture
  function readPendingClosure(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('PendingClosure');
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        values: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const values = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const obj = {};
      
      for (let j = 0; j < headers.length; j++) {
        // S'assurer que l'ID est toujours une chaîne
        if (headers[j] === 'id') {
          obj[headers[j]] = String(row[j]);
        } else if (headers[j] === 'date') {
          // Formater les dates au format dd/mm/yyyy
          obj[headers[j]] = formatDateToDDMMYYYY(row[j]);
        } else {
          obj[headers[j]] = row[j];
        }
      }
      
      values.push(obj);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      values: values
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  }
  
  // Fonction pour clôturer une formation (la déplacer vers l'historique)
  function closeFormation(e) {
  try {
    const id = String(e.parameter.id); // Convertir en chaîne
    const date = e.parameter.date; // Récupérer la date
    const participantsJson = e.parameter.participants;
    
    if (!id) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'ID manquant'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const pendingClosureSheet = ss.getSheetByName('PendingClosure');
    const archiveSheet = ss.getSheetByName('Archives');
    
    if (!pendingClosureSheet || !archiveSheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Feuilles requises introuvables'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const pendingData = pendingClosureSheet.getDataRange().getValues();
    const headers = pendingData[0];
    
    // Trouver l'index des colonnes ID et date
    const idIndex = 0; // Généralement la première colonne
    const dateIndex = headers.indexOf('date');
    
    let rowIndex = -1;
    let rowData = null;
    
    for (let i = 1; i < pendingData.length; i++) {
      // Convertir l'ID de la ligne en chaîne pour la comparaison
      const rowId = String(pendingData[i][idIndex]);
      
      // Si une date est fournie, vérifier également la correspondance de la date
      let dateMatches = true;
      if (date && dateIndex >= 0) {
        const rowDate = formatDateToDDMMYYYY(pendingData[i][dateIndex]);
        dateMatches = (rowDate === date);
      }
      
      if (rowId === id && dateMatches) {
        rowIndex = i + 1; // +1 car les indices de feuille commencent à 1
        rowData = pendingData[i].slice(); // Copier les données pour ne pas modifier l'original
        break;
      }
    }
    
    if (rowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Formation introuvable'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Si des participants avec statut sont fournis, les utiliser au lieu des participants d'origine
    if (participantsJson) {
      try {
        // Remplacer les participants par le JSON avec les statuts
        const participantsIndex = headers.indexOf('participants');
        if (participantsIndex !== -1) {
          rowData[participantsIndex] = participantsJson;
        }
      } catch (e) {
        Logger.log('Erreur lors du traitement des participants avec statut: ' + e.toString());
      }
    }
    
    // S'assurer que la date est formatée en dd/mm/yyyy avant d'ajouter aux archives
    if (dateIndex !== -1 && rowData[dateIndex]) {
      rowData[dateIndex] = formatDateToDDMMYYYY(rowData[dateIndex]);
    }
    
    // Ajouter à l'archive
    archiveSheet.appendRow(rowData);
    
    // Supprimer de la liste des formations à clôturer
    pendingClosureSheet.deleteRow(rowIndex);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  }
  
  // Fonction utilitaire pour obtenir les blocs de participants
  function getBlocks(participantsStr) {
  if (!participantsStr) return [];
  
  // Expression régulière améliorée pour capturer les blocs de participants
  // Elle recherche un tableau JSON suivi d'une date entre parenthèses
  const regex = /(\[.*?\])\s*\((.*?)\)/g;
  let blocks = [];
  let match;
  
  while ((match = regex.exec(participantsStr)) !== null) {
    try {
      // Vérifier si le format JSON est valide
      const jsonStr = match[1];
      const dateStr = match[2];
      
      // Vérifier si la date est valide
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        Logger.log("Date invalide ignorée: " + dateStr);
        continue;
      }
      
      blocks.push({
        json: jsonStr,
        date: dateStr,
        fullBlock: match[0]
      });
    } catch (e) {
      Logger.log("Erreur lors de l'extraction d'un bloc: " + e + "\nBloc: " + match[0]);
    }
  }
  
  return blocks;
  }
  
  // Fonction utilitaire pour formater une date en DD/MM/YYYY
  function formatDateToDDMMYYYY(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  
  if (isNaN(date)) return '';
  
  const dd = date.getDate().toString().padStart(2, '0');
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const yyyy = date.getFullYear();
  
  return `${dd}/${mm}/${yyyy}`;
  }
  
  // Fonction de diagnostic pour vérifier la structure de la feuille "Formations"
  function diagFormations() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const formationsSheet = ss.getSheetByName('Formations');
    
    if (!formationsSheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'La feuille "Formations" n\'existe pas'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = formationsSheet.getDataRange().getValues();
    
    if (data.length === 0) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'La feuille "Formations" est vide'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = data[0];
    const headerInfo = headers.map((header, index) => {
      return {
        index: index,
        name: header.toString(),
        column: String.fromCharCode(65 + index) // Convertit l'index en lettre de colonne (A, B, C, etc.)
      };
    });
    
    // Vérifier si les colonnes requises existent
    const hasId = headers.some(h => h.toString().toLowerCase() === 'id');
    const hasName = headers.some(h => h.toString().toLowerCase() === 'name');
    const hasDates = headers.some(h => h.toString().toLowerCase().includes('date'));
    const hasParticipants = headers.some(h => h.toString().toLowerCase().includes('participant'));
    
    // Récupérer un échantillon de données (première ligne après les en-têtes)
    const sampleData = data.length > 1 ? data[1] : [];
    const sampleRow = sampleData.map((cell, index) => {
      return {
        column: String.fromCharCode(65 + index),
        value: cell ? cell.toString() : 'vide'
      };
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      sheetInfo: {
        name: 'Formations',
        rowCount: formationsSheet.getLastRow(),
        colCount: formationsSheet.getLastColumn()
      },
      headers: headerInfo,
      requiredColumns: {
        id: hasId,
        name: hasName,
        dates: hasDates,
        participants: hasParticipants
      },
      sampleRow: sampleRow
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  }
  
  // Fonction pour supprimer une formation de la liste des clôtures en attente
  function deleteFromPendingClosure(e) {
  try {
    const id = String(e.parameter.id); // Convertir en chaîne
    
    if (!id) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'ID manquant'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const pendingClosureSheet = ss.getSheetByName('PendingClosure');
    
    if (!pendingClosureSheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Feuille PendingClosure introuvable'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const pendingData = pendingClosureSheet.getDataRange().getValues();
    const idIndex = 0; // Généralement la première colonne
    const dateIndex = pendingData[0].indexOf('date');
    
    let rowIndex = -1;
    
    for (let i = 1; i < pendingData.length; i++) {
      // Convertir l'ID de la ligne en chaîne pour la comparaison
      const rowId = String(pendingData[i][idIndex]);
      
      // Si une date est fournie, vérifier également la correspondance de la date
      let dateMatches = true;
      if (e.parameter.date && dateIndex >= 0) {
        const rowDate = formatDateToDDMMYYYY(pendingData[i][dateIndex]);
        dateMatches = (rowDate === e.parameter.date);
      }
      
      if (rowId === id && dateMatches) {
        rowIndex = i + 1; // +1 car les indices de feuille commencent à 1
        break;
      }
    }
    
    if (rowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Formation introuvable'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Supprimer la ligne de la liste des formations à clôturer
    pendingClosureSheet.deleteRow(rowIndex);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  }
  
  // Fonction pour mettre à jour les participants dans PendingClosure
  function updatePendingClosureParticipants(e) {
    try {
      const id = String(e.parameter.id);
      const date = e.parameter.date;
      const participants = e.parameter.participants;
      
      if (!id || !participants) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'ID ou participants manquants'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const pendingClosureSheet = ss.getSheetByName('PendingClosure');
      
      if (!pendingClosureSheet) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Feuille PendingClosure introuvable'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      const data = pendingClosureSheet.getDataRange().getValues();
      const headers = data[0];
      
      // Trouver les index des colonnes
      const idIndex = 0; // Généralement la première colonne
      const dateIndex = headers.indexOf('date');
      const participantsIndex = headers.indexOf('participants');
      
      if (participantsIndex === -1) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Colonne participants introuvable'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      let rowIndex = -1;
      
      // Chercher la ligne correspondante
      for (let i = 1; i < data.length; i++) {
        const rowId = String(data[i][idIndex]);
        
        // Vérifier la correspondance de l'ID et de la date si fournie
        let dateMatches = true;
        if (date && dateIndex >= 0) {
          const rowDate = formatDateToDDMMYYYY(data[i][dateIndex]);
          dateMatches = (rowDate === date);
        }
        
        if (rowId === id && dateMatches) {
          rowIndex = i + 1; // +1 car les indices de feuille commencent à 1
          break;
        }
      }
      
      if (rowIndex === -1) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Formation introuvable dans PendingClosure'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      // Mettre à jour la colonne participants
      const columnLetter = String.fromCharCode(65 + participantsIndex); // A=65, B=66, etc.
      const range = `${columnLetter}${rowIndex}`;
      pendingClosureSheet.getRange(range).setValue(participants);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Participants mis à jour avec succès'
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  function addRefAttestation(e) {
  try {
    // Récupérer les paramètres
    const entite = e.parameter.entite;
    const formation = e.parameter.formation;
    const date = e.parameter.date;
    const stagiaire = e.parameter.stagiaire;
    
    if (!entite || !formation || !date || !stagiaire) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Paramètres manquants"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Ouvrir la feuille de calcul
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Ref_Attestations");
    
    // Créer la feuille si elle n'existe pas
    if (!sheet) {
      sheet = ss.insertSheet("Ref_Attestations");
      sheet.appendRow(["ID", "VREF", "ENTITE", "FORMATION", "DATE", "STAGIAIRE"]);
    }
    
    // Récupérer toutes les données existantes
    const data = sheet.getDataRange().getValues();
    
    // Déterminer le prochain ID
    let nextId = 1;
    if (data.length > 1) {
      // Extraire tous les IDs existants
      const ids = data.slice(1).map(row => parseInt(row[0]));
      nextId = Math.max(...ids) + 1;
    }
    
    // Déterminer le numéro de séquence pour cette entité et formation
    let seqNum = 1;
    const entiteFormationRefs = data.slice(1).filter(row => 
      row[2].toLowerCase() === entite.toLowerCase() && 
      row[3].includes(formation)
    );
    
    if (entiteFormationRefs.length > 0) {
      // Extraire les numéros de séquence existants
      const seqNums = entiteFormationRefs.map(row => {
        const refParts = row[1].split('_');
        if (refParts.length === 2) {
          const numPart = refParts[0].replace('vatt', '');
          return parseInt(numPart);
        }
        return 0;
      });
      seqNum = Math.max(...seqNums) + 1;
    }
    
    // Formater le numéro de séquence avec des zéros en préfixe
    const formattedSeqNum = String(seqNum).padStart(3, '0');
    
    // Générer la référence
    const vref = `vatt${formattedSeqNum}_${entite.toLowerCase()}`;
    
    // Ajouter la nouvelle référence
    sheet.appendRow([nextId, vref, entite, formation, date, stagiaire]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      vref: vref
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  }
  
  function readRefAttestations(e) {
  try {
    // Ouvrir la feuille de calcul
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Ref_Attestations");
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        values: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Récupérer toutes les données
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // Convertir les données en objets
    const values = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
    // Filtrer par entité et/ou formation si spécifié
    let filteredValues = values;
    if (e.parameter.entite) {
      filteredValues = filteredValues.filter(v => 
        v.ENTITE && v.ENTITE.toLowerCase() === e.parameter.entite.toLowerCase()
      );
    }
    if (e.parameter.formation) {
      filteredValues = filteredValues.filter(v => 
        v.FORMATION && v.FORMATION.includes(e.parameter.formation)
      );
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      values: filteredValues
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  }
  
  function addRefConvention(e) {
  try {
    // Récupérer les paramètres
    const entite = e.parameter.entite;
    const formation = e.parameter.formation;
    const date = e.parameter.date;
    
    if (!entite || !formation || !date) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Paramètres manquants"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Ouvrir la feuille de calcul
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Ref_Conventions");
    
    // Créer la feuille si elle n'existe pas
    if (!sheet) {
      sheet = ss.insertSheet("Ref_Conventions");
      sheet.appendRow(["ID", "VREF", "ENTITE", "FORMATION", "DATE"]);
    }
    
    // Récupérer toutes les données existantes
    const data = sheet.getDataRange().getValues();
    
    // Déterminer le prochain ID
    let nextId = 1;
    if (data.length > 1) {
      // Extraire tous les IDs existants
      const ids = data.slice(1).map(row => parseInt(row[0]));
      nextId = Math.max(...ids) + 1;
    }
    
    // Déterminer le numéro de séquence global le plus élevé pour les conventions
    let seqNum = 1;
    if (data.length > 1) {
      // Extraire tous les numéros de séquence existants des références vcvt
      const seqNums = data.slice(1)
        .filter(row => row[1] && row[1].toString().startsWith('vcvt'))
        .map(row => {
          const refParts = row[1].split('_');
          if (refParts.length >= 1) {
            const numPart = refParts[0].replace('vcvt', '');
            const num = parseInt(numPart);
            return isNaN(num) ? 0 : num;
          }
          return 0;
        })
        .filter(num => num > 0);
      
      if (seqNums.length > 0) {
        seqNum = Math.max(...seqNums) + 1;
      }
    }
    
    // Formater le numéro de séquence avec des zéros en préfixe
    const formattedSeqNum = String(seqNum).padStart(3, '0');
    
    // Générer la référence
    const vref = `vcvt${formattedSeqNum}_${entite.toLowerCase()}`;
    
    // Ajouter la nouvelle référence
    sheet.appendRow([nextId, vref, entite, formation, date]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      vref: vref
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  }
  
  function addRefConvocation(e) {
  try {
    // Récupérer les paramètres
    const entite = e.parameter.entite;
    const formation = e.parameter.formation;
    const date = e.parameter.date;
    const stagiaire = e.parameter.stagiaire;
    
    if (!entite || !formation || !date || !stagiaire) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Paramètres manquants"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Ouvrir la feuille de calcul
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Ref_Convocations");
    
    // Créer la feuille si elle n'existe pas
    if (!sheet) {
      sheet = ss.insertSheet("Ref_Convocations");
      sheet.appendRow(["ID", "VREF", "ENTITE", "FORMATION", "DATE", "STAGIAIRE"]);
    }
    
    // Récupérer toutes les données existantes
    const data = sheet.getDataRange().getValues();
    
    // Déterminer le prochain ID
    let nextId = 1;
    if (data.length > 1) {
      // Extraire tous les IDs existants
      const ids = data.slice(1).map(row => parseInt(row[0]));
      nextId = Math.max(...ids) + 1;
    }
    
    // Déterminer le numéro de séquence global le plus élevé pour les convocations (vcvn)
    let seqNum = 1;
    if (data.length > 1) {
      // Extraire tous les numéros de séquence existants des références vcvn
      const seqNums = data.slice(1)
        .filter(row => row[1] && row[1].toString().startsWith('vcvn'))
        .map(row => {
          const refParts = row[1].split('_');
          if (refParts.length >= 1) {
            const numPart = refParts[0].replace('vcvn', '');
            const num = parseInt(numPart);
            return isNaN(num) ? 0 : num;
          }
          return 0;
        })
        .filter(num => num > 0);
      
      if (seqNums.length > 0) {
        seqNum = Math.max(...seqNums) + 1;
      }
    }
    
    // Formater le numéro de séquence avec des zéros en préfixe
    const formattedSeqNum = String(seqNum).padStart(3, '0');
    
    // Générer la référence avec le bon préfixe vcvn
    const vref = `vcvn${formattedSeqNum}_${entite.toLowerCase()}`;
    
    // Ajouter la nouvelle référence
    sheet.appendRow([nextId, vref, entite, formation, date, stagiaire]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      vref: vref
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  }
  
  function rescheduleFormation(e) {
    try {
      const id = String(e.parameter.id);
      const oldDate = e.parameter.oldDate;
      const newDate = e.parameter.newDate;
      
      if (!id || !oldDate || !newDate) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Paramètres manquants (id, oldDate, newDate)'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const pendingClosureSheet = ss.getSheetByName('PendingClosure');
      const formationsSheet = ss.getSheetByName('Formations');
      
      if (!pendingClosureSheet || !formationsSheet) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Feuilles requises introuvables'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      // Trouver la formation dans PendingClosure
      const pendingData = pendingClosureSheet.getDataRange().getValues();
      const headers = pendingData[0];
      
      const idIndex = 0; // Généralement la première colonne
      const dateIndex = headers.indexOf('date');
      const formationIndex = headers.indexOf('formation');
      const participantsIndex = headers.indexOf('participants');
      
      let rowIndex = -1;
      let formationData = null;
      
      for (let i = 1; i < pendingData.length; i++) {
        const rowId = String(pendingData[i][idIndex]);
        const rowDate = formatDateToDDMMYYYY(pendingData[i][dateIndex]);
        
        if (rowId === id && rowDate === oldDate) {
          rowIndex = i + 1;
          formationData = {
            id: pendingData[i][idIndex],
            formation: pendingData[i][formationIndex],
            date: pendingData[i][dateIndex],
            participants: pendingData[i][participantsIndex]
          };
          break;
        }
      }
      
      if (rowIndex === -1) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Formation introuvable dans PendingClosure'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      // Parser la nouvelle date
      const newDateObj = parseDDMMYYYY(newDate);
      if (isNaN(newDateObj.getTime())) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Format de date invalide. Utilisez le format dd/mm/yyyy'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      // Vérifier si la nouvelle date est dans le futur
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      newDateObj.setHours(0, 0, 0, 0);
      
      const isFutureDate = newDateObj > today;
      
      if (isFutureDate) {
        // Si la nouvelle date est future, déplacer vers le tableau Formations
        
        // Mettre à jour les participants avec la nouvelle date
        const updatedParticipants = updateParticipantsDate(formationData.participants, newDate);
        
        // Chercher si la formation existe déjà dans le tableau Formations
        const formationsData = formationsSheet.getDataRange().getValues();
        const formationsHeaders = formationsData[0];
        
        const formationsIdIndex = 0;
        const formationsNameIndex = 1;
        const formationsDatesIndex = 2;
        const formationsParticipantsIndex = 3;
        
        let existingFormationRow = -1;
        
        for (let i = 1; i < formationsData.length; i++) {
          if (String(formationsData[i][formationsIdIndex]) === id && 
              formationsData[i][formationsNameIndex] === formationData.formation) {
            existingFormationRow = i + 1;
            break;
          }
        }
        
        if (existingFormationRow !== -1) {
          // Mettre à jour la formation existante
          const existingParticipants = formationsData[existingFormationRow - 1][formationsParticipantsIndex];
          const existingDates = formationsData[existingFormationRow - 1][formationsDatesIndex];
          
          // Ajouter la nouvelle date aux dates existantes
          let newDates = existingDates;
          if (existingDates && existingDates.trim() !== '') {
            newDates = existingDates + ', ' + newDate;
          } else {
            newDates = newDate;
          }
          
          // Ajouter les nouveaux participants aux participants existants
          let newParticipants = existingParticipants;
          if (existingParticipants && existingParticipants.trim() !== '') {
            newParticipants = existingParticipants + ', ' + updatedParticipants;
          } else {
            newParticipants = updatedParticipants;
          }
          
          formationsSheet.getRange(existingFormationRow, formationsDatesIndex + 1).setValue(newDates);
          formationsSheet.getRange(existingFormationRow, formationsParticipantsIndex + 1).setValue(newParticipants);
        } else {
          // Créer une nouvelle ligne dans Formations
          formationsSheet.appendRow([
            formationData.id,
            formationData.formation,
            newDate,
            updatedParticipants
          ]);
        }
        
        // Supprimer de PendingClosure
        pendingClosureSheet.deleteRow(rowIndex);
        
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: 'Formation replanifiée avec succès vers le ' + newDate + ' et déplacée vers le tableau Formations'
        })).setMimeType(ContentService.MimeType.JSON);
        
      } else {
        // Si la nouvelle date est passée, mettre à jour seulement la date dans PendingClosure
        const updatedParticipants = updateParticipantsDate(formationData.participants, newDate);
        
        pendingClosureSheet.getRange(rowIndex, dateIndex + 1).setValue(newDate);
        pendingClosureSheet.getRange(rowIndex, participantsIndex + 1).setValue(updatedParticipants);
        
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: 'Date mise à jour vers le ' + newDate + ' (formation reste dans le tableau de clôture)'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  // Fonction utilitaire pour mettre à jour la date des participants
  function updateParticipantsDate(participantsStr, newDate) {
    if (!participantsStr) return '';
    
    // Convertir la nouvelle date en format JavaScript complet
    let formattedNewDate = newDate;
    if (newDate && typeof newDate === 'string') {
      try {
        // Si c'est déjà au format dd/mm/yyyy, le parser
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(newDate)) {
          const parts = newDate.split('/');
          const dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
          formattedNewDate = dateObj.toString();
        } else {
          // Sinon, essayer de parser directement
          const dateObj = new Date(newDate);
          if (!isNaN(dateObj.getTime())) {
            formattedNewDate = dateObj.toString();
          }
        }
      } catch (e) {
        // En cas d'erreur, utiliser la date originale
        formattedNewDate = newDate;
      }
    }
    
    // Découper les participants par "|||"
    const participantBlocks = participantsStr.split('|||');
    
    const updatedBlocks = participantBlocks.map(block => {
      // Extraire le JSON et l'ancienne date
      const match = block.match(/^(\[.*?\])\s*\((.*?)\)$/);
      if (match) {
        const jsonPart = match[1];
        // Retourner le JSON avec la nouvelle date au format JavaScript complet
        return jsonPart + ' (' + formattedNewDate + ')';
      }
      return block; // Si le format ne correspond pas, retourner tel quel
    });
    
    return updatedBlocks.join('|||');
  }

  // ===== FONCTIONS DE GESTION DES LOGS =====
  
  function readLogs() {
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      let logsSheet = ss.getSheetByName("Logs");
      
      // Créer la feuille Logs si elle n'existe pas
      if (!logsSheet) {
        logsSheet = ss.insertSheet("Logs");
        logsSheet.appendRow(["ID", "DATE", "HEURE", "ACTION", "IP"]);
      }
      
      const data = logsSheet.getDataRange().getValues();
      
      if (data.length <= 1) {
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          values: []
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      const logs = data.slice(1).map(function(row) {
        return {
          id: row[0],
          date: row[1],
          heure: row[2],
          action: row[3],
          ip: row[4]
        };
      });
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        values: logs
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  function addLog(e) {
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      let logsSheet = ss.getSheetByName("Logs");
      
      // Créer la feuille Logs si elle n'existe pas
      if (!logsSheet) {
        logsSheet = ss.insertSheet("Logs");
        logsSheet.appendRow(["ID", "DATE", "HEURE", "ACTION", "IP"]);
      }
      
      const action = e.parameter.logAction || "Action inconnue";
      const userIp = e.parameter.userIp || "IP inconnue";
      
      // Générer un nouvel ID
      const data = logsSheet.getDataRange().getValues();
      let newId = 1;
      if (data.length > 1) {
        const ids = data.slice(1).map(function(row) {
          return parseInt(row[0]) || 0;
        });
        newId = Math.max.apply(null, ids) + 1;
      }
      
      // Obtenir la date et l'heure actuelles
      const now = new Date();
      const date = Utilities.formatDate(now, Session.getScriptTimeZone(), "dd/MM/yyyy");
      const heure = Utilities.formatDate(now, Session.getScriptTimeZone(), "HH:mm:ss");
      
      // Ajouter le log
      logsSheet.appendRow([newId, date, heure, action, userIp]);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        id: newId
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  function clearLogs() {
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      let logsSheet = ss.getSheetByName("Logs");
      
      if (!logsSheet) {
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: "Aucune feuille de logs à vider"
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      // Vider la feuille et recréer l'en-tête
      logsSheet.clear();
      logsSheet.appendRow(["ID", "DATE", "HEURE", "ACTION", "IP"]);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Logs vidés avec succès"
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  