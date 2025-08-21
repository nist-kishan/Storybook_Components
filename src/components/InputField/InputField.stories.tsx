import type { Meta, StoryObj} from "@storybook/react";
import { useState } from "react";
import { InputField} from "./InputField";
import type { InputFieldProps } from "./types";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: { label: "Label", placeholder: "Type here..." },
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Outlined: Story = {
  args: { variant: "outlined", helperText: "Helper text" },
};

export const Filled: Story = {
  args: { variant: "filled" },
};

export const GhostLarge: Story = {
  args: { variant: "ghost", size: "lg" },
};

export const Invalid: Story = {
  args: { invalid: true, errorMessage: "This field is required" },
};

export const Loading: Story = { args: { loading: true } };

export const PasswordWithToggle: Story = {
  render: (args: InputFieldProps) => {
    const [val, setVal] = useState("");
    return (
      <div className="w-80">
        <InputField
          {...args}
          type="password"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          clearable
        />
      </div>
    );
  },
};
