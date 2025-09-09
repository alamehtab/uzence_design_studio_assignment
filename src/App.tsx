import { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable";
import type { Column } from "./components/DataTable";

interface User {
  username: string;
  password: string;
}

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const handleAddUser = () => {
    if (!username || !password) return;
    setUsers((prev) => [...prev, { username, password }]);
    setUsername("");
    setPassword("");
  };

  const columns: Column<User>[] = [
    { key: "username", title: "Username", dataIndex: "username", sortable: true },
    { key: "password", title: "Password", dataIndex: "password" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 space-y-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Login Form
        </h1>

        <InputField
          label="Username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText="This will be visible to others"
          variant="outlined"
          size="md"
          clearable
        />

        <InputField
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          size="md"
          type="password"
        />

        <button
          onClick={handleAddUser}
          disabled={!username || !password}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition"
        >
          Add User
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Users Table
        </h2>
        <DataTable<User>
          data={users}
          columns={columns}
          selectable
          onRowSelect={(selected) => console.log("Selected:", selected)}
        />
      </div>
    </div>
  );
}

export default App;
