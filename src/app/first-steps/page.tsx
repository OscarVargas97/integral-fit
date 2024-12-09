import React from 'react'
import FirsStepsForm from 'components/form/FirstStepsForm/FirstStepsForm'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/Card'

const FirsSteps = () => {
  return (
    <div className="flex h-svh items-center">
      <Card className="mx-auto w-3/4 max-w-2xl">
        {' '}
        {/* Cambiado para agrandar la Card */}
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FirsStepsForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default FirsSteps
