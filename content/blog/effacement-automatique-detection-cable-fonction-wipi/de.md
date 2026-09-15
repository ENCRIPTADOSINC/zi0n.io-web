---
title: "Automatische Löschung bei Kabelerkennung: die Wipi-Funktion erklärt"
description: "Erfahren Sie in 3 Minuten, wie Zi0ns Wipi-Funktion funktioniert: Hardware-Erkennung von USB-Datenkabeln und sofortige Vernichtung aller Schlüssel."
date: "2026-09-15"
author: "Equipo Zi0n"
category: "Mobile Sicherheit"
tags: ["mobile-sicherheit","cable-wipe","wipi","anti-forensics","verschluesselung","hardened-phone"]
coverImage: "/image/blog/effacement-automatique-detection-cable-fonction-wipi.webp"
draft: false
---

Der physische Anschluss über ein USB-Kabel bleibt der schnellste Weg, um Daten von einem beschlagnahmten oder entwendeten Smartphone zu extrahieren. Gegen forensische Auslesestationen, die Bildschirmsperren in Sekundenschnelle umgehen, setzt Zi0n mit der Wipi-Funktion eine kompromisslose Hardware-Schranke: die sofortige kryptografische Zerstörung der Hauptschlüssel bei Erkennung eines unbefugten Datenkabels.

## Die Bedrohung durch physische Kabel-Extraktion

Bei Grenzkontrollen, gezieltem Diebstahl oder polizeilichen Zugriffen versuchen Angreifer nicht, Codes manuell zu erraten. Sie verbinden das Smartphone unmittelbar mit spezialisierten Forensik-Stationen wie Cellebrite UFED oder GrayKey.

Diese Analysegeräte nutzen Schwachstellen auf Hardware-Ebene gezielt aus:
- **Einschleusen von Schadcode im Notfallmodus (EDL / BootROM):** Umgehung des Android-Sicherheitsmodells, bevor das Betriebssystem vollständig geladen ist.
- **Automatisierte Brute-Force-Angriffe:** Maschinelle Tastatureingaben in extrem hoher Frequenz ohne Verzögerungssperren.
- **Manipulierte Ladestationen (*Juice Jacking*):** Öffentliche USB-Buchsen an Flughäfen, die unbemerkt Daten abgreifen, während der Akku lädt.

Bleiben die Datenleitungen aktiv, sind private Krypto-Schlüssel und vertrauliche Nachrichten binnen kürzester Zeit kompromittiert.

## Funktionsweise der Wipi-Sicherheitstechnologie

Die Wipi-Funktion von Zi0n (Cable Wipe-Protokoll) ist kein gewöhnlicher Hintergrundprozess, der durch Speicherengpässe beendet werden könnte. Es handelt sich um eine tief in die Firmware des Power-Management-Controllers und des USB-Busses integrierte Sicherheitsroutine.

### 1. Erkennung aktiver Datenleitungen in Mikrosekunden
Ein standardisiertes Ladegerät überträgt lediglich elektrische Spannung (VBUS- und Massepins). Eine Forensik-Einheit oder ein Rechner versucht dagegen sofort, eine Datenverbindung über die differenziellen Leitungen D+ und D- oder CC-Pins bei USB-C aufzubauen. Der Zi0n-Controller erkennt diese Signalmuster in Mikrosekunden. Befindet sich das Gerät im gesperrten Sicherheitsmodus, wird jeder Datenaustauschversuch als physischer Einbruch gewertet.

### 2. Unmittelbare Schlüsselvernichtung im Secure Element
Das physische Überschreiben hunderter Gigabyte Flash-Speicher würde mehrere Minuten dauern – Zeit, die im Ernstfall fehlt. Die Wipi-Funktion greift direkt an der kryptografischen Wurzel an: Die Firmware sendet einen Hardware-Befehl an das Sicherheitsmodul (HSM / Secure Element). In Nanosekunden werden die AES-256-Hauptschlüssel der dateibasierten Verschlüsselung (FBE) gelöscht. Ohne diese Schlüssel bleibt auf dem Speicherchip nur noch unentzifferbares digitales Rauschen zurück.

### 3. Vollkommen autonomer Betrieb ohne Netzverbindung
Klassische MDM-Fernlöschungen versagen, sobald das Gerät keinen Mobilfunk- oder WLAN-Empfang hat. Ermittler isolieren beschlagnahmte Smartphones standardmäßig in Faraday-Beuteln gegen Funkwellen. Die Wipi-Funktion arbeitet vollkommen autark vor Ort: Weder eine SIM-Karte noch externe Serversignale werden für die Notfallbereinigung benötigt.

## Praktische Empfehlungen und Konfiguration

Um die Wipi-Funktion im Alltag optimal zu nutzen und Fehlalarme zu vermeiden, beachten Sie diese Maßnahmen:

1. **Aktivieren Sie die Kabelerkennung vor Aufenthalten in Risikozonen:** Konfigurieren Sie die Notfalllöschung bei unerlaubter Datenverbindung im gesperrten Zustand.
2. **Verwenden Sie USB-Kondome (*Data Blocker*):** Beim Laden an öffentlichen Steckdosen trennt dieser Adapter die Datenpins D+/D- physisch und verhindert so ein versehentliches Auslösen von Wipi.
3. **Führen Sie strikte Offline-Backups:** Verwahren Sie Seed-Phrasen und Wiederherstellungsschlüssel stets getrennt auf sicheren Offline-Medien.

## Integration in das Sicherheitskonzept von Zi0n

Die Wipi-Funktion bildet einen Grundpfeiler des mehrschichtigen Schutzsystems von Zi0n, im Verbund mit dem Duress PIN-Code, Inaktivitätslöschern und physischen Trennschaltern für Mikrofone und Kameras. Dieses Zusammenspiel bietet Schutz vor Überwachung und physischer Gerätebeschlagnahme. Alle technischen Details finden Sie unter [https://zi0n.io](https://zi0n.io).

## Häufig gestellte Fragen zur Wipi-Funktion

**Kann ein normales Netzteil versehentlich die Wipi-Löschung auslösen?**  
Nein. Qualitativ einwandfreie Netzteile und Powerbanks besitzen keine aktiven Datenverbindungen. Der Zi0n-Controller unterscheidet zuverlässig zwischen Stromzufuhr und Datenübertragung.

**Lassen sich durch Wipi gelöschte Daten im Labor rekonstruieren?**  
Nein. Durch das Löschen der Schlüssel im Secure Element ist eine Entschlüsselung mathematisch unmöglich, selbst wenn Speicherchips aufwendig ausgelötet werden.

**Funktioniert die Wipi-Schutzfunktion auch im ausgeschalteten Zustand?**  
Ja. Der Power-Management-Chip überwacht den USB-Port sofort bei Stromkontakt und löst die Schlüsselzerstörung aus, wenn ein erzwungener Start im Test- oder EDL-Modus erfolgt.

**Was unterscheidet Wipi von herkömmlicher Fernlöschung?**  
Fernlöschungen schlagen fehl, sobald das Smartphone in einer Faraday-Hülle abgeschirmt wird. Wipi arbeitet direkt auf der Hardwareebene, ohne jede Netzabhängigkeit.
