// import React, { useCallback, useState } from "react";
// import JXInput, { type ValidatorFn } from "./core/Library/JX_Input";

import Component from "./Component/Component";

// const App = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [number, setNumber] = useState("");

//   const handleEmailChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const newValue = e.target.value;
//       setEmail(newValue);
//     },
//     []
//   );

//   const handleNameChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const newValue = e.target.value;
//       setName(newValue);
//     },
//     []
//   );

//   const handleNumberChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const newValue = e.target.value;
//       setNumber(newValue);
//     },
//     []
//   );

//   const minLengthValidator = useCallback((val: any): ValidatorFn => {
//     if (val.length < 3) {
//       return { minLength: true };
//     }
//     return null;
//   }, []);

//   const requiredValidator = useCallback((val: any): ValidatorFn => {
//     if (!val) {
//       return { required: true };
//     }
//     return null;
//   }, []);

//   return (
//     <div
//       style={{
//         padding: "2rem",
//         display: "flex",
//         flexDirection: "column",
//         gap: "1rem",
//       }}
//     >
//       {/* Column layout */}
//       <JXInput
//         label="Name"
//         placeholder="Enter your name"
//         type="text"
//         required
//         layout="row"
//         value={name}
//         onChange={handleNameChange}
//         hidden={false}
//         validations={[
//           {
//             validator: requiredValidator,
//             message: "Field value is required",
//           },
//           {
//             validator: minLengthValidator,
//             message: "Minimum length 3 is required",
//           },
//         ]}
//       />
//       <JXInput
//         label="Number"
//         placeholder="Enter your number"
//         type="email"
//         required
//         layout="column"
//         value={number}
//         onChange={handleNumberChange}
//         hidden={false}
//         validations={[
//           {
//             validator: requiredValidator,
//             message: "Field value is required",
//           },
//           {
//             validator: minLengthValidator,
//             message: "Minimum length 3 is required",
//           },
//         ]}
//       />
//       <JXInput
//         label="Email"
//         placeholder="Enter your email"
//         type="email"
//         required
//         layout="outlined"
//         value={email}
//         onChange={handleEmailChange}
//         hidden={false}
//         validations={[
//           {
//             validator: requiredValidator,
//             message: "Field value is required",
//           },
//           {
//             validator: minLengthValidator,
//             message: "Minimum length 3 is required",
//           },
//         ]}
//       />
//       <JXInput
//         label="Email"
//         placeholder="Enter your email"
//         type="date"
//         required
//         layout="column"
//         hidden={false}
//       />
//     </div>
//   );
// };

// export default App;

const App = () => {
  return (
    <>
      <Component />
    </>
  );
};

export default App;
