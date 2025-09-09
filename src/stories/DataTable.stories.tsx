import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../components/DataTable";
import { useState } from "react";

interface UserData {
  id: number;
  username: string;
  password: string;
}

const meta: Meta<typeof DataTable<UserData>> = {
  title: "Components/DataTable",
  component: DataTable<UserData>,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DataTable<UserData>>;

const Template = () => {
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, username: "Alice", password: "alice123" },
    { id: 2, username: "Bob", password: "bob456" },
  ]);

  return (
    <DataTable<UserData>
      data={users}
      columns={[
        { key: "username", title: "Username", dataIndex: "username", sortable: true },
        { key: "password", title: "Password", dataIndex: "password" },
      ]}
      selectable
      onRowSelect={(rows) => console.log("Selected:", rows)}
    />
  );
};

export const Default: Story = {
  render: () => <Template />,
};
