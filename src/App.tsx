import { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable";

interface UserData {
  id: number;
  username: string;
  password: string;
}

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<UserData[]>([]);

  const handleSubmit = () => {
    if (!username || !password) return alert("Please fill both fields");
    const newUser: UserData = {
      id: Date.now(),
      username,
      password,
    };
    setUsers((prev) => [...prev, newUser]);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Add User</h1>

        <InputField
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText="This will be stored in the table"
          variant="outlined"
          size="md"
        />

        <InputField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          size="md"
          type="password"
        />

        <button
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
          onClick={handleSubmit}
        >
          Add User
        </button>
      </div>

      {/* DataTable Section */}
      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-xl text-center font-semibold mb-2">User Table</h2>
        <DataTable<UserData>
          data={users}
          columns={[
            { key: "username", title: "Username", dataIndex: "username", sortable: true },
            { key: "password", title: "Password", dataIndex: "password" },
          ]}
          selectable
          onRowSelect={(rows) => console.log("Selected:", rows)}
        />
      </div>
    </div>
  );
}

export default App;
