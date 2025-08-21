import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataTable } from "./DataTable";
import type { Row, Column } from "./types";

const rows: Row[] = [
  { id: 1, name: "B", age: 30 },
  { id: 2, name: "A", age: 25 },
];

const cols: Column<Row>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

describe("DataTable", () => {
  it("renders rows", () => {
    render(<DataTable<Row> data={rows} columns={cols} />);
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("sorts when header clicked", () => {
    render(<DataTable<Row> data={rows} columns={cols} />);
    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader); // asc
    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("A");
  });

  it("selects rows when selectable", () => {
    const handler = vi.fn();
    render(
      <DataTable<Row> data={rows} columns={cols} selectable onRowSelect={handler} />
    );
    const checkbox = screen.getAllByRole("checkbox")[1]; // first row
    fireEvent.click(checkbox);
    expect(handler).toHaveBeenCalledWith([{ id: 1, name: "B", age: 30 }]);
  });
});
