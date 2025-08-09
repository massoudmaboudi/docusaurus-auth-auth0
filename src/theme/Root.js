// import React, { useState, useEffect } from "react";
// import { Auth0Provider } from "@auth0/auth0-react";
// import Profile from "./profile";
// import LoginButton from "./login";
// import LogoutButton from "./logout";

// // Default implementation, that you can customize
// export default function Root({ children }) {

//   return (
//     <React.Fragment>
//       {/* {
//             window.location.pathname.includes("/docs") ? (
//               <>{children}</>
//             ) : (
//               <>{children}</>
//             )
//           } */}


//       <Auth0Provider
//         domain="datagit.us.auth0.com"
//         clientId="httDcBJfSGVLMPh24y9LWrWzvdO85ToX"
//         authorizationParams={{
//           redirect_uri: window.location.origin
//         }}
//       >
//         <LoginButton />
//         <LogoutButton />
//         <Profile />
//         {/* <React.Fragment> <>{children}</></React.Fragment> */}
//       </Auth0Provider>
//     </React.Fragment>
//   );
// }


import React, { useState, useEffect } from "react";
import { Amplify } from 'aws-amplify';
import awsExports from "./aws-exports";
// import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
});

// export default function App() {
//   return (
//     <Authenticator loginMechanisms={['email']} socialProviders={['google']}>
//       {({ signOut, user }) => (
//         <main>
//           <h1>Hello {user.username}</h1>
//           <button onClick={signOut}>Sign out</button>
//         </main>
//       )}
//     </Authenticator>
//   );
// }



import { withAuthenticator, WithAuthenticatorOptions } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


function App({ isPassedToWithAuthenticator, signOut, user }) {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }

  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App, { socialProviders: ['google'] });

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}