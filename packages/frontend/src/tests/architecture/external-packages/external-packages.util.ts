import { globSync } from "glob";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { expect } from "vitest";

interface Options {
  files: string | string[];
  forbidden: string[];
}

export function expectNoImports({ files, forbidden }: Options): void {
  const patterns = Array.isArray(files) ? files : [files];

  const sourceFiles = patterns.flatMap((pattern) => globSync(pattern));

  const violations: string[] = [];

  for (const file of sourceFiles) {
    const source = fs.readFileSync(file, "utf8");

    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);

    ts.forEachChild(ast, function visit(node) {
      if (
        ts.isImportDeclaration(node) &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const imported = node.moduleSpecifier.text;

        const match = forbidden.find((rule) => matches(rule, imported));

        if (match) {
          const { line, character } = ast.getLineAndCharacterOfPosition(
            node.moduleSpecifier.getStart(),
          );

          violations.push(
            `${path.relative(process.cwd(), file)}:${line + 1}:${
              character + 1
            } imports "${imported}" (forbidden by "${match}")`,
          );
        }
      }

      ts.forEachChild(node, visit);
    });
  }

  expect(
    violations,
    violations.length
      ? `Found ${violations.length} forbidden import(s):\n\n${violations.join(
          "\n",
        )}`
      : undefined,
  ).toHaveLength(0);
}

function matches(rule: string, value: string): boolean {
  if (rule.endsWith("/*")) {
    const prefix = rule.slice(0, -1);
    return value.startsWith(prefix);
  }

  return value === rule;
}
