import { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable} from "./components/DataTable";
import type { Column } from "./components/DataTable/types";

type User = { id: number; name: string; email: string; age: number };

const data: User[] = [
  { id: 1, name: "Aisha", email: "aisha@example.com", age: 24 },
  { id: 2, name: "Ravi", email: "ravi@example.com", age: 28 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export default function App() {
  const [val, setVal] = useState("");
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 space-y-6">
      <button
        className="rounded-lg border px-3 py-1 cursor-pointer"
        onClick={() => document.documentElement.classList.toggle("dark")}
      >
        Toggle Theme
      </button>

      <div className="max-w-sm">
        <InputField
          label="Username"
          placeholder="Type your name"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          helperText="This is helper text"
          variant="outlined"
          clearable
        />
      </div>

      <DataTable<User>
        data={data}
        columns={columns}
        selectable
        onRowSelect={(rows) => console.log("selected", rows)}
      />
    </div>
  );
}
