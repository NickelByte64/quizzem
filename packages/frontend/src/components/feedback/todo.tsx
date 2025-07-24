import { RiTodoLine } from "@remixicon/react";
import { JSX } from "react";
import { Card } from "~/components";

export function Todo(): JSX.Element {
  return (
    <Card className="border border-warning">
      <Card.Body>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-4">
            <RiTodoLine />
            <p className="font-bold">TODO</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
