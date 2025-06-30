import { useCallback, useState } from "react";
import Input from "../core/Library-V/Input";

function Component() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [name]
  );

  const handleEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [email]
  );

  return (
    <>
      <div className="p-4">
        <p className="text-5xl  m-7">Components</p>

        <Input
          label="email"
          placeholder="Enter Email"
          layout="vertical"
          className="w-sm"
          value={email}
          onChange={handleEmail}
        />
        <Input
          label="name"
          placeholder="Enter Email"
          layout="horizontal"
          className="w-md "
          value={name}
          onChange={handleName}
        />
      </div>
    </>
  );
}

export default Component;
