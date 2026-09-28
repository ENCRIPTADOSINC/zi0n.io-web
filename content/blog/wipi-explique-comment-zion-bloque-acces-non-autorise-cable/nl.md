---
title: "Wipi uitgelegd: hoe Zi0n ongeautoriseerde kabeltoegang blokkeert"
description: "Ontdek hoe de Wipi-functie van Zi0n ongeautoriseerde fysieke USB-kabeltoegang blokkeert en encryptiesleutels wist in microseconden."
date: "2026-09-28"
author: "Equipo Zi0n"
category: "Mobiele beveiliging"
tags: ["mobiele-beveiliging","cable-wipe","wipi","anti-forensics","versleuteling","hardened-phone"]
coverImage: "/image/blog/wipi-explique-comment-zion-bloque-acces-non-autorise-cable.webp"
draft: false
---

Het aansluiten van een fysieke USB-kabel blijft een van de snelste manieren om een smartphone binnen te dringen. Bij douanecontroles, inbeslagnames of via gemanipuleerde openbare oplaadpunten stelt een kabelverbinding apparaatcontrollers direct bloot aan externe hardware.

Tegen deze directe fysieke dreiging beschikt Zi0n over de Wipi-technologie, een proactief verdedigingsmechanisme dat data-extractie onmiddellijk blokkeert zodra een verdachte kabel wordt aangesloten.

## Waarom fysieke kabeltoegang een kritiek risico vormt

Veel gebruikers denken dat mobiele aanvallen uitsluitend op afstand plaatsvinden via spyware of phishing. In de praktijk levert fysieke toegang via de USB-poort echter vrijwel altijd resultaat op bij gewone commerciële telefoons.

Gespecialiseerde forensische apparatuur zoals Cellebrite UFED of GrayKey probeert geen toegangscodes op het scherm te raden. Deze systemen dwingen de processor in herstelmodi op laag niveau (zoals EDL of BootROM), waarmee alle softwarebeveiligingen van het besturingssysteem worden omzeild. Daarnaast vormt *juice jacking* op vliegvelden en in hotels een risico, waarbij openbare aansluitingen data kopiëren tijdens het laden.

## Technische werking van de Wipi-beveiliging

Wipi is geen gewone achtergrondapp, maar een hardwarematige beveiligingsrichtlijn in het energiebeheer en de USB-firmware van het toestel.

### Controle van differentiële datalijnen

Een goedgekeurde lader levert alleen stroom via de voedingspinnen (VBUS en aarde). Een forensisch apparaat of computer probeert echter meteen een dataverbinding op te zetten via de differentiële lijnen (D+ en D-) of de configuratiekanalen (CC) van USB-C.

Wanneer het scherm van de Zi0n vergrendeld is, analyseert de hardwarecontroller continu deze elektrische signalen. Elke ongeautoriseerde verbindingspoging wordt binnen microseconden aangemerkt als een fysieke aanval.

### Onmiddellijke cryptografische vernietiging in het Secure Element

De reactie van het toestel is ogenblikkelijk en definitief. Het overschrijven van honderden gigabytes flashgeheugen zou bij een snelle inbeslagname te veel tijd kosten. Wipi pakt daarom direct het cryptografische hart aan: het hardware-beveiligingsmodul (Secure Element / HSM).

Binnen een fractie van een milliseconde vernietigt de processor de AES-256 hoofdsleutels van de bestandsversleuteling (File-Based Encryption). Zonder deze sleutels in de beveiligde chip verandert het flashgeheugen in willekeurige ruis die met geen enkele supercomputer te ontcijferen is.

### Lokale autonomie en bescherming tegen kooien van Faraday

Reguliere MDM-oplossingen hebben netwerkbereik nodig om wisopdrachten te ontvangen. Forensische onderzoekers sluiten telefoons echter direct op in een kooi of tas van Faraday om radiosignalen te blokkeren. Wipi functioneert voor de volle 100 % lokaal op de hardware: er is geen mobiel netwerk, satellietverbinding of externe server nodig.

## Praktische richtlijnen tegen fysieke risico's

Eenvoudige gewoonten verkleinen uw fysieke risico's tijdens reizen aanzienlijk:

> Echte hardwarebeveiliging duldt geen compromissen: bij een onbevoegde fysieke aansluiting moet de sleutelvernietiging altijd sneller zijn dan de gegevenstoegang.

- **USB-datablokkers:** gebruik adapters die datalijnen fysiek onderbreken bij het opladen aan openbare aansluitingen.
- **Offline back-ups:** bewaar herstelzinnen en vertrouwelijke gegevens op niet-verbonden dragers.
- **Poortblokkade actief houden:** laat de automatische datablokkade altijd ingeschakeld zodra het scherm is uitgeschakeld.

## Hoe beschermt Zi0n u?

Wipi is een essentiële pijler binnen de gelaagde beveiliging van [Zi0n](https://zi0n.io). Door een gehard besturingssysteem op basis van GrapheneOS te combineren met specifieke beveiligingschips, dicht Zi0n de gaten die gewone telefoons openlaten. Het toestel bevat daarnaast een Duress PIN tegen fysieke dwang, WipScreen tegen schermspionage en gedecentraliseerde VPN-routering met dynamische IP-rotatie voor maximale privacy.

## Veelgestelde vragen

### Wat gebeurt er bij een normale thuislader?
Een normale adapter gebruikt alleen stroompinnen. Wipi activeert niet omdat er geen data-uitwisseling op de communicatielijnen plaatsvindt.

### Heeft Wipi internet nodig?
Nee. Het systeem werkt 100 % lokaal op hardwareniveau en blijft actief in vliegtuigmodus of in een kooi van Faraday.

### Kan Cellebrite Wipi omzeilen?
Nee. Detectie vindt plaats in de microcontroller voordat externe code in het BootROM kan worden geladen.

### Kunnen gegevens na Wipi hersteld worden?
Nee, het wissen van de hoofdsleutels is definitief en onomkeerbaar. Offline back-ups blijven noodzakelijk.

Ontdek alle specificaties op de officiële website van [Zi0n](https://zi0n.io).
