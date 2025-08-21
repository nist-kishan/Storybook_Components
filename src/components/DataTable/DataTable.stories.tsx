import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DataTable } from "./DataTable";
import type { User, Column } from "./types";

const data: User[] = [
  { id: 1, name: "Aisha", email: "aisha@example.com", age: 24 },
  { id: 2, name: "Ravi", email: "ravi@example.com", age: 28 },
  { id: 3, name: "Meera", email: "meera@example.com", age: 22 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  args: { data, columns },
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {};

export const Selectable: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<User[]>([]);
    return (
      <div className="p-4">
        <DataTable<User>
          {...args}
          selectable
          onRowSelect={(rows) => setSelected(rows)}
        />
        <div className="mt-2 text-sm text-gray-500">
          Selected: {selected.map((r) => r.name).join(", ") || "None"}
        </div>
      </div>
    );
  },
};

export const Loading: Story = { args: { data: [], loading: true } };

export const Empty: Story = { args: { data: [] } };
