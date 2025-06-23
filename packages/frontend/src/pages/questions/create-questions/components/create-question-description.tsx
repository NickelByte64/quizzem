import { JSX } from "react";

export function CreateQuestionDescription(): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <p>
        Du kannst neue Fragen für dein Quiz ganz einfach auf zwei Arten
        hinzufügen:
      </p>
      <ul className="list-decimal pl-6 flex flex-col gap-2">
        <li>
          <p className="font-bold">Per Datei hochladen:</p>
          <p>
            Du kannst Fragen gesammelt als JSON- oder CSV-Datei hochladen. Das
            ist besonders praktisch, wenn du viele Fragen auf einmal erstellen
            möchtest.
          </p>
        </li>
        <li>
          <p className="font-bold">Über die Eingabefelder:</p>
          <p>
            Alternativ erstellst du Fragen direkt hier im Formular. Gib den
            Fragetyp, eine Kategorie, die Frage selbst, die richtige Antwort und
            Antwortmöglichkeiten ein.
          </p>
        </li>
      </ul>
    </div>
  );
}
