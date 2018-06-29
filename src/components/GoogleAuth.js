// import React from 'react'
// import { View, Button, Linking } from 'react-native'
// import { FormLabel, FormInput, FormValidationMessage, Text } from 'react-native-elements'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import {auth} from '../store'

// /**
//  * COMPONENT
//  */
// const Signup = props => {
//   const {name, displayName, handleSubmit, error} = props

//   return (
//     <View>
//       <Text style={{color: 'blue'}}
//         onPress={() => {
//           console.log('here')
//           Linking.openURL("http://198.176.45.2:8080/auth/google")
//         }} >
//         {displayName} with Google
//       </Text>
//     </View>
//   )
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */

// // const mapLogin = state => {
// //   return {
// //     name: 'login',
// //     displayName: 'Login',
// //     error: state.user.error
// //   }
// // }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit (evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(auth(email, password, formName))
//     }
//   }
// }

// // export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// // export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

// export default Signup

// /**
//  * PROP TYPES
//  */
// // AuthForm.propTypes = {
// //   name: PropTypes.string.isRequired,
// //   displayName: PropTypes.string.isRequired,
// //   handleSubmit: PropTypes.func.isRequired,
// //   error: PropTypes.object
// // }


// // <form onSubmit={handleSubmit} name={name}>
// //         <View>
// //           <FormLabel htmlFor="email">
// //             <small>Email</small>
// //           </FormLabel>
// //           <FormInput name="email" type="text" />
// //         </View>
// //         <View>
// //           <FormLabel htmlFor="password">
// //             <small>Password</small>
// //           </FormLabel>
// //           <FormInput name="password" type="password" />
// //         </View>
// //         <View>
// //           <Button type="submit">{displayName}</Button>
// //         </View>
// //         {error && error.response && <View> {error.response.data} </View>}
// //       </form>