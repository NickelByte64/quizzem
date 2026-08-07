# Quizzem 🎯

Echtzeit-Quiz-App für Kneipenquiz / Trivia-Abende. Ein Quizmaster hostet die App lokal
auf seinem Laptop, Teilnehmende spielen per URL/QR-Code über ihr Smartphone mit –
komplett offline über einen WLAN-Hotspot.

## Dokumentation

Die vollständige Projektdokumentation liegt in [`docs/`](docs/index.html):

| Dokument                                        | Inhalt                                                   |
| ----------------------------------------------- | -------------------------------------------------------- |
| [Übersicht](docs/index.html)                    | Einstieg und Lesereihenfolge                             |
| [1 · Produktvision](docs/01-produktvision.html) | Rollen, User Stories, MVP-Abgrenzung, Annahmen           |
| [2 · Architektur](docs/02-architektur.html)     | Techstack, Systemdesign, Event-Protokoll, Netzwerk-Setup |
| [3 · MVP-Anleitung](docs/03-mvp-anleitung.html) | Schritt-für-Schritt-Plan in 6 Phasen                     |
| [4 · Backlog](docs/04-backlog.html)             | Ausbaustufen nach dem MVP, priorisiert                   |

## Geplante Projektstruktur

```
quizzem/
├── docs/        # Projektdokumentation (HTML)
├── shared/      # gemeinsame Typen (Events, GameState) – Client + Server
├── server/      # Node.js: Express + WebSockets (ws) + GameEngine
├── client/      # Vite + React + zustand: Host- und Spieler-Ansicht
└── quizzes/     # gespeicherte Quizzes (*.json)
```

## Techstack (Kurzfassung)

Node.js LTS · TypeScript · Express · native WebSockets (`ws`) · Vite + React + zustand · Vitest
– ein Prozess, keine Datenbank, In-Memory-Spielzustand.
Details und Begründungen: [Architektur-Doku](docs/02-architektur.html).
