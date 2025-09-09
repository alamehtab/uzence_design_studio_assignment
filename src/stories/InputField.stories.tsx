import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "../components/InputField";
import { useState } from "react";

const meta: Meta<typeof InputField> = {
    title: "Components/InputField",
    component: InputField,
    tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof InputField>;
const Template = (args: any) => {
    const [value, setValue] = useState("");
    return (
        <InputField
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export const Username: Story = {
    render: (args) => (
        <Template {...args} label="Username" placeholder="Enter username" />
    ),
};

export const Password: Story = {
    render: (args) => (
        <Template
            {...args}
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="filled"
        />
    ),
};

export const Invalid: Story = {
    render: (args) => (
        <InputField
            {...args}
            label="Username"
            placeholder="Enter username"
            invalid
            errorMessage="This field is required"
        />
    ),
};
