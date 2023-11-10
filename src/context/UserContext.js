import React, { createContext, useState } from "react";
export const UserContext = createContext();
export const UserProvider = (props) => {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });
  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
};

// import Statements:

// The code begins by importing necessary modules from the "react" library. Specifically, it imports the createContext and useState functions.
// UserContext and UserProvider:

// UserContext is created using the createContext function. Context in React is a way to pass data down through the component tree without having to pass props explicitly at every level. This context will be used to store and share user-related data throughout the application.

// UserProvider is a custom component that you are defining. It serves as a provider for the UserContext. This means that it will be responsible for managing the user data and making it available to components that need it.

// useState:

// Inside the UserProvider component, a state variable named userData is defined using the useState hook. useState is a React hook that allows you to manage and update state in functional components. In this case, userData is an object that has two properties: user and token, both initially set to undefined.
// return Statement:

// The return statement defines the structure of the UserProvider component. It uses the UserContext.Provider component to wrap its children. This is where the userData and a function to update it, setUserData, are made available to the components within this context.

// The value prop of the UserContext.Provider is set to an array containing [userData, setUserData]. This means that any component consuming this context will have access to the userData object and the setUserData function to modify it.

// {props.children} is used to render the children of the UserProvider component. This allows any components wrapped by UserProvider to access the userData and setUserData values.

// In summary, this code sets up a context (UserContext) and a provider (UserProvider) in a React application. The UserProvider is responsible for managing user data and making it available to other components in the application. Components that want to use this user data can consume the context and access the userData object and the setUserData function to read and update the user-related information.
