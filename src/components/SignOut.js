import React from 'react'
import {signOut} from 'firebase/auth'
import { auth } from '../firebase/firebase'
import {Button} from "@chakra-ui/react"

export const SignOut = () => {

  const logout = async () => {
      try{
      await signOut(auth)
      } catch (err) {
          console.error(err)
      }
    }

  return (
    <Button onClick={logout}>LogOut</Button>
  )
}

export default SignOut
